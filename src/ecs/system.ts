/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\system.ts
 * Created Date: Friday, October 12th 2018, 9:49:50 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, November 20th 2018, 11:18:10 pm
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
        const component = new this.componentConstructor(componentData) as Component<{}>;
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