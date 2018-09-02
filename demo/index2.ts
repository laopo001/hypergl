/*
 * ProjectName: hypergl
 * FilePath: \demo\index2.ts
 * Created Date: Saturday, September 1st 2018, 2:26:10 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, September 3rd 2018, 12:05:13 am
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


const vertices = [
    1, 1, 1,  // v0 White
    -1, 1, 1,  // v1 Magenta
    -1, -1, 1,  // v2 Red
    1, -1, 1,  // v3 Yellow
    1, -1, -1,  // v4 Green
    1, 1, -1,  // v5 Cyan
    -1, 1, -1,  // v6 Blue
    -1, -1, -1   // v7 Black
];
const colors = [
    1, 1, 1, 1,  // v0 White
    1, 0, 1, 1,  // v1 Magenta
    1, 0, 0, 1,  // v2 Red
    1, 1, 0, 1,  // v3 Yellow
    0, 1, 0, 1,  // v4 Green
    0, 1, 1, 1,  // v5 Cyan
    0, 0, 1, 1,  // v6 Blue
    0, 0, 0, 1  // v7 Black
];
let indices = [
    0, 1, 2, 0, 2, 3,    // front
    0, 3, 4, 0, 4, 5,    // right
    0, 5, 6, 0, 6, 1,    // up
    1, 6, 7, 1, 7, 2,    // left
    7, 4, 3, 7, 3, 2,    // down
    4, 7, 6, 4, 6, 5     // back
];



let mesh = Mesh.createMesh(app.rendererPlatform, {
    positions: vertices,
    colors,
    indices
});
let m = new BasicMaterial();
m.color = new Color(0.5, 1, 0.5);
m.update();
let entity = new Entity();
entity.mesh = mesh;
mesh.material = m;

app.scene.root.addChild(entity);

let mesh2 = Mesh.createMesh(app.rendererPlatform, {
    positions: vertices,
    colors,
    indices
});
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
