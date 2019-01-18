/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\model\system.ts
 * Created Date: Friday, November 2nd 2018, 2:37:28 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, January 18th 2019, 5:34:48 pm
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
                    let scale = item.entity.localScale;
                    let position = item.getPosition();
                    let uNormalMatrix = item.getWorldTransform().clone().invert().transpose();
                    item.instance.meshs.forEach(drawable => {
                        drawable.cache.enabled = item.enabled;
                        drawable.cache.position = position;
                        drawable.cache.uNormalMatrix = uNormalMatrix;
                        drawable.cache.uModelMatrix = uModelMatrix;
                        // if (!drawable.debugger) {
                        //     drawable.cache.uModelMatrix = uModelMatrix;

                        // } else {
                        //     let { x, y, z } = drawable.cache.setScale!;
                        //     let clone = uModelMatrix.clone();
                        //     let m = clone.data;
                        //     m[0] /= scale.x;
                        //     m[5] /= scale.y;
                        //     m[10] /= scale.z;
                        //     m[0] *= x;
                        //     m[5] *= y;
                        //     m[10] *= z;
                        //     drawable.cache.uModelMatrix = clone;
                        //     // console.log(drawable.cache.uModelMatrix.getTranslation().data);
                        //     // drawable.cache.uModelMatrix = uModelMatrix;
                        // }
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