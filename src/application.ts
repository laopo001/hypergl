/*
 * ProjectName: hypergl
 * FilePath: \src\application.ts
 * Created Date: Saturday, August 18th 2018, 4:20:30 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, September 18th 2018, 11:16:45 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Scene } from './scene/scene';
import { RendererPlatform } from './graphics/renderer';
import { AppOption, FnVoid } from './types';
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
        this.rendererPlatform = new RendererPlatform(this.canvas, option);

        this.sceneInstances.push(new Scene(this));
    }
    createScene() {
        return new Scene(this);
    }
    start() {
        if (!this.rendererPlatform.viewport) {
            this.rendererPlatform.setViewport(0, 0, this.canvas.width, this.canvas.height);
        }

        this.tick();
        console.log(this.scene.layer);
    }
    add(scene: Scene) {
        this.sceneInstances.push(scene);
    }
    on(name: string, cb: FnVoid) {
        event.on(name, cb);
    }
    private tick() {
        // this.scene.renderer();
        event.fire('update');
        this.scene.render();
        window.requestAnimationFrame(this.tick.bind(this));
    }

    private complete() {
        // appendCanvas(this.canvas);
    }
    get [Symbol.toStringTag]() {
        return 'Application';
    }
}