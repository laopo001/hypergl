/*
 * ProjectName: hypergl
 * FilePath: \src\core\element.ts
 * Created Date: Saturday, August 18th 2018, 4:23:54 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, January 30th 2019, 5:34:50 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { generateUUID } from '../math/math';
import { Nullable } from '../types';



export class IElement {
    uuid = generateUUID();
    name = '';
    tag: string[] = [];
    enabled = true;
}