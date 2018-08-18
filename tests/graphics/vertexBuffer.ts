/*
 * ProjectName: hypergl
 * FilePath: \tests\graphics\vertexBuffer.ts
 * Created Date: Saturday, August 18th 2018, 8:22:13 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 8:51:42 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { buffer } from '../app';

test('VertexBuffer.buffer tobe ArrayBuffer', () => {
    expect(buffer.buffer.constructor).toBe(ArrayBuffer);
});

