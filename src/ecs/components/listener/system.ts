/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\listener\system.ts
 * Created Date: Tuesday, December 4th 2018, 5:24:04 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, December 4th 2018, 10:19:23 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */



import { ComponentSystem } from '../../system';
import { ListenerComponent } from './component';
import { event } from '../../../core';
import { AudioComponent } from '../audio';
export class ListenerComponentSystem extends ComponentSystem {
    componentConstructor = ListenerComponent;
    name = 'listener';
    components: ListenerComponent[] = [];
}