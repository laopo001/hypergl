/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\vertexFormat.ts
 * Created Date: Tuesday, August 14th 2018, 5:02:37 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, September 6th 2018, 6:03:02 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import {  SEMANTIC } from '../conf';
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
    normalize: boolean;
}


export class VertexFormat {
    elements: VertexAttribData[] = [];
    sum_size = 0;
    stride = 0;
    hasUv0 = false;
    hasUv1 = false;
    hasColor = false;
    constructor(vartexTypes: VertexType[]) {
        let offset = 0;
        for (let i = 0; i < vartexTypes.length; i++) {
            const item = vartexTypes[i];
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