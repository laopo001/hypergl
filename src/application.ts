/*
 * ProjectName: hypergl
 * FilePath: \src\application.ts
 * Created Date: Saturday, August 18th 2018, 4:20:30 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, October 24th 2018, 8:59:03 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Scene } from './scene/scene';
import { RendererPlatform } from './graphics/renderer';
import { AppOption, FnVoid } from './types';
import { event, Timer } from './core';
import { loaderObjModel } from './utils';
import { Mesh } from './mesh/mesh';

const timer = new Timer();
export class Application {
    get scene() {
        return this.sceneInstances[this.activeIndex];
    }
    get isPointerLocked() {
        return this._isPointerLock;
    }
    get [Symbol.toStringTag]() {
        return 'Application';
    }
    sceneInstances: Scene[] = [];
    activeIndex = 0;
    rendererPlatform: RendererPlatform;
    canvas: HTMLCanvasElement;
    lastRenderTime = 0;
    _isPointerLock = false;
    constructor(canvas: HTMLCanvasElement, option?: AppOption) {
        this.canvas = canvas;
        this.rendererPlatform = new RendererPlatform(this.canvas, option);
        this.sceneInstances.push(new Scene(this));
        document.addEventListener('pointerlockchange', e => {
            this._isPointerLock = !this._isPointerLock;
        }, false);
    }
    createScene() {
        return new Scene(this);
    }
    start() {
        if (!this.rendererPlatform.viewport) {
            this.rendererPlatform.setViewport(0, 0, this.canvas.width, this.canvas.height);
        }

        this.tick();
    }
    add(scene: Scene) {
        this.sceneInstances.push(scene);
    }
    on(name: string, cb: FnVoid) {
        event.on(name, cb);
    }
    setRequestPointerLock() {
        // this._isPointerLock = true;
        this.canvas.requestPointerLock();
    }
    async loaderObjModel(url: string) {
        let options = await loaderObjModel(url);
        return Mesh.createMesh(this.rendererPlatform, options);
    }

    private tick() {
        timer.start();
        this.scene.render();
        timer.end();
        event.fire('update', timer.getDuration());
        window.requestAnimationFrame(this.tick.bind(this));
    }

    private complete() {
        // appendCanvas(this.canvas);
    }
}