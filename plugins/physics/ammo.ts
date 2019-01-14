/*
 * ProjectName: hypergl
 * FilePath: \plugins\physics\ammo.ts
 * Created Date: Saturday, January 12th 2019, 2:08:21 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, January 14th 2019, 11:06:04 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */


import * as AMMO from 'laopo001-ammo';
// import * as Ammo from './ammo';
import { Application, Plugin, Vec3, Quat, Entity } from 'hypergl';
import { IPhysics } from './types';


export interface CreateShapeOptions {
    'sphere': { radius: number; };
    'box': { halfExtents: Vec3 };
    'cylinder': { radiusTop: number, radiusBottom: number, height: number, axis: 'x' | 'y' | 'z' };
}

type PartialAny<T> = {
    [P in keyof T]: any;
};

let Ammo: typeof AMMO;


export class AmmoPlugin implements Plugin, IPhysics {
    static pname = 'physics';
    type = 'ammo';

    world!: AMMO.btDynamicsWorld;
    constructor(private app: Application) {
        // this.initWorld();
    }
    async initialize() {
        return new Promise((resolve) => {
            (AMMO as any)().then((e) => {
                Ammo = e;
                this.initWorld();
                resolve(true);
            });
        });
    }
    initWorld(g: [number, number, number] = [0, -9.82, 0]) {
        // Physics configuration
        let collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
        let dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
        let broadphase = new Ammo.btDbvtBroadphase();
        let solver = new Ammo.btSequentialImpulseConstraintSolver();
        let physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration);
        physicsWorld.setGravity(new Ammo.btVector3(...g));
        this.app.on('update', (dt) => {
            // tslint:disable-next-line:no-parameter-reassignment
            dt = dt || 1;
            physicsWorld.stepSimulation(dt, 10, 1 / 60);
        });
        this.world = physicsWorld;
    }
    setGravity(g: Vec3) {
        this.world.setGravity(new Ammo.btVector3(g.x, g.y, g.z));
    }
    createShape<T extends keyof CreateShapeOptions>(name: T, options: CreateShapeOptions[T]) {
        let shape;
        let o = this.format(options);
        if (name === 'box') {
            shape = new Ammo.btBoxShape(o.halfExtents);
        }
        if (name === 'sphere') {
            shape = new Ammo.btSphereShape(o.radius);
        }
        if (name === 'cylinder') {
            let halfExtents;
            switch (o.axis) {
                case 'x':
                    halfExtents = new Ammo.btVector3(o.height, o.radiusTop, o.radiusBottom);
                    shape = new Ammo.btCylinderShapeX(halfExtents);
                    break;
                case 'y':
                    halfExtents = new Ammo.btVector3(o.height, o.radiusTop, o.radiusBottom);
                    shape = new Ammo.btCylinderShape(halfExtents);
                    break;
                case 'z':
                    halfExtents = new Ammo.btVector3(o.height, o.radiusTop, o.radiusBottom);
                    shape = new Ammo.btCylinderShapeZ(halfExtents);
                    break;
            }
        }
        shape.options = options;
        return shape;
    }
    addBody(o: {
        type?: string;
        position?: Vec3;
        quaternion?: Quat;
        velocity?: Vec3;
        angularVelocity?: Vec3;
        mass?: number;
        friction?: number,
        restitution: number,
        linearDamping?: number;
        angularDamping?: number;
        linearFactor?: Vec3;
        angularFactor?: Vec3;
        shape?: AMMO.btConvexShape;
        group?: number;
        mask?: number;
    }, entity: Entity) {
        console.log(o);

        let { mass, type, shape, quaternion, position, friction, restitution,
            linearDamping, angularDamping, linearFactor, angularFactor, group, mask } = this.format(o);
        let localInertia = new Ammo.btVector3(0, 0, 0);
        if (type === 'static' || type === 'kinematic') {
            mass = 0;
            shape.calculateLocalInertia(mass, localInertia);
        }
        let ammoQuat = new Ammo.btQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
        let startTransform = new Ammo.btTransform();
        startTransform.setIdentity();
        startTransform.getOrigin().setValue(position.x, position.y, position.z);
        startTransform.setRotation(ammoQuat);
        let motionState = new Ammo.btDefaultMotionState(startTransform);
        let bodyInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia);

        let body = new Ammo.btRigidBody(bodyInfo);

        body.setRestitution(restitution);
        body.setFriction(friction);
        body.setDamping(linearDamping, angularDamping);

        let ammoVec1 = new Ammo.btVector3();
        ammoVec1.setValue(linearFactor.x, linearFactor.y, linearFactor.z);
        body.setLinearFactor(ammoVec1);
        ammoVec1.setValue(angularFactor.x, angularFactor.y, angularFactor.z);
        body.setAngularFactor(ammoVec1);

        this.world.addRigidBody(body, group, mask);
        if (type === 'kinematic') {
            body.forceActivationState(4);
            body.activate();
        } else {
            body.forceActivationState(1);
            this.syncEntityToBody(entity, body);
        }
        console.log(body.isActive());

        return body;
    }
    syncEntityToBody(entity: Entity, body: AMMO.btRigidBody) {
        let pos = entity.getPosition();
        let rot = entity.getRotation();

        let transform = body.getWorldTransform();
        transform.getOrigin().setValue(pos.x, pos.y, pos.z);
        let ammoQuat = new Ammo.btQuaternion(0, 0, 0, 1);
        ammoQuat.setValue(rot.x, rot.y, rot.z, rot.w);
        transform.setRotation(ammoQuat);

        // update the motion state for kinematic bodies
        if (entity.rigidbody.inputs.type === 'kinematic') {
            let motionState = body.getMotionState();
            if (motionState) {
                motionState.setWorldTransform(transform);
            }
        }
        body.activate();
    }
    syncBodyToEntity(entity: Entity, body: AMMO.btRigidBody) {
        if (body.isActive()) {
            let ammoTransform = new Ammo.btTransform();
            let motionState = body.getMotionState();
            if (motionState) {
                motionState.getWorldTransform(ammoTransform);

                let p = ammoTransform.getOrigin();
                let q = ammoTransform.getRotation();
                entity.setPosition(p.x(), p.y(), p.z());
                entity.setRotation(q.x(), q.y(), q.z(), q.w());
            }
        }
    }
    private format(o: any) {
        let t: any = {};
        // tslint:disable-next-line:forin
        for (const k in o) {
            const v = o[k];
            if (v instanceof Vec3) {
                t[k] = new Ammo.btVector3(v.x, v.y, v.z);
            } else if (v instanceof Quat) {
                t[k] = new Ammo.btQuaternion(v.x, v.y, v.z, v.w);
            } else {
                t[k] = v;
            }
        }
        return t;
    }
}