/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\generateShader.ts
 * Created Date: Saturday, August 25th 2018, 3:45:20 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 25th 2018, 4:27:54 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */



import basicVert from './shaders/basic.vert';
import basicFrag from './shaders/basic.frag';
import { RendererPlatform } from './renderer';

const basicVertStr = basicVert({ 'GL2': true });
const basicFragStr = basicFrag({ 'GL2': true });
export {
    basicVertStr,
    basicFragStr
};

export class ShaderGenerater {
    constructor(private renderer: RendererPlatform) {

    }
}