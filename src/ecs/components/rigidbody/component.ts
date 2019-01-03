/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\rigidbody\component.ts
 * Created Date: Thursday, January 3rd 2019, 11:27:39 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, January 4th 2019, 12:25:15 am
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

interface CollisionInputs {
    type: 'static' | 'dynamic' | 'kinematic';
    mass: number;
}

export const CollisionData: Partial<CollisionInputs> = {

};

export class CollisionComponent extends Component<CollisionInputs> {
    name = 'collision';
    instance!: any;
    constructor(inputs: CollisionInputs, entity: Entity, system: ComponentSystem) {
        super(inputs, entity, system);
        copy(inputs, CollisionData);
    }

    initialize() {
        super.initialize();
        let app = this.entity.app as Application<{ physics: CannonPhysicsPlugin }>;
        let physics = app.plugins.physics;
        this.instance = physics.addBody({
            mass: this.inputs.mass,
            position: this.entity.getPosition(),

        });
    }
    destroy() {
        super.destroy();
        this.instance = undefined as any;
    }
}


