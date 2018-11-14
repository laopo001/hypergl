/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\camera\system.ts
 * Created Date: Sunday, November 11th 2018, 12:25:18 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, November 14th 2018, 11:12:02 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { ComponentSystem } from '../../system';
import { CameraComponent } from './component';

export class CameraComponentSystem extends ComponentSystem {
    componentConstructor = CameraComponent;
    name = 'camera';
    cameraComponents: CameraComponent[] = [];
    addCamera(camera) {
        this.cameraComponents.push(camera);
    }

    removeCamera(camera) {
        let index = this.cameraComponents.indexOf(camera);
        if (index >= 0) {
            this.cameraComponents.splice(index, 1);
        }
    }
}