/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\rigidbody\system.ts
 * Created Date: Thursday, January 3rd 2019, 11:27:57 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, March 9th 2019, 12:42:58 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */


import { ComponentSystem } from '../../system';
import { RigidbodyComponent } from './component';
import { AmmoPlugin } from 'hypergl/plugins/physics';
import { Scene } from '../../../scene';

export class RigidbodyComponentSystem extends ComponentSystem {
    componentConstructor = RigidbodyComponent;
    name = 'rigidbody';
    physics!: AmmoPlugin;
    asyncPhysics!: Promise<AmmoPlugin>;
    enabled = true;
    constructor(scene: Scene) {
        super(scene);
        // tslint:disable-next-line:no-unused-expression
        this.asyncPhysics = new Promise((resolve, reject) => {
            scene.event.on('register', () => {
                if ((scene.app.plugins as any).physics) {
                    let c = (scene.app.plugins as any).physics;
                    this.physics = new c(scene.app);

                    this.physics.initialize().then(() => {
                        scene.event.on('update', (dt) => {
                            this.physics.onUpdate(dt);
                        });
                        resolve(this.physics);
                    });
                } else {
                    reject('没有注册ammo插件');
                }
            });
        });


    }
}