/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\demo\index.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Friday, July 13th 2018, 8:44:13 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, July 15th 2018, 1:40:22 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */


import * as HGL from '../src/index';
import { VertexBuffer, VertexFormat, Application } from '../src/index';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const app = new Application(canvas);
const device = app.device;

const format = new VertexFormat(device, [{
    semantic: HGL.SEMANTIC.POSITION,
    length: 3,
    dataType: HGL.DataType.FLOAT32,
    normalize: true
}, {
    semantic: HGL.SEMANTIC.COLOR,
    length: 3,
    dataType: HGL.DataType.FLOAT32,
    normalize: true
}])

const vertices = new Float32Array([
    0, 0.5, -0.4, 0.4, 1, 0.4,
    -0.5, -0.5, -0.4, 0.4, 1, 0.4,
    0.5, -0.5, -0.4, 1, 0.4, 0.4,

    0.5, 0.4, -0.2, 1, 0.4, 0.4,
    -0.5, 0.4, -0.2, 1, 1, 0.4,
    0, -0.6, -0.2, 1, 1, 0.4,

    0, 0.5, 0, 0.4, 0.4, 1,
    -0.5, -0.5, 0, 0.4, 0.4, 1,
    0.5, -0.5, 0, 1, 0.4, 0.4
]);

const buffer = new VertexBuffer(device, format, 9, HGL.BUFFER_STATIC, vertices.buffer);