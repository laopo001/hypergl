/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\system.ts
 * Created Date: Friday, October 12th 2018, 9:49:50 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, November 11th 2018, 7:19:05 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Application } from '../application';
import { Entity } from './entity';
import { Component } from './component';
let id = 0;
export abstract class ComponentSystem {
    id = id++;
    app!: Application;
    map: {
        [s: string]: Component<{}>;
    } = {};
    abstract name: string;
    abstract componentConstructor: any;
    entitys: Entity[] = [];
    addComponent(entity: Entity, componentData: any) {
        const component = new this.componentConstructor(componentData) as Component<{}>;
        component.entity = entity;
        this.map[entity.uuid] = component;
        entity[this.name] = component;
    }
    removeComponent() {
        // TODO
    }
}