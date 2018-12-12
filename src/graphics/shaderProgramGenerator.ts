/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\generateShader.ts
 * Created Date: Saturday, August 25th 2018, 3:45:20 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, December 12th 2018, 4:10:25 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */



import basicVert from './shaders/basic.vert';
import basicFrag from './shaders/basic.frag';
import phongVert from './shaders/phong.vert';
import phongFrag from './shaders/phong.frag';
import depthVert from './shaders/depth.vert';
import depthFrag from './shaders/depth.frag';
import distanceVert from './shaders/distance.vert';
import distanceFrag from './shaders/distance.frag';
import colorVert from './shaders/color.vert';
import colorFrag from './shaders/color.frag';
import skyVert from './shaders/sky.vert';
import skyFrag from './shaders/sky.frag';

import { RendererPlatform } from './renderer';
import { Shader } from './shader';
import { SEMANTIC } from '../conf';
import { Obj } from '../types';
import { Log } from '../utils/util';



export class ShaderProgramGenerator {
    generator: { [s: string]: any } = {};
    private _cache: Obj<Shader> = {};
    constructor(private renderer: RendererPlatform) {

    }
    getShader(name: string, attributes = {}, uniforms = {}) {
        let { platform } = this.renderer;
        let data: { [s: string]: any } = {};
        data['GL2'] = platform === 'webgl2';
        data.name = name;
        let options = { attributes, uniforms, data };
        const key = generateKey(options);
        let shader = this._cache[key];
        if (!shader) {
            let shaderDefinition = createShaderDefinition(name, this.renderer, options);
            shader = this._cache[key] = new Shader(this.renderer, shaderDefinition);
            // console.log(shader);
        }
        return shader;
    }
}

function generateKey(options) {
    let str = '';
    // tslint:disable-next-line:forin
    for (let x in options.data) {
        str += x + ',';
    }
    // tslint:disable-next-line:forin
    for (let x in options.uniforms) {
        str += x + ',';
    }
    // tslint:disable-next-line:forin
    for (let x in options.attributes) {
        str += x + ',';
    }
    return str;
}

function createShaderDefinition(name: string, renderer: RendererPlatform, options) {
    // console.log(name, options);
    let vertStr!: string;
    let fragStr!: string;
    switch (name) {
        case 'BasicMaterial':
            vertStr = basicVert(options);
            fragStr = basicFrag(options);
            break;
        case 'PhoneMaterial':
            vertStr = phongVert(options);
            fragStr = phongFrag(options);
            break;
        case 'depth':
            vertStr = depthVert(options);
            fragStr = depthFrag(options);
            break;
        case 'distance':
            vertStr = distanceVert(options);
            fragStr = distanceFrag(options);
            break;
        case 'color':
            vertStr = colorVert(options);
            fragStr = colorFrag(options);
            break;
        case 'SkyMaterial':
            vertStr = skyVert(options);
            fragStr = skyFrag(options);
            break;
        default:
            Log.error('没有找到 ' + name);
    }



    return {
        attributes: options.attributes,
        vshader: vertStr,
        fshader: fragStr
    };
}