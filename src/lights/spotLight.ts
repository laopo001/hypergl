/*
 * ProjectName: hypergl
 * FilePath: \src\lights\spotLight.ts
 * Created Date: Friday, October 5th 2018, 10:06:44 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, November 28th 2018, 8:27:46 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { Light } from './light';
import { Vec3 } from '../math';
import { Color } from '../core';
import { SceneNode, Camera } from '../scene';
export class SpotLight extends Light {
    get direction() {
        // this.getWorldTransform().getY(this._direction);
        return this._direction;
    }
    set direction(x) {
        this._direction = x;
    }
    range = 20;
    innerConeAngle = 70;
    outerConeAngle = 75;
    shadowMapWidth = 512;
    shadowMapHeight = 512;
    camera: Camera;
    private _direction = new Vec3(0, -1, 0);
    constructor(node: SceneNode) {
        super(node);
        let camera = new Camera(node);
        camera.setPerspective(this.outerConeAngle * 2, 1, 0.5, this.range);
        // camera.lookAt(light.direction, getUp(light.direction));
        // camera.setPosition(light.getPosition());
        this.camera = camera;
    }
}