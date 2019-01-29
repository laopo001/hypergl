/*
 * ProjectName: hypergl
 * FilePath: \src\scene\pick.ts
 * Created Date: Tuesday, January 29th 2019, 5:34:09 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, January 29th 2019, 5:59:32 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */

import { Scene } from './scene';
import { Frame } from '../graphics/createFrame';
import { rendererPickerFrame } from './renderScence';
export class Picker {
    pickFrame: Frame;
    constructor(public scene: Scene) {
        let [x, y, width, height] = scene.app.renderer.gerViewport();
        this.pickFrame = this.scene.createShadowFrame(width, height, false);
    }
    pick(x, y) {
        let gl = this.scene.app.renderer.gl;
        rendererPickerFrame(this);
        let pixels = new Uint8Array(4);
        gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        console.log(pixels);
    }
}