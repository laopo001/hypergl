/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\indexBuffer.ts
 * Created Date: Tuesday, August 14th 2018, 5:02:44 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, November 1st 2018, 11:35:13 pm
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
    drawFormat!: number;
    constructor(renderer: RendererPlatform, dataType: TypeArrayConstructor, usage: BUFFER, data: ArrayBuffer, length?: number)
    constructor(renderer: RendererPlatform, dataType: TypeArrayConstructor, usage: BUFFER, data: Array<number>)
    constructor(private renderer: RendererPlatform, private dataType: TypeArrayConstructor, private usage: BUFFER = BUFFER.STATIC, data: Array<number> | ArrayBuffer | TypeArray, length?: number) {
        const gl = renderer.gl;
        if (dataType === Uint8Array) {
            this.drawFormat = gl.UNSIGNED_BYTE;
        } else if (dataType === Uint16Array) {
            this.drawFormat = gl.UNSIGNED_SHORT;
        } else if (dataType === Uint32Array) {
            this.drawFormat = gl.UNSIGNED_INT;
        }
        if (Array.isArray(data)) {
            this.buffer = new (dataType as any)(data).buffer;
            this.length = data.length;
        } else {
            // if (data instanceof ArrayBuffer) {
            this.buffer = data;
            this.length = length || new (dataType as any)(data).length;
            // } else {
            //     console.log((data as any).byteLength, (data as any).byteOffset);
            //     this.buffer = (dataType as any).from(data).buffer;
            //     this.length = (data as any).length;
            // }

        }
        this.bind();
    }
    bind() {
        let gl = this.renderer.gl;
        if (!this.bufferId) {
            this.bufferId = gl.createBuffer() as WebGLBuffer;
        }
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
                if (this.renderer.platform === 'webgl2') {
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