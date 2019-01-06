/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\collision\component.ts
 * Created Date: Thursday, January 3rd 2019, 8:55:12 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, January 7th 2019, 1:34:57 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */



import { Entity } from '../../entity';
import { Component } from '../../component';
import { Log, copy } from '../../../utils/util';
import { Mat4, Vec3 } from '../../../math';
import { ComponentSystem } from '../../system';
import { event } from '../../../core';
import { Application } from '../../../application';
import { CannonPhysicsPlugin } from 'hypergl/plugins/physics';
import { Mesh } from '../../../mesh';
import { StandardMaterial } from '../../../material';
import { once } from '../../../utils/decorators';

export type CollisionInputs = {
    type: 'sphere',
    radius: number,
    debugger?: boolean;
} | {
    type: 'box',
    halfExtents: Vec3,
    debugger?: boolean;
} | {
    type: 'cylinder',
    radiusTop: number,
    radiusBottom: number,
    height: number,
    numSegments: number,
    debugger?: boolean;
};

export const CollisionData: Partial<CollisionInputs> = {
    debugger: false
    // type: 'box',
    // halfExtents: new Vec3(1, 1, 1)
};

export class CollisionComponent extends Component<CollisionInputs> {
    name = 'collision';
    instance!: any;
    private _uuid?: number;
    constructor(inputs: CollisionInputs, entity: Entity, system: ComponentSystem) {
        super(inputs, entity, system);
        copy(inputs, CollisionData);

    }

    initialize() {
        super.initialize();
        let app = this.entity.app as Application<{ physics: CannonPhysicsPlugin }>;
        let physics = app.plugins.physics;
        this.instance = physics.createShape(this.inputs.type, this.inputs);
        if (this.inputs.debugger) {
            let mesh: Mesh;
            switch (this.inputs.type) {
                case 'box':
                    mesh = Mesh.createBox();
                    // let { x, y, z } = this.inputs.halfExtents;
                    // let m = new Mat4().setScale(x, y, z);
                    // mesh.cache.uModelMatrix2 = m;

                    break;
                case 'sphere':
                    mesh = Mesh.createSphere();
                    // x = this.inputs.radius * 2;
                    // m = new Mat4().setScale(x, x, x);
                    // mesh.cache.uModelMatrix2 = m;

                    break;
            }
            this._uuid = mesh!.meshID;
            // mesh!.debugger = true;
            mesh!.name = this.name + 'debugger' + this._uuid!;
            mesh!.material = this.createMaterial();
            this.entity.model.instance.meshs.push(mesh!);
            // app.scene.systems.collision!.createEntity().model.instance.meshs.push(mesh!);
        }
    }
    destroy() {
        super.destroy();
        // let app = this.entity.app as Application<{ physics: CannonPhysicsPlugin }>;
        // if (this._uuid != null) {
        //     app.scene.systems.model!.opacityLayers = app.scene.systems.model!.opacityLayers.filter(x => this._uuid !== x.meshID);
        // }
        this.instance = undefined as any;
    }
    @once
    private createMaterial() {
        let material = new StandardMaterial();
        material.diffuseColor.set(1, 0, 0);
        material.opacity = 0.5;
        return material;
    }
}


