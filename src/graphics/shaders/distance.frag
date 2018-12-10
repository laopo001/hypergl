{{#if data.GL2}}{{> gles3.frag}}{{/if}}
precision highp float;
uniform vec3 view_position;
uniform float light_range;
in vec3 out_vertex_position;

const float PackUpscale = 256. / 255.;
const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
    vec4 r = vec4( fract( v * PackFactors ), v );
    r.yzw -= r.xyz * ShiftRight8;
    return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
    return dot( v, UnpackFactors );
}

// vec4 pack (float depth) {
//     // 当光源与照射物间距离变远,z值会增大,而1个分量的8位已经不够存储深度值,所以扩充使用4个分量共32位进行存储
//     // 使用rgba 4字节共32位来存储z值,1个字节精度为1/256
//     const vec4 bitShift = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);
//     const vec4 bitMask = vec4(1.0/256.0, 1.0/256.0, 1.0/256.0, 0.0);
//     // gl_FragCoord:片元的坐标,fract():返回数值的小数部分
//     vec4 rgbaDepth = fract(depth * bitShift); //计算每个点的z值 
//     rgbaDepth -= rgbaDepth.gbaa * bitMask; // Cut off the value which do not fit in 8 bits
//     return rgbaDepth;
// }

void main() {       
    float depth = min(distance(view_position, out_vertex_position) / light_range, 0.99999);
    gl_FragColor = packDepthToRGBA(depth); 
}