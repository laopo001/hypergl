/*
 * ProjectName: hypergl
 * FilePath: \src\texture\index.ts
 * Created Date: Monday, September 3rd 2018, 10:18:57 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, September 3rd 2018, 11:07:38 pm
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
    constructor() {
        // TODO
    }
    setSource(source: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement) {
        this.source = source;
    }
}


