vec3 addFog(vec3 color) {
    {{#ifEq shaderVars.fog 1}}
    float depth = gl_FragCoord.z / gl_FragCoord.w; // out_Dist
    float fogFactor = (uFogDist.y - depth) / (uFogDist.y - uFogDist.x);
    color = mix(uFogColor, vec3(color), clamp(fogFactor, 0.0, 1.0));
    {{/ifEq}}
    {{#ifEq shaderVars.fog 2}}
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    float fogFactor = exp(-depth * uFogDensity);
    fogFactor = clamp(fogFactor, 0.0, 1.0);
    color = mix(uFogColor, color, fogFactor);
    {{/ifEq}}
    {{#ifEq shaderVars.fog 3}}
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    float fogFactor = exp(-depth * depth * uFogDensity * uFogDensity);
    fogFactor = clamp(fogFactor, 0.0, 1.0);
    color = mix(uFogColor, color, fogFactor);
    {{/ifEq}}
    return color;
}