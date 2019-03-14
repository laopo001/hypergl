/**
 * File: /Users/ldh/Projects/tank-game/src/scripts/player.ts
 * Project: /Users/ldh/Projects/tank-game
 * Created Date: Wednesday, March 13th 2019, 10:52:48 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, March 13th 2019, 11:25:00 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2019 liaodh
 */


import { math, Script } from 'hypergl';
import { AppPlugin } from '../types';

let id = 0;
export interface PlayerScriptInputs {
    speed: number;
}
export class PlayerScript extends Script<PlayerScriptInputs, AppPlugin> {
    static defaultInputs = {
        speed: 1
    };
    ey!: number;
    forwards = false;
    backwards = false;
    left = false;
    right = false;
    initialize() {
        let eulers = this.entity.getLocalEulerAngles();
        this.ey = eulers.y;
        // tslint:disable-next-line:one-variable-per-declaration
        let x = 0, y = 0;

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

        }, false);
    }
    update(dt) {

        if (this.forwards) {
            this.entity.translateLocal(0, 0, this.inputs.speed * dt);
            this.check();
        } else if (this.backwards) {
            this.entity.translateLocal(0, 0, -this.inputs.speed * dt);
            this.check();
        }

        if (this.left) {
            this.entity.setLocalEulerAngles(0, this.ey += 2, 0);
            this.check();
        } else if (this.right) {
            this.entity.setLocalEulerAngles(0, this.ey -= 2, 0);
            this.check();
        }

    }
    check() {
        if (0 === 0) {
            let physics = this.entity.scene.systems.rigidbody!.physics;
            physics.syncEntityToBody(this.entity, this.entity.rigidbody.body);
        }
    }
    // tslint:disable-next-line:no-empty
    destroy() { }
}