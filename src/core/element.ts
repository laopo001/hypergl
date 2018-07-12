/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\core\component.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Wednesday, July 11th 2018, 9:02:00 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, July 12th 2018, 3:33:43 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */


import { IMath } from '../math/math';



let ComponentIdCount = 0
export class IElement {
    id = ComponentIdCount++;
    uuid = IMath.generateUUID();
    name = '';
    tag = '';
    parent?: IElement;
    childrne: IElement[];
    enable = true;
}