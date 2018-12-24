#define USE_IBL 1
#define HAS_NORMALS 1
#define HAS_UV 1
#define HAS_BASECOLORMAP 1
#define HAS_METALROUGHNESSMAP 1
#define HAS_NORMALMAP 1
#define HAS_EMISSIVEMAP 1
#define HAS_OCCLUSIONMAP 1
#define USE_TEX_LOD 1
attribute vec4 a_Position;
#ifdef HAS_NORMALS
    attribute vec4 a_Normal;
#endif
#ifdef HAS_TANGENTS
    attribute vec4 a_Tangent;
#endif
#ifdef HAS_UV
    attribute vec2 a_UV;
#endif

uniform mat4 u_MVPMatrix;
uniform mat4 uModelMatrix;
uniform mat4 u_NormalMatrix;
varying vec3 v_Position;
varying vec2 v_UV;
#ifdef HAS_NORMALS
    #ifdef HAS_TANGENTS
        varying mat3 v_TBN;
    #else
        varying vec3 v_Normal;
    #endif
#endif


void main() {
    vec4 pos = uModelMatrix * a_Position;
    v_Position = vec3(pos.xyz) / pos.w;
    #ifdef HAS_NORMALS
        #ifdef HAS_TANGENTS
            vec3 normalW = normalize(vec3(u_NormalMatrix * vec4(a_Normal.xyz, 0.0)));
            vec3 tangentW = normalize(vec3(uModelMatrix * vec4(a_Tangent.xyz, 0.0)));
            vec3 bitangentW = cross(normalW, tangentW) * a_Tangent.w;
            v_TBN = mat3(tangentW, bitangentW, normalW);
        #else // HAS_TANGENTS ! = 1
            v_Normal = normalize(vec3(uModelMatrix * vec4(a_Normal.xyz, 0.0)));
        #endif
    #endif
    
    #ifdef HAS_UV
        v_UV = a_UV;
    #else
        v_UV = vec2(0., 0.);
    #endif
    
    gl_Position = u_MVPMatrix * a_Position;
    // needs w for proper perspective correction
}