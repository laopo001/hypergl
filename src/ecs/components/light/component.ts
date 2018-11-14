/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\light\light.ts
 * Created Date: Saturday, October 13th 2018, 11:56:38 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, November 14th 2018, 10:45:55 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { Component } from '../../component';
import { Light, DirectionalLight } from '../../../lights';
import { Vec3 } from '../../../math';
export interface LigthInputs {
    type: 'directional' | 'point' | 'spot'

}

export class LightComponent extends Component<LigthInputs> {
    public get direction(): Vec3 {
        return (this.instance as DirectionalLight).direction;
    }
    public set direction(v: Vec3) {
        (this.instance as DirectionalLight).direction = v;
    }
    name = 'light';
    instance!: Light;
    initialize() {
        //
    }

}