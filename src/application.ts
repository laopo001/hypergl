/*
 * ProjectName: hypergl
 * FilePath: \src\application.ts
 * Created Date: Saturday, August 18th 2018, 4:20:30 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 11:50:47 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { Scene } from './scene/scene';
import { RendererPlatform } from './graphics/renderer';
import { AppOption } from './types';

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
    }
    start() {
        window.requestAnimationFrame(this.tick);
    }
    add(scene: Scene) {
        this.sceneInstances.push(scene);
    }
    private tick() {
        this.scene.renderer();
    }

    private complete() {
        // appendCanvas(this.canvas);
    }
}