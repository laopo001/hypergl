/*
 * ProjectName: hypergl
 * FilePath: \src\texture\index.ts
 * Created Date: Monday, September 3rd 2018, 10:18:57 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, November 3rd 2018, 11:28:28 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */



import { FILTER, WRAP, PIXELFORMAT } from '../conf';
import { Log } from '../utils/util';
import { powerOfTwo } from '../math';

let TextureID = 0;
export class Texture {
    id = TextureID++;
    source?: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement;
    wrapU = WRAP.REPEAT;
    wrapV = WRAP.REPEAT;
    wrapR = WRAP.REPEAT;
    isCube = false;
    level = 0;
    minFilter = FILTER.LINEAR; // 纹理在缩小时的过滤方式
    magFilter = FILTER.LINEAR; // 纹理在放大时的过滤方式
    format = PIXELFORMAT.R8_G8_B8; // gl.RGB
    dataType = Uint8Array;
    flipY = true; // 文理是否需要垂直翻转,默认为false
    constructor(public webglTexture?: WebGLTexture) {
        // TODO
    }
    setSource(source: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement) {
        this.source = source;
    }
    isPowerOf2() {
        if (this.source == null) { Log.error('source not set'); return false; }
        return powerOfTwo(this.source.width) && powerOfTwo(this.source.height);
    }
}


