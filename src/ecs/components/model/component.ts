/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\mesh\mesh.ts
 * Created Date: Friday, November 2nd 2018, 1:44:53 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, December 19th 2018, 1:13:34 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, Application, Model, math, Mesh, StandardMaterial, Material } from '../../..';
import { Component } from '../../component';
import { ComponentSystem } from '../../system';
import { Drawable } from '../../../mesh/drawable';

export interface ModelInputs {
    type: 'box' | 'plane' | 'sphere' | 'model',
    model?: Drawable;
    options?: any;
    castShadow?: boolean,
    receiveShadow?: boolean,
    material?: Material;
}
export class ModelComponent<T = StandardMaterial> extends Component<ModelInputs> {
    get material(): T {
        return this._material || this.instance.material;
    }
    set material(x: T) {
        this.instance.material = x as any;
    }
    entity!: Entity;
    instance: Drawable;
    name = 'model';
    private _material;
    constructor(inputs: ModelInputs, entity: Entity, system: ComponentSystem) {
        super(inputs, entity, system);
        // let model = new Model();
        let mesh: Mesh;
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
            case 'model':
                mesh = this.inputs.model as Mesh;
                break;
        }
        this.instance = mesh!;
        ['receiveShadow', 'castShadow'].forEach(key => {
            if (this.inputs[key] !== undefined) {
                this.instance[key] = this.inputs[key];
            }
        });
        if (this.inputs.material) {
            this._material = this.inputs.material;
        }

    }
}
