/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\camera\system.ts
 * Created Date: Sunday, November 11th 2018, 12:25:18 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, March 7th 2019, 11:11:23 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { ComponentSystem } from '../../system';
import { CameraComponent } from './component';

export class CameraComponentSystem extends ComponentSystem {
    componentConstructor = CameraComponent;
    name = 'camera';
}