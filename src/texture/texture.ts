/*
 * ProjectName: hypergl
 * FilePath: \src\texture\texture.ts
 * Created Date: Saturday, December 29th 2018, 2:36:54 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, December 29th 2018, 2:53:18 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { BaseTexture, SourceElement } from './baseTexture';


export class Texture extends BaseTexture {
    source?: SourceElement;
    setSource(source: SourceElement) {
        this.source = source;
        this._width = source.width;
        this._height = source.height;
    }
}
