/*
 * ProjectName: hypergl
 * FilePath: \demo\index10.ts
 * Created Date: Thursday, December 13th 2018, 2:19:09 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, January 20th 2019, 8:40:06 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, StandardMaterial, Config, SkyMaterial, Application, Vec3, Color, CubeTexture, Texture, Mesh, Line, ColorMaterial, FOG, Vec2 } from 'hypergl';
import { FirstPersonCamera } from './utils/first_person_camera';
import { Rotate } from './utils/rotate';
// tslint:disable-next-line:no-duplicate-imports
import { LoadImagePlugin } from 'hypergl/plugins/load';
import { StatsPlugin } from 'hypergl/plugins/stat';
import { PointerPlugin } from 'hypergl/plugins/pointer';
import { AppPlugin } from './types';

async function main() {
    const app = new Application<AppPlugin>(document.getElementById('canvas') as HTMLCanvasElement, {
        // webgl1:true
    });
    app.registerPlugins([LoadImagePlugin, StatsPlugin, PointerPlugin]);
    let loadImage = app.util.loadImage;
    console.log(app);

    // app.scene.fog = FOG.LINEAR;
    // app.scene.fogEnd = 1000;
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

    let material = new StandardMaterial();
    let texture = new Texture();
    let img2 = await loadImage('assets/images/flare-2.png');
    texture.setSource(img2);
    material.diffuseMap = texture;

    let debug = new Entity('debug')
        .addComponent('model', {
            type: 'box',
            material: skym
        })
        // .setLocalPosition(10, 20, 30)
        .setLocalScale(100, 100, 100);
    app.scene.root.addChild(debug);

    let gltf = app.plugins.gltf.createLoader('./assets/models/Duck.gltf');
    let node = await gltf.loadSenceRoot();
    app.scene.root.addChild(node);

    let light = new Entity('light')
        .addComponent('light', {
            type: 'directional',
            // castShadows: true,
            shadowType: 'PCF',
            range: 16
        })
        .setEulerAngles(-45, 0, 0)
        .setLocalPosition(0, 5, 0);
    app.scene.root.addChild(light);



    let plane = new Entity('plane')
        .addComponent('model', {
            type: 'plane'
        })
        .setPosition(0, -2, 0).setLocalScale(10, 1, 10);
    app.scene.root.addChild(plane);

    app.start();
}

main().catch((err) => {
    console.log(err);
});


