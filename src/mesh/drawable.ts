/*
 * ProjectName: hypergl
 * FilePath: \src\mesh\drawable.ts
 * Created Date: Saturday, December 1st 2018, 9:13:57 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, December 7th 2018, 12:51:41 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { VertexBuffer } from '../graphics/vertexBuffer';
import { IndexBuffer } from '../graphics/indexBuffer';
import { StandardMaterial, BasicMaterial, Material } from '../material';
import { SEMANTIC, BUFFER, DrawMode } from '../conf';
import { VertexType, VertexFormat } from '../graphics/vertexFormat';
import { CreateMeshOptions, CreateBoxOptions, CreateDrawabelOptions } from '../types';
import { Vec3, Vec2 } from '../math';
import { BoundingBox } from '../shape/boundingBox';
import { BoundingSphere } from '../shape/boundingSphere';

export class Drawable {
    name?: string;
    mode = DrawMode.TRIANGLES; // 默认绘制模式 为 三角形
    // tslint:disable-next-line:member-ordering
    vertexBuffer!: VertexBuffer;
    indexBuffer?: IndexBuffer;
    castShadow = false;
    aabb!: BoundingSphere;
    receiveShadow = false;
    get type() {
        if (this.mode === 1 || this.mode === 2 || this.mode === 3) {
            return 'line';
        } else if (this.mode === 0) {
            return 'point';
        } else {
            return 'mesh';
        }
    }
    material!: Material;
    constructor() {
        // TODO
    }
    // tslint:disable-next-line:cyclomatic-complexity
    create(opts: CreateDrawabelOptions) {
        // Check the supplied options and provide defaults for unspecified ones
        let positions = opts.positions;
        let normals = opts && opts.normals !== undefined ? opts.normals : null;
        let indices = opts.indices !== undefined ? opts.indices : undefined;
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
            vertexDesc.push({ semantic: SEMANTIC.COLOR, size: 4, dataType: Uint8Array, normalize: false });
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
        let vertexBuffer = new VertexBuffer(vertexFormat, numVertices);
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
        // vertexBuffer.bind();

        // Create the index buffer
        let indexBuffer = indices && new IndexBuffer(Uint16Array, BUFFER.STATIC, indices);

        this.aabb = BoundingSphere.compute(positions);
        this.vertexBuffer = vertexBuffer;
        this.indexBuffer = indexBuffer;
        return this;
    }
}