/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\indexBuffer.ts
 * Created Date: Tuesday, August 14th 2018, 5:02:44 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, February 27th 2019, 2:19:25 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { RendererPlatform } from './renderer';
import { TypeArray, TypeArrayConstructor } from '../types';
import { BUFFER } from '../conf';
export class IndexBuffer {
    buffer!: ArrayBuffer | TypeArray;
    bufferId?: WebGLBuffer;
    length = 0;
    // drawFormat!: number;
    constructor(dataType: TypeArrayConstructor, usage: BUFFER, data: ArrayBuffer, length?: number)
    constructor(dataType: TypeArrayConstructor, usage: BUFFER, data: Array<number>)
    constructor(public dataType: TypeArrayConstructor, private usage: BUFFER = BUFFER.STATIC, data: Array<number> | ArrayBuffer | TypeArray, length?: number) {
        if (Array.isArray(data)) {
            this.buffer = new (dataType as any)(data).buffer;
            this.length = data.length;
        } else {
            this.buffer = data;
            this.dataType = this.buffer.constructor as TypeArrayConstructor;
            if (data instanceof ArrayBuffer) {
                this.length = length || new (dataType as any)(data).length;
            } else {
                // TypeArray
                this.length = data.length;
            }
        }
    }
    bind(renderer: RendererPlatform) {
        let gl = renderer.gl;
        if (this.bufferId) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferId);
            return;
        } else {
            this.bufferId = gl.createBuffer() as WebGLBuffer;
            let glUsage;
            switch (this.usage) {
                case BUFFER.STATIC:
                    glUsage = gl.STATIC_DRAW;
                    break;
                case BUFFER.DYNAMIC:
                    glUsage = gl.DYNAMIC_DRAW;
                    break;
                case BUFFER.STREAM:
                    glUsage = gl.STREAM_DRAW;
                    break;
                case BUFFER.GPUDYNAMIC:
                    if (renderer.platform === 'webgl2') {
                        glUsage = gl.DYNAMIC_COPY;
                    } else {
                        glUsage = gl.STATIC_DRAW;
                    }
                    break;
            }
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferId);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.buffer, glUsage);
        }

    }
}