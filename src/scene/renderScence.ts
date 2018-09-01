/*
 * ProjectName: hypergl
 * FilePath: \src\scene\forward-renderer.ts
 * Created Date: Saturday, August 18th 2018, 10:15:48 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, September 1st 2018, 2:35:29 pm
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
    let camera = scene.activeCamera;

    let renderer = scene.app.rendererPlatform;
    // TODO
    for (let i = 0; i < entitys.length; i++) {
        let entity = entitys[i];
        const mesh = entity.mesh;
        if (mesh == null) { return; }
        const material = mesh.material;
        material.updateShader(renderer);
        let shader = mesh.material.shader as Shader;
        renderer.setShader(shader as Shader);
        shader.setUniformValue('matrix_viewProjection', camera.PVMatrix.data);
        renderer.draw(entity);
    }
}
