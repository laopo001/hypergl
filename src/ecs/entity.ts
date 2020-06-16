/*
 * ProjectName: hypergl
 * FilePath: \src\component\entity.ts
 * Created Date: Tuesday, August 28th 2018, 1:21:15 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, March 20th 2019, 9:11:24 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { CameraComponent, CameraInputs } from './components/camera';
import { LightComponent, LigthInputs } from './components/light';
import { ScriptInputs, Script, ScriptComponent } from './components/script';
import { ModelInputs, ModelComponent } from './components/model';
import { AudioComponent, AudioInputs } from './components/audio';
import { CollisionComponent, CollisionInputs } from './components/collision';
import { RigidbodyComponent, RigidbodyInputs } from './components/rigidbody';
import { Component } from './component';
import { Log, arrayRemove } from '../utils/util';
import { Application } from '../application';
import { ComponentSystem } from './system';
import { Scene, SceneNode } from '../scene';
import { Constructor, Undefinedable, convertImmutable, Clone } from '../types';
import { ListenerComponent, ListenerInputs } from './components/listener';
import { Vec3 } from '../math';
import deepclone from 'clone';
import { unenumerable } from '../utils/decorators';

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

const createComponent = convertImmutable({
    model: ModelComponent,
    camera: CameraComponent,
    light: LightComponent,
    script: ScriptComponent,
    audio: AudioComponent,
    listener: ListenerComponent,
    collision: CollisionComponent,
    rigidbody: RigidbodyComponent,
});


export type componentName = keyof ComponentInputs;


export class Entity extends SceneNode implements Clone {
    get app() {
        return Application.getApp().unwrap();
    }
    get scene(): Scene {
        let p = this as Entity;
        while (p) {
            if (p.parent == null) {
                break;
            }
            p = p.parent!;
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
                // tslint:disable-next-line:no-unused-expression
                !x.initialized && x.initialize();
            });
        }
        // tslint:disable-next-line:no-unused-expression
        this.children && forChildren(this.children, value);
    }

    EntityID = EntityID++;
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
    readonly components: Component<{}>[] = [];
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
            } else if (typeof name === 'object') {
                this.name = name.name;
                this.tag = name.tag;
            }
        }

    }
    addComponent<K extends keyof ComponentInputs>(name: K, options: ComponentInputs[K]) {
        let component = new (createComponent[name] as Constructor<Component<{}>>)(options, this);
        this[name as string] = component;
        this.components.push(component);
        if (this.scene) {
            if ((name === 'collision' || name === 'rigidbody') && this.scene.systems[name] == null) {
                throw new Error('使用 collision 和 rigidbody组件，必须先初始化物理插件');
            }
            this.scene.systems[name]!.addComponent(this, component);
        }
        return this;
    }
    get<T extends keyof ComponentInputs>(name: T): Entity[T] {
        if (this[name] == null) {
            Log.error(name + ' not add component');
        }
        return this[name];
    }
    removeComponent(component: Component<{}>);
    removeComponent<K extends keyof ComponentInputs>(component: K);
    removeComponent(component) {
        if (typeof component === 'string') {
            // tslint:disable-next-line:no-unused-expression
            this.scene && (this.scene.systems[component] as ComponentSystem).removeComponent(this[component]);
            arrayRemove(this.components, this[component]);
            // this[component].destroy();
            this[component] = null;
        } else {
            // tslint:disable-next-line:no-unused-expression
            this.scene && (this.scene.systems[component.name] as ComponentSystem).removeComponent(component);
            arrayRemove(this.components, component);
            // this[component.name].destroy();
            this[component.name] = null;
        }
        // tslint:disable-next-line:no-unused-expression

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
    removeChild(c: Entity) {
        super.removeChild(c);
        c.enabled = false;
    }
    resolveJSON(obj, d) {
        if (obj.collision) {
            for (let key in obj.collision) {
                if (typeof obj.collision[key] === 'object') {
                    let [x, y, z] = obj.collision[key].data;
                    obj.collision[key] = new Vec3(x, y, z);
                }
            }
            obj.collision.debugger = d;
            this.addComponent('collision', obj.collision);
            // this.scene.systems.collision!.addComponent(this, this.collision);
        }
        if (obj.rigidbody) {
            for (let key in obj.rigidbody) {
                if (typeof obj.rigidbody[key] === 'object') {
                    let [x, y, z] = obj.rigidbody[key].data;
                    obj.rigidbody[key] = new Vec3(x, y, z);
                }
            }
            this.addComponent('rigidbody', obj.rigidbody);
            // this.scene.systems.rigidbody!.addComponent(this, this.rigidbody);
        }
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];
            child.resolveJSON(obj.children[i], d);
        }

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
    findByTag(...tags: Array<string>): Array<Entity> {
        let res: Array<Entity> = [];
        if (includes(this.tag, tags)) {
            res.push(this);
        }
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];
            res = res.concat(child.findByTag(...tags));
        }
        return res;
    }
    destroy() {
        this.components.forEach(c => {
            this.removeComponent(c);
        });
        if (this.scene) {
            let index = this.scene.entitys.findIndex(x => x === this);
            if (index > -1) {
                this.scene.entitys.splice(index, 1);
            }
        }
        this.children.forEach(e => {
            e.destroy();
        });
    }
    clone() {
        let clone = new Entity();
        clone.name = this.name;
        clone.tag = this.tag.map(x => x);
        this.components.forEach(c => {
            clone.addComponent(c.name as any, c.inputs);
        });
        clone.setLocalPosition(this.getLocalPosition());
        clone.setLocalEulerAngles(this.getLocalEulerAngles());
        clone.setLocalScale(this.getLocalScale());
        this.children.forEach(child => {
            clone.addChild(child.clone());
        });
        return clone;
    }
}

function includes<T>(src: Array<T>, searchElements: Array<T>, fromIndex?: number) {
    return searchElements.map(x => src.includes(x), fromIndex).every(x => x === true);
}