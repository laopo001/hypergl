/*
 * ProjectName: hypergl
 * FilePath: \demo\index8.ts
 * Created Date: Friday, November 9th 2018, 8:38:03 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, November 15th 2018, 12:02:14 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Application, Entity } from '../src';

async function main() {
    const app = new Application(document.getElementById('canvas') as HTMLCanvasElement, {
        // webgl1:true
    });
    let entity = new Entity();
    entity.addComponent('camera', {
        type: 'perspective',
        perspective: {
            fov: 90,
            aspectRatio: 1,
            near: 1,
            far: 10000
        }
    });
    entity.addComponent('light', {
        type: 'directional',
    });
    console.log(entity, app);

}

main();