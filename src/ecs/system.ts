/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\system.ts
 * Created Date: Friday, October 12th 2018, 9:49:50 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, November 28th 2018, 7:20:56 pm
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
    get app() {
        return Application.getApp();
    }
    map: {
        [s: string]: Component<{}>;
    } = {};
    abstract name: string;
    components: Component<{}>[] = [];
    abstract componentConstructor: Constructor<Component<{}>>;
    entitys: Entity[] = [];
    addComponent(entity: Entity, componentData: any) {
        const component = new this.componentConstructor(componentData, entity, this) as Component<{}>;
        component.initialize(entity, this);
        this.map[entity.uuid] = component;
        this.components.push(component);
        return component;
    }
    removeComponent(component) {
        let index = this.components.indexOf(component);
        if (index >= 0) {
            this.components.splice(index, 1);
        }
    }
}