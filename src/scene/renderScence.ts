/*
 * ProjectName: hypergl
 * FilePath: \src\scene\forward-renderer.ts
 * Created Date: Saturday, August 18th 2018, 10:15:48 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, August 29th 2018, 12:58:25 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { INode } from './node';
import { Entity } from '../component/entity';
import { BasicMaterial } from '../material/basicMaterial';
import { Scene } from './scene';
export function renderScence(scene: Scene) {
    let entitys = scene.layer;
    // TODO
    for (let i = 0; i < entitys.length; i++) {
        let entity = entitys[i];
        let mesh = entity.mesh;
        let material = entity.material as BasicMaterial;
        material.updateShader(scene.app.rendererPlatform);
        let shader = material.shader;
    }
}
