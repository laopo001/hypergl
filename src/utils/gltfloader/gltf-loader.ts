/*
 * ProjectName: hypergl
 * FilePath: \src\utils\gltfloader\gltf-loader.ts
 * Created Date: Friday, November 2nd 2018, 4:35:11 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, November 3rd 2018, 11:28:59 pm
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
import { FILTER, WRAP } from '../../conf';

let loader = new GltfLoader();

let gltf_filter = {
    9728: FILTER.NEAREST,
    9729: FILTER.LINEAR,
    9984: FILTER.NEAREST_MIPMAP_NEAREST,
    9985: FILTER.LINEAR_MIPMAP_NEAREST,
    9986: FILTER.NEAREST_MIPMAP_LINEAR,
    9987: FILTER.LINEAR_MIPMAP_LINEAR,
};

let gltf_wrap = {
    33071: WRAP.CLAMP_TO_EDGE,
    33648: WRAP.MIRRORED_REPEAT,
    10497: WRAP.REPEAT
};

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
                    let t = await this.loadTexture(texture.index);
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
        let { gltf } = assets;
        let textureData = gltf.textures![index];
        let texture = new Texture();
        let img = await assets.imageData.get(textureData.source!);
        let samplerData = gltf.samplers![textureData.sampler!];
        texture.magFilter = gltf_filter[samplerData.magFilter!];
        texture.minFilter = gltf_filter[samplerData.minFilter!];

        texture.wrapU = gltf_wrap[samplerData.wrapT!];
        texture.wrapV = gltf_wrap[samplerData.wrapS!];
        texture.flipY = false;
        texture.setSource(img);
        return texture;
    }
    private async loadSampler(index: number) {
        let assets = await this.assets;
        let { gltf } = assets;
        return gltf.samplers![index];
    }
}
