{{#if data.GL2}}{{> gles3.frag}}{{/if}}
precision highp float;
#ifdef GL2
precision highp sampler2DShadow;
#endif
{{#if uniforms.diffuseTexture}}
uniform sampler2D diffuseTexture;
{{/if}}
{{#if uniforms.diffuseColor}}
uniform vec4 diffuseColor;
{{/if}}
{{#if attributes.vertex_texCoord0}}
varying vec2 out_vertex_texCoord0;
{{/if}}

{{#if attributes.vertex_color}}
varying vec4 vColor;
vec4 getOutColor() {
    return vColor;
}
{{else}}
// uniform vec4 diffuseColor;
vec4 getOutColor() {
    {{#if uniforms.diffuseTexture}}
    return texture2D(diffuseTexture,out_vertex_texCoord0);
    {{else}}
    return diffuseColor;
    {{/if}}
}
{{/if}}


void main(void)
{
    gl_FragColor = getOutColor();
}