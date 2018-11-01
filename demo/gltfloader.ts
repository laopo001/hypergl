/*
 * ProjectName: hypergl
 * FilePath: \demo\gltfloader.ts
 * Created Date: Tuesday, October 30th 2018, 5:41:56 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, November 1st 2018, 11:47:06 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Mesh, Application, Entity, BasicMaterial, DirectionalLight } from '../src';
import { GltfLoader, GlTf } from 'gltf-loader-ts';
import { Color } from '../src/core';
import { Camera } from '../src/scene/camera';
import { Mat4, Vec3 } from '../src/math';

export const GLTF_COMPONENT_TYPE_ARRAYS: { [index: number]: any } = {
    5120: Int8Array,
    5121: Uint8Array,
    5122: Int16Array,
    5123: Uint16Array,
    5125: Uint32Array,
    5126: Float32Array,
};

function to(gltf: GlTf, id: number, uint8: Uint8Array) {
    // tslint:disable-next-line:no-non-null-assertion
    let dataView = GLTF_COMPONENT_TYPE_ARRAYS[gltf.accessors![id].componentType];
    return new dataView(uint8.buffer);
}

async function main() {
    const app = new Application(document.getElementById('canvas') as HTMLCanvasElement, {
        // webgl1:true
    });


    let loader = new GltfLoader();
    let uri = './assets/models/Duck.glb';
    let asset = await loader.load(uri, (e) => {
        // console.log(e);
    });
    let gltf = asset.gltf;
    // let data = await asset.accessorData(0); // fetches BoxTextured0.bin
    // let image = await asset.imageData.get(0); // fetches CesiumLogoFlat.png
    if (gltf.meshes) {
        for (let i = 0; i < gltf.meshes.length; i++) {
            let model = gltf.meshes[i];
            for (let j = 0; j < model.primitives.length; j++) {
                const mesh = model.primitives[j];
                let positions = await asset.accessorData<any>(mesh.attributes.POSITION);

                let normals = await asset.accessorData<any>(mesh.attributes.NORMAL);
                let uvs = await asset.accessorData<any>(mesh.attributes.TEXCOORD_0);
                let indices;
                if (typeof mesh.indices === 'number') {
                    indices = await asset.accessorData<any>(mesh.indices);
                }
                let m = Mesh.createMesh(app.rendererPlatform, {
                    positions, normals, uvs, indices
                });
                let e = new Entity();
                e.setLocalScale(0.01, 0.01, 0.01);
                e.mesh = m;
                e.mesh.mode = mesh.mode as any;
                (e.mesh.material as BasicMaterial).color = new Color(1, 1, 1);
                app.scene.root.addChild(e);
                // console.warn(positions, normals, uvs, indices);
            }
        }
    }
    let dirlight = new DirectionalLight();
    dirlight.castShadows = true;
    // dirlight.direction = new Vec3(0, -1, 1);
    app.scene.root.addChild(dirlight);

    let camera = new Camera();
    camera.setPerspective(45, app.canvas.width / app.canvas.height, 1, 1000);
    camera.setPosition(-2, 5, 10);
    camera.lookAt(new Vec3(0, 0, 0), camera.up);

    app.scene.cameras.push(camera);
    app.start();
    // console.log(gltf, data, image, Mesh);
}

main();
