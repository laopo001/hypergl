/**
 * File: c:\Users\35327\Githubs\hypergl\src\utils\index.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Saturday, July 28th 2018, 6:09:12 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, July 28th 2018, 6:43:08 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */


import { Vec3 } from '../math/vec3';
export function calculateNormals(positions: number[], indices: number[]): number[] {
    const triangleCount = indices.length / 3;
    const vertexCount = positions.length / 3;
    // tslint:disable-next-line:one-variable-per-declaration
    let i1, i2, i3;
    let i; // Loop counter
    const p1 = new Vec3();
    const p2 = new Vec3();
    const p3 = new Vec3();
    const p1p2 = new Vec3();
    const p1p3 = new Vec3();
    const faceNormal = new Vec3();

    const normals = [];

    // Initialize the normal array to zero
    for (i = 0; i < positions.length; i++) {
        normals[i] = 0;
    }

    // Accumulate face normals for each vertex
    for (i = 0; i < triangleCount; i++) {
        i1 = indices[i * 3];
        i2 = indices[i * 3 + 1];
        i3 = indices[i * 3 + 2];

        p1.set(positions[i1 * 3], positions[i1 * 3 + 1], positions[i1 * 3 + 2]);
        p2.set(positions[i2 * 3], positions[i2 * 3 + 1], positions[i2 * 3 + 2]);
        p3.set(positions[i3 * 3], positions[i3 * 3 + 1], positions[i3 * 3 + 2]);

        p1p2.sub2(p2, p1);
        p1p3.sub2(p3, p1);
        faceNormal.cross(p1p2, p1p3).normalize();

        normals[i1 * 3] += faceNormal.x;
        normals[i1 * 3 + 1] += faceNormal.y;
        normals[i1 * 3 + 2] += faceNormal.z;
        normals[i2 * 3] += faceNormal.x;
        normals[i2 * 3 + 1] += faceNormal.y;
        normals[i2 * 3 + 2] += faceNormal.z;
        normals[i3 * 3] += faceNormal.x;
        normals[i3 * 3 + 1] += faceNormal.y;
        normals[i3 * 3 + 2] += faceNormal.z;
    }

    // Normalize all normals
    for (i = 0; i < vertexCount; i++) {
        const nx = normals[i * 3];
        const ny = normals[i * 3 + 1];
        const nz = normals[i * 3 + 2];
        const invLen = 1 / Math.sqrt(nx * nx + ny * ny + nz * nz);
        normals[i * 3] *= invLen;
        normals[i * 3 + 1] *= invLen;
        normals[i * 3 + 2] *= invLen;
    }

    return normals;
}
