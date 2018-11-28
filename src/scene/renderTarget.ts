/*
 * ProjectName: hypergl
 * FilePath: \src\scene\renderTarget.ts
 * Created Date: Thursday, October 18th 2018, 11:27:47 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, November 28th 2018, 5:09:46 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { Entity } from '../ecs/entity';
import { Scene } from './scene';
import { Camera } from './camera';
import { Frustum } from '../math/frustum';
import { Mat4 } from '../math';
import { BoundingBox } from '../shape/boundingBox';
export class RenderTarget {
    frustum: Frustum;
    constructor(projectionMatrix: Mat4, viewMatrix: Mat4) {
        this.frustum = new Frustum(projectionMatrix, viewMatrix);
    }
    getList(box: BoundingBox) {
        //
    }
}