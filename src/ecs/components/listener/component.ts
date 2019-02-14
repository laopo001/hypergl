/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\listener\component.ts
 * Created Date: Tuesday, December 4th 2018, 5:16:40 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, February 15th 2019, 12:50:03 am
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
    }
    initialize() {
        super.initialize();
        event.on('beforeRender', this.update);
    }
    destroy() {
        super.destroy();
        event.off('beforeRender', this.update);
    }
    private update = () => {
        let audios = this.entity.scene.systems.audio!.components as AudioComponent[];
        audios.forEach(audio => {
            if (!audio.initialized) { return; }
            let a = audio.entity.getPosition();
            let m = this.entity.getWorldTransform();
            let v = m.clone().invert().mulVec4(new Vec4(a.x, a.y, a.z, 1));
            let { x, y, z } = v;
            audio.instance.pos(x, y, z);
        });
    }
}
