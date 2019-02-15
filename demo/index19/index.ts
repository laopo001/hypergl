/*
 * ProjectName: hypergl
 * FilePath: \demo\index19\index.ts
 * Created Date: Friday, February 15th 2019, 1:12:01 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, February 16th 2019, 12:44:41 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */


import { Entity, StandardMaterial, Config, Scene, util, SkyMaterial, Application, Vec3, Color, Picker, Texture, CubeTexture, PBRMaterial, Mesh, Drawable } from 'hypergl';
import { FirstPersonCamera } from '../utils/first_person_camera';
import { Rotate } from '../utils/rotate';
// tslint:disable-next-line:no-duplicate-imports
import { LoadImagePlugin, GltfPlugin } from 'hypergl/plugins/load';
import { StatsPlugin } from 'hypergl/plugins/stat';
import { PointerPlugin } from 'hypergl/plugins/pointer';
import { AmmoPlugin } from 'hypergl/plugins/physics';
import { AppPlugin } from '../types';

async function main() {
    const app = new Application<AppPlugin>(document.getElementById('canvas') as HTMLCanvasElement, {
        // webgl1:true
    });
    app.registerPlugins([LoadImagePlugin, StatsPlugin, PointerPlugin, AmmoPlugin, GltfPlugin]);

    console.log(app);

    import('./scene-pick').then(module => {
        app.addScene(module.scene);
        app.setScene('pick');
        let button = document.createElement('button');
        button.innerText = 'pick';
        button.onclick = () => {
            app.setScene('pick');
        };
        document.body.append(button);
        app.start();
    });

    import('./scene-gltf').then(module => {
        app.addScene(module.scene);
        let button = document.createElement('button');
        button.innerText = 'gltf';
        button.onclick = () => {
            app.setScene('gltf');
        };
        document.body.append(button);
    });


}

main().catch((err) => {
    console.log(err);
});

