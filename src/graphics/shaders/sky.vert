{{#if data.GL2}}{{> gles3.vert}}{{/if}}
in vec3 vertex_position;
uniform mat4 uViewProjectionMatrix;
uniform mat4 uModelMatrix;
out vec3 out_vertex_texCoord0;

// vec3 getPosition(mat4 uModelMatrix){
//     return vec3(10.0,20.0,30.0);
// }

void main()
{
    gl_Position = uViewProjectionMatrix * uModelMatrix * vec4(vertex_position, 1.0); 
    // vec3 position = getPosition(uModelMatrix);
    out_vertex_texCoord0 = vertex_position; 
}
