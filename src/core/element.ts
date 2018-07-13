/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\core\component.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Wednesday, July 11th 2018, 9:02:00 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, July 13th 2018, 6:55:36 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */


import { generateUUID } from '../math/math';



let ComponentIdCount = 0
export class IElement {
    id = ComponentIdCount++;
    uuid = generateUUID();
    name = '';
    tag = '';
    parent?: IElement;
    childrne: IElement[];
    enable = true;
}