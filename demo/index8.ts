/*
 * ProjectName: hypergl
 * FilePath: \demo\index8.ts
 * Created Date: Friday, November 9th 2018, 8:38:03 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, November 9th 2018, 8:55:57 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { SceneNode } from '../src';
let node1 = new SceneNode();
let node2 = new SceneNode();

// node1.setLocalScale(new Vec3(0.01, 0.01, 0.01));
node1.setPosition(100, 100, 100);
node1.addChild(node2);

console.log(node2.getPosition());