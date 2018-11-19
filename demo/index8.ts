/*
 * ProjectName: hypergl
 * FilePath: \demo\index8.ts
 * Created Date: Friday, November 9th 2018, 8:38:03 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, November 19th 2018, 9:52:09 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Application, Entity, Script } from '../src';
import { FirstPersonCamera } from './utils/first_person_camera';
import { Vec3 } from '../src/math';


async function main() {
    const app = new Application(document.getElementById('canvas') as HTMLCanvasElement, {
        // webgl1:true
    });
    console.log(app);
    let camera = new Entity();
    camera.addComponent('camera', {
        type: 'perspective',
        perspective: {
            fov: 90,
            aspectRatio: 1,
            near: 1,
            far: 10000
        }
    });
    camera.setPosition(-2, 5, 10);
    camera.lookAt(new Vec3(0, 0, 0), camera.up);
    camera.addComponent('script', new FirstPersonCamera());
    app.scene.root.addChild(camera);

    let light = new Entity();
    light.addComponent('light', {
        type: 'directional',
    });
    app.scene.root.addChild(light);

    let box = new Entity();
    box.addComponent('model', {
        type: 'box'
    });
    app.scene.root.addChild(box);
}

main();