/*
 * ProjectName: hypergl
 * FilePath: \src\utils\index.ts
 * Created Date: Monday, October 22nd 2018, 11:37:28 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, January 1st 2019, 2:24:44 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { loadImage } from './util';
export * from './util';
export function sleep(time: number) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    });
}
export { loadImage };