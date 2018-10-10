/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\script\index.ts
 * Created Date: Thursday, October 11th 2018, 1:27:13 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, October 11th 2018, 1:28:47 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, Application } from '../../../';
export abstract class Script<Inputs> {
    entity!: Entity;
    constructor(public inputs: Inputs, public app: Application) {
    }
    abstract initialize();
    abstract update(dt: number);
}
