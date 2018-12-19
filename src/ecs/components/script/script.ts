/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\script\script.ts
 * Created Date: Saturday, October 13th 2018, 11:56:08 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, December 19th 2018, 4:07:48 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, Application } from '../../..';
import { Component } from '../../component';
import { Constructor } from '../../../types';
export abstract class Script<Inputs, T= {}> {
    static defaultInputs: any = {};
    get app() {
        return Application.getApp<T>();
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
