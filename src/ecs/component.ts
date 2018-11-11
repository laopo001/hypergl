/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\component.ts
 * Created Date: Friday, October 12th 2018, 9:44:47 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, November 12th 2018, 1:07:01 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, Application } from '..';
import { ComponentSystem } from 'src/ecs/system';
export abstract class Component<Inputs> {
    abstract name: string;
    enabled = true;
    system: any;
    entity!: Entity;
    constructor(public inputs: Inputs) {
    }
    abstract initialize(entity: Entity, system: ComponentSystem);
}
