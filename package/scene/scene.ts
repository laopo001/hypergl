/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\scene\Scene.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Wednesday, July 11th 2018, 8:55:13 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, July 29th 2018, 4:31:19 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

import { IElement } from '../core/element';
import { BasicMaterial } from '../materials/basic-material';
import { Material } from '../materials/material';
export class Scene extends IElement {
    static defaultMaterial: Material = new BasicMaterial();
    fog;
    add() {
        console.log();
    }

}