/*
 * ProjectName: hypergl
 * FilePath: \src\scene.ts
 * Created Date: Saturday, August 18th 2018, 4:22:49 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, September 9th 2018, 5:31:10 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { IElement } from '../core/element';
import { Application } from '../application';
import { SceneNode } from './node';
import { renderScence } from './renderScence';
import { Camera } from './camera';
import { Entity } from '../ecs/entity';
import { Color } from '../core/color';
import { Vec3 } from '../math';
import { Light, PointLight, DirectionalLight } from '../lights';
export class Scene extends IElement {
    static ambientColor = new Color(0.5, 0.5, 0.5);
    static ambient = new Vec3(0, -1, -1);
    fog;
    baseMaterial;
    readonly lights: {
        directionalLights: DirectionalLight[],
        pointLights: PointLight[]
    } = {
            directionalLights: [],
            pointLights: []
        };
    readonly layer: Entity[] = [];
    root: Entity = new Entity();
    readonly cameras: Camera[] = [];
    private _activeCamera!: Camera;
    get activeCamera() {
        return this._activeCamera || this.cameras[0];
    }
    set activeCamera(x) {
        this._activeCamera = x;
    }
    constructor(public app: Application) {
        super();
        this.root.scene = this;
    }
    render() {
        this.root.syncHierarchy();
        renderScence(this);
    }
    get [Symbol.toStringTag]() {
        return 'Scene';
    }
}