/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\collision\component.ts
 * Created Date: Thursday, January 3rd 2019, 8:55:12 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, January 4th 2019, 12:42:18 am
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

export type CollisionInputs = {
    type: 'sphere',
    radius: number;
} | {
    type: 'box',
    halfExtents: Vec3
} | {
    type: 'cylinder',
    radiusTop: number,
    radiusBottom: number,
    height: number,
    numSegments: number
};

export const CollisionData: Partial<CollisionInputs> = {
    type: 'box',
    halfExtents: new Vec3(1, 1, 1)
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
        this.instance = physics.createShape(this.inputs.type, this.inputs);
    }
    destroy() {
        super.destroy();
        this.instance = undefined as any;
    }
}


