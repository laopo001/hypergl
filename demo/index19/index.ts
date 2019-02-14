/*
 * ProjectName: hypergl
 * FilePath: \demo\index19\index.ts
 * Created Date: Friday, February 15th 2019, 1:12:01 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, February 15th 2019, 2:11:34 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */


import { Entity, StandardMaterial, Config, Scene, util, SkyMaterial, Application, Vec3, Color, Picker, Texture, CubeTexture, PBRMaterial, Mesh, Drawable } from 'hypergl';
import { FirstPersonCamera } from '../utils/first_person_camera';
import { Rotate } from '../utils/rotate';
// tslint:disable-next-line:no-duplicate-imports
import { LoadImagePlugin } from 'hypergl/plugins/load';
import { StatsPlugin } from 'hypergl/plugins/stat';
import { PointerPlugin } from 'hypergl/plugins/pointer';
import { AmmoPlugin } from 'hypergl/plugins/physics';
import { AppPlugin } from '../types';

async function main() {
    const app = new Application<AppPlugin>(document.getElementById('canvas') as HTMLCanvasElement, {
        // webgl1:true
    });
    app.registerPlugins([LoadImagePlugin, StatsPlugin, PointerPlugin, AmmoPlugin]);

    console.log(app);

    import('./scene1').then(x => {
        app.addScene(x.scene);
        app.setScene('scene1');
        app.start();
    });

}

main().catch((err) => {
    console.log(err);
});

