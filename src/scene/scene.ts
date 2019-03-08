/*
 * ProjectName: hypergl
 * FilePath: \src\scene.ts
 * Created Date: Saturday, August 18th 2018, 4:22:49 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, March 8th 2019, 11:54:36 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { Application } from '../application';
import { SceneNode } from './node';
import { renderScence } from './renderScence';
import { Camera } from './camera';
import { Entity } from '../ecs/entity';
import { Color } from '../core/color';
import { Frame } from '../graphics/createFrame';
import { Log } from '../utils/util';
import { Mesh } from '../mesh/mesh';
import { StandardMaterial, Material } from '../material';
import { event, IElement, createEvent } from '../core';
import { SystemRegistry } from '../ecs/system-register';
import { CameraComponentSystem } from '../ecs/components/camera/system';
import { LightComponentSystem } from '../ecs/components/light/system';
import { ScriptComponentSystem } from '../ecs/components/script/system';
import { ModelComponentSystem } from '../ecs/components/model/system';
import { CameraComponent } from '../ecs/components/camera';
import { AudioComponentSystem } from '../ecs/components/audio';
import { ListenerComponentSystem } from '../ecs/components/listener';
import { CollisionComponentSystem } from '../ecs/components/collision';
import { RigidbodyComponentSystem } from '../ecs/components/rigidbody';
import { FOG } from '../conf';

export class Scene {
    static ambientColor = new Color(0.2, 0.2, 0.2);
    fog: FOG = FOG.NONE;
    fogColor = new Color(0, 0, 0);
    fogDensity = 0.01;
    fogStart = 1;
    fogEnd = 1000;
    /**
     * HDR 色调映射
     * @memberof Scene
     */
    exposure = 1;
    /**
     * Gamma校正
     * @memberof Scene
     */
    gammaCorrection = 2.2;
    app!: Application;
    entitys: Entity[] = [];
    // materials: Material[] = [];
    // drawables: Drawable[] = [];
    root: Entity = new Entity('root');
    systems: SystemRegistry;
    isRegistered = false;
    event = createEvent('scene');
    private _activeCameraIndex = 0;
    get activeCamera() {
        let defaultCamera = this.systems.camera!.components[this._activeCameraIndex];
        Log.assert(this._activeCameraIndex || defaultCamera, 'scene 没有 activeCamera');
        return defaultCamera as CameraComponent;
    }
    // set activeCamera(x) {
    //     this._activeCameraIndex = x;
    // }
    get isActive() {
        return this.isRegistered && this.app.scene === this;
    }
    constructor(public name?: string) {
        this.root.enabled = true;
        this.root._scene = this;
        this.systems = new SystemRegistry();
        this.systems.add(new CameraComponentSystem(this));
        this.systems.add(new LightComponentSystem(this));
        this.systems.add(new ScriptComponentSystem(this));
        this.systems.add(new ModelComponentSystem(this));
        this.systems.add(new AudioComponentSystem(this));
        this.systems.add(new ListenerComponentSystem(this));
        this.systems.add(new CollisionComponentSystem(this));
        this.systems.add(new RigidbodyComponentSystem(this));
        event.on('update', (dt) => {
            if (this.isActive) {
                this.event.fire('update', dt);
            }
        });
    }
    setActiveCamera(x: number) {
        this._activeCameraIndex = x;
    }
    render() {
        this.root.syncHierarchy();
        event.fire('sync');
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
    createShadowFrame(width: number, height: number, isCube: boolean) {
        const f = new Frame(this, width, height, isCube);
        f.createFramebuffer();
        return f;
    }
    add(child: Entity) {
        event.fire('add');
        if (child.children.length > 0) {
            for (let i = 0; i < child.children.length; i++) {
                const element = child.children[i];
                this.add(element);
            }
        }
        child.components.forEach((c) => {
            this.systems[c.name].addComponent(child, c);
        });
        this.entitys.push(child);
    }
    get [Symbol.toStringTag]() {
        return 'Scene';
    }
}