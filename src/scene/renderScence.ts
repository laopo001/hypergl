/*
 * ProjectName: hypergl
 * FilePath: \src\scene\forward-renderer.ts
 * Created Date: Saturday, August 18th 2018, 10:15:48 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, August 29th 2018, 8:14:53 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { INode } from './node';
import { Entity } from '../ecs/entity';
import { BasicMaterial } from '../material/basicMaterial';
import { Scene } from './scene';
import { Mesh } from '../mesh/mesh';
import { Shader } from '../graphics/shader';
export function renderScence(scene: Scene) {
    let entitys = scene.layer;
    // TODO
    for (let i = 0; i < entitys.length; i++) {
        let entity = entitys[i];
        let mesh = entity.mesh;
        let material = (mesh as Mesh).material;
        material.updateShader(scene.app.rendererPlatform);
        let shader = material.shader as Shader;
        console.log(shader);
        shader.compile();
        shader.link();
        console.log(shader);
    }
}
