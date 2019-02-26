/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\script\component.ts
 * Created Date: Monday, November 19th 2018, 12:42:23 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, February 26th 2019, 1:47:49 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity } from '../../entity';
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
        this.entity.scene.event.on('update', this.update);
        event.on('update', this.app_update);
    }
    destroy() {
        super.destroy();
        this.entity.scene.event.off('update', this.update);
        event.off('update', this.app_update);
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
    private app_update = (e: number) => {
        this.instance.forEach(script => {
            // tslint:disable-next-line:no-unused-expression
            script.appUpdate && script.appUpdate(e);
        });
    }
}
