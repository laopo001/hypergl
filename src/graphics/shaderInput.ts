/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\shaderInput.ts
 * Created Date: Wednesday, August 29th 2018, 12:20:47 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, September 1st 2018, 3:44:23 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { RendererPlatform } from './renderer';
import { UNIFORM_TYPE } from '../conf';
export class ShaderVariable {
    constructor(public name: string, public type: UNIFORM_TYPE, public locationId: number) {

    }
}