/*
 * ProjectName: hypergl
 * FilePath: \demo\index8.ts
 * Created Date: Friday, November 9th 2018, 8:38:03 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, November 23rd 2018, 6:47:35 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, Script, StandardMaterial, Config, Application } from '../src';
import { FirstPersonCamera } from './utils/first_person_camera';
import { Rotate } from './utils/rotate';
import { Vec3 } from '../src/math';
import { Color } from '../src/core';



async function main() {
    const app = new Application(document.getElementById('canvas') as HTMLCanvasElement, {
        // webgl1:true
    });
    console.log(app);
    let material = new StandardMaterial();
    material.diffuseColor.set(1, 0, 1);
    material.opacity = 0.5;
    material.update();


    let camera = new Entity('camera')
        .addComponent('camera', {
            type: 'perspective',
            perspective: {
                fov: 90,
                aspectRatio: app.canvas.width / app.canvas.height,
                near: 1,
                far: 10000
            }
        })
        .setPosition(-2, 5, 10).lookAt(new Vec3(0, 0, 0))
        .addComponent('script', [new FirstPersonCamera({ speed: 0.5 })]);
    app.scene.root.addChild(camera);

    let light = new Entity('light')
        .addComponent('light', {
            type: 'directional',
            castShadows: true
        })
        .setPosition(0, 2, 0);
    app.scene.root.addChild(light);


    let box = new Entity('box')
        .addComponent('model', {
            type: 'box'
        })
        .setLocalPosition(-1, 0, 0);

    let box2 = new Entity('box2')
        .addComponent('model', {
            type: 'box'
        }).setLocalPosition(1, 0, 0);

    let temp = new Entity('temp');
    temp.addChild(box).addChild(box2);
    temp.addComponent('script', [new Rotate({ speed: 2 })]);

    box.model!.material = material;
    app.scene.root.addChild(temp);

    let plane = new Entity('plane')
        .addComponent('model', {
            type: 'plane'
        })
        .setPosition(0, -2, 0).setLocalScale(10, 1, 10);

    app.scene.root.addChild(plane);

    app.start();
}

main();


