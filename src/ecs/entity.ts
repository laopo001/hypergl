/*
 * ProjectName: hypergl
 * FilePath: \src\component\entity.ts
 * Created Date: Tuesday, August 28th 2018, 1:21:15 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, November 2nd 2018, 3:06:44 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { SceneNode } from '../scene/node';
import { Mesh, Model } from '../mesh';
import { Material } from '../material/material';
import { Component } from './component';
import { Shader } from '../graphics/shader';
import { Log } from '../utils/util';
let EntityID = 0;
export class Entity extends SceneNode {
    EntityID = EntityID++;
    mesh?: Mesh;
    model?: Model;
    boundingBox: any;
    componentList: Component<any>[] = [];
    private _enabled = true;

    constructor() {
        super();
    }
    addComponent(component: Component<any>) {
        this[component.name] = component;
        this.componentList.push(component);
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