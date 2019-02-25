/*
 * ProjectName: hypergl
 * FilePath: \src\texture\texture.ts
 * Created Date: Saturday, December 29th 2018, 2:36:54 pm
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


export class Texture extends BaseTexture {
    source?: SourceElement;
    static loadImage(url: string) {
        let app = Application.getApp().unwrap();
        let texture = new Texture(app.renderer.gl.createTexture()!);
        // loadImage
        loadImage(url).then(img => {
            texture.setSource(img);
            app.renderer.initTexture(texture);
        });
        return texture;
        // app.renderer.loadTexture
    }
    static async loadImageAsync(url: string) {
        let app = await Application.getAsyncApp();
        let texture = new Texture(app.renderer.gl.createTexture()!);
        // loadImage
        await loadImage(url).then(img => {
            texture.setSource(img);
            app.renderer.initTexture(texture);
        });
        return texture;
        // app.renderer.loadTexture
    }
    setSource(source: SourceElement) {
        this.source = source;
        this._width = source.width;
        this._height = source.height;
    }
}
