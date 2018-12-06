/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\camera\component.ts
 * Created Date: Saturday, November 10th 2018, 12:31:21 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, December 6th 2018, 5:23:06 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, Camera } from '../../..';
import { Component } from '../../component';
import { Log, copy } from '../../../utils/util';
import { Mat4 } from '../../../math';
import { ComponentSystem } from '../../system';
import { Color } from '../../../core';

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
}

export const cameraData: CameraInputs = {
    type: 'perspective',
    perspective: {
        fov: 45,
        aspectRatio: 1,
        near: 0.1,
        far: 10000
    },
    clearColor: new Color(0, 0, 0)
};

export class CameraComponent extends Component<CameraInputs> {
    name = 'camera';
    instance: Camera;
    get projectionMatrix() {
        return this.instance.projectionMatrix;
    }
    get viewProjectionMatrix() {
        return new Mat4().mul2(this.projectionMatrix, this.entity.getWorldTransform().clone().invert());
    }

    constructor(inputs: CameraInputs, entity: Entity, system: ComponentSystem) {
        super(inputs, entity, system);
        copy(inputs, cameraData);
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
    setPerspective(fov: number, aspect: number, near: number, far: number) {
        this.instance.projectionMatrix.setPerspective(fov, aspect, near, far);
        return this;
    }
    setOrtho(left: number, right: number, bottom: number, top: number, near: number, far: number) {
        this.instance.projectionMatrix.setOrtho(left, right, bottom, top, near, far);
        return this;
    }
    initialize(entity: Entity, system: ComponentSystem) {
        //
    }
    get clearColor() {
        return this.instance.clearColor;
    }
    set clearColor(v) {
        this.instance.clearColor = v;
    }
}
