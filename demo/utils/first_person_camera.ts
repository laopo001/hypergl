/*
 * ProjectName: hypergl
 * FilePath: \demo\utils\first_person_camera.ts
 * Created Date: Wednesday, October 10th 2018, 9:24:36 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, November 19th 2018, 1:47:27 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { math, Script } from '../../src';

export interface FirstPersonCameraInputs {
    speed: number;
}
export class FirstPersonCamera extends Script<FirstPersonCameraInputs> {
    static defaultInputs = {
        speed: 1
    };
    app;
    ex!: number;
    ey!: number;
    ez!: number;
    forwards = false;
    backwards = false;
    left = false;
    right = false;
    initialize() {
        let eulers = this.entity.getLocalEulerAngles();
        this.ex = eulers.x;
        this.ey = eulers.y;
        this.ez = eulers.z;
        // tslint:disable-next-line:one-variable-per-declaration
        let x = 0, y = 0;
        // tslint:disable-next-line:no-non-null-assertion
        document.getElementById('canvas')!.addEventListener('mousemove', (event) => {
            if (this.app.isPointerLocked) {
                this.ex -= event.movementY / 5;
                this.ex = math.clamp(this.ex, -90, 90);
                this.ey -= event.movementX / 5;
            }
        }, false);
        // tslint:disable-next-line:no-non-null-assertion
        document.getElementById('canvas')!.addEventListener('mousedown', (event) => {
            if (!this.app.isPointerLocked) {
                this.app.setRequestPointerLock();
            }
        }, false);
        document.addEventListener('keydown', (event) => {
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
        }, false);
        document.addEventListener('keyup', (event) => {
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
        }, false);
    }
    update(dt) {
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
    }
}