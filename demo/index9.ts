/*
 * ProjectName: hypergl
 * FilePath: \demo\index9.ts
 * Created Date: Tuesday, December 4th 2018, 4:05:52 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, December 30th 2018, 6:36:19 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, StandardMaterial, Config, SkyMaterial, Application, Vec3, CubeTexture, Texture, Mesh, Line, ColorMaterial, FOG, GltfAssetLoader, Vec2 } from 'hypergl';
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
    let loadImage = app.plugins.loadImage.load;
    console.log(app);

    app.scene.fog = FOG.LINEAR;
    app.scene.fogEnd = 1000;
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
        .setLocalScale(100, 100, 100);
    // .addComponent('script', [new Rotate({ speed: 1 })]);
    app.scene.root.addChild(debug);

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
        .addComponent('listener', {})
        .setPosition(5, 5, 0)
        .lookAt(new Vec3(0, 0, 0))
        .addComponent('script', [new FirstPersonCamera({ speed: 0.1 })]);
    app.scene.root.addChild(camera);

    let light = new Entity('light')
        .addComponent('light', {
            type: 'directional',
            castShadows: true,
            shadowType: 'PCF',
            range: 16
        })
        .setEulerAngles(-45, 0, 0)
        .setLocalPosition(0, 5, 0);
    app.scene.root.addChild(light);


    let box = new Entity('box')
        .addComponent('model', {
            type: 'box',
            // castShadow: false,
            receiveShadow: false,
            material
        })
        .addComponent('audio', {
            src: [
                './assets/audios/secret.mp3',
            ],
            // autoplay: true
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
            // autoplay: true
        })
        .setLocalPosition(3, 0, 0);

    let temp = new Entity('temp');
    temp.addChild(box)
        .addChild(sphere);
    temp.addComponent('script', [new Rotate({ speed: 1 })]);

    app.scene.root.addChild(temp);
    // app.scene.root.addChild(createCoordinateSystem());

    let plane = new Entity('plane')
        .addComponent('model', {
            type: 'plane'
        })
        .setPosition(0, -2, 0).setLocalScale(10, 1, 10);
    // plane.model.material = material2;
    app.scene.root.addChild(plane);

    app.start();
}

main();


