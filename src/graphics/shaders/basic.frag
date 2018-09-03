{{#if data.GL2}}{{> gles3.frag}}{{/if}}
precision highp float;
#ifdef GL2
precision highp sampler2DShadow;
#endif
{{#if uniforms.diffuseMap}}
uniform sampler2D diffuseMap;
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
uniform vec4 uColor;
vec4 getOutColor() {
    {{#if uniforms.diffuseMap}}
        return texture2D(diffuseMap,out_vertex_texCoord0);
    {{else}}
    return uColor;
    {{/if}}
}
{{/if}}


void main(void)
{
    gl_FragColor = getOutColor();
}