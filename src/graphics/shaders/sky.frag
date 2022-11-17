{{#if data.GL2}}{{> gles3.frag}}{{/if}}
precision highp float;
in vec3 out_vertex_texCoord0;
uniform samplerCube uSkyBox;  // 从sampler2D改为samplerCube

void main()
{
    gl_FragColor = texture(uSkyBox, out_vertex_texCoord0);
}
