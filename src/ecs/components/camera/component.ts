/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\camera\component.ts
 * Created Date: Saturday, November 10th 2018, 12:31:21 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, November 10th 2018, 12:51:22 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, Camera } from '../../..';
import { Camera as CameraInputs } from 'gltf-loader-ts';
import { Component } from '../../component';
import { Log } from '../../../utils/util';


export class CameraComponent extends Component<CameraInputs> {
    entity!: Entity;
    constructor(inputs, app) {
        super(inputs, app);
    }
    initialize() {
        let camera = new Camera();
        switch (this.inputs.type) {
            case 'perspective': {
                let { aspectRatio, zfar, znear, yfov } = this.inputs.perspective!;
                camera.setPerspective(yfov, aspectRatio!, znear, zfar!);
                break;
            }
            case 'orthographic': {
                let { xmag, ymag, zfar, znear } = this.inputs.orthographic!;
                camera.setOrtho(-xmag, xmag, -ymag, ymag, znear, zfar);
                break;
            }
            default: Log.error(`${this.inputs.type} not match`);
                break;
        }
        return camera;
    }
}
