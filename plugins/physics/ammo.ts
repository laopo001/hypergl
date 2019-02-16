/*
 * ProjectName: hypergl
 * FilePath: \plugins\physics\ammo.ts
 * Created Date: Saturday, January 12th 2019, 2:08:21 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, February 17th 2019, 3:42:24 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */


import * as AMMO from 'laopo001-ammo';
// import * as Ammo from './ammo';
import { Application, Plugin, Vec3, Quat, Entity, event } from 'hypergl';
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


// let
let frameCollisions = {};
let collisions = {};

export class RaycastResult {
    constructor(public entity: Entity, public point: Vec3, public normal: Vec3) {

    }
}

export class SingleContactResult {
    localPointA?: Vec3;
    localPointB?: Vec3;
    pointA?: Vec3;
    pointB?: Vec3;
    normal?: Vec3;
    constructor(public a: Entity, public b: Entity, public contactPoint: ContactPoint) {
        this.localPointA = contactPoint && contactPoint.localPoint || new Vec3();
        this.localPointB = contactPoint && contactPoint.localPointOther || new Vec3();
        this.pointA = contactPoint && contactPoint.point || new Vec3();
        this.pointB = contactPoint && contactPoint.pointOther || new Vec3();
        this.normal = contactPoint && contactPoint.normal || new Vec3();
    }
}

export class ContactPoint {
    constructor(public localPoint = new Vec3(),
        public localPointOther = new Vec3(),
        public point = new Vec3(),
        public pointOther = new Vec3(),
        public normal = new Vec3()) {

    }
}

export class ContactResult {
    constructor(public other: Entity, public contacts: ContactPoint[]) {

    }
}
export class AllocatePool {
    _count = 0;
    _pool: any[] = [];
    constructor(public _constructor, size) {
        this._resize(size);
    }
    _resize(size) {
        if (size > this._pool.length) {
            for (let i = this._pool.length; i < size; i++) {
                this._pool[i] = new this._constructor();
            }
        }
    }

    allocate() {
        if (this._count >= this._pool.length) {
            this._resize(this._pool.length * 2);
        }
        return this._pool[this._count++];
    }

    freeAll() {
        this._count = 0;
    }
}



