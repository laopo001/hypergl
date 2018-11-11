/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\system.ts
 * Created Date: Friday, October 12th 2018, 9:49:50 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, November 12th 2018, 1:09:39 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Application } from '../application';
import { Entity } from './entity';
import { Component } from './component';
let id = 0;
export abstract class ComponentSystem {
    app!: Application;
    map: {
        [s: string]: Component<{}>;
    } = {};
    abstract name: string;
    abstract componentConstructor: any;
    entitys: Entity[] = [];
    addComponent(entity: Entity, componentData: any) {
        const component = new this.componentConstructor(componentData) as Component<{}>;
        component.initialize(entity, this);
        // component.entity = entity;
        // component.system = this;
        this.map[entity.uuid] = component;
        entity[this.name] = component;
    }
    removeComponent() {
        // TODO
    }
}