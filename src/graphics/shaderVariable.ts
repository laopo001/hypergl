/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\shaderInput.ts
 * Created Date: Wednesday, August 29th 2018, 12:20:47 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, May 7th 2019, 12:25:43 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { RendererPlatform } from './renderer';
import { ACTIVE_INFO_TYPE } from '../conf';
import { VertexAttribData } from './vertexFormat';
export class ShaderVariable {
    enable = false;
    element?: VertexAttribData;
    constructor(public name: string, public type: ACTIVE_INFO_TYPE, public locationId: number) {

    }
}