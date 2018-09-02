{{#if GL2}}{{> gles3.vert}}{{/if}}
uniform mat4 matrix_model;
uniform mat4 matrix_viewProjection;
{{#if vertex_color}}
attribute vec4 vertex_color;
varying vec4 vColor;
{{/if}}
{{#if texture_diffuseMap}}
attribute vec2 vertex_texCoord0;
varying vec2 v_vertex_texCoord0;
{{/if}}


attribute vec3 vertex_position;

vec4 getPosition() {
    vec4 posW = matrix_model * vec4(vertex_position, 1.0);
    return matrix_viewProjection * posW;
}


void main(void) {
    gl_Position = getPosition();
    {{#if vertex_color}}
    vColor = vertex_color;
    {{/if}}
    {{#if texture_diffuseMap}}
    v_vertex_texCoord0 = vertex_texCoord0;
    {{/if}}
}