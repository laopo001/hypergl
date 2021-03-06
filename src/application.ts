/*
 * ProjectName: hypergl
 * FilePath: \src\application.ts
 * Created Date: Saturday, August 18th 2018, 4:20:30 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, April 1st 2019, 11:50:25 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Scene } from './scene/scene';
import { RendererPlatform } from './graphics/renderer';
import { AppOption, FnVoid, Constructor, DeepImmutable, GLTFSerialize, PhysiceConfig } from './types';
import { event, timer, Option } from './core';
import { Mesh } from './mesh/mesh';
import { SystemRegistry } from './ecs/system-register';
import { CameraComponentSystem } from './ecs/components/camera/system';
import { sleep, Log } from './utils';
// tslint:disable-next-line:no-duplicate-imports
import * as util from './utils';
import { scene } from '../demo/index19/scene-tank';
import { Entity } from './ecs';
export interface PluginClass<T= Plugin> {
    pname: string;
    new(app: Application): T;
}

export interface Plugin {
}

let app = new Option<Application<any>>();

export class Application<T= Plugin> implements GLTFSerialize, PhysiceConfig {
    get scene() {
        if (!this._scene) {
            this.addScene(new Scene('default'));
            this.setActiveScene(0);
        }
        return this._scene;
    }
    get [Symbol.toStringTag]() {
        return 'Application';
    }
    util = util;
    sceneInstances: Scene[] = [];
    activeIndex = 0;
    renderer: RendererPlatform;
    canvas: HTMLCanvasElement;
    lastRenderTime = 0;
    plugins: DeepImmutable<T> = {} as any;
    private _scene!: Scene;
    // tslint:disable-next-line:member-ordering
    private _start = 0;
    // private _isPointerLock = false;
    constructor(canvas: HTMLCanvasElement, option: AppOption = {}) {
        this.canvas = canvas;
        this.renderer = new RendererPlatform(this.canvas, option);
        app.setValue(this);
        event.fire('application-new', this);
    }
    static getApp<T>(): Option<Application<T>> {
        return app;
    }
    static getAsyncApp<T>(): Promise<Application<T>> {
        return app.toPromise();
    }
    start() {
        this.renderer.setViewport(0, 0, this.canvas.width, this.canvas.height);
        this.renderer.setScissor(0, 0, this.canvas.width, this.canvas.height);
        if (!this.scene) {
            Log.error('not set active scene');
        }
        // await sleep(10);
        event.fire('start');
        this.tick(0);
    }
    addScene(scene: Scene) {
        let i = this.sceneInstances.push(scene);
        scene.app = this;
        scene.isRegistered = true;
        scene.event.fire('register');
        return i;
    }
    setActiveScene(index: number | string) {
        let scene;
        if (typeof index === 'string') {
            let i = this.sceneInstances.findIndex((x) => index === x.name);
            scene = this.sceneInstances[i];
        } else {
            scene = this.sceneInstances[index];
        }
        if (scene == null) {
            Log.error('scene not found');
        }
        if (this._scene) {
            this._scene.event.fire('inactive');
        }
        this._scene = scene;
        scene.event.fire('active');
    }
    on(name: string, cb: FnVoid) {
        event.on(name, cb);
    }

    registerPlugins(cs: PluginClass[]) {
        for (let i = 0; i < cs.length; i++) {
            const c = cs[i];
            if (c.pname in this.plugins) {
                console.error(c.pname + '插件名称已经注册', c);
                return;
            }
            let p = new c(this) as any;
            if (p.initialize) {
                p.initialize();
            }
            this.plugins[c.pname] = p;
        }
    }
    exportGltf() {
        return '';
    }
    exportPhysiceConfig() {
        let format = (root: Entity) => {
            let obj = {} as any;
            if (root.collision != null && root.rigidbody != null) {
                obj.collision = root.collision.inputs;
                obj.rigidbody = root.rigidbody.inputs;
            }
            obj.name = root.name;
            let children = root.children.map((node, index) => {
                return format(node);
            });
            if (children.length > 0) {
                obj.children = children;
            }
            return obj;
        };
        let res = {
            name: this.scene.name,
            root: format(this.scene.root)
        };

        return JSON.stringify(res);
    }
    private tick = (timestamp: number) => {
        let dt = timestamp - this._start;
        event.fire('beforeRender');
        this.scene.render();
        event.fire('update', dt / 1000);
        event.fire('afterRender');
        this._start = timestamp;
        requestAnimationFrame(this.tick);
    }
}