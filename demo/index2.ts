/*
 * ProjectName: hypergl
 * FilePath: \demo\index2.ts
 * Created Date: Saturday, September 1st 2018, 2:26:10 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, September 3rd 2018, 1:05:34 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */



import { SEMANTIC, BUFFER, VertexBuffer, IndexBuffer, VertexFormat, Application, BasicMaterial, Entity } from '../src';
import vert from '../src/graphics/shaders/vertex.vert';
import frag from '../src/graphics/shaders/fragment.frag';
import { initShaders } from './utils/util';
import { Mat4, Vec3 } from '../src/math';
import { Camera } from '../src/scene/camera';
import { Mesh } from '../src/mesh/mesh';
import { Color } from '../src/core/color';



const app = new Application(document.getElementById('canvas') as HTMLCanvasElement, {
    // webgl1:true
});


let mesh = Mesh.createBox(app.rendererPlatform);
let m = new BasicMaterial();
m.color = new Color(0.5, 1, 0.5);

m.update();
let entity = new Entity();
entity.mesh = mesh;
mesh.material = m;

app.scene.root.addChild(entity);

let mesh2 = Mesh.createBox(app.rendererPlatform);
let entity2 = new Entity();
entity2.mesh = mesh2;

entity2.setLocalScale(1.5, 0.5, 1.5);
// entity2.rotate(0, 10, 0);
entity2.setPosition(2, 0, 0);
app.scene.root.addChild(entity2);

let camera = new Camera(45, app.canvas.width / app.canvas.height, 1, 1000);

camera.worldMatrixInverse = new Mat4().setLookAt(new Vec3(3, 3, 3), new Vec3(0, 0, 0), new Vec3(0, 1, 0)).invert();

app.scene.cameras.push(camera);

app.start();

app.on('update', _ => {
    entity.rotate(0, 1, 0);
});
