/*
 * ProjectName: hypergl
 * FilePath: \src\core\element.ts
 * Created Date: Saturday, August 18th 2018, 4:23:54 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, October 14th 2018, 12:10:21 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { generateUUID } from '../math/math';
import { Nullable } from '../types';



let ComponentIdCount = 0;
export class IElement {
    id = ComponentIdCount++;
    uuid = generateUUID();
    name: Nullable<string> = null;
    tag: Nullable<string> = null;
    enabled = true;
}