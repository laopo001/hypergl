/*
 * ProjectName: hypergl
 * FilePath: \src\material\material.ts
 * Created Date: Saturday, August 25th 2018, 5:01:50 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, October 30th 2018, 3:25:08 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { RendererPlatform } from '../graphics/renderer';
import { SEMANTIC } from '../conf';
import { Shader } from '../graphics/shader';
import { Light, PointLight, DirectionalLight } from '../lights';
import { Scene } from '../scene/scene';
import { Mesh } from '../mesh/mesh';

export enum FACE {
    BACK = 'BACK',
    FRONT = 'FRONT',
    NONE = 'NONE',
}

export abstract class Material {
    uniforms: { [s: string]: any } = {};
    shader?: Shader;

    cullFace = FACE.BACK;
    meshs: Mesh[] = [];
    protected _dirtyUpdate = false;
    setUniform(name: string, data: any) {
        this.uniforms[name] = data;
    }
    getUniform(name: string) {
        return this.uniforms[name];
    }
    abstract update();
    abstract updateShader(renderer: RendererPlatform, attributes: { [s: string]: SEMANTIC });
    setLights(uniforms: any) {
        Object.assign(this.uniforms, uniforms);
        this._dirtyUpdate = true;
    }

}
