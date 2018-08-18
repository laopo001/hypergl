/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\vertexBuffer.ts
 * Created Date: Tuesday, August 14th 2018, 5:02:32 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 8:25:12 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */



import { TypeArray } from '../types';
import { VertexFormat } from './vertexFormat';
import { BUFFER } from '../conf';
export class VertexBuffer {
    buffer!: ArrayBuffer;
    numVertices!: number;
    constructor(format: VertexFormat, usage: number, data: ArrayBuffer, numVertices: number)
    constructor(format: VertexFormat, usage: number, data: Array<number>)
    constructor(private format: VertexFormat, private usage: number = BUFFER.STATIC, data: Array<number> | ArrayBuffer, numVertices?) {

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
}