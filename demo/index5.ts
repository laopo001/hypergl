/*
 * ProjectName: hypergl
 * FilePath: \demo\index5.ts
 * Created Date: Saturday, September 22nd 2018, 1:28:42 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, December 24th 2018, 11:56:04 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Scene, Shader, ShaderMaterial, PointLight, DirectionalLight, Light, StandardMaterial, Application, BasicMaterial, Entity, Texture, Config } from '../src';

import { loadImage } from './utils/util';
import { Mat4, Vec3 } from '../src/math';
import { Camera } from '../src/scene/camera';
import { Mesh } from '../src/mesh/mesh';
import { Color } from '../src/core/color';


function addLight(app, v) {
    let light = new DirectionalLight();
    light.setPosition(v);
    light.direction = new Vec3(1, -1, 1);
    // light.color = new Color(0.5, 1, 0.5);
    app.scene.root.addChild(light);
    let mesh = Mesh.createBox();
    let entity = new Entity();
    entity.mesh = mesh;
    let m3 = new BasicMaterial();
    m3.color = new Color(0.5, 1, 0.5);
    m3.update();
    entity.mesh.material = m3;
    entity.setLocalScale(0.2, 0.2, 0.2);
    entity.setPosition(light.getPosition());
    return light;
    // app.scene.root.addChild(entity);
}
let vert = `
attribute vec3 aPosition;
attribute vec2 aUv0;

uniform mat4 uModelMatrix;
uniform mat4 uViewProjectionMatrix;
uniform float uTime;

varying vec2 vUv0;

void main(void)
{
    vec4 pos = uModelMatrix * vec4(aPosition, 1.0);
    pos.x += sin(uTime + pos.y * 4.0) * 0.1;
    vUv0 = aUv0;
    gl_Position = uViewProjectionMatrix * pos;
}`;

let frag = `
precision highp float;

uniform sampler2D uDiffuseMap;

varying vec2 vUv0;

void main(void)
{
    gl_FragColor = texture2D(uDiffuseMap, vUv0);
}`;


let main = async () => {
    let texture = new Texture();
    let img = await loadImage('assets/images/IMG_0485.JPG');
    texture.setSource(img);

    const app = new Application(document.getElementById('canvas') as HTMLCanvasElement, {
        // webgl1:true
    });

    // let light = new DirectionalLight();
    // app.scene.lights.directionalLights.push(light);
    let light = addLight(app, new Vec3(-8, 8, -8));

    let m2 = new StandardMaterial();
    m2.diffuseMap = texture;
    m2.update();

    let shader = new Shader(app.renderer, {
        attributes: {
            aPosition: Config.SEMANTIC.POSITION,
            aUv0: Config.SEMANTIC.TEXCOORD0
        },
        vshader: vert,
        fshader: frag
    });
    let time = 0;
    let sm = new ShaderMaterial();
    sm.shader = shader;
    sm.setUniform('uTime', time);
    sm.setUniform('uDiffuseMap', texture);


    let mesh = Mesh.createBox();
    let entity = new Entity();
    entity.mesh = mesh;
    mesh.material = sm;
    entity.name = '123';
    app.scene.root.addChild(entity);


    let mesh2 = Mesh.createBox();
    let entity2 = new Entity();
    entity2.setLocalScale(2, 2, 2);
    mesh2.material = m2;
    entity2.mesh = mesh2;
    entity2.setPosition(2, 0, 0);
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
        entity.setLocalScale(10, 1, 10);
        entity.mesh = mesh;
        mesh.material = m;
        app.scene.root.addChild(entity);
    })();

    let camera = new Camera();
    camera.setPerspective(45, app.canvas.width / app.canvas.height, 1, 1000);
    camera.setPosition(0, 5, 10);
    camera.lookAt(entity);

    app.scene.cameras.push(camera);

    app.start();

    app.on('update', dt => {
        time += dt / 10;
        sm.setUniform('uTime', time);
        entity.rotate(0, 1, 0);
    });

};


main();