/*
 * ProjectName: hypergl
 * FilePath: \demo\index.ts
 * Created Date: Saturday, August 18th 2018, 5:59:50 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, August 19th 2018, 1:36:25 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


// tslint:disable
import { SEMANTIC, BUFFER, VertexBuffer, IndexBuffer, VertexFormat, Application } from '../src/index';
import vert from '../src/graphics/shaders/vertex.vert';
import frag from '../src/graphics/shaders/fragment.frag';
import { initShaders } from './utils/util'
import { Mat4, Vec3 } from '../src/math';

const app = new Application(document.getElementById('canvas') as HTMLCanvasElement);


const format = new VertexFormat([{
    semantic: SEMANTIC.POSITION,
    size: 3,
    dataType: Float32Array,
    normalize: true
}, {
    semantic: SEMANTIC.COLOR,
    size: 3,
    dataType: Float32Array,
    normalize: true
}]);

const vertices = [
    1.0, 1.0, 1.0, 1.0, 1.0, 1.0,  // v0 White
    -1.0, 1.0, 1.0, 1.0, 0.0, 1.0,  // v1 Magenta
    -1.0, -1.0, 1.0, 1.0, 0.0, 0.0,  // v2 Red
    1.0, -1.0, 1.0, 1.0, 1.0, 0.0,  // v3 Yellow
    1.0, -1.0, -1.0, 0.0, 1.0, 0.0,  // v4 Green
    1.0, 1.0, -1.0, 0.0, 1.0, 1.0,  // v5 Cyan
    -1.0, 1.0, -1.0, 0.0, 0.0, 1.0,  // v6 Blue
    -1.0, -1.0, -1.0, 0.0, 0.0, 0.0   // v7 Black
];
let indices = [
    0, 1, 2, 0, 2, 3,    // front
    0, 3, 4, 0, 4, 5,    // right
    0, 5, 6, 0, 6, 1,    // up
    1, 6, 7, 1, 7, 2,    // left
    7, 4, 3, 7, 3, 2,    // down
    4, 7, 6, 4, 6, 5     // back
];

const vbuffer = new VertexBuffer(app.rendererPlatform, format, BUFFER.STATIC, vertices);
console.log(new Float32Array(vbuffer.buffer))
vbuffer.bind();
const ibuffer = new IndexBuffer(app.rendererPlatform, Uint8Array, BUFFER.STATIC, indices);
ibuffer.bind();

let viewMatrix = new Mat4().setLookAt(new Vec3(3, 3, 3), new Vec3(0, 0, 0), new Vec3(0, 1, 0)).invert();
let projMatrix = new Mat4();
projMatrix.setPerspective(45, app.canvas.width / app.canvas.height, 1, 1000);
let modelMatrix = new Mat4();
// modelMatrix.setTranslate(0, 0, 1);
// modelMatrix.setFromEulerAngles(45, 45, 45);
let mvpMatrix = new Mat4().mul(projMatrix).mul(viewMatrix).mul(modelMatrix);

let gl = app.rendererPlatform.gl;

let program = initShaders(gl as any, vert, frag);

let FSIZE = Float32Array.BYTES_PER_ELEMENT;

const a_Position = gl.getAttribLocation(program, 'a_Position');
gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 6 * FSIZE, 0);
gl.enableVertexAttribArray(a_Position);
const a_Color = gl.getAttribLocation(program, 'a_Color');
gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 6 * FSIZE, 3 * FSIZE)
gl.enableVertexAttribArray(a_Color);

const u_MvpjMatrix = gl.getUniformLocation(program, 'u_MvpjMatrix');
gl.uniformMatrix4fv(u_MvpjMatrix, false, mvpMatrix.data);
// 深度测试
gl.enable(gl.DEPTH_TEST);
gl.clear(gl.DEPTH_BUFFER_BIT);
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawElements(gl.TRIANGLES, ibuffer.length, gl.UNSIGNED_BYTE, 0);

console.log(format, vbuffer, ibuffer);