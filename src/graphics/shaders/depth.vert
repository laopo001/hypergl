{{#if data.GL2}}{{> gles3.vert}}{{/if}}
in vec3 vertex_position;

uniform mat4 uModelMatrix;
uniform mat4 uViewProjectionMatrix;


void main()
{
    gl_Position = uViewProjectionMatrix * uModelMatrix * vec4(vertex_position, 1.0f);
}