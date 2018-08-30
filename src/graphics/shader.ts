/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\shader.ts
 * Created Date: Saturday, August 25th 2018, 1:38:57 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, August 30th 2018, 6:54:36 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { RendererPlatform } from './renderer';
import { Log } from '../util';
import { ShaderInput } from './shaderInput';
import { GLType } from '../conf';

export class Shader {
    program?: WebGLProgram;
    vshader?: WebGLShader;
    fshader?: WebGLShader;
    samplers: ShaderInput[] = [];
    uniforms: ShaderInput[] = [];
    attributes: ShaderInput[] = [];
    ready = false;
    constructor(private renderer: RendererPlatform, private definition: {
        attributes: { [s: string]: any };
        vshader: string;
        fshader: string;
        useTransformFeedback?: boolean;
    }) {
        this.compile();
    }
    compile() {
        let gl = this.renderer.gl;
        this.vshader = loadShader(gl, gl.VERTEX_SHADER, this.definition.vshader) as WebGLShader;
        this.fshader = loadShader(gl, gl.FRAGMENT_SHADER, this.definition.fshader) as WebGLShader;
        this.program = createProgram(gl, this.vshader, this.fshader) as WebGLProgram;
    }
    link() {
        if (this.program == null) {
            Log.error('link前,必须compile');
            return;
        }
        let gl = this.renderer.gl;
        if (this.renderer.platform === 'webgl2' && this.definition.useTransformFeedback) {
            // Collect all "out_" attributes and use them for output
            let attrs = this.definition.attributes;
            let outNames: string[] = [];
            // for (let attr in attrs) {
            //     if (attrs.hasOwnProperty(attr)) {
            //         outNames.push('out_' + attr);
            //     }
            // }
            attrs.keys().forEach(attr => {
                outNames.push('out_' + attr);
            });
            // webgl2缓存
            gl.transformFeedbackVaryings(this.program, outNames, gl.INTERLEAVED_ATTRIBS);
        }
        gl.linkProgram(this.program);
        const linked = gl.getProgramParameter(this.program, gl.LINK_STATUS);
        if (!linked) {
            Log.error(gl.getProgramInfoLog(this.program) as string);
        }
        gl.deleteShader(this.vshader as WebGLShader);
        gl.deleteShader(this.fshader as WebGLShader);

        let i = 0;
        // tslint:disable-next-line:one-variable-per-declaration
        let info, location;
        let numAttributes = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
        while (i < numAttributes) {
            info = gl.getActiveAttrib(this.program, i++);
            location = gl.getAttribLocation(this.program, info.name);
            // Check attributes are correctly linked up
            if (this.definition.attributes[info.name] === undefined) {
                Log.error('Vertex shader attribute "' + info.name + '" is not mapped to a semantic in shader definition.');
            }
            // this.attributes.push(new ShaderInput(this.renderer, this.definition.attributes[info.name], this.renderer.glTypeToJs[info.type] as GLType, location));
            this.attributes.push(new ShaderInput(this.renderer, this.definition.attributes[info.name], this.renderer.glTypeToJs[info.type] as GLType, location));
        }
        i = 0;
        let numUniforms = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
        while (i < numUniforms) {
            info = gl.getActiveUniform(this.program, i++);
            location = gl.getUniformLocation(this.program, info.name);
            if (info.type === gl.SAMPLER_2D || info.type === gl.SAMPLER_CUBE ||
                (this.renderer.platform === 'webgl2' && (info.type === gl.SAMPLER_2D_SHADOW || info.type === gl.SAMPLER_CUBE_SHADOW || info.type === gl.SAMPLER_3D))
            ) {
                this.samplers.push(new ShaderInput(this.renderer, info.name, this.renderer.glTypeToJs[info.type] as GLType, location));
            } else {
                this.uniforms.push(new ShaderInput(this.renderer, info.name, this.renderer.glTypeToJs[info.type] as GLType, location));
            }
        }
        this.ready = true;
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
        Log.error(`${gl.VERTEX_SHADER === type ? 'VERTEX_SHADER' : 'FRAGMENT_SHADER'}\n` + gl.getShaderInfoLog(shader) as string);
        return false;
    }
    return shader;
}

