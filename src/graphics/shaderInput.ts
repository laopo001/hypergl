/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\shaderInput.ts
 * Created Date: Wednesday, August 29th 2018, 12:20:47 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, August 29th 2018, 7:23:31 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { RendererPlatform } from './renderer';
import { GLType } from '../conf';
export class ShaderInput {
    constructor(private renderer: RendererPlatform, public name: string, public type: GLType, public locationId: number) { }
}