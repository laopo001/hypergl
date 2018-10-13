/*
 * ProjectName: hypergl
 * FilePath: \src\lights\spotLight.ts
 * Created Date: Friday, October 5th 2018, 10:06:44 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, October 14th 2018, 12:50:51 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { Light } from './light';
import { Vec3 } from '../math';
import { Color } from '../core';
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
    private _direction = new Vec3(0, -1, 0);
}