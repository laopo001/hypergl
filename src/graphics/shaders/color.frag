{{#if data.GL2}}{{> gles3.frag}}{{/if}}
precision highp float;
#ifdef GL2
precision highp sampler2DShadow;
#endif

uniform float opacity;
{{#if uniforms.diffuseColor}}
uniform vec4 diffuseColor;
{{/if}}


{{#if attributes.vertex_color}}
varying vec4 vColor;
vec4 getOutColor() {
    return vColor;
}
{{else}}
// uniform vec4 diffuseColor;
vec4 getOutColor() {
    return diffuseColor;
}
{{/if}}


float getOutOpacityColor() {
    return opacity;
}

void main(void)
{
    gl_FragColor =  vec4(getOutColor().xyz, getOutOpacityColor());
}