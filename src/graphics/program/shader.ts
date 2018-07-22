/**
 * File: c:\Users\35327\Githubs\hypergl\src\graphics\program\shader.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Sunday, July 15th 2018, 6:08:20 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, July 23rd 2018, 12:32:06 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */


import { GraphicsDevice } from '../device';
import { SHADERTAG_MATERIAL } from '../../hgl';
import { ShaderInput } from './shader-input';

function addLineNumbers(src) {
    let chunks = src.split('\n');

    // Chrome reports shader errors on lines indexed from 1
    for (let i = 0, len = chunks.length; i < len; i++) {
        chunks[i] = (i + 1) + ':\t' + chunks[i];
    }

    return chunks.join('\n');
}

function createShader(gl: WebGLRenderingContext, type, src): WebGLShader {
    let shader = gl.createShader(type);

    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    return shader;
}

function createProgram(gl: WebGLRenderingContext, vertexShader, fragmentShader): WebGLProgram {
    let program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    return program;
}

interface Definition {
    attributes: {
        [key: string]: number
    };
    vshader: string;
    fshader: string;
    tag?;
    useTransformFeedback?: boolean;
}
export class Shader {
    vshader: WebGLShader;
    fshader: WebGLShader;
    program: WebGLProgram;
    attributes;
    uniforms;
    samplers;
    constructor(private device: GraphicsDevice, private definition: Definition) {

    }
    compile() {
        let gl = this.device.gl;
        let startTime = new Date().getTime();

        this.vshader = createShader(gl, gl.VERTEX_SHADER, this.definition.vshader);
        this.fshader = createShader(gl, gl.FRAGMENT_SHADER, this.definition.fshader);
        this.program = createProgram(gl, this.vshader, this.fshader);
        this.device._shaderStats.vsCompiled++;
        this.device._shaderStats.fsCompiled++;
        this.device._shaderStats.linked++;
        if (this.definition.tag === SHADERTAG_MATERIAL) {
            this.device._shaderStats.materialShaders++;
        }
        this.device._shaderStats.compileTime += new Date().getTime() - startTime;
    }
    link() {
        let gl = this.device.gl;
        let retValue = true;

        let startTime = new Date().getTime();

        if (this.device.webgl2 && this.definition.useTransformFeedback) {
            // Collect all "out_" attributes and use them for output
            let attrs = this.definition.attributes;
            let outNames = [];
            for (let attr in attrs) {
                if (attrs.hasOwnProperty(attr)) {
                    outNames.push('out_' + attr);
                }
            }
            // gl.transformFeedbackVaryings(this.program, outNames, gl.INTERLEAVED_ATTRIBS);
        }

        gl.linkProgram(this.program);

        // check for errors
        // vshader
        if (!gl.getShaderParameter(this.vshader, gl.COMPILE_STATUS)) {
            console.error('Failed to compile vertex shader:\n\n' + addLineNumbers(this.definition.vshader) + '\n\n' + gl.getShaderInfoLog(this.vshader));
            retValue = false;
        }
        // fshader
        if (!gl.getShaderParameter(this.fshader, gl.COMPILE_STATUS)) {
            console.error('Failed to compile fragment shader:\n\n' + addLineNumbers(this.definition.fshader) + '\n\n' + gl.getShaderInfoLog(this.fshader));
            retValue = false;
        }
        // program
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            console.error('Failed to link shader program. Error: ' + gl.getProgramInfoLog(this.program));
            retValue = false;
        }

        gl.deleteShader(this.vshader);
        gl.deleteShader(this.fshader);

        this.attributes = [];
        this.uniforms = [];
        this.samplers = [];

        let i = 0;
        // tslint:disable-next-line:one-variable-per-declaration
        let info, location;

        let _typeToPc = {};
        _typeToPc[gl.BOOL] = pc.UNIFORMTYPE_BOOL;
        _typeToPc[gl.INT] = pc.UNIFORMTYPE_INT;
        _typeToPc[gl.FLOAT] = pc.UNIFORMTYPE_FLOAT;
        _typeToPc[gl.FLOAT_VEC2] = pc.UNIFORMTYPE_VEC2;
        _typeToPc[gl.FLOAT_VEC3] = pc.UNIFORMTYPE_VEC3;
        _typeToPc[gl.FLOAT_VEC4] = pc.UNIFORMTYPE_VEC4;
        _typeToPc[gl.INT_VEC2] = pc.UNIFORMTYPE_IVEC2;
        _typeToPc[gl.INT_VEC3] = pc.UNIFORMTYPE_IVEC3;
        _typeToPc[gl.INT_VEC4] = pc.UNIFORMTYPE_IVEC4;
        _typeToPc[gl.BOOL_VEC2] = pc.UNIFORMTYPE_BVEC2;
        _typeToPc[gl.BOOL_VEC3] = pc.UNIFORMTYPE_BVEC3;
        _typeToPc[gl.BOOL_VEC4] = pc.UNIFORMTYPE_BVEC4;
        _typeToPc[gl.FLOAT_MAT2] = pc.UNIFORMTYPE_MAT2;
        _typeToPc[gl.FLOAT_MAT3] = pc.UNIFORMTYPE_MAT3;
        _typeToPc[gl.FLOAT_MAT4] = pc.UNIFORMTYPE_MAT4;
        _typeToPc[gl.SAMPLER_2D] = pc.UNIFORMTYPE_TEXTURE2D;
        _typeToPc[gl.SAMPLER_CUBE] = pc.UNIFORMTYPE_TEXTURECUBE;
        // if (this.device.webgl2) {
        //     _typeToPc[gl.SAMPLER_2D_SHADOW]   = pc.UNIFORMTYPE_TEXTURE2D_SHADOW;
        //     _typeToPc[gl.SAMPLER_CUBE_SHADOW] = pc.UNIFORMTYPE_TEXTURECUBE_SHADOW;
        //     _typeToPc[gl.SAMPLER_3D]          = pc.UNIFORMTYPE_TEXTURE3D;
        // }

        let numAttributes = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
        while (i < numAttributes) {
            info = gl.getActiveAttrib(this.program, i++);
            location = gl.getAttribLocation(this.program, info.name);

            // Check attributes are correctly linked up
            if (this.definition.attributes[info.name] === undefined) {
                console.error('Vertex shader attribute "' + info.name + '" is not mapped to a semantic in shader definition.');
            }

            this.attributes.push(new ShaderInput(this.device, this.definition.attributes[info.name], _typeToPc[info.type], location));
        }

        // Query the program for each shader state (GLSL 'uniform')
        i = 0;
        let numUniforms = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
        while (i < numUniforms) {
            info = gl.getActiveUniform(this.program, i++);
            location = gl.getUniformLocation(this.program, info.name);
            //     if (info.type === gl.SAMPLER_2D || info.type === gl.SAMPLER_CUBE ||
            //         (this.device.webgl2 && (info.type === gl.SAMPLER_2D_SHADOW || info.type === gl.SAMPLER_CUBE_SHADOW || info.type === gl.SAMPLER_3D))
            //     ) {
            //         this.samplers.push(new pc.ShaderInput(this.device, info.name, _typeToPc[info.type], location));
            //     } else {
            //         this.uniforms.push(new pc.ShaderInput(this.device, info.name, _typeToPc[info.type], location));
            //     }
            // }


            // this.ready = true;

            // #ifdef PROFILER
            let endTime = new Date().getTime();

            this.device._shaderStats.compileTime += endTime - startTime;
            // #endif

            return retValue;
        }
    }
}