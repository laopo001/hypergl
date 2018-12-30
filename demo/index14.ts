/*
 * ProjectName: hypergl
 * FilePath: \demo\index14.ts
 * Created Date: Friday, December 28th 2018, 5:01:06 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, December 30th 2018, 8:28:26 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */



import { Entity, StandardMaterial, Config, SkyMaterial, Application, Vec3, Color, Texture, Mesh, Line, ColorMaterial, FOG, GltfAssetLoader, Vec2, CubeTexture, PBRMaterial } from 'hypergl';
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

    // app.scene.fog = FOG.LINEAR;
    // app.scene.fogEnd = 1000;
    // let skycube = new CubeTexture();
    // let negx = await loadImage('assets/images/skybox_nx.jpg');
    // let negy = await loadImage('assets/images/skybox_ny.jpg');
    // let negz = await loadImage('assets/images/skybox_nz.jpg');
    // let posx = await loadImage('assets/images/skybox_px.jpg');
    // let posy = await loadImage('assets/images/skybox_py.jpg');
    // let posz = await loadImage('assets/images/skybox_pz.jpg');
    // skycube.setSource(posx, negx, posy, negy, posz, negz);

    let cubeTexture = CubeTexture.loadImage('assets/images/skybox_px.jpg', 'assets/images/skybox_nx.jpg', 'assets/images/skybox_py.jpg', 'assets/images/skybox_ny.jpg',
        'assets/images/skybox_pz.jpg', 'assets/images/skybox_nz.jpg');
    cubeTexture.wrapU = Config.WRAP.CLAMP_TO_EDGE;
    cubeTexture.wrapV = Config.WRAP.CLAMP_TO_EDGE;
    cubeTexture.wrapR = Config.WRAP.CLAMP_TO_EDGE;
    let skym = new SkyMaterial();
    skym.cubeTexture = cubeTexture;

    // let material = new StandardMaterial();
    // material.diffuseMap = skycube;

    let material2 = new StandardMaterial();
    // let texture = new Texture();
    // let img2 = await loadImage('assets/images/flare-2.png');
    // texture.setSource(img2);
    let texture = Texture.loadImage('assets/images/flare-2.png');

    material2.diffuseMap = texture;

    let sky = new Entity('debug')
        .addComponent('model', {
            type: 'box',
            material: skym
        })
        // .setLocalPosition(10, 20, 30)
        .setLocalScale(100, 100, 100);
    app.scene.root.addChild(sky);

    let gltf = new GltfAssetLoader('./assets/models/DamagedHelmet.gltf');
    let node = await gltf.loadSenceRoot();
    node.addComponent('script', [new Rotate()]);
    app.scene.root.addChild(node);

    let entity = app.scene.root.findByName('node_damagedHelmet_-6514');
    entity!.model.material<PBRMaterial>().diffuseEnvTexture = cubeTexture;
    entity!.model.material<PBRMaterial>().specularEnvTexture = cubeTexture;
    console.log(entity);


    let light = new Entity('light')
        .addComponent('light', {
            type: 'directional',
            castShadows: false,
            shadowType: 'PCF',
            range: 16
        })
        .setEulerAngles(-45, 0, 0)
        .setLocalPosition(0, 5, 0);
    app.scene.root.addChild(light);



    let plane = new Entity('plane')
        .addComponent('model', {
            type: 'plane',
            material: material2
        })
        .setPosition(0, -2, 0).setLocalScale(10, 1, 10);
    app.scene.root.addChild(plane);

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
        .setPosition(0, 5, 5)
        .lookAt(new Vec3(0, 0, 0))
        .addComponent('script', [new FirstPersonCamera({ speed: 0.05 })]);
    app.scene.root.addChild(camera);

    app.start();
}

main().catch((err) => {
    console.log(err);
});


