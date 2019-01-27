/*
 * ProjectName: hypergl
 * FilePath: \src\material\material.ts
 * Created Date: Saturday, August 25th 2018, 5:01:50 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, January 28th 2019, 1:18:09 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { RendererPlatform } from '../graphics/renderer';
import { SEMANTIC, FACE } from '../conf';
import { Shader, UniformValueType } from '../graphics/shader';
import { Mesh } from '../mesh/mesh';
import { Application } from '../application';
import { ModelComponent } from '../ecs/components/model';

let MaterialId = 0;
export abstract class Material {
    MaterialId = MaterialId++;
    get app() {
        return Application.getApp();
    }
    uniforms: { [s: string]: UniformValueType } = {};
    shaderVars: { [s: string]: any } = {};
    shader?: Shader;
    // cullFace = FACE.BACK;
    cullFace = FACE.NONE;
    // protected _dirtyUpdate = false;
    constructor(public name?: string) {
        this.app.scene.materials.push(this);
    }
    setUniform(name: string, data: UniformValueType) {
        this.uniforms[name] = data;
    }
    getUniform(name: string) {
        return this.uniforms[name];
    }
    setshaderVars(name: string, data: any) {
        this.shaderVars[name] = data;
    }
    abstract updateShader(attributes: { [s: string]: SEMANTIC });
    setLights(uniforms: any) {
        Object.assign(this.uniforms, uniforms);
    }

}
