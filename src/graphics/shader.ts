/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\shader.ts
 * Created Date: Saturday, August 25th 2018, 1:38:57 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 25th 2018, 2:28:41 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { RendererPlatform } from './renderer';
import { Log } from '../util';

export class Shader {
    program?: WebGLProgram;
    vshader?: WebGLShader;
    fshader?: WebGLShader;
    constructor(private renderer: RendererPlatform, private definition: {
        attributes: { [s: string]: any };
        vshader: string;
        fshader: string;
        useTransformFeedback: boolean;
    }) {

    }
    compile() {
        let gl = this.renderer.gl;
        this.vshader = loadShader(gl, gl.VERTEX_SHADER, this.definition.vshader) as WebGLShader;
        this.fshader = loadShader(gl, gl.FRAGMENT_SHADER, this.definition.fshader) as WebGLShader;
        this.program = createProgram(gl, this.definition.vshader, this.definition.fshader) as WebGLProgram;
    }
    link() {
        Log.assert(this.program == null, 'link前,必须compile');
        let gl = this.renderer.gl;
        if (this.renderer.platform === 'webgl2' && this.definition.useTransformFeedback) {
            // Collect all "out_" attributes and use them for output
            let attrs = this.definition.attributes;
            let outNames: string[] = [];
            for (let attr in attrs) {
                if (attrs.hasOwnProperty(attr)) {
                    outNames.push('out_' + attr);
                }
            }
            gl.transformFeedbackVaryings(this.program as WebGLProgram, outNames, gl.INTERLEAVED_ATTRIBS);
        }
        gl.linkProgram(this.program as WebGLProgram);
        const linked = gl.getProgramParameter(this.program as WebGLProgram, gl.LINK_STATUS);
        if (!linked) {
            Log.error(gl.getProgramInfoLog(this.program as WebGLProgram) as string);
        }
        gl.deleteShader(this.vshader as WebGLShader);
        gl.deleteShader(this.fshader as WebGLShader);
    }
}


export function createProgram(gl: WebGLRenderingContext | WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    return program;
}

export function loadShader(gl: WebGLRenderingContext | WebGL2RenderingContext, type: number, source: string) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        Log.error(gl.getShaderInfoLog(shader) as string);
        return false;
    }
    return shader;
}

