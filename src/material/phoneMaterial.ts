/*
 * ProjectName: hypergl
 * FilePath: \src\material\phoneMaterial.ts
 * Created Date: Thursday, September 6th 2018, 5:56:00 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, September 6th 2018, 8:35:24 pm
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

export class PhoneMaterial extends Material {
    ambientColor = Scene.ambientColor;
    diffuseColor = new Color(1, 1, 1);
    diffuseTexture?: Texture;
    specularColor = new Color(0, 0, 0);
    specularTexture?: Texture;
    shininess = 64;
    update() {
        // TODO
    }
    updateShader(renderer: RendererPlatform, attributes: { [s: string]: SEMANTIC }) {
        // TODO
    }
}