/*
 * ProjectName: hypergl
 * FilePath: \src\conf.ts
 * Created Date: Tuesday, August 14th 2018, 5:02:06 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 5:22:47 pm
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
    STATIC = 1,
    DYNAMIC = 2,
    STREAM = 3,
    GPUDYNAMIC = 4
}
