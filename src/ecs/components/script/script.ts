/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\script\script.ts
 * Created Date: Saturday, October 13th 2018, 11:56:08 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, October 14th 2018, 10:34:09 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, Application } from '../../..';
export abstract class Script<Inputs> {
    entity!: Entity;
    constructor(public inputs: Inputs, public app: Application) {
    }
    abstract initialize();
    abstract update(dt: number);
}
