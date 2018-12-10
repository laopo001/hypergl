{{#if data.GL2}}{{> gles3.vert}}{{/if}}
in vec3 vertex_position;

uniform mat4 matrix_model;
uniform mat4 matrix_viewProjection;
out vec3 out_vertex_position;

void main()
{
    vec4 posW = matrix_model * vec4(vertex_position, 1.0);
    out_vertex_position = vec3(posW);
    gl_Position = matrix_viewProjection * posW;
}