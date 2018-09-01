/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\device.ts
 * Created Date: Wednesday, August 15th 2018, 12:24:29 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, September 1st 2018, 2:51:24 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { Log } from '../util';
import { UNIFORM_TYPE } from '../conf';
import { ShaderProgramGenerator } from './shaderProgramGenerator';
import { Undefined, FnVoid } from '../types';
import { Shader } from './shader';
import { IndexBuffer } from './indexBuffer';
import { VertexBuffer } from './vertexBuffer';
import { Entity } from '../ecs';
export type Platform = 'webgl' | 'webgl2';
export class RendererPlatform {
    get gl() {
        return this.webgl2 || this.webgl;
    }
    platform!: Platform;
    AttrbuteType: { [s: string]: number } = {};
    glTypeToJs: { [s: string]: Undefined<UNIFORM_TYPE> } = {};
    uniformFunction: { [s: string]: FnVoid; } = {};
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
        glTypeToJs[gl.BOOL] = UNIFORM_TYPE.BOOL;
        glTypeToJs[gl.INT] = UNIFORM_TYPE.INT;
        glTypeToJs[gl.FLOAT] = UNIFORM_TYPE.FLOAT;
        glTypeToJs[gl.FLOAT_VEC2] = UNIFORM_TYPE.FLOAT_VEC2;
        glTypeToJs[gl.FLOAT_VEC3] = UNIFORM_TYPE.FLOAT_VEC3;
        glTypeToJs[gl.FLOAT_VEC4] = UNIFORM_TYPE.FLOAT_VEC4;
        glTypeToJs[gl.INT_VEC2] = UNIFORM_TYPE.INT_VEC2;
        glTypeToJs[gl.INT_VEC3] = UNIFORM_TYPE.INT_VEC3;
        glTypeToJs[gl.INT_VEC4] = UNIFORM_TYPE.INT_VEC4;
        glTypeToJs[gl.BOOL_VEC2] = UNIFORM_TYPE.BOOL_VEC2;
        glTypeToJs[gl.BOOL_VEC3] = UNIFORM_TYPE.BOOL_VEC3;
        glTypeToJs[gl.BOOL_VEC4] = UNIFORM_TYPE.BOOL_VEC4;
        glTypeToJs[gl.FLOAT_MAT2] = UNIFORM_TYPE.FLOAT_MAT2;
        glTypeToJs[gl.FLOAT_MAT3] = UNIFORM_TYPE.FLOAT_MAT3;
        glTypeToJs[gl.FLOAT_MAT4] = UNIFORM_TYPE.FLOAT_MAT4;
        glTypeToJs[gl.SAMPLER_2D] = UNIFORM_TYPE.SAMPLER_2D;
        glTypeToJs[gl.SAMPLER_CUBE] = UNIFORM_TYPE.SAMPLER_CUBE;
        if (this.platform === 'webgl2') {
            glTypeToJs[gl.SAMPLER_2D_SHADOW] = UNIFORM_TYPE.SAMPLER_2D_SHADOW;
            glTypeToJs[gl.SAMPLER_CUBE_SHADOW] = UNIFORM_TYPE.SAMPLER_CUBE_SHADOW;
            glTypeToJs[gl.SAMPLER_3D] = UNIFORM_TYPE.SAMPLER_3D;
        }

