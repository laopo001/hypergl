/*
 * ProjectName: hypergl
 * FilePath: \src\scene\camera.ts
 * Created Date: Tuesday, August 21st 2018, 6:51:36 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, January 29th 2019, 1:04:46 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Vec3, Quat, Mat4 } from '../math';
import { SceneNode } from './node';
import { Color } from '../core';
import { Frustum } from '../math/frustum';
import { ModelComponent } from '../ecs/components/model';
import { BoundingSphere } from '../shape/boundingSphere';

let _far = new Vec3();
let _farW = new Vec3();
let _deviceCoord = new Vec3();
export class Camera {
    clearColor = new Color(0, 0, 0);
    get viewProjectionMatrix() {
        return new Mat4().mul2(this.projectionMatrix, this.node.getWorldTransform().clone().invert());
    }
    projectionMatrix = new Mat4();
    frustum: Frustum;
    isPerspective = false;
    isOrtho = false;
    farClip = 0;
    nearClip = 0;
    constructor(public node: SceneNode) {
        this.frustum = new Frustum(this.projectionMatrix, this.node.getWorldTransform().clone().invert());
    }
    screenToWorld(x, y, z, cw, ch, worldCoord = new Vec3()) {


        let _invViewProjMat = this.viewProjectionMatrix.invert();

        if (this.isPerspective) {
            // Calculate the screen click as a point on the far plane of the
            // normalized device coordinate 'box' (z=1)
            _far.set(x / cw * 2 - 1, (ch - y) / ch * 2 - 1, 1);

            // Transform to world space
            _invViewProjMat.transformPoint(_far, _farW);

            let w = _far.x * _invViewProjMat.data[3] +
                _far.y * _invViewProjMat.data[7] +
                _far.z * _invViewProjMat.data[11] +
                _invViewProjMat.data[15];

            _farW.scale(1 / w);

            let alpha = z / this.farClip;
            worldCoord.lerp(this.node.getPosition(), _farW, alpha);
        } else {
            // Calculate the screen click as a point on the far plane of the
            // normalized device coordinate 'box' (z=1)
            let range = this.farClip - this.nearClip;
            _deviceCoord.set(x / cw, (ch - y) / ch, z / range);
            _deviceCoord.scale(2);
            _deviceCoord.sub(Vec3.ONE);

            // Transform to world space
            _invViewProjMat.transformPoint(_deviceCoord, worldCoord);
        }

        return worldCoord;
    }
    updateRenderTarget() {
        this.frustum.update(this.projectionMatrix, this.node.getWorldTransform().clone().invert());
    }
    getList(models: ModelComponent[]) {

        return models.filter(model => {
            return true;
            // let { center, radius } = model.instance.aabb;

            // let scale = model.entity.getLocalScale();
            // let max = Math.max(scale.x, scale.y, scale.z);
            // let point = new Vec3().add2(center, model.getPosition());
            // return this.frustum.containsSphere(new BoundingSphere(point, radius * max));

            // let points = model.instance.aabb.getPoints();
            // for (let i = 0; i < points.length; i++) {
            //     let scale = model.entity.getLocalScale();
            //     let point = points[i];
            //     point = new Vec3().mul2(point, scale);
            //     point = new Vec3().add2(point, model.getPosition());
            //     if (this.frustum.containsPoint(point)) {
            //         return true;
            //     }
            // }
            // return false;

            // return this.frustum.containsBox(model.instance.aabb);
        });
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
        this.isPerspective = true;
        this.isOrtho = false;
        this.nearClip = near;
        this.farClip = far;
        this.projectionMatrix.setPerspective(fov, aspect, near, far);
        return this;
    }
    setOrtho(left: number, right: number, bottom: number, top: number, near: number, far: number) {
        this.isPerspective = false;
        this.isOrtho = true;
        this.nearClip = near;
        this.farClip = far;
        this.projectionMatrix.setOrtho(left, right, bottom, top, near, far);
        return this;
    }

}
