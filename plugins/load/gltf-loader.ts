/*
 * ProjectName: hypergl
 * FilePath: \src\utils\gltfloader\gltf-loader.ts
 * Created Date: Friday, November 2nd 2018, 4:35:11 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, February 16th 2019, 8:09:15 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { GltfLoader, GltfAsset } from './gltf-loader-ts/source';
import { Application, Plugin, Mesh, PBRMaterial, StandardMaterial, Color, Texture, FILTER, WRAP, Entity, Mat4, Quat, RAD_TO_DEG, Scene } from 'hypergl';

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
    async loadSence(index = 0) {
        let assets = await this.assets;
        let scene = new Scene();
        let root = await this.loadSenceRoot(index);
        scene.root.addChild(root);
        return scene;
    }

    async loadSenceRoot(index?: number) {
        let assets = await this.assets;
        let { gltf } = assets;
        if (!index) {
            // tslint:disable-next-line:no-parameter-reassignment
            index = gltf.scene;
        }
        // Log.assert(gltf.scene != null, `${this.url}的gltf没有meshs属性`);
        let sceneData = gltf.scenes![index!];
        if (sceneData == null) {
            throw new Error(`${this.url}的gltf没有找到该索引的scene`);
        }
        let entity = new Entity();
        for (let i = 0; i < sceneData.nodes!.length; i++) {
            const nodeIndex = sceneData.nodes![i];
            let entityChild = await this.resolveSenceNode(nodeIndex);
            entity.addChild(entityChild);
        }
        return entity;
    }
    async resolveSenceNode(index: number) {
        let assets = await this.assets;
        let { gltf } = assets;
        let nodeData = gltf.nodes![index];
        let entity = new Entity(nodeData.name);
        if (typeof nodeData.mesh === 'number') {
            let mesh = await this.loadMesh(nodeData.mesh);
            entity.addComponent('model', {
                type: 'model',
                model: mesh
            });
            // entity.mesh = mesh;
        }
        if (typeof nodeData.camera === 'number') {
            let camera = await this.loadCamera(nodeData.camera);
            entity.addComponent('camera', camera as any);
        }
        if (nodeData.translation) {
            let [x, y, z] = nodeData.translation;
            entity.setLocalPosition(x, y, z);
        }
        if (nodeData.scale) {
            let [x, y, z] = nodeData.scale;
            entity.setLocalScale(x, y, z);
        }
        if (nodeData.rotation) {
            let [x, y, z, w] = nodeData.rotation;
            entity.setRotation(x, y, z, w);
        }

        if (nodeData.matrix) {
            let mat = new Mat4();
            let quat = new Quat();
            mat.set(nodeData.matrix as any);
            quat.setFromMat4(mat);

            entity.setLocalScale(mat.getScale());
            entity.setRotation(quat);
            entity.setLocalPosition(mat.getTranslation());
        }
        if (nodeData.children) {
            for (let i = 0; i < nodeData.children.length; i++) {
                const index = nodeData.children[i];
                let entityChild = await this.resolveSenceNode(index);
                entity.addChild(entityChild);
            }
        }
        return entity;
    }
    async loadMesh(index: number) {
        let assets = await this.assets;
        let { gltf } = assets;
        if (!gltf.meshes) {
            throw new Error(`${this.url}的gltf没有meshs属性`);
        }
        let model = gltf.meshes[index];
        for (let j = 0; j < model.primitives.length; j++) {
            const mesh = model.primitives[j];
            let positions = await assets.accessorData<any>(mesh.attributes.POSITION);

            let normals = await assets.accessorData<any>(mesh.attributes.NORMAL);
            let uvs;
            if (typeof mesh.attributes.TEXCOORD_0 === 'number') {
                uvs = await assets.accessorData<any>(mesh.attributes.TEXCOORD_0);
            }
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
            m.material = await this.loadMaterial(mesh.material!);
            return m;
        }


    }
    async loadMaterial(index: number) {
        let assets = await this.assets;
        let { gltf } = assets;
        let standardmaterial = new PBRMaterial();
        if (!gltf.materials) {
            // Log.error(`${this.url}的gltf没有materials属性`);
            throw new Error(`${this.url}的gltf没有materials属性`);
        }
        let material = gltf.materials[index];
        standardmaterial.name = material.name;
        if (material.pbrMetallicRoughness) {
            let baseColorFactor = material.pbrMetallicRoughness.baseColorFactor;
            if (baseColorFactor) {
                standardmaterial.baseColor = new Color(baseColorFactor[0], baseColorFactor[1], baseColorFactor[2]);
            }
            let baseColorTexture = material.pbrMetallicRoughness.baseColorTexture;
            if (baseColorTexture) {
                let t = await this.loadTexture(baseColorTexture.index);
                standardmaterial.baseColorTexture = t;
            }
            let metallicRoughnessTexture = material.pbrMetallicRoughness.metallicRoughnessTexture;
            if (metallicRoughnessTexture) {
                let t = await this.loadTexture(metallicRoughnessTexture.index);
                standardmaterial.metallicRoughnessTexture = t;
            }
            if (material.emissiveFactor) {
                standardmaterial.emissiveFactor = new Color(material.emissiveFactor[0], material.emissiveFactor[1], material.emissiveFactor[2]);
            }
            if (material.emissiveTexture) {
                let t = await this.loadTexture(material.emissiveTexture.index);
                standardmaterial.enissiveTexture = t;
            }
            if (material.normalTexture) {
                let t = await this.loadTexture(material.normalTexture.index);
                standardmaterial.normalTexture = t;
            }
            if (material.occlusionTexture) {
                let t = await this.loadTexture(material.occlusionTexture.index);
                standardmaterial.occlusionTexture = t;
            }
        }

        return standardmaterial;
    }
    async loadCamera(index: number) {
        let assets = await this.assets;
        let { gltf } = assets;
        if (!gltf.cameras) {
            throw new Error(`${this.url}的gltf没有cameras属性`);
        }
        let cameraData = gltf.cameras[index];
        switch (cameraData.type) {
            case 'perspective':
                {
                    let { aspectRatio, zfar, znear, yfov } = cameraData.perspective!;
                    return {
                        type: 'perspective',
                        perspective: {
                            fov: yfov * RAD_TO_DEG,
                            aspectRatio,
                            near: znear,
                            far: zfar
                        }
                    };
                }
            case 'orthographic':
                {
                    let { xmag, ymag, zfar, znear } = cameraData.orthographic!;
                    return {
                        type: 'orthographic',
                        orthographic: {
                            left: -xmag,
                            right: xmag,
                            bottom: -ymag,
                            top: ymag,
                            near: znear,
                            far: zfar,
                        }
                    };
                }
        }
    }
    async loadTexture(index: number) {
        let assets = await this.assets;
        let { gltf } = assets;
        let textureData = gltf.textures![index];
        let texture = new Texture();
        let img = await this.loadImage(textureData.source!);
        texture['name'] = gltf.images![textureData.source!].uri;
        let samplerData = gltf.samplers![textureData.sampler!];
        // tslint:disable-next-line:no-unused-expression
        samplerData.magFilter && (texture.magFilter = gltf_filter[samplerData.magFilter]);
        // tslint:disable-next-line:no-unused-expression
        samplerData.minFilter && (texture.minFilter = gltf_filter[samplerData.minFilter]);
        // tslint:disable-next-line:no-unused-expression
        samplerData.wrapT && (texture.wrapU = gltf_wrap[samplerData.wrapT]);
        // tslint:disable-next-line:no-unused-expression
        samplerData.wrapS && (texture.wrapV = gltf_wrap[samplerData.wrapS]);
        texture.flipY = false;
        texture.setSource(img);
        return texture;
    }
    async loadImage(index: number) {
        let assets = await this.assets;
        // tslint:disable-next-line:no-return-await
        return assets.imageData.get(index);
    }
    private async loadSampler(index: number) {
        let assets = await this.assets;
        let { gltf } = assets;
        return gltf.samplers![index];
    }
}


export class GltfPlugin implements Plugin {
    static pname = 'gltf';
    // name = 'pointer';
    constructor(private app: Application) {

    }
    createLoader(url: string) {
        return new GltfAssetLoader(url);
    }
}