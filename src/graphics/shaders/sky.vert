{{#if data.GL2}}{{> gles3.vert}}{{/if}}
in vec3 vertex_position;
uniform mat4 matrix_viewProjection;
uniform mat4 matrix_model;
out vec3 out_vertex_texCoord0;

// vec3 getPosition(mat4 matrix_model){
//     return vec3(10.0,20.0,30.0);
// }

void main()
{
    gl_Position = matrix_viewProjection * matrix_model * vec4(vertex_position, 1.0); 
    // vec3 position = getPosition(matrix_model);
    out_vertex_texCoord0 = vertex_position; 
}
