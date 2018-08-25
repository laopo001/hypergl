/*
 * ProjectName: hypergl
 * FilePath: \src\mesh\mesh.ts
 * Created Date: Tuesday, August 14th 2018, 5:02:26 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 25th 2018, 8:08:02 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */



import { VertexBuffer } from '../graphics/vertexBuffer';
import { IndexBuffer } from '../graphics/indexBuffer';
import { BasicMaterial } from '../material';

export class Mesh {
    static defaultMaterial = new BasicMaterial();
    vertexBuffer!: VertexBuffer;
    indexBuffer!: IndexBuffer;
}