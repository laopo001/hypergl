/*
 * ProjectName: hypergl
 * FilePath: /demo/index19/scene-test.ts
 * Created Date: Sunday, March 17th 2019, 10:40:29 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, March 19th 2019, 1:18:20 am
 * Modified By:
 * -----
 * Copyright (c) 2019 dadigua
 */


import { Entity, StandardMaterial, Config, event, Scene, util, SkyMaterial, Application, Vec3, Color, Picker, Texture, CubeTexture, PBRMaterial, Mesh, Drawable } from 'hypergl';
import { AppPlugin } from '../types';
import { FirstPersonCamera, BloodStrip, PlayerScript } from '../scripts';
export const scene = new Scene('test');

let box = Mesh.createBox();

let e = new Entity().addChild(new Entity('e').addComponent('model', { type: 'model', model: box })).setLocalPosition(-1, 0, 0);

let e1 = new Entity('e1').addChild(e.clone()).setLocalPosition(-1, 0, 0);
let e2 = new Entity('e2').addChild(e.clone()).setLocalPosition(1, 0, 0);

scene.root.addChild(e1);
scene.root.addChild(e2);


let camera = new Entity('camera')
    .addComponent('camera', {
        type: 'perspective',
        perspective: {
            fov: 45,
            aspectRatio: 1000 / 600,
            near: 1,
            far: 10000
        }
    })
    .setPosition(0, 5, 5)
    .lookAt(new Vec3(0, 0, 0))
    .addComponent('script', [new FirstPersonCamera({ speed: 2 })]);
scene.root.addChild(camera);