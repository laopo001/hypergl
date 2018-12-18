/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\script\script.ts
 * Created Date: Saturday, October 13th 2018, 11:56:08 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, December 19th 2018, 12:11:31 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, Application } from '../../..';
import { Component } from '../../component';
import { Constructor } from '../../../types';
export abstract class Script<Inputs> {
    static defaultInputs: any = {};
    get app() {
        return Application.getApp();
    }
    entity!: Entity;
    inputs!: Inputs;
    constructor(inputs: Inputs) {
        this.inputs = inputs!;
    }
    static default() {
        return new (this as any)(this.defaultInputs);
    }
    abstract initialize();
    abstract update(dt: number);
    destroy?();
}
