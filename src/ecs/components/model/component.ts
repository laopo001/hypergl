/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\mesh\mesh.ts
 * Created Date: Friday, November 2nd 2018, 1:44:53 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, November 21st 2018, 12:01:20 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, Application, Model, math, Mesh, Material } from '../../..';
import { Component } from '../../component';
import { ComponentSystem } from '../../system';

export interface ModelInputs {
    type: 'box' | 'plane' | 'model',
    mesh?: Mesh;
    options?: any;
}
export class ModelComponent extends Component<ModelInputs> {
    entity!: Entity;
    instance: Mesh;
    public get material(): Material {
        return this.instance._material;
    }
    public set material(v: Material) {
        this.instance._material = v;
    }
    get mesh() {
        return this.instance;
    }
    name = 'model';
    constructor(inputs) {
        super(inputs);
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
                mesh = this.inputs.mesh as Mesh;
                break;
        }
        // model.meshs.push(mesh!);
        this.instance = mesh!;
    }
    initialize(entity: Entity, system: ComponentSystem) {
        this.entity = entity;
        this.system = system;
    }
}
