/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\listener\component.ts
 * Created Date: Tuesday, December 4th 2018, 5:16:40 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, December 4th 2018, 5:21:37 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */



import { Entity } from '../../..';
import { Component } from '../../component';
import { Log } from '../../../utils/util';
import { Mat4 } from '../../../math';
import { ComponentSystem } from '../../system';

export interface ListenerInputs {
}

export const cameraData: ListenerInputs = {

};
let created = false;
export class ListenerComponent extends Component<ListenerInputs> {
    name = 'listener';
    instance: any;
    constructor(inputs: ListenerInputs = cameraData, entity: Entity, system: ComponentSystem) {
        super(inputs, entity, system);
        if (!created) { created = true; } else {
            throw(new Error('listener component 只能有一个'));
        }
        this.instance = null;
    }

    initialize(entity: Entity, system: ComponentSystem) {
        //
    }
}
