/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\component.ts
 * Created Date: Friday, October 12th 2018, 9:44:47 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, January 1st 2019, 2:14:58 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, Application } from '..';
import { ComponentSystem } from '../ecs/system';
export abstract class Component<Inputs> {
    initialized = false;
    get enabled() {
        if (!this.entity.enabled) {
            return this.entity.enabled;
        }
        return this._enabled;
    }
    set enabled(value) {
        this._enabled = value;
    }
    abstract name: string;

    abstract instance: any;
    private _enabled = true;
    constructor(public inputs: Inputs, public entity: Entity, public system: ComponentSystem) {
    }
    initialize() {
        this.initialized = true;
    }
    destroy() {
        this.initialized = false;
    }
    getPosition() {
        return this.entity.getPosition();
    }
    getWorldTransform() {
        return this.entity.getWorldTransform();
    }
}
