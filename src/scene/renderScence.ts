/*
 * ProjectName: hypergl
 * FilePath: \src\scene\forward-renderer.ts
 * Created Date: Saturday, August 18th 2018, 10:15:48 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, August 30th 2018, 8:04:59 pm
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
    let renderer = scene.app.rendererPlatform;
    // TODO
    for (let i = 0; i < entitys.length; i++) {
        let entity = entitys[i];
        let mesh = entity.mesh;
        if (mesh == null) { return; }
        let material = (mesh).material;
        material.updateShader(scene.app.rendererPlatform);
        renderer.useProgram(material.shader as Shader);
        renderer.setVertexBuffer(mesh.vertexBuffer);
        renderer.setIndexBuffer(mesh.indexBuffer);
    }
}
