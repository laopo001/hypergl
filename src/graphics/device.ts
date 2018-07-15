/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\graphics\device.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Thursday, July 12th 2018, 7:49:57 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, July 15th 2018, 10:49:26 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

type precision = 'highp' | 'mediump' | 'lowp';
type version = 'webgl' | 'webgl2';
export class GraphicsDevice {
    gl: WebGLRenderingContext;
    webgl2: boolean = false;
    buffers = [];
    precision: precision = 'mediump';
    _shaderStats = {
        vsCompiled: 0,
        fsCompiled: 0,
        linked: 0,
        materialShaders: 0,
        compileTime: 0
    };
    constructor(private canvas: HTMLCanvasElement) {
        this.gl = canvas.getContext('webgl');
    }
}