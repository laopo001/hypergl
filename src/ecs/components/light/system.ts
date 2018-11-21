/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\light\system.ts
 * Created Date: Wednesday, November 14th 2018, 11:56:27 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, November 21st 2018, 7:11:41 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { ComponentSystem } from '../../system';
import { LightComponent } from './component';
import { DirectionalLight, PointLight, SpotLight } from '../../../lights';
import { Entity } from '../../entity';
export class LightComponentSystem extends ComponentSystem {
    componentConstructor = LightComponent;
    name = 'light';
    directionalLights: DirectionalLight[] = [];
    pointLights: PointLight[] = [];
    spotLight: SpotLight[] = [];
    addComponent(entity: Entity, componentData: any) {
        let component = super.addComponent(entity, componentData) as LightComponent;
        let child = component.instance;
        if (child instanceof DirectionalLight) {
            this.directionalLights.push(child);
        } else if (child instanceof PointLight) {
            this.pointLights.push(child);
        } else if (child instanceof SpotLight) {
            this.spotLight.push(child);
        }
        return component;
    }
    // components: LightComponent[] = [];
    // addLight(camera) {
    //     this.components.push(camera);
    // }

    // removeLight(camera) {
    //     let index = this.components.indexOf(camera);
    //     if (index >= 0) {
    //         this.components.splice(index, 1);
    //     }
    // }
}
