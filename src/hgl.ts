/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\scene\hgl.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Friday, July 13th 2018, 6:49:47 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, July 25th 2018, 12:24:42 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

export const version = '0.0.1';

export const BUFFER_STATIC = 1;
export const BUFFER_DYNAMIC = 2;
export const BUFFER_STREAM = 3;
export const BUFFER_GPUDYNAMIC = 4;

export const SHADERTAG_MATERIAL = 1;
export enum DataType {
    INT8 = 0,
    UINT8 = 1,
    INT16 = 2,
    UINT16 = 3,
    INT32 = 4,
    UINT32 = 5,
    FLOAT32 = 6
}

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

export enum UNIFORMTYPE {
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
}

// _typeToPc[gl.BOOL] = pc.UNIFORMTYPE_BOOL;
// _typeToPc[gl.INT] = pc.UNIFORMTYPE_INT;
// _typeToPc[gl.FLOAT] = pc.UNIFORMTYPE_FLOAT;
// _typeToPc[gl.FLOAT_VEC2] = pc.UNIFORMTYPE_VEC2;
// _typeToPc[gl.FLOAT_VEC3] = pc.UNIFORMTYPE_VEC3;
// _typeToPc[gl.FLOAT_VEC4] = pc.UNIFORMTYPE_VEC4;
// _typeToPc[gl.INT_VEC2] = pc.UNIFORMTYPE_IVEC2;
// _typeToPc[gl.INT_VEC3] = pc.UNIFORMTYPE_IVEC3;
// _typeToPc[gl.INT_VEC4] = pc.UNIFORMTYPE_IVEC4;
// _typeToPc[gl.BOOL_VEC2] = pc.UNIFORMTYPE_BVEC2;
// _typeToPc[gl.BOOL_VEC3] = pc.UNIFORMTYPE_BVEC3;
// _typeToPc[gl.BOOL_VEC4] = pc.UNIFORMTYPE_BVEC4;
// _typeToPc[gl.FLOAT_MAT2] = pc.UNIFORMTYPE_MAT2;
// _typeToPc[gl.FLOAT_MAT3] = pc.UNIFORMTYPE_MAT3;
// _typeToPc[gl.FLOAT_MAT4] = pc.UNIFORMTYPE_MAT4;
// _typeToPc[gl.SAMPLER_2D] = pc.UNIFORMTYPE_TEXTURE2D;
// _typeToPc[gl.SAMPLER_CUBE] = pc.UNIFORMTYPE_TEXTURECUBE;