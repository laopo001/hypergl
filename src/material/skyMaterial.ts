/*
 * ProjectName: hypergl
 * FilePath: \src\material\skyMaterial.ts
 * Created Date: Wednesday, December 12th 2018, 3:05:53 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, December 12th 2018, 5:00:04 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { Material } from './material';
import { SEMANTIC, FACE } from '../conf';
import { Texture } from '../texture';
export class SkyMaterial extends Material {
    get cubeTexture(): Texture {
        return this._cubeTexture!;
    }
    set cubeTexture(value: Texture) {
        this._cubeTexture = value;
        this.setUniform('uSkyBox', this.cubeTexture);
    }
    cullFace = FACE.NONE;
    private _cubeTexture?: Texture;

    updateShader(attributes: { [s: string]: SEMANTIC }) {
        let renderer = this.app.renderer;
        this.shader = renderer.programGenerator.getShader('SkyMaterial', attributes, this.uniforms);
        this.shader.uniformScope = this.uniforms;
    }
}