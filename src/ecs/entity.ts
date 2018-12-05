/*
 * ProjectName: hypergl
 * FilePath: \src\component\entity.ts
 * Created Date: Tuesday, August 28th 2018, 1:21:15 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, December 4th 2018, 5:28:27 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Mesh, Model } from '../mesh';
import { CameraComponent, CameraInputs } from './components/camera';
import { LightComponent, LigthInputs } from './components/light';
import { ScriptInputs, Script, ScriptComponent } from './components/script';
import { ModelInputs, ModelComponent } from './components/model';
import { AudioComponent, AudioInputs } from './components/audio';
import { Component } from './component';
import { Shader } from '../graphics/shader';
import { Log } from '../utils/util';
import { Camera } from '../scene/camera';
import { Light } from '../lights';
import { Application } from '../application';
import { ComponentSystem } from './system';
import { Scene, SceneNode } from '../scene';
import { Constructor } from '../types';
import { Vec3 } from '../math';
import { ListenerComponent, ListenerInputs } from './components/listener';
let EntityID = 0;

export interface ComponentInputs {
    'camera': CameraInputs,
    'light': LigthInputs,
    'model': ModelInputs,
    'script': ScriptInputs,
    'audio': AudioInputs,
    'listener': ListenerInputs,
}

export type componentName = keyof ComponentInputs;

export class Entity extends SceneNode {
    EntityID = EntityID++;
    mesh?: Mesh;
    model!: ModelComponent;
    camera!: CameraComponent;
    light!: LightComponent;
    script!: ScriptComponent;
    audio!: AudioComponent;
    listener!: ListenerComponent;
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
        if (typeof name === 'undefined') {
            //
        }
        else if (typeof name === 'string') {
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
        return this;
    }
    addComponents<K extends keyof ComponentInputs>(arr: Array<{ name: K, options: ComponentInputs[K] }>) {
        arr.map(item => {
            if (this[item.name as any]) {
                return;
            }
            return this.addComponent(item.name, item.options);
        });
        return this;
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
        return this;
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