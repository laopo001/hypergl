/*
 * ProjectName: hypergl
 * FilePath: \src\material\basicMaterial.ts
 * Created Date: Saturday, August 25th 2018, 4:46:29 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, November 24th 2018, 1:25:04 am
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
        this.setUniform('diffuseColor', this.color.data);
        if (this.colorMap) {
            this.setUniform('diffuseTexture', this.colorMap);
        }
    }
    updateShader(attributes: { [s: string]: SEMANTIC }) {
        let renderer = this.app.renderer;
        if (this.shader == null) {
            this.shader = renderer.programGenerator.getShader('BasicMaterial', attributes, this.uniforms);
        }
        this.shader.uniformScope = this.uniforms;
    }
}