/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\rigidbody\system.ts
 * Created Date: Thursday, January 3rd 2019, 11:27:57 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, March 16th 2019, 5:29:04 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */


import { ComponentSystem } from '../../system';
import { RigidbodyComponent } from './component';
import { AmmoPlugin } from 'hypergl/plugins/physics';
import { Scene } from '../../../scene';
import { Option } from '../../../core';



export class RigidbodyComponentSystem extends ComponentSystem {
    componentConstructor = RigidbodyComponent;
    name = 'rigidbody';

    physics !: AmmoPlugin;
    // asyncPhysics!: Promise<AmmoPlugin>;
    enabled = true;
    constructor(scene: Scene) {
        super(scene);
        // tslint:disable-next-line:no-unused-expression
        // this.asyncPhysics = new Promise((resolve, reject) => {
        //     scene.event.on('register', () => {
        //         if ((scene.app.plugins as any).physics) {
        //             let c = (scene.app.plugins as any).physics;
        //             this.physics = new c(scene.app);

        //             this.physics.unwrap().initialize().then(() => {
        //                 scene.event.on('update', (dt) => {
        //                     this.physics.unwrap().onUpdate(dt);
        //                 });
        //                 resolve(this.physics.unwrap());
        //             });
        //         } else {
        //             reject('没有注册ammo插件');
        //         }
        //     });
        // });
    }
}