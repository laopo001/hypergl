/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\generateShader.ts
 * Created Date: Saturday, August 25th 2018, 3:45:20 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 25th 2018, 6:57:42 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */



import basicVert from './shaders/basic.vert';
import basicFrag from './shaders/basic.frag';
import { RendererPlatform } from './renderer';
import { Shader } from './shader';
import { SEMANTIC } from '../conf';
import { Undefined } from '../types';



export class ShaderProgramGenerator {
    generator: { [s: string]: any } = {};
    private _cache: { [s: string]: Undefined<Shader> } = {};
    constructor(private renderer: RendererPlatform) {

    }
    getProgram(name: string, options = {}) {
        let { platform } = this.renderer;
        options['GL2'] = platform === 'webgl2';
        const key = generateKey(options);
        let shader = this._cache[key];
        if (!shader) {
            let shaderDefinition = createShaderDefinition(this.renderer, options);
            shader = this._cache[key] = new Shader(this.renderer, shaderDefinition);
        }
        return shader;
    }
}

function generateKey(options) {
    return JSON.stringify(options);
}

function createShaderDefinition(renderer: RendererPlatform, options) {
    const basicVertStr = basicVert(options);
    const basicFragStr = basicFrag(options);
    let attributes: any = { vertex_position: SEMANTIC.POSITION };
    if (options.vertexColors) {
        attributes.vertex_color = SEMANTIC.COLOR;
    }
    if (options.diffuseMap) {
        attributes.vertex_texCoord0 = SEMANTIC.TEXCOORD0;
    }
    return {
        attributes,
        vshader: basicVertStr,
        fshader: basicFragStr
    };
}