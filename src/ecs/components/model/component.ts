/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\mesh\mesh.ts
 * Created Date: Friday, November 2nd 2018, 1:44:53 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, March 1st 2019, 1:09:54 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


// import { Entity, Mesh, StandardMaterial, Material, Vec3, Vec2 } from '../../..';
import { Component } from '../../component';
import { ComponentSystem } from '../../system';
import { Drawable, Model, Mesh } from '../../../mesh';
import { Entity } from '../../entity';
import { Material, StandardMaterial } from '../../../material';
import { Vec2, Vec3 } from '../../../math';

export interface Common {
    castShadow?: boolean,
    receiveShadow?: boolean,
    material?: Material;
}

export type ModelInputs = Common & ({
    type: 'cylinder',
    options?: {
        baseRadius?: number;
        peakRadius?: number;
        height?: number;
        heightSegments?: number;
        // capSegments?: number;
        // calculateTangents?: boolean;
    };
} | {
    type: 'model',
    model?: Drawable | Drawable[] | Model;
} | {
    type: 'sphere',
    options?: {
        radius?: number;
        segments?: number;
    }
} | {
    type: 'plane',
    options?: {
        halfExtents?: Vec2,
        widthSegments?: number,
        lengthSegments?: number
    }
} | {
    type: 'box',
    options?: {
        halfExtents?: Vec3;
        widthSegments?: number;
        lengthSegments?: number;
        heightSegments?: number;
    }
});

export class ModelComponent<T extends Material = StandardMaterial> extends Component<ModelInputs> {
    entity!: Entity;
    instance: Model;
    name = 'model';
    get model() {
        return this.instance;
    }
    // _material;
    constructor(inputs: ModelInputs, entity: Entity, system: ComponentSystem) {
        super(inputs, entity, system);
        // let model = new Model();
        let mesh: Drawable;
        switch (this.inputs.type) {
            case 'box':
                mesh = Mesh.createBox(this.inputs.options);
                break;
            case 'plane':
                mesh = Mesh.createPlane(this.inputs.options);
                break;
            case 'sphere':
                mesh = Mesh.createSphere(this.inputs.options);
                break;
            case 'cylinder':
                mesh = Mesh.createCylinder(this.inputs.options);
                break;
            case 'model':
                mesh = this.inputs.model as Drawable;
                break;
        }
        if (this.inputs.type === 'model') {
            if (this.inputs.model instanceof Model) {
                this.instance = this.inputs.model;
            } else if (this.inputs.model instanceof Drawable) {
                this.instance = new Model([this.inputs.model!]);
            } else {
                this.instance = new Model(this.inputs.model!);
            }
        } else {
            this.instance = new Model([mesh!]);
        }
        ['receiveShadow', 'castShadow'].forEach(key => {
            if (this.inputs[key] !== undefined) {
                this.instance.meshs.forEach(drawable => {
                    drawable[key] = this.inputs[key];
                });
            }
        });
        if (this.inputs.material) {
            this.instance.meshs.forEach(drawable => {
                drawable.material = this.inputs.material as any;
            });
        }

    }
    drawable<K extends Drawable = Mesh>(index = 0): K {
        return this.instance.meshs[index] as any;
    }
    material<K extends Material= T>(index = 0): K {
        return this.instance.meshs[index].material as any;
    }
    setMaterial<K extends Material>(index = 0, material: K) {
        this.instance.meshs[index].material = material;
    }
    get length() {
        return this.instance.meshs.length;
    }
}
