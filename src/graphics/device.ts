/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\graphics\device.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Thursday, July 12th 2018, 7:49:57 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, July 25th 2018, 12:53:12 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */


import { ScopeSpace } from './program/scope-space';
type precision = 'highp' | 'mediump' | 'lowp';
type version = 'webgl' | 'webgl2';
export class GraphicsDevice {
    gl: WebGLRenderingContext;
    webgl2: boolean = false;
    buffers = [];
    scope: ScopeSpace;
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
        this.scope = new ScopeSpace('Device');
    }
}