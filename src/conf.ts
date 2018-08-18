/*
 * ProjectName: hypergl
 * FilePath: \src\conf.ts
 * Created Date: Tuesday, August 14th 2018, 5:02:06 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, August 19th 2018, 12:48:35 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
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

export enum BUFFER {
    STATIC = 'STATIC',
    DYNAMIC = 'DYNAMIC',
    STREAM = 'STREAM',
    GPUDYNAMIC = 'GPUDYNAMIC'
}

export enum CURVE {
    LINEAR = 0,
    SMOOTHSTEP = 1,
    CATMULL = 2,
    CARDINAL = 3
}