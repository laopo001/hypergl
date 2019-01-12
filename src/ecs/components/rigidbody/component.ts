/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\rigidbody\component.ts
 * Created Date: Thursday, January 3rd 2019, 11:27:39 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, January 12th 2019, 3:20:53 pm
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
import { CannonPhysicsPlugin } from 'hypergl/plugins/physics';


export interface RigidbodyInputs {
    type: 'static' | 'dynamic' | 'kinematic';
    mass?: number;
    friction?: number;
    restitution?: number;
    velocity?: Vec3;
    linearDamping?: number;
    angularDamping?: number;
    linearFactor?: Vec3;
    angularFactor?: Vec3;
}

export const RigidbodyData: Partial<RigidbodyInputs> = {
    type: 'dynamic',
    friction: 0.5,
    mass: 1,
    restitution: 0.5
};

export class RigidbodyComponent extends Component<RigidbodyInputs> {
    name = 'rigidbody';
    instance;
    constructor(inputs: RigidbodyInputs, entity: Entity, system: ComponentSystem) {
        super(inputs, entity, system);
        copy(inputs, RigidbodyData);
    }

    initialize() {
        super.initialize();
        let app = this.entity.app as Application<{ physics: CannonPhysicsPlugin }>;
        let physics = app.plugins.physics;
        let material = physics.createMaterial(this.inputs.friction!, this.inputs.restitution!);
        let { type, mass, velocity, linearDamping, angularDamping, linearFactor, angularFactor } = this.inputs;
        let body = physics.addBody({
            type, mass, material, velocity,
            position: this.entity.getPosition(),
            shape: this.entity.collision.instance,
            linearDamping, angularDamping,
            // linearFactor, angularFactor
        });
        body['entity'] = this.entity;
        // tslint:disable-next-line:no-unused-expression
        this.entity.collision.inputs.onCollide && body.addEventListener('collide', this.entity.collision.inputs.onCollide as Function);
        event.on('update', () => {
            let { x, y, z } = body.position;
            this.entity.setPosition(x, y, z);
            x = body.quaternion.x;
            y = body.quaternion.y;
            z = body.quaternion.z;
            let w = body.quaternion.w;
            this.entity.setRotation(x, y, z, w);
        });
        this.instance = body;

    }
    setVelocity(v: Vec3);
    setVelocity(x: number, y: number, z: number);
    setVelocity(x, y?, z?) {
        let app = this.entity.app as Application<{ physics: CannonPhysicsPlugin }>;
        let physics = app.plugins.physics;
        physics.setVelocity(this.instance, x, y, z);
    }
    setAngularVelocity(v: Vec3);
    setAngularVelocity(x: number, y: number, z: number);
    setAngularVelocity(x, y?, z?) {
        let app = this.entity.app as Application<{ physics: CannonPhysicsPlugin }>;
        let physics = app.plugins.physics;
        physics.setAngularVelocity(this.instance, x, y, z);
    }
    // Apply an force to the body at a point.
    applyForce(force: Vec3, point: Vec3) {
        let app = this.entity.app as Application<{ physics: CannonPhysicsPlugin }>;
        let physics = app.plugins.physics;
        physics.applyForce(this.instance, {
            force, point
        });
    }
    applyImpulse(impulse: Vec3, point: Vec3) {
        let app = this.entity.app as Application<{ physics: CannonPhysicsPlugin }>;
        let physics = app.plugins.physics;
        physics.applyImpulse(this.instance, {
            impulse, point
        });
    }
    teleport(v: Vec3);
    teleport(x: number, y: number, z: number);
    teleport(x, y?, z?) {
        let app = this.entity.app as Application<{ physics: CannonPhysicsPlugin }>;
        let physics = app.plugins.physics;
        if (x instanceof Vec3) {
            this.entity.setPosition(x);
        } else {
            this.entity.setPosition(x, y, z);
        }
        physics.teleport(this.instance, x, y, z);
    }
    destroy() {
        super.destroy();
        this.instance = undefined as any;
    }
}


