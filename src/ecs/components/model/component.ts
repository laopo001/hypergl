/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\mesh\mesh.ts
 * Created Date: Friday, November 2nd 2018, 1:44:53 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, December 2nd 2018, 1:56:50 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, Application, Model, math, Mesh, StandardMaterial, Material } from '../../..';
import { Component } from '../../component';
import { ComponentSystem } from '../../system';
import { Drawable } from '../../../mesh/drawable';

export interface ModelInputs {
    type: 'box' | 'plane' | 'model',
    model?: Drawable;
    options?: any;
    castShadow?: boolean,
    receiveShadow?: boolean,
    material?: Material;
}
export class ModelComponent<T = StandardMaterial> extends Component<ModelInputs> {
    entity!: Entity;
    instance: Drawable;
    // get instance() {
    //     return this.instance;
    // }
    get material() {
        return this.instance.material;
    }
    set material(x) {
        this.instance.material = x;
    }
    name = 'model';
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
            this.instance.material = this.inputs.material;
        }

    }
    initialize(entity: Entity, system: ComponentSystem) {
        //
    }
}
