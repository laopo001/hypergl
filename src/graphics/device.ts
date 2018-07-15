/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\graphics\device.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Thursday, July 12th 2018, 7:49:57 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, July 15th 2018, 11:59:00 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

type version = 'webgl' | 'webgl2';
export class GraphicsDevice {
    gl: WebGLRenderingContext;
    webgl2: boolean = false;
    buffers = [];
    constructor(private canvas: HTMLCanvasElement) {
        this.gl = canvas.getContext('webgl');
    }
}