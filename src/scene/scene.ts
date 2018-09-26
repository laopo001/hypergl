/*
 * ProjectName: hypergl
 * FilePath: \src\scene.ts
 * Created Date: Saturday, August 18th 2018, 4:22:49 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, September 27th 2018, 1:06:26 am
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
import { Frame } from '../graphics/createFrame';
import { Log } from '../util';
export class Scene extends IElement {
    static ambientColor = new Color(0.2, 0.2, 0.2);
    // static ambient = new Vec3(0, -1, -1);
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
    root: SceneNode = new SceneNode();
    readonly cameras: Camera[] = [];
    private _activeCamera!: Camera;
    get activeCamera() {
        Log.assert(this._activeCamera || this.cameras[0], 'scene 没有 activeCamera');
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
    // tslint:disable-next-line:member-ordering
    _frame?: Frame;
    createFrame() {
        if (this._frame) { return this._frame; }
        const f = new Frame(this);
        f.createFramebuffer();
        this._frame = f;
        return f;
    }
    createShadowFrame(isCube) {
        const f = new Frame(this,isCube);
        f.createFramebuffer();
        return f;
    }
    add(child) {
        if (child instanceof DirectionalLight) {
            this.lights.directionalLights.push(child);
        } else if (child instanceof PointLight) {
            this.lights.pointLights.push(child);
        } else if (child instanceof Entity) {
            this.layer.push(child);
        }
    }
    get [Symbol.toStringTag]() {
        return 'Scene';
    }
}