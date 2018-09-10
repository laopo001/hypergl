/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\vertexBuffer.ts
 * Created Date: Tuesday, August 14th 2018, 5:02:32 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, September 6th 2018, 6:03:02 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */



import { TypeArray, Obj } from '../types';
import { VertexFormat } from './vertexFormat';
import { BUFFER } from '../conf';
import { RendererPlatform } from './renderer';
export class VertexBuffer {
    buffer!: ArrayBuffer;
    bufferId?: WebGLBuffer;
    numBytes!: number;
    // constructor(renderer: RendererPlatform, format: VertexFormat, usage: BUFFER, data: ArrayBuffer, numVertices: number)
    constructor(private renderer: RendererPlatform, public format: VertexFormat, public numVertices: number, private usage: BUFFER = BUFFER.STATIC, data?: ArrayBuffer) {
        let stride = this.format.stride;
        this.numBytes = stride * numVertices;
        if (data) {
            this.buffer = data;
            this.bind();

        } else {
            this.buffer = new ArrayBuffer(this.numBytes);
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
    toIterator() {
        return new Iterator(this);
    }

}

export class Iterator {
    index = 0;
    done = false;
    constructor(private vertexBuffer: VertexBuffer) { }
    get value() {
        let setter: { [s: string]: Setter } = {};
        let { format, buffer } = this.vertexBuffer;
        for (let j = 0; j < format.elements.length; j++) {
            let element = format.elements[j];
            let view = new (element.dataType as any)(buffer, this.index + element.offset, element.size);
            setter[element.semantic as string] = new Setter(view);
        }
        return setter;
    }
    next() {
        if (this.done === false) {
            this.index += this.vertexBuffer.format.stride;
            if (this.index >= this.vertexBuffer.numBytes) {
                this.done = true;
            }
        }
    }
}

export class Setter {
    constructor(private view: TypeArray) { }
    set(a?, b?, c?, d?) {
        switch (this.view.length) {
            case 1: this.set1(a); break;
            case 2: this.set2(a, b); break;
            case 3: this.set3(a, b, c); break;
            case 4: this.set4(a, b, c, d); break;
        }
    }
    set1(a) {
        this.view[0] = a;
    }
    set2(a, b) {
        this.view[0] = a;
        this.view[1] = b;
    }
    set3(a, b, c) {
        this.view[0] = a;
        this.view[1] = b;
        this.view[2] = c;
    }
    set4(a, b, c, d) {
        this.view[0] = a;
        this.view[1] = b;
        this.view[2] = c;
        this.view[3] = d;
    }

}