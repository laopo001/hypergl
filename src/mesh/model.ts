/*
 * ProjectName: hypergl
 * FilePath: \src\mesh\model.ts
 * Created Date: Monday, October 29th 2018, 11:36:38 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, April 2nd 2019, 3:31:18 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Drawable } from './drawable';
import { Mat4, Vec3 } from '../math';
import { Obj } from '../types';
export class Model {
    name = '';
    constructor(public draws: Drawable[]) {

    }
}

export interface CacheMatrix {
    uModelMatrix: Mat4;
    position: Vec3;
    uNormalMatrix: Mat4;
    enabled: boolean;
}