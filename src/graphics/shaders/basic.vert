{{#if data.GL2}}{{> gles3.vert}}{{/if}}
uniform mat4 uModelMatrix;
uniform mat4 uViewProjectionMatrix;

attribute vec3 vertex_position;
{{#if attributes.vertex_color}}
attribute vec4 vertex_color;
varying vec4 vColor;
{{/if}}
{{#if attributes.vertex_texCoord0}}
attribute vec2 vertex_texCoord0;
varying vec2 out_vertex_texCoord0;
{{/if}}

vec4 getPosition() {
    vec4 posW = uModelMatrix * vec4(vertex_position, 1.0);
    return uViewProjectionMatrix * posW;
}


void main(void) {
    gl_Position = getPosition();
    {{#if attributes.vertex_color}}
    vColor = vertex_color;
    {{/if}}
    {{#if attributes.vertex_texCoord0}}
    out_vertex_texCoord0 = vertex_texCoord0;
    {{/if}}
}