/*
 * ProjectName: hypergl
 * FilePath: \src\lights\pointLight.ts
 * Created Date: Saturday, September 8th 2018, 3:44:39 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, December 1st 2018, 3:26:14 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Light } from './light';
import { Color, event } from '../core';
import { Camera, SceneNode } from '../scene';
import { Vec3 } from '../math';
export class PointLight extends Light {
    range = 10;
    shadowMapWidth = 512;
    shadowMapHeight = 512;
    shadowBias = 0.05;
    cameras: Camera[] = [];
    constructor(node: SceneNode) {
        super(node);
        let cameras: Camera[] = [];
        for (let i = 0; i < 6; i++) {
            let v = new Vec3();
            let a = i % 2;
            let up;
            switch (i) {
                case 0: up = new Vec3(0, -1, 0); break;
                case 1: up = new Vec3(0, -1, 0); break;
                case 2: up = new Vec3(0, 0, 1); break;
                case 3: up = new Vec3(0, 0, -1); break;
                case 4: up = new Vec3(0, -1, 0); break;
                case 5: up = new Vec3(0, -1, 0); break;
            }
            let b = Math.floor(i / 2);
            v.data[b] = a === 0 ? 1 : -1;
            let camera = new Camera(new SceneNode());
            const near = 0.1;
            camera.node.lookAt(v, up);
            camera.node.setPosition(node.getPosition());
            camera.setPerspective(90, 1, near, this.range);
            cameras.push(camera);
            event.on('sync', () => {
                camera.node.setPosition(node.getPosition());
            });
        }
        this.cameras = cameras;
    }
}