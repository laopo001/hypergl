{{#if GL2}}{{> gles3.frag}}{{/if}}
precision highp float;
#ifdef GL2
precision highp sampler2DShadow;
#endif
{{#if vertex_color}}
varying vec4 vColor;
vec4 getOutColor() {
    return vColor;
}
{{else}}
uniform vec4 uColor;
vec4 getOutColor() {
    return uColor;
}
{{/if}}


void main(void)
{
    gl_FragColor = getOutColor();
}