/*
 * ProjectName: hypergl
 * FilePath: \tests\scence\node.ts
 * Created Date: Thursday, August 23rd 2018, 10:04:03 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, August 29th 2018, 1:20:40 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { INode } from '../../src/scene/node';
import { Vec3 } from '../../src/math';



test('INode setPosition getPosition', () => {
    let node = new INode();
    expect(node.getPosition()).toEqual(new Vec3(0, 0, 0));
    node.setPosition(new Vec3(1, 2, 3));
    expect(node.getPosition()).toEqual(new Vec3(1, 2, 3));
});



test('INode setLocalPosition getLocalPosition', () => {
    let node = new INode();
    let child = new INode();
    let grandson = new INode();
    node.scene = { layer: [] } as any;
    node.addChild(child);
    child.addChild(grandson);
    child.setLocalPosition(new Vec3(1, 0, 0));
    grandson.setLocalPosition(new Vec3(1, 0, 0));
    node.setEulerAngles(new Vec3(0, 0, 90));
    expect(child.getPosition().data.map(x => Math.floor(x))).toEqual(new Vec3(0, 1, 0).data);
    expect(grandson.getPosition().data.map(x => Math.floor(x))).toEqual(new Vec3(0, 2, 0).data);
});

test('INode setPosition getPosition', () => {
    let node = new INode();
    let child = new INode();
    let grandson = new INode();
    node.scene = { layer: [] } as any;
    node.addChild(child);
    child.addChild(grandson);
    child.setPosition(new Vec3(1, 0, 0));
    grandson.setPosition(new Vec3(1, 0, 0));
    node.setEulerAngles(new Vec3(0, 0, 90));
    expect(child.getPosition().data.map(x => Math.floor(x))).toEqual(new Vec3(0, 1, 0).data);
    expect(grandson.getPosition().data.map(x => Math.floor(x))).toEqual(new Vec3(0, 1, 0).data);
});