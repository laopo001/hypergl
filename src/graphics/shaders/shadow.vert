{{#if data.GL2}}{{> gles3.vert}}{{/if}}
attribute vec3 vertex_position;

uniform mat4 matrix_model;
uniform mat4 matrix_viewProjection;


void main()
{
    gl_Position = matrix_viewProjection * matrix_model * vec4(vertex_position, 1.0f);
}