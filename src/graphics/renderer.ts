/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\device.ts
 * Created Date: Wednesday, August 15th 2018, 12:24:29 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, January 23rd 2019, 12:44:47 am
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
import { Texture, BaseTexture } from '../texture';
import { ShaderVariable } from './shaderVariable';
import { VertexAttribData } from './vertexFormat';
import { ModelComponent } from '../ecs/components/model';
import { cache, time } from '../utils/decorators';
import { Line, Drawable } from '../mesh';
export type Platform = 'webgl' | 'webgl2';
export class RendererPlatform {
    get gl() {
        return this.webgl2 || this.webgl;
    }
    glFilter!: number[];
    glAddress!: number[];
    glDrawMode!: number[];
    platform!: Platform;
    depthTest = false;
    AttrbuteType: { [s: string]: number } = {};
    glTypeToJs: { [s: string]: UNIFORM_TYPE } = {};
    uniformFunction: { [s: string]: FnVoid; } = {};
    programGenerator = new ShaderProgramGenerator(this);
    private webgl!: WebGLRenderingContext;
    private webgl2!: WebGL2RenderingContext;
    constructor(public canvas: HTMLCanvasElement, option: AppOption) {
        option.stencil = option.stencil || true;
        option.webgl1 = option.webgl1 || false;
        option.antialias = option.antialias || true;
        if (option.webgl1) {
            this.webgl = canvas.getContext('webgl', option) as any;
            this.platform = 'webgl';
        } else {
            this.webgl2 = canvas.getContext('webgl2', option) as any;
            this.platform = 'webgl2';
        }
        if (!this.gl) {
            Log.error('你的浏览器不支持webgl');
        }
        Log.debug(`platform:${this.platform}`);
        this.init();
        this.initExtension();
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
        // tslint:disable-next-line:forin
        for (let k in this.uniformFunction) {
            let old = this.uniformFunction[k];
            this.uniformFunction[k] = (uniform, value) => {
                if (value.BYTES_PER_ELEMENT != null) {
                    if (uniform.value == null) {
                        old(uniform, value);
                        uniform.value = new Array(16);
                        uniform.value[0] = value[0];
                        uniform.value[1] = value[1];
                        uniform.value[2] = value[2];
                        uniform.value[3] = value[3];
                        uniform.value[4] = value[4];
                        uniform.value[5] = value[5];
                        uniform.value[6] = value[6];
                        uniform.value[7] = value[7];
                        uniform.value[8] = value[8];
                        uniform.value[9] = value[9];
                        uniform.value[10] = value[10];
                        uniform.value[11] = value[11];
                        uniform.value[12] = value[12];
                        uniform.value[13] = value[13];
                        uniform.value[14] = value[14];
                        uniform.value[15] = value[15];
                        return;
                    }
                    let t = false;
                    for (let i = 0; i < value.length; i++) {
                        const element = value[i];
                        const element2 = uniform.value[i];
                        if (element !== element2) {
                            t = true;
                            break;
                        }
                    }
                    if (t) {
                        old(uniform, value);
                        uniform.value[0] = value[0];
                        uniform.value[1] = value[1];
                        uniform.value[2] = value[2];
                        uniform.value[3] = value[3];
                        uniform.value[4] = value[4];
                        uniform.value[5] = value[5];
                        uniform.value[6] = value[6];
                        uniform.value[7] = value[7];
                        uniform.value[8] = value[8];
                        uniform.value[9] = value[9];
                        uniform.value[10] = value[10];
                        uniform.value[11] = value[11];
                        uniform.value[12] = value[12];
                        uniform.value[13] = value[13];
                        uniform.value[14] = value[14];
                        uniform.value[15] = value[15];
                        return;
                    }
                } else {
                    if (uniform.value !== value) {
                        old(uniform, value);
                        uniform.value = value;
                    }
                }
            };
        }
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

        this.setDepthTest(true);
        // gl.enable(gl.DEPTH_TEST);
        // this.depthTest = true;
        // gl.enable(gl.POLYGON_OFFSET_FILL);
        // gl.polygonOffset(2, 2);
        gl.clearColor(r, g, b, a);
    }
    initExtension() {
        let gl = this.gl;
        gl.getExtension('EXT_shader_texture_lod');
        gl.getExtension('OES_standard_derivatives');
    }
    get contextAttributes() {
        return this.gl.getContextAttributes();
    }
    // tslint:disable-next-line:member-ordering
    currShader!: Shader;
    setDepthTest(enable: boolean) {
        if (this.depthTest !== enable) {
            let gl = this.gl;
            if (enable) {
                gl.enable(gl.DEPTH_TEST);
            } else {
                gl.disable(gl.DEPTH_TEST);
            }
            this.depthTest = enable;
        }
    }
    getDepthTest() {
        return this.depthTest;
    }
    setShaderProgram(shader: Shader) {
        this.currShader = shader;
        if (shader.ready === false) {
            shader.link();
        }
        this.gl.useProgram(shader.program as WebGLProgram);
    }
    setVertexBuffer(vertexBuffer: VertexBuffer) {
        vertexBuffer.bind(this);
    }
    setIndexBuffer(indexBuffer: IndexBuffer) {
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
    }
    @cache
    setLineWidth(width: number) {
        const gl = this.gl;
        gl.lineWidth(width);
    }
    clear(color = true, depth = true, stencil = true) {
        const gl = this.gl;
        let bits = 0;
        if (color) bits |= gl.COLOR_BUFFER_BIT;
        if (depth) bits |= gl.DEPTH_BUFFER_BIT;
        if (stencil) bits |= gl.STENCIL_BUFFER_BIT;
        gl.clear(bits);
    }
    initDraw(blend = false) {
        const gl = this.gl;
        let [r, g, b, a] = this._clearColor;
        gl.clearColor(r, g, b, a);
        this.clear();
    }
    initTexture(texture: BaseTexture) {
        let gl = this.gl;
        if (texture.source == null) { Log.error('texture 设置 source' + texture); return; }
        const webglTexture = texture.webglTexture || gl.createTexture() as WebGLTexture;
        if (!texture.isCube) {
            gl.bindTexture(gl.TEXTURE_2D, webglTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, texture.source as any);
            // gl.bindTexture(gl.TEXTURE_2D, null);
        } else {
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, webglTexture); // Bind the object to target
            for (let face = 0; face < 6; face++) {
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + face, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, texture.source[face]);
            }
            // gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
        }
        texture.isInitialized = true;
        return webglTexture;
    }
    loadTexture(program: WebGLProgram, variable: ShaderVariable, texture: BaseTexture, t = 0) {
        let gl = this.gl;
        if (texture.webglTexture) {
            if (!texture.isInitialized) {
                if (!texture.isCube) {
                    gl.bindTexture(gl.TEXTURE_2D, texture.webglTexture);
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
                    // gl.bindTexture(gl.TEXTURE_2D, null);
                } else {
                    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture.webglTexture); // Bind the object to target
                    for (let face = 0; face < 6; face++) {
                        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + face, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]) as any);
                        // gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + face, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, texture.source[face]);
                    }
                    // gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
                }
                // gl.bindTexture(gl.TEXTURE_2D, texture.webglTexture);
                // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]) as any);
                texture.isInitialized = true;
            }
            if (!texture.isCube) {
                gl.activeTexture(gl.TEXTURE0 + t);
                gl.bindTexture(gl.TEXTURE_2D, texture.webglTexture);
                if (texture.flipY) {
                    // 对纹理图像进行Y轴反转
                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
                }
                if (texture.isPowerOf2()) {
                    if (!texture.isGenerateMipmap) {
                        gl.generateMipmap(gl.TEXTURE_2D);
                        texture.isGenerateMipmap = true;
                    }
                } else {
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.glFilter[texture.minFilter]);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.glFilter[texture.magFilter]);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.glAddress[texture.wrapU]);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.glAddress[texture.wrapV]);
                }
                gl.uniform1i(variable.locationId, t);
            } else {
                // CUBE
                gl.activeTexture(gl.TEXTURE0 + t);
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture.webglTexture);
                if (texture.isPowerOf2()) {
                    if (!texture.isGenerateMipmap) {
                        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
                        texture.isGenerateMipmap = true;
                    }
                } else {
                    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, this.glAddress[texture.wrapU]);
                    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, this.glAddress[texture.wrapV]);
                    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, this.glAddress[texture.wrapR]);
                    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, this.glFilter[texture.minFilter]);
                    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, this.glFilter[texture.magFilter]);
                }
                // gl.texParameterf(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_COMPARE_FUNC, gl.LESS);
                // gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
                gl.uniform1i(variable.locationId, t);
            }
        } else {
            texture.webglTexture = this.initTexture(texture);
            this.loadTexture(program, variable, texture, t);
        }
    }
    // @time
    draw(drawable: Drawable) {
        const gl = this.gl;
        const mesh = drawable;
        const material = drawable.material;
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

            element = format.elements.find(x => x.semantic === attrbute.name);
            attrbute.element = element;

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
            let value = shader.getUniformValue(sampler.name) as BaseTexture;
            this.loadTexture(shader.program as WebGLProgram, sampler, value, i);
        }
        if (material.cullFace === FACE.NONE) {
            gl.disable(gl.CULL_FACE);
        } else {
            gl.enable(gl.CULL_FACE);
            gl.cullFace(gl[material.cullFace]);
        }
        if (mesh instanceof Line) {
            this.setLineWidth(mesh.width);
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
