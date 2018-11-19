/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\component.ts
 * Created Date: Friday, October 12th 2018, 9:44:47 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, November 19th 2018, 2:59:43 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, Application } from '..';
import { ComponentSystem } from 'src/ecs/system';
export abstract class Component<Inputs> {
    public get enabled() {
        if (!this.entity.enabled) {
            return this.entity.enabled;
        }
        return this._enabled;
    }
    public set enabled(value) {
        this._enabled = value;
    }
    abstract name: string;
    system: any;
    entity!: Entity;
    abstract instance: any;
    private _enabled = true;
    constructor(public inputs: Inputs) {
    }
    abstract initialize(entity: Entity, system: ComponentSystem);
}
