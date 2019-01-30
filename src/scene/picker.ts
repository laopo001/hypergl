/*
 * ProjectName: hypergl
 * FilePath: \src\scene\pick.ts
 * Created Date: Tuesday, January 29th 2019, 5:34:09 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, January 30th 2019, 4:25:05 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */

import { Scene } from './scene';
import { Frame } from '../graphics/createFrame';
import { rendererPickerFrame } from './renderScence';
import { ColorMaterial } from '../material';
import { n_decimal_to_10 } from '../utils';
import { Entity } from '../ecs';

export class Picker {
    pickFrame: Frame;
    colorMaterial = new ColorMaterial();
    pixels = new Uint8Array(4);
    constructor(public scene: Scene) {
        let [x, y, width, height] = scene.app.renderer.gerViewport();
        this.pickFrame = this.scene.createShadowFrame(width, height, false);
    }
    pick(x, y) {
        let gl = this.scene.app.renderer.gl;
        let [_x, _y, width, height] = this.scene.app.renderer.gerViewport();
        let entitys = this.scene.entitys;
        rendererPickerFrame(this, this.colorMaterial, () => {
            gl.readPixels(x, height - y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, this.pixels);
        });
        let index = n_decimal_to_10(this.pixels as any, 256);
        console.log(this.pixels, index, entitys[index].name);
        return entitys[index];
    }
}