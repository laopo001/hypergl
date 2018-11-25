/*
 * ProjectName: hypergl
 * FilePath: \demo\index8.ts
 * Created Date: Friday, November 9th 2018, 8:38:03 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, November 26th 2018, 1:25:18 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, Script, StandardMaterial, Config, Application, Texture } from '../src';
import { FirstPersonCamera } from './utils/first_person_camera';
import { Rotate } from './utils/rotate';
import { Vec3 } from '../src/math';
import { Color } from '../src/core';
import { loadImage } from './utils';



async function main() {
    const app = new Application(document.getElementById('canvas') as HTMLCanvasElement, {
        // webgl1:true
    });
    console.log(app);
    let material = new StandardMaterial();
    // material.diffuseColor.set(1, 0, 0);
    material.opacity = 0.5;

    let material2 = new StandardMaterial();
    let texture = new Texture();
    let img2 = await loadImage('assets/images/flare-2.png');
    texture.setSource(img2);
    material2.diffuseMap = texture;

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
        .setPosition(-10, 4, 4).lookAt(new Vec3(0, 0, 0))
        .addComponent('script', [new FirstPersonCamera({ speed: 0.1 })]);
    app.scene.root.addChild(camera);

    let light = new Entity('light')
        .addComponent('light', {
            type: 'directional',
            castShadows: true,
            shadowMapWidth: 2048,
            shadowMapHeight: 2048,
            shadowType: 'PCFSoft'
        })
        .setPosition(0, 2, 0);
    app.scene.root.addChild(light);


    let box = new Entity('box')
        .addComponent('model', {
            type: 'box'
        })
        .setLocalPosition(-1, 0, 0);
    box.model.material = material;

    let box2 = new Entity('box2')
        .addComponent('model', {
            type: 'box'
        }).setLocalPosition(1, 0, 0);

    let temp = new Entity('temp');
    temp.addChild(box).addChild(box2);
    temp.addComponent('script', [new Rotate({ speed: 2 })]);

    app.scene.root.addChild(temp);

    let plane = new Entity('plane')
        .addComponent('model', {
            type: 'plane'
        })
        .setPosition(0, -2, 0).setLocalScale(10, 1, 10);
    // plane.model.material = material2;
    app.scene.root.addChild(plane);

    app.start();
}

main();


