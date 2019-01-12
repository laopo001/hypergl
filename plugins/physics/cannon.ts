/*
 * ProjectName: hypergl
 * FilePath: \plugins\physics\physics.ts
 * Created Date: Monday, December 31st 2018, 9:58:03 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, January 12th 2019, 3:20:53 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Application, Plugin, Vec3, Quat, Entity } from 'hypergl';
import * as CANNON from 'cannon';

export interface EVENT {
    body: CANNON.Body & { entity: Entity },
    contact: CANNON.ContactEquation,
    target: CANNON.Body & { entity: Entity },
    type: string,
}

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
        this.initWorld();
    }
    initWorld(g: [number, number, number] = [0, -10, 0]) {
        let fixedTimeStep = 1.0 / 60.0; // seconds
        let maxSubSteps = 3;
        this.world.gravity.set(...g);
        this.app.on('update', (dt) => {
            this.world.step(fixedTimeStep, dt, maxSubSteps);
        });
    }
    setGravity(g: [number, number, number] = [0, -9.8, 0]) {
        this.world.gravity.set(...g);
    }
    addBody(o: {
        position?: Vec3;
        velocity?: Vec3;
        angularVelocity?: Vec3;
        quaternion?: Quat;
        mass?: number;
        material?: CANNON.Material;
        type?: string;
        linearDamping?: number;
        angularDamping?: number;
        linearFactor?: Vec3;
        angularFactor?: Vec3;
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
            case 'static': t.type = CANNON.Body.STATIC; t.mass = 0; break;
            case 'dynamic': t.type = CANNON.Body.DYNAMIC; break;
            case 'kinematic': t.type = CANNON.Body.KINEMATIC; break;
        }
        let body = new CANNON.Body(t);
        this.world.addBody(body);
        return body;
    }
    createMaterial(friction: number, restitution: number, name = '') {
        let m = new CANNON.Material(name);
        m.friction = friction;
        m.restitution = restitution;
        return m;
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
            let cylinder = new CANNON.Cylinder(o.radiusTop, o.radiusBottom, o.height, o.numSegments);
            let q = new CANNON.Quaternion();
            q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2 * 3);
            // q.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), Math.PI);
            (cylinder as any).transformAllPoints(new CANNON.Vec3(), q);
            return cylinder;
        }
    }
    applyForce(body: CANNON.Body, options: {
        force: Vec3, point: Vec3
    }) {
        let t = this.format(options);
        body.applyForce(t.force, t.point);
    }
    applyImpulse(body: CANNON.Body, options: {
        impulse: Vec3, point: Vec3
    }) {
        let t = this.format(options);
        body.applyImpulse(t.impulse, t.point);
    }
    setVelocity(body: CANNON.Body, v: Vec3);
    setVelocity(body: CANNON.Body, x: number, y: number, z: number);
    setVelocity(body: CANNON.Body, x, y?, z?) {
        if (x instanceof Vec3) {
            body.velocity.x = x.x;
            body.velocity.y = x.y;
            body.velocity.z = x.z;
        } else {
            body.velocity.x = x;
            body.velocity.y = y;
            body.velocity.z = z;
        }
    }
    setAngularVelocity(body: CANNON.Body, v: Vec3);
    setAngularVelocity(body: CANNON.Body, x: number, y: number, z: number);
    setAngularVelocity(body: CANNON.Body, x, y?, z?) {
        if (x instanceof Vec3) {
            body.angularVelocity.x = x.x;
            body.angularVelocity.y = x.y;
            body.angularVelocity.z = x.z;
        } else {
            body.angularVelocity.x = x;
            body.angularVelocity.y = y;
            body.angularVelocity.z = z;
        }
    }
    teleport(body: CANNON.Body, v: Vec3);
    teleport(body: CANNON.Body, x: number, y: number, z: number);
    teleport(body: CANNON.Body, x, y?, z?) {
        if (x instanceof Vec3) {
            body.position.x = x.x;
            body.position.y = x.y;
            body.position.z = x.z;
        } else {
            body.position.x = x;
            body.position.y = y;
            body.position.z = z;
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