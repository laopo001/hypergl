/*
 * ProjectName: hypergl
 * FilePath: \src\types\index.ts
 * Created Date: Saturday, August 18th 2018, 4:51:54 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, March 5th 2019, 1:32:41 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Vec3 } from '../math';

export interface AppOption {
    webgl1?: boolean;
    stencil?: boolean;
    antialias?: boolean;
}

export interface CreateMeshOptions {
    positions: number[];
    normals?: number[]; // 法线
    indices?: number[];
    tangents?: number[]; //
    colors?: number[];
    uvs?: number[];
    uvs1?: number[];
    blendIndices?: number[];
    blendWeights?: string[];
}

export interface CreateDrawabelOptions {
    positions: number[];
    normals?: number[]; // 法线
    indices?: number[];
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

export * from './types';