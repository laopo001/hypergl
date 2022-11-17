/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\system.ts
 * Created Date: Friday, October 12th 2018, 9:49:50 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, March 8th 2019, 12:37:44 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Application } from '../application';
import { Entity } from './entity';
import { Component } from './component';
import { Constructor } from '../types';
import { Scene } from '../scene';
let id = 0;
export abstract class ComponentSystem {
    get app() {
        return Application.getApp().unwrap();
    }
    scene!: Scene;
    map: {
        [s: string]: Component<{}>;
    } = {};
    abstract name: string;
    components: Component<{}>[] = [];
    abstract componentConstructor: Constructor<Component<{}>>;
    entitys: Entity[] = [];
    constructor(private scece: Scene) { }
    addComponent(entity: Entity, component: Component<{}>): void {
        this.map[entity.uuid] = component;
        this.components.push(component);
    }
    removeComponent(component: Component<{}>) {
        component.destroy();
        let index = this.components.indexOf(component);
        if (index >= 0) {
            this.components.splice(index, 1);
        }
    }
}