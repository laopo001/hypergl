/*
 * ProjectName: hypergl
 * FilePath: \src\material\material.ts
 * Created Date: Saturday, August 25th 2018, 5:01:50 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, October 14th 2018, 1:28:03 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { RendererPlatform } from '../graphics/renderer';
import { SEMANTIC } from '../conf';
import { Shader } from '../graphics/shader';
import { Light, PointLight, DirectionalLight } from '../lights';
import { Scene } from '../scene/scene';

export abstract class Material {
    uniforms: { [s: string]: any } = {};
    shader?: Shader;
    opacity = 1;
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
