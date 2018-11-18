/*
 * ProjectName: hypergl
 * FilePath: \src\component\entity.ts
 * Created Date: Tuesday, August 28th 2018, 1:21:15 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, November 19th 2018, 12:33:37 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { SceneNode } from '../scene/node';
import { Mesh, Model } from '../mesh';
import { CameraComponent, CameraInputs } from './components/camera';
import { LightComponent, LigthInputs } from './components/light';
import { ModelInputs } from './components/model';
import { Component } from './component';
import { Shader } from '../graphics/shader';
import { Log } from '../utils/util';
import { Camera } from '../scene/camera';
import { Light } from '../lights';
import { Application } from '../application';
import { ComponentSystem } from './system';
let EntityID = 0;

export interface ComponentInputs {
    'camera': CameraInputs,
    'light': LigthInputs,
    'model': ModelInputs,
}

export type componentName = keyof ComponentInputs;

export class Entity extends SceneNode {
    EntityID = EntityID++;
    mesh?: Mesh;
    model?: Model;
    camera?: Camera;
    light?: Light;
    boundingBox: any;
    app = Application.getApp();
    componentList: Component<any>[] = [];
    private _enabled = true;
    constructor() {
        super();
    }
    addComponent<K extends keyof ComponentInputs>(name: K, options: ComponentInputs[K]) {
        // let camera = new CameraComponent(options);
        // this[name] = camera.initialize();
        const system = this.app.scene.systems[name] as ComponentSystem;
        return system.addComponent(this, options);
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