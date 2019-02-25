/*
 * ProjectName: hypergl
 * FilePath: \demo\index19\scene1.ts
 * Created Date: Friday, February 15th 2019, 1:12:09 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, February 25th 2019, 10:45:42 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */


import { Entity, StandardMaterial, Config, event, Scene, util, SkyMaterial, Application, Vec3, Color, Picker, Texture, CubeTexture, PBRMaterial, Mesh, Drawable } from 'hypergl';
import { AppPlugin } from '../types';

let app = Application.getApp<AppPlugin>().unwrap();

let scene = new Scene('pick');

let cubeTexture = CubeTexture.loadImage('assets/images/skybox_px.jpg', 'assets/images/skybox_nx.jpg', 'assets/images/skybox_py.jpg', 'assets/images/skybox_ny.jpg',
    'assets/images/skybox_pz.jpg', 'assets/images/skybox_nz.jpg');
let skym = new SkyMaterial();
skym.cubeTexture = cubeTexture;

let sky = new Entity('sky')
    .addComponent('model', {
        type: 'box',
        material: skym
    })
    .setLocalScale(100, 100, 100);
scene.root.addChild(sky);

let grassMaterial = new StandardMaterial();
grassMaterial.diffuseMap = Texture.loadImage('assets/images/grass.jpg');

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
scene.root.addChild(plane);

let box = new Entity('box')
    .addComponent('model', {
        type: 'box',
    })
    .setLocalPosition(0, 0, 0);
box.model.drawable(0).material = grassMaterial;
box.model.drawable(0).outline = true;
scene.root.addChild(box);

let box2 = new Entity('box2')
    .addComponent('model', {
        type: 'box',
    })
    .addComponent('collision', {
        type: 'box',
        halfExtents: new Vec3(0.5, 0.5, 0.5).scale(2),
        debugger: true,
        collisionstart: (e) => {
            console.log(e);
        }
    })
    .addComponent('rigidbody', {
        type: 'dynamic',
        mass: 1
    })
    .setLocalPosition(1, 2, 1);
box2.model.drawable(0).material = grassMaterial;
scene.root.addChild(box2);


let sphere1 = new Entity('sphere')
    .addComponent('model', {
        type: 'sphere',
    })
    .setLocalPosition(0, 1, 0);
scene.root.addChild(sphere1);
sphere1.model.drawable(0).outline = true;

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
            aspectRatio: 10 / 6,
            near: 1,
            far: 10000
        }
    })
    .addComponent('listener', {})
    .setPosition(-5, 5, 0)
    .lookAt(new Vec3(0, 0, 0));
// .addComponent('script', [new FirstPersonCamera({ speed: 2 })]);
scene.root.addChild(camera);

event.on('start', () => {
    let picker = new Picker(scene);
    document.getElementById('canvas')!.addEventListener('mousedown', (e) => {
        if (app.scene.name === 'pick') {
            let entity = picker.pick(e.offsetX, e.offsetY);
            console.log(entity.name);
        }
    }, false);
});


export { scene };