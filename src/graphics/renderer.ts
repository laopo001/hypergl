/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\device.ts
 * Created Date: Wednesday, August 15th 2018, 12:24:29 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, September 2nd 2018, 9:32:14 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { Log } from '../util';
import { UNIFORM_TYPE, PIXELFORMAT, FILTER, ADDRESS, TEXHINT } from '../conf';
import { ShaderProgramGenerator } from './shaderProgramGenerator';
import { FnVoid, AppOption, Nullable } from '../types';
import { Shader } from './shader';
import { IndexBuffer } from './indexBuffer';
import { VertexBuffer } from './vertexBuffer';
import { Entity } from '../ecs';
import { Texture } from '../texture/texture';
export type Platform = 'webgl' | 'webgl2';
export class RendererPlatform {
    extCompressedTexturePVRTC: any;
    glFilter!: number[];
    glAddress!: number[];
    extTextureFilterAnisotropic: any;
    glComparison!: number[];
    maxCubeMapSize: any;
    maxTextureSize: any;
    get gl() {
        return this.webgl2 || this.webgl;
    }
    platform!: Platform;
    AttrbuteType: { [s: string]: number } = {};
    glTypeToJs: { [s: string]: Nullable<UNIFORM_TYPE> } = {};
    uniformFunction: { [s: string]: FnVoid; } = {};
    programGenerator = new ShaderProgramGenerator(this);
    extTextureHalfFloat!: OES_texture_half_float | true;
    extCompressedTextureS3TC!: WEBGL_compressed_texture_s3tc;
    extCompressedTextureETC1: any;
    activeTexture?: number;
    textureUnits!: Texture[];

