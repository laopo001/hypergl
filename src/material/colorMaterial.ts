/*
 * ProjectName: hypergl
 * FilePath: \src\material\colorMaterial.ts
 * Created Date: Monday, December 3rd 2018, 12:52:47 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, December 3rd 2018, 1:30:46 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Color } from '../core/color';
import { Material } from './material';
import { RendererPlatform } from '../graphics/renderer';
import { Shader } from '../graphics/shader';
import { SEMANTIC } from '../conf';
export class ColorMaterial extends Material {
    get color(): Color {
        return this._color;
    }
    set color(value: Color) {
        this._color = value;
        this.setUniform('diffuseColor', this.color.data);
    }
    get opacity() {
        return this._opacity;
    }
    set opacity(value) {
        this._opacity = value;
        this.setUniform('opacity', this.opacity);
    }

    shader?: Shader;
    private _color: Color = new Color(1, 1, 1, 1);
    private _opacity: number = 1;
    constructor() {
        super();
        this.update();
    }
    update() {
        this.setUniform('diffuseColor', this.color.data);
        this.setUniform('opacity', this.opacity);
    }
    updateShader(attributes: { [s: string]: SEMANTIC }) {
        let renderer = this.app.renderer;
        if (this.shader == null) {
            this.shader = renderer.programGenerator.getShader('color', attributes, this.uniforms);
        }
        this.shader.uniformScope = this.uniforms;
        // Object.assign(this.shader.uniformScope, this.uniforms);
    }
}