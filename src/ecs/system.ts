/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\system.ts
 * Created Date: Friday, October 12th 2018, 9:49:50 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, November 17th 2018, 7:03:31 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Application } from '../application';
import { Entity } from './entity';
import { Component } from './component';
import { Constructor } from 'src/types';
let id = 0;
export abstract class ComponentSystem {
    app!: Application;
    map: {
        [s: string]: Component<{}>;
    } = {};
    abstract name: string;
    abstract componentConstructor: Constructor<Component<{}>>;
    entitys: Entity[] = [];
    addComponent(entity: Entity, componentData: any) {
        const component = new this.componentConstructor(componentData) as Component<{}>;
        component.initialize(entity, this);
        // component.entity = entity;
        // component.system = this;
        this.map[entity.uuid] = component;
        entity[this.name] = component;
        return component;
    }
    removeComponent() {
        // TODO
    }
}