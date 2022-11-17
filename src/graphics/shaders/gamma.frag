uniform float uGammaCorrection;
vec3 GammaToLinear( vec3 value ) {
    return pow( value.rgb, vec3( uGammaCorrection ) );
}
vec3 LinearToGamma( vec3 value ) {
    value += vec3(0.0000001);
    return pow( value.rgb, vec3( 1.0 / uGammaCorrection ) );
}