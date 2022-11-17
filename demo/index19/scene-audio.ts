/*
 * ProjectName: hypergl
 * FilePath: \demo\index19\scene-audio.ts
 * Created Date: Sunday, February 17th 2019, 10:03:04 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, February 18th 2019, 12:28:03 am
 * Modified By:
 * -----
 * Copyright (c) 2019 dadigua
 */


import { Entity, StandardMaterial, Config, event, Scene, util, SkyMaterial, Application, Vec3, Color, Picker, Texture, CubeTexture, PBRMaterial, Mesh, Drawable } from 'hypergl';
import { AppPlugin } from '../types';
import { Rotate } from '../utils/rotate';
import { FirstPersonCamera } from '../utils/first_person_camera';

export const scene = new Scene('audio');

let box = new Entity('box')
    .addComponent('model', {
        type: 'box',
        receiveShadow: false,
    })
    .addComponent('audio', {
        src: [
            './assets/audios/secret.mp3',
        ],
        autoplay: true
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
        autoplay: true
    })
    .setLocalPosition(3, 0, 0);

let temp = new Entity('temp');
temp.addChild(box)
    .addChild(sphere);
temp.addComponent('script', [new Rotate({ speed: 10 })]);

scene.root.addChild(temp);

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
    .addComponent('listener', {})
    .setPosition(5, 5, 0)
    .lookAt(new Vec3(0, 0, 0))
    .addComponent('script', [new FirstPersonCamera({ speed: 2 })]);
scene.root.addChild(camera);