/*
 * ProjectName: hypergl
 * FilePath: \src\types\index.ts
 * Created Date: Saturday, August 18th 2018, 4:51:54 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, August 22nd 2018, 11:32:51 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


export interface AppOption {

}

export type TypeArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;

export type TypeArrayConstructor = Int8ArrayConstructor | Uint8ArrayConstructor | Int16ArrayConstructor | Uint16ArrayConstructor |
    Int32ArrayConstructor | Uint32ArrayConstructor | Float32ArrayConstructor | Float64Array;


export type Fn<T> = (...args) => T;

export type FnVoid = Fn<void>;

export type Nullable<T> = T | null;