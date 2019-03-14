/**
 * File: /Users/ldh/Projects/tank-game/src/scripts/blood_strip.ts
 * Project: /Users/ldh/Projects/tank-game
 * Created Date: Thursday, February 28th 2019, 11:02:00 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, March 3rd 2019, 9:40:15 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2019 liaodh
 */


import { Entity, Script, StandardMaterial, Color } from 'hypergl';
import { AppPlugin } from '../types';

const red = new StandardMaterial();
red.diffuseColor = new Color(1, 0, 0);
const m = new StandardMaterial();
m.diffuseColor = new Color(1, 1, 0);
export interface BloodStripInputs {
    value: number;
    camera: Entity;
}
export class BloodStrip extends Script<BloodStripInputs, AppPlugin> {
    static defaultInputs = {
        value: 100
    };
    plane?: Entity;
    plane2?: Entity;
    container?: Entity;
    initialize() {
        let container = new Entity();
        let plane = new Entity()
            .addComponent('model', {
                type: 'plane',
                material: red,
            })
            .setLocalScale(2, 1, 0.3)
            .setLocalEulerAngles(270, 0, 0);
        let plane2 = new Entity()
            .addComponent('model', {
                type: 'plane',
                material: m,
            })
            .setLocalScale(0.9, 1, 0.9)
            .setLocalPosition(0, 0.01, 0);
        plane.addChild(plane2);
        plane.setLocalPosition(0, 2, 0);
        container.addChild(plane);
        this.entity.addChild(container);
        this.plane = plane;
        this.plane2 = plane2;
        this.container = container;
        this.entity.collision.on('collisionstart', (e) => {
            if (this.inputs.value < 10) {
                return;
            }
            this.inputs.value -= 10;
        });
    }
    update(dt) {
        this.container!.lookAt(this.inputs.camera.getPosition(), this.inputs.camera.up);
        let plane2 = this.plane2!;
        // let scale = plane2.getLocalScale();
        // let position = plane2.getLocalPosition();
        let scale = 0.9 * this.inputs.value / 100;
        if (scale === 0) {
            scale = 0.00001;
            // this.entity.enabled = false;
        }
        plane2.setLocalScale(scale, 1, 0.9);
        plane2.setLocalPosition(1 * (1 - this.inputs.value / 100) / 2, 0.01, 0);

    }
    // tslint:disable-next-line:no-empty
    destroy() { }
}