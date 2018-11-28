/*
 * ProjectName: hypergl
 * FilePath: \src\lights\directionalLight.ts
 * Created Date: Saturday, September 8th 2018, 3:43:21 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, November 28th 2018, 8:46:08 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Light } from './light';
import { Vec3 } from '../math';
import { Color } from '../core';
import { Camera, SceneNode } from '../scene';
export class DirectionalLight extends Light {
    get direction() {
        // this.getWorldTransform().getY(this._direction);
        return this._direction;
    }
    set direction(x) {
        this._direction = x;
    }
    camera: Camera;
    private _direction = new Vec3(-0.5, -0.70, 0.5);
    constructor(node: SceneNode) {
        super(node);
        let camera = new Camera(node);
        let height = 40;
        let width = 1 * height;
        let length = 1 * height;
        camera.setOrtho(-width, width, -height, height, -length, length);
        // node.lookAt(this.direction, node.up);
        this.camera = camera;
    }
}