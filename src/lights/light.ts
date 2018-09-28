/*
 * ProjectName: hypergl
 * FilePath: \src\lights\light.ts
 * Created Date: Tuesday, September 4th 2018, 11:04:18 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, September 28th 2018, 4:19:30 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { SceneNode } from '../scene/node';
import { Color } from '../core/color';
import { ShadowUpdateMode } from '../conf';
import { Frame } from '../graphics/createFrame';


export class Light extends SceneNode {
    color = new Color(1, 1, 1);
    castShadows = true;
    shadowFrame?: Frame;
    shadowUpdateMode: ShadowUpdateMode = ShadowUpdateMode.Once;
    shadowMapWidth = 1024;
    shadowMapHeight = 1024;
    shadowBias = 0.005;
    shadowDarkness = 0.05;
    constructor() {
        super();
    }

}