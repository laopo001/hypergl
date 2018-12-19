/*
 * ProjectName: hypergl
 * FilePath: \demo\plugins\loadImage.ts
 * Created Date: Wednesday, December 19th 2018, 4:11:33 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, December 19th 2018, 4:33:28 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { Application } from '../../src';
export class LoadImagePlugin {
    name = 'loadImage';
    constructor(private app: Application) {

    }
    load(url: string) {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                resolve(image);
            };
            image.src = url;
            image.crossOrigin = 'anonymous';
        });
    }
}