/*
 * ProjectName: hypergl
 * FilePath: \demo\index10.ts
 * Created Date: Thursday, December 13th 2018, 2:19:09 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, December 13th 2018, 3:47:18 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, StandardMaterial, Config, SkyMaterial, Application, Vec3, Color, Texture, Mesh, Line, ColorMaterial, FOG, GltfAssetLoader } from '../src';
import { FirstPersonCamera } from './utils/first_person_camera';
import { Rotate } from './utils/rotate';
import { loadImage } from './utils';

function createCoordinateSystem() {
    let temp = new Entity();
    let lines = Line.createLines([
        new Vec3(0, 0, 0), new Vec3(5, 0, 0)
    ]);
    let color = new ColorMaterial();
    color.diffuseColor = new Color(1, 0, 1);
    let color2 = new ColorMaterial();
    color2.diffuseColor = new Color(1, 0, 0);
    let color3 = new ColorMaterial();
    color3.diffuseColor = new Color(0, 0, 1);
    let line1 = new Entity('lines')
        .addComponent('model', {
            type: 'model',
            model: lines,
            material: color
        });
    let line2 = new Entity('lines2')
        .addComponent('model', {
            type: 'model',
            model: lines,
            material: color2
        }).setLocalEulerAngles(0, 90, 0);
    let line3 = new Entity('lines3')
        .addComponent('model', {
            type: 'model',
            model: lines,
            material: color3
        }).setLocalEulerAngles(0, 0, 90);
    temp.addChild(line1).addChild(line2).addChild(line3);
    return temp;
}

async function main() {
    const app = new Application(document.getElementById('canvas') as HTMLCanvasElement, {
        // webgl1:true
    });
    console.log(app);

    // app.scene.fog = FOG.LINEAR;
    // app.scene.fogEnd = 1000;
    let skycube = new Texture(true);
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
    material.diffuseMap = skycube;

    let material2 = new StandardMaterial();
    let texture = new Texture();
    let img2 = await loadImage('assets/images/flare-2.png');
    texture.setSource(img2);
    material2.diffuseMap = texture;

    let debug = new Entity('debug')
        .addComponent('model', {
            type: 'box',
            material: skym
        })
        .setLocalScale(100, 100, 100);
    app.scene.root.addChild(debug);

    let gltf = new GltfAssetLoader('./assets/models/Duck.gltf');
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


