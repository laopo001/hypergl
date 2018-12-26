/*
 * ProjectName: hypergl
 * FilePath: \src\material\pbrMaterial.ts
 * Created Date: Monday, December 24th 2018, 12:49:02 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, December 27th 2018, 12:25:28 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Material } from './material';
import { Vec3 } from '../math';
import { Texture } from '../texture';
import { Nullable } from '../types';
import { SEMANTIC } from '../conf';
import { Color } from '../core';

export class PBRMaterial extends Material {
    /**
    * 反照率 Albedo
    * @memberof PBRMaterial
    */
    private _baseColor = new Color();
    get baseColor() {
        return this._baseColor;
    }
    set baseColor(value) {
        this._baseColor = value;
        this.setUniform('uBaseColorFactor', this.baseColor.data);
    }
    /**
    * 反照率 Albedo
    * @memberof PBRMaterial
    */

    private _baseColorTexture?: Nullable<Texture>;
    public get baseColorTexture(): Nullable<Texture> {
        return this._baseColorTexture;
    }
    public set baseColorTexture(value: Nullable<Texture>) {
        this._baseColorTexture = value;
        this.setUniform('uBaseColorSampler', this.baseColorTexture);
        this.setshaderVars('uBaseColorSampler', this.metallicRoughnessTexture);
    }
    /**
    * 金属度
    * @memberof PBRMaterial
    */
    private _metallicFactor = 1;
    public get metallicFactor() {
        return this._metallicFactor;
    }
    public set metallicFactor(value) {
        this._metallicFactor = value;
        this.setUniform('uMetallicRoughnessValues', new Float32Array([this.metallicFactor, this.roughnessFactor]));
    }
    /**
     * 粗糙度
     * @memberof PBRMaterial
     */
    private _roughnessFactor = 1;
    public get roughnessFactor() {
        return this._roughnessFactor;
    }
    public set roughnessFactor(value) {
        this._roughnessFactor = value;
        this.setUniform('uMetallicRoughnessValues', new Float32Array([this.metallicFactor, this.roughnessFactor]));
    }
    /**
     * 粗糙度纹理
     * @memberof PBRMaterial
     */
    private _metallicRoughnessTexture: Nullable<Texture>;
    public get metallicRoughnessTexture(): Nullable<Texture> {
        return this._metallicRoughnessTexture;
    }
    public set metallicRoughnessTexture(value: Nullable<Texture>) {
        this._metallicRoughnessTexture = value;
        this.setUniform('uMetallicRoughnessSampler', this.metallicRoughnessTexture);
        this.setshaderVars('uMetallicRoughnessSampler', this.metallicRoughnessTexture);
    }
    constructor() {
        super();
    }
    updateShader(attributes: { [s: string]: SEMANTIC }) {
        let renderer = this.app.renderer;
        this.shader = renderer.programGenerator.getShader('PBRMaterial', attributes, this.uniforms, this.shaderVars);
        this.shader.uniformScope = this.uniforms;
    }
}