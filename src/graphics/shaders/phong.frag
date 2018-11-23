{{#if data.GL2}}{{> gles3.frag}}{{/if}}
precision highp float;

uniform vec3 camera_position;
uniform float opacity;
uniform sampler2D opacityTexture;
// directionalLight start
{{#each uniforms._directionalLightArr}}
uniform vec4 {{this.color}};
uniform vec3 {{this.direction}};
uniform sampler2D {{this.shadowMap}};
uniform mat4 {{this.lightSpaceMatrix}};
{{/each}}
// directionalLight end
// pointLight start
{{#each uniforms._pointLightArr}}
uniform vec3 {{this.position}};
uniform vec4 {{this.color}};
uniform float {{this.range}};
uniform samplerCube {{this.shadowMap}};
{{/each}}
// pointLight end
// soptLight start
{{#each uniforms._spotLightArr}} 
uniform vec3 {{this.position}};
uniform vec3 {{this.direction}};
uniform vec4 {{this.color}};
uniform float {{this.range}};
uniform float {{this.innerConeAngle}};
uniform float {{this.outerConeAngle}};
uniform sampler2D {{this.shadowMap}};
uniform mat4 {{this.lightSpaceMatrix}};
{{/each}}
// soptLight end

{{#if uniforms.diffuseTexture}}
uniform sampler2D diffuseTexture;
{{/if}}
{{#if uniforms.ambientColor}}
uniform vec4 ambientColor;
{{/if}}
{{#if uniforms.diffuseColor}}
uniform vec4 diffuseColor;
{{/if}}
{{#if uniforms.specularColor}}
uniform vec4 specularColor;
{{/if}}
{{#if uniforms.specularTexture}}
uniform vec4 specularTexture;
{{/if}}
{{#if uniforms.lightPosition}}
uniform vec3 lightPosition;
{{/if}}
{{#if uniforms.shininess}}
uniform float shininess;
{{/if}}

//////////////
{{#if attributes.vertex_texCoord0}}
varying vec2 out_vertex_texCoord0;
{{/if}}
{{#if attributes.normal}}
varying vec3 out_normal;
{{/if}}
varying vec3 out_vertex_position;

{{#if attributes.vertex_color}}
varying vec4 vColor;
vec4 getOutColor() {
    return vColor;
}
{{else}}
vec4 getOutDiffuseColor() {
    {{#if uniforms.diffuseTexture}}
    return texture2D(diffuseTexture, out_vertex_texCoord0);
    {{else}}
    return diffuseColor;
    {{/if}}
}
vec4 getOutSpecularColor() {
    {{#if uniforms.specularTexture}}
    return texture2D(specularTexture, out_vertex_texCoord0);
    {{else}}
    return specularColor;
    {{/if}}
}
{{/if}}
float getOutOpacityColor() {
    {{#if uniforms.opacityTexture}}
    return texture2D(opacityTexture, out_vertex_texCoord0).r;
    {{else}}
    return opacity;
    {{/if}}
}

// float unpack(const in vec4 rgbaDepth) {
//     const vec4 bitShift = vec4(1.0, 1.0/256.0, 1.0/(256.0*256.0), 1.0/(256.0*256.0*256.0));
//     return dot(rgbaDepth, bitShift);
// }

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
// DirLight or SpotLight
float CalcLightShadow(vec4 fragPosLightSpace, sampler2D shadowMap) {
    // 执行透视除法
    vec3 projCoords = fragPosLightSpace.xyz / fragPosLightSpace.w;
      // 变换到[0,1]的范围
    projCoords = projCoords * 0.5 + 0.5;
    bvec4 inFrustumVec = bvec4 ( projCoords.x >= 0.0, projCoords.x <= 1.0, projCoords.y >= 0.0, projCoords.y <= 1.0 );
    bool inFrustum = all( inFrustumVec );
    bvec2 frustumTestVec = bvec2( inFrustum, projCoords.z <= 1.0 );
    bool frustumTest = all( frustumTestVec );
    float shadow = 1.0;
    if(frustumTest) {
        // 检查当前片元是否在阴影中
        float bias = 0.001;
        // 取得当前片元在光源视角下的深度
        float currentDepth = projCoords.z - bias;
        // 取得最近点的深度(使用[0,1]范围下的fragPosLight当坐标)
        // float closestDepth = unpackRGBAToDepth( texture(shadowMap, projCoords.xy) ); 
        // shadow = currentDepth > closestDepth + bias ? 1.0 : 0.0;
        float shadowRadius = 1.0;
        vec2 shadowMapSize = vec2(1024.0, 1024.0);
        vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
        float dx0 = - texelSize.x * shadowRadius;
        float dy0 = - texelSize.y * shadowRadius;
        float dx1 = + texelSize.x * shadowRadius;
        float dy1 = + texelSize.y * shadowRadius;
        shadow = (
            texture2DCompare( shadowMap, projCoords.xy + vec2( dx0, dy0 ), currentDepth) +
            texture2DCompare( shadowMap, projCoords.xy + vec2( 0.0, dy0 ), currentDepth ) +
            texture2DCompare( shadowMap, projCoords.xy + vec2( dx1, dy0 ), currentDepth ) +
            texture2DCompare( shadowMap, projCoords.xy + vec2( dx0, 0.0 ), currentDepth ) +
            texture2DCompare( shadowMap, projCoords.xy, currentDepth ) +
            texture2DCompare( shadowMap, projCoords.xy + vec2( dx1, 0.0 ), currentDepth ) +
            texture2DCompare( shadowMap, projCoords.xy + vec2( dx0, dy1 ), currentDepth ) +
            texture2DCompare( shadowMap, projCoords.xy + vec2( 0.0, dy1 ), currentDepth ) +
            texture2DCompare( shadowMap, projCoords.xy + vec2( dx1, dy1 ), currentDepth )
        ) * ( 1.0 / 9.0 );
    }
    return 1.0 - shadow;
}



// 计算方向
vec3 CalcDirLight(vec3 normal, vec3 viewDir, vec3 lightColor, vec3 lightDirection) {
    vec3 lightDir = normalize(-lightDirection);
    // 计算漫反射强度
    float diff = max(dot(normal, lightDir), 0.0);
    // 计算镜面反射强度
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    // 合并各个光照分量
    vec3 diffuse  = lightColor * diff * getOutDiffuseColor().xyz;
    vec3 specular = lightColor * spec * getOutSpecularColor().xyz;
    return diffuse + specular;
}  

vec3 CalcDirLightAndShadow(vec3 normal, vec3 viewDir, vec3 lightColor, vec3 lightDirection, sampler2D shadowMap, mat4 lightSpaceMatrix) {
    float shadow = CalcLightShadow(lightSpaceMatrix * vec4(out_vertex_position, 1.0), shadowMap);    
    vec3 color = CalcDirLight(normal, viewDir, lightColor, lightDirection);
    return color * (1.0 - shadow);
}


float CalcPointLightShadow(samplerCube shadowMap, vec3 lightPosition, float range) {
    vec3 fragToLight = lightPosition - out_vertex_position;
    float closestDepth = unpackRGBAToDepth( texture(shadowMap, -fragToLight ) ); 
    closestDepth *= range;
    float currentDepth =  length(fragToLight);
    float bias = 0.05;
    float shadow = currentDepth -  bias > closestDepth ? 1.0 : 0.0;
    return shadow;
}


// 计算定点光在确定位置的光照颜色
vec3 CalcPointLight(vec3 normal, vec3 viewDir, vec3 lightColor, vec3 lightPosition, float range) {
    vec3 lightDirection = normalize(out_vertex_position - lightPosition);
    vec3 color = CalcDirLight(normal, viewDir, lightColor, lightDirection);
    float distance = length(lightPosition - out_vertex_position);
    if(distance > range){
        return vec3(0);
    } else {
        return color * (1.0 - distance / range);
    }
}

vec3 CalcPointLightAndShadow(vec3 normal, vec3 viewDir, vec3 lightColor, vec3 lightPosition, float range, samplerCube shadowMap) {
    float shadow = CalcPointLightShadow(shadowMap, lightPosition, range);    
    vec3 color = CalcPointLight(normal, viewDir, lightColor, lightPosition, range);
    return color * (1.0 - shadow);
}

vec3 CalcSpotLight(vec3 normal, vec3 viewDir, vec3 lightColor, vec3 lightPosition,  vec3 direction, float range, float innerConeAngle, float outerConeAngle) {
    vec3 lightDirection = out_vertex_position - lightPosition;
    vec3 lightDirectionNorm = normalize(lightDirection);
    float cosAngle = dot(lightDirectionNorm, direction);
    float f = smoothstep(outerConeAngle, innerConeAngle, cosAngle);
    vec3 color = CalcPointLight(normal, viewDir, lightColor, lightPosition, range) * f;    
    return color;
}  

vec3 CalcSpotLightAndShadow(vec3 normal, vec3 viewDir, vec3 lightColor, vec3 lightPosition,  vec3 direction, float range, float innerConeAngle, float outerConeAngle, sampler2D shadowMap, mat4 lightSpaceMatrix) {
    vec3 lightDirection = out_vertex_position - lightPosition;
    vec3 lightDirectionNorm = normalize(lightDirection);
    float cosAngle = dot(lightDirectionNorm, direction);
    float f = smoothstep(outerConeAngle, innerConeAngle, cosAngle);
    vec3 color = CalcPointLight(normal, viewDir, lightColor, lightPosition, range) * f;
    float shadow = CalcLightShadow(lightSpaceMatrix * vec4(out_vertex_position, 1.0), shadowMap);    
    return color * (1.0 - shadow);
}


void main(void) {
    // vec4 outColor = getOutColor();

    vec3 norm = normalize(out_normal);
    vec3 viewDir = normalize(camera_position - out_vertex_position);

    // start
    vec3 result = ambientColor.xyz * getOutDiffuseColor().xyz;
    {{#each uniforms._directionalLightArr}}

    {{#if this.castShadows}}
        result += CalcDirLightAndShadow(norm, viewDir, vec3({{this.color}}), {{this.direction}}, {{this.shadowMap}}, {{this.lightSpaceMatrix}} );
    {{else}}
        result += CalcDirLight(norm, viewDir, vec3({{this.color}}), {{this.direction}} );
    {{/if}}

    {{/each}}
    {{#each uniforms._pointLightArr}}

    {{#if this.castShadows}}
        result += CalcPointLightAndShadow(norm, viewDir, vec3({{this.color}}), {{this.position}}, {{this.range}}, {{this.shadowMap}} );
    {{else}}
        result += CalcPointLight(norm, viewDir, vec3({{this.color}}), {{this.position}}, {{this.range}} );
    {{/if}}
    
    {{/each}}
    {{#each uniforms._spotLightArr}}

    {{#if this.castShadows}}
        result += CalcSpotLightAndShadow(norm, viewDir, vec3({{this.color}}), {{this.position}}, {{this.direction}}, {{this.range}}, {{this.innerConeAngle}}, {{this.outerConeAngle}}, {{this.shadowMap}}, {{this.lightSpaceMatrix}});
    {{else}}
        result += CalcSpotLight(norm, viewDir, vec3({{this.color}}), {{this.position}},  {{this.direction}}, {{this.range}}, {{this.innerConeAngle}}, {{this.outerConeAngle}} );
    {{/if}}
    
    {{/each}}
    // end

    // result = ambient + diffuse + specular;
    gl_FragColor = vec4(result, getOutOpacityColor());

}

