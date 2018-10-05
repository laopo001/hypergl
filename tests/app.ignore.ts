/*
 * ProjectName: hypergl
 * FilePath: \tests\app.ts
 * Created Date: Saturday, August 18th 2018, 8:50:28 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, October 5th 2018, 12:57:15 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { SEMANTIC, BUFFER } from '../src/conf';
import { VertexFormat } from '../src/graphics/vertexFormat';
import { VertexBuffer } from '../src/graphics/vertexBuffer';

export const format = new VertexFormat([{
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


// tslint:disable-next-line:no-object-literal-type-assertion
export const buffer = new VertexBuffer(({} as any), format, vertices.length, BUFFER.STATIC);


