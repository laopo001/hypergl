/*
 * ProjectName: hypergl
 * FilePath: \demo\index15.ts
 * Created Date: Monday, December 31st 2018, 1:34:26 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, December 31st 2018, 1:58:47 pm
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

    let cubeTexture = CubeTexture.loadImage('assets/images/skybox_px.jpg', 'assets/images/skybox_nx.jpg', 'assets/images/skybox_py.jpg', 'assets/images/skybox_ny.jpg',
        'assets/images/skybox_pz.jpg', 'assets/images/skybox_nz.jpg');
    let skym = new SkyMaterial();
    skym.cubeTexture = cubeTexture;


    let sky = new Entity('debug')
        .addComponent('model', {
            type: 'box',
            material: skym
        })
        .setLocalScale(100, 100, 100);
    app.scene.root.addChild(sky);


    // let sphere1 = new Entity('sphere1')
    //     .addComponent('model', {
    //         type: 'sphere',
    //     })
    //     .setLocalPosition(3, 0, 0);

    // let pbr_sphere1 = new PBRMaterial();
    // pbr_sphere1.baseColor = new Color(1, 0, 0);
    // pbr_sphere1.metallicFactor = 10;
    // sphere1.model.drawable(0).material = pbr_sphere1;
    // app.scene.root.addChild(sphere1);

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            let sphere1 = new Entity('sphere' + i + j)
                .addComponent('model', {
                    type: 'sphere',
                })
                .setLocalPosition(i - 2, 0, j - 2);
            let pbr_sphere1 = new PBRMaterial();
            pbr_sphere1.baseColor = new Color(1, 1, 1);
            pbr_sphere1.metallicFactor = (i / 4);
            pbr_sphere1.roughnessFactor = (j / 4);
            pbr_sphere1.specularEnvTexture = cubeTexture;
            sphere1.model.drawable(0).material = pbr_sphere1;
            app.scene.root.addChild(sphere1);
        }

    }

    let sphere1 = new Entity('sphere')
        .addComponent('model', {
            type: 'sphere',
        })
        .setLocalPosition(3, 0, 3);
    let pbr_sphere1 = new PBRMaterial();
    pbr_sphere1.baseColor = new Color(1, 1, 0);
    pbr_sphere1.metallicFactor = 0;
    pbr_sphere1.roughnessFactor = 0;
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

    app.start();
}

main().catch((err) => {
    console.log(err);
});


