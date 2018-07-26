/**
 * File: c:\Users\35327\Githubs\hypergl\src\graphics\program\shader.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Sunday, July 15th 2018, 6:08:20 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
<<<<<<< HEAD
 * Last Modified: Friday, July 27th 2018, 1:18:19 am
=======
 * Last Modified: Wednesday, July 25th 2018, 12:24:42 am
>>>>>>> a59a1a480c976e9f2165e74cf2fca136d87fc14f
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */


import { GraphicsDevice } from '../device';
import { SHADERTAG_MATERIAL, UNIFORMTYPE } from '../../hgl';
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
        _typeToPc[gl.BOOL] = UNIFORMTYPE.BOOL;
        _typeToPc[gl.INT] = UNIFORMTYPE.INT;
        _typeToPc[gl.FLOAT] = UNIFORMTYPE.FLOAT;
        _typeToPc[gl.FLOAT_VEC2] = UNIFORMTYPE.FLOAT_VEC2;
        _typeToPc[gl.FLOAT_VEC3] = UNIFORMTYPE.FLOAT_VEC3;
        _typeToPc[gl.FLOAT_VEC4] = UNIFORMTYPE.FLOAT_VEC4;
        _typeToPc[gl.INT_VEC2] = UNIFORMTYPE.INT_VEC2;
        _typeToPc[gl.INT_VEC3] = UNIFORMTYPE.INT_VEC3;
        _typeToPc[gl.INT_VEC4] = UNIFORMTYPE.INT_VEC4;
        _typeToPc[gl.BOOL_VEC2] = UNIFORMTYPE.BOOL_VEC2;
        _typeToPc[gl.BOOL_VEC3] = UNIFORMTYPE.BOOL_VEC3;
        _typeToPc[gl.BOOL_VEC4] = UNIFORMTYPE.BOOL_VEC4;
        _typeToPc[gl.FLOAT_MAT2] = UNIFORMTYPE.FLOAT_MAT2;
        _typeToPc[gl.FLOAT_MAT3] = UNIFORMTYPE.FLOAT_MAT3;
        _typeToPc[gl.FLOAT_MAT4] = UNIFORMTYPE.FLOAT_MAT4;
        _typeToPc[gl.SAMPLER_2D] = UNIFORMTYPE.SAMPLER_2D;
        _typeToPc[gl.SAMPLER_CUBE] = UNIFORMTYPE.SAMPLER_CUBE;
        // if (this.device.webgl2) {
        //     _typeToPc[gl.SAMPLER_2D_SHADOW]   = UNIFORMTYPE.TEXTURE2D_SHADOW;
        //     _typeToPc[gl.SAMPLER_CUBE_SHADOW] = UNIFORMTYPE.TEXTURECUBE_SHADOW;
        //     _typeToPc[gl.SAMPLER_3D]          = UNIFORMTYPE.TEXTURE3D;
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