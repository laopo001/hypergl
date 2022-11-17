/*
 * ProjectName: hypergl
 * FilePath: \tests\graphics\vertexBuffer.ts
 * Created Date: Saturday, August 18th 2018, 8:22:13 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, September 6th 2018, 6:03:02 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { buffer } from '../app.ignore';

test('VertexBuffer.buffer tobe ArrayBuffer', () => {
    expect(buffer.buffer.constructor).toBe(ArrayBuffer);
});

