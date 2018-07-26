/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\graphics\device.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Thursday, July 12th 2018, 7:49:57 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, July 27th 2018, 12:06:59 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */


import { ScopeSpace } from './program/scope-space';
import { ProgramLibrary } from './program/program-library';
import { generators } from './program/shader-help';
type precision = 'highp' | 'mediump' | 'lowp';
type version = 'webgl' | 'webgl2';
export class GraphicsDevice {
    gl: WebGLRenderingContext;
    webgl2: boolean = false;
    buffers = [];
    scope: ScopeSpace;
    precision: precision = 'mediump';
    _shaderStats = {
        vsCompiled: 0,
        fsCompiled: 0,
        linked: 0,
        materialShaders: 0,
        compileTime: 0
    };
    boneLimit = 128;
    supportsBoneTextures: any;
    extBlendMinmax: any;
    extDrawBuffers: any;
    extInstancing: any;
    extStandardDerivatives: any;
    extTextureFloat: any;
    extTextureHalfFloatLinear: any;
    extTextureHalfFloat: any;
    extUintElement: any;
    extRendererInfo: WEBGL_debug_renderer_info;
    extTextureLod: EXT_shader_texture_lod;
    extTextureFloatLinear: OES_texture_float_linear;
    extColorBufferFloat: any;
    extTextureFilterAnisotropic: any;
    extCompressedTextureETC1: any;
    extCompressedTexturePVRTC: any;
    extCompressedTextureS3TC: any;
    programLib: ProgramLibrary;
    constructor(private canvas: HTMLCanvasElement) {
        this.gl = canvas.getContext('webgl');
        this.scope = new ScopeSpace('Device');
        this.programLib = new ProgramLibrary(this);
        // tslint:disable-next-line:forin
        for (const generator in generators) {
            this.programLib.register(generator, generators[generator]);
        }
    }
    initializeExtensions() {
        const gl = this.gl;

        if (this.webgl2) {
            this.extBlendMinmax = true;
            this.extDrawBuffers = true;
            this.extInstancing = true;
            this.extStandardDerivatives = true;
            this.extTextureFloat = true;
            this.extTextureHalfFloat = true;
            this.extTextureHalfFloatLinear = true;
            this.extTextureFloat = true;
            this.extUintElement = true;
        } else {
            this.extBlendMinmax = gl.getExtension('EXT_blend_minmax');
            this.extDrawBuffers = gl.getExtension('EXT_draw_buffers');
            this.extInstancing = gl.getExtension('ANGLE_instanced_arrays');
            this.extStandardDerivatives = gl.getExtension('OES_standard_derivatives');
            this.extTextureFloat = gl.getExtension('OES_texture_float');
            this.extTextureHalfFloat = gl.getExtension('OES_texture_half_float');
            this.extTextureHalfFloatLinear = gl.getExtension('OES_texture_half_float_linear');
            this.extTextureLod = gl.getExtension('EXT_shader_texture_lod');
            this.extUintElement = gl.getExtension('OES_element_index_uint');
        }

        this.extRendererInfo = gl.getExtension('WEBGL_debug_renderer_info');

        this.extTextureFloatLinear = gl.getExtension('OES_texture_float_linear');

        this.extColorBufferFloat = gl.getExtension('EXT_color_buffer_float');

        this.extTextureFilterAnisotropic = gl.getExtension('EXT_texture_filter_anisotropic') ||
            gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic');

        this.extCompressedTextureETC1 = gl.getExtension('WEBGL_compressed_texture_etc1');

        this.extCompressedTexturePVRTC = gl.getExtension('WEBGL_compressed_texture_pvrtc') ||
            gl.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc');

        this.extCompressedTextureS3TC = gl.getExtension('WEBGL_compressed_texture_s3tc') ||
            gl.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc');

        // IE 11 can't use mip maps with S3TC
        if (this.extCompressedTextureS3TC && _isIE()) {
            this.extCompressedTextureS3TC = null;
        }
    }
    getBoneLimit() {
        return this.boneLimit;
    }
}

function _isIE() {
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf('MSIE ');
    const trident = navigator.userAgent.match(/Trident.*rv:11\./);

    return (msie > 0 || !!trident);
}