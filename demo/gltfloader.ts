/*
 * ProjectName: hypergl
 * FilePath: \demo\gltfloader.ts
 * Created Date: Tuesday, October 30th 2018, 5:41:56 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, November 6th 2018, 12:28:06 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Mesh, Application, Entity, BasicMaterial, DirectionalLight, util } from '../src';
import { GltfLoader, GlTf } from 'gltf-loader-ts';
import { Color } from '../src/core';
import { Camera } from '../src/scene/camera';
import { Mat4, Vec3 } from '../src/math';
import { FirstPersonCamera } from './utils/first_person_camera';

async function main() {
    const app = new Application(document.getElementById('canvas') as HTMLCanvasElement, {
        // webgl1:true
    });
    let uri = './assets/models/Duck.gltf';
    let loader = new util.GltfAssetLoader(uri);
    let root = await loader.loadSenceRoot();
    let duck = root.children[0].children[0];
    // console.log(root.children[0].children[1].getPosition().clone(), root.children[0].children[1].getLocalScale().clone());
    // duck.setLocalScale(1, 1, 1);
    app.scene.root.addChild(root);

    let dirlight = new DirectionalLight();
    dirlight.castShadows = true;
    // dirlight.direction = new Vec3(0, -1, 1);
    app.scene.root.addChild(dirlight);

    let c = root.children[0].children[1];


    // let camera = new Camera();
    // camera.setPerspective(45, app.canvas.width / app.canvas.height, 1, 10000);
    // // camera.projectionMatrix = (c as any).projectionMatrix;
    // camera.setPosition(c.getPosition());
    // camera.lookAt(new Vec3(0, 0, 0), camera.up);
    // // app.scene.activeCamera = camera;
    // app.scene.cameras.push(camera);

    let script = new FirstPersonCamera(FirstPersonCamera.defaultInputs, app);
    (script as any).entity = c;
    script.initialize();


    // console.log(
    //     app.scene.activeCamera.getPosition()
    // );

    app.start();
    app.on('update', dt => {
        // script.update(dt);
    });

}

main();
