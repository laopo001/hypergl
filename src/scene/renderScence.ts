/*
 * ProjectName: hypergl
 * FilePath: \src\scene\forward-renderer.ts
 * Created Date: Saturday, August 18th 2018, 10:15:48 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, September 4th 2018, 12:05:13 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { SceneNode } from './node';
import { Entity } from '../ecs/entity';
import { BasicMaterial } from '../material/basicMaterial';
import { Scene } from './scene';
import { Mesh } from '../mesh/mesh';
import { Shader } from '../graphics/shader';
import { SEMANTICMAP } from '../conf';



export function renderScence(scene: Scene) {
    let entitys = scene.layer;
    let camera = scene.activeCamera;

    let renderer = scene.app.rendererPlatform;
    renderer.initDraw();
    // TODO
    for (let i = 0; i < entitys.length; i++) {
        let entity = entitys[i];
        const mesh = entity.mesh;
        if (mesh == null) { return; }
        const material = mesh.material;
        let attributes = {};
        mesh.vertexBuffer.format.elements.forEach(x => {
            attributes[SEMANTICMAP[x.semantic]] = x.semantic;
        });
        material.updateShader(renderer, attributes);
        let shader = mesh.material.shader as Shader;
        renderer.setShader(shader as Shader);
        shader.setUniformValue('matrix_viewProjection', camera.PVMatrix.data);
        // tslint:disable-next-line:forin
        for (let key in material.parameters) {
            shader.setUniformValue(key, material.parameters[key]);
        }
        renderer.draw(entity);
    }
}
