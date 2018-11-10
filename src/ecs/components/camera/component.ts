/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\camera\component.ts
 * Created Date: Saturday, November 10th 2018, 12:31:21 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, November 10th 2018, 9:04:18 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, Camera } from '../../..';
import { Component } from '../../component';
import { Log } from '../../../utils/util';

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

export class CameraComponent extends Component<CameraInputs> {
    entity!: Entity;
    constructor(inputs, app) {
        super(inputs, app);
    }
    initialize() {
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
        return camera;
    }
}
