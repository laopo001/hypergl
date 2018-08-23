/*
 * ProjectName: hypergl
 * FilePath: \tests\scence\node.ts
 * Created Date: Thursday, August 23rd 2018, 10:04:03 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, August 23rd 2018, 10:19:17 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { INode } from '../../src/scene/node';
import { Vec3 } from '../../src/math';

let node = new INode();


test('None', () => {
    expect(node.getPosition()).toEqual(new Vec3(0, 0, 0));
    node.setPosition(1, 2, 3);
    expect(node.getPosition()).toEqual(new Vec3(1, 2, 3));
});