/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\rigidbody\component.ts
 * Created Date: Thursday, January 3rd 2019, 11:27:39 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, January 16th 2019, 10:36:54 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */



import { Entity, Camera } from '../../..';
import { Component } from '../../component';
import { Log, copy } from '../../../utils/util';
import { Mat4, Vec3 } from '../../../math';
import { ComponentSystem } from '../../system';
import { event } from '../../../core';
import { Application } from '../../../application';
import { IPhysics } from 'hypergl/plugins/physics';


export interface RigidbodyInputs {
    type: 'static' | 'dynamic' | 'kinematic';
    mass?: number;
    friction?: number;
    restitution?: number;
    // velocity?: Vec3;
    linearDamping?: number;
    angularDamping?: number;
    linearFactor?: Vec3;
    angularFactor?: Vec3;
    linearVelocity?: Vec3;
    angularVelocity?: Vec3;
    group?: number;
    mask?: number;
}

export const RigidbodyData: Partial<RigidbodyInputs> = {
    type: 'dynamic',
    friction: 0.5,
    mass: 1,
    restitution: 0.5,
    linearDamping: 0,
    angularDamping: 0,
    linearFactor: new Vec3(1, 1, 1),
    angularFactor: new Vec3(1, 1, 1),
    linearVelocity: new Vec3(0, 0, 0),
    angularVelocity: new Vec3(0, 0, 0),
    group: 1,
    mask: 65535
};

export class RigidbodyComponent extends Component<RigidbodyInputs> {
    name = 'rigidbody';
    instance;
    simulationEnabled = false;
    get body() {
        return this.instance;
    }
    constructor(inputs: RigidbodyInputs, entity: Entity, system: ComponentSystem) {
        super(inputs, entity, system);
        copy(inputs, RigidbodyData);
    }

    initialize() {
        super.initialize();
        let app = this.entity.app as Application<{ physics: IPhysics }>;
        let physics = app.plugins.physics;

        let { type, mass, linearDamping, angularDamping, linearFactor,
            angularFactor, friction, restitution, group, mask } = this.inputs;
        let body = physics.addBody({
            type, mass, friction, restitution,
            position: this.entity.getPosition(),
            quaternion: this.entity.getRotation(),
            shape: this.entity.collision.instance,
            linearDamping, angularDamping,
            linearFactor, angularFactor,
            group, mask
        }, this.entity);
        body['entity'] = this.entity;
        // tslint:disable-next-line:no-unused-expression
        this.entity.collision.inputs.onCollide && body.addEventListener('collide', this.entity.collision.inputs.onCollide as Function);
        event.on('update', (dt) => {
            if (this.enabled) {
                if (this.entity.rigidbody.inputs.type === 'dynamic') {
                    physics.syncBodyToEntity(this.entity, body, dt);
                }
                if (this.entity.rigidbody.inputs.type === 'kinematic') {
                    let _displacement = new Vec3().copy(this.inputs.linearVelocity!).scale(dt);
                    this.entity.translate(_displacement);

                    _displacement.copy(this.inputs.angularVelocity!).scale(dt);
                    this.entity.rotate(_displacement.x, _displacement.y, _displacement.z);
                    if (this.body.getMotionState()) {
                        physics.syncEntityToBody(Entity, body, false);
                    }
                }
            }
        });
        this.instance = body;
    }
    // setVelocity(v: Vec3);
    // setVelocity(x: number, y: number, z: number);
    // setVelocity(x, y?, z?) {
    //     let app = this.entity.app as Application<{ physics: IPhysics }>;
    //     let physics = app.plugins.physics;
    //     // physics.setVelocity(this.instance, x, y, z);
    // }
    // setAngularVelocity(v: Vec3);
    // setAngularVelocity(x: number, y: number, z: number);
    // setAngularVelocity(x, y?, z?) {
    //     let app = this.entity.app as Application<{ physics: IPhysics }>;
    //     let physics = app.plugins.physics;
    //     // physics.setAngularVelocity(this.instance, x, y, z);
    // }
    applyForce(force: Vec3, point?: Vec3) {
        let app = this.entity.app as Application<{ physics: IPhysics }>;
        let physics = app.plugins.physics;
        physics.applyForce(this.instance, {
            force, point
        });
    }
    applyImpulse(impulse: Vec3, point?: Vec3) {
        let app = this.entity.app as Application<{ physics: IPhysics }>;
        let physics = app.plugins.physics;
        physics.applyImpulse(this.instance, {
            impulse, point
        });
    }
    teleport(v: Vec3);
    teleport(x: number, y: number, z: number);
    teleport(x, y?, z?) {
        let app = this.entity.app as Application<{ physics: IPhysics }>;
        let physics = app.plugins.physics;
        if (x instanceof Vec3) {
            this.entity.setPosition(x);
        } else {
            this.entity.setPosition(x, y, z);
        }
        physics.syncEntityToBody(this.entity, this.body);
        // physics.teleport(this.instance, x, y, z);
    }
    destroy() {
        super.destroy();
        this.instance = undefined as any;
    }
}


