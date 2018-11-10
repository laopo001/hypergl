/*
 * ProjectName: hypergl
 * FilePath: \src\component\entity.ts
 * Created Date: Tuesday, August 28th 2018, 1:21:15 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, November 10th 2018, 7:03:40 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { SceneNode } from '../scene/node';
import { Mesh, Model } from '../mesh';
import { CameraComponent, CameraInputs } from './components/camera';
import { Component } from './component';
import { Shader } from '../graphics/shader';
import { Log } from '../utils/util';
import { Camera } from '../scene/camera';
import { Light } from '../lights';
import { Application } from '../application';
let EntityID = 0;

interface ComponentInputs {
    'camera': CameraInputs
}

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
    addComponent<K extends keyof ComponentInputs>(name: K, options: ComponentInputs[K]) {
        let camera = new CameraComponent(options, Application.getApp());
        this[name] = camera.initialize();
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