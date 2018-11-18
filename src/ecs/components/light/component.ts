/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\light\light.ts
 * Created Date: Saturday, October 13th 2018, 11:56:38 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, November 18th 2018, 8:43:48 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { Component } from '../../component';
import { Light, DirectionalLight, PointLight, SpotLight } from '../../../lights';
import { Vec3 } from '../../../math';
import { Color } from '../../../core';
import { ShadowUpdateMode } from '../../../conf';
import { Log } from '../../../utils/util';
import { Entity } from '../../entity';
import { ComponentSystem } from '../../system';
export interface LigthInputs {
    type: 'directional' | 'point' | 'spot'
    color?: Color;
    castShadows?: boolean;
    shadowUpdateMode?: ShadowUpdateMode;
    shadowMapWidth?: number;
    shadowMapHeight?: number;
    shadowBias?: number;
    shadowDarkness?: number;
    direction?: Vec3;
    range?: number;
    innerConeAngle?: number;
    outerConeAngle?: number;
}

function setValue(obj, key, value) {
    if (value !== undefined) {
        obj[key] = value;
    }
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
    constructor(inputs) {
        super(inputs);
        let light: Light;
        switch (this.inputs.type) {
            case 'directional': {
                light = new DirectionalLight();
                // setValue(light, 'direction', this.inputs.direction);
                break;
            }
            case 'point': {
                light = new PointLight();
                // setValue(light, 'range', this.inputs.range);
                break;
            }
            case 'spot': {
                light = new SpotLight();
                // setValue(light, 'direction', this.inputs.direction);
                // setValue(light, 'range', this.inputs.range);
                // setValue(light, 'innerConeAngle', this.inputs.innerConeAngle);
                // setValue(light, 'outerConeAngle', this.inputs.outerConeAngle);
                break;
            }
            default: Log.error(`${this.inputs.type} not match`);
                light = {} as any;
                break;
        }
        for (const key in this.inputs) {
            if (this.inputs.hasOwnProperty(key)) {
                const value = this.inputs[key];
                if (value !== undefined) {
                    light[key] = value;
                }
            }
        }
        this.instance = light!;
    }
    initialize(entity: Entity, system: ComponentSystem) {
        this.entity = entity;
        this.system = system;
    }

}