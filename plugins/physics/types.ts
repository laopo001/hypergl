/*
 * ProjectName: hypergl
 * FilePath: \plugins\physics\types.ts
 * Created Date: Saturday, January 12th 2019, 2:19:45 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, January 12th 2019, 5:31:28 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */

import { Application, Plugin, Vec3, Quat, Entity } from 'hypergl';


export interface IPhysics {
    initWorld(g?: [number, number, number]);
    setGravity(g: [number, number, number]);
    createShape<T extends keyof {}>(name: T, options: {}[T])
    addBody(o: any);
}

