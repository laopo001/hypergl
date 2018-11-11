/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\camera\system.ts
 * Created Date: Sunday, November 11th 2018, 12:25:18 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, November 11th 2018, 12:41:14 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { ComponentSystem } from '../../system';
import { Camera } from '../../../scene/camera';

export class CameraComponentSystem extends ComponentSystem {
    cameras: Camera[] = [];
    addCamera(camera) {
        this.cameras.push(camera);
    }

    removeCamera(camera) {
        let index = this.cameras.indexOf(camera);
        if (index >= 0) {
            this.cameras.splice(index, 1);
        }
    }
}