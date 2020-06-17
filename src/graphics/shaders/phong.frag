{{#if data.GL2}}{{> gles3.frag}}{{else}}{{> gles2.frag}}{{/if}}
precision highp float;

uniform vec4 uAmbientColor;
uniform vec4 uDiffuseColor;
uniform sampler2D uDiffuseTexture;
uniform vec2 uDiffuseMapOffset;
uniform vec4 uSpecularColor;
uniform sampler2D uSpecularTexture;
uniform vec2 uSpecularMapOffset;
uniform float uShininess;
uniform vec3 uCameraPosition;
uniform float uOpacity;
uniform sampler2D uOpacityTexture;
uniform vec2 uOpacityMapOffset;

uniform sampler2D uNormalTexture;

uniform float uAlphaTest;
uniform float uFogDensity;
uniform vec3 uFogColor;
uniform vec2 uFogDist;
uniform bool uReceiveShadow;

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


//////////////
{{#if attributes.vertex_texCoord0}}
in vec2 v_vertex_texCoord0;
{{/if}}
in vec3 v_normal;
in vec3 v_vertex_position;

{{> fog.frag}}
{{> hdr.frag}}
{{> gamma.frag}}

vec3 dDiffuseColor;
vec3 duSpecularColor;
vec3 dVertexNormal;
vec3 dViewDirNorm;
#define Blinn 1;

// {{#if attributes.vertex_color}}
// in vec4 vColor;
// vec4 getOutColor() {
//     return vColor;
// }
// {{else}}
// {{/if}}
vec3 getOutDiffuseColor() {
    {{#ifCond uniforms.uDiffuseTexture '&&' attributes.vertex_texCoord0}}
    return texture2D(uDiffuseTexture, v_vertex_texCoord0 - uDiffuseMapOffset).rgb;
    {{else}}
    return uDiffuseColor.rgb;
    {{/ifCond}}
}

vec3 getOutuSpecularColor() {
    {{#if uniforms.uSpecularTexture}}
    return texture2D(uSpecularTexture, v_vertex_texCoord0 - uSpecularMapOffset).rgb;
    {{else}}
    return uSpecularColor.rgb;
    {{/if}}
}

float getOutOpacityColor() {
    {{#if uniforms.uOpacityTexture}}
    return texture2D(uOpacityTexture, v_vertex_texCoord0 - uOpacityMapOffset).r;
    {{else}}
    return uOpacity;
    {{/if}}
}

vec3 getNormal() {
    {{#if uniforms.uNormalTexture}}
    return texture2D(uNormalTexture, v_vertex_texCoord0).rgb;
    {{else}}
    return v_normal;
    {{/if}}
}

const float PackUpscale = 256. / 255.;
const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
    vec4 r = vec4( fract( v * PackFactors ), v );
    r.yzw -= r.xyz * ShiftRight8;
    return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
    return dot( v, UnpackFactors );
}
vec3 lessThan2(vec3 a, vec3 b) {
    return clamp((b - a)*1000.0, 0.0, 1.0);
}

float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
    return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
}

float texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {
    const vec2 offset = vec2( 0.0, 1.0 );
    vec2 texelSize = vec2( 1.0 ) / size;
    vec2 centroidUV = floor( uv * size + 0.5 ) / size;
    float lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );
    float lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );
    float rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );
    float rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );
    vec2 f = fract( uv * size + 0.5 );
    float a = mix( lb, lt, f.y );
    float b = mix( rb, rt, f.y );
    float c = mix( a, b, f.x );
    return c;
}

// 计算方向
vec3 CalcDirLight( vec3 lightColor, vec3 lightDirNorm) {
    // 计算漫反射强度
    float diff = max(dot(dVertexNormal, lightDirNorm), 0.0);
    // 计算镜面反射强度
    #ifdef Blinn
        // Blinn-Phong
        vec3 halfwayDir = normalize(lightDirNorm + dViewDirNorm);  
        float spec = pow(max(dot(dVertexNormal, halfwayDir), 0.0), uShininess * 2.0);
    #else 
        // Phong
        vec3 reflectDir = reflect(-lightDirNorm, dVertexNormal);
        float spec = pow(max(dot(dViewDirNorm, reflectDir), 0.0), uShininess);
    #endif
    // 合并各个光照分量
    vec3 diffuse  = (lightColor - uAmbientColor.xyz) * diff * dDiffuseColor.xyz;
    vec3 specular = (lightColor)  * spec *  duSpecularColor.xyz;
    return diffuse + specular;
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

void alphaTest(float a) {
    if (a <= uAlphaTest) discard;
}

{{> shadow.frag}}

void main(void) {
    // vec4 outColor = getOutColor();
    float opacity = getOutOpacityColor();
    alphaTest(opacity);
    dDiffuseColor = GammaToLinear( getOutDiffuseColor() );
    duSpecularColor = GammaToLinear( getOutuSpecularColor() );
    dVertexNormal = getNormal();
    dViewDirNorm = normalize(uCameraPosition - v_vertex_position);

    // start
    vec3 result = uAmbientColor.xyz * dDiffuseColor.xyz;
    vec3 color;
    float shadow;
    {{#each uniforms._directionalLightArr}}
    color = CalcDirLight( {{this.color}}, {{this.direction}});
    {{#ifEq this.castShadows 1}}
    if( uReceiveShadow && {{this.castShadows}} == 1.0 ) {
        shadow = CalcLightShadow({{this.lightSpaceMatrix}} * vec4(v_vertex_position, 1.0), {{this.shadowMap}}, {{this.shadowType}}, {{this.shadowMapSize}}, {{this.shadowBias}});    
        color = shadow * color;
    }
    {{/ifEq}}
    result += color;
    {{/each}}

    {{#each uniforms._pointLightArr}}
    color = CalcPointLight( {{this.color}}, {{this.position}}, {{this.range}});
    {{#ifEq this.castShadows 1}}
    if( uReceiveShadow && {{this.castShadows}} == 1.0 ) {
        shadow = CalcPointLightShadow({{this.shadowMap}}, {{this.position}}, {{this.range}}, {{this.shadowType}}, {{this.shadowMapSize}}, {{this.shadowBias}});    
        color = shadow * color;
    }
    {{/ifEq}}
    result += color;
    {{/each}}

    {{#each uniforms._spotLightArr}}
    color = CalcSpotLight( {{this.color}}, {{this.position}}, {{this.direction}}, {{this.range}}, {{this.innerConeAngle}}, {{this.outerConeAngle}} );
    {{#ifEq this.castShadows 1}}
    if( uReceiveShadow && {{this.castShadows}} == 1.0 ) {
        shadow = CalcLightShadow({{this.lightSpaceMatrix}} * vec4(v_vertex_position, 1.0), {{this.shadowMap}}, {{this.shadowType}}, {{this.shadowMapSize}}, {{this.shadowBias}});    
        color = shadow * color;
    }
    {{/ifEq}}
    result += color;
    {{/each}}
    // end
    
    result = addFog(result);
    result = toneMap(result);
    result = LinearToGamma(result);
    gl_FragColor = vec4(result, opacity);

}

