/**
 * File: c:\Users\35327\Githubs\hypergl\src\graphics\program\program.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Sunday, July 15th 2018, 1:34:34 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, July 15th 2018, 5:22:44 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */


import { GraphicsDevice } from '../device';

export class Program {
    program;
    attributes = [];
    uniforms = [];
    samplers = [];
    constructor(private device: GraphicsDevice) {
        const { gl } = device;
        this.program = gl.createProgram();
    }
    create(vshaderSource: string, fshaderSource: string) {
        // this.program.
        const { gl } = this.device;
        const { program } = this;
        const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vshaderSource);
        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(vertexShader));
            return false;
        }
        const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fshaderSource);
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(fragmentShader));
            return false;
        }
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {
            console.log(gl.getProgramInfoLog(program));
            return false;
        }
        gl.useProgram(program);
        return true;
    }
    private loadShader(gl: WebGLRenderingContext, type: number, source: string) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
    }
}