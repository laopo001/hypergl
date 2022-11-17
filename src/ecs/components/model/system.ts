/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\model\system.ts
 * Created Date: Friday, November 2nd 2018, 2:37:28 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, March 18th 2019, 12:51:32 am
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
import { Scene } from '../../../scene';

export class Renderable {

    constructor(public drawable: Drawable, public component: ModelComponent) {

    }
}

export class ModelComponentSystem extends ComponentSystem {
    name = 'model';
    componentConstructor = ModelComponent;
    normalLayers: Renderable[] = [];
    opacityLayers: Renderable[] = [];
    components: ModelComponent[] = [];
    layers: Renderable[] = [];
    private _dirty = true;
    constructor(scene: Scene) {
        super(scene);

        event.on('beforeRender', () => {
            if (this._dirty) {
                this.opacityLayers = [];
                this.normalLayers = [];
                this.components.forEach(item => {
                    // let uModelMatrix = item.getWorldTransform();
                    // let position = item.getPosition();
                    // let uNormalMatrix = item.getWorldTransform().clone().invert().transpose();
                    // let enabled = item.enabled;
                    item.instance.draws.forEach((drawable) => {
                        // drawable.cache.enabled = enabled;
                        // drawable.cache.position = position;
                        // drawable.cache.uNormalMatrix = uNormalMatrix;
                        // drawable.cache.uModelMatrix = uModelMatrix;

                        // if (item.model.caches[drawable.strongCount] === undefined) {
                        //     item.model.caches[drawable.strongCount] = {} as any;
                        // }
                        // item.model.caches[drawable.strongCount] = {
                        //     enabled,
                        //     position,
                        //     uNormalMatrix,
                        //     uModelMatrix,
                        // };

                        if ((drawable.material as StandardMaterial).opacity < 1 || (drawable.material as StandardMaterial).opacityMap) {
                            this.opacityLayers.push(new Renderable(drawable, item));
                        } else {
                            this.normalLayers.push(new Renderable(drawable, item));
                        }
                    });

                });
            }

            this.opacityLayers.sort((a, b) => {
                return new Vec3().sub2(b.component.getPosition(), this.app.scene.activeCamera.getPosition()).length() -
                    new Vec3().sub2(a.component.getPosition(), this.app.scene.activeCamera.getPosition()).length();
            });
            this.layers = this.normalLayers.concat(this.opacityLayers);
        });
    }
}