{{#if data.GL2}}{{> gles3.vert}}{{/if}}
in vec3 vertex_position;

uniform mat4 uModelMatrix;
uniform mat4 uViewProjectionMatrix;
out vec3 out_vertex_position;

void main()
{
    vec4 posW = uModelMatrix * vec4(vertex_position, 1.0);
    out_vertex_position = vec3(posW);
    gl_Position = uViewProjectionMatrix * posW;
}