/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\scene\hgl.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Friday, July 13th 2018, 6:49:47 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, July 27th 2018, 12:54:45 am
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
    FLOATARRAY,
    TEXTURE2D_SHADOW,
    TEXTURECUBE_SHADOW,
    TEXTURE3D
}



export enum SHADER {
    FORWARD = 0,
    FORWARDHDR = 1,
    DEPTH = 2,
    SHADOW = 3, // PCF3

    // 4: VSM8,
    // 5: VSM16,
    // 6: VSM32,
    // 7: PCF5,
    // 8: PCF3 POINT
    // 9: VSM8 POINT,
    // 10: VSM16 POINT,
    // 11: VSM32 POINT,
    // 12: PCF5 POINT
    // 13: PCF3 SPOT
    // 14: VSM8 SPOT,
    // 15: VSM16 SPOT,
    // 16: VSM32 SPOT,
    // 17: PCF5 SPOT
    PICK = 18,
}

export enum BLENDMODE {
    ZERO = 0,
    ONE = 1,
    SRC_COLOR = 2,
    ONE_MINUS_SRC_COLOR = 3,
    DST_COLOR = 4,
    ONE_MINUS_DST_COLOR = 5,
    SRC_ALPHA = 6,
    SRC_ALPHA_SATURATE = 7,
    ONE_MINUS_SRC_ALPHA = 8,
    DST_ALPHA = 9,
    ONE_MINUS_DST_ALPHA = 10
}

export enum BLENDEQUATION {
    ADD = 0,
    SUBTRACT = 1,
    REVERSE_SUBTRACT = 2,
    MIN = 3,
    MAX = 4
}

export enum CULLFACE {
    NONE = 0,
    BACK = 1,
    FRONT = 2,
    FRONTANDBACK = 3
}

export enum BLEND {
    SUBTRACTIVE = 0,
    ADDITIVE = 1,
    NORMAL = 2,
    NONE = 3,
    PREMULTIPLIED = 4,
    MULTIPLICATIVE = 5,
    ADDITIVEALPHA = 6,
    MULTIPLICATIVE2X = 7,
    SCREEN = 8,
    MIN = 9,
    MAX = 10
}

