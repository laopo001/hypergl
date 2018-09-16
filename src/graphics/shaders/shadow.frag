{{#if data.GL2}}{{> gles3.frag}}{{/if}}
precision highp float;
void main() {       
     gl_FragColor = vec4(gl_FragCoord.z, 0.0, 0.0, 0.0);      
    // gl_FragDepth = gl_FragCoord.z;
    // float depth = gl_FragCoord.z;
    // gl_FragColor = vec4(1.0);
}