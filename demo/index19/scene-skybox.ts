/*
 * ProjectName: hypergl
 * FilePath: \demo\index19\scene-skybox.ts
 * Created Date: Tuesday, February 19th 2019, 10:37:20 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, February 19th 2019, 10:42:47 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */


import { Entity, StandardMaterial, Config, Scene, util, SkyMaterial, Application, Vec3, Color, Vec2, Texture, CubeTexture, PBRMaterial, Mesh, Drawable } from 'hypergl';
import { AppPlugin } from '../types';
import { FirstPersonCamera } from '../utils/first_person_camera';
let app = Application.getApp<AppPlugin>();

export const scene = new Scene('skybox');

async function main() {
    let loadImage = util.loadImage;
    let skycube = new CubeTexture();
    let negx = await loadImage('assets/images/skybox_nx.jpg');
    let negy = await loadImage('assets/images/skybox_ny.jpg');
    let negz = await loadImage('assets/images/skybox_nz.jpg');
    let posx = await loadImage('assets/images/skybox_px.jpg');
    let posy = await loadImage('assets/images/skybox_py.jpg');
    let posz = await loadImage('assets/images/skybox_pz.jpg');
    skycube.setSource(posx, negx, posy, negy, posz, negz);
    skycube.wrapU = Config.WRAP.CLAMP_TO_EDGE;
    skycube.wrapV = Config.WRAP.CLAMP_TO_EDGE;
    skycube.wrapR = Config.WRAP.CLAMP_TO_EDGE;
    let skym = new SkyMaterial();
    skym.cubeTexture = skycube;

    let grassMaterial = new StandardMaterial();
    let texture2 = new Texture();
    let grassImage = await loadImage('assets/images/grass.jpg');
    texture2.setSource(grassImage);
    grassMaterial.diffuseMap = texture2;

    let sky = new Entity('sky')
        .addComponent('model', {
            type: 'box',
            material: skym
        })
        // .setLocalPosition(10, 20, 30)
        .setLocalScale(100, 100, 100);
    scene.root.addChild(sky);

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
        .setPosition(0, 5, 5)
        .lookAt(new Vec3(0, 0, 0))
        .addComponent('script', [new FirstPersonCamera({ speed: 0.1 })]);
    scene.root.addChild(camera);

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
            material: grassMaterial
        })
        .setPosition(0, -2, 0).setLocalScale(10, 1, 10);
    scene.root.addChild(plane);

}
main();