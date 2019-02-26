/*
 * ProjectName: hypergl
 * FilePath: \src\mesh\createMesh.ts
 * Created Date: Wednesday, January 9th 2019, 1:54:40 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, February 26th 2019, 11:07:40 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */


import { CreateMeshOptions, CreateBoxOptions } from '../types';
import { Vec3, Vec2 } from '../math';
import { Mesh } from './mesh';
import { StandardMaterial } from '../material';

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
        uvs1,
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
        uvs1: uvs, // UV1 = UV0 for plane
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
        uvs1: uvs, // UV1 = UV0 for sphere
        indices
    };

    // if (pc.precalculatedTangents) {
    //     options.tangents = pc.calculateTangents(positions, normals, uvs, indices);
    // }

    return Mesh.createMesh(options);
}


export function calculateTangents(positions, normals, uvs, indices) {
    let triangleCount = indices.length / 3;
    let vertexCount = positions.length / 3;
    // tslint:disable-next-line:one-variable-per-declaration
    let i1, i2, i3;
    // tslint:disable-next-line:one-variable-per-declaration
    let x1, x2, y1, y2, z1, z2, s1, s2, t1, t2, r;
    let sdir = new Vec3();
    let tdir = new Vec3();
    let v1 = new Vec3();
    let v2 = new Vec3();
    let v3 = new Vec3();
    let w1 = new Vec2();
    let w2 = new Vec2();
    let w3 = new Vec2();
    let i; // Loop counter
    let tan1 = new Float32Array(vertexCount * 3);
    let tan2 = new Float32Array(vertexCount * 3);


    let tangents: number[] = [];
    let area = 0.0;

    for (i = 0; i < triangleCount; i++) {
        i1 = indices[i * 3];
        i2 = indices[i * 3 + 1];
        i3 = indices[i * 3 + 2];

        v1.set(positions[i1 * 3], positions[i1 * 3 + 1], positions[i1 * 3 + 2]);
        v2.set(positions[i2 * 3], positions[i2 * 3 + 1], positions[i2 * 3 + 2]);
        v3.set(positions[i3 * 3], positions[i3 * 3 + 1], positions[i3 * 3 + 2]);

        w1.set(uvs[i1 * 2], uvs[i1 * 2 + 1]);
        w2.set(uvs[i2 * 2], uvs[i2 * 2 + 1]);
        w3.set(uvs[i3 * 2], uvs[i3 * 2 + 1]);

        x1 = v2.x - v1.x;
        x2 = v3.x - v1.x;
        y1 = v2.y - v1.y;
        y2 = v3.y - v1.y;
        z1 = v2.z - v1.z;
        z2 = v3.z - v1.z;

        s1 = w2.x - w1.x;
        s2 = w3.x - w1.x;
        t1 = w2.y - w1.y;
        t2 = w3.y - w1.y;

        area = s1 * t2 - s2 * t1;

        // Area can 0.0 for degenerate triangles or bad uv coordinates
        if (area === 0.0) {
            // Fallback to default values
            sdir.set(0.0, 1.0, 0.0);
            tdir.set(1.0, 0.0, 0.0);
        } else {
            r = 1.0 / area;
            sdir.set((t2 * x1 - t1 * x2) * r,
                (t2 * y1 - t1 * y2) * r,
                (t2 * z1 - t1 * z2) * r);
            tdir.set((s1 * x2 - s2 * x1) * r,
                (s1 * y2 - s2 * y1) * r,
                (s1 * z2 - s2 * z1) * r);
        }

        tan1[i1 * 3 + 0] += sdir.x;
        tan1[i1 * 3 + 1] += sdir.y;
        tan1[i1 * 3 + 2] += sdir.z;
        tan1[i2 * 3 + 0] += sdir.x;
        tan1[i2 * 3 + 1] += sdir.y;
        tan1[i2 * 3 + 2] += sdir.z;
        tan1[i3 * 3 + 0] += sdir.x;
        tan1[i3 * 3 + 1] += sdir.y;
        tan1[i3 * 3 + 2] += sdir.z;

        tan2[i1 * 3 + 0] += tdir.x;
        tan2[i1 * 3 + 1] += tdir.y;
        tan2[i1 * 3 + 2] += tdir.z;
        tan2[i2 * 3 + 0] += tdir.x;
        tan2[i2 * 3 + 1] += tdir.y;
        tan2[i2 * 3 + 2] += tdir.z;
        tan2[i3 * 3 + 0] += tdir.x;
        tan2[i3 * 3 + 1] += tdir.y;
        tan2[i3 * 3 + 2] += tdir.z;
    }

    t1 = new Vec3();
    t2 = new Vec3();
    let n = new Vec3();
    let temp = new Vec3();

    for (i = 0; i < vertexCount; i++) {
        n.set(normals[i * 3], normals[i * 3 + 1], normals[i * 3 + 2]);
        t1.set(tan1[i * 3], tan1[i * 3 + 1], tan1[i * 3 + 2]);
        t2.set(tan2[i * 3], tan2[i * 3 + 1], tan2[i * 3 + 2]);

        // Gram-Schmidt orthogonalize
        let ndott = n.dot(t1);
        temp.copy(n).scale(ndott);
        temp.sub2(t1, temp).normalize();

        tangents[i * 4] = temp.x;
        tangents[i * 4 + 1] = temp.y;
        tangents[i * 4 + 2] = temp.z;

        // Calculate handedness
        temp.cross(n, t1);
        tangents[i * 4 + 3] = (temp.dot(t2) < 0.0) ? -1.0 : 1.0;
    }

    return tangents;
}

