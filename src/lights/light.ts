/*
 * ProjectName: hypergl
 * FilePath: \src\lights\light.ts
 * Created Date: Tuesday, September 4th 2018, 11:04:18 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, November 25th 2018, 9:08:00 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { SceneNode } from '../scene/node';
import { Color } from '../core/color';
import { ShadowUpdateMode } from '../conf';
import { Frame } from '../graphics/createFrame';


export class Light {
    color = new Color(1, 1, 1);
    castShadows = true;
    shadowFrame?: Frame;
    shadowUpdateMode: ShadowUpdateMode = ShadowUpdateMode.RealTime;
    shadowType: 'Normal' | 'PCF' | 'PCFSoft' = 'PCF';
    shadowMapWidth = 1024;
    shadowMapHeight = 1024;
    shadowBias = 0.005;
    shadowDarkness = 0.05;
    constructor() {
        // super();
    }

}