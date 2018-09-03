import { Vec3 } from '../math';

/*
 * ProjectName: hypergl
 * FilePath: \src\types\index.ts
 * Created Date: Saturday, August 18th 2018, 4:51:54 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, September 3rd 2018, 11:01:05 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


export interface AppOption {
    webgl1?: boolean;
}

export type TypeArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;

export type TypeArrayConstructor = Int8ArrayConstructor | Uint8ArrayConstructor | Int16ArrayConstructor | Uint16ArrayConstructor |
    Int32ArrayConstructor | Uint32ArrayConstructor | Float32ArrayConstructor | Float64Array;
export type Fn<T> = (...args) => T;
export type FnVoid = Fn<void>;
export type Nullable<T> = T | null;
export type Undefined<T> = T | undefined;
export interface Obj<T> { [s: string]: Undefined<T> }
export interface CreateMeshOptions {
    positions: number[];
    normals?: number[]; // 法线
    indices: number[];
    tangents?: number[]; //
    colors?: number[];
    uvs?: number[];
    uvs1?: number[];
    blendIndices?: number[];
    blendWeights?: string[];
}


export interface CreateBoxOptions {
    halfExtents?: Vec3;
    widthSegments?: number;
    lengthSegments?: number;
    heightSegments?: number;
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