/*
 * ProjectName: hypergl
 * FilePath: \src\mesh\mesh.ts
 * Created Date: Tuesday, August 14th 2018, 5:02:26 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, December 9th 2018, 1:40:33 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { VertexBuffer } from '../graphics/vertexBuffer';
import { IndexBuffer } from '../graphics/indexBuffer';
import { StandardMaterial } from '../material';
import { SEMANTIC, BUFFER, DrawMode } from '../conf';
import { VertexType, VertexFormat } from '../graphics/vertexFormat';
import { CreateMeshOptions, CreateBoxOptions } from '../types';
import { Vec3, Vec2 } from '../math';
import { BoundingBox } from '../shape/boundingBox';
import { Line } from './line';
import { Drawable } from './drawable';

export class Mesh extends Drawable {
    static createBox = createBox;
    static createPlane = createPlane;
    static createSphere = createSphere;
    // static createLines = createLines;
    castShadow = true;
    receiveShadow = true;
    material = new StandardMaterial();
    // private _material = Mesh.defaultMaterial;
    constructor() {
        super();
    }
    // tslint:disable-next-line:cyclomatic-complexity
    static createMesh(opts: CreateMeshOptions) {
        let mesh = new Mesh();
        mesh.create(opts);
        return mesh;
    }
}

let primitiveUv1Padding = 4 / 64;
let primitiveUv1PaddingScale = 1 - primitiveUv1Padding * 2;


export function createBox(opts?: CreateBoxOptions) {
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
        // let offset = positions.length / 3;

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
        // uvs1,
        indices
    };
    return Mesh.createMesh(options);
}

export interface CreatePlaneOptions {
    halfExtents?: Vec2,
    widthSegments?: number,
    lengthSegments?: number
}

export function createPlane(opts?: CreatePlaneOptions) {
    // Check the supplied options and provide defaults for unspecified ones
    let he = opts && opts.halfExtents !== undefined ? opts.halfExtents : new Vec2(0.5, 0.5);
    let ws = opts && opts.widthSegments !== undefined ? opts.widthSegments : 5;
    let ls = opts && opts.lengthSegments !== undefined ? opts.lengthSegments : 5;

    // Variable declarations
    // tslint:disable-next-line:one-variable-per-declaration
    let i, j;
    // tslint:disable-next-line:one-variable-per-declaration
    let x, y, z, u, v;
    let positions: number[] = [];
    let normals: number[] = [];
    let uvs: number[] = [];
    let indices: number[] = [];

    // Generate plane as follows (assigned UVs denoted at corners):
    // (0,1)x---------x(1,1)
    //      |         |
    //      |         |
    //      |    O--X |length
    //      |    |    |
    //      |    Z    |
    // (0,0)x---------x(1,0)
    //         width
    let vcounter = 0;

    for (i = 0; i <= ws; i++) {
        for (j = 0; j <= ls; j++) {
            x = -he.x + 2.0 * he.x * i / ws;
            y = 0.0;
            z = -(-he.y + 2.0 * he.y * j / ls);
            u = i / ws;
            v = j / ls;

            positions.push(x, y, z);
            normals.push(0.0, 1.0, 0.0);
            uvs.push(u, v);

            if ((i < ws) && (j < ls)) {
                indices.push(vcounter + ls + 1, vcounter + 1, vcounter);
                indices.push(vcounter + ls + 1, vcounter + ls + 2, vcounter + 1);
            }

            vcounter++;
        }
    }

    let options = {
        positions,
        normals,
        uvs,
        // uvs1: uvs, // UV1 = UV0 for plane
        indices
    };
    // if (pc.precalculatedTangents) {
    //     options.tangents = pc.calculateTangents(positions, normals, uvs, indices);
    // }
    return Mesh.createMesh(options);
}

export interface CreateSphereOptions {
    radius?: number;
    segments?: number;
}

export function createSphere(opts?: CreateSphereOptions) {
    let radius = opts && opts.radius !== undefined ? opts.radius : 0.5;
    let latitudeBands = opts && opts.segments !== undefined ? opts.segments : 16;
    let longitudeBands = opts && opts.segments !== undefined ? opts.segments : 16;

    // tslint:disable-next-line:one-variable-per-declaration
    let lon, lat;
    // tslint:disable-next-line:one-variable-per-declaration
    let theta, sinTheta, cosTheta, phi, sinPhi, cosPhi;
    // tslint:disable-next-line:one-variable-per-declaration
    let first, second;
    // tslint:disable-next-line:one-variable-per-declaration
    let x, y, z, u, v;
    let positions: number[] = [];
    let normals: number[] = [];
    let uvs: number[] = [];
    let indices: number[] = [];

    for (lat = 0; lat <= latitudeBands; lat++) {
        theta = lat * Math.PI / latitudeBands;
        sinTheta = Math.sin(theta);
        cosTheta = Math.cos(theta);

        for (lon = 0; lon <= longitudeBands; lon++) {
            // Sweep the sphere from the positive Z axis to match a 3DS Max sphere
            phi = lon * 2 * Math.PI / longitudeBands - Math.PI / 2.0;
            sinPhi = Math.sin(phi);
            cosPhi = Math.cos(phi);

            x = cosPhi * sinTheta;
            y = cosTheta;
            z = sinPhi * sinTheta;
            u = 1.0 - lon / longitudeBands;
            v = 1.0 - lat / latitudeBands;

            positions.push(x * radius, y * radius, z * radius);
            normals.push(x, y, z);
            uvs.push(u, v);
        }
    }

    for (lat = 0; lat < latitudeBands; ++lat) {
        for (lon = 0; lon < longitudeBands; ++lon) {
            first = (lat * (longitudeBands + 1)) + lon;
            second = first + longitudeBands + 1;

            indices.push(first + 1, second, first);
            indices.push(first + 1, second + 1, second);
        }
    }

    let options = {
        positions,
        normals,
        uvs,
        // uvs1: uvs, // UV1 = UV0 for sphere
        indices
    };

    // if (pc.precalculatedTangents) {
    //     options.tangents = pc.calculateTangents(positions, normals, uvs, indices);
    // }

    return Mesh.createMesh(options);
}