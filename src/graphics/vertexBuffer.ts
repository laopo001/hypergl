/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\graphics\vertexBuffer.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Thursday, July 12th 2018, 8:02:55 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, July 12th 2018, 8:58:12 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */


import { GraphicsDevice } from './device';
import { VertexFormat } from './vertexFormat';



export class VertexBuffer {
    bufferId: WebGLBuffer;
    storage: ArrayBuffer;
    numBytes: number;
    constructor(private device: GraphicsDevice, private format: VertexFormat, private numVertices: number, private usage: number = HGL.BUFFER_STATIC, private initialData?: number[]) {
        this.numBytes = format.size * numVertices;
        const gl = device.gl;
        if (initialData) {

        }
    }
    setData(data: ArrayBuffer) {
        const gl = this.device.gl;
        if (data.byteLength !== this.numBytes) {
            console.error("VertexBuffer: wrong initial data size: expected " + this.numBytes + ", got " + data.byteLength);
            return;
        }
        this.storage = data;
        this.bufferId = gl.createBuffer();
        var glUsage;
        switch (this.usage) {
            case HGL.BUFFER_STATIC:
                glUsage = gl.STATIC_DRAW;
                break;
            case HGL.BUFFER_DYNAMIC:
                glUsage = gl.DYNAMIC_DRAW;
                break;
            case HGL.BUFFER_STREAM:
                glUsage = gl.STREAM_DRAW;
                break;
            case HGL.BUFFER_GPUDYNAMIC:
                if (this.device.webgl2) {
                    glUsage = gl.DYNAMIC_COPY;
                } else {
                    glUsage = gl.STATIC_DRAW;
                }
                break;
        }
    }
}
