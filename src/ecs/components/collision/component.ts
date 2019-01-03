/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\collision\component.ts
 * Created Date: Thursday, January 3rd 2019, 8:55:12 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, January 3rd 2019, 11:24:27 pm
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
export interface CollisionType {
    'Sphere': { radius: number; };
    'Box': { halfExtents: Vec3 };
    'Cylinder': { radius: number, height: number, numSegments: number };
}

interface C<T, P extends keyof T> {
    type: P,
    option: T[P];
}

type CollisionInputs = C<CollisionType, keyof CollisionType>;

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
        this.instance = physics.createShape(this.inputs.type, this.inputs.option);
    }
    destroy() {
        super.destroy();
        this.instance = undefined as any;
    }
}


