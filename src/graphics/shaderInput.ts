/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\shaderInput.ts
 * Created Date: Wednesday, August 29th 2018, 12:20:47 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, September 1st 2018, 2:17:10 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { RendererPlatform } from './renderer';
import { UNIFORM_TYPE } from '../conf';
export class ShaderInput {
    constructor(private renderer: RendererPlatform, public name: string, public type: UNIFORM_TYPE, public locationId: number) {

    }
}