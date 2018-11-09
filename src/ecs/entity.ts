/*
 * ProjectName: hypergl
 * FilePath: \src\component\entity.ts
 * Created Date: Tuesday, August 28th 2018, 1:21:15 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, November 10th 2018, 12:57:25 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { SceneNode } from '../scene/node';
import { Mesh, Model } from '../mesh';
import { CameraComponent } from './components/camera';
import { Component } from './component';
import { Shader } from '../graphics/shader';
import { Log } from '../utils/util';
import { Camera } from '../scene/camera';
import { Light } from '../lights';
let EntityID = 0;
export class Entity extends SceneNode {
    EntityID = EntityID++;
    mesh?: Mesh;
    model?: Model;
    camera?: Camera;
    light?: Light;
    boundingBox: any;
    componentList: Component<any>[] = [];
    private _enabled = true;

    constructor() {
        super();
    }
    addComponent(component: string, options: any) {
        //TODO
    }
    // addComponent(component: Component<any>) {
    //     this[component.name] = component;
    //     this.componentList.push(component);
    // }
    get<T>(name: string): T {
        if (this[name] == null) {
            Log.error(name + ' not add component');
        }
        return this[name];
    }
    registerComponent(component) {
        //
    }

    removeComponent(component: Component<any> | string) {
        // TODO
    }
}