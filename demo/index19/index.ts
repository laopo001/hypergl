/*
 * ProjectName: hypergl
 * FilePath: \demo\index19\index.ts
 * Created Date: Friday, February 15th 2019, 1:12:01 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, March 8th 2019, 10:22:54 pm
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
import { SceneSettingPlugin } from 'hypergl/plugins/scene_setting';
import { AppPlugin } from '../types';
import { FnVoid } from '../../src/types';
import { createSkyboxScene } from './scene-skybox';
import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';


let container = document.getElementById('container')!;

function addButton(text: string, cb: FnVoid) {
    let button = document.createElement('button');
    button.innerText = text;
    button.onclick = cb;
    container.append(button);
}

async function main() {
    const app = new Application<AppPlugin>(document.getElementById('canvas') as HTMLCanvasElement, {
        // webgl1:true
    });
    app.registerPlugins([LoadImagePlugin, StatsPlugin, PointerPlugin, AmmoPlugin, GltfPlugin, SceneSettingPlugin]);

    console.log(app);

    createSkyboxScene().then(module => {
        app.addScene(module);
        addButton('skybox', () => {
            app.setActiveScene('skybox');
        });
    });

    const routes = [
        { name: 'default', path: '/', forwardTo: 'pick' },
        { name: 'pick', path: '/pick', },
        { name: 'gltf', path: '/gltf' },
        { name: 'audio', path: '/audio' },
        { name: 'material', path: '/material' },
        { name: 'tank', path: '/tank', },
    ];
    routes.filter(x => x.name !== 'default').forEach((x) => {
        let name = x.name;
        addButton(name, () => {
            router.navigate(name);
        });
    });
    const router = createRouter(routes);


    router.usePlugin(browserPlugin({
        useHash: true
    }));

    router.subscribe(async (status) => {
        let name = status.route.name;
        import('./scene-' + name).then(module => {
            if (!module.scene.isRegistered) {
                app.addScene(module.scene);
            }
            app.setActiveScene(status.route.name);
            if (status.previousRoute == null) {
                app.start();
            }
        });
    });

    router.start();

}

main().catch((err) => {
    console.log(err);
});

