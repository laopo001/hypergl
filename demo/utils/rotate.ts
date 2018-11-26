/*
 * ProjectName: hypergl
 * FilePath: \demo\utils\rotate.ts
 * Created Date: Thursday, November 22nd 2018, 1:04:41 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, November 26th 2018, 8:16:14 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { math, Script } from '../../src';

export interface RotateInputs {
    speed: number;
}
export class Rotate extends Script<RotateInputs> {
    static defaultInputs = {
        speed: 1
    };

    ex!: number;
    ey!: number;
    ez!: number;
    initialize() {
        let eulers = this.entity.getLocalEulerAngles();
        this.ex = eulers.x;
        this.ey = eulers.y;
        this.ez = eulers.z;

    }
    update(dt) {
        // debugger;
        this.ey += dt * this.inputs.speed * 0.1 % 360;
        this.entity.setLocalEulerAngles(this.ex, this.ey, this.ez);

    }
}