/*
 * ProjectName: hypergl
 * FilePath: \src\lights\directionalLight.ts
 * Created Date: Saturday, September 8th 2018, 3:43:21 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, September 8th 2018, 11:24:45 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Light } from './light';
import { Vec3 } from '../math';
export class DirectionalLight extends Light {
    private _direction = new Vec3(-0.5, -0.7071067690849304, 0.5);
    get direction() {
        // this.getWorldTransform().getY(this._direction);
        return this._direction;
    }
}