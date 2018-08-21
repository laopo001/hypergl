/*
 * ProjectName: hypergl
 * FilePath: \src\scene\camera.ts
 * Created Date: Tuesday, August 21st 2018, 6:51:36 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, August 22nd 2018, 1:38:35 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { Vec3, Quat, Mat4 } from '../math';
export class Camera {
    matrixWorldInverse = new Mat4().setLookAt(new Vec3(0, 0, 3), new Vec3(0, 0, 1), new Vec3(0, 1, 0)).invert();
    position: Vec3;
    // quaternion: Quat = new Quat();
    // scala: Vec3 = new Vec3();
    projectionMatrix = new Mat4();

    constructor(
        fov: number,			// 相机视野的角度。一般是以Y轴
        aspect: number,			// 相机的纵横比（宽度除以高度）
        near: number,			// 相机渲染最近的距离，小于这距离的不会进行渲染
        far: number			// 相机渲染最远的距离，大于这距离的不会进行渲染
    ) {
        // TODO
        this.projectionMatrix.setPerspective(fov, aspect, near, far);
        this.position = this.matrixWorldInverse.getTranslation();

    }
    lookAt(target: Vec3) {
        // TODO
        this.matrixWorldInverse.setLookAt(this.position, target, new Vec3(0, 1, 0)).invert();
    }
    get PVMatrix() {
        return new Mat4().mul(this.projectionMatrix).mul(this.matrixWorldInverse);
    }

}