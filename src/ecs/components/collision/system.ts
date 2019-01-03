/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\collision\system.ts
 * Created Date: Thursday, January 3rd 2019, 8:55:19 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, January 3rd 2019, 11:25:19 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */


import { ComponentSystem } from '../../system';
import { CollisionComponent } from './component';

export class CollisionComponentSystem extends ComponentSystem {
    componentConstructor = CollisionComponent;
    name = 'audio';
}