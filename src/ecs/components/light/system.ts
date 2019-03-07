/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\light\system.ts
 * Created Date: Wednesday, November 14th 2018, 11:56:27 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, March 8th 2019, 12:42:12 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { ComponentSystem } from '../../system';
import { LightComponent } from './component';
import { DirectionalLight, PointLight, SpotLight, Light } from '../../../lights';
import { Component } from '../../component';
import { Entity } from '../../entity';
import { arrayRemove } from '../../../utils';
export class LightComponentSystem extends ComponentSystem {
    componentConstructor = LightComponent;
    name = 'light';
    directionalLights: LightComponent<DirectionalLight>[] = [];
    pointLights: LightComponent<PointLight>[] = [];
    spotLight: LightComponent<SpotLight>[] = [];
    addComponent(entity: Entity, component: Component<{}>) {
        super.addComponent(entity, component);
        let child = component.instance;
        if (child instanceof DirectionalLight) {
            this.directionalLights.push(component as LightComponent<DirectionalLight>);
        } else if (child instanceof PointLight) {
            this.pointLights.push(component as LightComponent<PointLight>);
        } else if (child instanceof SpotLight) {
            this.spotLight.push(component as LightComponent<SpotLight>);
        }
    }
    removeComponent(component: Component<{}>) {
        let child = component.instance;
        if (child instanceof DirectionalLight) {
            arrayRemove(this.directionalLights, component as LightComponent<DirectionalLight>);
        } else if (child instanceof PointLight) {
            arrayRemove(this.pointLights, component as LightComponent<PointLight>);
        } else if (child instanceof SpotLight) {
            arrayRemove(this.spotLight, component as LightComponent<SpotLight>);
        }
    }
}
