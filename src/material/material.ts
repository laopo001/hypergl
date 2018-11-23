/*
 * ProjectName: hypergl
 * FilePath: \src\material\material.ts
 * Created Date: Saturday, August 25th 2018, 5:01:50 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, November 24th 2018, 2:24:16 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { RendererPlatform } from '../graphics/renderer';
import { SEMANTIC, FACE } from '../conf';
import { Shader } from '../graphics/shader';
import { Mesh } from '../mesh/mesh';
import { Application } from '../application';
import { ModelComponent } from '../ecs/components/model';


export abstract class Material {
    get app() {
        return Application.getApp();
    }
    uniforms: { [s: string]: any } = {};
    shader?: Shader;
    cullFace = FACE.BACK;
    meshs: ModelComponent[] = [];
    // protected _dirtyUpdate = false;
    constructor(public name?: string) {

    }
    setUniform(name: string, data: any) {
        this.uniforms[name] = data;
    }
    getUniform(name: string) {
        return this.uniforms[name];
    }
    abstract update();
    abstract updateShader(attributes: { [s: string]: SEMANTIC });
    setLights(uniforms: any) {
        Object.assign(this.uniforms, uniforms);
    }

}
