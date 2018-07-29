/**
 * File: c:\Users\35327\Githubs\hypergl\src\graphics\vertex-iterator.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Saturday, July 28th 2018, 12:43:34 am
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, July 28th 2018, 1:17:30 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

import * as HGL from '../hgl';
import { VertexBuffer } from './vertexBuffer';
import { VertexAttribData } from './vertexFormat';

export class VertexIteratorSetter {
    index = 0;
    array;
    constructor(buffer, vertexAttribData: VertexAttribData) {
        switch (vertexAttribData.dataType) {
            case HGL.DataType.INT8:
                this.array = new Int8Array(buffer, vertexAttribData.offset);
                break;
            case HGL.DataType.UINT8:
                this.array = new Uint8Array(buffer, vertexAttribData.offset);
                break;
            case HGL.DataType.INT16:
                this.array = new Int16Array(buffer, vertexAttribData.offset);
                break;
            case HGL.DataType.UINT16:
                this.array = new Uint16Array(buffer, vertexAttribData.offset);
                break;
            case HGL.DataType.INT32:
                this.array = new Int32Array(buffer, vertexAttribData.offset);
                break;
            case HGL.DataType.UINT32:
                this.array = new Uint32Array(buffer, vertexAttribData.offset);
                break;
            case HGL.DataType.FLOAT32:
                this.array = new Float32Array(buffer, vertexAttribData.offset);
                break;
        }
    }
    set(...thisArg) {
        switch (length) {
            case 1: this.VertexIteratorSetter_set1.apply(this, thisArg); break;
            case 2: this.VertexIteratorSetter_set2.apply(this, thisArg); break;
            case 3: this.VertexIteratorSetter_set3.apply(this, thisArg); break;
            case 4: this.VertexIteratorSetter_set4.apply(this, thisArg); break;
        }
    }
    private VertexIteratorSetter_set1(a) {
        this.array[this.index] = a;
    }

    private VertexIteratorSetter_set2(a, b) {
        this.array[this.index] = a;
        this.array[this.index + 1] = b;
    }

    private VertexIteratorSetter_set3(a, b, c) {
        this.array[this.index] = a;
        this.array[this.index + 1] = b;
        this.array[this.index + 2] = c;
    }

    private VertexIteratorSetter_set4(a, b, c, d) {
        this.array[this.index] = a;
        this.array[this.index + 1] = b;
        this.array[this.index + 2] = c;
        this.array[this.index + 3] = d;
    }
}


export class VertexIterator {
    vertexBuffer: VertexBuffer;
    buffer: ArrayBuffer;
    setters: VertexIteratorSetter[];
    element: {
        [x: string]: VertexIteratorSetter
    };
    constructor(vertexBuffer: VertexBuffer) {
        // Store the vertex buffer
        this.vertexBuffer = vertexBuffer;

        // Lock the vertex buffer
        this.buffer = this.vertexBuffer.lock();

        // Create an empty list
        this.setters = [];
        this.element = {};

        // Add a new 'setter' function for each element
        const vertexFormat = this.vertexBuffer.getFormat();
        for (let i = 0; i < vertexFormat.elements.length; i++) {
            const vertexElement = vertexFormat.elements[i];
            this.setters[i] = new VertexIteratorSetter(this.buffer, vertexElement);
            this.element[vertexElement.semantic] = this.setters[i];
        }
    }

    next() {
        let i = 0;
        const setters = this.setters;
        const numSetters = this.setters.length;
        const vertexFormat = this.vertexBuffer.getFormat();
        while (i < numSetters) {
            const setter = setters[i++];
            // BYTES_PER_ELEMENT is on the instance and constructor for Chrome, Safari and Firefox
            // but just the constructor for Opera
            setter.index += vertexFormat.size / setter.array.constructor.BYTES_PER_ELEMENT;
        }
    }

    end() {
        // Unlock the vertex buffer
        this.vertexBuffer.unlock();
    }
}