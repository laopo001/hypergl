/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\vertexBuffer.ts
 * Created Date: Tuesday, August 14th 2018, 5:02:32 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, August 19th 2018, 12:49:20 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */



import { TypeArray } from '../types';
import { VertexFormat } from './vertexFormat';
import { BUFFER } from '../conf';
import { RendererPlatform } from './renderer';
export class VertexBuffer {
    buffer!: ArrayBuffer;
    numVertices!: number;
    bufferId?: WebGLBuffer;
    constructor(renderer: RendererPlatform, format: VertexFormat, usage: BUFFER, data: ArrayBuffer, numVertices: number)
    constructor(renderer: RendererPlatform, format: VertexFormat, usage: BUFFER, data: Array<number>)
    constructor(private renderer: RendererPlatform, private format: VertexFormat, private usage: BUFFER = BUFFER.STATIC, data: Array<number> | ArrayBuffer, numVertices?) {
        let size = this.format.sum_size;
        if (Array.isArray(data)) {
            // tslint:disable-next-line:no-parameter-reassignment
            numVertices = data.length / size;
            this.buffer = new ArrayBuffer(this.format.stride * numVertices);
            for (let i = 0; i < numVertices; i++) {
                let slice = data.slice(i * size, (i + 1) * size);
                let sum = 0;
                for (let j = 0; j < this.format.elements.length; j++) {
                    let item = this.format.elements[j];
                    let view = new (item.dataType as any)(this.buffer, i * format.stride + item.offset, item.size);
                    let end = sum + item.size;
                    let slice2 = slice.slice(sum, end);
                    sum = end;
                    for (let k = 0; k < item.size; k++) {
                        view[k] = slice2[k];
                    }
                }
            }
        } else {
            this.buffer = data;
        }
        this.numVertices = numVertices;
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
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferId);
        gl.bufferData(gl.ARRAY_BUFFER, this.buffer, glUsage);
    }
}