// tslint:disable-next-line:cyclomatic-complexity
export function _createConeData(baseRadius: number, peakRadius: number, height: number, heightSegments: number, capSegments: number, roundedCaps: boolean) {
    // Variable declarations
    // tslint:disable-next-line:one-variable-per-declaration
    let i, j;
    // tslint:disable-next-line:one-variable-per-declaration
    let x, y, z, u, v;
    let pos = new Vec3();
    let bottomToTop = new Vec3();
    let norm = new Vec3();
    // tslint:disable-next-line:one-variable-per-declaration
    let top, bottom, tangent;
    let positions: number[] = [];
    let normals: number[] = [];
    let uvs: number[] = [];
    let uvs1: number[] = [];
    let indices: number[] = [];
    // tslint:disable-next-line:one-variable-per-declaration
    let theta, cosTheta, sinTheta;
    // tslint:disable-next-line:one-variable-per-declaration
    let phi, sinPhi, cosPhi;
    // tslint:disable-next-line:one-variable-per-declaration
    let first, second, third, fourth;
    let offset;

    // Define the body of the cone/cylinder
    if (height > 0) {
        for (i = 0; i <= heightSegments; i++) {
            for (j = 0; j <= capSegments; j++) {
                // Sweep the cone body from the positive Y axis to match a 3DS Max cone/cylinder
                theta = (j / capSegments) * 2.0 * Math.PI - Math.PI;
                sinTheta = Math.sin(theta);
                cosTheta = Math.cos(theta);
                bottom = new Vec3(sinTheta * baseRadius, -height / 2.0, cosTheta * baseRadius);
                top = new Vec3(sinTheta * peakRadius, height / 2.0, cosTheta * peakRadius);
                pos.lerp(bottom, top, i / heightSegments);
                bottomToTop.sub2(top, bottom).normalize();
                tangent = new Vec3(cosTheta, 0.0, -sinTheta);
                norm.cross(tangent, bottomToTop).normalize();

                positions.push(pos.x, pos.y, pos.z);
                normals.push(norm.x, norm.y, norm.z);
                u = j / capSegments;
                v = i / heightSegments;
                uvs.push(u, v);

                // Pack UV1 to 1st third
                let _v = v;
                v = u;
                u = _v;
                u /= 3;
                u = u * primitiveUv1PaddingScale + primitiveUv1Padding;
                v = v * primitiveUv1PaddingScale + primitiveUv1Padding;
                uvs1.push(u, v);

                if ((i < heightSegments) && (j < capSegments)) {
                    first = ((i)) * (capSegments + 1) + ((j));
                    second = ((i)) * (capSegments + 1) + ((j + 1));
                    third = ((i + 1)) * (capSegments + 1) + ((j));
                    fourth = ((i + 1)) * (capSegments + 1) + ((j + 1));

                    indices.push(first, second, third);
                    indices.push(second, fourth, third);
                }
            }
        }
    }

    if (roundedCaps) {
        // tslint:disable-next-line:one-variable-per-declaration
        let lat, lon;
        let latitudeBands = Math.floor(capSegments / 2);
        let longitudeBands = capSegments;
        let capOffset = height / 2;

        // Generate top cap
        for (lat = 0; lat <= latitudeBands; lat++) {
            theta = (lat * Math.PI * 0.5) / latitudeBands;
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

                positions.push(x * peakRadius, y * peakRadius + capOffset, z * peakRadius);
                normals.push(x, y, z);
                uvs.push(u, v);

                // Pack UV1 to 2nd third
                u /= 3;
                v /= 3;
                u = u * primitiveUv1PaddingScale + primitiveUv1Padding;
                v = v * primitiveUv1PaddingScale + primitiveUv1Padding;
                u += 1.0 / 3;
                uvs1.push(u, v);
            }
        }

        offset = (heightSegments + 1) * (capSegments + 1);
        for (lat = 0; lat < latitudeBands; ++lat) {
            for (lon = 0; lon < longitudeBands; ++lon) {
                first = (lat * (longitudeBands + 1)) + lon;
                second = first + longitudeBands + 1;

                indices.push(offset + first + 1, offset + second, offset + first);
                indices.push(offset + first + 1, offset + second + 1, offset + second);
            }
        }

        // Generate bottom cap
        for (lat = 0; lat <= latitudeBands; lat++) {
            theta = Math.PI * 0.5 + (lat * Math.PI * 0.5) / latitudeBands;
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

                positions.push(x * peakRadius, y * peakRadius - capOffset, z * peakRadius);
                normals.push(x, y, z);
                uvs.push(u, v);

                // Pack UV1 to 3rd third
                u /= 3;
                v /= 3;
                u = u * primitiveUv1PaddingScale + primitiveUv1Padding;
                v = v * primitiveUv1PaddingScale + primitiveUv1Padding;
                u += 2.0 / 3;
                uvs1.push(u, v);
            }
        }

        offset = (heightSegments + 1) * (capSegments + 1) + (longitudeBands + 1) * (latitudeBands + 1);
        for (lat = 0; lat < latitudeBands; ++lat) {
            for (lon = 0; lon < longitudeBands; ++lon) {
                first = (lat * (longitudeBands + 1)) + lon;
                second = first + longitudeBands + 1;

                indices.push(offset + first + 1, offset + second, offset + first);
                indices.push(offset + first + 1, offset + second + 1, offset + second);
            }
        }
    } else {
        // Generate bottom cap
        offset = (heightSegments + 1) * (capSegments + 1);
        if (baseRadius > 0.0) {
            for (i = 0; i < capSegments; i++) {
                theta = (i / capSegments) * 2.0 * Math.PI;
                x = Math.sin(theta);
                y = -height / 2.0;
                z = Math.cos(theta);
                u = 1.0 - (x + 1.0) / 2.0;
                v = (z + 1.0) / 2.0;

                positions.push(x * baseRadius, y, z * baseRadius);
                normals.push(0.0, -1.0, 0.0);
                uvs.push(u, v);

                // Pack UV1 to 2nd third
                u /= 3;
                v /= 3;
                u = u * primitiveUv1PaddingScale + primitiveUv1Padding;
                v = v * primitiveUv1PaddingScale + primitiveUv1Padding;
                u += 1.0 / 3;
                uvs1.push(u, v);

                if (i > 1) {
                    indices.push(offset, offset + i, offset + i - 1);
                }
            }
        }

        // Generate top cap
        offset += capSegments;
        if (peakRadius > 0.0) {
            for (i = 0; i < capSegments; i++) {
                theta = (i / capSegments) * 2.0 * Math.PI;
                x = Math.sin(theta);
                y = height / 2.0;
                z = Math.cos(theta);
                u = 1.0 - (x + 1.0) / 2.0;
                v = (z + 1.0) / 2.0;

                positions.push(x * peakRadius, y, z * peakRadius);
                normals.push(0.0, 1.0, 0.0);
                uvs.push(u, v);

                // Pack UV1 to 3rd third
                u /= 3;
                v /= 3;
                u = u * primitiveUv1PaddingScale + primitiveUv1Padding;
                v = v * primitiveUv1PaddingScale + primitiveUv1Padding;
                u += 2.0 / 3;
                uvs1.push(u, v);

                if (i > 1) {
                    indices.push(offset, offset + i - 1, offset + i);
                }
            }
        }
    }

    return {
        positions,
        normals,
        uvs,
        uvs1,
        indices,
    };
}

export function createCylinder(opts?: {
    baseRadius?: number;
    peakRadius?: number;
    height?: number;
    heightSegments?: number;
    capSegments?: number;
    calculateTangents?: boolean;
}) {
    let baseRadius = opts && opts.baseRadius !== undefined ? opts.baseRadius : 0.5;
    let peakRadius = opts && opts.peakRadius !== undefined ? opts.peakRadius : 0.5;

    let height = opts && opts.height !== undefined ? opts.height : 1.0;
    let heightSegments = opts && opts.heightSegments !== undefined ? opts.heightSegments : 5;
    let capSegments = opts && opts.capSegments !== undefined ? opts.capSegments : 20;
    let is_calculateTangents = opts && opts.calculateTangents !== undefined ? opts.calculateTangents : false;

    // Create vertex data for a cone that has a base and peak radius that is the same (i.e. a cylinder)
    let options = _createConeData(baseRadius, peakRadius, height, heightSegments, capSegments, false) as CreateMeshOptions;

    if (is_calculateTangents) {
        options.tangents = calculateTangents(options.positions, options.normals, options.uvs, options.indices);
    }

    return Mesh.createMesh(options);
}