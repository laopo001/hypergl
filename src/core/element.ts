/*
 * ProjectName: hypergl
 * FilePath: \src\core\element.ts
 * Created Date: Saturday, August 18th 2018, 4:23:54 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 4:24:14 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { generateUUID } from '../math/math';



let ComponentIdCount = 0;
export class IElement {
    id = ComponentIdCount++;
    uuid = generateUUID();
    name = '';
    tag = '';
    parent?: IElement;
    children!: IElement[];
    enable = true;
}