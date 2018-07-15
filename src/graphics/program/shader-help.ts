/**
 * File: c:\Users\35327\Githubs\hypergl\src\graphics\program\shader-help.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Sunday, July 15th 2018, 4:05:06 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, July 15th 2018, 4:08:17 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */


export const shaderHelper = {
    precisionCode(device) {
        let pcode = 'precision ' + device.precision + ' float;\n';
        if (device.webgl2) {
            pcode += '#ifdef GL2\nprecision ' + device.precision + ' sampler2DShadow;\n#endif\n';
        }
        return pcode;
    },

    versionCode(device) {
        return device.webgl2 ? '#version 300 es\n' : '';
    },
    begin() {
        return 'void main(void)\n{\n';
    },

    end() {
        return '}\n';
    }
};