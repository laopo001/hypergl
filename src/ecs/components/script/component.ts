/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\script\component.ts
 * Created Date: Monday, November 19th 2018, 12:42:23 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, November 21st 2018, 10:58:13 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, Application, Model, math, Mesh } from '../../..';
import { Component } from '../../component';
import { Script } from './script';
import { ComponentSystem } from '../../system';
import { Constructor } from '../../../types';

export type ScriptInputs = Script<{}>[];

export class ScriptComponent extends Component<ScriptInputs> {
    entity!: Entity;
    name = 'script';
    instance: Script<{}>[];
    constructor(inputs) {
        super(inputs);
        this.instance = this.inputs;
        this.instance.forEach(script => {
            if (script.inputs === undefined) {
                script.inputs = (script.constructor as any).defaultInputs;
            }
        });
    }
    initialize(entity: Entity, system: ComponentSystem) {
        this.entity = entity;
        this.system = system;
        this.instance.forEach(script => {
          script.entity = entity;
          script.initialize();
        });
    }
}
