/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\rigidbody\component.ts
 * Created Date: Thursday, January 3rd 2019, 11:27:39 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, March 9th 2019, 2:03:51 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */



import { Entity } from '../../entity';
import { Component } from '../../component';
import { Log, input_copy } from '../../../utils/util';
import { Mat4, Vec3 } from '../../../math';
import { ComponentSystem } from '../../system';
import { event } from '../../../core';
import { Application } from '../../../application';


export interface RigidbodyInputs {
    type: 'static' | 'dynamic' | 'kinematic';
    mass?: number;
    friction?: number;
    restitution?: number;
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
    get body() {
        return this.instance;
    }
    name = 'rigidbody';
    instance;
    simulationEnabled = false;
    updateFn: any;
    constructor(inputs: RigidbodyInputs, entity: Entity, system: ComponentSystem) {
        super(inputs, entity, system);
        input_copy(inputs, RigidbodyData);
    }

    async initialize() {
        super.initialize();
        if (this.entity.collision.instance === null) {
            console.warn('没有碰撞组件');
            return;
        }
        let physics = await this.entity.scene.systems.rigidbody!.asyncPhysics;

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
        this.updateFn = (dt) => {
            if (!this.entity.scene.systems.rigidbody!.enabled) {
                return;
            }
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
                        physics.syncEntityToBody(this.entity, body, false);
                    }
                }
            }
        };
        this.entity.scene.event.on('update', this.updateFn);
        this.instance = body;
    }
    update() {
        // this.entity.collision.update();
        this.destroy();
        this.initialize();
    }
    async destroy() {
        super.destroy();
        this.entity.scene.event.off('update', this.updateFn);
        let physics = await this.entity.scene.systems.rigidbody!.asyncPhysics;
        physics.removeBody(this.instance);
        this.enabled = false;
        this.instance = undefined as any;
    }
    async applyForce(force: Vec3, point?: Vec3) {
        let physics = await this.entity.scene.systems.rigidbody!.asyncPhysics;
        physics.applyForce(this.instance, {
            force, point
        });
    }
    async applyImpulse(impulse: Vec3, point?: Vec3) {
        let physics = await this.entity.scene.systems.rigidbody!.asyncPhysics;
        physics.applyImpulse(this.instance, {
            impulse, point
        });
    }
    teleport(v: Vec3);
    teleport(x: number, y: number, z: number);
    async teleport(x, y?, z?) {
        let physics = await this.entity.scene.systems.rigidbody!.asyncPhysics;
        // let physics = this.entity.scene.systems.rigidbody!.physics;
        if (x instanceof Vec3) {
            this.entity.setPosition(x);
        } else {
            this.entity.setPosition(x, y, z);
        }
        physics.syncEntityToBody(this.entity, this.body);
    }
}


