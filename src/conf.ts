/*
 * ProjectName: hypergl
 * FilePath: \src\conf.ts
 * Created Date: Tuesday, August 14th 2018, 5:02:06 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, September 7th 2018, 12:58:49 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */



/**
 * 数据类型
 *
 * @export
 * @enum {number}
 */
export enum DataType {
    INT8,
    UINT8,
    INT16,
    UINT16,
    INT32,
    UINT32,
    FLOAT32
}


/**
 * 顶点数据输入定义
 *
 * @export
 * @enum {number}
 */
export enum SEMANTIC {
    POSITION = 'POSITION',
    NORMAL = 'NORMAL',
    TANGENT = 'TANGENT',
    BLENDWEIGHT = 'BLENDWEIGHT',
    BLENDINDICES = 'BLENDINDICES',
    COLOR = 'COLOR',
    TEXCOORD0 = 'TEXCOORD0',
    TEXCOORD1 = 'TEXCOORD1',
    TEXCOORD2 = 'TEXCOORD2',
    TEXCOORD3 = 'TEXCOORD3',
    TEXCOORD4 = 'TEXCOORD4',
    TEXCOORD5 = 'TEXCOORD5',
    TEXCOORD6 = 'TEXCOORD6',
    TEXCOORD7 = 'TEXCOORD7'
}

export enum SEMANTICMAP {
    POSITION = 'vertex_position',
    NORMAL = 'normal',
    TANGENT = 'TANGENT',
    BLENDWEIGHT = 'BLENDWEIGHT',
    BLENDINDICES = 'BLENDINDICES',
    COLOR = 'vertex_color',
    TEXCOORD0 = 'vertex_texCoord0',
    TEXCOORD1 = 'vertex_texCoord1',
    TEXCOORD2 = 'vertex_texCoord2',
    TEXCOORD3 = 'vertex_texCoord3',
    TEXCOORD4 = 'vertex_texCoord4',
    TEXCOORD5 = 'vertex_texCoord5',
    TEXCOORD6 = 'vertex_texCoord6',
    TEXCOORD7 = 'vertex_texCoord7'
}


export enum BUFFER {
    STATIC = 'STATIC',
    DYNAMIC = 'DYNAMIC',
    STREAM = 'STREAM',
    GPUDYNAMIC = 'GPUDYNAMIC'
}

export enum CURVE {
    LINEAR = 'LINEAR',
    SMOOTHSTEP = 'SMOOTHSTEP',
    CATMULL = 'CATMULL',
    CARDINAL = 'CARDINAL'
}


export enum UNIFORM_TYPE {
    BOOL,
    INT,
    FLOAT,
    FLOAT_VEC2,
    FLOAT_VEC3,
    FLOAT_VEC4,
    INT_VEC2,
    INT_VEC3,
    INT_VEC4,
    BOOL_VEC2,
    BOOL_VEC3,
    BOOL_VEC4,
    FLOAT_MAT2,
    FLOAT_MAT3,
    FLOAT_MAT4,
    SAMPLER_2D,
    SAMPLER_CUBE,
    SAMPLER_2D_SHADOW,
    SAMPLER_CUBE_SHADOW,
    SAMPLER_3D,
    FLOATARRAY
}

export enum FILTER {
    /**
     * 在纹理基层上执行线性过滤,从最大的贴图中选择4个像素然后混合
     */
    LINEAR,
    /**
     * 在mip层之间执行线性插补，并执行线性过滤
     * 选择最合适的两个贴图，从每个上选择 4 个像素然后混合
     */
    LINEAR_MIPMAP_LINEAR,
    /**
     * 选择最临近的mip层，并执行线性过滤
     * 选择最合适的贴图，然后取出 4 个像素进行混合
     */
    LINEAR_MIPMAP_NEAREST,
    /**
     * 在纹理基层上执行最邻近过滤
     */
    NEAREST,
    /**
     * 选择最临近的mip层，并执行最临近的过滤,从最大的贴图中选择 1 个像素
     * 选择最合适的贴图，然后从上面找到一个像素
     */
    NEAREST_MIPMAP_NEAREST,
    /**
     * 在mip层之间执行线性插补，并执行最临近的过滤
     *  选择最合适的两个贴图，从每个上面选择 1 个像素然后混合
     */
    NEAREST_MIPMAP_LINEAR,
}

export enum ADDRESS {
    /**
     * 仅使用小数部分忽略纹理坐标的整数部分
     */
    REPEAT,
    /**
     * 将纹理坐标夹在0到1的范围内
     */
    CLAMP_TO_EDGE,
    /**
     * 如果整数部分是偶数，则将纹理坐标设置为小数部分;如果整数部分是奇数，则纹理坐标设置为1减去小数部分。
     */
    MIRRORED_REPEAT
}


export enum PIXELFORMAT {
    A8,
    L8,
    L8_A8,
    R5_G6_B5,
    R5_G5_B5_A1,
    R4_G4_B4_A4,
    R8_G8_B8,
    R8_G8_B8_A8,
    DXT1,
    DXT3,
    DXT5,
    RGB16F,
    RGBA16F,
    RGB32F,
    RGBA32F,
    ETC1,
    PVRTC_2BPP_RGB_1,
    PVRTC_2BPP_RGBA_1,
    PVRTC_4BPP_RGB_1,
    PVRTC_4BPP_RGBA_1,
    _111110F, // 浮点颜色格式，红色和绿色通道为11位，蓝色通道为10位（仅限WebGL2）。
    SRGB,
    SRGBA,
    R32F,
    DEPTH,
    DEPTHSTENCIL,
}