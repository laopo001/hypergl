/*
 * ProjectName: hypergl
 * FilePath: \demo\utils\first_person_camera.ts
 * Created Date: Wednesday, October 10th 2018, 9:24:36 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, February 17th 2019, 3:48:57 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { math, Script } from '../../src';
import { AppPlugin } from '../types';

export interface FirstPersonCameraInputs {
    speed: number;
}
export class FirstPersonCamera extends Script<FirstPersonCameraInputs, AppPlugin> {
    static defaultInputs = {
        speed: 1
    };
    ex!: number;
    ey!: number;
    ez!: number;
    forwards = false;
    backwards = false;
    left = false;
    right = false;
    top = false;
    bottom = false;
    initialize() {
        let eulers = this.entity.getLocalEulerAngles();
        this.ex = eulers.x;
        this.ey = eulers.y;
        this.ez = eulers.z;
        // tslint:disable-next-line:one-variable-per-declaration
        let x = 0, y = 0;
        // tslint:disable-next-line:no-non-null-assertion
        document.getElementById('canvas')!.addEventListener('mousemove', (event) => {
            if (!this.entity.scene.isActive) { return; }
            if (this.app.plugins.pointer.isPointerLocked) {
                this.ex -= event.movementY / 5;
                this.ex = math.clamp(this.ex, -90, 90);
                this.ey -= event.movementX / 5;
            }
        }, false);
        // tslint:disable-next-line:no-non-null-assertion
        document.getElementById('canvas')!.addEventListener('mousedown', (event) => {
            if (!this.entity.scene.isActive) { return; }
            if (!this.app.plugins.pointer.isPointerLocked) {
                this.app.plugins.pointer.lock();
            }
        }, false);
        document.addEventListener('keydown', (event) => {
            if (!this.entity.scene.isActive) { return; }
            if (event.key === 'w') {
                this.forwards = true;
            }
            if (event.key === 's') {
                this.backwards = true;
            }
            if (event.key === 'a') {
                this.left = true;
            }
            if (event.key === 'd') {
                this.right = true;
            }
            if (event.key === 'q') {
                this.bottom = true;
            }
            if (event.key === 'e') {
                this.top = true;
            }
        }, false);
        document.addEventListener('keyup', (event) => {
            if (!this.entity.scene.isActive) { return; }
            if (event.key === 'w') {
                this.forwards = false;
            }
            if (event.key === 's') {
                this.backwards = false;
            }
            if (event.key === 'a') {
                this.left = false;
            }
            if (event.key === 'd') {
                this.right = false;
            }
            if (event.key === 'q') {
                this.bottom = false;
            }
            if (event.key === 'e') {
                this.top = false;
            }
        }, false);
    }
    update(dt) {
        // console.log(dt);

        this.entity.setLocalEulerAngles(this.ex, this.ey, this.ez);

        if (this.forwards) {
            this.entity.translateLocal(0, 0, -this.inputs.speed * dt);
        } else if (this.backwards) {
            this.entity.translateLocal(0, 0, this.inputs.speed * dt);
        }

        if (this.left) {
            this.entity.translateLocal(-this.inputs.speed * dt, 0, 0);
        } else if (this.right) {
            this.entity.translateLocal(this.inputs.speed * dt, 0, 0);
        }

        if (this.bottom) {
            this.entity.translateLocal(0, -this.inputs.speed * dt, 0);
        } else if (this.top) {
            this.entity.translateLocal(0, this.inputs.speed * dt, 0);
        }
    }
}