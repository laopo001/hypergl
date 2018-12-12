{{#if data.GL2}}{{> gles3.vert}}{{/if}}
in vec3 vertex_position;
uniform mat4 matrix_viewProjection;
uniform mat4 matrix_model;
out vec3 out_vertex_texCoord0;
void main()
{
    gl_Position = matrix_viewProjection * matrix_model * vec4(vertex_position, 1.0); 
    out_vertex_texCoord0 = vertex_position; 
}
