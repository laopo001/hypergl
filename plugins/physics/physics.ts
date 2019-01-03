/*
 * ProjectName: hypergl
 * FilePath: \plugins\physics\physics.ts
 * Created Date: Monday, December 31st 2018, 9:58:03 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, January 4th 2019, 1:10:09 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Application, Plugin, Vec3, Quat } from 'hypergl';
// import * as Ammo from './ammo';
import * as CANNON from 'cannon';
export interface CreateShapeOptions {
    'sphere': { radius: number; };
    'box': { halfExtents: Vec3 };
    'cylinder': { radiusTop: number, radiusBottom: number, height: number, numSegments: number };
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
        // console.log(CANNON.Body.STATIC);
        // console.log(CANNON.Body.DYNAMIC);
        // console.log(CANNON.Body.KINEMATIC);
        this.app.on('update', (dt) => {
            this.world.step(fixedTimeStep, dt / 100, maxSubSteps);
        });
    }
    addBody(o: {
        position?: Vec3;
        velocity?: Vec3;
        angularVelocity?: Vec3;
        quaternion?: Quat;
        mass?: number;
        // material?: CANNON.Material;
        type?: string;
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
        console.log(o);

        let t = this.format(o);
        switch (t.type) {
            case 'static': t.type = CANNON.Body.STATIC; break;
            case 'dynamic': t.type = CANNON.Body.DYNAMIC; break;
            case 'kinematic': t.type = CANNON.Body.KINEMATIC; break;
        }
        let body = new CANNON.Body(t);
        this.world.addBody(body);
        return body;
    }
    createShape<T extends keyof CreateShapeOptions>(name: T, options: CreateShapeOptions[T]) {
        if (name === 'box') {
            return new CANNON.Box(this.format(options).halfExtents);
        }
        if (name === 'sphere') {
            return new CANNON.Sphere(this.format(options).radius);
        }
        if (name === 'cylinder') {
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