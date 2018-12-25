/*
 * ProjectName: hypergl
 * FilePath: \demo\index12.ts
 * Created Date: Tuesday, December 18th 2018, 10:13:21 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, December 26th 2018, 12:52:38 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */



import { Entity, StandardMaterial, Config, SkyMaterial, Application, Vec3, Color, Texture, Mesh, Line, ColorMaterial, FOG, GltfAssetLoader, Vec2 } from 'hypergl';
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
    app.scene.fogEnd = 50;
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
    app.scene.root.addChild(sky);

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

    let light = new Entity('light')
        .addComponent('light', {
            type: 'directional',
            castShadows: true,
            shadowType: 'PCF',
        })
        .setEulerAngles(-45, 0, 0)
        .setLocalPosition(0, 5, 0);
    app.scene.root.addChild(light);

    let pointlight = new Entity('pointlight')
        .addComponent('light', {
            type: 'point',
            castShadows: true,
            range: 16
        })
        .setLocalPosition(0, 5, 1);
    app.scene.root.addChild(pointlight);

    let sphere1 = new Entity('sphere1')
        .addComponent('model', {
            type: 'sphere',
        })
        .setLocalPosition(3, 0, 0);
    sphere1.model.material().opacity = 0.3;
    sphere1.model.material().diffuseColor = new Color(1, 0, 0);
    app.scene.root.addChild(sphere1);

    let sphere2 = new Entity('sphere2')
        .addComponent('model', {
            type: 'sphere',
        })
        .setLocalPosition(1.5, 0, 0);
    let misc = new Texture();
    misc.setSource(await loadImage('assets/images/misc.jpg'));
    sphere2.model.material().diffuseMap = misc;
    app.scene.root.addChild(sphere2);

    let sphere3 = new Entity('sphere3')
        .addComponent('model', {
            type: 'sphere',
        })
        .setLocalPosition(0, 0, 0);

    sphere3.model.material().diffuseMap = misc;
    sphere3.model.material().diffuseMapOffset = new Vec2(0.5, 0.5);
    app.scene.root.addChild(sphere3);

    let sphere4 = new Entity('sphere4')
        .addComponent('model', {
            type: 'sphere',
        })
        .setLocalPosition(-1.5, 0, 0);
    let tree = new Texture();
    tree.setSource(await loadImage('assets/images/tree.png'));
    sphere4.model.material().diffuseMap = misc;
    sphere4.model.material().opacityMap = flare;
    app.scene.root.addChild(sphere4);

    let sphere5 = new Entity('sphere5')
        .addComponent('model', {
            type: 'sphere',
        })
        .setLocalPosition(-3, 0, 0);
    sphere5.model.instance.meshs[0].mode = 1;
    app.scene.root.addChild(sphere5);

    let sphere6 = new Entity('sphere6')
        .addComponent('model', {
            type: 'sphere',
        })
        .setLocalPosition(0, 0, -1.5);
    sphere6.model.material().diffuseMap = misc;
    sphere6.model.material().opacityMap = flare;
    // sphere6.model.material().opacityMapOffset = new Vec2(0.3, 0.1);
    sphere6.model.material().alphaTest = 0.9;
    app.scene.root.addChild(sphere6);

    let sphere7 = new Entity('sphere7')
        .addComponent('model', {
            type: 'sphere',
        })
        .setLocalPosition(1.5, 0, -1.5);
    // sphere7.model.material().diffuseMap = misc;
    // sphere7.model.material().specularMap = misc;
    sphere7.model.material().specularColor = new Color(1, 0, 1);
    sphere7.model.material().shininess = 3;
    app.scene.root.addChild(sphere7);

    let sphere8 = new Entity('sphere8')
        .addComponent('model', {
            type: 'sphere',
        })
        .setLocalPosition(3, 0, -1.5);
    app.scene.root.addChild(sphere8);


    let plane = new Entity('plane')
        .addComponent('model', {
            type: 'plane',
            material: grassMaterial
        })
        .setPosition(0, -2, 0).setLocalScale(10, 1, 10);
    app.scene.root.addChild(plane);

    app.start();
}

main().catch((err) => {
    console.log(err);
});


