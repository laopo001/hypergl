/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\mesh\mesh.ts
 * Created Date: Friday, November 2nd 2018, 1:44:53 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, December 24th 2018, 7:48:33 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, Application, math, Mesh, StandardMaterial, Material } from '../../..';
import { Component } from '../../component';
import { ComponentSystem } from '../../system';
import { Drawable, Model } from '../../../mesh';

export interface ModelInputs {
    type: 'box' | 'plane' | 'sphere' | 'model',
    model?: Drawable | Drawable[] | Model;
    options?: any;
    castShadow?: boolean,
    receiveShadow?: boolean,
    material?: Material;
}
export class ModelComponent<T = StandardMaterial> extends Component<ModelInputs> {
    get material(): T {
        return this.instance.meshs[0].material as any;
    }
    // set material(x: T) {
    //     this.instance.meshs[0].material = x as any;
    // }
    entity!: Entity;
    instance: Model;
    name = 'model';
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
                this.instance[key] = this.inputs[key];
            }
        });
        if (this.inputs.material) {
            this.instance.meshs.forEach(drawable => {
                drawable.material = this.inputs.material as any;
            });
        }

    }
}
