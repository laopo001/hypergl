/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\vertexFormat.ts
 * Created Date: Tuesday, August 14th 2018, 5:02:37 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, May 5th 2019, 2:04:16 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { SEMANTIC } from '../conf';
import { TypeArray, TypeArrayConstructor } from '../types';
export interface VertexType {
    semantic: SEMANTIC,
    size: 1 | 2 | 3 | 4;
    dataType: TypeArrayConstructor;
    normalize?: boolean;
}

export interface VertexAttribData extends VertexType {
    offset: number;
    stride: number;
    length: number;
    // normalize: boolean;
}


export class VertexFormat {
    elements: VertexAttribData[] = [];
    sum_size = 0;
    stride = 0;
    hasUv0 = false;
    hasUv1 = false;
    hasColor = false;
    constructor(vertexTypes: VertexType[]) {
        let offset = 0;
        for (let i = 0; i < vertexTypes.length; i++) {
            const item = vertexTypes[i];
            let element: VertexAttribData = {
                semantic: item.semantic,
                offset,
                dataType: item.dataType,
                size: item.size,
                length: item.size * item.dataType.BYTES_PER_ELEMENT,
                normalize: (item.normalize === undefined) ? false : item.normalize,
                stride: 0
            };
            this.elements.push(element);
            offset += item.size * item.dataType.BYTES_PER_ELEMENT;
            this.sum_size += item.size;
            if (item.semantic === SEMANTIC.TEXCOORD0) {
                this.hasUv0 = true;
            } else if (item.semantic === SEMANTIC.TEXCOORD1) {
                this.hasUv1 = true;
            } else if (item.semantic === SEMANTIC.COLOR) {
                this.hasColor = true;
            }
        }
        this.stride = offset;
        this.elements.forEach(item => {
            item.stride = this.stride;
        });
    }

}