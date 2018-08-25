/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\device.ts
 * Created Date: Wednesday, August 15th 2018, 12:24:29 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 25th 2018, 8:26:01 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { Log } from '../util';
import { GLType } from '../conf';
import { ShaderProgramGenerator } from './shaderProgramGenerator';
import { Undefined } from '../types';
export type Platform = 'webgl' | 'webgl2';
export class RendererPlatform {
    get gl() {
        return this.webgl2 || this.webgl;
    }
    platform!: Platform;
    glTypeToJs: { [s: string]: Undefined<GLType> } = {};
    programGenerator = new ShaderProgramGenerator(this);
    private webgl!: WebGLRenderingContext;
    private webgl2!: WebGL2RenderingContext;
    constructor(canvas: HTMLCanvasElement) {
        this.webgl2 = canvas.getContext('webgl2') as any;
        if (this.webgl2) {
            this.platform = 'webgl2';
            Log.debug(`platform:${this.platform}`);
        } else {
            this.webgl = canvas.getContext('webgl') as any;
            if (this.webgl) {
                this.platform = 'webgl';
                Log.debug(`platform:${this.platform}`);
            } else {
                Log.error('你的浏览器不支持webgl');
            }
        }
        this.init();
    }
    init() {
        let gl = this.gl;
        let glTypeToJs = this.glTypeToJs;
        glTypeToJs[gl.BOOL] = GLType.BOOL;
        glTypeToJs[gl.INT] = GLType.INT;
        glTypeToJs[gl.FLOAT] = GLType.FLOAT;
        glTypeToJs[gl.FLOAT_VEC2] = GLType.FLOAT_VEC2;
        glTypeToJs[gl.FLOAT_VEC3] = GLType.FLOAT_VEC3;
        glTypeToJs[gl.FLOAT_VEC4] = GLType.FLOAT_VEC4;
        glTypeToJs[gl.INT_VEC2] = GLType.INT_VEC2;
        glTypeToJs[gl.INT_VEC3] = GLType.INT_VEC3;
        glTypeToJs[gl.INT_VEC4] = GLType.INT_VEC4;
        glTypeToJs[gl.BOOL_VEC2] = GLType.BOOL_VEC2;
        glTypeToJs[gl.BOOL_VEC3] = GLType.BOOL_VEC3;
        glTypeToJs[gl.BOOL_VEC4] = GLType.BOOL_VEC4;
        glTypeToJs[gl.FLOAT_MAT2] = GLType.FLOAT_MAT2;
        glTypeToJs[gl.FLOAT_MAT3] = GLType.FLOAT_MAT3;
        glTypeToJs[gl.FLOAT_MAT4] = GLType.FLOAT_MAT4;
        glTypeToJs[gl.SAMPLER_2D] = GLType.SAMPLER_2D;
        glTypeToJs[gl.SAMPLER_CUBE] = GLType.SAMPLER_CUBE;
        if (this.platform === 'webgl2') {
            glTypeToJs[gl.SAMPLER_2D_SHADOW] = GLType.SAMPLER_2D_SHADOW;
            glTypeToJs[gl.SAMPLER_CUBE_SHADOW] = GLType.SAMPLER_CUBE_SHADOW;
            glTypeToJs[gl.SAMPLER_3D] = GLType.SAMPLER_3D;
        }
    }

}