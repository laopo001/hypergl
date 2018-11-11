/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\system-register.ts
 * Created Date: Sunday, November 11th 2018, 12:13:56 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, November 11th 2018, 12:22:23 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { ComponentSystem } from './system';
export class SystemRegistry {
    [s: string]: any;
    list: ComponentSystem[] = [];
    add(system: ComponentSystem) {
        if (this[system.id]) {
            throw new Error(`ComponentSystem ${system.id} already registered`);
        }
        this[system.id] = system;
        this.list.push(system);
    }
    remove(system: ComponentSystem) {
        if (!this[system.id]) {
            throw new Error(`ComponentSystem ${system.id} not registered`);
        }
        delete this[system.id];
        const index = this.list.indexOf(this[system.id]);
        if (index !== -1) {
            this.list.splice(index, 1);
        }
    }
}