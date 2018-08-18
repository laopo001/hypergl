/*
 * ProjectName: hypergl
 * FilePath: \tests\graphics\index.ts
 * Created Date: Saturday, August 18th 2018, 8:09:46 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 8:53:20 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { format } from '../app';

test('VertexFormat.sum_size', () => {
    expect(format.sum_size).toBe(6);
});

