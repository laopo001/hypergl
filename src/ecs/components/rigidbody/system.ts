/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\rigidbody\system.ts
 * Created Date: Thursday, January 3rd 2019, 11:27:57 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, January 6th 2019, 6:04:23 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */


import { ComponentSystem } from '../../system';
import { RigidbodyComponent } from './component';

export class RigidbodyComponentSystem extends ComponentSystem {
    componentConstructor = RigidbodyComponent;
    name = 'rigidbody';
}