    _vram = {
        // #ifdef PROFILER
        texShadow: 0,
        texAsset: 0,
        texLightmap: 0,
        // #endif
        tex: 0,
        vb: 0,
        ib: 0
    };
    private maxAniso!: number;
    get maxAnisotropy() {
        if (this.maxAniso === undefined) {
            let maxAniso = 1;
            let gl = this.gl;
            let glExt = this.extTextureFilterAnisotropic;
            if (glExt) {
                maxAniso = gl.getParameter(glExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
            }
            this.maxAniso = maxAniso;
        }
        return this.maxAniso;
    }
    private webgl!: WebGLRenderingContext;
    private webgl2!: WebGL2RenderingContext;
    constructor(canvas: HTMLCanvasElement, option?: AppOption) {
        let webgl2;
        if (option && !option.webgl1) {
            webgl2 = canvas.getContext('webgl2') as any;
        }
        this.webgl2 = webgl2;
        // this.webgl2 = canvas.getContext('webgl2') as any;
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
        this.initializeExtensions();
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
        this.glComparison = [
            gl.NEVER,
            gl.LESS,
            gl.EQUAL,
            gl.LEQUAL,
            gl.GREATER,
            gl.NOTEQUAL,
            gl.GEQUAL,
            gl.ALWAYS
        ];
        this.maxCubeMapSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
        this.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    }
    initializeExtensions() {
        let gl = this.gl;

        if (this.webgl2) {
            this.extTextureHalfFloat = true;
        } else {
            this.extTextureHalfFloat = gl.getExtension('OES_texture_half_float') as OES_texture_half_float;
        }
        this.extTextureFilterAnisotropic = gl.getExtension('EXT_texture_filter_anisotropic') || gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic');

        this.extCompressedTextureETC1 = gl.getExtension('WEBGL_compressed_texture_etc1');
        this.extCompressedTexturePVRTC = gl.getExtension('WEBGL_compressed_texture_pvrtc') || gl.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc');
        this.extCompressedTextureS3TC = gl.getExtension('WEBGL_compressed_texture_s3tc') || gl.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc');
    }
    // tslint:disable-next-line:cyclomatic-complexity
    initializeTexture(texture: Texture) {
        let gl = this.gl;
        let ext;

        texture.bufferId = gl.createTexture();

        texture._glTarget = texture.cubemap ? gl.TEXTURE_CUBE_MAP :
            (texture.volume ? gl.TEXTURE_3D : gl.TEXTURE_2D);


        switch (texture.format) {
            case PIXELFORMAT.A8:
                texture._glFormat = gl.ALPHA;
                texture._glInternalFormat = gl.ALPHA;
                texture._glPixelType = gl.UNSIGNED_BYTE;
                break;
            case PIXELFORMAT.L8:
                texture._glFormat = gl.LUMINANCE;
                texture._glInternalFormat = gl.LUMINANCE;
                texture._glPixelType = gl.UNSIGNED_BYTE;
                break;
            case PIXELFORMAT.L8_A8:
                texture._glFormat = gl.LUMINANCE_ALPHA;
                texture._glInternalFormat = gl.LUMINANCE_ALPHA;
                texture._glPixelType = gl.UNSIGNED_BYTE;
                break;
            case PIXELFORMAT.R5_G6_B5:
                texture._glFormat = gl.RGB;
                texture._glInternalFormat = gl.RGB;
                texture._glPixelType = gl.UNSIGNED_SHORT_5_6_5;
                break;
            case PIXELFORMAT.R5_G5_B5_A1:
                texture._glFormat = gl.RGBA;
                texture._glInternalFormat = gl.RGBA;
                texture._glPixelType = gl.UNSIGNED_SHORT_5_5_5_1;
                break;
            case PIXELFORMAT.R4_G4_B4_A4:
                texture._glFormat = gl.RGBA;
                texture._glInternalFormat = gl.RGBA;
                texture._glPixelType = gl.UNSIGNED_SHORT_4_4_4_4;
                break;
            case PIXELFORMAT.R8_G8_B8:
                texture._glFormat = gl.RGB;
                texture._glInternalFormat = this.webgl2 ? gl.RGB8 : gl.RGB;
                texture._glPixelType = gl.UNSIGNED_BYTE;
                break;
            case PIXELFORMAT.R8_G8_B8_A8:
                texture._glFormat = gl.RGBA;
                texture._glInternalFormat = this.webgl2 ? gl.RGBA8 : gl.RGBA;
                texture._glPixelType = gl.UNSIGNED_BYTE;
                break;
            case PIXELFORMAT.DXT1:
                ext = this.extCompressedTextureS3TC;
                texture._glFormat = gl.RGB;
                texture._glInternalFormat = ext.COMPRESSED_RGB_S3TC_DXT1_EXT;
                break;
            case PIXELFORMAT.DXT3:
                ext = this.extCompressedTextureS3TC;
                texture._glFormat = gl.RGBA;
                texture._glInternalFormat = ext.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                break;
            case PIXELFORMAT.DXT5:
                ext = this.extCompressedTextureS3TC;
                texture._glFormat = gl.RGBA;
                texture._glInternalFormat = ext.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                break;
            case PIXELFORMAT.ETC1:
                ext = this.extCompressedTextureETC1;
                texture._glFormat = gl.RGB;
                texture._glInternalFormat = ext.COMPRESSED_RGB_ETC1_WEBGL;
                break;
            case PIXELFORMAT.PVRTC_2BPP_RGB_1:
                ext = this.extCompressedTexturePVRTC;
                texture._glFormat = gl.RGB;
                texture._glInternalFormat = ext.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                break;
            case PIXELFORMAT.PVRTC_2BPP_RGBA_1:
                ext = this.extCompressedTexturePVRTC;
                texture._glFormat = gl.RGBA;
                texture._glInternalFormat = ext.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
                break;
            case PIXELFORMAT.PVRTC_4BPP_RGB_1:
                ext = this.extCompressedTexturePVRTC;
                texture._glFormat = gl.RGB;
                texture._glInternalFormat = ext.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                break;
            case PIXELFORMAT.PVRTC_4BPP_RGBA_1:
                ext = this.extCompressedTexturePVRTC;
                texture._glFormat = gl.RGBA;
                texture._glInternalFormat = ext.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                break;
            case PIXELFORMAT.RGB16F:
                // definition varies between WebGL1 and 2
                ext = this.extTextureHalfFloat;
                texture._glFormat = gl.RGB;
                if (this.webgl2) {
                    texture._glInternalFormat = gl.RGB16F;
                    texture._glPixelType = gl.HALF_FLOAT;
                } else {
                    texture._glInternalFormat = gl.RGB;
                    texture._glPixelType = ext.HALF_FLOAT_OES;
                }
                break;
            case PIXELFORMAT.RGBA16F:
                // definition varies between WebGL1 and 2
                ext = this.extTextureHalfFloat;
                texture._glFormat = gl.RGBA;
                if (this.webgl2) {
                    texture._glInternalFormat = gl.RGBA16F;
                    texture._glPixelType = gl.HALF_FLOAT;
                } else {
                    texture._glInternalFormat = gl.RGBA;
                    texture._glPixelType = ext.HALF_FLOAT_OES;
                }
                break;
            case PIXELFORMAT.RGB32F:
                // definition varies between WebGL1 and 2
                texture._glFormat = gl.RGB;
                if (this.webgl2) {
                    texture._glInternalFormat = gl.RGB32F;
                } else {
                    texture._glInternalFormat = gl.RGB;
                }
                texture._glPixelType = gl.FLOAT;
                break;
            case PIXELFORMAT.RGBA32F:
                // definition varies between WebGL1 and 2
                texture._glFormat = gl.RGBA;
                if (this.webgl2) {
                    texture._glInternalFormat = gl.RGBA32F;
                } else {
                    texture._glInternalFormat = gl.RGBA;
                }
                texture._glPixelType = gl.FLOAT;
                break;
            case PIXELFORMAT.R32F: // WebGL2 only
                texture._glFormat = gl.RED;
                texture._glInternalFormat = gl.R32F;
                texture._glPixelType = gl.FLOAT;
                break;
            case PIXELFORMAT.DEPTH:
                if (this.webgl2) {
                    // native WebGL2
                    texture._glFormat = gl.DEPTH_COMPONENT;
                    texture._glInternalFormat = gl.DEPTH_COMPONENT32F; // should allow 16/24 bits?
                    texture._glPixelType = gl.FLOAT;
                } else {
                    // using WebGL1 extension
                    texture._glFormat = gl.DEPTH_COMPONENT;
                    texture._glInternalFormat = gl.DEPTH_COMPONENT;
                    texture._glPixelType = gl.UNSIGNED_SHORT; // the only acceptable value?
                }
                break;
            case PIXELFORMAT.DEPTHSTENCIL: // WebGL2 only
                texture._glFormat = gl.DEPTH_STENCIL;
                texture._glInternalFormat = gl.DEPTH24_STENCIL8;
                texture._glPixelType = gl.UNSIGNED_INT_24_8;
                break;
            case PIXELFORMAT._111110F: // WebGL2 only
                texture._glFormat = gl.RGB;
                texture._glInternalFormat = gl.R11F_G11F_B10F;
                texture._glPixelType = gl.FLOAT;
                break;
            case PIXELFORMAT.SRGB: // WebGL2 only
                texture._glFormat = gl.RGB;
                texture._glInternalFormat = gl.SRGB8;
                texture._glPixelType = gl.UNSIGNED_BYTE;
                break;
            case PIXELFORMAT.SRGBA: // WebGL2 only
                texture._glFormat = gl.RGBA;
                texture._glInternalFormat = gl.SRGB8_ALPHA8;
                texture._glPixelType = gl.UNSIGNED_BYTE;
                break;
        }
    }
    setShader(shader: Shader) {
        if (shader.ready === false) {
            shader.link();
        }
        this.gl.useProgram(shader.program as WebGLProgram);
    }
    // tslint:disable-next-line:cyclomatic-complexity
    setTexture(texture: Texture, textureUnit: number) {
        let gl = this.gl;
        if (!texture.bufferId) {
            this.initializeTexture(texture);
        }
        let paramDirty = texture._minFilterDirty || texture._magFilterDirty ||
            texture._addressUDirty || texture._addressVDirty || texture._addressWDirty ||
            texture._anisotropyDirty || texture._compareModeDirty;
        if ((this.textureUnits[textureUnit] !== texture) || paramDirty) {
            if (this.activeTexture !== textureUnit) {
                gl.activeTexture(gl.TEXTURE0 + textureUnit);
                this.activeTexture = textureUnit;
            }
            gl.bindTexture(texture._glTarget as number, texture.bufferId);
            this.textureUnits[textureUnit] = texture;
        }

        if (paramDirty) {
            if (texture._minFilterDirty) {
                let filter = texture.minFilter;
                if (!texture.pot || !texture.mipmaps || (texture.compressed && texture._levels.length === 1)) {
                    if (filter === FILTER.NEAREST_MIPMAP_NEAREST || filter === FILTER.NEAREST_MIPMAP_LINEAR) {
                        filter = FILTER.NEAREST;
                    } else if (filter === FILTER.LINEAR_MIPMAP_NEAREST || filter === FILTER.LINEAR_MIPMAP_LINEAR) {
                        filter = FILTER.LINEAR;
                    }
                }
                gl.texParameteri(texture._glTarget as number, gl.TEXTURE_MIN_FILTER, this.glFilter[filter]);
                texture._minFilterDirty = false;
            }
            if (texture._magFilterDirty) {
                gl.texParameteri(texture._glTarget as number, gl.TEXTURE_MAG_FILTER, this.glFilter[texture.magFilter]);
                texture._magFilterDirty = false;
            }
            if (texture._addressUDirty) {
                if (this.webgl2) {
                    gl.texParameteri(texture._glTarget as number, gl.TEXTURE_WRAP_S, this.glAddress[texture.addressU]);
                } else {
                    // WebGL1 doesn't support all addressing modes with NPOT textures
                    gl.texParameteri(texture._glTarget as number, gl.TEXTURE_WRAP_S, this.glAddress[texture.pot ? texture.addressU : ADDRESS.CLAMP_TO_EDGE]);
                }
                texture._addressUDirty = false;
            }
            if (texture._addressVDirty) {
                if (this.webgl2) {
                    gl.texParameteri(texture._glTarget as number, gl.TEXTURE_WRAP_T, this.glAddress[texture.addressV]);
                } else {
                    // WebGL1 doesn't support all addressing modes with NPOT textures
                    gl.texParameteri(texture._glTarget as number, gl.TEXTURE_WRAP_T, this.glAddress[texture.pot ? texture.addressV : ADDRESS.CLAMP_TO_EDGE]);
                }
                texture._addressVDirty = false;
            }
            if (this.webgl2) {
                if (texture._addressWDirty) {
                    gl.texParameteri(texture._glTarget as number, gl.TEXTURE_WRAP_R, this.glAddress[texture.addressW]);
                    texture._addressWDirty = false;
                }
                if (texture._compareModeDirty) {
                    gl.texParameteri(texture._glTarget as number, gl.TEXTURE_COMPARE_MODE, texture._compareOnRead ? gl.COMPARE_REF_TO_TEXTURE : gl.NONE);
                    gl.texParameteri(texture._glTarget as number, gl.TEXTURE_COMPARE_FUNC, this.glComparison[texture._compareFunc]);
                    texture._compareModeDirty = false;
                }
            }
            if (texture._anisotropyDirty) {
                let ext = this.extTextureFilterAnisotropic;
                if (ext) gl.texParameterf(texture._glTarget as number, ext.TEXTURE_MAX_ANISOTROPY_EXT, Math.max(1, Math.min(Math.round(texture.anisotropy), this.maxAnisotropy)));
                texture._anisotropyDirty = false;
            }
        }

        if (texture._needsUpload || texture._needsMipmapsUpload) {
            this.uploadTexture(texture);
            texture._needsUpload = false;
            texture._needsMipmapsUpload = false;
        }
    }
    // tslint:disable-next-line:cyclomatic-complexity
    uploadTexture(texture: Texture) {
        let gl = this.gl;

        if (!texture._needsUpload && ((texture._needsMipmapsUpload && texture._mipmapsUploaded) || !texture.pot)) {
            return;
        }

        let mipLevel = 0;
        let mipObject;
        let resMult;

        while (texture._levels[mipLevel] || mipLevel === 0) {
            // Upload all existing mip levels. Initialize 0 mip anyway.

            if (!texture._needsUpload && mipLevel === 0) {
                mipLevel++;
                continue;
            } else if (mipLevel && (!texture._needsMipmapsUpload || !texture.mipmaps)) {
                break;
            }

            mipObject = texture._levels[mipLevel];

            if (mipLevel === 1 && !texture.compressed) {
                // We have more than one mip levels we want to assign, but we need all mips to make
                // the texture complete. Therefore first generate all mip chain from 0, then assign custom mips.
                gl.generateMipmap(texture._glTarget as number);
                texture._mipmapsUploaded = true;
            }

            if (texture.cubemap) {
                // ----- CUBEMAP -----
                let face;

                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);

                if ((mipObject[0] instanceof HTMLCanvasElement) || (mipObject[0] instanceof HTMLImageElement) || (mipObject[0] instanceof HTMLVideoElement)) {
                    // Upload the image, canvas or video
                    for (face = 0; face < 6; face++) {
                        if (!texture.levelsUpdated[0][face]) {
                            continue;
                        }

                        let src = mipObject[face];
                        // Downsize images that are too large to be used as cube maps
                        if (src instanceof HTMLImageElement) {
                            if (src.width > this.maxCubeMapSize || src.height > this.maxCubeMapSize) {
                                src = _downsampleImage(src, this.maxCubeMapSize);
                                if (mipLevel === 0) {
                                    texture.width = src.width;
                                    texture.height = src.height;
                                }
                            }
                        }

                        gl.texImage2D(
                            gl.TEXTURE_CUBE_MAP_POSITIVE_X + face,
                            mipLevel,
                            texture._glInternalFormat as number,
                            texture._glFormat as number,
                            texture._glPixelType as number,
                            src
                        );
                    }
                } else {
                    // Upload the byte array
                    resMult = 1 / Math.pow(2, mipLevel);
                    for (face = 0; face < 6; face++) {
                        if (!texture.levelsUpdated[0][face]) {
                            continue;
                        }

                        let texData = mipObject[face];
                        if (texture.compressed) {
                            gl.compressedTexImage2D(
                                gl.TEXTURE_CUBE_MAP_POSITIVE_X + face,
                                mipLevel,
                                texture._glInternalFormat as number,
                                Math.max(texture.width * resMult, 1),
                                Math.max(texture.height * resMult, 1),
                                0,
                                texData
                            );
                        } else {
                            gl.texImage2D(
                                gl.TEXTURE_CUBE_MAP_POSITIVE_X + face,
                                mipLevel,
                                texture._glInternalFormat as number,
                                Math.max(texture.width * resMult, 1),
                                Math.max(texture.height * resMult, 1),
                                0,
                                texture._glFormat as number,
                                texture._glPixelType as number,
                                texData
                            );
                        }
                    }
                }
            } else if (texture.volume) {
                // ----- 3D -----
                // Image/canvas/video not supported (yet?)
                // Upload the byte array
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
                resMult = 1 / Math.pow(2, mipLevel);
                if (texture.compressed) {
                    gl.compressedTexImage3D(gl.TEXTURE_3D,
                        mipLevel,
                        texture._glInternalFormat as number,
                        Math.max(texture.width * resMult, 1),
                        Math.max(texture.height * resMult, 1),
                        Math.max(texture.depth * resMult, 1),
                        0,
                        mipObject);
                } else {
                    gl.texImage3D(gl.TEXTURE_3D,
                        mipLevel,
                        texture._glInternalFormat as number,
                        Math.max(texture.width * resMult, 1),
                        Math.max(texture.height * resMult, 1),
                        Math.max(texture.depth * resMult, 1),
                        0,
                        texture._glFormat as number,
                        texture._glPixelType as number,
                        mipObject);
                }
            } else {
                // ----- 2D -----
                if ((mipObject instanceof HTMLCanvasElement) || (mipObject instanceof HTMLImageElement) || (mipObject instanceof HTMLVideoElement)) {
                    // Downsize images that are too large to be used as textures
                    if (mipObject instanceof HTMLImageElement) {
                        if (mipObject.width > this.maxTextureSize || mipObject.height > this.maxTextureSize) {
                            mipObject = _downsampleImage(mipObject, this.maxTextureSize);
                            if (mipLevel === 0) {
                                texture.width = mipObject.width;
                                texture.height = mipObject.height;
                            }
                        }
                    }

                    // Upload the image, canvas or video
                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
                    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
                    gl.texImage2D(
                        gl.TEXTURE_2D,
                        mipLevel,
                        texture._glInternalFormat as number,
                        texture._glFormat as number,
                        texture._glPixelType as number,
                        mipObject
                    );
                } else {
                    // Upload the byte array
                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
                    resMult = 1 / Math.pow(2, mipLevel);
                    if (texture.compressed) {
                        gl.compressedTexImage2D(
                            gl.TEXTURE_2D,
                            mipLevel,
                            texture._glInternalFormat as number,
                            Math.max(texture.width * resMult, 1),
                            Math.max(texture.height * resMult, 1),
                            0,
                            mipObject
                        );
                    } else {
                        gl.texImage2D(
                            gl.TEXTURE_2D,
                            mipLevel,
                            texture._glInternalFormat as number,
                            Math.max(texture.width * resMult, 1),
                            Math.max(texture.height * resMult, 1),
                            0,
                            texture._glFormat as number,
                            texture._glPixelType as number,
                            mipObject
                        );
                    }
                }

                if (mipLevel === 0) {
                    texture._mipmapsUploaded = false;
                } else {
                    texture._mipmapsUploaded = true;
                }
            }
            mipLevel++;
        }

        if (texture._needsUpload) {
            if (texture.cubemap) {
                for (let i = 0; i < 6; i++) {
                    texture.levelsUpdated[0][i] = false;
                }
            } else {
                texture.levelsUpdated[0] = false;
            }
        }

        if (!texture.compressed && texture.mipmaps && texture._needsMipmapsUpload && texture.pot && texture._levels.length === 1) {
            gl.generateMipmap(texture._glTarget as number);
            texture._mipmapsUploaded = true;
        }

        if (texture._gpuSize) {
            this._vram.tex -= texture._gpuSize;
            // #ifdef PROFILER
            if (texture.profilerHint === TEXHINT.SHADOWMAP) {
                this._vram.texShadow -= texture._gpuSize;
            } else if (texture.profilerHint === TEXHINT.ASSET) {
                this._vram.texAsset -= texture._gpuSize;
            } else if (texture.profilerHint === TEXHINT.LIGHTMAP) {
                this._vram.texLightmap -= texture._gpuSize;
            }
            // #endif
        }

        texture._gpuSize = gpuTexSize(gl, texture);
        this._vram.tex += texture._gpuSize;
        // #ifdef PROFILER
        if (texture.profilerHint === TEXHINT.SHADOWMAP) {
            this._vram.texShadow += texture._gpuSize;
        } else if (texture.profilerHint === TEXHINT.ASSET) {
            this._vram.texAsset += texture._gpuSize;
        } else if (texture.profilerHint === TEXHINT.LIGHTMAP) {
            this._vram.texLightmap += texture._gpuSize;
        }
        // #endif
    }
    setVertexBuffer(vertexBuffer: VertexBuffer) {
        const gl = this.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.bufferId as WebGLBuffer);
        // vertexBuffer.bind();
    }
    setIndexBuffer(indexBuffer: IndexBuffer) {
        const gl = this.gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.bufferId as WebGLBuffer);
        // indexBuffer.bind();
    }
    initDraw() {
        const gl = this.gl;
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.DEPTH_BUFFER_BIT);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
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
            let element;
            if (attrbute.element) {
                element = attrbute.element;
            } else {
                element = format.elements.find(x => x.semantic === attrbute.name);
                attrbute.element = element;
            }

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
            this.uniformFunction[uniform.type](uniform, shader.uniformScope[uniform.name]);
        }
        let textureUnit = 0;
        for (let i = 0; i < samplers.length; i++) {
            let sampler = samplers[i];
            let samplerValue = sampler.element;
            if (!samplerValue) {
                continue; // Because unset constants shouldn't raise random errors
            }

            if (samplerValue instanceof Texture) {
                let texture = samplerValue;
                this.setTexture(texture, textureUnit);

                if (sampler.slot !== textureUnit) {
                    gl.uniform1i(sampler.locationId, textureUnit);
                    sampler.slot = textureUnit;
                }
                textureUnit++;
            } else { // Array
                // sampler.array.length = 0;
                // numTextures = samplerValue.length;
                // for (j = 0; j < numTextures; j++) {
                //     texture = samplerValue[j];
                //     this.setTexture(texture, textureUnit);

                //     sampler.array[j] = textureUnit;
                //     textureUnit++;
                // }
                // gl.uniform1iv(sampler.locationId, sampler.array);
            }
        }

        gl.drawElements(
            gl.TRIANGLES,
            mesh.indexBuffer.length,
            mesh.indexBuffer.drawFormat,
            0
        );
    }
}

