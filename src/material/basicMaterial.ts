/*
 * ProjectName: hypergl
 * FilePath: \src\material\basicMaterial.ts
 * Created Date: Saturday, August 25th 2018, 4:46:29 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, September 6th 2018, 6:03:02 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Color } from '../core/color';
import { Material } from './material';
import { RendererPlatform } from '../graphics/renderer';
import { Shader } from '../graphics/shader';
export class BasicMaterial extends Material {
    color: Color = new Color(1, 1, 1, 1);
    colorMap; // TODO
    shader?: Shader;
    constructor() {
        super();
        this.update();
    }
    update() {
        this.setParameter('uColor', this.color.data);
        if (this.colorMap) {
            // TODO
            this.setParameter('diffuseMap', this.colorMap);
        }
    }
    updateShader(renderer: RendererPlatform, attributes) {
        this.shader = renderer.programGenerator.getProgram('basice', attributes, this.parameters);
    }
}