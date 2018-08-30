/*
 * ProjectName: hypergl
 * FilePath: \src\material\basicMaterial.ts
 * Created Date: Saturday, August 25th 2018, 4:46:29 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, August 30th 2018, 7:10:24 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
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
        this.setParameter('vertex_color', this.color.data);
        if (this.colorMap) {
            // TODO
            // this.setParameter('texture_diffuseMap', this.colorMap);
        }
    }
    updateShader(renderer: RendererPlatform) {
        this.shader = renderer.programGenerator.getProgram('basice', { ...this.parameters });
    }
}