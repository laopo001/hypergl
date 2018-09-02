/*
 * ProjectName: hypergl
 * FilePath: \src\core\element.ts
 * Created Date: Saturday, August 18th 2018, 4:23:54 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, September 2nd 2018, 1:44:31 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { generateUUID } from '../math/math';
import { Nullable } from '../types';

export class Base {
    uuid = generateUUID();
    name: Nullable<string> = null;
}


let ComponentIdCount = 0;
export class IElement extends Base {
    id = ComponentIdCount++;
    // uuid = generateUUID();
    // name: Nullable<string> = null;
    tag: Nullable<string> = null;
    enable = true;
}