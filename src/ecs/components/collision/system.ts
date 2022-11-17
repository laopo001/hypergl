/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\collision\system.ts
 * Created Date: Thursday, January 3rd 2019, 8:55:19 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, February 25th 2019, 10:50:52 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */


import { ComponentSystem } from '../../system';
import { CollisionComponent } from './component';
import { Entity } from '../../entity';
import { Model } from '../../../mesh';
import { once } from '../../..//utils/decorators';
import { Scene } from '../../../scene';
export class CollisionComponentSystem extends ComponentSystem {
    componentConstructor = CollisionComponent;
    name = 'collision';
    // _entity = new Entity();
    constructor(scene: Scene) {
        super(scene);

    }
}