/*
 * ProjectName: hypergl
 * FilePath: \demo\index19\scene-tank.ts
 * Created Date: Tuesday, February 26th 2019, 10:21:40 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, March 11th 2019, 10:42:46 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */


import { Entity, StandardMaterial, Config, event, Scene, util, SkyMaterial, Application, Vec3, Color, Picker, Texture, CubeTexture, PBRMaterial, Mesh, Drawable } from 'hypergl';
import { AppPlugin } from '../types';
import { json } from './physics';
import { Rotate } from '../utils/rotate';
import { FirstPersonCamera } from '../utils/first_person_camera';

let app = Application.getApp<AppPlugin>().unwrap();

const scene = new Scene('tank');

let gltf = app.plugins.gltf.createLoader('./assets/models/_Complete-Game.gltf');

let cubeTexture = CubeTexture.loadImage('assets/images/skybox_px.jpg', 'assets/images/skybox_nx.jpg', 'assets/images/skybox_py.jpg', 'assets/images/skybox_ny.jpg',
    'assets/images/skybox_pz.jpg', 'assets/images/skybox_nz.jpg');

gltf.loadSenceRoot().then(node => {
    node.setLocalScale(0.11, 0.11, 0.11);
    // console.log(node.getLocalScale());
    scene.root.addChild(node);
    scene.root.resolveJSON(json.root, true);
    scene.root.enabled = true;
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

event.on('start', () => {
    let picker = new Picker(scene);
    document.getElementById('canvas')!.addEventListener('mousedown', (e) => {
        if (app.scene.name === 'tank' && e.button === 2) {
            let entity = picker.pick(e.offsetX, e.offsetY);
            // alert(entity.name);
            console.log(entity.name);
        }
    }, false);
});

export { scene };
