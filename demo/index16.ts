/*
 * ProjectName: hypergl
 * FilePath: \demo\index16.ts
 * Created Date: Monday, December 31st 2018, 10:00:26 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, January 4th 2019, 1:08:58 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */



import { Entity, StandardMaterial, Config, util, SkyMaterial, Application, Vec3, Color, Texture, CubeTexture, PBRMaterial } from 'hypergl';
import { FirstPersonCamera } from './utils/first_person_camera';
import { Rotate } from './utils/rotate';
// tslint:disable-next-line:no-duplicate-imports
import { LoadImagePlugin } from 'hypergl/plugins/load';
import { StatsPlugin } from 'hypergl/plugins/stat';
import { PointerPlugin } from 'hypergl/plugins/pointer';
import { CannonPhysicsPlugin } from 'hypergl/plugins/physics';
import { AppPlugin } from './types';

async function main() {
    const app = new Application<AppPlugin>(document.getElementById('canvas') as HTMLCanvasElement, {
        // webgl1:true
    });
    app.registerPlugins([LoadImagePlugin, StatsPlugin, PointerPlugin, CannonPhysicsPlugin]);
    let loadImage = app.plugins.loadImage.load;
    console.log(app);

    // app.scene.fog = FOG.LINEAR;
    // app.scene.fogEnd = 1000;
    // let shape = app.plugins.physics.createShape('box', { halfExtents: new Vec3(10, 0.1, 10) });
    // let body = app.plugins.physics.addBody({ mass: 1, shape });
    // app.on('update', () => {
    //     console.log(body!.position.y);
    // });
    let cubeTexture = new CubeTexture();
    let negx = await loadImage('assets/images/skybox_nx.jpg');
    let negy = await loadImage('assets/images/skybox_ny.jpg');
    let negz = await loadImage('assets/images/skybox_nz.jpg');
    let posx = await loadImage('assets/images/skybox_px.jpg');
    let posy = await loadImage('assets/images/skybox_py.jpg');
    let posz = await loadImage('assets/images/skybox_pz.jpg');
    cubeTexture.setSource(posx, negx, posy, negy, posz, negz);
    // cubeTexture.wrapU = Config.WRAP.CLAMP_TO_EDGE;
    // cubeTexture.wrapV = Config.WRAP.CLAMP_TO_EDGE;
    // cubeTexture.wrapR = Config.WRAP.CLAMP_TO_EDGE;
    // let cubeTexture = CubeTexture.loadImage('assets/images/skybox_px.jpg', 'assets/images/skybox_nx.jpg', 'assets/images/skybox_py.jpg', 'assets/images/skybox_ny.jpg',
    //     'assets/images/skybox_pz.jpg', 'assets/images/skybox_nz.jpg');
    let skym = new SkyMaterial();
    skym.cubeTexture = cubeTexture;


    let sky = new Entity('debug')
        .addComponent('model', {
            type: 'box',
            material: skym
        })
        .setLocalScale(100, 100, 100);
    app.scene.root.addChild(sky);

    let grassMaterial = new StandardMaterial();
    let grassTexture = new Texture();
    let grassImage = await loadImage('assets/images/grass.jpg');
    grassTexture.setSource(grassImage);
    grassMaterial.diffuseMap = grassTexture;



    let sphere1 = new Entity('sphere')
        .addComponent('model', {
            type: 'sphere',
        })
        .addComponent('collision', {
            type: 'sphere',
            radius: 0.5
        })
        .addComponent('rigidbody', {
            type: 'dynamic',
        })
        .setLocalPosition(0, 0, 0);
    let pbr_sphere1 = new PBRMaterial();
    pbr_sphere1.baseColor = new Color(1, 1, 0);
    pbr_sphere1.metallicFactor = 0.3;
    pbr_sphere1.roughnessFactor = 0.3;
    pbr_sphere1.specularEnvTexture = cubeTexture;
    sphere1.model.drawable(0).material = pbr_sphere1;
    app.scene.root.addChild(sphere1);

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

    let plane = new Entity('plane')
        .addComponent('model', {
            type: 'plane',
        })
        .addComponent('collision', {
            type: 'box',
            halfExtents: new Vec3(10, 0.1, 10)
        })
        .addComponent('rigidbody', {
            type: 'static',
            mass: 0
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
        .setPosition(-
            5, 5, 0)
        .lookAt(new Vec3(0, 0, 0))
        .addComponent('script', [new FirstPersonCamera({ speed: 0.05 })]);
    app.scene.root.addChild(camera);

    // await util.sleep(3000);
    app.start();
}

main().catch((err) => {
    console.log(err);
});


