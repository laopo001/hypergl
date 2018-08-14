/**
 * File: c:\Users\35327\Githubs\hypergl\src\graphics\program\shader-help.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Sunday, July 15th 2018, 4:05:06 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, July 27th 2018, 12:05:47 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

import { shaderChunks } from './chunks';
import { GraphicsDevice } from '../device';
import { basic } from './basic';
export const programlib = {
    fogCode(value) {
        if (value === 'linear') {
            return shaderChunks.fogLinearPS;
        } else if (value === 'exp') {
            return shaderChunks.fogExpPS;
        } else if (value === 'exp2') {
            return shaderChunks.fogExp2PS;
        } else {
            return shaderChunks.fogNonePS;
        }
    },
    skinCode(device: GraphicsDevice, chunks?) {
        // tslint:disable-next-line:no-parameter-reassignment
        if (!chunks) chunks = shaderChunks;
        if (device.supportsBoneTextures) {
            return chunks.skinTexVS;
        } else {
            return `#define BONE_LIMIT ${device.getBoneLimit()}\n${chunks.skinConstVS}`;
        }
    },
    precisionCode(device: GraphicsDevice) {
        let pcode = 'precision ' + device.precision + ' float;\n';
        if (device.webgl2) {
            pcode += '#ifdef GL2\nprecision ' + device.precision + ' sampler2DShadow;\n#endif\n';
        }
        return pcode;
    },

    versionCode(device: GraphicsDevice) {
        return device.webgl2 ? '#version 300 es\n' : '';
    },
    dummyFragmentCode() {
        return 'void main(void) {gl_FragColor = vec4(0.0);}';
    },
    begin() {
        return 'void main(void)\n{\n';
    },
    end() {
        return '}\n';
    }
};

export const generators = {
    basic
};

