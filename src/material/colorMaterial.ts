/*
 * ProjectName: hypergl
 * FilePath: \src\material\colorMaterial.ts
 * Created Date: Monday, December 3rd 2018, 12:52:47 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, December 29th 2018, 5:48:01 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Color } from '../core/color';
import { Material } from './material';
import { RendererPlatform } from '../graphics/renderer';
import { Shader } from '../graphics/shader';
import { SEMANTIC } from '../conf';
import { StandardMaterial } from './shandardMaterial';
export class ColorMaterial extends Material {
    get diffuseColor(): Color {
        return this._diffuseColor;
    }
    set diffuseColor(value: Color) {
        this._diffuseColor = value;
        this.setUniform('uDiffuseColor', this.diffuseColor.data);
    }
    get opacity() {
        return this._opacity;
    }
    set opacity(value) {
        this._opacity = value;
        this.setUniform('uOpacity', this.opacity);
    }

    shader?: Shader;
    protected _diffuseColor: Color = new Color(1, 1, 1, 1);
    protected _opacity: number = 1;
    constructor(name?: string) {
        super(name);
        this.setUniform('uDiffuseColor', this.diffuseColor.data);
        this.setUniform('uOpacity', this.opacity);
        // this.update();
    }
    // update() {
    //     this.setUniform('diffuseColor', this.diffuseColor.data);
    //     this.setUniform('opacity', this.opacity);
    // }
    updateShader(attributes: { [s: string]: SEMANTIC }) {
        let renderer = this.app.renderer;
        if (this.shader == null) {
            this.shader = renderer.programGenerator.getShader('color', attributes, this.uniforms);
        }
        this.shader.uniformScope = this.uniforms;
        // Object.assign(this.shader.uniformScope, this.uniforms);
    }
}