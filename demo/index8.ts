/*
 * ProjectName: hypergl
 * FilePath: \demo\index8.ts
 * Created Date: Friday, November 9th 2018, 8:38:03 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, December 28th 2018, 9:38:52 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, Script, StandardMaterial, Config, Application, Texture, Mesh, Line, ColorMaterial } from '../src';
import { FirstPersonCamera } from './utils/first_person_camera';
import { Rotate } from './utils/rotate';
import { Vec3 } from '../src/math';
import { Color } from '../src/core';
import { loadImage } from './utils';

function createCoordinateSystem() {
    let temp = new Entity();
    let lines = Line.createLines([
        new Vec3(0, 0, 0), new Vec3(5, 0, 0)
    ]);
    let color = new ColorMaterial();
    color.diffuseColor = new Color(1, 0, 1);
    let color2 = new ColorMaterial();
    color2.diffuseColor = new Color(1, 0, 0);
    let color3 = new ColorMaterial();
    color3.diffuseColor = new Color(0, 0, 1);
    let line1 = new Entity('lines')
        .addComponent('model', {
            type: 'model',
            model: lines,
            material: color
        });
    let line2 = new Entity('lines2')
        .addComponent('model', {
            type: 'model',
            model: lines,
            material: color2
        }).setLocalEulerAngles(0, 90, 0);
    let line3 = new Entity('lines3')
        .addComponent('model', {
            type: 'model',
            model: lines,
            material: color3
        }).setLocalEulerAngles(0, 0, 90);
    temp.addChild(line1).addChild(line2).addChild(line3);
    return temp;
}

async function main() {
    const app = new Application(document.getElementById('canvas') as HTMLCanvasElement, {
        // webgl1:true
    });
    console.log(app);
    let material = new StandardMaterial();
    material.diffuseColor.set(1, 0, 0);
    // material.opacity = 0.5;

    let material2 = new StandardMaterial();
    let texture = new Texture();
    let img2 = await loadImage('assets/images/flare-2.png');
    texture.setSource(img2);
    material2.diffuseMap = texture;

    let debug = new Entity('debug')
        .addComponent('model', {
            type: 'box',
        }).setLocalScale(0.3, 0.3, 0.3);

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
        .setPosition(0, 5, 5)
        .lookAt(new Vec3(0, 0, 0))
        // .setEulerAngles(-15, 52, 0)
        .addComponent('script', [new FirstPersonCamera({ speed: 0.1 })]);
    app.scene.root.addChild(camera);

    let light = new Entity('light')
        .addComponent('light', {
            type: 'directional',
            castShadows: true,
            shadowType: 'PCF',
            range: 16
        })
        // .lookAt(direction, getUp(direction))
        .setEulerAngles(-45, 0, 0)
        .setLocalPosition(5, 5, -5)
        .addChild(debug);
    app.scene.root.addChild(light);


    let box = new Entity('box')
        .addComponent('model', {
            type: 'box',
            // castShadow: false,
            receiveShadow: false
        })
        .setLocalPosition(-1, 0, 0);
    box.model.drawable(0).material = material;

    let lines = Line.createLines([
        new Vec3(-2, 0, 0), new Vec3(2, 0, 0)
    ]);


    let box2 = new Entity('lines')
        .addComponent('model', {
            type: 'model',
            model: lines,
        }).setLocalPosition(1, 0, 0);

    let temp = new Entity('temp');
    temp.addChild(box);
    // .addChild(box2);
    temp.addComponent('script', [new Rotate({ speed: 2 })]);

    app.scene.root.addChild(temp);
    app.scene.root.addChild(createCoordinateSystem());

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


