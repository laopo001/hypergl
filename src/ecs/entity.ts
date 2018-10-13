/*
 * ProjectName: hypergl
 * FilePath: \src\component\entity.ts
 * Created Date: Tuesday, August 28th 2018, 1:21:15 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, October 13th 2018, 11:01:53 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { SceneNode } from '../scene/node';
import { Mesh } from '../mesh/mesh';
import { Material } from '../material/material';
import { Component } from './component';
import { Shader } from '../graphics/shader';
let EntityID = 0;
export class Entity extends SceneNode {
    enable = true;
    EntityID = EntityID++;
    mesh?: Mesh;
    _shader?: Shader;
    constructor() {
        super();
    }
    addComponent(component: Component<any>) {
        this[component.name] = component;
        // TODO
    }
    get<T>(name: string): T {
        return this[name];
    }
    removeComponent(component: Component<any> | string) {
        // TODO
    }
}