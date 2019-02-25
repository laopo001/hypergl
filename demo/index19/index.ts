/*
 * ProjectName: hypergl
 * FilePath: \demo\index19\index.ts
 * Created Date: Friday, February 15th 2019, 1:12:01 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, February 25th 2019, 11:59:14 am
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
import { FnVoid } from '../../src/types';
import { createSkyboxScene } from './scene-skybox';


function addButton(text: string, cb: FnVoid) {
    let button = document.createElement('button');
    button.innerText = text;
    button.onclick = cb;
    document.body.append(button);
}

async function main() {
    const app = new Application<AppPlugin>(document.getElementById('canvas') as HTMLCanvasElement, {
        // webgl1:true
    });
    app.registerPlugins([LoadImagePlugin, StatsPlugin, PointerPlugin, AmmoPlugin, GltfPlugin]);

    console.log(app);

    import('./scene-pick').then(module => {
        app.addScene(module.scene);
        addButton('pick', () => {
            app.setActiveScene('pick');
        });
    });

    import('./scene-gltf').then(module => {
        app.addScene(module.scene);
        app.setActiveScene('gltf');
        app.start();
        addButton('gltf', () => {
            app.setActiveScene('gltf');
        });
    });

    import('./scene-audio').then(module => {
        app.addScene(module.scene);
        addButton('audio', () => {
            app.setActiveScene('audio');
        });
    });

    import('./scene-material').then(module => {
        app.addScene(module.scene);
        addButton('material', () => {
            app.setActiveScene('material');
        });
    });

    createSkyboxScene().then(module => {
        app.addScene(module);
        addButton('skybox', () => {
            app.setActiveScene('skybox');
        });
    });

}

main().catch((err) => {
    console.log(err);
});

