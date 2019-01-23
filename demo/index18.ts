/*
 * ProjectName: hypergl
 * FilePath: \demo\index18.ts
 * Created Date: Wednesday, January 23rd 2019, 12:57:15 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, January 24th 2019, 12:32:21 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */


import { Entity, StandardMaterial, Config, util, SkyMaterial, Application, Vec3, Color, Texture, CubeTexture, PBRMaterial, Mesh, Drawable } from 'hypergl';
import { FirstPersonCamera } from './utils/first_person_camera';
import { Rotate } from './utils/rotate';
// tslint:disable-next-line:no-duplicate-imports
import { LoadImagePlugin } from 'hypergl/plugins/load';
import { StatsPlugin } from 'hypergl/plugins/stat';
import { PointerPlugin } from 'hypergl/plugins/pointer';
import { AmmoPlugin } from 'hypergl/plugins/physics';
import { AppPlugin } from './types';

async function main() {
    const app = new Application<AppPlugin>(document.getElementById('canvas') as HTMLCanvasElement, {
        // webgl1:true
    });
    app.registerPlugins([LoadImagePlugin, StatsPlugin, PointerPlugin, AmmoPlugin]);

    console.log(app);


    let cubeTexture = await CubeTexture.loadImageAsync('assets/images/skybox_px.jpg', 'assets/images/skybox_nx.jpg', 'assets/images/skybox_py.jpg', 'assets/images/skybox_ny.jpg',
        'assets/images/skybox_pz.jpg', 'assets/images/skybox_nz.jpg');
    let skym = new SkyMaterial();
    skym.cubeTexture = cubeTexture;


    let sky = new Entity('sky')
        .addComponent('model', {
            type: 'box',
            material: skym
        })
        .setLocalScale(100, 100, 100);
    app.scene.root.addChild(sky);

    let grassMaterial = new StandardMaterial();
    grassMaterial.diffuseMap = Texture.loadImage('assets/images/grass.jpg');

    let plane = new Entity('plane')
        .addComponent('model', {
            type: 'plane',
            material: grassMaterial
        })
        .setPosition(0, -2, 0).setLocalScale(10, 1, 10);
    app.scene.root.addChild(plane);

    let box = new Entity('box')
        .addComponent('model', {
            type: 'box',
        })
        .setLocalPosition(0, 0, 0);
    box.model.drawable(0).material = grassMaterial;
    box.model.drawable(0).outline = true;
    app.scene.root.addChild(box);

    let box2 = new Entity('box2')
        .addComponent('model', {
            type: 'box',
        })
        .setLocalPosition(1, 1, 0);
    box2.model.drawable(0).material = grassMaterial;
    box2.model.drawable(0).outline = true;
    app.scene.root.addChild(box2);

    let sphere1 = new Entity('sphere')
        .addComponent('model', {
            type: 'sphere',
        })
        .addComponent('collision', {
            type: 'sphere',
            radius: 0.75,
            debugger: true
        })
        .addComponent('rigidbody', {
            type: 'static',
        })
        .setLocalPosition(0, 1, 0);
    app.scene.root.addChild(sphere1);

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
        .setPosition(-5, 5, 0)
        .lookAt(new Vec3(0, 0, 0))
        .addComponent('script', [new FirstPersonCamera({ speed: 2 })]);
    app.scene.root.addChild(camera);

    app.start();
}

main().catch((err) => {
    console.log(err);
});

