{{#if data.GL2}}{{> gles3.vert}}{{/if}}
uniform mat4 matrix_model;
uniform mat4 matrix_viewProjection;

attribute vec3 vertex_position;
varying vec3 out_vertex_position;
{{#if attributes.vertex_color}}
attribute vec4 vertex_color;
varying vec4 vColor;
{{/if}}
{{#if attributes.vertex_texCoord0}}
attribute vec2 vertex_texCoord0;
varying vec2 out_vertex_texCoord0;
{{/if}}
{{#if attributes.normal}}
attribute vec3 normal;
varying vec3 out_normal;
{{/if}}


vec4 getPosition() {
    vec4 posW = matrix_model * vec4(vertex_position, 1.0);
    return matrix_viewProjection * posW;
}


void main(void) {
    gl_Position = getPosition();
    {{#if attributes.vertex_color}}
    vColor = vertex_color;
    {{/if}}
    {{#if attributes.vertex_texCoord0}}
    out_vertex_texCoord0 = vertex_texCoord0;
    {{/if}}
    {{#if attributes.normal}}
        out_normal = normal;
    {{/if}}
    out_vertex_position = gl_Position.xyz;
}