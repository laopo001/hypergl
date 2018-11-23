/*
 * ProjectName: hypergl
 * FilePath: \src\material\shaderMaterial.ts
 * Created Date: Friday, September 21st 2018, 10:36:21 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, November 24th 2018, 1:25:22 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Material } from './material';
import { SEMANTIC } from '../conf';
import { RendererPlatform } from '../graphics/renderer';
import { Log } from '../utils/util';

export class ShaderMaterial extends Material {
    update() {
        //
    }
    updateShader(attributes: { [s: string]: SEMANTIC }) {
        if (this.shader == null) {
            Log.error('this.shader为null');
            return;
        }
        this.shader.uniformScope = this.uniforms;
    }
}