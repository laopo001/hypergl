/*
 * ProjectName: hypergl
 * FilePath: \src\texture\index.ts
 * Created Date: Monday, September 3rd 2018, 10:18:57 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, September 4th 2018, 1:05:59 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { ADDRESS, PIXELFORMAT } from '../types';
export class Texture {
    source?: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement;
    wrapU = ADDRESS.REPEAT;
    wrapV = ADDRESS.REPEAT;
    wrapR = ADDRESS.REPEAT;
    isCube = false;
    level = 0;
    format = PIXELFORMAT.R8_G8_B8; // gl.RGB
    dataType = Uint8Array;
    flipY = true; // 文理是否需要垂直翻转,默认为false
    constructor() {
        // TODO
    }
    setSource(source: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement) {
        this.source = source;
    }
}


