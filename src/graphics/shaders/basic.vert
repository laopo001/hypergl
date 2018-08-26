{{#if GL2}}{{> gles3.vert}}{{/if}}
uniform mat4 matrix_model;
uniform mat4 matrix_viewProjection;
attribute vec4 vertex_color;
attribute vec3 vertex_position;
varying vec4 vColor;

vec4 getPosition() {
    vec4 posW = matrix_model * vec4(vertex_position, 1.0);
    return matrix_viewProjection * posW;
}


void main(void) {
    gl_Position = getPosition();
    vColor = vertex_color;
}