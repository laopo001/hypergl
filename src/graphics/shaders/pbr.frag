{{#if data.GL2}}{{> gles3.frag}}{{else}}{{> gles2.frag}}{{/if}}

#define HAS_NORMALS 1
#define HAS_UV 1
// #define HAS_TANGENTS 1
#define USE_IBL 1
// {{#if shaderVars.USE_IBL}}

// {{/if}}
{{#if shaderVars.HAS_BASECOLORMAP}}
#define HAS_BASECOLORMAP 1
{{/if}}
{{#if shaderVars.HAS_METALROUGHNESSMAP}}
#define HAS_METALROUGHNESSMAP 1
{{/if}}
{{#if shaderVars.HAS_NORMALMAP}}
#define HAS_NORMALMAP 1
{{/if}}
{{#if shaderVars.HAS_EMISSIVEMAP}}
#define HAS_EMISSIVEMAP 1
{{/if}}
{{#if shaderVars.HAS_OCCLUSIONMAP}}
#define HAS_OCCLUSIONMAP 1
{{/if}}
{{#if shaderVars.HAS_DiffuseEnvSampler}}
#define HAS_DiffuseEnvSampler 1
{{/if}}
{{#if shaderVars.HAS_SpecularEnvSampler}}
#define HAS_SpecularEnvSampler 1
{{/if}}
// #define USE_TEX_LOD 1

//
// This fragment shader defines a reference implementation for Physically Based Shading of
// a microfacet surface material defined by a glTF model.
//
// References:
// [1] Real Shading in Unreal Engine 4
//     http://blog.selfshadow.com/publications/s2013-shading-course/karis/s2013_pbs_epic_notes_v2.pdf
// [2] Physically Based Shading at Disney
//     http://blog.selfshadow.com/publications/s2012-shading-course/burley/s2012_pbs_disney_brdf_notes_v3.pdf
// [3] README.md - Environment Maps
//     https://github.com/KhronosGroup/glTF-WebGL-PBR/#environment-maps
// [4] "An Inexpensive BRDF Model for Physically based Rendering" by Christophe Schlick
//     https://www.cs.virginia.edu/~jdl/bib/appearance/analytic%20models/schlick94b.pdf
// #extension GL_EXT_shader_texture_lod: enable
// #extension GL_OES_standard_derivatives : enable

precision highp float;

#ifdef HAS_BASECOLORMAP
    uniform sampler2D uBaseColorSampler;
#endif
#ifdef HAS_NORMALMAP
    uniform sampler2D uNormalSampler;
    uniform float uNormalScale;
#endif
#ifdef HAS_EMISSIVEMAP
    uniform sampler2D uEmissiveSampler;
    uniform vec3 uEmissiveFactor;
#endif
#ifdef HAS_METALROUGHNESSMAP
    uniform sampler2D uMetallicRoughnessSampler;
#endif
#ifdef HAS_OCCLUSIONMAP
    uniform sampler2D uOcclusionSampler;
    uniform float uOcclusionStrength;
#endif
#ifdef HAS_DiffuseEnvSampler
    uniform samplerCube uDiffuseEnvSampler;
#endif
#ifdef HAS_SpecularEnvSampler
    uniform samplerCube uSpecularEnvSampler;
    uniform sampler2D ubrdfLUT;
#endif

uniform vec2 uMetallicRoughnessValues;
uniform vec4 uBaseColorFactor;
uniform vec3 uCameraPosition;
// debugging flags used for shader output of intermediate PBR variables
uniform vec4 uScaleIBLAmbient;
in vec3 v_vertex_position;
in vec2 v_vertex_texCoord0;
#ifdef HAS_NORMALS
    #ifdef HAS_TANGENTS
        in mat3 v_TBN;
    #else
        in vec3 v_normal;
    #endif
#endif

{{#each uniforms._directionalLightArr}}
uniform vec3 {{this.color}};
uniform vec3 {{this.direction}};
uniform sampler2D {{this.shadowMap}};
uniform mat4 {{this.lightSpaceMatrix}};
uniform float {{this.shadowType}};
uniform float {{this.shadowMapSize}};
uniform float {{this.shadowBias}};
uniform float {{this.castShadows}};
{{/each}}

{{#each uniforms._pointLightArr}}
uniform vec3 {{this.position}};
uniform vec3 {{this.color}};
uniform float {{this.range}};
uniform samplerCube {{this.shadowMap}};
uniform float {{this.shadowType}};
uniform float {{this.shadowMapSize}};
uniform float {{this.shadowBias}};
uniform float {{this.castShadows}};
{{/each}}

{{#each uniforms._spotLightArr}} 
uniform vec3 {{this.position}};
uniform vec3 {{this.direction}};
uniform vec3 {{this.color}};
uniform float {{this.range}};
uniform float {{this.innerConeAngle}};
uniform float {{this.outerConeAngle}};
uniform sampler2D {{this.shadowMap}};
uniform mat4 {{this.lightSpaceMatrix}};
uniform float {{this.shadowType}};
uniform float {{this.shadowMapSize}};
uniform float {{this.shadowBias}};
uniform float {{this.castShadows}};
{{/each}}

vec3 d_viewDirNorm;
vec3 d_vertexNormal;
float d_perceptualRoughness;
float d_metallic;
vec3 d_specularEnvironmentR0;
vec3 d_specularEnvironmentR90;
float d_alphaRoughness;
vec3 d_diffuseColor;
vec3 d_specularColor;

// Encapsulate the various inputs used by the various functions in the shading equation
// We store values in this struct to simplify the integration of alternative implementations
// of the shading terms, outlined in the Readme.MD Appendix.
struct PBRInfo {
    float NdotL;
    // cos angle between normal and light direction
    float NdotV;
    // cos angle between normal and view direction
    float NdotH;
    // cos angle between normal and half vector
    float LdotH;
    // cos angle between light direction and half vector
    float VdotH;
    // cos angle between view direction and half vector
    float perceptualRoughness;
    // roughness value, as authored by the model creator (input to shader) 粗糙度
    float metalness;
    // metallic value at the surface 金属度
    vec3 reflectance0;
    // full reflectance color (normal incidence angle)
    vec3 reflectance90;
    // reflectance color at grazing angle
    float alphaRoughness;
    // roughness mapped to a more linear change in the roughness (proposed by [2])
    vec3 diffuseColor;
    // color contribution from diffuse lighting
    vec3 specularColor;
    // color contribution from specular lighting
};
const float M_PI = 3.141592653589793;
const float c_MinRoughness = 0.04;
vec4 SRGBtoLINEAR(vec4 srgbIn) {
    #ifdef MANUAL_SRGB
        #ifdef SRGB_FAST_APPROXIMATION
            vec3 linOut = pow(srgbIn.xyz, vec3(2.2));
        #else //SRGB_FAST_APPROXIMATION
            vec3 bLess = step(vec3(0.04045), srgbIn.xyz);
            vec3 linOut = mix( srgbIn.xyz/vec3(12.92), pow((srgbIn.xyz+vec3(0.055))/vec3(1.055), vec3(2.4)), bLess );
        #endif //SRGB_FAST_APPROXIMATION
        return vec4(linOut, srgbIn.w);;
    #else //MANUAL_SRGB
        return srgbIn;
    #endif //MANUAL_SRGB
}
// Find the normal for this fragment, pulling either from a predefined normal map
// or from the interpolated mesh normal and tangent attributes.
vec3 getNormal() {
    // Retrieve the tangent space matrix
    #ifndef HAS_TANGENTS
        vec3 pos_dx = dFdx(v_vertex_position);
        vec3 pos_dy = dFdy(v_vertex_position);
        vec3 tex_dx = dFdx(vec3(v_vertex_texCoord0, 0.0));
        vec3 tex_dy = dFdy(vec3(v_vertex_texCoord0, 0.0));
        vec3 t = (tex_dy.t * pos_dx - tex_dx.t * pos_dy) / (tex_dx.s * tex_dy.t - tex_dy.s * tex_dx.t);
        #ifdef HAS_NORMALS
            vec3 ng = normalize(v_normal);
        #else
            vec3 ng = cross(pos_dx, pos_dy);
        #endif
        
        t = normalize(t - ng * dot(ng, t));
        vec3 b = normalize(cross(ng, t));
        mat3 tbn = mat3(t, b, ng);
    #else // HAS_TANGENTS
        mat3 tbn = v_TBN;
    #endif
    
    #ifdef HAS_NORMALMAP
        vec3 n = texture2D(uNormalSampler, v_vertex_texCoord0).rgb;
        n = normalize(tbn * ((2.0 * n - 1.0) * vec3(uNormalScale, uNormalScale, 1.0)));
    #else
        // The tbn matrix is linearly interpolated, so we need to re-normalize
        vec3 n = normalize(tbn[2].xyz);
    #endif
    
    return n;
}
// Calculation of the lighting contribution from an optional Image Based Light source.
// Precomputed Environment Maps are required uniform inputs and are computed as outlined in [1].
// See our README.md on Environment Maps [3] for additional discussion.
#ifdef USE_IBL
    vec3 getIBLContribution(PBRInfo pbrInputs, vec3 n, vec3 reflection) {
        float mipCount = 9.0;
        // resolution of 512x512
        float lod = (pbrInputs.perceptualRoughness * mipCount);
        // retrieve a scale and bias to F0. See [1], Figure 3
        vec3 brdf = vec3(0, 0, 0);
        vec3 diffuseLight = vec3(0.1, 0.1, 0.1);
        #ifdef HAS_DiffuseEnvSampler
            diffuseLight = SRGBtoLINEAR(textureCube(uDiffuseEnvSampler, n)).rgb;
        #endif

        vec3 specularLight = vec3(0, 0, 0);
        #ifdef HAS_SpecularEnvSampler
            brdf = SRGBtoLINEAR(texture2D(ubrdfLUT, vec2(pbrInputs.NdotV, 1.0 - pbrInputs.perceptualRoughness))).rgb;
            #ifdef USE_TEX_LOD
                specularLight = SRGBtoLINEAR(textureCubeLodEXT(uSpecularEnvSampler, reflection, lod)).rgb;
            #else
                specularLight = SRGBtoLINEAR(textureCube(uSpecularEnvSampler, reflection)).rgb;
            #endif
        #endif
        
        vec3 diffuse = diffuseLight * pbrInputs.diffuseColor;
        vec3 specular = specularLight * (pbrInputs.specularColor * brdf.x + brdf.y);
        // For presentation, this allows us to disable IBL terms
        diffuse *= uScaleIBLAmbient.x;
        specular *= uScaleIBLAmbient.y;
        return diffuse + specular;
    }
#endif

// Basic Lambertian diffuse
// Implementation from Lambert's Photometria https://archive.org/details/lambertsphotome00lambgoog
// See also [1], Equation 1
vec3 diffuse(PBRInfo pbrInputs) {
    return pbrInputs.diffuseColor / M_PI;
}
// The following equation models the Fresnel reflectance term of the spec equation (aka F())
// Implementation of fresnel from [4], Equation 15
vec3 specularReflection(PBRInfo pbrInputs) { // 菲涅尔方程
    return pbrInputs.reflectance0 + (pbrInputs.reflectance90 - pbrInputs.reflectance0) * pow(clamp(1.0 - pbrInputs.VdotH, 0.0, 1.0), 5.0);
}
// This calculates the specular geometric attenuation (aka G()), // where rougher material will reflect less light back to the viewer.
// This implementation is based on [1] Equation 4, and we adopt their modifications to
// alphaRoughness as input as originally proposed in [2].
float geometricOcclusion(PBRInfo pbrInputs) { // 几何函数 light
    float NdotL = pbrInputs.NdotL;
    float NdotV = pbrInputs.NdotV;
    float r = pbrInputs.alphaRoughness;
    float attenuationL = 2.0 * NdotL / (NdotL + sqrt(r * r + (1.0 - r * r) * (NdotL * NdotL)));
    float attenuationV = 2.0 * NdotV / (NdotV + sqrt(r * r + (1.0 - r * r) * (NdotV * NdotV)));
    return attenuationL * attenuationV;
}
// The following equation(s) model the distribution of microfacet normals across the area being drawn (aka D())
// Implementation from "Average Irregularity Representation of a Roughened Surface for Ray Reflection" by T. S. Trowbridge, and K. P. Reitz
// Follows the distribution function recommended in the SIGGRAPH 2013 course notes from EPIC Games [1], Equation 3.
float microfacetDistribution(PBRInfo pbrInputs) { // 正态分布函数
    float roughnessSq = pbrInputs.alphaRoughness * pbrInputs.alphaRoughness;
    float f = (pbrInputs.NdotH * roughnessSq - pbrInputs.NdotH) * pbrInputs.NdotH + 1.0;
    return roughnessSq / (M_PI * f * f);
}

// 计算方向
vec3 CalcDirLight(vec3 lightColor ,  vec3 lightDir) {
    // Vector from surface point to camera
    vec3 lightDirNorm = normalize(lightDir); // light
    // Vector from surface point to light
    vec3 halfwayDir  = normalize(lightDirNorm + d_viewDirNorm); // light
    // Half vector between both lightDirNorm and d_viewDirNorm
    vec3 reflection = -normalize(reflect(d_viewDirNorm, d_vertexNormal));
    float NdotL = clamp(dot(d_vertexNormal, lightDirNorm), 0.001, 1.0); // light
    float NdotV = clamp(abs(dot(d_vertexNormal, d_viewDirNorm)), 0.001, 1.0);
    float NdotH = clamp(dot(d_vertexNormal, halfwayDir ), 0.0, 1.0); // light
    float LdotH = clamp(dot(lightDirNorm, halfwayDir ), 0.0, 1.0); // light
    float VdotH = clamp(dot(d_viewDirNorm, halfwayDir ), 0.0, 1.0); // light
    PBRInfo pbrInputs = PBRInfo(
    NdotL, NdotV, NdotH, LdotH, VdotH, d_perceptualRoughness, d_metallic, d_specularEnvironmentR0, d_specularEnvironmentR90, d_alphaRoughness, d_diffuseColor, d_specularColor
    );
    // Calculate the shading terms for the microfacet specular shading model
    vec3 F = specularReflection(pbrInputs); // 菲涅尔方程
    float G = geometricOcclusion(pbrInputs); // 几何函数
    float D = microfacetDistribution(pbrInputs); // 正态分布函数
    // Calculation of analytical lighting contribution
    vec3 diffuseContrib = (1.0 - F) * diffuse(pbrInputs);
    vec3 specContrib = F * G * D / (4.0 * NdotL * NdotV); // light
    // Obtain final intensity as reflectance (BRDF) scaled by the energy of the light (cosine law)
    vec3 color = NdotL * lightColor * (diffuseContrib + specContrib);

    // Calculate lighting contribution from image based lighting source (IBL)
    #ifdef USE_IBL
        color += getIBLContribution(pbrInputs, d_viewDirNorm, reflection);
    #endif

    return color;
}

// 计算定点光在确定位置的光照颜色
vec3 CalcPointLight( vec3 lightColor, vec3 lightPosition, float range) {
    vec3 lightDirNorm = normalize(lightPosition - v_vertex_position);
    vec3 color = CalcDirLight( lightColor, lightDirNorm);
    float distance = length(lightPosition - v_vertex_position);
    if(distance > range){
        return vec3(0);
    } else {
        return color * (1.0 - distance / range);
    }
}


vec3 CalcSpotLight(vec3 lightColor, vec3 lightPosition, vec3 direction, float range, float innerConeAngle, float outerConeAngle) {
    vec3 lightDir = lightPosition - v_vertex_position;
    vec3 lightDirNorm = normalize(lightDir);
    float cosAngle = dot(lightDirNorm, direction);
    float f = smoothstep(outerConeAngle, innerConeAngle, cosAngle);
    vec3 color = CalcPointLight( lightColor, lightPosition, range) * f;    
    return color;
}  

void main() {
    // Metallic and Roughness material properties are packed together
    // In glTF, these factors can be specified by fixed scalar values
    // or from a metallic-roughness map
    d_perceptualRoughness = uMetallicRoughnessValues.y;
    d_metallic = uMetallicRoughnessValues.x;
    #ifdef HAS_METALROUGHNESSMAP
        // Roughness is stored in the 'g' channel, metallic is stored in the 'b' channel.
        // This layout intentionally reserves the 'r' channel for (optional) occlusion map data
        vec4 mrSample = texture2D(uMetallicRoughnessSampler, v_vertex_texCoord0);
        d_perceptualRoughness = mrSample.g * d_perceptualRoughness;
        d_metallic = mrSample.b * d_metallic;
    #endif
    d_perceptualRoughness = clamp(d_perceptualRoughness, c_MinRoughness, 1.0);
    d_metallic = clamp(d_metallic, 0.0, 1.0);
    // Roughness is authored as perceptual roughness; as is convention, // convert to material roughness by squaring the perceptual roughness [2].
    d_alphaRoughness = d_perceptualRoughness * d_perceptualRoughness;
    // The albedo may be defined from a base texture or a flat color
    #ifdef HAS_BASECOLORMAP
        vec4 baseColor = SRGBtoLINEAR(texture2D(uBaseColorSampler, v_vertex_texCoord0)) * uBaseColorFactor;
    #else
        vec4 baseColor = uBaseColorFactor;
    #endif
    
    vec3 f0 = vec3(0.04);
    d_diffuseColor = baseColor.rgb * (vec3(1.0) - f0);
    d_diffuseColor *= 1.0 - d_metallic;
    d_specularColor = mix(f0, baseColor.rgb, d_metallic);
    // Compute reflectance.
    float reflectance = max(max(d_specularColor.r, d_specularColor.g), d_specularColor.b);
    // For typical incident reflectance range (between 4% to 100%) set the grazing reflectance to 100% for typical fresnel effect.
    // For very low reflectance range on highly diffuse objects (below 4%), incrementally reduce grazing reflecance to 0%.
    float reflectance90 = clamp(reflectance * 25.0, 0.0, 1.0);
    d_specularEnvironmentR0 = d_specularColor.rgb;
    d_specularEnvironmentR90 = vec3(1.0, 1.0, 1.0) * reflectance90;
    d_vertexNormal = getNormal();
    // normal at surface point
    d_viewDirNorm = normalize(uCameraPosition - v_vertex_position);


    vec3 color = vec3(0.0);
    vec3 temp;
    float shadow;
    {{#each uniforms._directionalLightArr}}
        temp = CalcDirLight( {{this.color}}, {{this.direction}} );
        color += temp;
    {{/each}}

    {{#each uniforms._pointLightArr}}
        temp = CalcPointLight( {{this.color}}, {{this.position}}, {{this.range}});
        color += temp;
    {{/each}}

    {{#each uniforms._spotLightArr}}
        temp = CalcSpotLight( {{this.color}}, {{this.position}}, {{this.direction}}, {{this.range}}, {{this.innerConeAngle}}, {{this.outerConeAngle}} );
        color += temp;
    {{/each}}

    // Apply optional PBR terms for additional (optional) shading
    #ifdef HAS_OCCLUSIONMAP
        float ao = texture2D(uOcclusionSampler, v_vertex_texCoord0).r;
        color = mix(color, color * ao, uOcclusionStrength);
    #endif
    
    #ifdef HAS_EMISSIVEMAP
        vec3 emissive = SRGBtoLINEAR(texture2D(uEmissiveSampler, v_vertex_texCoord0)).rgb * uEmissiveFactor;
        color += emissive;
    #endif
    
    // This section uses mix to override final color for reference app visualization
    // of various parameters in the lighting equation.

    gl_FragColor = vec4(pow(color, vec3(1.0/2.2)), baseColor.a);
}