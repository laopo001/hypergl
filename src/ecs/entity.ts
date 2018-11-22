/*
 * ProjectName: hypergl
 * FilePath: \src\component\entity.ts
 * Created Date: Tuesday, August 28th 2018, 1:21:15 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, November 22nd 2018, 12:09:54 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Mesh, Model } from '../mesh';
import { CameraComponent, CameraInputs } from './components/camera';
import { LightComponent, LigthInputs } from './components/light';
import { ScriptInputs, Script, ScriptComponent } from './components/script';
import { ModelInputs, ModelComponent } from './components/model';
import { Component } from './component';
import { Shader } from '../graphics/shader';
import { Log } from '../utils/util';
import { Camera } from '../scene/camera';
import { Light } from '../lights';
import { Application } from '../application';
import { ComponentSystem } from './system';
import { Scene, SceneNode } from '../scene';
import { Constructor } from '../types';
let EntityID = 0;

export interface ComponentInputs {
    'camera': CameraInputs,
    'light': LigthInputs,
    'model': ModelInputs,
    'script': ScriptInputs,
}

export type componentName = keyof ComponentInputs;

export class Entity extends SceneNode {
    EntityID = EntityID++;
    mesh?: Mesh;
    model!: ModelComponent;
    camera!: CameraComponent;
    light!: LightComponent;
    script!: ScriptComponent;
    boundingBox: any;
    get app() {
        return Application.getApp();
    }
    enabled = false;
    parent?: Entity;
    readonly children: Entity[] = [];
    constructor(name?: string)
    constructor(options?: { name?: string, tag: string[] })
    constructor(name?) {
        super();
        if (typeof name === 'string') {
            this.name = name;
        } else {
            this.name = name.name;
            this.tag = name.options;
        }
    }
    addComponent<K extends keyof ComponentInputs>(name: K, options: ComponentInputs[K]) {
        const system = this.app.scene.systems[name] as ComponentSystem;
        Log.assert(system != null, name + ' system not register');
        let component = system.addComponent(this, options);
        this[name as string] = component;
        return component;
    }
    addComponents<K extends keyof ComponentInputs>(arr: Array<{ name: K, options: ComponentInputs[K] }>) {
        return arr.map(item => {
            if (this[item.name as any]) {
                return;
            }
            return this.addComponent(item.name, item.options);
        });
    }
    get<T extends keyof Entity>(name: T): Pick<Entity, T> {
        if (this[name] == null) {
            Log.error(name + ' not add component');
        }
        return this[name];
    }

    removeComponent(component: Component<any> | string) {
        // TODO
    }
    addChild(child: Entity) {
        super.addChild(child);
        child.parent = this;
        this.app.scene.add(child);
        if (!this.enabled) {
            child.enabled = false;
        }
    }
    findByName(name: string) {
        if (this.name === name) {
            return this;
        }
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];
            let t = child.findByName(name);
            if (t) {
                return t;
            }
        }
    }

    findByTag(name: string[]) {
        //
    }
}