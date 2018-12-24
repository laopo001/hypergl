{{#if data.GL2}}{{> gles3.vert}}{{else}}{{> gles2.vert}}{{/if}}
uniform mat4 uModelMatrix;
uniform mat4 uViewProjectionMatrix;
uniform mat4 uNormalMatrix;
in vec3 vertex_position;
out vec3 v_vertex_position;
{{#if attributes.vertex_color}}
in vec4 vertex_color;
out vec4 vColor;
{{/if}}
{{#if attributes.normal}}
in vec3 normal;
out vec3 v_normal;
{{/if}}
{{#if attributes.vertex_texCoord0}}
in vec2 vertex_texCoord0;
out vec2 v_vertex_texCoord0;
{{/if}}



vec4 getPosition() {
    vec4 posW = uModelMatrix * vec4(vertex_position, 1.0);
    return uViewProjectionMatrix * posW;
}


void main(void) {
    vec4 posW = uModelMatrix * vec4(vertex_position, 1.0);
    v_vertex_position = vec3(posW);
    gl_Position = uViewProjectionMatrix * posW;

    {{#if attributes.vertex_color}}
    vColor = vertex_color;
    {{/if}}
    {{#if attributes.vertex_texCoord0}}
    v_vertex_texCoord0 = vertex_texCoord0;
    {{/if}}
    {{#if attributes.normal}}
    v_normal = normalize(vec3(uNormalMatrix * vec4(normal,1)));
    {{/if}}
}