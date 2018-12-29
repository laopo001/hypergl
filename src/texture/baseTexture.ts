/*
 * ProjectName: hypergl
 * FilePath: \src\texture\BaseTexture.ts
 * Created Date: Saturday, December 29th 2018, 2:37:30 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, December 29th 2018, 2:53:18 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { FILTER, WRAP, PIXELFORMAT } from '../conf';
import { Log } from '../utils/util';
import { powerOfTwo, Vec2 } from '../math';

export type SourceElement = HTMLVideoElement | HTMLImageElement | HTMLCanvasElement | ImageBitmap;
let TextureID = 0;
export abstract class BaseTexture {
    id = TextureID++;
    source?: SourceElement | Array<SourceElement>;
    wrapU = WRAP.REPEAT;
    wrapV = WRAP.REPEAT;
    wrapR = WRAP.REPEAT;
    isGenerateMipmap = false;
    level = 0;
    minFilter = FILTER.LINEAR; // 纹理在缩小时的过滤方式
    magFilter = FILTER.LINEAR; // 纹理在放大时的过滤方式
    format = PIXELFORMAT.R8_G8_B8; // gl.RGB
    dataType = Uint8Array;
    flipY = true; // 文理是否需要垂直翻转,默认为false
    _width?: number;
    _height?: number;
    isCube = false;
    constructor(public webglTexture?: WebGLTexture) {}
    abstract setSource(left: SourceElement, right: SourceElement, top: SourceElement, bottom: SourceElement, front: SourceElement, end: SourceElement);
    // abstract setSource(source: SourceElement);
    // setSource(...source) {
    //     if (!this.isCube) {
    //         this.source = source[0];
    //         this._width = source[0].width;
    //         this._height = source[0].height;
    //     } else {
    //         this.source = source;
    //     }
    // }
    isPowerOf2() {
        if (this._width == null || this._height == null) { return false; }
        return powerOfTwo(this._width) && powerOfTwo(this._height);
    }
}