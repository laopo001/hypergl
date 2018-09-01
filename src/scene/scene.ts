/*
 * ProjectName: hypergl
 * FilePath: \src\scene.ts
 * Created Date: Saturday, August 18th 2018, 4:22:49 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, September 1st 2018, 3:38:52 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { IElement } from '../core/element';
import { Application } from '../application';
import { INode } from './node';
import { renderScence } from './renderScence';
import { Camera } from './camera';
import { Entity } from '../ecs/entity';
export class Scene extends IElement {
    fog;
    baseMaterial;
    readonly lights = [];
    readonly cameras: Camera[] = [];
    private _activeCamera!: Camera;
    get activeCamera() {
        return this._activeCamera || this.cameras[0];
    }
    set activeCamera(x) {
        this._activeCamera = x;
    }
    readonly layer: Entity[] = [];
    root: Entity = new Entity();
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