{{#if data.GL2}}{{> gles3.frag}}{{/if}}
precision highp float;

uniform vec3 camera_position;

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
{{/if}}


void main(void)
{
    // vec4 outColor = getOutColor();
    vec3 lightColor = vec3(1, 1, 1);

    vec3 ambient = lightColor * ambientColor.xyz;

    vec3 norm = normalize(out_normal);
    vec3 lightDir = normalize(lightPosition - out_vertex_position);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = lightColor * (diff * getOutDiffuseColor().xyz);

    // 镜面光
    vec3 viewDir = normalize(camera_position - out_vertex_position);
    vec3 reflectDir = reflect(-lightDir, norm);  
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    vec3 specular = lightColor * (spec * specularColor.xyz);  

    vec3 result = ambient + diffuse + specular;
    gl_FragColor = vec4(result, 1.0);
    // gl_FragColor = vec4(diffuse, 1.0);

}