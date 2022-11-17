{{#if data.GL2}}{{> gles3.frag}}{{/if}}
precision highp float;
#ifdef GL2
precision highp sampler2DShadow;
#endif
{{#if uniforms.uDiffuseTexture}}
uniform sampler2D uDiffuseTexture;
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
    {{#if uniforms.uDiffuseTexture}}
    return texture2D(uDiffuseTexture,out_vertex_texCoord0);
    {{else}}
    return diffuseColor;
    {{/if}}
}
{{/if}}


void main(void)
{
    gl_FragColor = getOutColor();
}