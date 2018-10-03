/*
 * ProjectName: hypergl
 * FilePath: \src\material\shaderMaterial.ts
 * Created Date: Friday, September 21st 2018, 10:36:21 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, September 22nd 2018, 1:14:36 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Material } from './material';
import { SEMANTIC } from '../conf';
import { RendererPlatform } from '../graphics/renderer';
import { Log } from '../util';

export class ShaderMaterial extends Material {
    update() {
        //
    }
    updateShader(renderer: RendererPlatform, attributes: { [s: string]: SEMANTIC }) {
        if (this.shader == null) {
            Log.error('this.shader为null');
            return;
        }
        // tslint:disable-next-line:forin
        for (let key in this.uniforms) {
            this.shader.setUniformValue(key, this.uniforms[key]);
        }
    }
}