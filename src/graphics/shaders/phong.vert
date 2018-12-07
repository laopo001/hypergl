{{#if data.GL2}}{{> gles3.vert}}{{/if}}
uniform mat4 matrix_model;
uniform mat4 matrix_viewProjection;
uniform mat4 matrix_normal;
attribute vec3 vertex_position;
varying vec3 out_vertex_position;
// varying float out_Dist;
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
    vec4 posW = matrix_model * vec4(vertex_position, 1.0);
    out_vertex_position = vec3(posW);
    gl_Position = matrix_viewProjection * posW;
    // out_Dist = gl_Position.w;

    {{#if attributes.vertex_color}}
    vColor = vertex_color;
    {{/if}}
    {{#if attributes.vertex_texCoord0}}
    out_vertex_texCoord0 = vertex_texCoord0;
    {{/if}}
    {{#if attributes.normal}}
    out_normal = normalize(vec3(matrix_normal * vec4(normal,1)));
    {{/if}}
}