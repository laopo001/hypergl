/*
 * ProjectName: hypergl
 * FilePath: \demo\index7.ts
 * Created Date: Monday, October 22nd 2018, 11:35:02 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, October 29th 2018, 11:22:42 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */



import { Scene, BUFFER, PointLight, DirectionalLight, SpotLight, StandardMaterial, Application, BasicMaterial, Entity, Texture, util } from '../src';
import { FirstPersonCamera } from './utils/first_person_camera';
import { loadImage } from './utils/util';
import { Mat4, Vec3 } from '../src/math';
import { Camera } from '../src/scene/camera';
import { Mesh } from '../src/mesh/mesh';
import { Color } from '../src/core/color';

function addLight(app, v) {
    let light = new PointLight();
    light.setPosition(v);
    // light.castShadows = false;
    // light.range = 20;
    // light.color = new Color(0.5, 1, 0.5);
    app.scene.lights.pointLights.push(light);
    let mesh = Mesh.createBox(app.rendererPlatform);
    let entity = new Entity();
    entity.mesh = mesh;
    let m3 = new BasicMaterial();
    m3.color = new Color(1, 1, 0.5);
    m3.update();
    entity.mesh.material = m3;
    entity.setLocalScale(0.2, 0.2, 0.2);
    entity.setPosition(light.getPosition());
    app.scene.root.addChild(entity);
    return light;
}

let main = async () => {

    let texture = new Texture();
    let img = await loadImage('assets/images/IMG_0485.JPG');
    texture.setSource(img);

    let texture2 = new Texture();
    let img2 = await loadImage('assets/images/flare-2.png');
    texture2.setSource(img2);

    const app = new Application(document.getElementById('canvas') as HTMLCanvasElement, {
        // webgl1:true
    });

    let model = await app.loaderObjModel('./assets/models/box.obj');


    let dirlight = new DirectionalLight();
    dirlight.castShadows = true;
    // dirlight.direction = new Vec3(0, -1, 1);
    app.scene.root.addChild(dirlight);
    // addLight(app, new Vec3(0, 2, 0));
    let spotLight = new SpotLight();
    spotLight.setPosition(0, 5, 0);
    // app.scene.root.addChild(spotLight);


    let material = new StandardMaterial();
    material.diffuseColor = new Color(1, 0, 0);
    // material.opacity = 0.5;
    // material.opacityMap = texture2;
    material.update();

    let material2 = new StandardMaterial();
    material2.diffuseMap = texture;
    material2.update();


    let mesh = Mesh.createBox(app.rendererPlatform);
    console.log(model, mesh);
    let entity = new Entity();
    entity.mesh = model;
    entity.mesh.material = material;
    entity.name = '123';
    entity.setPosition(1.5, 1, 2);
    entity.setLocalScale(0.01, 0.01, 0.01);


    let mesh2 = Mesh.createBox(app.rendererPlatform);
    let entity2 = new Entity();
    entity2.setLocalScale(2, 2, 2);
    mesh2.material = material2;
    entity2.mesh = mesh2;
    entity2.setPosition(3, 0, 0);
    app.scene.root.addChild(entity2);

    app.scene.root.addChild(entity);

    (_ => {
        let mesh = Mesh.createBox(app.rendererPlatform);
        // console.log(mesh);
        let m = new StandardMaterial();
        m.diffuseColor = new Color(0.5, 1, 0.5);
        // m.colorMap = texture;
        m.update();
        let entity = new Entity();
        entity.setPosition(0, -1, 0);
        entity.setLocalScale(20, 1, 20);
        entity.mesh = mesh;
        mesh.material = m;
        // mesh.receiveShadow = false;
        app.scene.root.addChild(entity);
    })();


    let camera = new Camera();
    camera.setPerspective(45, app.canvas.width / app.canvas.height, 1, 1000);
    camera.setPosition(-2, 5, 10);
    camera.lookAt(new Vec3(0, 0, 0), camera.up);

    app.scene.cameras.push(camera);

    let script = new FirstPersonCamera(FirstPersonCamera.defaultInputs, app);
    (script as any).entity = camera;
    script.initialize();
    // ------------
    // let scene = app.createScene();
    // scene.cameras.push(camera);
    // scene.lights.directionalLights.push(light);
    // scene.root.addChild(entity);
    // // scene.render();
    // let f = scene.createFrame();
    // f.render();

    // (entity.mesh.material as StandardMaterial).diffuseTexture = f.getTexture();
    // entity.mesh.material.update();

    // app.rendererPlatform.setViewport(100, 200, 500, 300);
    app.start();

    app.on('update', dt => {
        script.update(dt);
        // entity.rotate(0, 1, 0);
    });

};


main();