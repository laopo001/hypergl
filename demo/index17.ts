/*
 * ProjectName: hypergl
 * FilePath: \demo\index17.ts
 * Created Date: Friday, January 11th 2019, 12:01:41 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, January 11th 2019, 12:43:03 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */



import { Entity, StandardMaterial, Config, util, SkyMaterial, Application, Vec3, Color, Texture, CubeTexture, PBRMaterial } from 'hypergl';
import { FirstPersonCamera } from './utils/first_person_camera';
import { Rotate } from './utils/rotate';
// tslint:disable-next-line:no-duplicate-imports
import { LoadImagePlugin } from 'hypergl/plugins/load';
import { StatsPlugin } from 'hypergl/plugins/stat';
import { PointerPlugin } from 'hypergl/plugins/pointer';
import { CannonPhysicsPlugin } from 'hypergl/plugins/physics';
import { KeyPlugin } from 'hypergl/plugins/key';
import { AppPlugin } from './types';

async function main() {
    const app = new Application<AppPlugin>(document.getElementById('canvas') as HTMLCanvasElement, {
        // webgl1:true
    });
    app.registerPlugins([LoadImagePlugin, StatsPlugin, PointerPlugin, CannonPhysicsPlugin, KeyPlugin]);

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
    // let grassTexture = new Texture();
    // let grassImage = await loadImage('assets/images/grass.jpg');
    // grassTexture.setSource(grassImage);
    grassMaterial.diffuseMap = Texture.loadImage('assets/images/grass.jpg');


    let box = new Entity('box')
        .addComponent('model', {
            type: 'box',
        })
        .addComponent('collision', {
            type: 'box',
            halfExtents: new Vec3(0.5, 0.5, 0.5),
            // debugger: true
        })
        .addComponent('rigidbody', {
            type: 'dynamic',
            // velocity: new Vec3(0, 0, 6)
        })
        .setLocalPosition(0, 0, 0);
    box.model.drawable<StandardMaterial>(0).material.diffuseColor = new Color(0.5, 0, 0);
    app.scene.root.addChild(box);

    app.on('update', () => {
        // console.log(app.plugins.key.KeyA);
        if (app.plugins.key.ArrowUp) {
            box.rigidbody.applyImpulse(new Vec3(0, 1, 0), new Vec3(0, 0, 0));
        }
    });

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

    let plane = new Entity('plane')
        .addComponent('model', {
            type: 'plane',
            material: grassMaterial
        })
        .addComponent('collision', {
            type: 'box',
            debugger: true,
            halfExtents: new Vec3(5, 0.1, 5),
            // onCollide: (e) => { console.log(e.target.entity.name); }
        })
        .addComponent('rigidbody', {
            type: 'static',
            mass: 0
        })
        .setPosition(0, -2, 0).setLocalScale(10, 1, 10);
    app.scene.root.addChild(plane);

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
        .setPosition(-10, 10, 0)
        .lookAt(new Vec3(0, 0, 0));
    // .addComponent('script', [new FirstPersonCamera({ speed: 2 })]);
    app.scene.root.addChild(camera);

    app.start();
}

main().catch((err) => {
    console.log(err);
});


