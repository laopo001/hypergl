{{#if data.GL2}}{{> gles3.frag}}{{/if}}
precision highp float;

uniform vec3 camera_position;

// directionalLight start
{{#each uniforms._directionalLightArr}}
// uniform vec3 {{this.position}};
uniform vec4 {{this.color}};
uniform vec3 {{this.direction}};
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
// 计算方向
vec3 CalcDirLight(vec3 normal, vec3 viewDir, vec3 lightColor,vec3 lightDirection)
{
    vec3 lightDir = normalize(-lightDirection);
    // 计算漫反射强度
    float diff = max(dot(normal, lightDir), 0.0);
    // 计算镜面反射强度
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    // 合并各个光照分量

    vec3 ambient  = ambientColor.xyz * getOutDiffuseColor().xyz;
    vec3 diffuse  = lightColor * diff * getOutDiffuseColor().xyz;
    vec3 specular = lightColor * spec * getOutSpecularColor().xyz;
    return (ambient + diffuse + specular);
}  
// 计算定点光在确定位置的光照颜色
vec3 CalcPointLight(vec3 normal, vec3 viewDir, vec3 lightColor, vec3 lightPosition, float range)
{
    vec3 lightDirection = normalize(out_vertex_position - lightPosition);
    vec3 color = CalcDirLight(normal, viewDir, lightColor, lightDirection);
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
    vec3 result = vec3(0);
    {{#each uniforms._directionalLightArr}}
        result += CalcDirLight(norm, viewDir, vec3({{this.color}}), {{this.direction}});
    {{/each}}
    {{#each uniforms._pointLightArr}}
        // vec3 lightDir = normalize(out_vertex_position - {{this.position}});
        result += CalcPointLight(norm, viewDir, vec3({{this.color}}), {{this.position}}, {{this.range}} );
    {{/each}}
    // end

    // result = ambient + diffuse + specular;
    gl_FragColor = vec4(result, 1.0);
    // gl_FragColor = vec4(diffuse, 1.0);

}

