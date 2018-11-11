/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\system-register.ts
 * Created Date: Sunday, November 11th 2018, 12:13:56 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, November 12th 2018, 1:09:30 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { ComponentSystem } from './system';

export class SystemRegistry {
    [s: string]: any;
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