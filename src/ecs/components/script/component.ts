/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\script\component.ts
 * Created Date: Monday, November 19th 2018, 12:42:23 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, December 19th 2018, 1:23:40 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, Application, Model, math, Mesh } from '../../..';
import { Component } from '../../component';
import { Script } from './script';
import { ComponentSystem } from '../../system';
import { event } from '../../../core';
import { Constructor } from '../../../types';

export type ScriptInputs = Script<{}>[];

export class ScriptComponent extends Component<ScriptInputs> {
    entity!: Entity;
    name = 'script';
    instance: Script<{}>[];
    constructor(inputs: ScriptInputs, entity: Entity, system: ComponentSystem) {
        super(inputs, entity, system);
        this.instance = this.inputs;
        this.instance.forEach(script => {
            if (script.inputs === undefined) {
                script.inputs = (script.constructor as any).defaultInputs;
            }
        });
    }
    initialize() {
        super.initialize();
        this.instance.forEach(script => {
            script.entity = this.entity;
            script.initialize();
        });
        event.on('update', this.update);
    }
    destroy() {
        super.destroy();
        event.off('update', this.update);
        this.instance.forEach(script => {
            script.entity = this.entity;
            // tslint:disable-next-line:no-unused-expression
            script.destroy && script.destroy();
        });
    }
    private update = (e: number) => {
        this.instance.forEach(script => {
            script.update(e);
        });
    }
}
