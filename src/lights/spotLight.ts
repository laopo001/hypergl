/*
 * ProjectName: hypergl
 * FilePath: \src\lights\spotLight.ts
 * Created Date: Friday, October 5th 2018, 10:06:44 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, October 9th 2018, 11:24:14 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { Light } from './light';
import { Vec3 } from '../math';
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
    outerConeAngle = 70;
    private _direction = new Vec3(0, -1, 0);
}