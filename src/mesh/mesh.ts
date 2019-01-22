/*
 * ProjectName: hypergl
 * FilePath: \src\mesh\mesh.ts
 * Created Date: Tuesday, August 14th 2018, 5:02:26 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, January 23rd 2019, 12:13:04 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { VertexBuffer } from '../graphics/vertexBuffer';
import { IndexBuffer } from '../graphics/indexBuffer';
import { StandardMaterial, Material, PBRMaterial } from '../material';
import { SEMANTIC, BUFFER, DrawMode } from '../conf';
import { VertexType, VertexFormat } from '../graphics/vertexFormat';
import { CreateMeshOptions } from '../types';
import { Vec3, Vec2 } from '../math';
import { BoundingBox } from '../shape/boundingBox';
import { Line } from './line';
import { Drawable } from './drawable';
import { createBox, createPlane, createSphere, createCylinder } from './create-mesh';


export class Mesh<T extends Material = StandardMaterial> extends Drawable<T> {
    static createBox = createBox;
    static createPlane = createPlane;
    static createSphere = createSphere;
    static createCylinder = createCylinder;
    outline = false;
    castShadow = false;
    receiveShadow = false;
    material = StandardMaterial.defaultMaterial() as any;
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
