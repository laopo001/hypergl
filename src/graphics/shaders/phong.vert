{{#if data.GL2}}{{> gles3.vert}}{{else}}{{> gles2.vert}}{{/if}}
uniform mat4 matrix_model;
uniform mat4 matrix_viewProjection;
uniform mat4 matrix_normal;
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
    vec4 posW = matrix_model * vec4(vertex_position, 1.0);
    return matrix_viewProjection * posW;
}


void main(void) {
    vec4 posW = matrix_model * vec4(vertex_position, 1.0);
    v_vertex_position = vec3(posW);
    gl_Position = matrix_viewProjection * posW;

    {{#if attributes.vertex_color}}
    vColor = vertex_color;
    {{/if}}
    {{#if attributes.vertex_texCoord0}}
    v_vertex_texCoord0 = vertex_texCoord0;
    {{/if}}
    {{#if attributes.normal}}
    v_normal = normalize(vec3(matrix_normal * vec4(normal,1)));
    {{/if}}
}