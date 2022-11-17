/*
 * ProjectName: hypergl
 * FilePath: \src\math\line.ts
 * Created Date: Saturday, December 1st 2018, 6:35:50 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, December 1st 2018, 6:36:53 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Vec3 } from './vec3';
export class Line {
    constructor(public start = new Vec3(), public end = new Vec3()) { }
}