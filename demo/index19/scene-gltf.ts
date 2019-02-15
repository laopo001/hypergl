/*
 * ProjectName: hypergl
 * FilePath: \demo\index19\scene_gltf.ts
 * Created Date: Friday, February 15th 2019, 11:51:48 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, February 16th 2019, 2:47:38 am
 * Modified By:
 * -----
 * Copyright (c) 2019 dadigua
 */


import { Entity, StandardMaterial, Config, event, Scene, util, SkyMaterial, Application, Vec3, Color, Picker, Texture, CubeTexture, PBRMaterial, Mesh, Drawable } from 'hypergl';
import { AppPlugin } from '../types';
import { FirstPersonCamera } from '../utils/first_person_camera';

let app = Application.getApp<AppPlugin>();

let scene = new Scene('gltf');

let gltf = app.plugins.gltf.createLoader('./assets/models/DamagedHelmet.gltf');

gltf.loadSenceRoot().then(node => {
    console.log(node);
    scene.root.addChild(node);
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
scene.root.addChild(light);

let plane = new Entity('plane')
    .addComponent('model', {
        type: 'plane',
        // material: material2
    })
    .setPosition(0, -2, 0).setLocalScale(10, 1, 10);
scene.root.addChild(plane);

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

export { scene };
