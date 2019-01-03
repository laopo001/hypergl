/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\collision\system.ts
 * Created Date: Thursday, January 3rd 2019, 8:55:19 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, January 4th 2019, 12:37:44 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */


import { ComponentSystem } from '../../system';
import { CollisionComponent } from './component';

export class CollisionComponentSystem extends ComponentSystem {
    componentConstructor = CollisionComponent;
    name = 'collision';
}