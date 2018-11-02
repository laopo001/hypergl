/*
 * ProjectName: hypergl
 * FilePath: \src\utils\gltfloader\gltf-loader.ts
 * Created Date: Friday, November 2nd 2018, 4:35:11 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, November 2nd 2018, 7:00:20 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { GltfLoader, GltfAsset } from 'gltf-loader-ts';
import { Application } from '../../application';
import { Log } from '../util';
import { Mesh } from '../../mesh';
import { StandardMaterial } from '../../material';
import { Color } from '../../core';
import { Texture } from '../../texture';

let loader = new GltfLoader();

export class GltfAssetLoader {
    assets!: Promise<GltfAsset>;

    constructor(public url: string) {
        this.assets = loader.load(this.url, (e) => {
            // console.log(e);
        });
    }

    loadSence(index: number) {
        //
    }
    async loadMesh(index: number) {
        let assets = await this.assets;
        let { gltf } = assets;
        if (gltf.meshes) {
            let model = gltf.meshes[index];
            for (let j = 0; j < model.primitives.length; j++) {
                const mesh = model.primitives[j];
                let positions = await assets.accessorData<any>(mesh.attributes.POSITION);

                let normals = await assets.accessorData<any>(mesh.attributes.NORMAL);
                let uvs = await assets.accessorData<any>(mesh.attributes.TEXCOORD_0);
                let indices;
                if (typeof mesh.indices === 'number') {
                    indices = await assets.accessorData<any>(mesh.indices);
                }
                let m = Mesh.createMesh({
                    positions, normals, uvs, indices
                });
                m.name = model.name;
                // tslint:disable-next-line:no-unused-expression
                mesh.mode && (m.mode = mesh.mode);
                m.material = await this.loadMaterial(mesh.material as any);
                return m;
            }
        } else {
            Log.error(`${this.url}的gltf没有meshs属性`);
        }

    }
    async loadMaterial(index: number) {
        let assets = await this.assets;
        let { gltf } = assets;
        let standardmaterial = new StandardMaterial();
        if (gltf.materials) {
            let material = gltf.materials[index];
            standardmaterial.name = material.name;
            if (material.pbrMetallicRoughness) {
                let colors = material.pbrMetallicRoughness.baseColorFactor;
                if (colors) {
                    standardmaterial.diffuseColor = new Color(colors[0], colors[1], colors[2]);
                }
                let texture = material.pbrMetallicRoughness.baseColorTexture;
                if (texture) {
                    let t = new Texture();
                    let img = await this.loadTexture(texture.index);
                    t.setSource(img);
                    standardmaterial.diffuseMap = t;
                }
            }
        } else {
            Log.error(`${this.url}的gltf没有materials属性`);
        }
        standardmaterial.update();
        return standardmaterial;
    }
    loadCamera(index: number) {
        //
    }
    async loadTexture(index: number) {
        let assets = await this.assets;
        return assets.imageData.get(index);
    }
}
