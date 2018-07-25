/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\scene\hgl.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Friday, July 13th 2018, 6:49:47 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, July 26th 2018, 12:09:28 am
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