// #define USE_IBL 1
#define HAS_NORMALS 1
#define HAS_UV 1
// #define HAS_BASECOLORMAP 1
// #define HAS_METALROUGHNESSMAP 1
// #define HAS_NORMALMAP 1
// #define HAS_EMISSIVEMAP 1
// #define HAS_OCCLUSIONMAP 1
// #define USE_TEX_LOD 1
attribute vec4 vertex_position;
#ifdef HAS_NORMALS
    attribute vec3 normal;
#endif
#ifdef HAS_TANGENTS
    attribute vec4 vertex_tangent;
#endif
#ifdef HAS_UV
    attribute vec2 vertex_texCoord0;
#endif

// uniform mat4 u_MVPMatrix;
uniform mat4 uViewProjectionMatrix;
uniform mat4 uNormalMatrix;
uniform mat4 uModelMatrix;

varying vec3 v_vertex_position;
varying vec2 v_vertex_texCoord0;
#ifdef HAS_NORMALS
    #ifdef HAS_TANGENTS
        varying mat3 v_TBN;
    #else
        varying vec3 v_normal;
    #endif
#endif


void main() {
    vec4 pos = uModelMatrix * vertex_position;
    v_vertex_position = vec3(pos.xyz) / pos.w;
    #ifdef HAS_NORMALS
        #ifdef HAS_TANGENTS
            vec3 normalW = normalize(vec3(uNormalMatrix * vec4(a_Normal.xyz, 0.0)));
            vec3 tangentW = normalize(vec3(uModelMatrix * vec4(vertex_tangent.xyz, 0.0)));
            vec3 bitangentW = cross(normalW, tangentW) * vertex_tangent.w;
            v_TBN = mat3(tangentW, bitangentW, normalW);
        #else // HAS_TANGENTS ! = 1
            v_normal = normalize(vec3(uModelMatrix * vec4(a_Normal.xyz, 0.0)));
        #endif
    #endif
    
    #ifdef HAS_UV
        v_vertex_texCoord0 = vertex_texCoord0;
    #else
        v_vertex_texCoord0 = vec2(0., 0.);
    #endif
    
    gl_Position = uViewProjectionMatrix * uModelMatrix * vertex_position;
    // needs w for proper perspective correction
}