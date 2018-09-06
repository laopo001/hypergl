/*
 * ProjectName: hypergl
 * FilePath: \src\mesh\mesh.ts
 * Created Date: Tuesday, August 14th 2018, 5:02:26 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, September 6th 2018, 6:03:02 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { VertexBuffer } from '../graphics/vertexBuffer';
import { IndexBuffer } from '../graphics/indexBuffer';
import { BasicMaterial } from '../material';
import { SEMANTIC, BUFFER } from '../conf';
import { VertexType, VertexFormat } from '../graphics/vertexFormat';
import { Nullable, CreateMeshOptions, CreateBoxOptions } from '../types';
import { RendererPlatform } from '../graphics/renderer';
import { Vec3 } from '../math';

export class Mesh {
    static defaultMaterial = new BasicMaterial();
    vertexBuffer!: VertexBuffer;
    indexBuffer!: IndexBuffer;
    castShadow = true;
    receiveShadow = true;
    private _material = Mesh.defaultMaterial;
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
    static createMesh(renderer: RendererPlatform, opts: CreateMeshOptions) {
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
        vertexBuffer.bind();

        // Create the index buffer
        let indexBuffer = new IndexBuffer(renderer, Uint16Array, BUFFER.STATIC, indices);
        // let aabb = new BoundingBox();
        // aabb.compute(positions);

        let mesh = new Mesh();
        mesh.vertexBuffer = vertexBuffer;
        mesh.indexBuffer = indexBuffer;
        return mesh;
    }
    // tslint:disable-next-line:member-ordering
    static createBox = createBox;
}

let primitiveUv1Padding = 4 / 64;
let primitiveUv1PaddingScale = 1 - primitiveUv1Padding * 2;


export function createBox(renderer: RendererPlatform, opts?: CreateBoxOptions) {
    // Check the supplied options and provide defaults for unspecified ones
    let he = opts && opts.halfExtents !== undefined ? opts.halfExtents : new Vec3(0.5, 0.5, 0.5);
    let ws = opts && opts.widthSegments !== undefined ? opts.widthSegments : 1;
    let ls = opts && opts.lengthSegments !== undefined ? opts.lengthSegments : 1;
    let hs = opts && opts.heightSegments !== undefined ? opts.heightSegments : 1;

    let corners = [
        new Vec3(-he.x, -he.y, he.z),
        new Vec3(he.x, -he.y, he.z),
        new Vec3(he.x, he.y, he.z),
        new Vec3(-he.x, he.y, he.z),
        new Vec3(he.x, -he.y, -he.z),
        new Vec3(-he.x, -he.y, -he.z),
        new Vec3(-he.x, he.y, -he.z),
        new Vec3(he.x, he.y, -he.z)
    ];

    let faceAxes = [
        [0, 1, 3], // FRONT
        [4, 5, 7], // BACK
        [3, 2, 6], // TOP
        [1, 0, 4], // BOTTOM
        [1, 4, 2], // RIGHT
        [5, 0, 6]  // LEFT
    ];

    let faceNormals = [
        [0, 0, 1], // FRONT
        [0, 0, -1], // BACK
        [0, 1, 0], // TOP
        [0, -1, 0], // BOTTOM
        [1, 0, 0], // RIGHT
        [-1, 0, 0]  // LEFT
    ];

    let sides = {
        FRONT: 0,
        BACK: 1,
        TOP: 2,
        BOTTOM: 3,
        RIGHT: 4,
        LEFT: 5
    };

    let positions: number[] = [];
    let normals: number[] = [];
    let uvs: number[] = [];
    let uvs1: number[] = [];
    let indices: number[] = [];
    let vcounter = 0;

    let generateFace = (side, uSegments, vSegments) => {
        // tslint:disable-next-line:one-variable-per-declaration
        let u, v;
        // tslint:disable-next-line:one-variable-per-declaration
        let i, j;
        let offset = positions.length / 3;

        for (i = 0; i <= uSegments; i++) {
            for (j = 0; j <= vSegments; j++) {
                let temp1 = new Vec3();
                let temp2 = new Vec3();
                let temp3 = new Vec3();
                let r = new Vec3();
                temp1.lerp(corners[faceAxes[side][0]], corners[faceAxes[side][1]], i / uSegments);
                temp2.lerp(corners[faceAxes[side][0]], corners[faceAxes[side][2]], j / vSegments);
                temp3.sub2(temp2, corners[faceAxes[side][0]]);
                r.add2(temp1, temp3);
                u = i / uSegments;
                v = j / vSegments;

                positions.push(r.x, r.y, r.z);
                normals.push(faceNormals[side][0], faceNormals[side][1], faceNormals[side][2]);
                uvs.push(u, v);
                // pack as 3x2
                // 1/3 will be empty, but it's either that or stretched pixels
                // TODO: generate non-rectangular lightMaps, so we could use space without stretching
                u /= 3;
                v /= 3;
                u = u * primitiveUv1PaddingScale + primitiveUv1Padding;
                v = v * primitiveUv1PaddingScale + primitiveUv1Padding;
                u += (side % 3) / 3;
                v += Math.floor(side / 3) / 3;
                uvs1.push(u, v);

                if ((i < uSegments) && (j < vSegments)) {
                    indices.push(vcounter + vSegments + 1, vcounter + 1, vcounter);
                    indices.push(vcounter + vSegments + 1, vcounter + vSegments + 2, vcounter + 1);
                }

                vcounter++;
            }
        }
    };

    generateFace(sides.FRONT, ws, hs);
    generateFace(sides.BACK, ws, hs);
    generateFace(sides.TOP, ws, ls);
    generateFace(sides.BOTTOM, ws, ls);
    generateFace(sides.RIGHT, ls, hs);
    generateFace(sides.LEFT, ls, hs);

    let options = {
        positions,
        normals,
        uvs,
        uvs1,
        indices
    };

    return Mesh.createMesh(renderer, options);
}