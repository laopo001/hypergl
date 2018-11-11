/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\camera\component.ts
 * Created Date: Saturday, November 10th 2018, 12:31:21 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, November 12th 2018, 1:08:12 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, Camera } from '../../..';
import { Component } from '../../component';
import { Log } from '../../../utils/util';
import { Mat4 } from '../../../math';
import { ComponentSystem } from '../../system';

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
}

export const cameraData: CameraInputs = {
    type: 'perspective',
    perspective: {
        fov: 90,
        aspectRatio: 1,
        near: 1,
        far: 10000
    }
};

export class CameraComponent extends Component<CameraInputs> {
    name = 'camera';
    camera: Camera;
    get projectionMatrix() {
        return this.camera.projectionMatrix;
    }
    get viewProjectionMatrix() {
        return new Mat4().mul2(this.projectionMatrix, this.entity.getWorldTransform().clone().invert());
    }
    constructor(inputs = cameraData) {
        super(inputs);
        let camera = new Camera();
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
        this.camera = camera;
    }
    setPerspective(fov: number, aspect: number, near: number, far: number) {
        this.camera.projectionMatrix.setPerspective(fov, aspect, near, far);
        return this;
    }
    setOrtho(left: number, right: number, bottom: number, top: number, near: number, far: number) {
        this.camera.projectionMatrix.setOrtho(left, right, bottom, top, near, far);
        return this;
    }
    initialize(entity: Entity, system: ComponentSystem) {
        this.entity = entity;
        this.system = system;
        this.system.addCamera(this);
    }
}
