/*
 * ProjectName: hypergl
 * FilePath: \tests\graphics\vertexBuffer.ts
 * Created Date: Saturday, August 18th 2018, 8:22:13 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 8:24:24 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { VertexFormat } from '../../src/graphics/vertexFormat';
import { SEMANTIC, BUFFER } from '../../src/conf';
import { VertexBuffer } from '../../src/graphics/vertexBuffer';

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

const buffer = new VertexBuffer(format, BUFFER.STATIC, vertices);



test('VertexBuffer.buffer tobe ArrayBuffer', () => {
    expect(buffer.buffer.constructor).toBe(ArrayBuffer);
});

