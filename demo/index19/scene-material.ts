/*
 * ProjectName: hypergl
 * FilePath: \demo\index19\scene-scene.ts
 * Created Date: Tuesday, February 19th 2019, 9:51:50 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, February 26th 2019, 7:07:43 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */


import { Entity, StandardMaterial, Config, Scene, util, SkyMaterial, Application, Vec3, Color, Vec2, Texture, CubeTexture, PBRMaterial, Mesh, Drawable } from 'hypergl';
import { AppPlugin } from '../types';

let app = Application.getApp<AppPlugin>();

export const scene = new Scene('material');

async function main() {
    let loadImage = util.loadImage;

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
        .lookAt(new Vec3(0, 0, 0));
    // .addComponent('script', [new FirstPersonCamera({ speed: 0.1 })]);
    scene.root.addChild(camera);

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

    let material2 = new StandardMaterial();
    let flare = new Texture();
    let img2 = await loadImage('assets/images/flare-2.png');
    flare.setSource(img2);
    material2.diffuseMap = flare;

    let sky = new Entity('sky')
        .addComponent('model', {
            type: 'box',
            material: skym
        })
        // .setLocalPosition(10, 20, 30)
        .setLocalScale(100, 100, 100);
    scene.root.addChild(sky);

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

    let sphere1 = new Entity('sphere1')
        .addComponent('model', {
            type: 'sphere',
        })
        .setLocalPosition(3, 0, 0);
    sphere1.model.material().opacity = 0.3;
    sphere1.model.material().diffuseColor = new Color(1, 0, 0);
    scene.root.addChild(sphere1);

    let sphere2 = new Entity('sphere2')
        .addComponent('model', {
            type: 'sphere',
        })
        .setLocalPosition(1.5, 0, 0);
    let misc = new Texture();
    misc.setSource(await loadImage('assets/images/misc.jpg'));
    sphere2.model.material().diffuseMap = misc;
    scene.root.addChild(sphere2);

    let sphere3 = new Entity('sphere3')
        .addComponent('model', {
            type: 'sphere',
        })
        .setLocalPosition(0, 0, 0);

    sphere3.model.material().diffuseMap = misc;
    sphere3.model.material().diffuseMapOffset = new Vec2(0.5, 0.5);
    scene.root.addChild(sphere3);

    let sphere4 = new Entity('sphere4')
        .addComponent('model', {
            type: 'sphere',
        })
        .setLocalPosition(-1.5, 0, 0);
    let tree = new Texture();
    tree.setSource(await loadImage('assets/images/tree.png'));
    sphere4.model.material().diffuseMap = misc;
    sphere4.model.material().opacityMap = flare;
    scene.root.addChild(sphere4);

    let sphere5 = new Entity('sphere5')
        .addComponent('model', {
            type: 'sphere',
        })
        .setLocalPosition(-3, 0, 0);
    sphere5.model.instance.meshs[0].mode = 1;
    scene.root.addChild(sphere5);

    let sphere6 = new Entity('sphere6')
        .addComponent('model', {
            type: 'sphere',
        })
        .setLocalPosition(0, 0, -1.5);
    sphere6.model.material().diffuseMap = misc;
    sphere6.model.material().opacityMap = flare;
    // sphere6.model.material.opacityMapOffset = new Vec2(0.3, 0.1);
    sphere6.model.material().alphaTest = 0.9;
    scene.root.addChild(sphere6);

    let sphere7 = new Entity('sphere7')
        .addComponent('model', {
            type: 'sphere',
        })
        .setLocalPosition(1.5, 0, -1.5);
    // sphere7.model.material.diffuseMap = misc;
    // sphere7.model.material.specularMap = misc;
    sphere7.model.material().specularColor = new Color(1, 0, 1);
    sphere7.model.material().shininess = 2;
    scene.root.addChild(sphere7);

    let sphere8 = new Entity('sphere8')
        .addComponent('model', {
            type: 'sphere',
        })
        .setLocalPosition(3, 0, -1.5);
    scene.root.addChild(sphere8);

    let plane = new Entity('plane')
        .addComponent('model', {
            type: 'plane',
            material: grassMaterial
        })
        .setPosition(0, -2, 0).setLocalScale(10, 1, 10);
    scene.root.addChild(plane);

}
main();