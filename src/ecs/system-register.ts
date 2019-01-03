/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\system-register.ts
 * Created Date: Sunday, November 11th 2018, 12:13:56 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, January 4th 2019, 12:39:36 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { ComponentSystem } from './system';
import { CameraComponentSystem } from './components/camera';
import { ModelComponentSystem } from './components/model';
import { LightComponentSystem } from './components/light';
import { ScriptComponentSystem } from './components/script';
import { AudioComponentSystem } from './components/audio';
import { ListenerComponentSystem } from './components/listener';
import { CollisionComponentSystem } from './components/collision';
import { RigidbodyComponentSystem } from './components/rigidbody';

export class SystemRegistry {
    // [s: string]: any;
    camera?: CameraComponentSystem;
    model?: ModelComponentSystem;
    light?: LightComponentSystem;
    script?: ScriptComponentSystem;
    audio?: AudioComponentSystem;
    listener?: ListenerComponentSystem;
    collision?: CollisionComponentSystem;
    rigidbody?: RigidbodyComponentSystem;
    list: ComponentSystem[] = [];
    add(system: ComponentSystem) {
        if (this[system.name]) {
            throw new Error(`ComponentSystem ${system.name} already registered`);
        }
        this[system.name] = system;
        this.list.push(system);
    }
    remove(system: ComponentSystem) {
        if (!this[system.name]) {
            throw new Error(`ComponentSystem ${system.name} not registered`);
        }
        delete this[system.name];
        const index = this.list.indexOf(this[system.name]);
        if (index !== -1) {
            this.list.splice(index, 1);
        }
    }

}