/*
 * ProjectName: hypergl
 * FilePath: \src\texture\index.ts
 * Created Date: Monday, September 3rd 2018, 10:18:57 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, December 29th 2018, 2:56:06 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


export * from './cubeTexture';
export * from './texture';
export * from './baseTexture';


// import { FILTER, WRAP, PIXELFORMAT } from '../conf';
// import { powerOfTwo, Vec2 } from '../math';

// export type SourceElement = HTMLVideoElement | HTMLImageElement | HTMLCanvasElement | ImageBitmap;

// let TextureID = 0;
// export class Texture {
//     id = TextureID++;
//     source?: SourceElement | Array<SourceElement>;
//     wrapU = WRAP.REPEAT;
//     wrapV = WRAP.REPEAT;
//     wrapR = WRAP.REPEAT;
//     isGenerateMipmap = false;
//     // isCube = false;
//     level = 0;
//     minFilter = FILTER.LINEAR; // 纹理在缩小时的过滤方式
//     magFilter = FILTER.LINEAR; // 纹理在放大时的过滤方式
//     format = PIXELFORMAT.R8_G8_B8; // gl.RGB
//     dataType = Uint8Array;
//     flipY = true; // 文理是否需要垂直翻转,默认为false
//     _width?: number;
//     _height?: number;
//     constructor(public isCube = false, public webglTexture?: WebGLTexture) {
//         // TODO
//     }
//     setSource(source: SourceElement);
//     setSource(left: SourceElement, right: SourceElement, top: SourceElement, bottom: SourceElement, front: SourceElement, end: SourceElement);
//     setSource(...source) {
//         if (!this.isCube) {
//             this.source = source[0];
//             this._width = source[0].width;
//             this._height = source[0].height;
//         } else {
//             this.source = source;
//         }
//     }
//     isPowerOf2() {
//         if (this._width == null || this._height == null) { return false; }
//         return powerOfTwo(this._width) && powerOfTwo(this._height);
//     }
// }


