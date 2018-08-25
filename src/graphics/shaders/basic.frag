{{#if GL2}}{{> gles3.frag}}{{/if}}
precision highp float;
#ifdef GL2
precision highp sampler2DShadow;
#endif
varying vec4 vColor;
void main(void)
{
    gl_FragColor = vColor;
}