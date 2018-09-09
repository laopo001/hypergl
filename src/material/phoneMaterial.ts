/*
 * ProjectName: hypergl
 * FilePath: \src\material\phoneMaterial.ts
 * Created Date: Thursday, September 6th 2018, 5:56:00 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, September 9th 2018, 5:47:47 pm
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
    specularColor = new Color(1, 1, 1);
    specularTexture?: Texture;
    shininess = 64;
    constructor() {
        super();
        this.update();
    }
    update() {
        // this.setParameter('lightPosition', new Vec3(1, 1, 1).data);
        this.setParameter('ambientColor', this.ambientColor.data);
        this.setParameter('diffuseColor', this.diffuseColor.data);
        // tslint:disable-next-line:no-unused-expression
        this.diffuseTexture && this.setParameter('diffuseTexture', this.diffuseTexture);
        this.setParameter('specularColor', this.specularColor.data);
        // tslint:disable-next-line:no-unused-expression
        this.specularTexture && this.setParameter('specularTexture', this.specularTexture);
        this.setParameter('shininess', this.shininess);
        this._dirtyUpdate = true;
    }
    updateShader(renderer: RendererPlatform, attributes: { [s: string]: SEMANTIC }) {
        if (this._dirtyUpdate) {
            this.shader = renderer.programGenerator.getShader('PhoneMaterial', attributes, this.parameters);
            // tslint:disable-next-line:forin
            for (let key in this.parameters) {
                this.shader.setUniformValue(key, this.parameters[key]);
            }
            this._dirtyUpdate = false;
        }
    }
}