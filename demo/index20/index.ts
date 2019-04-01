/*
 * ProjectName: hypergl
 * FilePath: \demo\index20\index.ts
 * Created Date: Tuesday, April 2nd 2019, 12:12:16 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, April 2nd 2019, 12:21:46 am
 * Modified By:
 * -----
 * Copyright (c) 2019 dadigua
 */


import { Entity, StandardMaterial, Config, Scene, util, SkyMaterial, Application, Vec3, Color, Picker, Texture, CubeTexture, PBRMaterial, Mesh, Drawable } from 'hypergl';
import { AppPlugin } from '../types';
import { LoadImagePlugin, GltfPlugin } from 'hypergl/plugins/load';
import { StatsPlugin } from 'hypergl/plugins/stat';
import { PointerPlugin } from 'hypergl/plugins/pointer';
import { FirstPersonCamera } from '../scripts';


const app = new Application<AppPlugin>(document.getElementById('canvas') as HTMLCanvasElement, {

});
app.registerPlugins([LoadImagePlugin, StatsPlugin, PointerPlugin, GltfPlugin]);
app.start();

let box = Mesh.createBox();

let e = new Entity().addChild(new Entity('e').addComponent('model', { type: 'model', model: box })).setLocalPosition(-1, 0, 0);

let e1 = new Entity('e1').addChild(e.clone()).setLocalPosition(-1, 0, 0);
let e2 = new Entity('e2').addChild(e.clone()).setLocalPosition(1, 0, 0);

app.scene.root.addChild(e1);
app.scene.root.addChild(e2);

let camera = new Entity('camera')
    .addComponent('camera', {
        type: 'perspective',
        perspective: {
            fov: 45,
            aspectRatio: 1000 / 600,
            near: 1,
            far: 10000
        }
    })
    .setPosition(0, 5, 5)
    .lookAt(new Vec3(0, 0, 0))
    .addComponent('script', [new FirstPersonCamera({ speed: 2 })]);
app.scene.root.addChild(camera);

let light = new Entity('light')
    .addComponent('light', {
        type: 'directional',
        // castShadows: true,
        shadowType: 'PCF',
        range: 16
    })
    .setEulerAngles(-45, -45, 0)
    .setLocalPosition(0, 5, 0);
app.scene.root.addChild(light);

app.plugins.gltf.createLoader('./assets/models/_Complete-Game.gltf').loadSenceRoot().then(node => {
    node.setLocalScale(0.11, 0.11, 0.11);
    app.scene.root.addChild(node);
    // app.scene.root.enabled = true;
});


