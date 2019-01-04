/*
 * ProjectName: hypergl
 * FilePath: \src\application.ts
 * Created Date: Saturday, August 18th 2018, 4:20:30 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, January 5th 2019, 12:28:53 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Scene } from './scene/scene';
import { RendererPlatform } from './graphics/renderer';
import { AppOption, FnVoid, Constructor } from './types';
import { event, timer } from './core';
import { Mesh } from './mesh/mesh';
import { SystemRegistry } from './ecs/system-register';
import { CameraComponentSystem } from './ecs/components/camera/system';
import { sleep, Log } from './utils';

export interface PluginClass<T= Plugin> {
    pname: string;
    new(app: Application): T;
}

export class Plugin {
}

let app;

export class Application<T= Plugin> {
    get scene() {
        return this.sceneInstances[this.activeIndex];
    }
    get [Symbol.toStringTag]() {
        return 'Application';
    }
    sceneInstances: Scene[] = [];
    activeIndex = 0;
    renderer: RendererPlatform;
    canvas: HTMLCanvasElement;
    lastRenderTime = 0;
    plugins: T = {} as any;
    // private _isPointerLock = false;
    constructor(canvas: HTMLCanvasElement, option?: AppOption) {
        this.canvas = canvas;
        this.renderer = new RendererPlatform(this.canvas, option);
        this.addScene(new Scene());
        app = this;
        event.fire('application-new', this);
    }
    static getApp<T>(): Application<T> {
        return app;
    }
    static getAsyncApp<T>(): Promise<Application<T>> {
        return new Promise((resolve, reject) => {
            event.on('application-new', () => {
                resolve(app);
            });
        });
    }
    async start() {
        this.renderer.setViewport(0, 0, this.canvas.width, this.canvas.height);
        this.renderer.setScissor(0, 0, this.canvas.width, this.canvas.height);
        await sleep(10);
        this.tick(0);
    }
    addScene(scene: Scene) {
        let i = this.sceneInstances.push(scene);
        scene.app = this;
        return i;
    }
    setScene(index: number) {
        this.activeIndex = index;
    }
    on(name: string, cb: FnVoid) {
        event.on(name, cb);
    }

    registerPlugins(cs: PluginClass[]) {
        cs.forEach(c => {
            if (c.pname in this.plugins) {
                console.error(c.pname + '插件名称已经注册', c);
                return;
            }
            let p = new c(this);
            this.plugins[c.pname] = p;
        });
    }
    // tslint:disable-next-line:member-ordering
    private _start = 0;
    private tick = (timestamp: number) => {
        if (!this._start) this._start = timestamp;
        let progress = timestamp - this._start;
        event.fire('beforeRender');
        // timer.start();
        this.scene.render();
        // timer.end();
        // console.log(timer.getDuration(), progress);
        event.fire('update', progress / 1000);
        event.fire('afterRender');
        requestAnimationFrame(this.tick);
    }
}