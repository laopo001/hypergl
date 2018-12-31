/*
 * ProjectName: hypergl
 * FilePath: \src\utils\index.ts
 * Created Date: Monday, October 22nd 2018, 11:37:28 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, December 31st 2018, 8:57:20 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { loadImage } from './util';
export * from './gltfloader/gltf-loader';

export function sleep(time: number) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    });
}
export { loadImage };