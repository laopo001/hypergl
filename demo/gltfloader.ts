/*
 * ProjectName: hypergl
 * FilePath: \demo\gltfloader.ts
 * Created Date: Tuesday, October 30th 2018, 5:41:56 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, November 5th 2018, 1:10:59 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Mesh, Application, Entity, BasicMaterial, DirectionalLight, util } from '../src';
import { GltfLoader, GlTf } from 'gltf-loader-ts';
import { Color } from '../src/core';
import { Camera } from '../src/scene/camera';
import { Mat4, Vec3 } from '../src/math';

async function main() {
    const app = new Application(document.getElementById('canvas') as HTMLCanvasElement, {
        // webgl1:true
    });
    let uri = './assets/models/Duck.gltf';
    let loader = new util.GltfAssetLoader(uri);
    let root = await loader.loadSenceRoot();
    console.log(root.children[0].children[0].getPosition());
    app.scene.root.addChild(root);

    let dirlight = new DirectionalLight();
    dirlight.castShadows = true;
    // dirlight.direction = new Vec3(0, -1, 1);
    app.scene.root.addChild(dirlight);

    let camera = new Camera();
    camera.setPerspective(45, app.canvas.width / app.canvas.height, 1, 1000);
    camera.setPosition(-2, 5, 10);
    camera.lookAt(new Vec3(0, 0, 0), camera.up);
    // app.scene.cameras.push(camera);

    // console.log(
    //     app.scene.activeCamera.getPosition()
    // );

    app.start();
    // console.log(gltf, data, image, Mesh);
}

main();