export class AmmoPlugin implements Plugin, IPhysics {
    static pname = 'physics';
    type = 'ammo';
    Ammo!: typeof AMMO;
    ammoVec1!: AMMO.btVector3;
    ammoVec2!: AMMO.btVector3;
    ammoOrigin!: AMMO.btVector3;
    world!: AMMO.btDynamicsWorld;
    contactPointPool!: AllocatePool;
    contactResultPool!: AllocatePool;
    singleContactResultPool!: AllocatePool;
    constructor(private app: Application) {

    }
    static create() {
        return AmmoPlugin;
    }
    // tslint:disable-next-line:cyclomatic-complexity
    onUpdate = (dt) => {
        let Ammo = this.Ammo;
        // tslint:disable-next-line:no-parameter-reassignment
        dt = dt || 1;
        this.world.stepSimulation(dt, 10, 1 / 60);

        // Check for collisions and fire callbacks
        let dispatcher = this.world.getDispatcher();
        let numManifolds = dispatcher.getNumManifolds();
        // tslint:disable-next-line:one-variable-per-declaration
        let i, j;

        frameCollisions = {};

        // loop through the all contacts and fire events
        for (i = 0; i < numManifolds; i++) {
            let manifold = dispatcher.getManifoldByIndexInternal(i);
            let body0 = manifold.getBody0();
            let body1 = manifold.getBody1();
            let wb0 = (Ammo as any).castObject(body0, Ammo.btRigidBody);
            let wb1 = (Ammo as any).castObject(body1, Ammo.btRigidBody);
            let e0 = wb0.entity as Entity;
            let e1 = wb1.entity as Entity;

            // check if entity is null - TODO: investigate when this happens
            if (!e0 || !e1) {
                continue;
            }

            let flags0 = body0.getCollisionFlags();
            let flags1 = body1.getCollisionFlags();

            let numContacts = manifold.getNumContacts();
            let forwardContacts: any[] = [];
            let reverseContacts: any[] = [];
            // tslint:disable-next-line:one-variable-per-declaration
            let newCollision, e0Events, e1Events;

            if (numContacts > 0) {
                // don't fire contact events for triggers
                if ((flags0 & BODYFLAG.NORESPONSE_OBJECT) ||
                    (flags1 & BODYFLAG.NORESPONSE_OBJECT)) {

                    e0Events = e0.collision ? e0.collision.event.hasEvent('triggerenter') || e0.collision.event.hasEvent('triggerleave') : false;
                    e1Events = e1.collision ? e1.collision.event.hasEvent('triggerenter') || e1.collision.event.hasEvent('triggerleave') : false;

                    if (e0Events) {
                        // fire triggerenter events
                        newCollision = this._storeCollision(e0, e1);
                        if (newCollision) {
                            if (e0.collision && !(flags1 & BODYFLAG.NORESPONSE_OBJECT)) {
                                e0.collision.event.fire('triggerenter', e1);
                            }
                        }
                    }

                    if (e1Events) {
                        newCollision = this._storeCollision(e1, e0);
                        if (newCollision) {
                            if (e1.collision && !(flags0 & BODYFLAG.NORESPONSE_OBJECT)) {
                                e1.collision.event.fire('triggerenter', e0);
                            }
                        }
                    }
                } else {
                    e0Events = e0.collision ? e0.collision.event.hasEvent('collisionstart') || e0.collision.event.hasEvent('collisionend') || e0.collision.event.hasEvent('contact') : false;
                    e1Events = e1.collision ? e1.collision.event.hasEvent('collisionstart') || e1.collision.event.hasEvent('collisionend') || e1.collision.event.hasEvent('contact') : false;
                    let globalEvents = event.hasEvent('contact');

                    if (globalEvents || e0Events || e1Events) {
                        for (j = 0; j < numContacts; j++) {
                            let btContactPoint = manifold.getContactPoint(j);

                            let contactPoint = this._createContactPointFromAmmo(btContactPoint);
                            let reverseContactPoint = null;
                            if (e0Events || e1Events) {
                                reverseContactPoint = this._createReverseContactPointFromAmmo(btContactPoint);
                                forwardContacts.push(contactPoint);
                                reverseContacts.push(reverseContactPoint);
                            }

                            if (globalEvents) {
                                // fire global contact event for every contact
                                let result = this._createSingleContactResult(e0, e1, contactPoint);
                                event.fire('contact', result);
                            }
                        }

                        if (e0Events) {
                            let forwardResult = this._createContactResult(e1, forwardContacts);

                            // fire contact events on collision volume
                            if (e0.collision) {
                                e0.collision.event.fire('contact', forwardResult);
                            }

                            // fire collisionstart events
                            newCollision = this._storeCollision(e0, e1);
                            if (newCollision && e0.collision) {
                                e0.collision.event.fire('collisionstart', forwardResult);
                            }
                        }

                        if (e1Events) {
                            let reverseResult = this._createContactResult(e0, reverseContacts);

                            if (e1.collision) {
                                e1.collision.event.fire('contact', reverseResult);
                            }

                            newCollision = this._storeCollision(e1, e0);
                            if (newCollision && e1.collision) {
                                e1.collision.event.fire('collisionstart', reverseResult);
                            }
                        }
                    }
                }

            }
        }
    }
    async initialize() {
        return new Promise((resolve) => {
            (AMMO as any)().then((e) => {
                this.Ammo = e;
                let Ammo = this.Ammo;
                this.initWorld();
                this.ammoVec1 = new Ammo.btVector3();
                this.ammoVec2 = new Ammo.btVector3();
                this.ammoOrigin = new Ammo.btVector3(0, 0, 0);
                this.contactPointPool = new AllocatePool(ContactPoint, 1);
                this.contactResultPool = new AllocatePool(ContactResult, 1);
                this.singleContactResultPool = new AllocatePool(SingleContactResult, 1);
                resolve(true);
            });
        });
    }
    initWorld() {
        let Ammo = this.Ammo;
        // Physics configuration
        let collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
        let dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
        let broadphase = new Ammo.btDbvtBroadphase();
        let solver = new Ammo.btSequentialImpulseConstraintSolver();
        let physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration);
        physicsWorld.setGravity(new Ammo.btVector3(0, -9.82, 0));
        // this.app.on('update', this.onUpdate);
        this.world = physicsWorld;
    }
    setGravity(g: Vec3) {
        let Ammo = this.Ammo;
        this.world.setGravity(new Ammo.btVector3(g.x, g.y, g.z));
    }
    createShape<K extends keyof CreateShapeOptions>(name: K, options: CreateShapeOptions[K]) {
        let Ammo = this.Ammo;
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
        restitution?: number,
        linearDamping?: number;
        angularDamping?: number;
        linearFactor?: Vec3;
        angularFactor?: Vec3;
        shape?: AMMO.btConvexShape;
        group?: number;
        mask?: number;
    }, entity: Entity) {
        let Ammo = this.Ammo;
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
        let Ammo = this.Ammo;
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
        let Ammo = this.Ammo;
        // tslint:disable-next-line:one-variable-per-declaration
        let x, y, z, w;
        if (body.isActive()) {
            let ammoTransform = new Ammo.btTransform();
            let motionState = body.getMotionState();
            if (motionState) {
                motionState.getWorldTransform(ammoTransform);
                let p = ammoTransform.getOrigin();
                x = p.x();
                y = p.y();
                z = p.z();
                entity.setPosition(x, y, z);
                let q = ammoTransform.getRotation();
                x = q.x();
                y = q.y();
                z = q.z();
                w = q.w();
                entity.setRotation(x, y, z, w);
            }
        }
    }
    enableSimulation(entity: Entity, body: AMMO.btRigidBody) {
        let Ammo = this.Ammo;
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
        let Ammo = this.Ammo;
        if (group !== undefined && mask !== undefined) {
            this.world.addRigidBody(body, group, mask);
        } else {
            this.world.addRigidBody(body);
        }
        return body;
    }
    disableSimulation(entity: Entity, body: AMMO.btRigidBody) {
        let Ammo = this.Ammo;
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
        let Ammo = this.Ammo;
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
        let Ammo = this.Ammo;
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
        let Ammo = this.Ammo;
        // todo
    }
    raycastFirst(start: Vec3, end: Vec3) {
        let Ammo = this.Ammo;
        let result: null | RaycastResult = null;

        let ammoRayStart = new Ammo.btVector3(start.x, start.y, start.z);
        let ammoRayEnd = new Ammo.btVector3(end.x, end.y, end.z);
        let rayCallback = new Ammo.ClosestRayResultCallback(ammoRayStart, ammoRayEnd);

        this.world.rayTest(ammoRayStart, ammoRayEnd, rayCallback);
        if (rayCallback.hasHit()) {
            let collisionObj = rayCallback.get_m_collisionObject();
            let body = (Ammo as any).castObject(collisionObj, Ammo.btRigidBody);
            if (body) {
                let point = rayCallback.get_m_hitPointWorld();
                let normal = rayCallback.get_m_hitNormalWorld();

                result = new RaycastResult(
                    body.entity,
                    new Vec3(point.x(), point.y(), point.z()),
                    new Vec3(normal.x(), normal.y(), normal.z())
                );

                // keeping for backwards compatibility
                if (arguments.length > 2) {
                    let callback = arguments[2];
                    callback(result);

                    // if (!WARNED_RAYCAST_CALLBACK) {
                    //     console.warn('[DEPRECATED]: pc.RigidBodyComponentSystem#rayCastFirst no longer requires a callback. The result of the raycast is returned by the function instead.');
                    //     WARNED_RAYCAST_CALLBACK = true;
                    // }
                }
            }
        }

        Ammo.destroy(rayCallback);
        return result;
    }
    private _storeCollision(entity: Entity, other: Entity) {
        let Ammo = this.Ammo;
        let isNewCollision = false;
        let guid = entity.uuid;

        collisions[guid] = collisions[guid] || { others: [], entity };

        if (collisions[guid].others.indexOf(other) < 0) {
            collisions[guid].others.push(other);
            isNewCollision = true;
        }

        frameCollisions[guid] = frameCollisions[guid] || { others: [], entity };
        frameCollisions[guid].others.push(other);

        return isNewCollision;
    }
    private _createContactPointFromAmmo(contactPoint) {
        let Ammo = this.Ammo;
        let contact = this.contactPointPool.allocate();

        contact.localPoint.set(contactPoint.get_m_localPointA().x(), contactPoint.get_m_localPointA().y(), contactPoint.get_m_localPointA().z());
        contact.localPointOther.set(contactPoint.get_m_localPointB().x(), contactPoint.get_m_localPointB().y(), contactPoint.get_m_localPointB().z());
        contact.point.set(contactPoint.getPositionWorldOnA().x(), contactPoint.getPositionWorldOnA().y(), contactPoint.getPositionWorldOnA().z());
        contact.pointOther.set(contactPoint.getPositionWorldOnB().x(), contactPoint.getPositionWorldOnB().y(), contactPoint.getPositionWorldOnB().z());
        contact.normal.set(contactPoint.get_m_normalWorldOnB().x(), contactPoint.get_m_normalWorldOnB().y(), contactPoint.get_m_normalWorldOnB().z());

        return contact;
    }
    private _createReverseContactPointFromAmmo(contactPoint) {
        let Ammo = this.Ammo;
        let contact = this.contactPointPool.allocate();

        contact.localPointOther.set(contactPoint.get_m_localPointA().x(), contactPoint.get_m_localPointA().y(), contactPoint.get_m_localPointA().z());
        contact.localPoint.set(contactPoint.get_m_localPointB().x(), contactPoint.get_m_localPointB().y(), contactPoint.get_m_localPointB().z());
        contact.pointOther.set(contactPoint.getPositionWorldOnA().x(), contactPoint.getPositionWorldOnA().y(), contactPoint.getPositionWorldOnA().z());
        contact.point.set(contactPoint.getPositionWorldOnB().x(), contactPoint.getPositionWorldOnB().y(), contactPoint.getPositionWorldOnB().z());
        contact.normal.set(contactPoint.get_m_normalWorldOnB().x(), contactPoint.get_m_normalWorldOnB().y(), contactPoint.get_m_normalWorldOnB().z());
        return contact;
    }
    private _createSingleContactResult(a, b, contactPoint) {
        let Ammo = this.Ammo;
        let result = this.singleContactResultPool.allocate();

        result.a = a;
        result.b = b;
        result.localPointA = contactPoint.localPoint;
        result.localPointB = contactPoint.localPointOther;
        result.pointA = contactPoint.point;
        result.pointB = contactPoint.pointOther;
        result.normal = contactPoint.normal;

        return result;
    }
    private _createContactResult(other, contacts) {
        let Ammo = this.Ammo;
        let result = this.contactResultPool.allocate();
        result.other = other;
        result.contacts = contacts;
        return result;
    }
}