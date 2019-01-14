/*
 * ProjectName: hypergl
 * FilePath: \plugins\physics\types.ts
 * Created Date: Saturday, January 12th 2019, 2:19:45 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, January 15th 2019, 12:04:02 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */

import { Application, Plugin, Vec3, Quat, Entity } from 'hypergl';

export interface IPhysics {
    type: string;
    initWorld(g?: [number, number, number]);
    setGravity(g: Vec3);
    createShape(name: string, options: any)
    addBody(o: any, entity);
    syncEntityToBody(entity, o);
    syncBodyToEntity(entity, o, dt: number);
}

