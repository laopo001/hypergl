/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\graphics\vertexFormat.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Thursday, July 12th 2018, 8:51:24 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, July 13th 2018, 1:20:14 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

import { GraphicsDevice } from "./device";

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
    constructor(private device: GraphicsDevice, description: VertexType[]) {
        for (let i = 0, len = description.length; i < len; i++) {
            var elementDesc = description[i];
            let element: VertexAttribData = {
                semantic: elementDesc.semantic,
                offset: 0,
                stride: 0,
                stream: -1,
                dataType: elementDesc.dataType,
                length: elementDesc.length,
                normalize: (elementDesc.normalize === undefined) ? false : elementDesc.normalize,
                size: elementDesc.length * _typeSize[elementDesc.dataType]
            };
            this.elements.push(element);
            // This buffer will be accessed by a Float32Array and so must be 4 byte aligned
            this.size += Math.ceil(element.size / 4) * 4;
            if (elementDesc.semantic === HGL.SEMANTIC.TEXCOORD0) {
                this.hasUv0 = true;
            } else if (elementDesc.semantic === HGL.SEMANTIC.TEXCOORD1) {
                this.hasUv1 = true;
            } else if (elementDesc.semantic === HGL.SEMANTIC.COLOR) {
                this.hasColor = true;
            }
        }
    }
}