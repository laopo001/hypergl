/*
 * ProjectName: hypergl
 * FilePath: \src\shape\boundingBox.ts
 * Created Date: Friday, October 19th 2018, 12:05:18 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, October 19th 2018, 12:08:17 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Vec3 } from '../math';
export class BoundingBox {
    private _min = new Vec3();
    private _max = new Vec3();
    constructor(private center = new Vec3(), private halfExtents = new Vec3(0.5, 0.5, 0.5)) {

    }
}