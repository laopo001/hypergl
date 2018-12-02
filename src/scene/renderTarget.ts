/*
 * ProjectName: hypergl
 * FilePath: \src\scene\renderTarget.ts
 * Created Date: Thursday, October 18th 2018, 11:27:47 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, December 2nd 2018, 5:15:51 pm
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
            let points = model.instance.aabb.getPoints();
            for (let i = 0; i < points.length; i++) {
                let scale = model.entity.getLocalScale();
                let point = points[i];
                point = new Vec3().mul2(point, scale);
                point = new Vec3().add2(point, model.getPosition());
                if (this.frustum.containsPoint(point)) {
                    return true;
                }
            }
            return false;

            return this.frustum.containsBox(model.instance.aabb);
        });
    }
}