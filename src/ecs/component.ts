/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\component.ts
 * Created Date: Friday, October 12th 2018, 9:44:47 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, March 14th 2019, 9:19:14 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity } from './entity';
import { Mat4, Vec3 } from '../math';
import { ComponentSystem } from '../ecs/system';
export abstract class Component<Inputs> {
    get enabled() {
        if (!this.entity.enabled) {
            return this.entity.enabled;
        }
        return this._enabled;
    }
    set enabled(value) {
        this._enabled = value;
    }
    initialized = false;
    abstract name: string;

    abstract instance: any;
    attended = false;
    private _enabled = true;
    constructor(public inputs: Inputs, public entity: Entity, public system: ComponentSystem) {
    }
    initialize() {
        this.initialized = true;
    }
    destroy() {
        this.initialized = false;
    }
    getPosition(): Vec3 {
        return this.entity.getPosition();
    }
    getWorldTransform(): Mat4 {
        return this.entity.getWorldTransform();
    }
}
