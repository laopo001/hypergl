/*
 * ProjectName: hypergl
 * FilePath: \src\component\entity.ts
 * Created Date: Tuesday, August 28th 2018, 1:21:15 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, September 21st 2018, 3:51:43 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { SceneNode } from '../scene/node';
import { Mesh } from '../mesh/mesh';
import { Material } from '../material/material';
import { Shader } from '../graphics/shader';
let EntityID = 0;
export class Entity extends SceneNode {
    EntityID = EntityID++;
    mesh?: Mesh;
    _shader?: Shader;
    constructor() {
        super();
    }
}