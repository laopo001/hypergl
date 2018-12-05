/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\component.ts
 * Created Date: Friday, October 12th 2018, 9:44:47 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, November 28th 2018, 5:35:27 pm
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

    abstract instance: any;
    private _enabled = true;
    constructor(public inputs: Inputs, public entity: Entity, public system: ComponentSystem) {
    }
    abstract initialize(entity: Entity, system: ComponentSystem);
    getPosition() {
        return this.entity.getPosition();
    }
    getWorldTransform() {
        return this.entity.getWorldTransform();
    }
}
