/*
 * ProjectName: hypergl
 * FilePath: \plugins\physics\ammo.ts
 * Created Date: Saturday, January 12th 2019, 2:08:21 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, January 15th 2019, 1:38:03 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */


import * as AMMO from 'laopo001-ammo';
// import * as Ammo from './ammo';
import { Application, Plugin, Vec3, Quat, Entity } from 'hypergl';
import { IPhysics } from './types';

enum BODYSTATE {
    BODYSTATE_ACTIVE_TAG = 1,
    ISLAND_SLEEPING = 2,
    WANTS_DEACTIVATION = 3,
    DISABLE_DEACTIVATION = 4,
    DISABLE_SIMULATION = 5,
}

enum BODYFLAG {
    STATIC_OBJECT = 1,
    KINEMATIC_OBJECT = 2,
    NORESPONSE_OBJECT = 4,
}


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
    initWorld() {
        // Physics configuration
        let collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
        let dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
        let broadphase = new Ammo.btDbvtBroadphase();
        let solver = new Ammo.btSequentialImpulseConstraintSolver();
        let physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration);
        physicsWorld.setGravity(new Ammo.btVector3(0, -9.82, 0));
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
        } else {
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
        ammoVec1 = new Ammo.btVector3();
        ammoVec1.setValue(angularFactor.x, angularFactor.y, angularFactor.z);
        body.setAngularFactor(ammoVec1);

        if (type === 'kinematic') {
            body.setCollisionFlags(body.getCollisionFlags() | BODYFLAG.KINEMATIC_OBJECT);
            body.setActivationState(BODYSTATE.DISABLE_DEACTIVATION as number);
        }

        if (group !== undefined && mask !== undefined) {
            this.world.addRigidBody(body, group, mask);
        } else {
            this.world.addRigidBody(body);
        }

        if (type === 'kinematic') {
            body.forceActivationState(BODYSTATE.DISABLE_DEACTIVATION as number);
            body.activate();
        } else {
            body.forceActivationState(BODYSTATE.BODYSTATE_ACTIVE_TAG as number);
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
    syncBodyToEntity(entity: Entity, body: AMMO.btRigidBody, dt: number) {
        // body.activate();
        console.log(body.isActive());

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
    enableSimulation(entity: Entity, body: AMMO.btRigidBody) {
        if (entity.collision && entity.collision.enabled && !entity.rigidbody.simulationEnabled) {
            if (body) {
                this.addBody2(body, entity.rigidbody.inputs.group!, entity.rigidbody.inputs.mask!);

                // set activation state so that the body goes back to normal simulation
                if (entity.rigidbody.inputs.type === 'kinematic') {
                    body.forceActivationState(BODYSTATE.DISABLE_DEACTIVATION as number);
                    body.activate();
                } else {
                    body.forceActivationState(undefined as any);
                    this.syncEntityToBody(entity, body);
                }

                entity.rigidbody.simulationEnabled = true;
            }
        }
    }
    // tslint:disable-next-line:adjacent-overload-signatures
    addBody2(body: AMMO.btRigidBody, group: number, mask: number) {
        if (group !== undefined && mask !== undefined) {
            this.world.addRigidBody(body, group, mask);
        } else {
            this.world.addRigidBody(body);
        }
        return body;
    }
    disableSimulation(entity: Entity, body: AMMO.btRigidBody) {
        if (body && entity.rigidbody.simulationEnabled) {
            this.world.removeRigidBody(body);
            // set activation state to disable simulation to avoid body.isActive() to return
            // true even if it's not in the dynamics world
            body.forceActivationState(BODYSTATE.DISABLE_SIMULATION as number);

            entity.rigidbody.simulationEnabled = false;
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