/*
 * ProjectName: hypergl
 * FilePath: \src\scene.ts
 * Created Date: Saturday, August 18th 2018, 4:22:49 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, November 21st 2018, 7:39:36 pm
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
import { Vec3 } from '../math';
import { Light, PointLight, DirectionalLight, SpotLight } from '../lights';
import { Frame } from '../graphics/createFrame';
import { Log } from '../utils/util';
import { Mesh } from '../mesh/mesh';
import { StandardMaterial, Material } from '../material';
import { event, IElement } from '../core';
import { SystemRegistry } from '../ecs/system-register';
import { CameraComponentSystem } from '../ecs/components/camera/system';
import { LightComponentSystem } from '../ecs/components/light/system';
import { ScriptComponentSystem } from '../ecs/components/script/system';
import { ModelComponentSystem } from '../ecs/components/model/system';
import { CameraComponent } from 'src/ecs/components/camera';
export class Scene {
    static ambientColor = new Color(0.2, 0.2, 0.2);
    // static ambient = new Vec3(0, -1, -1);
    fog;
    baseMaterial;
    readonly lights: {
        directionalLights: DirectionalLight[],
        pointLights: PointLight[],
        spotLight: SpotLight[]
    } = {
            directionalLights: [],
            pointLights: [],
            spotLight: []
        };

    app!: Application;
    entitys: Entity[] = [];

    root: Entity = new Entity('root');
    // readonly cameras: Camera[] = [];
    systems: SystemRegistry;
    private _activeCamera!: CameraComponent;
    get activeCamera() {
        let defaultCamera = this.systems.camera!.components[0];
        Log.assert(this._activeCamera || defaultCamera, 'scene 没有 activeCamera');
        return this._activeCamera || defaultCamera;
    }
    set activeCamera(x) {
        this._activeCamera = x;
    }
    private materials: Material[] = [];
    constructor() {
        // super();
        this.root.scene = this;
        this.root.enabled = true;
        event.on('opacityChange', (e) => {
            console.log('opacityChange');
        });
        this.systems = new SystemRegistry();
        this.systems.add(new CameraComponentSystem());
        this.systems.add(new LightComponentSystem());
        this.systems.add(new ScriptComponentSystem());
        this.systems.add(new ModelComponentSystem());
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
        const f = new Frame(this, isCube);
        f.createFramebuffer();
        return f;
    }
    add(child: Entity) {
        if (child.children.length > 0) {
            for (let i = 0; i < child.children.length; i++) {
                const element = child.children[i];
                element.scene = this;
                this.add(element);
            }
        }
        this.entitys.push(child);
        child.enabled = true;
    }
    get [Symbol.toStringTag]() {
        return 'Scene';
    }
}