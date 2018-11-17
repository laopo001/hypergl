/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\mesh\mesh.ts
 * Created Date: Friday, November 2nd 2018, 1:44:53 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, November 17th 2018, 8:25:41 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, Application, Model, math, Mesh } from '../../..';
import { Component } from '../../component';

interface ModelInputs {
    type: 'box' | 'plane' | 'model',
    model?: Model;
    options?: any;
}
export class ModelComponent extends Component<ModelInputs> {
    entity!: Entity;
    name = 'model';
    constructor(inputs) {
        super(inputs);
    }
    initialize() {
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
        return model;
    }
}
