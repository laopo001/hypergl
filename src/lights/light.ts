/*
 * ProjectName: hypergl
 * FilePath: \src\lights\light.ts
 * Created Date: Tuesday, September 4th 2018, 11:04:18 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, September 8th 2018, 3:45:47 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { SceneNode } from '../scene/node';
import { Color } from '../core/color';
import { ShadowUpdateMode } from '../conf';


export class Light extends SceneNode {
    color = new Color(1, 1, 1);
    castShadows = true;
    shadowUpdateMode: ShadowUpdateMode = ShadowUpdateMode.Once;
    shadowMapWidth = 1024;
    shadowMapHeight = 1024;
    shadowBias = 0.005;
    shadowDarkness = 0.05;
    constructor() {
        super();
    }

}