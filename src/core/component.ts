/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\core\component.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Wednesday, July 11th 2018, 9:02:00 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, July 11th 2018, 9:04:51 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */
let ComponentIdCount = 0

export class Component {
    id = ComponentIdCount++;
    name = '';
    tag = '';
    parent: Component;
    childrne: Component[];
    enable = true;
}