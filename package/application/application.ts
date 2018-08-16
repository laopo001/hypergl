/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\application\application.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Thursday, July 12th 2018, 7:51:04 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, July 15th 2018, 3:49:02 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */


import { Scene } from '../scene/scene';
import { GraphicsDevice } from '../graphics/device';

export class Application {
    sceneInstances: Scene[];
    activeIndex = 0;
    device: GraphicsDevice;
    constructor(canvas: HTMLCanvasElement, option?: any) {
        this.device = new GraphicsDevice(canvas);
    }
    start() {
        let scene = this.sceneInstances[this.activeIndex];
    }
    add(scene: Scene) {
        this.sceneInstances.push(scene);
    }
}