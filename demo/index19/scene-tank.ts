/*
 * ProjectName: hypergl
 * FilePath: \demo\index19\scene-tank.ts
 * Created Date: Tuesday, February 26th 2019, 10:21:40 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, March 16th 2019, 5:41:51 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */



import { Entity, StandardMaterial, Config, event, Scene, util, SkyMaterial, Application, Vec3, Color, Picker, Texture, CubeTexture, Quat } from 'hypergl';
import { AppPlugin } from '../types';
import { FirstPersonCamera, BloodStrip, PlayerScript } from '../scripts';
import { json } from './physics';
import { AssetsLoader } from '../utils/assets';
let app = Application.getApp<AppPlugin>().unwrap();
import { AmmoPlugin } from 'hypergl/plugins/physics';

export const scene = new Scene('tank').initialize(AmmoPlugin).then(async scene => {
    const red = new StandardMaterial();
    red.diffuseColor = new Color(1, 0, 0);


    let light = new Entity('light')
        .addComponent('light', {
            type: 'directional',
            castShadows: true,
            shadowType: 'PCF',
            range: 16
        })
        .setEulerAngles(-45, -45, 0)
        .setLocalPosition(0, 5, 0);
    scene.root.addChild(light);



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
        .setPosition(0, 5, 5)
        .lookAt(new Vec3(0, 0, 0))
        .addComponent('script', [new FirstPersonCamera({ speed: 2 })]);
    scene.root.addChild(camera);

    let loader = await AssetsLoader.loadAssets({
        scene: app.plugins.gltf.createLoader('./assets/models/_Complete-Game.gltf').loadSenceRoot(),
        tank: app.plugins.gltf.createLoader('./assets/models/CompleteTank.gltf').loadSenceRoot(),
        model_bulled: app.plugins.gltf.createLoader('./assets/models/_Complete-Game.gltf').loadMesh(0)
    });
    let node = loader.get<Entity>('scene');
    node.setLocalScale(0.11, 0.11, 0.11);
    scene.root.addChild(node);
    scene.root.resolveJSON(json.root, true);
    scene.root.enabled = true;

    let node2 = loader.get<Entity>('tank');
    scene.root.addChild(node2);

    let tank = new Entity('tank');
    tank.addComponent('collision', {
        type: 'box',
        debugger: true,
        center: new Vec3(0, 0.25, 0),
        halfExtents: new Vec3(0.25, 0.25, 0.25),
    }).addComponent('rigidbody', {
        type: 'dynamic',
        mass: 0.1,
        restitution: 1,
        friction: 0.5,
    }).addComponent('script', [
        new BloodStrip({ value: 50, camera }),
        new PlayerScript({ speed: 1 })
    ]);
    tank.setPosition(0, 2, 0).setLocalScale(0.25, 0.25, 0.25);
    tank.addChild(node2);
    tank.findByTag('model').forEach(x => {
        x.model.instance.meshs.forEach(drawable => {
            drawable.castShadow = true;
        });
    });
    scene.root.addChild(tank);

    let plane = new Entity('plane')
        .addComponent('model', {
            type: 'plane',
            receiveShadow: true
        })
        .addComponent('collision', {
            type: 'box',
            // debugger: true,
            halfExtents: new Vec3(5, 0.1, 5),
        })
        .addComponent('rigidbody', {
            type: 'static',
            mass: 0
        })
        .setPosition(0, -0.1, 0).setLocalScale(10, 1, 10);
    scene.root.addChild(plane);

    document.getElementById('canvas')!.addEventListener('mousedown', async (e) => {
        let from = camera.camera.screenToWorld(e.offsetX, e.offsetY, camera.camera.instance.nearClip);
        let to = camera.camera.screenToWorld(e.offsetX, e.offsetY, camera.camera.instance.farClip);



        let result = app.scene.systems.rigidbody!.physics.raycastFirst(from, to);
        if (result) {
            let pickedEntity = result.entity;
            console.log(pickedEntity.name);
        }

    }, false);
    return scene;
});


