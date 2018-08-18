/*
 * ProjectName: hypergl
 * FilePath: \src\application.ts
 * Created Date: Saturday, August 18th 2018, 4:20:30 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 10:29:46 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { Scene } from './scene/scene';
import { RendererPlatform } from './graphics/renderer';
import { CanvasOption } from './types';
import { createCanvas, appendCanvas } from './graphics/canvas';
export class Application {
    sceneInstances: Scene[] = [new Scene()];
    activeIndex = 0;
    rendererPlatform: RendererPlatform;
    canvas: HTMLCanvasElement;
    get scene() {
        return this.sceneInstances[this.activeIndex];
    }
    constructor(option: CanvasOption) {
        this.canvas = createCanvas(option);
        this.rendererPlatform = new RendererPlatform(this.canvas);
        this.complete();
    }
    start() {
        window.requestAnimationFrame(this.tick);
    }
    add(scene: Scene) {
        this.sceneInstances.push(scene);
    }
    private tick() {
        this.render();
    }
    private render() {
        // TODO
    }
    private complete() {
        appendCanvas(this.canvas);
    }
}