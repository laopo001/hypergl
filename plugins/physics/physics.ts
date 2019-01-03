/*
 * ProjectName: hypergl
 * FilePath: \plugins\physics\physics.ts
 * Created Date: Monday, December 31st 2018, 9:58:03 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, January 3rd 2019, 7:46:33 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Application, Plugin, Vec3, Quat } from 'hypergl';
// import * as Ammo from './ammo';
import * as CANNON from 'cannon';
export interface CreateShapeOptions {
    'Sphere': { radius: number; };
    'Box': { halfExtents: Vec3 };
    'Cylinder': { radiusTop: number, radiusBottom: number, height: number, numSegments: number };
    // 'Plane': null,
}
// tslint:disable-next-line:one-variable-per-declaration
// declare const Ammo;
export class CannonPhysicsPlugin implements Plugin {
    static pname = 'physics';
    CANNON = CANNON;
    world = new CANNON.World();
    constructor(private app: Application) {
        let fixedTimeStep = 1.0 / 60.0; // seconds
        let maxSubSteps = 3;
        this.world.gravity.set(0, -10, 0);
        this.app.on('update', (dt) => {
            this.world.step(fixedTimeStep, dt / 1000, maxSubSteps);
        });
    }
    addBody(o: {
        position?: Vec3;
        velocity?: Vec3;
        angularVelocity?: Vec3;
        quaternion?: Quat;
        mass?: number;
        // material?: CANNON.Material;
        type?: number;
        linearDamping?: number;
        angularDamping?: number;
        allowSleep?: boolean;
        sleepSpeedLimit?: number;
        sleepTimeLimit?: number;
        collisionFilterGroup?: number;
        collisionFilterMask?: number;
        fixedRotation?: boolean;
        shape?: CANNON.Shape;
    }) {
        let body = new CANNON.Body(this.format(o));
        this.world.addBody(body);
        return body;
    }
    createShape<T extends keyof CreateShapeOptions>(name: T, options: CreateShapeOptions[T]) {
        if (name === 'Box') {
            return new CANNON.Box(this.format(options).halfExtents);
        }
        if (name === 'Sphere') {
            return new CANNON.Sphere(this.format(options).radius);
        }
        if (name === 'Cylinder') {
            let o = this.format(options);
            return new CANNON.Cylinder(o.radiusTop, o.radiusBottom, o.height, o.numSegments);
        }
    }
    private format<T= any>(o): T {
        let t: any = {};
        // tslint:disable-next-line:forin
        for (const k in o) {
            const v = o[k];
            if (v instanceof Vec3) {
                t[k] = new CANNON.Vec3(v.x, v.y, v.z);
            } else if (v instanceof Quat) {
                t[k] = new CANNON.Quaternion(v.x, v.y, v.z, v.w);
            } else {
                t[k] = v;
            }
        }
        return t;
    }
}