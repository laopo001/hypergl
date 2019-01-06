/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\rigidbody\component.ts
 * Created Date: Thursday, January 3rd 2019, 11:27:39 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, January 6th 2019, 5:59:47 pm
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
// import {} from 'hypergl/'

export interface RigidbodyInputs {
    type: 'static' | 'dynamic' | 'kinematic';
    mass?: number;
    friction?: number;
    restitution?: number;
    velocity?: Vec3;
}

export const RigidbodyData: Partial<RigidbodyInputs> = {
    type: 'dynamic',
    friction: 0.5,
    mass: 1,
    restitution: 0.5
};

export class RigidbodyComponent extends Component<RigidbodyInputs> {
    name = 'rigidbody';
    instance!: any;
    constructor(inputs: RigidbodyInputs, entity: Entity, system: ComponentSystem) {
        super(inputs, entity, system);
        copy(inputs, RigidbodyData);
    }

    initialize() {
        super.initialize();
        let app = this.entity.app as Application<{ physics: CannonPhysicsPlugin }>;
        let physics = app.plugins.physics;
        let material = physics.createMaterial(this.inputs.friction!, this.inputs.restitution!);
        let body = physics.addBody({
            type: this.inputs.type,
            mass: this.inputs.mass,
            material,
            position: this.entity.getPosition(),
            velocity: this.inputs.velocity,
            shape: this.entity.collision.instance
        });
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
    destroy() {
        super.destroy();
        this.instance = undefined as any;
    }
}


