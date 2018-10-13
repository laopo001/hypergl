/*
 * ProjectName: hypergl
 * FilePath: \src\material\phoneMaterial.ts
 * Created Date: Thursday, September 6th 2018, 5:56:00 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, October 14th 2018, 1:57:35 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Scene } from '../scene/scene';
import { Color } from '../core/color';
import { Texture } from '../texture';
import { Material } from './material';
import { RendererPlatform } from '../graphics/renderer';
import { SEMANTIC } from '../conf';
import { Vec3 } from '../math';

export class StandardMaterial extends Material {
    ambientColor = Scene.ambientColor;
    diffuseColor = new Color(1, 1, 1);
    diffuseTexture?: Texture;
    specularColor = new Color(0.3, 0.3, 0.3);
    specularTexture?: Texture;
    shininess = 64;
    constructor() {
        super();
        this.update();
    }
    update() {
        // this.setParameter('lightPosition', new Vec3(1, 1, 1).data);
        this.setUniform('ambientColor', this.ambientColor.data);
        this.setUniform('diffuseColor', this.diffuseColor.data);
        // tslint:disable-next-line:no-unused-expression
        this.diffuseTexture && this.setUniform('diffuseTexture', this.diffuseTexture);
        this.setUniform('specularColor', this.specularColor.data);
        // tslint:disable-next-line:no-unused-expression
        this.specularTexture && this.setUniform('specularTexture', this.specularTexture);
        this.setUniform('shininess', this.shininess);
        this.setUniform('opacity', this.opacity);
        this._dirtyUpdate = true;
    }
    updateShader(renderer: RendererPlatform, attributes: { [s: string]: SEMANTIC }) {
        if (this.shader == null) {
            this.shader = renderer.programGenerator.getShader('PhoneMaterial', attributes, this.uniforms);
        }

        if (this._dirtyUpdate) {
            // tslint:disable-next-line:forin
            for (let key in this.uniforms) {
                this.shader.setUniformValue(key, this.uniforms[key]);
            }
            this._dirtyUpdate = false;
        }
    }
}