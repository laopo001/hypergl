/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\collision\system.ts
 * Created Date: Thursday, January 3rd 2019, 8:55:19 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, January 7th 2019, 12:55:57 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */


import { ComponentSystem } from '../../system';
import { CollisionComponent } from './component';
import { Entity } from '../../entity';
import { Model } from '../../../mesh';
import { once } from '../../..//utils/decorators';
export class CollisionComponentSystem extends ComponentSystem {
    componentConstructor = CollisionComponent;
    name = 'collision';
    // _entity = new Entity();
    constructor() {
        super();

    }
    @once
    createEntity() {
        let entity = new Entity();
        entity.addComponent('model', {
            type: 'model',
            model: new Model([])
        });
        this.app.scene.add(entity);
        return entity;
    }
}