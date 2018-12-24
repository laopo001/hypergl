{{#if data.GL2}}{{> gles3.vert}}{{/if}}
uniform mat4 uModelMatrix;
uniform mat4 uViewProjectionMatrix;

in vec3 vertex_position;
{{#if attributes.vertex_color}}
in vec4 vertex_color;
out vec4 vColor;
{{/if}}

vec4 getPosition() {
    vec4 posW = uModelMatrix * vec4(vertex_position, 1.0);
    return uViewProjectionMatrix * posW;
}


void main(void) {
    gl_Position = getPosition();
    {{#if attributes.vertex_color}}
    vColor = vertex_color;
    {{/if}}
}