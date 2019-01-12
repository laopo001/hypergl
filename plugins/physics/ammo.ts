/*
 * ProjectName: hypergl
 * FilePath: \plugins\physics\ammo.ts
 * Created Date: Saturday, January 12th 2019, 2:08:21 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, January 12th 2019, 5:31:28 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */


import * as Ammo from 'laopo001-ammo';
// import * as Ammo from './ammo';
import { Application, Plugin, Vec3, Quat, Entity } from 'hypergl';
import { IPhysics } from './types';
import { Log } from 'src/utils';


export interface CreateShapeOptions {
    'sphere': { radius: number; };
    'box': { halfExtents: Vec3 };
    'cylinder': { radiusTop: number, radiusBottom: number, height: number, axis: 'x' | 'y' | 'z' };
}

type PartialAny<T> = {
    [P in keyof T]: any;
};

let ammo: typeof Ammo;


export class AmmoPlugin implements Plugin, IPhysics {
    static pname = 'ammo';

    world!: Ammo.btDynamicsWorld;
    constructor(private app: Application) {
        // this.initWorld();
    }
    async initialize() {
        return new Promise((resolve) => {
            (Ammo as any)().then((e) => {
                ammo = e;
                resolve(true);
            });
        });
    }
    initWorld(g: [number, number, number] = [0, -9.82, 0]) {
        // Physics configuration
        let collisionConfiguration = new ammo.btDefaultCollisionConfiguration();
        let dispatcher = new ammo.btCollisionDispatcher(collisionConfiguration);
        let broadphase = new ammo.btDbvtBroadphase();
        let solver = new ammo.btSequentialImpulseConstraintSolver();
        let physicsWorld = new ammo.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration);
        physicsWorld.setGravity(new ammo.btVector3(...g));
        this.app.on('update', (dt) => {
            physicsWorld.stepSimulation(dt, 10);
        });
        this.world = physicsWorld;
    }
    setGravity(g: [number, number, number]) {
        this.world.setGravity(new ammo.btVector3(...g));
    }
    createShape<T extends keyof CreateShapeOptions>(name: T, options: CreateShapeOptions[T]) {
        if (name === 'box') {
            return new ammo.btBoxShape(this.format(options).halfExtents);
        }
        if (name === 'sphere') {
            return new ammo.btSphereShape(this.format(options).radius);
        }
        if (name === 'cylinder') {
            let o = this.format(options);
            let halfExtents;
            let shape;
            switch (o.axis) {
                case 'x':
                    halfExtents = new ammo.btVector3(o.height, o.radiusTop, o.radiusBottom);
                    shape = new ammo.btCylinderShapeX(halfExtents);
                    break;
                case 'y':
                    halfExtents = new ammo.btVector3(o.height, o.radiusTop, o.radiusBottom);
                    shape = new ammo.btCylinderShape(halfExtents);
                    break;
                case 'z':
                    halfExtents = new ammo.btVector3(o.height, o.radiusTop, o.radiusBottom);
                    shape = new ammo.btCylinderShapeZ(halfExtents);
                    break;
            }
            return shape;
        }
    }
    addBody(o: {
        position?: Vec3;
        quaternion?: Quat;
        velocity?: Vec3;
        angularVelocity?: Vec3;
        mass?: number;
        // material?: CANNON.Material;
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

    }
    private format(o: any) {
        let t: any = {};
        // tslint:disable-next-line:forin
        for (const k in o) {
            const v = o[k];
            if (v instanceof Vec3) {
                t[k] = new ammo.btVector3(v.x, v.y, v.z);
            } else if (v instanceof Quat) {
                t[k] = new ammo.btQuaternion(v.x, v.y, v.z, v.w);
            } else {
                t[k] = v;
            }
        }
        return t;
    }
}