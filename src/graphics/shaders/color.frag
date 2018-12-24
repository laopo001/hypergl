{{#if data.GL2}}{{> gles3.frag}}{{/if}}
precision highp float;
#ifdef GL2
precision highp sampler2DShadow;
#endif

uniform float uOpacity;
{{#if uniforms.uDiffuseColor}}
uniform vec4 uDiffuseColor;
{{/if}}


{{#if attributes.vertex_color}}
varying vec4 vColor;
vec4 getOutColor() {
    return vColor;
}
{{else}}
// uniform vec4 uDiffuseColor;
vec4 getOutColor() {
    return uDiffuseColor;
}
{{/if}}


float getOutOpacityColor() {
    return uOpacity;
}

void main(void)
{
    gl_FragColor =  vec4(getOutColor().xyz, getOutOpacityColor());
}