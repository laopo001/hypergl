/*
 * ProjectName: hypergl
 * FilePath: \demo\plugins\loadImage.ts
 * Created Date: Wednesday, December 19th 2018, 4:11:33 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, December 21st 2018, 10:10:53 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { Application, Plugin } from 'hypergl';
export class LoadImagePlugin implements Plugin {
    static pname = 'loadImage';
    constructor(private app: Application) {

    }
    load(url: string) {
        // return new Promise<HTMLImageElement>((resolve, reject) => {
        //     const image = new Image();
        //     image.onload = () => {
        //         resolve(image);
        //     };
        //     image.src = url;
        //     image.crossOrigin = 'anonymous';
        // });
        return fetch(url).then(b => b.blob()).then(blob => {
            return createImageBitmap(blob);
        });
    }
}