/*
 * ProjectName: hypergl
 * FilePath: \src\component\entity.ts
 * Created Date: Tuesday, August 28th 2018, 1:21:15 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, October 14th 2018, 12:10:21 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { SceneNode } from '../scene/node';
import { Mesh } from '../mesh/mesh';
import { Material } from '../material/material';
import { Component } from './component';
import { Shader } from '../graphics/shader';
import { Log } from '../util';
let EntityID = 0;
export class Entity extends SceneNode {
    EntityID = EntityID++;
    mesh?: Mesh;
    _shader?: Shader;
    private _enabled = true;
    constructor() {
        super();
    }
    addComponent(component: Component<any>) {
        this[component.name] = component;
        // TODO
    }
    get<T>(name: string): T {
        if (this[name] == null) {
            Log.error(name + ' not add component');
        }
        return this[name];
    }
    removeComponent(component: Component<any> | string) {
        // TODO
    }
}