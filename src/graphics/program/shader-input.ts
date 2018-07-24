/**
 * File: c:\Users\35327\Githubs\hypergl\src\graphics\program\shader-input.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Sunday, July 22nd 2018, 8:17:19 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, July 25th 2018, 12:46:23 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */


import { GraphicsDevice } from '../device';
import { UNIFORMTYPE } from '../../hgl';
import { Version } from './version';

export class ShaderInput {
    scopeId;
    version: Version;
    dataType: UNIFORMTYPE;
    value = [null, null, null, null];
    // Array to hold texture unit ids
    array = [];
    constructor(graphicsDevice: GraphicsDevice, name: number, type: UNIFORMTYPE, public locationId: number) {
        this.dataType = type;
        this.version = new Version();
        this.scopeId = graphicsDevice.scope.resolve(name);
        // if (type === UNIFORMTYPE.FLOAT) {
        //     // tslint:disable-next-line:no-parameter-reassignment
        //     if (name.substr(name.length - 3) === '[0]') { type = UNIFORMTYPE.FLOATARRAY; }
        // }
    }
}