/*
 * ProjectName: hypergl
 * FilePath: \tests\graphics\index.ts
 * Created Date: Saturday, August 18th 2018, 8:09:46 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, August 22nd 2018, 10:18:35 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { format } from '../app.ignore';

test('VertexFormat.sum_size', () => {
    expect(format.sum_size).toBe(6);
});

