/*
 * ProjectName: hypergl
 * FilePath: \demo\gltfloader.ts
 * Created Date: Tuesday, October 30th 2018, 5:41:56 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, October 31st 2018, 4:15:11 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Mesh, Application, Entity, BasicMaterial } from '../src';
import { GltfLoader } from 'gltf-loader-ts';
import { Color } from '../src/core';
import { GlTf } from '../node_modules/gltf-loader-ts/lib/gltf';

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
    let uri = './assets/models/Duck.gltf';
    let asset = await loader.load(uri, (e) => {
        console.log(e);
    });
    let gltf = asset.gltf;
    // let data = await asset.accessorData(0); // fetches BoxTextured0.bin
    // let image = await asset.imageData.get(0); // fetches CesiumLogoFlat.png
    if (gltf.meshes) {
        for (let i = 0; i < gltf.meshes.length; i++) {
            let model = gltf.meshes[i];
            for (let j = 0; j < model.primitives.length; j++) {
                const mesh = model.primitives[j];
                let positions = await asset.accessorData(mesh.attributes.POSITION).then(to.bind(null, gltf, mesh.attributes.POSITION)) as any;
                console.log(asset, positions.byteLength);
                // let normals = await asset.accessorData(mesh.attributes.NORMAL).then(to.bind(null, gltf, mesh.attributes.POSITION)) as any;
                // let uvs = await asset.accessorData(mesh.attributes.TEXCOORD_0).then(to.bind(null, gltf, mesh.attributes.POSITION)) as any;
                // let indices;
                // if (typeof mesh.indices === 'number') {
                //     indices = await asset.accessorData(mesh.indices).then(to.bind(null, gltf, mesh.attributes.POSITION));
                // }
                // let m = Mesh.createMesh(app.rendererPlatform, {
                //     positions, normals, uvs, indices
                // });
                // let e = new Entity();
                // e.mesh = m;
                // (e.mesh.material as BasicMaterial).color = new Color(1, 0, 0);
                // app.scene.root.addChild(e);
                // console.warn(positions, normals, uvs, indices);
            }
        }
    }

    // app.start();
    // console.log(gltf, data, image, Mesh);
}

main();
