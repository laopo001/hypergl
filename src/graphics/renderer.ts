/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\device.ts
 * Created Date: Wednesday, August 15th 2018, 12:24:29 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, August 15th 2018, 12:51:35 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


type Platform = 'webgl' | 'webgl2';
export class Renderer {
    gl!: WebGLRenderingContext | WebGL2RenderingContext;
    version: Platform = 'webgl2';

}