/*
 * ProjectName: hypergl
 * FilePath: \src\application.ts
 * Created Date: Saturday, August 18th 2018, 4:20:30 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, November 8th 2018, 12:04:35 am
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
    sceneInstances: Scene[] = [];
    activeIndex = 0;
    renderer: RendererPlatform;
    canvas: HTMLCanvasElement;
    lastRenderTime = 0;
    _isPointerLock = false;
    constructor(canvas: HTMLCanvasElement, option?: AppOption) {
        this.canvas = canvas;
        this.renderer = new RendererPlatform(this.canvas, option);
        this.addScene(new Scene());
        document.addEventListener('pointerlockchange', e => {
            this._isPointerLock = !this._isPointerLock;
        }, false);
    }
    start() {
        if (!this.renderer.viewport) {
            this.renderer.setViewport(0, 0, this.canvas.width, this.canvas.height);
        }
        console.log(this.scene.renderLayers);
        this.tick();
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
    setRequestPointerLock() {
        // this._isPointerLock = true;
        this.canvas.requestPointerLock();
    }
    async loaderObjModel(url: string) {
        let options = await loaderObjModel(url);
        return Mesh.createMesh(options);
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
    get [Symbol.toStringTag]() {
        return 'Application';
    }
}