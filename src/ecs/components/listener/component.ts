/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\listener\component.ts
 * Created Date: Tuesday, December 4th 2018, 5:16:40 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, December 18th 2018, 11:45:07 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */



import { Entity } from '../../..';
import { Component } from '../../component';
import { Log } from '../../../utils/util';
import { Mat4, Vec3, Vec4 } from '../../../math';
import { ComponentSystem } from '../../system';
import { event } from '../../../core';
import { AudioComponent } from '../audio';
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
            throw (new Error('listener component 只能有一个'));
        }

        this.instance = null;
        event.on('beforeRender', () => {
            let audios = this.entity.app.scene.systems.audio!.components as AudioComponent[];
            audios.forEach(audio => {
                let a = audio.entity.getPosition();
                let m = this.entity.getWorldTransform();
                let v = m.clone().invert().mulVec4(new Vec4(a.x, a.y, a.z, 1));
                let { x, y, z } = v;
                audio.instance.pos(x, y, z);
            });
        });
    }

    initialize() {
        //
    }
    destroy() {
        //
    }
}
