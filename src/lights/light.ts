/*
 * ProjectName: hypergl
 * FilePath: \src\lights\light.ts
 * Created Date: Tuesday, September 4th 2018, 11:04:18 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, December 24th 2018, 11:25:54 pm
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
    castShadows = false;
    shadowFrame?: Frame;
    shadowUpdateMode: ShadowUpdateMode = ShadowUpdateMode.RealTime;
    shadowType: 'Normal' | 'PCF' | 'PCFSoft' = 'PCF';
    shadowMapSize = 2048;
    // shadowMapHeight = 2048;
    shadowBias = 0.001;
    // shadowDarkness = 0.05;
    constructor(public node: SceneNode) {}

}