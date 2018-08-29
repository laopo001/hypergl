/*
 * ProjectName: hypergl
 * FilePath: \src\component\entity.ts
 * Created Date: Tuesday, August 28th 2018, 1:21:15 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, August 29th 2018, 8:02:05 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { INode } from '../scene/node';
import { Mesh } from '../mesh/mesh';
import { Material } from '../material/material';
import { Shader } from '../graphics/shader';
export class Entity extends INode {
    mesh?: Mesh;
    _shader?: Shader;
}