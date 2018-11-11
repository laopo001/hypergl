/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\system.ts
 * Created Date: Friday, October 12th 2018, 9:49:50 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, November 11th 2018, 12:32:35 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Application } from '../application';
import { Entity } from './entity';
let id = 0;
export class ComponentSystem {
    id = id++;
    app!: Application;
    addComponent(entity: Entity) {
        // TODO
    }
    removeComponent() {
        // TODO
    }
}