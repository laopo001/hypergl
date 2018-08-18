/*
 * ProjectName: hypergl
 * FilePath: \src\scene\node.ts
 * Created Date: Saturday, August 18th 2018, 10:49:00 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 10:56:19 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { IElement } from '../core/element';
import { Vec3, Quat } from '../math';
export class INode extends IElement {
    localPosition = new Vec3(0, 0, 0);
    localRotation = new Quat(0, 0, 0, 1);
    localScale = new Vec3(1, 1, 1);
    localEulerAngles = new Vec3(0, 0, 0);
    // World-space
    position = new Vec3(0, 0, 0);
    rotation = new Quat(0, 0, 0, 1);
    eulerAngles = new Vec3(0, 0, 0);
    constructor() {
        super();
    }
}