/*
 * ProjectName: hypergl
 * FilePath: \src\texture\cubeTexture.ts
 * Created Date: Saturday, December 15th 2018, 7:36:03 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, February 25th 2019, 10:48:32 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { BaseTexture, SourceElement } from './baseTexture';
import { Application } from '../application';
import { loadImage } from '../utils/util';
export class CubeTexture extends BaseTexture {
    source?: Array<SourceElement>;
    isCube = true;
    static loadImage(left_px: string, right_nx: string, top_py: string, bottom_ny: string, front_pz: string, end_nz: string) {
        let app = Application.getApp().unwrap();
        let texture = new CubeTexture(app.renderer.gl.createTexture()!);
        Promise.all([
            loadImage(left_px),
            loadImage(right_nx),
            loadImage(top_py),
            loadImage(bottom_ny),
            loadImage(front_pz),
            loadImage(end_nz)
        ]).then(img => {
            texture.setSource(img[0], img[1], img[2], img[3], img[4], img[5]);
            app.renderer.initTexture(texture);
        });
        return texture;
    }
    static async loadImageAsync(left_px: string, right_nx: string, top_py: string, bottom_ny: string, front_pz: string, end_nz: string) {
        let app = await Application.getAsyncApp();
        let texture = new CubeTexture(app.renderer.gl.createTexture()!);
        await Promise.all([
            loadImage(left_px),
            loadImage(right_nx),
            loadImage(top_py),
            loadImage(bottom_ny),
            loadImage(front_pz),
            loadImage(end_nz)
        ]).then(img => {
            texture.setSource(img[0], img[1], img[2], img[3], img[4], img[5]);
            app.renderer.initTexture(texture);
        });
        return texture;
    }
    setSource(left: SourceElement, right: SourceElement, top: SourceElement, bottom: SourceElement, front: SourceElement, end: SourceElement) {
        this.source = [left, right, top, bottom, front, end];
        this._width = left.width;
        this._height = left.height;
    }
}