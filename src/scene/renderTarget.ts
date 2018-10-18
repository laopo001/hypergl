/*
 * ProjectName: hypergl
 * FilePath: \src\scene\renderTarget.ts
 * Created Date: Thursday, October 18th 2018, 11:27:47 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, October 18th 2018, 11:56:13 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { Entity } from '../ecs/entity';
import { Scene } from './scene';
import { Camera } from './camera';
export class RenderTarget {
    static getList(entitys: Entity[], camera: Camera) {
        // TODO
        for (let i = 0; i < entitys.length; i++) {
            let entity = entitys[i];
            if (entity.mesh) {
                // let vec3 = camera.viewProjectionMatrix.mul(entity.mesh.boundingBox);
            }
        }

    }
}