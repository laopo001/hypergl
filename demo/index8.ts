/*
 * ProjectName: hypergl
 * FilePath: \demo\index8.ts
 * Created Date: Friday, November 9th 2018, 8:38:03 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, November 22nd 2018, 1:03:34 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Application, Entity, Script, StandardMaterial, Config } from '../src';
import { FirstPersonCamera } from './utils/first_person_camera';
import { Vec3 } from '../src/math';
import { Color } from '../src/core';


async function main() {
    const app = new Application(document.getElementById('canvas') as HTMLCanvasElement, {
        // webgl1:true
    });
    console.log(app);
    let material = new StandardMaterial();
    material.diffuseColor.set(1, 0, 1);
    material.update();


    let camera = new Entity('camera');
    camera.addComponent('camera', {
        type: 'perspective',
        perspective: {
            fov: 90,
            aspectRatio: app.canvas.width / app.canvas.height,
            near: 1,
            far: 10000
        }
    });
    camera.setPosition(-2, 5, 10);
    camera.lookAt(new Vec3(0, 0, 0), camera.up);
    camera.addComponent('script', [new FirstPersonCamera({ speed: 0.5 })]);
    app.scene.root.addChild(camera);

    let light = new Entity('light');
    light.addComponent('light', {
        type: 'directional',
        castShadows: true
    });
    light.setPosition(0, 2, 0);
    app.scene.root.addChild(light);

    let temp = new Entity('temp');

    let box = new Entity('box');
    box.addComponent('model', {
        type: 'box'
    });
    box.setLocalPosition(-1, 0, 0);
    temp.addChild(box);

    let box2 = new Entity('box2');
    box2.addComponent('model', {
        type: 'box'
    });
    box2.setLocalPosition(1, 0, 0);
    temp.addChild(box2);

    box.model!.material = material;
    app.scene.root.addChild(temp);

    let plane = new Entity('plane');
    plane.addComponent('model', {
        type: 'plane'
    });

    plane.setPosition(0, -2, 0);
    plane.setLocalScale(10, 1, 10);
    app.scene.root.addChild(plane);
    app.start();
}

main();