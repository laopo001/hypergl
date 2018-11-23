/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\mesh\mesh.ts
 * Created Date: Friday, November 2nd 2018, 1:44:53 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, November 24th 2018, 2:24:21 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, Application, Model, math, Mesh, StandardMaterial } from '../../..';
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
    public get material(): StandardMaterial {
        return this.instance.material;
    }
    public set material(x: StandardMaterial) {
        if (!x.meshs.includes(this)) {
            x.meshs.push(this);
        }
        if (this.material) {
            let index = this.material.meshs.indexOf(this);
            if (index > -1) {
                this.material.meshs.splice(index, 1);
            }
        }
        this.instance.material = x;
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
