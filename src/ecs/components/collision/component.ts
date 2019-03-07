/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\collision\component.ts
 * Created Date: Thursday, January 3rd 2019, 8:55:12 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, March 7th 2019, 11:46:37 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */



import { Entity } from '../../entity';
import { Component } from '../../component';
import { Log, input_copy } from '../../../utils/util';
import { Mat4, Vec3 } from '../../../math';
import { ComponentSystem } from '../../system';
import { event, createEvent } from '../../../core';
import { Application } from '../../../application';
import { Mesh } from '../../../mesh';
import { ColorMaterial, StandardMaterial } from '../../../material';
import { once } from '../../../utils/decorators';
import { FACE } from '../../../conf';
import { FnVoid } from '../../../types';

export type CollisionInputs = {
    debugger?: boolean;
    center?: Vec3;
    contact?: (e) => void,
    collisionstart?: (e) => void,
    collisionend?: (e) => void,
    triggerenter?: (e) => void,
} & ({
    type: 'sphere',
    radius: number,
} | {
    type: 'box',
    halfExtents: Vec3,
} | {
    type: 'cylinder',
    // radiusTop: number,
    // radiusBottom: number,
    radius: number,
    height: number,
    axis: 'x' | 'y' | 'z'
});

export const CollisionData: Partial<CollisionInputs> = {
    debugger: false,
    axis: 'y',
    center: new Vec3(0, 0, 0)
    // type: 'box',
    // halfExtents: new Vec3(1, 1, 1)
};

export class CollisionComponent extends Component<CollisionInputs> {
    name = 'collision';
    instance!: any;
    event = createEvent('collision');
    private _meshID?: number;
    constructor(inputs: CollisionInputs, entity: Entity, system: ComponentSystem) {
        super(inputs, entity, system);
        input_copy(inputs, CollisionData);
    }

    async initialize() {
        super.initialize();
        let physics = await this.entity.scene.systems.rigidbody!.asyncPhysics;
        if (physics.type === 'cannon') {
            this.instance = physics.createShape(this.inputs.type, this.inputs);
        }
        if (physics.type === 'ammo') {
            this.instance = physics.createShape(this.inputs.type, this.inputs);
        }
        // tslint:disable-next-line:no-unused-expression
        this.inputs.contact && this.event.on('contact', this.inputs.contact);
        // tslint:disable-next-line:no-unused-expression
        this.inputs.collisionstart && this.event.on('collisionstart', this.inputs.collisionstart);
        // tslint:disable-next-line:no-unused-expression
        this.inputs.collisionend && this.event.on('collisionend', this.inputs.collisionend);
        // tslint:disable-next-line:no-unused-expression
        this.inputs.triggerenter && this.event.on('triggerenter', this.inputs.triggerenter);

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
            this._meshID = mesh!.meshID;
            mesh!.outline = true;
            mesh!.name = this.entity.name + '-' + this.name + '-component';
            mesh!.material = this.createMaterial() as any;
            let e = new Entity({ name: mesh!.name, tag: [this.name, 'debugger'] }).addComponent('model', {
                type: 'model',
                model: mesh!
            });
            let p = this.entity;
            let v = new Vec3(1, 1, 1);
            while (p) {
                if (p.parent == null) {
                    break;
                }
                p = p.parent!;
                v.mul(p.getLocalScale());
            }
            let { x, y, z } = v;
            let localScale = new Vec3(1 / x, 1 / y, 1 / z);
            scale!.mul(localScale);
            e.setLocalScale(scale);
            if (eulerAngles! != null) {
                e.setLocalEulerAngles(eulerAngles!);
            }
            e.setLocalPosition(localScale.mul(this.inputs.center!));
            this.entity.addChild(e);

        }
    }
    on(eventName: 'contact' | 'collisionstart' | 'collisionend' | 'triggerenter', cb: FnVoid) {
        this.event.on(eventName, cb);
    }
    destroy() {
        super.destroy();
        this.instance = undefined as any;
    }
    @once
    private createMaterial() {
        let material = new ColorMaterial();
        material.diffuseColor.set(0, 0, 0);
        material.opacity = 0.1;
        material.cullFace = FACE.BACK;
        return material;
    }
}


