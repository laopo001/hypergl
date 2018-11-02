/*
 * ProjectName: hypergl
 * FilePath: \demo\index4.ts
 * Created Date: Saturday, September 15th 2018, 3:19:07 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, November 2nd 2018, 12:19:22 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */



import { Scene, BUFFER, PointLight, DirectionalLight, Light, StandardMaterial, Application, BasicMaterial, Entity, Texture } from '../src';
import vert from '../src/graphics/shaders/vertex.vert';
import frag from '../src/graphics/shaders/fragment.frag';
import { loadImage } from './utils/util';
import { Mat4, Vec3 } from '../src/math';
import { Camera } from '../src/scene/camera';
import { Mesh } from '../src/mesh/mesh';
import { Color } from '../src/core/color';

function addLight(app, v) {
    let light = new PointLight();
    light.setPosition(v);
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

    const app = new Application(document.getElementById('canvas') as HTMLCanvasElement, {
        // webgl1:true
    });

    let light = new DirectionalLight();
    // app.scene.lights.directionalLights.push(light);
    addLight(app, new Vec3(0, 2, 0));

    let m2 = new StandardMaterial();
    m2.diffuseMap = texture;
    m2.update();


    let mesh = Mesh.createBox();
    let entity = new Entity();
    entity.mesh = mesh;
    mesh.material = m2;
    entity.name = '123';
    entity.setPosition(-2, 0, 0);
    app.scene.root.addChild(entity);


    let mesh2 = Mesh.createBox();
    let entity2 = new Entity();
    entity2.setLocalScale(2, 2, 2);
    mesh2.material = m2;
    entity2.mesh = mesh2;
    entity2.setPosition(3, 0, 0);
    app.scene.root.addChild(entity2);

    (_ => {
        let mesh = Mesh.createBox();
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
        app.scene.root.addChild(entity);
    })();

    let camera = new Camera();
    camera.setPerspective(45, app.canvas.width / app.canvas.height, 1, 1000);
    camera.setPosition(0, 5, 10);
    camera.lookAt(entity);

    app.scene.cameras.push(camera);
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

    app.on('update', _ => {
        // entity.rotate(0, 1, 0);
    });

};


main();