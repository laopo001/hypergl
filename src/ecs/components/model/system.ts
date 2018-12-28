/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\model\system.ts
 * Created Date: Friday, November 2nd 2018, 2:37:28 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, December 28th 2018, 5:17:56 pm
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
import { Drawable } from '../../../mesh';

export class ModelComponentSystem extends ComponentSystem {
    name = 'model';
    componentConstructor = ModelComponent;
    normalLayers: Drawable[] = [];
    opacityLayers: Drawable[] = [];
    components: ModelComponent[] = [];
    layers: Drawable[] = [];
    private _dirty = false;
    constructor() {
        super();

        event.on('beforeRender', () => {
            if (this._dirty) {
                this.opacityLayers = [];
                this.normalLayers = [];
                this.components.forEach(item => {
                    let uModelMatrix = item.getWorldTransform();
                    let position = item.getPosition();
                    let uNormalMatrix = item.getWorldTransform().clone().invert().transpose();
                    item.instance.meshs.forEach(drawable => {
                        drawable.cache.uModelMatrix = uModelMatrix;
                        drawable.cache.position = position;
                        drawable.cache.uNormalMatrix = uNormalMatrix;
                        drawable.cache.enabled = item.enabled;
                        if ((drawable.material as StandardMaterial).opacity < 1 || (drawable.material as StandardMaterial).opacityMap) {
                            this.opacityLayers.push(drawable);
                        } else {
                            this.normalLayers.push(drawable);
                        }
                    });

                });
            }

            this.opacityLayers.sort((a, b) => {
                return new Vec3().sub2(b.cache.position!, this.app.scene.activeCamera.getPosition()).length() -
                    new Vec3().sub2(a.cache.position!, this.app.scene.activeCamera.getPosition()).length();
            });
            this.layers = this.normalLayers.concat(this.opacityLayers);
        });
    }
    addComponent(entity: Entity, componentData: any) {
        let component = super.addComponent(entity, componentData) as ModelComponent;
        this._dirty = true;
        // this.list.push(component);
        return component;
    }
}