/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\graphics\indexBuffer.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Thursday, July 12th 2018, 8:02:41 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, July 29th 2018, 8:06:46 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */


import { BUFFER, INDEXFORMAT } from '../hgl';
export class IndexBuffer {
    usage: any;
    format: any;
    numIndices: any;
    device: any;
    glFormat: any;
    bytesPerIndex: any;
    numBytes: number;
    storage: ArrayBuffer;
    bufferId: any;
    constructor(graphicsDevice, format, numIndices, usage?, initialData?) {
        // Initialize optional parameters
        // By default, index buffers are static (better for performance since buffer data can be cached in VRAM)
        this.usage = usage || BUFFER.STATIC;

        // Store the index format
        this.format = format;

        // Store the number of indices
        this.numIndices = numIndices;

        // Create the WebGL buffer
        this.device = graphicsDevice;

        const gl = this.device.gl;

        // Allocate the storage
        let bytesPerIndex;
        if (format === INDEXFORMAT.UINT8) {
            bytesPerIndex = 1;
            this.glFormat = gl.UNSIGNED_BYTE;
        } else if (format === INDEXFORMAT.UINT16) {
            bytesPerIndex = 2;
            this.glFormat = gl.UNSIGNED_SHORT;
        } else if (format === INDEXFORMAT.UINT32) {
            bytesPerIndex = 4;
            this.glFormat = gl.UNSIGNED_INT;
        }
        this.bytesPerIndex = bytesPerIndex;

        this.numBytes = this.numIndices * bytesPerIndex;

        if (initialData) {
            this.setData(initialData);
        } else {
            this.storage = new ArrayBuffer(this.numBytes);
        }

        graphicsDevice._vram.ib += this.numBytes;

        this.device.buffers.push(this);
    }

    /**
     * @function
     * @name pc.IndexBuffer#destroy
     * @description Frees resources associated with this index buffer.
     */
    destroy() {
        const device = this.device;
        const idx = device.buffers.indexOf(this);
        if (idx !== -1) {
            device.buffers.splice(idx, 1);
        }

        if (this.bufferId) {
            const gl = this.device.gl;
            gl.deleteBuffer(this.bufferId);
            this.device._vram.ib -= this.storage.byteLength;
            this.bufferId = null;

            if (this.device.indexBuffer === this) {
                this.device.indexBuffer = null;
            }
        }
    }

    /**
     * @function
     * @name pc.IndexBuffer#getFormat
     * @description Returns the data format of the specified index buffer.
     * @returns {Number} The data format of the specified index buffer (see INDEXFORMAT.*).
     */
    getFormat() {
        return this.format;
    }

    /**
     * @function
     * @name pc.IndexBuffer#getNumIndices
     * @description Returns the number of indices stored in the specified index buffer.
     * @returns {Number} The number of indices stored in the specified index buffer.
     */
    getNumIndices() {
        return this.numIndices;
    }

    /**
     * @function
     * @name pc.IndexBuffer#lock
     * @description Gives access to the block of memory that stores the buffer's indices.
     * @returns {ArrayBuffer} A contiguous block of memory where index data can be written to.
     */
    lock() {
        return this.storage;
    }

    /**
     * @function
     * @name pc.IndexBuffer#unlock
     * @description Signals that the block of memory returned by a call to the lock function is
     * ready to be given to the graphics hardware. Only unlocked index buffers can be set on the
     * currently active device.
     */
    unlock() {
        // Upload the new index data
        const gl = this.device.gl;

        if (!this.bufferId) {
            this.bufferId = gl.createBuffer();
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
                if (this.device.webgl2) {
                    glUsage = gl.DYNAMIC_COPY;
                } else {
                    glUsage = gl.STATIC_DRAW;
                }
                break;
        }

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferId);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.storage, glUsage);
    }

    setData(data) {
        if (data.byteLength !== this.numBytes) {
            console.error(`IndexBuffer: wrong initial data size: expected ${this.numBytes}, got ${data.byteLength}`);
            return false;
        }
        this.storage = data;
        this.unlock();
        return true;
    }
}