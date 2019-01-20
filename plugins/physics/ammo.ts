/*
 * ProjectName: hypergl
 * FilePath: \plugins\physics\ammo.ts
 * Created Date: Saturday, January 12th 2019, 2:08:21 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, January 21st 2019, 12:48:25 am
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
    'cylinder': { radius: number, height: number, axis: 'x' | 'y' | 'z' };
}


let Ammo: typeof AMMO;


export class AmmoPlugin implements Plugin, IPhysics {
    static pname = 'physics';
    type = 'ammo';
    ammoVec1!: AMMO.btVector3;
    ammoVec2!: AMMO.btVector3;
    ammoOrigin!: AMMO.btVector3;
    world!: AMMO.btDynamicsWorld;
    constructor(private app: Application) {

    }
    async initialize() {
        return new Promise((resolve) => {
            (AMMO as any)().then((e) => {
                Ammo = e;
                this.initWorld();
                this.ammoVec1 = new Ammo.btVector3();
                this.ammoVec2 = new Ammo.btVector3();
                this.ammoOrigin = new Ammo.btVector3(0, 0, 0);
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
    createShape<K extends keyof CreateShapeOptions>(name: K, options: CreateShapeOptions[K]) {
        let shape;
        if (name === 'box') {
            let o = options as CreateShapeOptions['box'];
            let { x, y, z } = o.halfExtents;
            shape = new Ammo.btBoxShape(new Ammo.btVector3(x, y, z));
        }
        if (name === 'sphere') {
            let o = options as CreateShapeOptions['sphere'];
            shape = new Ammo.btSphereShape(o.radius);
        }
        if (name === 'cylinder') {
            let o = options as CreateShapeOptions['cylinder'];
            let halfExtents;
            let radiusTop = o.radius;
            let radiusBottom = o.radius;
            let height = o.height / 2;
            switch (o.axis) {
                case 'x':
                    halfExtents = new Ammo.btVector3(height, radiusTop, radiusBottom);
                    shape = new Ammo.btCylinderShapeX(halfExtents);
                    break;
                case 'y':
                    halfExtents = new Ammo.btVector3(radiusTop, height, radiusBottom);
                    shape = new Ammo.btCylinderShape(halfExtents);
                    break;
                case 'z':
                    halfExtents = new Ammo.btVector3(radiusTop, radiusBottom, height);
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
        // console.log(o);
        let { mass, type, shape, quaternion, position, friction, restitution,
            linearDamping, angularDamping, linearFactor, angularFactor, group, mask } = o as Required<typeof o>;

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
        return body;
    }
    syncEntityToBody(entity: Entity, body: AMMO.btRigidBody, init = true) {
        let pos = entity.getPosition();
        let rot = entity.getRotation();

        let transform = body.getWorldTransform();
        transform.getOrigin().setValue(pos.x, pos.y, pos.z);
        let ammoQuat = new Ammo.btQuaternion(0, 0, 0, 1);
        ammoQuat.setValue(rot.x, rot.y, rot.z, rot.w);
        transform.setRotation(ammoQuat);
        if (init) {
            // update the motion state for kinematic bodies
            if (entity.rigidbody.inputs.type === 'kinematic') {
                let motionState = body.getMotionState();
                if (motionState) {
                    motionState.setWorldTransform(transform);
                }
            }
            body.activate();
        }

    }
    syncBodyToEntity(entity: Entity, body: AMMO.btRigidBody, dt: number) {

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
    applyForce(body: AMMO.btRigidBody, options: {
        force: Vec3, point?: Vec3
    }) {
        body.activate();
        this.ammoVec1.setValue(options.force.x, options.force.y, options.force.z);
        if (options.point !== undefined) {
            this.ammoVec2.setValue(options.point.x, options.point.y, options.point.z);
            body.applyForce(this.ammoVec1, this.ammoVec2);
        } else {
            body.applyForce(this.ammoVec1, this.ammoOrigin);
        }
    }
    applyImpulse(body: AMMO.btRigidBody, options: {
        impulse: Vec3, point?: Vec3
    }) {
        body.activate();
        this.ammoVec1.setValue(options.impulse.x, options.impulse.y, options.impulse.z);
        if (options.point !== undefined) {
            this.ammoVec2.setValue(options.point.x, options.point.y, options.point.z);
            body.applyImpulse(this.ammoVec1, this.ammoVec2);
        } else {
            body.applyImpulse(this.ammoVec1, this.ammoOrigin);
        }
    }
    setMass(body: AMMO.btRigidBody) {
        // todo
    }
}