        this.AttrbuteType = {
            [Int8Array.name]: gl.BYTE,
            [Uint8Array.name]: gl.UNSIGNED_BYTE,
            [Int16Array.name]: gl.SHORT,
            [Uint16Array.name]: gl.UNSIGNED_SHORT,
            [Int32Array.name]: gl.INT,
            [Uint32Array.name]: gl.UNSIGNED_INT,
            [Float32Array.name]: gl.FLOAT,
            [Float64Array.name]: gl.HIGH_FLOAT
        };
        // tslint:disable-next-line:one-variable-per-declaration
        let uniformValue, scopeX, scopeY, scopeZ, scopeW;
        this.uniformFunction[UNIFORM_TYPE.BOOL] = (uniform, value) => {
            if (uniform.value !== value) {
                gl.uniform1i(uniform.locationId, value);
                uniform.value = value;
            }
        };
        this.uniformFunction[UNIFORM_TYPE.INT] = this.uniformFunction[UNIFORM_TYPE.BOOL];
        this.uniformFunction[UNIFORM_TYPE.FLOAT] = (uniform, value) => {
            if (uniform.value !== value) {
                gl.uniform1f(uniform.locationId, value);
                uniform.value = value;
            }
        };
        this.uniformFunction[UNIFORM_TYPE.FLOAT_VEC2] = (uniform, value) => {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY) {
                gl.uniform2fv(uniform.locationId, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
            }
        };
        this.uniformFunction[UNIFORM_TYPE.FLOAT_VEC3] = (uniform, value) => {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            scopeZ = value[2];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY || uniformValue[2] !== scopeZ) {
                gl.uniform3fv(uniform.locationId, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
                uniformValue[2] = scopeZ;
            }
        };
        this.uniformFunction[UNIFORM_TYPE.FLOAT_VEC4] = (uniform, value) => {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            scopeZ = value[2];
            scopeW = value[3];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY || uniformValue[2] !== scopeZ || uniformValue[3] !== scopeW) {
                gl.uniform4fv(uniform.locationId, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
                uniformValue[2] = scopeZ;
                uniformValue[3] = scopeW;
            }
        };
        this.uniformFunction[UNIFORM_TYPE.INT_VEC2] = (uniform, value) => {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY) {
                gl.uniform2iv(uniform.locationId, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
            }
        };
        this.uniformFunction[UNIFORM_TYPE.BOOL_VEC2] = this.uniformFunction[UNIFORM_TYPE.INT_VEC2];
        this.uniformFunction[UNIFORM_TYPE.INT_VEC3] = (uniform, value) => {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            scopeZ = value[2];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY || uniformValue[2] !== scopeZ) {
                gl.uniform3iv(uniform.locationId, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
                uniformValue[2] = scopeZ;
            }
        };
        this.uniformFunction[UNIFORM_TYPE.BOOL_VEC3] = this.uniformFunction[UNIFORM_TYPE.INT_VEC3];
        this.uniformFunction[UNIFORM_TYPE.INT_VEC4] = (uniform, value) => {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            scopeZ = value[2];
            scopeW = value[3];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY || uniformValue[2] !== scopeZ || uniformValue[3] !== scopeW) {
                gl.uniform4iv(uniform.locationId, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
                uniformValue[2] = scopeZ;
                uniformValue[3] = scopeW;
            }
        };
        this.uniformFunction[UNIFORM_TYPE.BOOL_VEC4] = this.uniformFunction[UNIFORM_TYPE.INT_VEC4];
        this.uniformFunction[UNIFORM_TYPE.FLOAT_MAT2] = (uniform, value) => {
            gl.uniformMatrix2fv(uniform.locationId, false, value);
        };
        this.uniformFunction[UNIFORM_TYPE.FLOAT_MAT3] = (uniform, value) => {
            gl.uniformMatrix3fv(uniform.locationId, false, value);
        };
        this.uniformFunction[UNIFORM_TYPE.FLOAT_MAT4] = (uniform, value) => {
            gl.uniformMatrix4fv(uniform.locationId, false, value);
        };
        this.uniformFunction[UNIFORM_TYPE.FLOATARRAY] = (uniform, value) => {
            gl.uniform1fv(uniform.locationId, value);
        };
    }
    setShader(shader: Shader) {
        if (shader.ready === false) {
            shader.link();
        }
        this.gl.useProgram(shader.program as WebGLProgram);
    }
    setVertexBuffer(vertexBuffer: VertexBuffer) {
        // TODO
        vertexBuffer.bind();
    }
    setIndexBuffer(indexBuffer: IndexBuffer) {
        indexBuffer.bind();
    }
    draw(entity: Entity) {
        const gl = this.gl;
        const mesh = entity.mesh;
        if (mesh == null) { return; }
        const material = mesh.material;
        this.setVertexBuffer(mesh.vertexBuffer);
        this.setIndexBuffer(mesh.indexBuffer);
        const shader = material.shader as Shader;
        const samplers = shader.samplers;
        const uniforms = shader.uniforms;
        const attributes = shader.attributes;
        const format = mesh.vertexBuffer.format;
        shader.setUniformValue('matrix_model', entity.getWorldTransform().data);
        for (let i = 0; i < attributes.length; i++) {
            let attrbute = attributes[i];
            let data = format.elements.find(x => x.semantic === attrbute.name);
            if (data) {
                gl.vertexAttribPointer(attrbute.locationId, data.size, this.AttrbuteType[(data.dataType as any).name], data.normalize, data.stride, data.offset);
                gl.enableVertexAttribArray(attrbute.locationId);
            }
        }
        Log.assert(shader.checkUniformScope() === true, 'UniformScopValue not set', shader.uniformScope);
        for (let i = 0; i < uniforms.length; i++) {
            let uniform = uniforms[i];
            this.uniformFunction[uniform.type](uniform, shader.uniformScope[uniform.name]);
        }

        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.DEPTH_BUFFER_BIT);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.drawElements(
            gl.TRIANGLES,
            mesh.indexBuffer.length,
            mesh.indexBuffer.drawFormat,
            0
        );
    }
}