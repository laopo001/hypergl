/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\collision\component.ts
 * Created Date: Thursday, January 3rd 2019, 8:55:12 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, January 18th 2019, 6:53:04 pm
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
import { CannonPhysicsPlugin, EVENT, IPhysics } from 'hypergl/plugins/physics';
import { Mesh } from '../../../mesh';
import { ColorMaterial, StandardMaterial } from '../../../material';
import { once } from '../../../utils/decorators';

export type CollisionInputs = {
    debugger?: boolean;
    onCollide?: (e: EVENT) => void
} & ({
    type: 'sphere',
    radius: number,
} | {
    type: 'box',
    halfExtents: Vec3,
} | {
    type: 'cylinder',
    // radiusTop: number,
    //  radiusBottom: number,
    radius: number,
    height: number,
    axis: 'x' | 'y' | 'z'
});

export const CollisionData: Partial<CollisionInputs> = {
    debugger: false,
    axis: 'y'
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
        let app = this.entity.app as Application<{ physics: IPhysics }>;
        let physics = app.plugins.physics;
        if (physics.type === 'cannon') {
            this.instance = physics.createShape(this.inputs.type, this.inputs);
        }
        if (physics.type === 'ammo') {
            this.instance = physics.createShape(this.inputs.type, this.inputs);
        }

        if (this.inputs.debugger) {
            let mesh: Mesh;
            let scale: Vec3;
            let eulerAngles: Vec3;
            switch (this.inputs.type) {
                case 'box':
                    mesh = Mesh.createBox();
                    let { x, y, z } = this.inputs.halfExtents;
                    let { x: a, y: b, z: c } = this.entity.getLocalScale();
                    scale = new Vec3(x * 2, y * 2, z * 2).mul(new Vec3(1 / a, 1 / b, 1 / c));
                    break;
                case 'sphere':
                    mesh = Mesh.createSphere();
                    x = this.inputs.radius * 2;
                    scale = new Vec3(x, x, x);
                    break;
                case 'cylinder':
                    mesh = Mesh.createCylinder({
                        baseRadius: this.inputs.radius,
                        peakRadius: this.inputs.radius,
                        height: this.inputs.height,
                        heightSegments: 20
                    });
                    if (this.inputs.axis === 'x') {
                        eulerAngles = new Vec3(0, 0, 90);
                    }
                    if (this.inputs.axis === 'z') {
                        eulerAngles = new Vec3(90, 0, 0);
                    }
                    scale = new Vec3(1, 1, 1);
                    break;
            }
            this._uuid = mesh!.meshID;

            mesh!.name = this.name + '-debugger-' + this._uuid!;
            mesh!.material = this.createMaterial() as any;
            let e = new Entity({ name: mesh!.name, tag: [this.name] }).addComponent('model', {
                type: 'model',
                model: mesh!
            });

                e.setLocalScale(scale!);

            if (eulerAngles! != null) {
                console.log(eulerAngles!);

                e.setLocalEulerAngles(eulerAngles!);
            }

            this.entity.addChild(e);

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
        let material = new ColorMaterial();
        material.diffuseColor.set(1, 0, 0);
        material.opacity = 0.1;
        return material;
    }
}


