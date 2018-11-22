/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\light\light.ts
 * Created Date: Saturday, October 13th 2018, 11:56:38 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, November 22nd 2018, 8:27:19 pm
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



export class LightComponent<T extends Light = Light> extends Component<LigthInputs> {

    name = 'light';
    instance!: T;
    constructor(inputs) {
        super(inputs);
        let light: Light;
        switch (this.inputs.type) {
            case 'directional': {
                light = new DirectionalLight();
                break;
            }
            case 'point': {
                light = new PointLight();
                break;
            }
            case 'spot': {
                light = new SpotLight();
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

        this.instance = light! as any;
    }
    initialize(entity: Entity, system: ComponentSystem) {
        this.entity = entity;
        this.system = system;
    }
    get direction(): Vec3 {
        return (this.instance as any).direction;
    }
    set direction(v: Vec3) {
        (this.instance as any).direction = v;
    }
    get castShadows() {
        return this.instance.castShadows;
    }
    get color() {
        return this.instance.color;
    }
    get shadowFrame() {
        return this.instance.shadowFrame;
    }
    set shadowFrame(v) {
        this.instance.shadowFrame = v;
    }
    get range(): number {
        return (this.instance as any).range;
    }
    get shadowMapWidth() {
        return this.instance.shadowMapWidth;
    }
    set shadowMapWidth(v) {
        this.instance.shadowMapWidth = v;
    }
    get shadowMapHeight() {
        return this.instance.shadowMapHeight;
    }
    set shadowMapHeight(v) {
        this.instance.shadowMapHeight = v;
    }
    get outerConeAngle(): number {
        return (this.instance as any).outerConeAngle;
    }
    get innerConeAngle(): number {
        return (this.instance as any).innerConeAngle;
    }
}
