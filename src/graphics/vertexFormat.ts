/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\graphics\vertexFormat.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Thursday, July 12th 2018, 8:51:24 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, July 13th 2018, 6:56:32 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

import { GraphicsDevice } from './device';
import * as HGL from '../hgl';

export interface VertexType {
    semantic: HGL.SEMANTIC,
    length: 1 | 2 | 3 | 4;
    dataType: HGL.DataType;
    normalize: boolean;
}

export interface VertexAttribData extends VertexType {
    offset: number;
    stride: number;
    stream: number;
    size: number;
}

const _typeSize: number[] = [];
_typeSize[HGL.DataType.INT8] = 1;
_typeSize[HGL.DataType.UINT8] = 1;
_typeSize[HGL.DataType.INT16] = 2;
_typeSize[HGL.DataType.UINT16] = 2;
_typeSize[HGL.DataType.INT32] = 4;
_typeSize[HGL.DataType.UINT32] = 4;
_typeSize[HGL.DataType.FLOAT32] = 4;

export class VertexFormat {
    size: number;
    hasUv0 = false;
    hasUv1 = false;
    hasColor = false;
    elements: VertexAttribData[] = [];
    constructor(private device: GraphicsDevice, vartexTypes: VertexType[]) {

        for (let i = 0; i < vartexTypes.length; i++) {
            const desc = vartexTypes[i];
            let element: VertexAttribData = {
                semantic: desc.semantic,
                offset: 0,
                stride: 0,
                stream: -1,
                dataType: desc.dataType,
                length: desc.length,
                normalize: (desc.normalize === undefined) ? false : desc.normalize,
                size: desc.length * _typeSize[desc.dataType]
            };
            this.elements.push(element);
            // This buffer will be accessed by a Float32Array and so must be 4 byte aligned
            this.size += Math.ceil(element.size / 4) * 4;
            if (desc.semantic === HGL.SEMANTIC.TEXCOORD0) {
                this.hasUv0 = true;
            } else if (desc.semantic === HGL.SEMANTIC.TEXCOORD1) {
                this.hasUv1 = true;
            } else if (desc.semantic === HGL.SEMANTIC.COLOR) {
                this.hasColor = true;
            }
        }
        let offset = 0;
        for (let i = 0; i < this.elements.length; i++) {
            const element = this.elements[i];
            element.offset = offset;
            element.stride = this.size;
            offset += element.size;
        }
    }
}