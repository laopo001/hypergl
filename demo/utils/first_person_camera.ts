/*
 * ProjectName: hypergl
 * FilePath: \demo\utils\first_person_camera.ts
 * Created Date: Wednesday, October 10th 2018, 9:24:36 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, October 10th 2018, 10:26:54 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { Entity, math } from '../../src';
export abstract class Script<Inputs> {
    entity!: Entity;
    constructor(public props: Inputs) {
    }
    abstract initialize();
    abstract update(dt: number);
}
interface FirstPersonCameraInputs {
    speed: number;
}
export class FirstPersonCamera extends Script<FirstPersonCameraInputs> {
    static defaultInputs = {
        speed: 0.1
    };
    ex!: number;
    ey!: number;
    forwards = false;
    backwards = false;
    left = false;
    right = false;
    initialize() {
        let eulers = this.entity.getLocalEulerAngles();
        this.ex = eulers.x;
        this.ey = eulers.y;
        // tslint:disable-next-line:one-variable-per-declaration
        let x = 0, y = 0;
        // tslint:disable-next-line:no-non-null-assertion
        document.getElementById('canvas')!.addEventListener('mousemove', (event) => {
            this.ex -= event.movementY / 5;
            this.ex = math.clamp(this.ex, -90, 90);
            this.ey -= event.movementX / 5;
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
        this.entity.setLocalEulerAngles(this.ex, this.ey, 0);
        if (this.forwards) {
            this.entity.translateLocal(0, 0, -this.props.speed * dt);
        } else if (this.backwards) {
            this.entity.translateLocal(0, 0, this.props.speed * dt);
        }

        if (this.left) {
            this.entity.translateLocal(-this.props.speed * dt, 0, 0);
        } else if (this.right) {
            this.entity.translateLocal(this.props.speed * dt, 0, 0);
        }
    }
}