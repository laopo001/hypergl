{{#if GL2}}{{> gles3.frag}}{{/if}}
precision highp float;
#ifdef GL2
precision highp sampler2DShadow;
#endif
{{#if vertex_color}}
varying vec4 vColor;
{{else}}
uniform vec4 uColor;
#define vColor uColor
{{/if}}


void main(void)
{
    gl_FragColor = vColor;
}