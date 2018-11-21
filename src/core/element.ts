/*
 * ProjectName: hypergl
 * FilePath: \src\core\element.ts
 * Created Date: Saturday, August 18th 2018, 4:23:54 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, November 21st 2018, 7:21:53 pm
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
    name?: string;
    tag?: string;
    enabled = true;
}