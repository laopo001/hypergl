uniform float uExposure;
vec3 toneMap(vec3 color) {
    return color * uExposure;
}