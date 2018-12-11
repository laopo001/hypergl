/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\device.ts
 * Created Date: Wednesday, August 15th 2018, 12:24:29 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, December 11th 2018, 2:13:57 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Log } from '../utils/util';
import { UNIFORM_TYPE, FILTER, FACE } from '../conf';
import { ShaderProgramGenerator } from './shaderProgramGenerator';
import { Undefinedable, FnVoid, AppOption, Nullable } from '../types';
import { Shader } from './shader';
import { IndexBuffer } from './indexBuffer';
import { VertexBuffer } from './vertexBuffer';
import { Entity } from '../ecs/entity';
import { Texture } from '../texture';
import { ShaderVariable } from './shaderVariable';
import { VertexAttribData } from './vertexFormat';
import { ModelComponent } from 'src/ecs/components/model';
export type Platform = 'webgl' | 'webgl2';
export class RendererPlatform {
    get gl() {
        return this.webgl2 || this.webgl;
    }
    glFilter!: number[];
    glAddress!: number[];
    glDrawMode!: number[];
    platform!: Platform;
    AttrbuteType: { [s: string]: number } = {};
    glTypeToJs: { [s: string]: UNIFORM_TYPE } = {};
    uniformFunction: { [s: string]: FnVoid; } = {};
    programGenerator = new ShaderProgramGenerator(this);
    private webgl!: WebGLRenderingContext;
    private webgl2!: WebGL2RenderingContext;
    constructor(public canvas: HTMLCanvasElement, option?: AppOption) {
        let webgl2;
        if (option && !option.webgl1) {
            webgl2 = canvas.getContext('webgl2', option) as any;
        }
        this.webgl2 = webgl2;
        // this.webgl2 = canvas.getContext('webgl2') as any;
        if (this.webgl2) {
            this.platform = 'webgl2';
            Log.debug(`platform:${this.platform}`);
        } else {
            this.webgl = canvas.getContext('webgl', option) as any;
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

        this.uniformFunction[UNIFORM_TYPE.BOOL] = (uniform: ShaderVariable, value) => {
            gl.uniform1i(uniform.locationId, value);

        };
        this.uniformFunction[UNIFORM_TYPE.INT] = this.uniformFunction[UNIFORM_TYPE.BOOL];
        this.uniformFunction[UNIFORM_TYPE.FLOAT] = (uniform, value) => {
            gl.uniform1f(uniform.locationId, value);
        };
        this.uniformFunction[UNIFORM_TYPE.FLOAT_VEC2] = (uniform, value) => {
            gl.uniform2fv(uniform.locationId, value);
        };
        this.uniformFunction[UNIFORM_TYPE.FLOAT_VEC3] = (uniform, value) => {
            gl.uniform3fv(uniform.locationId, value);
        };
        this.uniformFunction[UNIFORM_TYPE.FLOAT_VEC4] = (uniform, value) => {
            gl.uniform4fv(uniform.locationId, value);
        };
        this.uniformFunction[UNIFORM_TYPE.INT_VEC2] = (uniform, value) => {
            gl.uniform2iv(uniform.locationId, value);
        };
        this.uniformFunction[UNIFORM_TYPE.BOOL_VEC2] = this.uniformFunction[UNIFORM_TYPE.INT_VEC2];
        this.uniformFunction[UNIFORM_TYPE.INT_VEC3] = (uniform, value) => {
            gl.uniform3iv(uniform.locationId, value);
        };
        this.uniformFunction[UNIFORM_TYPE.BOOL_VEC3] = this.uniformFunction[UNIFORM_TYPE.INT_VEC3];
        this.uniformFunction[UNIFORM_TYPE.INT_VEC4] = (uniform, value) => {
            gl.uniform4iv(uniform.locationId, value);
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
        this.glFilter = [
            gl.LINEAR,
            gl.LINEAR_MIPMAP_LINEAR,
            gl.LINEAR_MIPMAP_NEAREST,
            gl.NEAREST,
            gl.NEAREST_MIPMAP_NEAREST,
            gl.NEAREST_MIPMAP_LINEAR
        ];
        this.glAddress = [
            gl.REPEAT,
            gl.CLAMP_TO_EDGE,
            gl.MIRRORED_REPEAT
        ];
        this.glDrawMode = [
            gl.POINTS,
            gl.LINES,
            gl.LINE_LOOP,
            gl.LINE_STRIP,
            gl.TRIANGLES,
            gl.TRIANGLE_STRIP,
            gl.TRIANGLE_FAN,
        ];
        let [r, g, b, a] = this._clearColor;
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.POLYGON_OFFSET_FILL);
        gl.polygonOffset(2, 2);
        gl.clearColor(r, g, b, a);
    }
    get contextAttributes() {
        return this.gl.getContextAttributes();
    }
    // tslint:disable-next-line:member-ordering
    currShader!: Shader;
    setShaderProgram(shader: Shader) {
        this.currShader = shader;
        if (shader.ready === false) {
            shader.link();
        }
        this.gl.useProgram(shader.program as WebGLProgram);
    }
    setVertexBuffer(vertexBuffer: VertexBuffer) {
        // const gl = this.gl;
        // gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.bufferId as WebGLBuffer);
        vertexBuffer.bind(this);
    }
    setIndexBuffer(indexBuffer: IndexBuffer) {
        // const gl = this.gl;
        // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.bufferId as WebGLBuffer);
        indexBuffer.bind(this);
    }
    // tslint:disable-next-line:member-ordering
    private _clearColor = [0, 0, 0, 1];
    setClearColor(r: number, g: number, b: number, a: number) {
        this._clearColor = [r, g, b, a];
        this.gl.clearColor(r, g, b, a);
    }
    setColorWrite(writeRed: boolean, writeGreen: boolean, writeBlue: boolean, writeAlpha: boolean) {
        this.gl.colorMask(writeRed, writeGreen, writeBlue, writeAlpha);
    }
    // tslint:disable-next-line:member-ordering
    private _last_scissor = new Array<number>(4);
    setScissor(x: number, y: number, w: number, h: number) {
        const gl = this.gl;
        this._last_scissor[0] = x;
        this._last_scissor[1] = y;
        this._last_scissor[2] = w;
        this._last_scissor[3] = h;
        gl.scissor(x, y, w, h);
    }
    getScissor() {
        return this._last_scissor;
        // const gl = this.gl;
        // return gl.getParameter(gl.SCISSOR_BOX);
    }
    // tslint:disable-next-line:member-ordering
    private _last_viewport = new Array<number>(4);
    setViewport(x: number, y: number, w: number, h: number) {
        const gl = this.gl;
        this._last_viewport[0] = x;
        this._last_viewport[1] = y;
        this._last_viewport[2] = w;
        this._last_viewport[3] = h;
        gl.viewport(x, y, w, h);
    }
    gerViewport() {
        return this._last_viewport;
        // const gl = this.gl;
        // return gl.getParameter(gl.VIEWPORT);
    }
    clear(color = true, depth = true, stencil = true) {
        const gl = this.gl;
        let bits = 0;
        if (color === undefined || color) bits |= gl.COLOR_BUFFER_BIT;
        if (depth === undefined || depth) bits |= gl.DEPTH_BUFFER_BIT;
        if (stencil === undefined || stencil) bits |= gl.STENCIL_BUFFER_BIT;
        gl.clear(bits);
    }
    initDraw(blend = false) {
        const gl = this.gl;
        let [r, g, b, a] = this._clearColor;
        gl.clearColor(r, g, b, a);
        this.clear();
    }
    initTexture(gl: WebGL2RenderingContext, texture: Texture) {
        if (texture.source == null) { Log.error('texture 设置 source' + texture); return; }
        const webglTexture = gl.createTexture() as WebGLTexture;
        if (!texture.isCube) {
            gl.bindTexture(gl.TEXTURE_2D, webglTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, texture.source as any);
        } else {
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, webglTexture); // Bind the object to target
            // gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            for (let face = 0; face < 6; face++) {
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + face, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, texture.source[face]);
            }
        }

        return webglTexture;
    }
    loadTexture(gl: WebGL2RenderingContext, program: WebGLProgram, name: string, texture: Texture, t = 0) {
        if (texture.webglTexture) {
            if (!texture.isCube) {
                let u_Sampler = gl.getUniformLocation(program, name);
                gl.activeTexture(gl['TEXTURE' + t]);
                gl.bindTexture(gl.TEXTURE_2D, texture.webglTexture);
                if (texture.flipY) {
                    // 对纹理图像进行Y轴反转
                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
                }
                if (texture.isPowerOf2()) {
                    gl.generateMipmap(gl.TEXTURE_2D);
                }
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.glFilter[texture.minFilter]);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.glFilter[texture.magFilter]);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.glAddress[texture.wrapU]);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.glAddress[texture.wrapV]);
                gl.uniform1i(u_Sampler, t);
            } else {
                // CUBE
                let u_Sampler = gl.getUniformLocation(program, name);
                gl.activeTexture(gl['TEXTURE' + t]);
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture.webglTexture);
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
                // gl.texParameterf(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_COMPARE_FUNC, gl.LESS);
                // gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
                gl.uniform1i(u_Sampler, t);
            }
        } else {
            texture.webglTexture = this.initTexture(gl, texture);
            this.loadTexture(gl, program, name, texture, t);
        }
        ////////////////////////
        /*
        if (texture.isCube) {
            if (texture.webglTexture) {
                let u_Sampler = gl.getUniformLocation(program, name);
                gl.activeTexture(gl['TEXTURE' + t]);
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
                // gl.texParameterf(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_COMPARE_FUNC, gl.LESS);
                // 向target绑定纹理对象
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture.webglTexture);
                // gl.generateMipmap(gl.TEXTURE_2D);
                gl.uniform1i(u_Sampler, t);
                return;
            }
            return;
        }
        if (texture.webglTexture) {
            let u_Sampler = gl.getUniformLocation(program, name);
            gl.activeTexture(gl['TEXTURE' + t]);
            gl.bindTexture(gl.TEXTURE_2D, texture.webglTexture);
            gl.generateMipmap(gl.TEXTURE_2D);
            gl.uniform1i(u_Sampler, t);
            return;
        }
        if (texture.source == null) { Log.error('texture 设置 source' + texture); return; }
        let u_Sampler = gl.getUniformLocation(program, name);
        const webglTexture = gl.createTexture();
        if (texture.flipY) {
            // 对纹理图像进行Y轴反转
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        }
        // 开启0号纹理单元
        gl.activeTexture(gl['TEXTURE' + t]);
        // 向target绑定纹理对象
        gl.bindTexture(gl.TEXTURE_2D, webglTexture);
        // 配置纹理图像
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, texture.source);
        if (texture.isPowerOf2()) {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.glFilter[texture.minFilter]);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.glFilter[texture.magFilter]);
            gl.generateMipmap(gl.TEXTURE_2D);
        } else {
            // 配置纹理参数
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.glFilter[texture.minFilter]);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.glFilter[texture.magFilter]);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.glAddress[texture.wrapU]);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.glAddress[texture.wrapV]);
        }
        // 将0号纹理传递给着色器
        gl.uniform1i(u_Sampler, t);
        */
    }
    draw(model: ModelComponent) {
        const gl = this.gl;
        const mesh = model.instance;
        const material = model.material;
        if (mesh == null) { return; }
        this.setVertexBuffer(mesh.vertexBuffer);
        if (mesh.indexBuffer) {
            this.setIndexBuffer(mesh.indexBuffer);
        }

        const shader = this.currShader;
        const samplers = shader.samplers;
        const uniforms = shader.uniforms;
        const attributes = shader.attributes;
        const format = mesh.vertexBuffer.format;
        for (let i = 0; i < attributes.length; i++) {
            let attrbute = attributes[i];
            let element: Undefinedable<VertexAttribData>;
            // if (attrbute.element) {
            //     element = attrbute.element;
            // } else {
            element = format.elements.find(x => x.semantic === attrbute.name);
            attrbute.element = element;
            // }

            if (element) {
                gl.vertexAttribPointer(attrbute.locationId, element.size, this.AttrbuteType[(element.dataType as any).name], element.normalize, element.stride, element.offset);
                if (attrbute.enable === false) {
                    gl.enableVertexAttribArray(attrbute.locationId);
                    attrbute.enable = true;
                }
            } else {
                throw new Error('element 为 null');
            }
        }
        Log.assert(shader.checkUniformScope() === true, 'UniformScopValue not set', shader.uniformScope);
        for (let i = 0; i < uniforms.length; i++) {
            let uniform = uniforms[i];
            try {
                this.uniformFunction[uniform.type](uniform, shader.getUniformValue(uniform.name));
            } catch (error) {
                console.log(uniform.name, uniform.type);
            }
        }

        for (let i = 0; i < samplers.length; i++) {
            let sampler = samplers[i];
            let value = shader.getUniformValue(sampler.name) as Texture;
            this.loadTexture(gl, shader.program as WebGLProgram, sampler.name, value, i);
        }
        if (material.cullFace === FACE.NONE) {
            gl.disable(gl.CULL_FACE);
        } else {
            gl.enable(gl.CULL_FACE);
            gl.cullFace(gl[material.cullFace]);
        }

        if (mesh.indexBuffer) {
            let drawFormat;
            if (mesh.indexBuffer.dataType === Uint8Array) {
                drawFormat = gl.UNSIGNED_BYTE;
            } else if (mesh.indexBuffer.dataType === Uint16Array) {
                drawFormat = gl.UNSIGNED_SHORT;
            } else if (mesh.indexBuffer.dataType === Uint32Array) {
                drawFormat = gl.UNSIGNED_INT;
            }
            gl.drawElements(
                this.glDrawMode[mesh.mode],
                mesh.indexBuffer.length,
                drawFormat,
                0
            );
        } else {
            gl.drawArrays(
                this.glDrawMode[mesh.mode],
                0, mesh.vertexBuffer.numVertices);
        }

        // for (let i = 0; i < attributes.length; i++) {
        //     let attrbute = attributes[i];
        //     gl.disableVertexAttribArray(attrbute.locationId);
        //     attrbute.enable = false;
        // }
    }
    enableBLEND() {
        let gl = this.gl;
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }
    disableBLEND() {
        let gl = this.gl;
        gl.disable(gl.BLEND);
    }
}
