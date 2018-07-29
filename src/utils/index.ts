/**
 * File: c:\Users\35327\Githubs\hypergl\src\utils\index.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Saturday, July 28th 2018, 6:09:12 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, July 29th 2018, 8:11:43 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */


import { Vec3 } from '../math/vec3';
import { type } from '../core/core';
import { SEMANTIC, DataType, PRIMITIVE, INDEXFORMAT } from '../hgl';
import { BoundingBox } from '../shape/bounding-box';
import { Mesh } from '../mesh/mesh';
import { VertexFormat, VertexType } from '../graphics/vertexFormat';
import { VertexBuffer } from '../graphics/vertexBuffer';
import { VertexIterator } from '../graphics/vertex-iterator';
import { IndexBuffer } from '../graphics/indexBuffer';
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

export function extend(target, ex) {
    // tslint:disable-next-line:one-variable-per-declaration
    let prop,
        copy;

    // tslint:disable-next-line:forin
    for (prop in ex) {
        copy = ex[prop];
        if (type(copy) === 'object') {
            target[prop] = extend({}, copy);
        } else if (type(copy) === 'array') {
            target[prop] = extend([], copy);
        } else {
            target[prop] = copy;
        }
    }

    return target;
}


// tslint:disable-next-line:cyclomatic-complexity
export function createMesh(device, positions, opts) {
    // Check the supplied options and provide defaults for unspecified ones
    const normals = opts && opts.normals !== undefined ? opts.normals : null;
    const tangents = opts && opts.tangents !== undefined ? opts.tangents : null;
    const colors = opts && opts.colors !== undefined ? opts.colors : null;
    const uvs = opts && opts.uvs !== undefined ? opts.uvs : null;
    const uvs1 = opts && opts.uvs1 !== undefined ? opts.uvs1 : null;
    const indices = opts && opts.indices !== undefined ? opts.indices : null;
    const blendIndices = opts && opts.blendIndices !== undefined ? opts.blendIndices : null;
    const blendWeights = opts && opts.blendWeights !== undefined ? opts.blendWeights : null;

    const vertexDesc: VertexType[] = [
        { semantic: SEMANTIC.POSITION, length: 3, dataType: DataType.FLOAT32 }
    ];
    if (normals !== null) {
        vertexDesc.push({ semantic: SEMANTIC.NORMAL, length: 3, dataType: DataType.FLOAT32 });
    }
    if (tangents !== null) {
        vertexDesc.push({ semantic: SEMANTIC.TANGENT, length: 4, dataType: DataType.FLOAT32 });
    }
    if (colors !== null) {
        vertexDesc.push({ semantic: SEMANTIC.COLOR, length: 4, dataType: DataType.UINT8, normalize: true });
    }
    if (uvs !== null) {
        vertexDesc.push({ semantic: SEMANTIC.TEXCOORD0, length: 2, dataType: DataType.FLOAT32 });
    }
    if (uvs1 !== null) {
        vertexDesc.push({ semantic: SEMANTIC.TEXCOORD1, length: 2, dataType: DataType.FLOAT32 });
    }
    if (blendIndices !== null) {
        vertexDesc.push({ semantic: SEMANTIC.BLENDINDICES, length: 2, dataType: DataType.UINT8 });
    }
    if (blendWeights !== null) {
        vertexDesc.push({ semantic: SEMANTIC.BLENDWEIGHT, length: 2, dataType: DataType.FLOAT32 });
    }

    const vertexFormat = new VertexFormat(device, vertexDesc);

    // Create the vertex buffer
    const numVertices = positions.length / 3;
    const vertexBuffer = new VertexBuffer(device, vertexFormat, numVertices);

    // Write the vertex data into the vertex buffer
    const iterator = new VertexIterator(vertexBuffer);
    for (let i = 0; i < numVertices; i++) {
        iterator.element[SEMANTIC.POSITION].set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
        if (normals !== null) {
            iterator.element[SEMANTIC.NORMAL].set(normals[i * 3], normals[i * 3 + 1], normals[i * 3 + 2]);
        }
        if (tangents !== null) {
            iterator.element[SEMANTIC.TANGENT].set(tangents[i * 4], tangents[i * 4 + 1], tangents[i * 4 + 2], tangents[i * 4 + 3]);
        }
        if (colors !== null) {
            iterator.element[SEMANTIC.COLOR].set(colors[i * 4], colors[i * 4 + 1], colors[i * 4 + 2], colors[i * 4 + 3]);
        }
        if (uvs !== null) {
            iterator.element[SEMANTIC.TEXCOORD0].set(uvs[i * 2], uvs[i * 2 + 1]);
        }
        if (uvs1 !== null) {
            iterator.element[SEMANTIC.TEXCOORD1].set(uvs1[i * 2], uvs1[i * 2 + 1]);
        }
        if (blendIndices !== null) {
            iterator.element[SEMANTIC.BLENDINDICES].set(blendIndices[i * 2], blendIndices[i * 2 + 1]);
        }
        if (blendWeights !== null) {
            iterator.element[SEMANTIC.BLENDWEIGHT].set(blendWeights[i * 2], blendWeights[i * 2 + 1]);
        }
        iterator.next();
    }
    iterator.end();

    // Create the index buffer
    let indexBuffer = null;
    const indexed = (indices !== null);
    if (indexed) {
        indexBuffer = new IndexBuffer(device, INDEXFORMAT.UINT16, indices.length);

        // Read the indicies into the index buffer
        const dst = new Uint16Array(indexBuffer.lock());
        dst.set(indices);
        indexBuffer.unlock();
    }

    const aabb = new BoundingBox();
    aabb.compute(positions);

    const mesh = new Mesh();
    mesh.vertexBuffer = vertexBuffer;
    mesh.indexBuffer[0] = indexBuffer;
    mesh.primitive[0].type = PRIMITIVE.TRIANGLES;
    mesh.primitive[0].base = 0;
    mesh.primitive[0].count = indexed ? indices.length : numVertices;
    mesh.primitive[0].indexed = indexed;
    mesh.aabb = aabb;
    return mesh;
}