/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\shaderInput.ts
 * Created Date: Wednesday, August 29th 2018, 12:20:47 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, September 6th 2018, 6:03:02 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { RendererPlatform } from './renderer';
import { UNIFORM_TYPE } from '../conf';
import { VertexAttribData } from './vertexFormat';
export class ShaderVariable {
    enable = false;
    element?: VertexAttribData;
    constructor(public name: string, public type: UNIFORM_TYPE, public locationId: number) {

    }
}