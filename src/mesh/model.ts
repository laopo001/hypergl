/*
 * ProjectName: hypergl
 * FilePath: \src\mesh\model.ts
 * Created Date: Monday, October 29th 2018, 11:36:38 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, March 18th 2019, 12:42:55 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Drawable } from './drawable';
import { Mat4, Vec3 } from '../math';
import { Obj } from '../types';
export class Model {
    name = '';
    constructor(public meshs: Drawable[]) {

    }
}

export interface CacheMatrix {
    uModelMatrix: Mat4;
    position: Vec3;
    uNormalMatrix: Mat4;
    enabled: boolean;
}