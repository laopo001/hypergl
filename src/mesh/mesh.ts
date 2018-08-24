/*
 * ProjectName: hypergl
 * FilePath: \src\mesh\mesh.ts
 * Created Date: Tuesday, August 14th 2018, 5:02:26 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, August 19th 2018, 1:58:16 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */



import { VertexBuffer } from '../graphics/vertexBuffer';
import { IndexBuffer } from '../graphics/indexBuffer';

export class Mesh {
    vertexBuffer!: VertexBuffer;
    indexBuffer!: IndexBuffer;
}