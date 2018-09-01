/*
 * ProjectName: hypergl
 * FilePath: \tests\scence\node.ts
 * Created Date: Thursday, August 23rd 2018, 10:04:03 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, September 2nd 2018, 1:05:35 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { INode } from '../../src/scene/node';
import { Vec3, Quat } from '../../src/math';



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

test('INode setPosition setPosition2', () => {
    let node1 = new INode();
    let node2 = new INode();
    node1.setPosition(new Vec3(1, 2, 3));
    node2.setPosition(1, 2, 3);
    expect(node1.getPosition()).toEqual(node2.getPosition());
});

test('INode setLocalEulerAngles setLocalEulerAngles2', () => {
    let node1 = new INode();
    let node2 = new INode();
    node1.setLocalEulerAngles(new Vec3(1, 2, 3));
    node2.setLocalEulerAngles(1, 2, 3);
    expect(node1.getLocalEulerAngles()).toEqual(node2.getLocalEulerAngles());
});

test('INode setEulerAngles setEulerAngles2', () => {
    let node1 = new INode();
    let node2 = new INode();
    node1.setEulerAngles(new Vec3(1, 2, 3));
    node2.setEulerAngles(1, 2, 3);
    expect(node1.getEulerAngles()).toEqual(node2.getEulerAngles());
});

test('INode setLocalPosition setLocalPosition2', () => {
    let node1 = new INode();
    let node2 = new INode();
    node1.setLocalPosition(new Vec3(1, 2, 3));
    node2.setLocalPosition(1, 2, 3);
    expect(node1.getLocalPosition()).toEqual(node2.getLocalPosition());
});

test('INode setRotation setRotation2', () => {
    let node1 = new INode();
    let node2 = new INode();
    node1.setRotation(new Quat(1, 2, 3, 4));
    node2.setRotation(1, 2, 3, 4);
    expect(node1.getRotation()).toEqual(node2.getRotation());
});

