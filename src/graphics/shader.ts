/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\shader.ts
 * Created Date: Saturday, August 25th 2018, 1:38:57 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, October 28th 2018, 11:13:12 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { RendererPlatform } from './renderer';
import { Log } from '../utils/util';
import { ShaderVariable } from './shaderVariable';
import { UNIFORM_TYPE, SEMANTIC } from '../conf';

let ShaderID = 0;
export class Shader {
    ShaderID = ShaderID++;
    program?: WebGLProgram;
    vshader?: WebGLShader;
    fshader?: WebGLShader;
    samplers: ShaderVariable[] = [];
    uniforms: ShaderVariable[] = [];
    attributes: ShaderVariable[] = [];
    uniformScope: { [s: string]: any; } = {};
    ready = false;
    constructor(private renderer: RendererPlatform, private definition: {
        attributes: { [s: string]: SEMANTIC };
        vshader: string;
        fshader: string;
        useTransformFeedback?: boolean;
    }) {
        this.compile();
    }
    setUniformValue(name, value) {
        this.uniformScope[name] = value;
    }
    checkUniformScope() {
        // tslint:disable-next-line:forin
        for (let x in this.uniformScope) {
            if (this.uniformScope[x] == null) {
                console.log(x);
                return false;
            }
        }
        return true;
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
            Object.getOwnPropertyNames(attrs).forEach(attr => {
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

        let numAttributes = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
        while (i < numAttributes) {
            let info = gl.getActiveAttrib(this.program, i++) as WebGLActiveInfo;
            let location = gl.getAttribLocation(this.program, info.name);
            // Check attributes are correctly linked up
            if (this.definition.attributes[info.name] === undefined) {
                Log.error('Vertex shader attribute "' + info.name + '" is not mapped to a semantic in shader definition.');
            }
            // this.attributes.push(new ShaderInput(this.renderer, this.definition.attributes[info.name], this.renderer.glTypeToJs[info.type] as GLType, location));
            this.attributes.push(new ShaderVariable(this.definition.attributes[info.name], this.renderer.glTypeToJs[info.type] as UNIFORM_TYPE, location));
        }
        i = 0;
        let numUniforms = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
        while (i < numUniforms) {
            let info = gl.getActiveUniform(this.program, i++) as WebGLActiveInfo;
            let location = gl.getUniformLocation(this.program, info.name) as number;
            if (info.type === gl.SAMPLER_2D || info.type === gl.SAMPLER_CUBE ||
                (this.renderer.platform === 'webgl2' && (info.type === gl.SAMPLER_2D_SHADOW || info.type === gl.SAMPLER_CUBE_SHADOW || info.type === gl.SAMPLER_3D))
            ) {
                this.samplers.push(new ShaderVariable(info.name, this.renderer.glTypeToJs[info.type] as UNIFORM_TYPE, location));
            } else {
                this.uniforms.push(new ShaderVariable(info.name, this.renderer.glTypeToJs[info.type] as UNIFORM_TYPE, location));
            }
            // tslint:disable-next-line:no-unused-expression
            !this.uniformScope.hasOwnProperty(info.name) && (this.uniformScope[info.name] = null);
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

        let str = source.split('\n').map((x, index) => { return (index) + ' ' + x + '\n'; }).join('');
        Log.error(`${gl.VERTEX_SHADER === type ? 'VERTEX_SHADER' : 'FRAGMENT_SHADER'}\n${gl.getShaderInfoLog(shader) as string}\n${str}`);
        return false;
    }
    return shader;
}

