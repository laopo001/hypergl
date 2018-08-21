/*
 * ProjectName: hypergl
 * FilePath: \src\application.ts
 * Created Date: Saturday, August 18th 2018, 4:20:30 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, August 22nd 2018, 1:50:27 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { Scene } from './scene/scene';
import { RendererPlatform } from './graphics/renderer';
import { AppOption } from './types';
import { event } from './core/event';
export class Application {
    sceneInstances: Scene[] = [];
    activeIndex = 0;
    rendererPlatform: RendererPlatform;
    canvas: HTMLCanvasElement;
    get scene() {
        return this.sceneInstances[this.activeIndex];
    }
    constructor(canvas: HTMLCanvasElement, option?: AppOption) {
        this.canvas = canvas;
        this.rendererPlatform = new RendererPlatform(this.canvas);
        this.sceneInstances.push(new Scene(this));
        this.start();
    }
    start() {
        this.tick();
    }
    add(scene: Scene) {
        this.sceneInstances.push(scene);
    }
    addEventListen(cb) {
        event.on('update', cb);
    }
    private tick() {
        // this.scene.renderer();
        event.fire('update');
        window.requestAnimationFrame(this.tick.bind(this));
    }

    private complete() {
        // appendCanvas(this.canvas);
    }
    get [Symbol.toStringTag]() {
        return 'Application';
    }
}