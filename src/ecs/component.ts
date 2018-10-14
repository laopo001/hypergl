/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\component.ts
 * Created Date: Friday, October 12th 2018, 9:44:47 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, October 14th 2018, 10:34:09 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, Application } from '..';
export abstract class Component<Inputs> {
    name!: string;
    system: any;
    entity!: Entity;
    constructor(public inputs: Inputs, public app: Application) {
    }

}
