/*
 * ProjectName: hypergl
 * FilePath: \src\texture\texture.ts
 * Created Date: Saturday, December 29th 2018, 2:36:54 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, December 29th 2018, 3:34:40 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { BaseTexture, SourceElement } from './baseTexture';
import { Application } from '../application';


export class Texture extends BaseTexture {
    source?: SourceElement;
    static loadImage(url: string) {
        let app = Application.getApp();
        let texture = new Texture(app.renderer.gl.createTexture()!);
        fetch(url).then(b => b.blob()).then(blob => createImageBitmap(blob)).then(img => {
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
