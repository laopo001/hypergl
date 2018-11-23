/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\model\system.ts
 * Created Date: Friday, November 2nd 2018, 2:37:28 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, November 24th 2018, 2:32:53 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { ComponentSystem } from '../../system';
import { ModelComponent } from './component';
import { Entity } from '../../entity';
import { StandardMaterial } from '../../../material';
import { Vec3 } from '../../../math/vec3';
import { event } from '../../../core';

export class ModelComponentSystem extends ComponentSystem {
    name = 'model';
    componentConstructor = ModelComponent;
    normalLayers: ModelComponent[] = [];
    opacityLayers: ModelComponent[] = [];
    renderLayers: ModelComponent[] = [];
    constructor() {
        super();

        event.on('beforeRender', () => {
            this.opacityLayers = [];
            this.normalLayers = [];
            this.renderLayers.forEach(item => {
                if (item.material instanceof StandardMaterial && (item.material.opacity < 1 || item.material.opacityMap)) {
                    this.opacityLayers.push(item);
                } else {
                    this.normalLayers.push(item);
                }
            });
            this.opacityLayers.sort((a, b) => {
                return new Vec3().sub2(b.getPosition(), this.app.scene.activeCamera.getPosition()).length() -
                    new Vec3().sub2(a.getPosition(), this.app.scene.activeCamera.getPosition()).length();
            });
            this.renderLayers = this.normalLayers.concat(this.opacityLayers);
        });
    }
    // get renderLayers() {
    //     return this.normalLayers.concat(this.opacityLayers);
    // }
    addComponent(entity: Entity, componentData: any) {
        let component = super.addComponent(entity, componentData) as ModelComponent;

        // let item = component.instance;
        // if (item.material instanceof StandardMaterial && item.material.opacity < 1 && item.material.opacityMap) {
        //     this.opacityLayers.push(component);
        // } else {
        //     this.normalLayers.push(component);
        // }
        this.renderLayers.push(component);
        return component;
    }
}