/*
 * ProjectName: hypergl
 * FilePath: \src\component\entity.ts
 * Created Date: Tuesday, August 28th 2018, 1:21:15 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, February 16th 2019, 2:48:08 am
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
import { CollisionComponent, CollisionInputs } from './components/collision';
import { RigidbodyComponent, RigidbodyInputs } from './components/rigidbody';
import { Component } from './component';
import { Shader } from '../graphics/shader';
import { Log } from '../utils/util';
import { Camera } from '../scene/camera';
import { Light } from '../lights';
import { Application } from '../application';
import { ComponentSystem } from './system';
import { Scene, SceneNode } from '../scene';
import { Constructor, Undefinedable } from '../types';
import { Vec3 } from '../math';
import { ListenerComponent, ListenerInputs } from './components/listener';
import { SystemRegistry } from './system-register';
let EntityID = 0;

function forChildren(children: Entity[], value: boolean) {
    children.forEach(c => {
        c.enabled = value;
        forChildren(c.children, value);
    });
}

export interface ComponentInputs {
    'camera': CameraInputs,
    'light': LigthInputs,
    'model': ModelInputs,
    'script': ScriptInputs,
    'audio': AudioInputs,
    'listener': ListenerInputs,
    'collision': CollisionInputs,
    'rigidbody': RigidbodyInputs
}

const createComponent = {
    model: ModelComponent,
    camera: CameraComponent,
    light: LightComponent,
    script: ScriptComponent,
    audio: AudioComponent,
    listener: ListenerComponent,
    collision: CollisionComponent,
    rigidbody: RigidbodyComponent,
};

export type componentName = keyof ComponentInputs;

export class Entity extends SceneNode {
    get app() {
        return Application.getApp();
    }
    get scene(): Scene {
        let p = this as Entity;
        while (p) {
            if (p.parent == null) {
                break;
            }
            p = this.parent!;
        }
        return p._scene;
    }
    _scene!: Scene;
    get enabled() {
        return this._enabled;
    }
    set enabled(value) {
        this._enabled = value;
        if (value) {
            // tslint:disable-next-line:no-unused-expression
            this.components && this.components.forEach(x => {
                x.initialize();
            });
        }
        // tslint:disable-next-line:no-unused-expression
        this.children && forChildren(this.children, value);
    }
    EntityID = EntityID++;
    mesh?: Mesh;
    model!: ModelComponent;
    camera!: CameraComponent;
    light!: LightComponent;
    script!: ScriptComponent;
    audio!: AudioComponent;
    listener!: ListenerComponent;
    collision!: CollisionComponent;
    rigidbody!: RigidbodyComponent;
    boundingBox: any;
    parent?: Entity;
    readonly children: Entity[] = [];
    components: Component<{}>[] = [];
    private _enabled = false;
    constructor(name?: string)
    constructor(options?: { name?: string, tag: string[] })

    constructor(name?: string, tag?: string[])
    constructor(name?, tag?) {
        super();
        if (arguments.length === 2) {
            this.name = name;
            this.tag = tag;
        }
        if (arguments.length === 1) {
            if (typeof name === 'string') {
                this.name = name;
            } else {
                this.name = name.name;
                this.tag = name.options;
            }
        }

    }
    addComponent<K extends keyof ComponentInputs>(name: K, options: ComponentInputs[K]) {
        // const system = this.app.scene.systems[name] as ComponentSystem;
        // Log.assert(system != null, name + ' system not register');
        // let component = system.addComponent(this, options);
        let component = new (createComponent[name] as Constructor<Component<{}>>)(options, this);
        this[name as string] = component;
        this.components.push(component);
        return this;
    }
    get<T extends keyof Entity>(name: T): Pick<Entity, T> {
        if (this[name] == null) {
            Log.error(name + ' not add component');
        }
        return this[name];
    }
    removeComponent(component: Component<{}>);
    removeComponent<K extends keyof ComponentInputs>(component: K);
    removeComponent(component) {
        if (typeof component === 'string') {
            const system = this.app.scene.systems[component] as ComponentSystem;
            Log.assert(system != null, name + ' system not register');
            this.components.splice(this.components.indexOf(this[component]), 1);
            this[component] = null;
            system.removeComponent(this[component]);
        } else {
            const system = this.app.scene.systems[component.name] as ComponentSystem;
            this.components.splice(this.components.indexOf(component), 1);
            this[component.name] = null;
            system.removeComponent(component);
        }
        return this;
    }
    addChild(...children: Entity[]) {
        children.forEach(child => {
            super.addChild(child);
            child.parent = this;

            // tslint:disable-next-line:no-unused-expression
            this.scene && this.scene.add(child);


            if (!this.enabled) {
                child.enabled = false;
            } else {
                child.enabled = true;
            }
        });
        return this;
    }
    findByName(name: string): Undefinedable<Entity> {
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
    findByNameAll(name: string): Array<Entity> {
        let res: Array<Entity> = [];
        if (this.name === name) {
            res.push(this);
        }
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];
            res = res.concat(child.findByNameAll(name));
        }
        return res;
    }
    findByTag(tag: string): Array<Entity> {
        let res: Array<Entity> = [];
        if (this.tag.includes(tag)) {
            res.push(this);
        }
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];
            res = res.concat(child.findByTag(tag));
        }
        return res;
    }
}