/*
 * ProjectName: hypergl
 * FilePath: \demo\index.ts
 * Created Date: Saturday, August 18th 2018, 5:59:50 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, August 29th 2018, 12:58:46 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */



import { SEMANTIC, BUFFER, VertexBuffer, IndexBuffer, VertexFormat, Application, BasicMaterial } from '../src';
import vert from '../src/graphics/shaders/vertex.vert';
import frag from '../src/graphics/shaders/fragment.frag';
import { initShaders } from './utils/util';
import { Mat4, Vec3 } from '../src/math';
import { Camera } from '../src/scene/camera';
import { Mesh } from '../src/mesh/mesh';



const app = new Application(document.getElementById('canvas') as HTMLCanvasElement);


// const format = new VertexFormat([{
//     semantic: SEMANTIC.POSITION,
//     size: 3,
//     dataType: Float32Array,
//     normalize: true
// }, {
//     semantic: SEMANTIC.COLOR,
//     size: 3,
//     dataType: Float32Array,
//     normalize: true
// }]);

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

//


let mesh = Mesh.createMesh(app.rendererPlatform, {
    positions: vertices,
    colors,
    indices
});
let vbuffer = mesh.vertexBuffer;
let ibuffer = mesh.indexBuffer;
vbuffer.bind();
ibuffer.bind();


let camera = new Camera(45, app.canvas.width / app.canvas.height, 1, 1000);
// let viewMatrix = new Mat4().setLookAt(new Vec3(3, 3, 3), new Vec3(0, 0, 0), new Vec3(0, 1, 0)).invert();
// let projMatrix = new Mat4();
// projMatrix.setPerspective(45, app.canvas.width / app.canvas.height, 1, 1000);

let modelMatrix = new Mat4();

// modelMatrix.setTranslate(0, 0, 1);
// modelMatrix.setFromEulerAngles(45, 45, 45);
// let mvpMatrix = new Mat4().mul(projMatrix).mul(viewMatrix).mul(modelMatrix);
camera.worldMatrixInverse = new Mat4().setLookAt(new Vec3(3, 3, 3), new Vec3(0, 0, 0), new Vec3(0, 1, 0)).invert();
let mvpMatrix = camera.PVMatrix.mul(modelMatrix);

let gl = app.rendererPlatform.gl;

let program = initShaders(gl as any, vert(), frag());



const a_Position = gl.getAttribLocation(program, 'a_Position');
let length = Float32Array.BYTES_PER_ELEMENT * 3 + Uint8Array.BYTES_PER_ELEMENT * 4;
gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, length, 0);
gl.enableVertexAttribArray(a_Position);
const a_Color = gl.getAttribLocation(program, 'a_Color');

gl.vertexAttribPointer(a_Color, 4, gl.UNSIGNED_BYTE, false, length, 3 * Float32Array.BYTES_PER_ELEMENT);
gl.enableVertexAttribArray(a_Color);


const u_MvpjMatrix = gl.getUniformLocation(program, 'u_MvpjMatrix');
gl.uniformMatrix4fv(u_MvpjMatrix, false, mvpMatrix.data);
// 深度测试
gl.enable(gl.DEPTH_TEST);
gl.clear(gl.DEPTH_BUFFER_BIT);
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawElements(gl.TRIANGLES, ibuffer.length, ibuffer.drawFormat, 0);

console.log(vbuffer.format, vbuffer, ibuffer);

// app.on('update', () => {

// });
