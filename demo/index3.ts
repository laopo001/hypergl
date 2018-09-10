/*
 * ProjectName: hypergl
 * FilePath: \demo\index2.ts
 * Created Date: Saturday, September 1st 2018, 2:26:10 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, September 11th 2018, 12:58:32 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */



import { SEMANTIC, BUFFER, PointLight, DirectionalLight, Light, StandardMaterial, Application, BasicMaterial, Entity, Texture } from '../src';
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
    // light.color = new Color(0.5, 1, 0.5);
    app.scene.lights.pointLights.push(light);
    let mesh = Mesh.createBox(app.rendererPlatform);
    let entity = new Entity();
    entity.mesh = mesh;
    let m3 = new BasicMaterial();
    m3.color = new Color(0.5, 1, 0.5);
    m3.update();
    entity.mesh.material = m3;
    entity.setLocalScale(0.2, 0.2, 0.2);
    entity.setPosition(light.getPosition());
    app.scene.root.addChild(entity);
}

let main = async () => {
    let texture = new Texture();
    let img = await loadImage('assets/images/IMG_0485.JPG');
    texture.setSource(img);

    const app = new Application(document.getElementById('canvas') as HTMLCanvasElement, {
        // webgl1:true
    });

    // let light = new DirectionalLight();
    // app.scene.lights.directionalLights.push(light);
    addLight(app, new Vec3(0, 2, -1));


    let mesh = Mesh.createBox(app.rendererPlatform);
    console.log(mesh);
    let m = new BasicMaterial();
    m.color = new Color(0.5, 1, 0.5);
    m.colorMap = texture;
    m.update();
    let entity = new Entity();


    entity.mesh = mesh;
    mesh.material = m;

    app.scene.root.addChild(entity);

    let mesh2 = Mesh.createBox(app.rendererPlatform);
    let entity2 = new Entity();
    let m2 = new StandardMaterial();
    // m2.diffuseColor.set(0.5, 0, 0.5);
    m2.diffuseTexture = texture;

    // m2.specularColor.set(0.5, 0, 0.5);
    m2.update();
    mesh2.material = m2;
    mesh.material = m2;
    entity2.mesh = mesh2;

    // entity2.setLocalScale(1.5, 0.5, 1.5);
    entity2.setPosition(2, 0, 0);
    app.scene.root.addChild(entity2);


    let camera = new Camera(45, app.canvas.width / app.canvas.height, 1, 1000);
    camera.setPosition(0, 4, 4);
    camera.lookAt(entity);

    app.scene.cameras.push(camera);

    app.start();

    app.on('update', _ => {
        entity.rotate(0, 1, 0);
    });
    // app.rendererPlatform.setViewport(100, 200, 500, 300);
};


main();