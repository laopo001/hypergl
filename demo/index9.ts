/*
 * ProjectName: hypergl
 * FilePath: \demo\index9.ts
 * Created Date: Tuesday, December 4th 2018, 4:05:52 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, December 12th 2018, 5:13:15 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, Script, StandardMaterial, Config, SkyMaterial, Application, Texture, Mesh, Line, ColorMaterial, FOG } from '../src';
import { FirstPersonCamera } from './utils/first_person_camera';
import { Rotate } from './utils/rotate';
import { Vec3 } from '../src/math';
import { Color } from '../src/core';
import { loadImage } from './utils';
import { getUp } from '../src/utils/util';

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
    app.scene.fog = FOG.LINEAR;
    app.scene.fogEnd = 1000;
    let skycube = new Texture(true);
    let Helipad_negx = await loadImage('assets/images/Helipad_negx.png');
    let Helipad_negy = await loadImage('assets/images/Helipad_negy.png');
    let Helipad_negz = await loadImage('assets/images/Helipad_negz.png');
    let Helipad_posx = await loadImage('assets/images/Helipad_posx.png');
    let Helipad_posy = await loadImage('assets/images/Helipad_posy.png');
    let Helipad_posz = await loadImage('assets/images/Helipad_posz.png');
    skycube.setSource(Helipad_posx, Helipad_negx, Helipad_posy, Helipad_negy, Helipad_posz, Helipad_negz);
    let skym = new SkyMaterial();
    skym.cubeTexture = skycube;

    let material = new StandardMaterial();
    material.diffuseMap = skycube;

    let material2 = new StandardMaterial();
    let texture = new Texture();
    let img2 = await loadImage('assets/images/flare-2.png');
    texture.setSource(img2);
    material2.diffuseMap = texture;

    let debug = new Entity('debug')
        .addComponent('model', {
            type: 'box',
            material: skym
        })
        .setLocalScale(100, 100, 100);
        // .addComponent('script', [new Rotate({ speed: 1 })]);
    app.scene.root.addChild(debug);

    let camera = new Entity('camera')
        .addComponent('camera', {
            type: 'perspective',
            perspective: {
                fov: 45,
                aspectRatio: app.canvas.width / app.canvas.height,
                near: 1,
                far: 10000
            }
        })
        .addComponent('listener', {})
        .setPosition(5, 5, 0)
        .lookAt(new Vec3(0, 0, 0))
        .addComponent('script', [new FirstPersonCamera({ speed: 0.1 })]);
    app.scene.root.addChild(camera);

    let light = new Entity('light')
        .addComponent('light', {
            type: 'directional',
            castShadows: true,
            shadowType: 'PCF',
            range: 16
        })
        .setEulerAngles(-45, 0, 0)
        .setLocalPosition(0, 5, 0);
    app.scene.root.addChild(light);


    let box = new Entity('box')
        .addComponent('model', {
            type: 'box',
            // castShadow: false,
            receiveShadow: false,
            material: material2
        })
        .addComponent('audio', {
            src: [
                './assets/audios/secret.mp3',
            ],
            // autoplay: true
        })
        .setLocalPosition(-3, 0, 0);

    let sphere = new Entity('sphere')
        .addComponent('model', {
            type: 'sphere',
        })
        .addComponent('audio', {
            src: [
                './assets/audios/sprite.webm',
            ],
            // autoplay: true
        })
        .setLocalPosition(3, 0, 0);

    let temp = new Entity('temp');
    temp.addChild(box)
        .addChild(sphere);
    temp.addComponent('script', [new Rotate({ speed: 1 })]);

    app.scene.root.addChild(temp);
    // app.scene.root.addChild(createCoordinateSystem());

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


