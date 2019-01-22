{{#if data.GL2}}{{> gles3.frag}}{{/if}}
precision highp float;
#ifdef GL2
precision highp sampler2DShadow;
#endif

void main() {
    gl_FragColor = vec4(0.04, 0.28, 0.26, 1.0);
}