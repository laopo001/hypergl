/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\light\system.ts
 * Created Date: Wednesday, November 14th 2018, 11:56:27 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, January 30th 2019, 4:32:00 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { ComponentSystem } from '../../system';
import { LightComponent } from './component';
import { DirectionalLight, PointLight, SpotLight, Light } from '../../../lights';
import { Component } from '../../component';
import { Entity } from '../../entity';
export class LightComponentSystem extends ComponentSystem {
    componentConstructor = LightComponent;
    name = 'light';
    directionalLights: LightComponent<DirectionalLight>[] = [];
    pointLights: LightComponent<PointLight>[] = [];
    spotLight: LightComponent<SpotLight>[] = [];
    addComponent(entity: Entity, componentData: any) {
        let component = super.addComponent(entity, componentData);
        let child = component.instance;
        if (child instanceof DirectionalLight) {
            this.directionalLights.push(component as LightComponent<DirectionalLight>);
        } else if (child instanceof PointLight) {
            this.pointLights.push(component as LightComponent<PointLight>);
        } else if (child instanceof SpotLight) {
            this.spotLight.push(component as LightComponent<SpotLight>);
        }
        return component;
    }

}
