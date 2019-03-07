/*
 * ProjectName: hypergl
 * FilePath: \demo\index17.ts
 * Created Date: Friday, January 11th 2019, 12:01:41 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, March 7th 2019, 11:37:33 pm
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
import { AmmoPlugin } from 'hypergl/plugins/physics';
import { KeyPlugin } from 'hypergl/plugins/key';
import { AppPlugin } from './types';

async function main() {
    const app = new Application<AppPlugin>(document.getElementById('canvas') as HTMLCanvasElement, {
        // webgl1:true
    });
    await app.registerPlugins([LoadImagePlugin, StatsPlugin, AmmoPlugin,
        PointerPlugin, KeyPlugin]);

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


    let box = new Entity('box')
        .addComponent('model', {
            type: 'box',
            material: grassMaterial
        })
        .addComponent('collision', {
            type: 'box',
            halfExtents: new Vec3(0.5, 0.5, 0.5),
            center: new Vec3(0, -1, 0),
            debugger: true
        })
        .addComponent('rigidbody', {
            type: 'dynamic',
            // linearFactor: new Vec3(0, 1, 0),
            // angularFactor: new Vec3(0, 0, 0),
        })
        .setLocalPosition(0, 2, 0);
    box.model.drawable(0).material.diffuseColor = new Color(0.5, 0, 0);

    // let temp = new Entity('t');
    // temp.setLocalScale(2, 2, 2);
    // temp.addChild(box);
    app.scene.root.addChild(box);

    app.on('update', () => {
        let position = new Vec3(0, 0, 0);
        if (app.plugins.key.isPressed('ArrowUp')) {
            box.rigidbody.applyImpulse(new Vec3(0, 5, 0), position);
        }
        if (app.plugins.key.isPressed('ArrowDown')) {
            box.rigidbody.applyImpulse(new Vec3(0, -5, 0), position);
        }
        if (app.plugins.key.isPressed('ArrowLeft')) {
            box.rigidbody.applyImpulse(new Vec3(0, 0, -5), position);
        }
        if (app.plugins.key.isPressed('ArrowRight')) {
            box.rigidbody.applyImpulse(new Vec3(0, 0, 5), position);
        }
        if (app.plugins.key.isPressed('KeyR')) {
            box.rigidbody.teleport(0, 0, 0);
        }
        if (box.getPosition().z > 5) {
            box.rigidbody.teleport(0, box.getPosition().y, -5);
        }
        if (box.getPosition().z < -5) {
            box.rigidbody.teleport(0, box.getPosition().y, 5);
        }
        if (app.plugins.key.KeyF) {
            box.rigidbody.applyForce(new Vec3(0, 9.8, 0), position);
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
            mass: 0,
            friction: 0
        })
        .setPosition(0, -4, 0).setLocalScale(10, 1, 10);
    app.scene.root.addChild(plane);

    let plane2 = new Entity('plane2')
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
        .setPosition(0, 4, 0).setLocalScale(10, 1, 10);
    app.scene.root.addChild(plane2);

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
        .setPosition(-15, 0, 0)
        .lookAt(new Vec3(0, 0, 0))
        .addComponent('script', [new FirstPersonCamera({ speed: 2 })]);
    app.scene.root.addChild(camera);
    app.start();
}

main().catch((err) => {
    console.log(err);
});


