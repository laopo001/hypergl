/*
 * ProjectName: hypergl
 * FilePath: \plugins\physics\types.ts
 * Created Date: Saturday, January 12th 2019, 2:19:45 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, March 16th 2019, 4:51:12 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */

import { Application, Plugin, Vec3, Quat, Entity } from 'hypergl';

export interface IPhysics {
    type: string;
    setGravity(g: Vec3);
    createShape(name: string, options: any)
    addBody(body, entity);
    syncEntityToBody(entity, body, b?);
    syncBodyToEntity(entity, body, dt: number);
    applyForce(body, options);
    applyImpulse(body, options);
    // teleport(body, x, y, z)
}

