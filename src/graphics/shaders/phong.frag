{{#if data.GL2}}{{> gles3.frag}}{{/if}}
precision highp float;

uniform vec3 camera_position;

// directionalLight start
{{#each uniforms._directionalLightArr}}
// uniform vec3 {{this.position}};
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
{{/each}}
// pointLight end

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
    return texture2D(diffuseTexture,out_vertex_texCoord0);
    {{else}}
    return diffuseColor;
    {{/if}}
}
vec4 getOutSpecularColor() {
    {{#if uniforms.specularTexture}}
    return texture2D(specularTexture,out_vertex_texCoord0);
    {{else}}
    return specularColor;
    {{/if}}
}
{{/if}}

float unpack(const in vec4 rgbaDepth) {
    const vec4 bitShift = vec4(1.0, 1.0/256.0, 1.0/(256.0*256.0), 1.0/(256.0*256.0*256.0));
    return dot(rgbaDepth, bitShift);
}

float ShadowCalculation(vec4 fragPosLightSpace, sampler2D shadowMap, vec3 lightDirection)
{
    // 执行透视除法
    vec3 projCoords = fragPosLightSpace.xyz / fragPosLightSpace.w;
    // 变换到[0,1]的范围
    projCoords = projCoords * 0.5 + 0.5;
    // 取得最近点的深度(使用[0,1]范围下的fragPosLight当坐标)
    float closestDepth = texture(shadowMap, projCoords.xy).r; 
    // 取得当前片元在光源视角下的深度
    float currentDepth =  clamp(projCoords.z, 0.0, 1.0);
    // 检查当前片元是否在阴影中
    float bias = max(0.05 * (1.0 - dot(out_normal, -lightDirection)), 0.005);
    // float shadow = currentDepth > closestDepth + bias ? 1.0 : 0.0float shadow = 0.0;
    float shadow = 0.0;
    float texelSize=1.0 / 2048.0;
    for(float y=-1.0; y <= 1.0; y += 1.0){
        for(float x=-1.0; x <=1.0; x += 1.0){
            float rgbaDepth = texture(shadowMap, projCoords.xy + vec2(x, y) * texelSize).r;
            shadow += projCoords.z - bias > rgbaDepth ? 1.0 : 0.0;
        }
    }
    shadow/=9.0;

    return shadow;
}

// 计算方向
vec3 CalcDirLight(vec3 normal, vec3 viewDir, vec3 lightColor, vec3 lightDirection, sampler2D shadowMap, mat4 lightSpaceMatrix)
{
    vec3 lightDir = normalize(-lightDirection);
    // 计算漫反射强度
    float diff = max(dot(normal, lightDir), 0.0);
    // 计算镜面反射强度
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    // 合并各个光照分量
 
    vec3 diffuse  = lightColor * diff * getOutDiffuseColor().xyz;
    vec3 specular = lightColor * spec * getOutSpecularColor().xyz;
    float shadow = ShadowCalculation(lightSpaceMatrix * vec4(out_vertex_position, 1.0), shadowMap, lightDirection);    
    // float visibility = min(0.6 + (1.0 - shadow), 1.0);
    return (diffuse + specular) * (1.0 - shadow);
}  
// 计算定点光在确定位置的光照颜色
vec3 CalcPointLight(vec3 normal, vec3 viewDir, vec3 lightColor, vec3 lightPosition, float range, sampler2D shadowMap, mat4 lightSpaceMatrix)
{
    vec3 lightDirection = normalize(out_vertex_position - lightPosition);
    vec3 color = CalcDirLight(normal, viewDir, lightColor, lightDirection, shadowMap, lightSpaceMatrix);
    float distance = length(lightPosition - out_vertex_position);
    if(distance > range){
        return vec3(0);
    } else{
         return color * (1.0f - distance / range);
    }
}



void main(void)
{
    // vec4 outColor = getOutColor();

    vec3 norm = normalize(out_normal);
    vec3 viewDir = normalize(camera_position - out_vertex_position);

    // start
    vec3 result = ambientColor.xyz * getOutDiffuseColor().xyz;
    {{#each uniforms._directionalLightArr}}
        result += CalcDirLight(norm, viewDir, vec3({{this.color}}), {{this.direction}}, {{this.shadowMap}}, {{this.lightSpaceMatrix}} );
    {{/each}}
    {{#each uniforms._pointLightArr}}
        // vec3 lightDir = normalize(out_vertex_position - {{this.position}});
        result += CalcPointLight(norm, viewDir, vec3({{this.color}}), {{this.position}}, {{this.range}}, {{this.shadowMap}}, {{this.lightSpaceMatrix}});
    {{/each}}
    // end

    // result = ambient + diffuse + specular;
    gl_FragColor = vec4(result, 1.0);
    // gl_FragColor = vec4(diffuse, 1.0);

}

