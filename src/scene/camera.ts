/*
 * ProjectName: hypergl
 * FilePath: \src\scene\camera.ts
 * Created Date: Tuesday, August 21st 2018, 6:51:36 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, September 9th 2018, 4:23:23 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Vec3, Quat, Mat4 } from '../math';
import { SceneNode } from './node';
export class Camera extends SceneNode {
    projectionMatrix = new Mat4();

    constructor(
        fov: number,			// 相机视野的角度。一般是以Y轴
        aspect: number,			// 相机的纵横比（宽度除以高度）
        near: number,			// 相机渲染最近的距离，小于这距离的不会进行渲染
        far: number			// 相机渲染最远的距离，大于这距离的不会进行渲染
    ) {
        super();
        this.projectionMatrix.setPerspective(fov, aspect, near, far);
    }
    get viewProjectionMatrix() {
        return new Mat4().mul(this.projectionMatrix).mul(this.getWorldTransform().clone().invert());
    }

}