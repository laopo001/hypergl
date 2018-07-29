/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\graphics\vertexBuffer.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Thursday, July 12th 2018, 8:02:55 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, July 29th 2018, 8:38:32 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */


import { GraphicsDevice } from './device';
import { VertexFormat } from './vertexFormat';
import * as HGL from '../hgl';


export class VertexBuffer {
    bufferId: WebGLBuffer;
    storage: ArrayBuffer;
    numBytes: number;
    constructor(public device: GraphicsDevice, public format: VertexFormat, public numVertices: number, private usage: number = HGL.BUFFER.STATIC, private initialData?: ArrayBuffer) {
        this.numBytes = format.size * numVertices;
        const gl = device.gl;
        if (initialData) {
            this.setData(initialData);
        } else {
            this.storage = new ArrayBuffer(this.numBytes);
        }
        this.device.buffers.push(this);
    }
    destroy() {
        const device = this.device;
        const idx = device.buffers.indexOf(this);
        if (idx !== -1) {
            device.buffers.splice(idx, 1);
        }

        if (this.bufferId) {
            const gl = device.gl;
            gl.deleteBuffer(this.bufferId);
            device._vram.vb -= this.storage.byteLength;
            this.bufferId = null;

            // If this buffer was bound, must clean up attribute-buffer bindings to prevent GL errors
            device.boundBuffer = null;
            device.vertexBuffers.length = 0;
            device.vbOffsets.length = 0;
            device.attributesInvalidated = true;
            // tslint:disable-next-line:forin
            for (const loc in device.enabledAttributes) {
                gl.disableVertexAttribArray(parseInt(loc, 10));
            }
            device.enabledAttributes = {};
        }
    }


    getFormat() {
        return this.format;
    }


    getUsage() {
        return this.usage;
    }


    getNumVertices() {
        return this.numVertices;
    }


    lock() {
        return this.storage;
    }


    unlock() {
        // Upload the new vertex data
        const gl = this.device.gl;

        if (!this.bufferId) {
            this.bufferId = gl.createBuffer();
        }

        let glUsage;
        switch (this.usage) {
            case HGL.BUFFER.STATIC:
                glUsage = gl.STATIC_DRAW;
                break;
            case HGL.BUFFER.DYNAMIC:
                glUsage = gl.DYNAMIC_DRAW;
                break;
            case HGL.BUFFER.STREAM:
                glUsage = gl.STREAM_DRAW;
                break;
            case HGL.BUFFER.GPUDYNAMIC:
                if (this.device.webgl2) {
                    // glUsage = gl.DYNAMIC_COPY;
                } else {
                    glUsage = gl.STATIC_DRAW;
                }
                break;
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferId);
        gl.bufferData(gl.ARRAY_BUFFER, this.storage, glUsage);
    }

    setData(data) {
        if (data.byteLength !== this.numBytes) {
            console.error(`VertexBuffer: wrong initial data size: expected ${this.numBytes}, got ${data.byteLength}`);
            return false;
        }
        this.storage = data;
        this.unlock();
        return true;
    }

}
