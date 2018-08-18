/*
 * ProjectName: hypergl
 * FilePath: \src\application.ts
 * Created Date: Saturday, August 18th 2018, 4:20:30 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 5:17:37 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { Scene } from './scene';
import { RendererPlatform } from './graphics/renderer';
import { CanvasOption } from './types';
import { createCanvas, appendCanvas } from './graphics/canvas';
export class Application {
    sceneInstances: Scene[] = [];
    activeIndex = 0;
    device: RendererPlatform;
    canvas: HTMLCanvasElement;
    constructor(option: CanvasOption) {
        this.canvas = createCanvas(option);
        this.device = new RendererPlatform(this.canvas);
        this.complete();
    }
    start() {
        let scene = this.sceneInstances[this.activeIndex];
    }
    add(scene: Scene) {
        this.sceneInstances.push(scene);
    }
    private tick() {
        // TODO
    }
    private complete() {
        appendCanvas(this.canvas);
    }
}