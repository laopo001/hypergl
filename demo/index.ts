/*
 * ProjectName: hypergl
 * FilePath: \demo\index.ts
 * Created Date: Saturday, August 18th 2018, 5:59:50 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 10:31:15 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { SEMANTIC, BUFFER, VertexBuffer, VertexFormat, Application } from '../src/index';
import * as vertex from '../src/graphics/shaders/vertex.vert';

const app = new Application({
    width: 1000,
    height: 600
});


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
    0, 0.5, -0.4, 0.4, 1, 0.4,
    -0.5, -0.5, -0.4, 0.4, 1, 0.4,
    0.5, -0.5, -0.4, 1, 0.4, 0.4,

    0.5, 0.4, -0.2, 1, 0.4, 0.4,
    -0.5, 0.4, -0.2, 1, 1, 0.4,
    0, -0.6, -0.2, 1, 1, 0.4,

    0, 0.5, 0, 0.4, 0.4, 1,
    -0.5, -0.5, 0, 0.4, 0.4, 1,
    0.5, -0.5, 0, 1, 0.4, 0.4
];

const buffer = new VertexBuffer(app.rendererPlatform, format, BUFFER.STATIC, vertices);


console.log(format, buffer);