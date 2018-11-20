/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\mesh\mesh.ts
 * Created Date: Friday, November 2nd 2018, 1:44:53 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, November 20th 2018, 7:08:21 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, Application, Model, math, Mesh } from '../../..';
import { Component } from '../../component';
import { ComponentSystem } from '../../system';

export interface ModelInputs {
    type: 'box' | 'plane' | 'model',
    model?: Model;
    options?: any;
}
export class ModelComponent extends Component<ModelInputs> {
    entity!: Entity;
    instance: Model;
    name = 'model';
    constructor(inputs) {
        super(inputs);
        let model = new Model();
        let mesh: Mesh;
        switch (this.inputs.type) {
            case 'box':
                mesh = Mesh.createBox(this.inputs.options);
                break;
            case 'plane':
                mesh = Mesh.createPlane(this.inputs.options);
                break;
            case 'model':
                model = this.inputs.model as Model;
                break;
        }
        model.meshs.push(mesh!);
        this.instance = model;
    }
    initialize(entity: Entity, system: ComponentSystem) {
        this.entity = entity;
        this.system = system;
    }
}
