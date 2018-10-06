/*
 * ProjectName: hypergl
 * FilePath: \src\lights\spotLight.ts
 * Created Date: Friday, October 5th 2018, 10:06:44 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, October 5th 2018, 10:14:45 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { Light } from './light';
import { Vec3 } from '../math';
class SpotLight extends Light {
    range = 10;

    private _direction = new Vec3(-0.5, -0.70, 0.5);
    get direction() {
        // this.getWorldTransform().getY(this._direction);
        return this._direction;
    }
    set direction(x) {
        this._direction = x;
    }
}