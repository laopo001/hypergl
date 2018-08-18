/*
 * ProjectName: hypergl
 * FilePath: \tests\graphics\index.ts
 * Created Date: Saturday, August 18th 2018, 8:09:46 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 8:23:10 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { VertexFormat } from '../../src/graphics/vertexFormat';
import { SEMANTIC } from '../../src/conf';

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


test('VertexFormat.sum_size', () => {
    expect(format.sum_size).toBe(6);
});

