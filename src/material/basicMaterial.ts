/*
 * ProjectName: hypergl
 * FilePath: \src\material\basicMaterial.ts
 * Created Date: Saturday, August 25th 2018, 4:46:29 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, September 6th 2018, 9:03:04 pm
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
    private _dirtyUpdate = true;
    constructor() {
        super();
        this.update();
    }
    update() {
        this.setParameter('uColor', this.color.data);
        if (this.colorMap) {
            this.setParameter('diffuseMap', this.colorMap);
        }
        this._dirtyUpdate = true;
    }
    updateShader(renderer: RendererPlatform, attributes: { [s: string]: SEMANTIC }) {
        if (this._dirtyUpdate) {
            this.shader = renderer.programGenerator.getProgram('BasicMaterial', attributes, this.parameters);
            // tslint:disable-next-line:forin
            for (let key in this.parameters) {
                this.shader.setUniformValue(key, this.parameters[key]);
            }
            this._dirtyUpdate = false;
        }
    }
}