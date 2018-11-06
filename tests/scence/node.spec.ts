/*
 * ProjectName: hypergl
 * FilePath: \tests\scence\node.ts
 * Created Date: Thursday, August 23rd 2018, 10:04:03 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, November 6th 2018, 10:44:38 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { SceneNode } from '../../src/scene/node';
import { Vec3, Quat, Vec4 } from '../../src/math';
import { Camera } from '../../src/scene/camera';



test('SceneNode setPosition getPosition', () => {
    let node = new SceneNode();
    expect(node.getPosition()).toEqual(new Vec3(0, 0, 0));
    node.setPosition(new Vec3(1, 2, 3));
    expect(node.getPosition()).toEqual(new Vec3(1, 2, 3));
});



test('SceneNode setLocalPosition getLocalPosition', () => {
    let node = new SceneNode();
    let child = new SceneNode();
    let grandson = new SceneNode();
    node.scene = { layer: [], add: _ => { } } as any;
    node.addChild(child);
    child.addChild(grandson);
    child.setLocalPosition(new Vec3(1, 0, 0));
    grandson.setLocalPosition(new Vec3(1, 0, 0));
    node.setEulerAngles(new Vec3(0, 0, 90));
    expect(child.getPosition().data.map(x => Math.floor(x))).toEqual(new Vec3(0, 1, 0).data);
    expect(grandson.getPosition().data.map(x => Math.floor(x))).toEqual(new Vec3(0, 2, 0).data);
});

test('SceneNode setPosition getPosition', () => {
    let node = new SceneNode();
    let child = new SceneNode();
    let grandson = new SceneNode();
    // tslint:disable-next-line:no-empty
    node.scene = { layer: [], add: _ => { } } as any;
    node.addChild(child);
    child.addChild(grandson);
    child.setPosition(new Vec3(1, 0, 0));
    grandson.setPosition(new Vec3(1, 0, 0));
    node.setEulerAngles(new Vec3(0, 0, 90));
    expect(child.getPosition().data.map(x => Math.floor(x))).toEqual(new Vec3(0, 1, 0).data);
    expect(grandson.getPosition().data.map(x => Math.floor(x))).toEqual(new Vec3(0, 1, 0).data);
});

test('SceneNode setPosition setPosition2', () => {
    let node1 = new SceneNode();
    let node2 = new SceneNode();
    node1.setPosition(new Vec3(1, 2, 3));
    node2.setPosition(1, 2, 3);
    expect(node1.getPosition()).toEqual(node2.getPosition());
});

test('SceneNode setLocalEulerAngles setLocalEulerAngles2', () => {
    let node1 = new SceneNode();
    let node2 = new SceneNode();
    node1.setLocalEulerAngles(new Vec3(1, 2, 3));
    node2.setLocalEulerAngles(1, 2, 3);
    expect(node1.getLocalEulerAngles()).toEqual(node2.getLocalEulerAngles());
});

test('SceneNode setEulerAngles setEulerAngles2', () => {
    let node1 = new SceneNode();
    let node2 = new SceneNode();
    node1.setEulerAngles(new Vec3(1, 2, 3));
    node2.setEulerAngles(1, 2, 3);
    expect(node1.getEulerAngles()).toEqual(node2.getEulerAngles());
});

test('SceneNode setLocalPosition setLocalPosition2', () => {
    let node1 = new SceneNode();
    let node2 = new SceneNode();
    node1.setLocalPosition(new Vec3(1, 2, 3));
    node2.setLocalPosition(1, 2, 3);
    expect(node1.getLocalPosition()).toEqual(node2.getLocalPosition());
});

test('SceneNode setRotation setRotation2', () => {
    let node1 = new SceneNode();
    let node2 = new SceneNode();
    node1.setRotation(new Quat(1, 2, 3, 4));
    node2.setRotation(1, 2, 3, 4);
    expect(node1.getRotation()).toEqual(node2.getRotation());
});


test('SceneNode setLocalScale', () => {
    let node1 = new SceneNode();
    let node2 = new SceneNode();

    node1.setLocalScale(new Vec3(0.01, 0.01, 0.01));
    node1.setPosition(100, 100, 100);

    node1.addChild(node2);
    expect(node2.getPosition().data).toEqual(new Vec3(100, 100, 100).data);

});

