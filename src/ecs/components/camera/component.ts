/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\camera\component.ts
 * Created Date: Saturday, November 10th 2018, 12:31:21 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, March 6th 2019, 12:46:34 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */



import { Component } from '../../component';
import { Log, input_copy } from '../../../utils/util';
import { Mat4, Vec3 } from '../../../math';
import { ComponentSystem } from '../../system';
import { Color } from '../../../core';
import { Camera } from '../../../scene/camera';
import { Entity } from '../../entity';
export interface CameraInputs {
    type: 'perspective' | 'orthographic'
    orthographic?: {
        left: number;
        right: number;
        bottom: number;
        top: number;
        near: number;
        far: number;
    };
    perspective?: {
        fov: number;
        aspectRatio: number;
        near: number;
        far: number;
    }
    clearColor?: Color;
    frustumCulling?: boolean;
}

export const cameraData: CameraInputs = {
    type: 'perspective',
    perspective: {
        fov: 45,
        aspectRatio: 1,
        near: 0.1,
        far: 10000
    },
    clearColor: new Color(0, 0, 0),
    frustumCulling: false
};

export class CameraComponent extends Component<CameraInputs> {
    get projectionMatrix() {
        return this.instance.projectionMatrix;
    }
    get clearColor() {
        return this.instance.clearColor;
    }
    set clearColor(v) {
        this.instance.clearColor = v;
    }
    name = 'camera';
    instance: Camera;
    private _viewProjectionMatrix = new Mat4();

    constructor(inputs: CameraInputs, entity: Entity, system: ComponentSystem) {
        super(inputs, entity, system);
        input_copy(inputs, cameraData);
        let camera = new Camera(this.entity);
        switch (this.inputs.type) {
            case 'perspective': {
                let { fov, aspectRatio, far, near } = this.inputs.perspective!;
                camera.setPerspective(fov, aspectRatio, near, far);
                break;
            }
            case 'orthographic': {
                let { left, right, bottom, top, near, far } = this.inputs.orthographic!;
                camera.setOrtho(left, right, bottom, top, near, far);
                break;
            }
            default: Log.error(`${this.inputs.type} not match`);
                break;
        }
        camera.clearColor = this.inputs.clearColor!;
        this.instance = camera;
    }
    viewProjectionMatrix() {
        return this._viewProjectionMatrix.mul2(this.projectionMatrix, this.entity.getWorldTransform().clone().invert());
    }
    setPerspective(fov: number, aspect: number, near: number, far: number) {
        this.instance.projectionMatrix.setPerspective(fov, aspect, near, far);
        return this;
    }
    setOrtho(left: number, right: number, bottom: number, top: number, near: number, far: number) {
        this.instance.projectionMatrix.setOrtho(left, right, bottom, top, near, far);
        return this;
    }
    screenToWorld(screenx, screeny, cameraz, worldCoord?) {
        let renderer = this.entity.app.renderer;
        return this.instance.screenToWorld(screenx, screeny, cameraz, renderer.canvas.width, renderer.canvas.height, worldCoord);
    }
}
