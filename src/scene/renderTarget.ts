/*
 * ProjectName: hypergl
 * FilePath: \src\scene\renderTarget.ts
 * Created Date: Thursday, October 18th 2018, 11:27:47 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, December 2nd 2018, 1:57:51 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { Entity } from '../ecs/entity';
import { Scene } from './scene';
import { Camera } from './camera';
import { Frustum } from '../math/frustum';
import { Mat4, Vec3 } from '../math';
import { BoundingBox } from '../shape/boundingBox';
import { ModelComponent } from '../ecs/components/model';
export class RenderTarget {
    frustum: Frustum;
    constructor(projectionMatrix: Mat4, viewMatrix: Mat4) {
        this.frustum = new Frustum(projectionMatrix, viewMatrix);
    }
    getList(models: ModelComponent[]) {
        return models.filter(model => {
            return this.frustum.containsBox(model.instance.aabb);
        });
    }
}