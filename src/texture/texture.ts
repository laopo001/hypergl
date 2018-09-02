/*
 * ProjectName: hypergl
 * FilePath: \src\texture\texture.ts
 * Created Date: Sunday, September 2nd 2018, 1:30:12 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, September 2nd 2018, 9:14:50 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { Base } from '../core/element';
import { ADDRESS, FILTER, PIXELFORMAT, FUNC } from '../conf';
import { RendererPlatform } from '../graphics/renderer';
import { powerOfTwo } from '../math';
import { Log } from '../util';
export class Texture extends Base {
    static DEFAULT_IMAGE = null;
    /*
        Mipmap
            在三维世界中,显示一张图的大小与摄象机的位置有关,近的地方,图片实际象素就大一些,远的地方图片实际象
        素就会小一些,就要进行一些压缩,例如一张64*64的图,在近处,显示出来可能是50*50,在远处可能显示出来是20*20.
        如果只限于简单的支掉某些像素,将会使缩小后的图片损失很多细节,图片变得很粗糙,因此,图形学有很多复杂的方
        法来处理缩小图片的问题,使得缩小后的图片依然清晰,然而,这些计算都会耗费一定的时间.

        Mipmap纹理技术是目前解决纹理分辨率与视点距离关系的最有效途径,它会先将图片压缩成很多逐渐缩小的图片,
        例如一张64*64的图片,会产生64*64,32*32,16*16,8*8,4*4,2*2,1*1的7张图片,当屏幕上需要绘制像素点为20*20 时，
        程序只是利用 32*32 和 16*16 这两张图片来计算出即将显示为 20*20 大小的一个图片，这比单独利用 32*32 的
        那张原始片计算出来的图片效果要好得多，速度也更快.
    */
    bufferId;
    _glTarget?: number;
    _glFormat?: number;
    _glInternalFormat?: number;
    _glPixelType?: number;
    mipmaps = false;
    _levels: Array<Array<any>> | Array<any>;
    width = 4;
    height = 4;
    depth = 1;
    addressU = ADDRESS.REPEAT; // 要水平应用于纹理的寻址模式。
    addressV = ADDRESS.REPEAT; // 垂直应用于纹理的寻址模式
    addressW = ADDRESS.REPEAT; // 要应用于3D纹理深度的寻址模式（仅限WebGL2）

    minFilter = FILTER.LINEAR_MIPMAP_LINEAR; // 纹理在缩小时的过滤方式
    magFilter = FILTER.LINEAR; // 纹理在放大时的过滤方式
    anisotropy = 1; // 各向异性,取值范围0.0-1.0,经常用来通过这个值,产生不同的表面效果,木材和金属都发光,但是发光的特点是有区别的
    format = PIXELFORMAT.R8_G8_B8_A8;
    cubemap = false; // 是否为立方体贴图
    volume = false; // 指定纹理是否为3D体积（仅限WebGL2）。默认为false。
    flipY = true; // 文理是否需要垂直翻转,默认为false
    rgbm = false; // 指定纹理是否包含RGBM编码的HDR数据。默认为false。
    _invalid = false;
    _gpuSize = 0;
    pot;
    glTextureId: undefined;
    levelsUpdated!: boolean[] | boolean[][];
    _compareOnRead = false;
    _compareFunc = FUNC.LESS;
    _needsUpload!: boolean;
    _needsMipmapsUpload: boolean = false;
    _compareModeDirty!: boolean;
    _anisotropyDirty!: boolean;
    _addressWDirty!: boolean;
    _magFilterDirty!: boolean;
    _mipmapsUploaded!: boolean;
    _addressVDirty!: boolean;
    _addressUDirty!: boolean;
    _minFilterDirty!: boolean;
    compressed = false;
    // #ifdef PROFILER
    profilerHint = 0;
    // #endif
    private _lockedLevel = -1;

    // tslint:disable-next-line:cyclomatic-complexity
    constructor(private renderer: RendererPlatform, options) {
        super();
        if (options !== undefined) {
            this.width = options.width !== undefined ? options.width : this.width;
            this.height = options.height !== undefined ? options.height : this.height;
            this.pot = powerOfTwo(this.width) && powerOfTwo(this.height);
            this.format = options.format !== undefined ? options.format : this.format;
            this.rgbm = options.rgbm !== undefined ? options.rgbm : this.rgbm;
            if (options.mipmaps !== undefined) {
                this.mipmaps = options.mipmaps;
            } else {
                this.mipmaps = options.autoMipmap !== undefined ? options.autoMipmap : this.mipmaps;
            }
            this.cubemap = options.cubemap !== undefined ? options.cubemap : this.cubemap;
            // this.fixCubemapSeams = options.fixCubemapSeams !== undefined ? options.fixCubemapSeams : this.fixCubemapSeams;
            this.minFilter = options.minFilter !== undefined ? options.minFilter : this.minFilter;
            this.magFilter = options.magFilter !== undefined ? options.magFilter : this.magFilter;
            this.anisotropy = options.anisotropy !== undefined ? options.anisotropy : this.anisotropy;
            this.addressU = options.addressU !== undefined ? options.addressU : this.addressU;
            this.addressV = options.addressV !== undefined ? options.addressV : this.addressV;
            this._compareOnRead = (options.compareOnRead !== undefined) ? options.compareOnRead : this._compareOnRead;
            this._compareFunc = (options._compareFunc !== undefined) ? options._compareFunc : this._compareFunc;
            this.flipY = options.flipY !== undefined ? options.flipY : this.flipY;
            if (renderer.platform === 'webgl2') {
                this.depth = options.depth !== undefined ? options.depth : this.depth;
                this.volume = options.volume !== undefined ? options.volume : this.volume;
                this.addressW = options.addressW !== undefined ? options.addressW : this.addressW;
            }
            // #ifdef PROFILER
            this.profilerHint = (options.profilerHint !== undefined) ? options.profilerHint : this.profilerHint;
            // #endif
        }
        this.compressed = (this.format === PIXELFORMAT.DXT1 ||
            this.format === PIXELFORMAT.DXT3 ||
            this.format === PIXELFORMAT.DXT5 ||
            this.format >= PIXELFORMAT.ETC1);


        this._levels = this.cubemap ? [[null, null, null, null, null, null]] : [null];

        this.dirtyAll();
    }
    // tslint:disable-next-line:cyclomatic-complexity
    setSource(source: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement | Array<HTMLCanvasElement | HTMLImageElement | HTMLVideoElement>) {
        let i;
        let invalid = false;
        // tslint:disable-next-line:one-variable-per-declaration
        let width, height;

        if (this.cubemap) {
            Log.assert(Array.isArray(source), '立方体纹理时，source必须是长度为6的数组');
            if (source[0]) {
                // rely on first face sizes
                width = source[0].width || 0;
                height = source[0].height || 0;

                for (i = 0; i < 6; i++) {
                    // cubemap becomes invalid if any condition is not satisfied
                    if (!source[i] || // face is missing
                        source[i].width !== width || // face is different width
                        source[i].height !== height || // face is different height
                        (!(source[i] instanceof HTMLImageElement) && // not image and
                            !(source[i] instanceof HTMLCanvasElement) && // not canvas and
                            !(source[i] instanceof HTMLVideoElement))) { // not video

                        invalid = true;
                        break;
                    }
                }
            } else {
                // first face is missing
                invalid = true;
            }

            if (!invalid) {
                // mark levels as updated
                for (i = 0; i < 6; i++) {
                    if (this._levels[0][i] !== source[i]) {
                        this.levelsUpdated[0][i] = true;
                    }
                }
            }
        } else {
            if (Array.isArray(source)) { return; }
            // check if source is valid type of element
            if (!(source instanceof HTMLImageElement) && !(source instanceof HTMLCanvasElement) && !(source instanceof HTMLVideoElement)) {
                invalid = true;
            }

            if (!invalid) {
                // mark level as updated
                if (source !== this._levels[0]) {
                    this.levelsUpdated[0] = true;
                }

                width = source.width;
                height = source.height;
            }
        }

        if (invalid) {
            // invalid texture

            // default sizes
            this.width = 4;
            this.height = 4;
            this.pot = true;

            // remove levels
            if (this.cubemap) {
                for (i = 0; i < 6; i++) {
                    this._levels[0][i] = null;
                    this.levelsUpdated[0][i] = true;
                }
            } else {
                this._levels[0] = null;
                this.levelsUpdated[0] = true;
            }
        } else {
            // valid texture
            this.width = width;
            this.height = height;
            this.pot = powerOfTwo(this.width) && powerOfTwo(this.height);

            this._levels[0] = source;
        }

        // valid or changed state of validity
        if (this._invalid !== invalid || !invalid) {
            this._invalid = invalid;

            // reupload
            this.upload();
        }
    }
    dirtyAll(): any {
        this.glTextureId = undefined;
        this.levelsUpdated = this.cubemap ? [[true, true, true, true, true, true]] : [true];

        this._needsUpload = true;
        this._needsMipmapsUpload = this.mipmaps;
        this._mipmapsUploaded = false;

        this._magFilterDirty = true;
        this._minFilterDirty = true;
        this._addressUDirty = true;
        this._addressVDirty = true;
        this._addressWDirty = this.volume;
        this._anisotropyDirty = true;
        this._compareModeDirty = true;
    }
    upload() {
        this._needsUpload = true;
        this._needsMipmapsUpload = this.mipmaps;
    }
}

