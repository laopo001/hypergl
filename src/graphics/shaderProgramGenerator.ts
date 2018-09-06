/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\generateShader.ts
 * Created Date: Saturday, August 25th 2018, 3:45:20 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, September 6th 2018, 6:03:01 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */



import basicVert from './shaders/basic.vert';
import basicFrag from './shaders/basic.frag';
import { RendererPlatform } from './renderer';
import { Shader } from './shader';
import { SEMANTIC } from '../conf';
import { Undefined } from '../types';
import { ShaderVariable } from './shaderVariable';



export class ShaderProgramGenerator {
    generator: { [s: string]: any } = {};
    private _cache: { [s: string]: Undefined<Shader> } = {};
    constructor(private renderer: RendererPlatform) {

    }
    getProgram(name: string, attributes = {}, uniforms = {}) {
        let { platform } = this.renderer;
        let data = {};
        data['GL2'] = platform === 'webgl2';
        let options = { attributes, uniforms, data };
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
    let str = '';
    // tslint:disable-next-line:forin
    for (let x in options.uniforms) {
        str += x + ',';
    }
    return JSON.stringify(options.attributes) + JSON.stringify(options.data) + str;
}

function createShaderDefinition(renderer: RendererPlatform, options) {
    console.log(options);
    const basicVertStr = basicVert(options);
    const basicFragStr = basicFrag(options);
    // let attributes: any = { vertex_position: SEMANTIC.POSITION };
    // let variables: any[] = [];
    // if (options.vertex_color) {
    //     attributes.vertex_color = SEMANTIC.COLOR;
    // }
    // if (options.diffuseMap) {
    //     attributes.vertex_texCoord0 = SEMANTIC.TEXCOORD0;
    // }
    return {
        attributes: options.attributes,
        vshader: basicVertStr,
        fshader: basicFragStr
    };
}