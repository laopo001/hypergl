/*
 * ProjectName: hypergl
 * FilePath: \src\texture\cubeTexture.ts
 * Created Date: Saturday, December 15th 2018, 7:36:03 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, December 29th 2018, 6:40:22 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { BaseTexture, SourceElement } from './baseTexture';
import { Application } from '../application';

export class CubeTexture extends BaseTexture {
    source?: Array<SourceElement>;
    isCube = true;
    static loadImage(left_px: string, right_nx: string, top_py: string, bottom_ny: string, front_pz: string, end_nz: string) {
        let app = Application.getApp();
        let texture = new CubeTexture(app.renderer.gl.createTexture()!);
        Promise.all([
            fetch(left_px).then(b => b.blob()).then(blob => createImageBitmap(blob)),
            fetch(right_nx).then(b => b.blob()).then(blob => createImageBitmap(blob)),
            fetch(top_py).then(b => b.blob()).then(blob => createImageBitmap(blob)),
            fetch(bottom_ny).then(b => b.blob()).then(blob => createImageBitmap(blob)),
            fetch(front_pz).then(b => b.blob()).then(blob => createImageBitmap(blob)),
            fetch(end_nz).then(b => b.blob()).then(blob => createImageBitmap(blob))
        ]).then(img => {
            texture.setSource(...img);
            app.renderer.initTexture(texture);
        });
        return texture;
    }
    setSource(left: SourceElement, right: SourceElement, top: SourceElement, bottom: SourceElement, front: SourceElement, end: SourceElement) {
        this.source = [left, right, top, bottom, front, end];
    }
}