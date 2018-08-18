/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\device.ts
 * Created Date: Wednesday, August 15th 2018, 12:24:29 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, August 19th 2018, 12:54:39 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { Log } from '../util';
type Platform = 'webgl' | 'webgl2';
export class RendererPlatform {
    get gl()  {
        return  this.webgl2 || this.webgl;
    }
    platform!: Platform;
    private webgl!: WebGLRenderingContext;
    private webgl2!: WebGL2RenderingContext;
    constructor(canvas: HTMLCanvasElement) {
        this.webgl2 = canvas.getContext('webgl') as any;
        if (this.webgl2) {
            this.platform = 'webgl';
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
    }


}