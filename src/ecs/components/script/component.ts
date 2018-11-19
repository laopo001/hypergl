/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\script\component.ts
 * Created Date: Monday, November 19th 2018, 12:42:23 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, November 19th 2018, 5:37:28 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, Application, Model, math, Mesh } from '../../..';
import { Component } from '../../component';
import { Script } from './script';
import { ComponentSystem } from '../../system';
import { Constructor } from '../../../types';

// export interface ScriptInputs<T= {}> {
//     name?: string;
//     script: Constructor<Script<T>>;
//     data: T
// }
export type ScriptInputs = Script<{}>;

export class ScriptComponent extends Component<ScriptInputs> {
    entity!: Entity;
    name = 'script';
    instance: Script<{}>;
    constructor(inputs) {
        super(inputs);
        this.instance = this.inputs;
        if (this.instance.inputs == null) {
            this.instance.inputs = (this.instance.constructor as any).defaultInputs;
        }
    }
    initialize(entity: Entity, system: ComponentSystem) {
        this.entity = entity;
        this.system = system;
        this.instance.entity = entity;
        this.instance.initialize();
    }
}
