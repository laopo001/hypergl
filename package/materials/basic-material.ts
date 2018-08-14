/**
 * File: c:\Users\35327\Githubs\hypergl\src\materials\basic-material.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Friday, July 27th 2018, 1:01:34 am
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, July 28th 2018, 12:03:54 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

import { Material } from './material';
import { Color } from '../core/color';
export class BasicMaterial extends Material {
    color = new Color(1, 1, 1, 1);
    colorMap = null;
    vertexColors = false;
    constructor() {
        super();
        this.update();
    }
    clone() {
        const clone = new BasicMaterial();

        Material.prototype._cloneInternal.call(this, clone);

        clone.color.copy(this.color);
        clone.colorMap = this.colorMap;
        clone.vertexColors = this.vertexColors;

        clone.update();
        return clone;
    }

    update() {
        this.clearParameters();

        this.setParameter('uColor', this.color.data);
        if (this.colorMap) {
            this.setParameter('texture_diffuseMap', this.colorMap);
        }
    }

    updateShader(device, scene, objDefs, staticLightList, pass, sortedLights) {
        const options = {
            skin: !!this.meshInstances[0].skinInstance,
            vertexColors: this.vertexColors,
            diffuseMap: this.colorMap,
            pass
        };
        const library = device.getProgramLibrary();
        this.shader = library.getProgram('basic', options);
    }
}