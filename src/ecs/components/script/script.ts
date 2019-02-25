/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\script\script.ts
 * Created Date: Saturday, October 13th 2018, 11:56:08 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, February 25th 2019, 11:25:50 am
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
        return Application.getApp<T>().unwrap();
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
    abstract destroy?();
}
