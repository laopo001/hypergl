/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\device.ts
 * Created Date: Wednesday, August 15th 2018, 12:24:29 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 5:13:51 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { Log } from '../util';
type Platform = 'webgl' | 'webgl2';
export class RendererPlatform {
    gl!: WebGL2RenderingContext | WebGLRenderingContext;
    platform: Platform = 'webgl2';

    constructor(canvas: HTMLCanvasElement) {
        this.gl = canvas.getContext('webgl2') as any;
        if (this.gl) {
            this.platform = 'webgl2';
            Log.debug(`platform:${this.platform}`);
        } else {
            this.gl = canvas.getContext('webgl') as any;
            if (this.gl) {
                this.platform = 'webgl';
                Log.debug(`platform:${this.platform}`);
            } else {
                Log.error('你的浏览器不支持webgl');
            }
        }
    }


}