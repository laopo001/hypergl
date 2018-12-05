/*
 * ProjectName: hypergl
 * FilePath: \src\scene\camera.ts
 * Created Date: Tuesday, August 21st 2018, 6:51:36 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, November 28th 2018, 11:59:07 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Vec3, Quat, Mat4 } from '../math';
import { SceneNode } from './node';
import { RenderTarget } from './renderTarget';
export class Camera {
    get viewProjectionMatrix() {
        return new Mat4().mul2(this.projectionMatrix, this.node.getWorldTransform().clone().invert());
    }
    projectionMatrix = new Mat4();
    renderTarget: RenderTarget;
    constructor(public node: SceneNode) {
        this.renderTarget = new RenderTarget(this.projectionMatrix, this.node.getWorldTransform().clone().invert());
    }
    updateRenderTarget() {
        this.renderTarget.frustum.update(this.projectionMatrix, this.node.getWorldTransform().clone().invert());
    }
    /**
     *
     *
     * @param {number} fov 相机视野的角度。一般是以Y轴
     * @param {number} aspect 相机的纵横比（宽度除以高度）
     * @param {number} near 相机渲染最近的距离，小于这距离的不会进行渲染
     * @param {number} far 相机渲染最远的距离，大于这距离的不会进行渲染
     * @memberof Camera
     */
    setPerspective(fov: number, aspect: number, near: number, far: number) {
        this.projectionMatrix.setPerspective(fov, aspect, near, far);
        return this;
    }
    setOrtho(left: number, right: number, bottom: number, top: number, near: number, far: number) {
        this.projectionMatrix.setOrtho(left, right, bottom, top, near, far);
        return this;
    }

}
