/*
 * ProjectName: hypergl
 * FilePath: \src\scene\camera.ts
 * Created Date: Tuesday, August 21st 2018, 6:51:36 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, August 21st 2018, 6:57:04 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { Vec3, Quat } from '../math';
export class Camera {
    position = new Vec3(0, 0, 0);
    target = new Vec3(0, 0, 1);
    up = new Vec3(0, 1, 0);
}