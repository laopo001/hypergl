/*
 * ProjectName: hypergl
 * FilePath: \src\material\basicMaterial.ts
 * Created Date: Saturday, August 25th 2018, 4:46:29 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, September 7th 2018, 12:37:29 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Color } from '../core/color';
import { Material } from './material';
import { RendererPlatform } from '../graphics/renderer';
import { Shader } from '../graphics/shader';
import { SEMANTIC } from '../conf';
export class BasicMaterial extends Material {
    color: Color = new Color(1, 1, 1, 1);
    colorMap; // TODO
    shader?: Shader;
    constructor() {
        super();
        this.update();
    }
    update() {
        this.setParameter('diffuseColor', this.color.data);
        if (this.colorMap) {
            this.setParameter('diffuseTexture', this.colorMap);
        }
        this._dirtyUpdate = true;
    }
    updateShader(renderer: RendererPlatform, attributes: { [s: string]: SEMANTIC }) {
        if (this._dirtyUpdate) {
            this.shader = renderer.programGenerator.getShader('BasicMaterial', attributes, this.parameters);
            // tslint:disable-next-line:forin
            for (let key in this.parameters) {
                this.shader.setUniformValue(key, this.parameters[key]);
            }
            this._dirtyUpdate = false;
        }
    }
}