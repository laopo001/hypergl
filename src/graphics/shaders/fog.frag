vec3 addFog(vec3 color) {
    {{#ifEq shaderTempletes.fog 1}}
    float depth = gl_FragCoord.z / gl_FragCoord.w; // out_Dist
    float fogFactor = (fogDist.y - depth) / (fogDist.y - fogDist.x);
    color = mix(fogColor, vec3(color), clamp(fogFactor, 0.0, 1.0));
    {{/ifEq}}
    {{#ifEq shaderTempletes.fog 2}}
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    float fogFactor = exp(-depth * fogDensity);
    fogFactor = clamp(fogFactor, 0.0, 1.0);
    color = mix(fogColor, color, fogFactor);
    {{/ifEq}}
    {{#ifEq shaderTempletes.fog 3}}
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    float fogFactor = exp(-depth * depth * fogDensity * fogDensity);
    fogFactor = clamp(fogFactor, 0.0, 1.0);
    color = mix(fogColor, color, fogFactor);
    {{/ifEq}}
    return color;
}