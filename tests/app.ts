/*
 * ProjectName: hypergl
 * FilePath: \tests\app.ts
 * Created Date: Saturday, August 18th 2018, 8:50:28 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 9:01:48 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { SEMANTIC, BUFFER, VertexBuffer, VertexFormat, Application } from '../src/index';
import { RendererPlatform } from '../src/graphics/renderer';



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
export const buffer = new VertexBuffer(({} as RendererPlatform), format, BUFFER.STATIC, vertices);

test('None', () => {
    expect(1 + 2).toBe(3);
});
