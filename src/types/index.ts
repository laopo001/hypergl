import { Vec3 } from '../math';

/*
 * ProjectName: hypergl
 * FilePath: \src\types\index.ts
 * Created Date: Saturday, August 18th 2018, 4:51:54 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, September 5th 2018, 11:23:50 pm
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
