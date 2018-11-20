/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\model\system.ts
 * Created Date: Friday, November 2nd 2018, 2:37:28 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, November 20th 2018, 11:23:20 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { ComponentSystem } from '../../system';
import { ModelComponent } from './component';
import { Entity } from '../../entity';
import { StandardMaterial } from '../../../material';
import { Vec3 } from '../../../math/vec3';

export class ModelComponentSystem extends ComponentSystem {
    name = 'model';
    componentConstructor = ModelComponent;
    layers: ModelComponent[] = [];
    opacityLayers: ModelComponent[] = [];
    get renderLayers() {
        return this.layers.concat(this.opacityLayers);
    }
    addComponent(entity: Entity, componentData: any) {
        let component = super.addComponent(entity, componentData) as ModelComponent;

        let item = component.instance;
        if (item.material instanceof StandardMaterial && item.material.opacity < 1 && item.material.opacityMap) {
            this.opacityLayers.push(component);
        } else {
            this.layers.push(component);
        }

        this.app.on('beforeRender', () => {
            this.opacityLayers.sort((a, b) => {
                return new Vec3().sub2(b.getPosition(), this.app.scene.activeCamera.getPosition()).length() -
                    new Vec3().sub2(a.getPosition(), this.app.scene.activeCamera.getPosition()).length();
            });
        });
        console.warn(component);
        return component;
    }
}