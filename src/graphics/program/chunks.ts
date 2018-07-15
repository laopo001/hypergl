/**
 * File: c:\Users\35327\Githubs\hypergl\src\graphics\program\shaders\chunks.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Sunday, July 15th 2018, 6:20:58 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, July 15th 2018, 7:05:16 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

// module shaderChunks
import * as  HGl from '../../hgl';
import { Shader } from './shader';
import { shaderHelper } from './shader-help';

const attrib2Semantic = {
    vertex_position: HGl.SEMANTIC.POSITION,
    vertex_normal: HGl.SEMANTIC.NORMAL,
    vertex_tangent: HGl.SEMANTIC.TANGENT,
    vertex_texCoord0: HGl.SEMANTIC.TEXCOORD0,
    vertex_texCoord1: HGl.SEMANTIC.TEXCOORD1,
    vertex_texCoord2: HGl.SEMANTIC.TEXCOORD2,
    vertex_texCoord3: HGl.SEMANTIC.TEXCOORD3,
    vertex_texCoord4: HGl.SEMANTIC.TEXCOORD4,
    vertex_texCoord5: HGl.SEMANTIC.TEXCOORD5,
    vertex_texCoord6: HGl.SEMANTIC.TEXCOORD6,
    vertex_texCoord7: HGl.SEMANTIC.TEXCOORD7,
    vertex_color: HGl.SEMANTIC.COLOR,
    vertex_boneIndices: HGl.SEMANTIC.BLENDINDICES,
    vertex_boneWeights: HGl.SEMANTIC.BLENDWEIGHT
};
const shaderChunks = {};

export function collectAttribs(vsCode) {
    let attribs = {};
    let attrs = 0;

    let found = vsCode.indexOf('attribute');
    while (found >= 0) {
        if (found > 0 && vsCode[found - 1] === '/') break;
        let endOfLine = vsCode.indexOf(';', found);
        let startOfAttribName = vsCode.lastIndexOf(' ', endOfLine);
        let attribName = vsCode.substr(startOfAttribName + 1, endOfLine - (startOfAttribName + 1));

        let semantic = attrib2Semantic[attribName];
        if (semantic !== undefined) {
            attribs[attribName] = semantic;
        } else {
            attribs[attribName] = 'ATTR' + attrs;
            attrs++;
        }

        found = vsCode.indexOf('attribute', found + 1);
    }
    return attribs;
}


export function createShader(device, vsName, psName, useTransformFeedback) {
    let vsCode = shaderChunks[vsName];
    let psCode = shaderHelper.precisionCode(device) + '\n' + shaderChunks[psName];
    let attribs = collectAttribs(vsCode);

    if (device.webgl2) {
        vsCode = shaderHelper.versionCode(device) + this.gles3VS + vsCode;
        psCode = shaderHelper.versionCode(device) + this.gles3PS + psCode;
    }

    return new Shader(device, {
        attributes: attribs,
        vshader: vsCode,
        fshader: psCode,
        useTransformFeedback
    });
}

export function createShaderFromCode(device, vsCode, psCode, uName, useTransformFeedback) {
    let shaderCache = device.programLib._cache;
    let cached = shaderCache[uName];
    if (cached !== undefined) return cached;

    // tslint:disable-next-line:no-parameter-reassignment
    psCode = shaderHelper.precisionCode(device) + '\n' + (psCode || shaderHelper.dummyFragmentCode());
    let attribs = collectAttribs(vsCode);

    if (device.webgl2) {
        // tslint:disable-next-line:no-parameter-reassignment
        vsCode = shaderHelper.versionCode(device) + this.gles3VS + vsCode;
        // tslint:disable-next-line:no-parameter-reassignment
        psCode = shaderHelper.versionCode(device) + this.gles3PS + psCode;
    }

    shaderCache[uName] = new Shader(device, {
        attributes: attribs,
        vshader: vsCode,
        fshader: psCode,
        useTransformFeedback
    });
    return shaderCache[uName];
}