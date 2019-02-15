/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\script\script.ts
 * Created Date: Saturday, October 13th 2018, 11:56:08 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, February 15th 2019, 2:09:56 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity } from '../../entity';
import { Component } from '../../component';
import { Constructor } from '../../../types';
import { Application } from '../../../application';
export abstract class Script<Inputs, T= {}> {
    static defaultInputs: any = {};
    get app() {
        return Application.getApp<T>();
    }
    entity!: Entity;
    inputs!: Inputs;
    constructor(inputs?: Inputs) {
        this.inputs = inputs!;
    }
    static default() {
        return new (this as any)(this.defaultInputs);
    }
    abstract initialize();
    abstract update(dt: number);
    destroy?();
}
