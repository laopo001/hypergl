/*
 * ProjectName: hypergl
 * FilePath: \src\lights\directionalLight.ts
 * Created Date: Saturday, September 8th 2018, 3:43:21 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, September 17th 2018, 5:35:56 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Light } from './light';
import { Vec3 } from '../math';
export class DirectionalLight extends Light {
    private _direction = new Vec3(-0.5, -0.70, 0.5);
    get direction() {
        // this.getWorldTransform().getY(this._direction);
        return this._direction;
    }
    set direction(x) {
        this._direction = x;
    }
}