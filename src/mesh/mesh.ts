/*
 * ProjectName: hypergl
 * FilePath: \src\mesh\mesh.ts
 * Created Date: Tuesday, August 14th 2018, 5:02:26 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, August 26th 2018, 3:47:29 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { VertexBuffer } from '../graphics/vertexBuffer';
import { IndexBuffer } from '../graphics/indexBuffer';
import { BasicMaterial } from '../material';
import { SEMANTIC, BUFFER } from '../conf';
import { VertexType, VertexFormat } from '../graphics/vertexFormat';
import { Nullable, CreateMeshOption } from '../types';
import { RendererPlatform } from '../graphics/renderer';

export class Mesh {
    static defaultMaterial = new BasicMaterial();
    vertexBuffer!: VertexBuffer;
    indexBuffer!: IndexBuffer;
    _material = Mesh.defaultMaterial;
    get material() {
        return this._material;
    }
    set material(x) {
        this._material = x;
    }
    constructor() {
        // TODO
    }
    // tslint:disable-next-line:cyclomatic-complexity
    static createMesh(renderer: RendererPlatform, opts: CreateMeshOption) {
        // Check the supplied options and provide defaults for unspecified ones
        let positions = opts.positions;
        let normals = opts && opts.normals !== undefined ? opts.normals : null;
        let indices = opts.indices;
        let tangents = opts && opts.tangents !== undefined ? opts.tangents : null;
        let colors = opts && opts.colors !== undefined ? opts.colors : null;
        let uvs = opts && opts.uvs !== undefined ? opts.uvs : null;
        let uvs1 = opts && opts.uvs1 !== undefined ? opts.uvs1 : null;
        let blendIndices = opts && opts.blendIndices !== undefined ? opts.blendIndices : null;
        let blendWeights = opts && opts.blendWeights !== undefined ? opts.blendWeights : null;

        let vertexDesc: VertexType[] = [
            { semantic: SEMANTIC.POSITION, size: 3, dataType: Float32Array }
        ];
        if (normals !== null) {
            vertexDesc.push({ semantic: SEMANTIC.NORMAL, size: 3, dataType: Float32Array });
        }
        if (tangents !== null) {
            vertexDesc.push({ semantic: SEMANTIC.TANGENT, size: 4, dataType: Float32Array });
        }
        if (colors !== null) {
            vertexDesc.push({ semantic: SEMANTIC.COLOR, size: 4, dataType: Uint8Array, normalize: true });
        }
        if (uvs !== null) {
            vertexDesc.push({ semantic: SEMANTIC.TEXCOORD0, size: 2, dataType: Float32Array });
        }
        if (uvs1 !== null) {
            vertexDesc.push({ semantic: SEMANTIC.TEXCOORD1, size: 2, dataType: Float32Array });
        }
        if (blendIndices !== null) {
            vertexDesc.push({ semantic: SEMANTIC.BLENDINDICES, size: 2, dataType: Uint8Array });
        }
        if (blendWeights !== null) {
            vertexDesc.push({ semantic: SEMANTIC.BLENDWEIGHT, size: 2, dataType: Float32Array });
        }

        let vertexFormat = new VertexFormat(vertexDesc);

        // Create the vertex buffer
        let numVertices = positions.length / 3;
        let vertexBuffer = new VertexBuffer(renderer, vertexFormat, numVertices);
        let iterator = vertexBuffer.toIterator();

        for (let i = 0; i < numVertices; i++) {
            let setter = iterator.value;
            setter[SEMANTIC.POSITION].set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
            if (normals !== null) {
                setter[SEMANTIC.NORMAL].set(normals[i * 3], normals[i * 3 + 1], normals[i * 3 + 2]);
            }
            if (tangents !== null) {
                setter[SEMANTIC.TANGENT].set(tangents[i * 4], tangents[i * 4 + 1], tangents[i * 4 + 2], tangents[i * 4 + 3]);
            }
            if (colors !== null) {
                setter[SEMANTIC.COLOR].set(colors[i * 4], colors[i * 4 + 1], colors[i * 4 + 2], colors[i * 4 + 3]);
            }
            if (uvs !== null) {
                setter[SEMANTIC.TEXCOORD0].set(uvs[i * 2], uvs[i * 2 + 1]);
            }
            if (uvs1 !== null) {
                setter[SEMANTIC.TEXCOORD1].set(uvs1[i * 2], uvs1[i * 2 + 1]);
            }
            if (blendIndices !== null) {
                setter[SEMANTIC.BLENDINDICES].set(blendIndices[i * 2], blendIndices[i * 2 + 1]);
            }
            if (blendWeights !== null) {
                setter[SEMANTIC.BLENDWEIGHT].set(blendWeights[i * 2], blendWeights[i * 2 + 1]);
            }
            iterator.next();
        }


        // Create the index buffer
        let indexBuffer = new IndexBuffer(renderer, Uint16Array, BUFFER.STATIC, indices);
        // let aabb = new pc.BoundingBox();
        // aabb.compute(positions);

        let mesh = new Mesh();
        mesh.vertexBuffer = vertexBuffer;
        mesh.indexBuffer = indexBuffer;
        return mesh;
    }
}