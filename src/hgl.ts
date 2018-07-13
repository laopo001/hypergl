/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\scene\hgl.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Friday, July 13th 2018, 6:49:47 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, July 13th 2018, 7:48:20 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

export const version = '0.0.1';

export const BUFFER_STATIC = 1;
export const BUFFER_DYNAMIC = 2;
export const BUFFER_STREAM = 3;
export const BUFFER_GPUDYNAMIC = 4;

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