let _downsampleImage = (image, size) => {
    let srcW = image.width;
    let srcH = image.height;

    if ((srcW > size) || (srcH > size)) {
        let scale = size / Math.max(srcW, srcH);
        let dstW = Math.floor(srcW * scale);
        let dstH = Math.floor(srcH * scale);

        console.warn('Image dimensions larger than max supported texture size of ' + size + '. ' +
            'Resizing from ' + srcW + ', ' + srcH + ' to ' + dstW + ', ' + dstH + '.');

        let canvas = document.createElement('canvas');
        canvas.width = dstW;
        canvas.height = dstH;

        let context = canvas.getContext('2d') as CanvasRenderingContext2D;
        context.drawImage(image, 0, 0, srcW, srcH, 0, 0, dstW, dstH);

        return canvas;
    }

    return image;
};

function _isIE() {
    let ua = window.navigator.userAgent;
    let msie = ua.indexOf('MSIE ');
    let trident = navigator.userAgent.match(/Trident.*rv:11\./);

    return (msie > 0 || !!trident);
}

let _pixelFormat2Size;
function gpuTexSize(gl, tex: Texture) {
    if (!_pixelFormat2Size) {
        _pixelFormat2Size = {};
        _pixelFormat2Size[PIXELFORMAT.A8] = 1;
        _pixelFormat2Size[PIXELFORMAT.L8] = 1;
        _pixelFormat2Size[PIXELFORMAT.L8_A8] = 1;
        _pixelFormat2Size[PIXELFORMAT.R5_G6_B5] = 2;
        _pixelFormat2Size[PIXELFORMAT.R5_G5_B5_A1] = 2;
        _pixelFormat2Size[PIXELFORMAT.R4_G4_B4_A4] = 2;
        _pixelFormat2Size[PIXELFORMAT.R8_G8_B8] = 4;
        _pixelFormat2Size[PIXELFORMAT.R8_G8_B8_A8] = 4;
        _pixelFormat2Size[PIXELFORMAT.RGB16F] = 8;
        _pixelFormat2Size[PIXELFORMAT.RGBA16F] = 8;
        _pixelFormat2Size[PIXELFORMAT.RGB32F] = 16;
        _pixelFormat2Size[PIXELFORMAT.RGBA32F] = 16;
        _pixelFormat2Size[PIXELFORMAT.R32F] = 4;
        _pixelFormat2Size[PIXELFORMAT.DEPTH] = 4; // can be smaller using WebGL1 extension?
        _pixelFormat2Size[PIXELFORMAT.DEPTHSTENCIL] = 4;
        _pixelFormat2Size[PIXELFORMAT._111110F] = 4;
        _pixelFormat2Size[PIXELFORMAT.SRGB] = 4;
        _pixelFormat2Size[PIXELFORMAT.SRGBA] = 4;
    }

    let mips = 1;
    if (tex.pot && (tex.mipmaps || tex.minFilter === FILTER.NEAREST_MIPMAP_NEAREST ||
        tex.minFilter === FILTER.NEAREST_MIPMAP_LINEAR || tex.minFilter === FILTER.LINEAR_MIPMAP_NEAREST ||
        tex.minFilter === FILTER.LINEAR_MIPMAP_LINEAR) && ! (tex.compressed && tex._levels.length === 1)) {

        mips = Math.round(Math.log2(Math.max(tex.width, tex.height)) + 1);
    }
    let mipWidth = tex.width;
    let mipHeight = tex.height;
    let mipDepth = tex.depth;
    let size = 0;

    for (let i = 0; i < mips; i++) {
        if (! tex.compressed) {
            size += mipWidth * mipHeight * mipDepth * _pixelFormat2Size[tex.format];
        } else if (tex.format === PIXELFORMAT.ETC1) {
            size += Math.floor((mipWidth + 3) / 4) * Math.floor((mipHeight + 3) / 4) * 8 * mipDepth;
        } else if (tex.format === PIXELFORMAT.PVRTC_2BPP_RGB_1 || tex.format === PIXELFORMAT.PVRTC_2BPP_RGBA_1) {
            size += Math.max(mipWidth, 16) * Math.max(mipHeight, 8) / 4 * mipDepth;
        } else if (tex.format === PIXELFORMAT.PVRTC_4BPP_RGB_1 || tex.format === PIXELFORMAT.PVRTC_4BPP_RGBA_1) {
            size += Math.max(mipWidth, 8) * Math.max(mipHeight, 8) / 2 * mipDepth;
        } else {
            let DXT_BLOCK_WIDTH = 4;
            let DXT_BLOCK_HEIGHT = 4;
            let blockSize = tex.format === PIXELFORMAT.DXT1 ? 8 : 16;
            let numBlocksAcross = Math.floor((mipWidth + DXT_BLOCK_WIDTH - 1) / DXT_BLOCK_WIDTH);
            let numBlocksDown = Math.floor((mipHeight + DXT_BLOCK_HEIGHT - 1) / DXT_BLOCK_HEIGHT);
            let numBlocks = numBlocksAcross * numBlocksDown;
            size += numBlocks * blockSize * mipDepth;
        }
        mipWidth = Math.max(mipWidth * 0.5, 1);
        mipHeight = Math.max(mipHeight * 0.5, 1);
        mipDepth = Math.max(mipDepth * 0.5, 1);
    }

    if (tex.cubemap) size *= 6;
    return size;
}
