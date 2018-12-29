/*
 * ProjectName: hypergl
 * FilePath: \src\material\pbrMaterial.ts
 * Created Date: Monday, December 24th 2018, 12:49:02 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, December 29th 2018, 1:14:09 pm
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
    private _baseColor = new Color(1, 1, 1);
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
    get baseColorTexture(): Nullable<Texture> {
        return this._baseColorTexture;
    }
    set baseColorTexture(value: Nullable<Texture>) {
        this._baseColorTexture = value;
        this.setUniform('uBaseColorSampler', value);
        this.setshaderVars('HAS_BASECOLORMAP', !!value);
    }
    /**
    * 金属度
    * @memberof PBRMaterial
    */
    private _metallicFactor = 1;
    get metallicFactor() {
        return this._metallicFactor;
    }
    set metallicFactor(value) {
        this._metallicFactor = value;
        this.setUniform('uMetallicRoughnessValues', new Float32Array([this.metallicFactor, this.roughnessFactor]));
    }
    /**
     * 粗糙度
     * @memberof PBRMaterial
     */
    private _roughnessFactor = 1;
    get roughnessFactor() {
        return this._roughnessFactor;
    }
    set roughnessFactor(value) {
        this._roughnessFactor = value;
        this.setUniform('uMetallicRoughnessValues', new Float32Array([this.metallicFactor, this.roughnessFactor]));
    }
    /**
     * 粗糙度纹理
     * @memberof PBRMaterial
     */
    private _metallicRoughnessTexture: Nullable<Texture>;
    get metallicRoughnessTexture(): Nullable<Texture> {
        return this._metallicRoughnessTexture;
    }
    set metallicRoughnessTexture(value: Nullable<Texture>) {
        this._metallicRoughnessTexture = value;
        this.setUniform('uMetallicRoughnessSampler', value);
        this.setshaderVars('HAS_METALROUGHNESSMAP', !!value);
    }

    private _emissiveFactor = new Color(0, 0, 0);
    public get emissiveFactor(): Color {
        return this._emissiveFactor;
    }
    public set emissiveFactor(v: Color) {
        this._emissiveFactor = v;
        this.setUniform('uEmissiveFactor', v.data3);
    }

    private _enissiveTexture: Nullable<Texture>;
    get enissiveTexture(): Nullable<Texture> {
        return this._enissiveTexture;
    }
    set enissiveTexture(v: Nullable<Texture>) {
        this._enissiveTexture = v;
        this.setUniform('uEmissiveSampler', v);
        this.setshaderVars('HAS_EMISSIVEMAP', !!v);
    }
    // tslint:disable-next-line:member-ordering
    normalScale = 1;
    private _normalTexture: Nullable<Texture>;
    get normalTexture(): Nullable<Texture> {
        return this._normalTexture;
    }
    set normalTexture(v: Nullable<Texture>) {
        this._normalTexture = v;
        this.setUniform('uNormalSampler', v);
        this.setshaderVars('HAS_NORMALMAP', !!v);
    }
    // tslint:disable-next-line:member-ordering
    occlusionStrength = 1;
    private _occlusionTexture: Nullable<Texture>;
    public get occlusionTexture(): Nullable<Texture> {
        return this._occlusionTexture;
    }
    public set occlusionTexture(v: Nullable<Texture>) {
        this._occlusionTexture = v;
        this.setUniform('uOcclusionSampler', v);
        this.setshaderVars('HAS_OCCLUSIONMAP', !!v);
    }
    constructor() {
        super();
        this.setUniform('uMetallicRoughnessValues', new Float32Array([this.metallicFactor, this.roughnessFactor]));
        this.setUniform('uScaleDiffBaseMR', new Float32Array([0, 0, 0, 0]));
        this.setUniform('uBaseColorFactor', this.baseColor.data);
        this.setUniform('uScaleFGDSpec', new Float32Array([0, 0, 0, 0]));
        this.setUniform('uScaleIBLAmbient', new Float32Array([1, 1, 0, 0]));
        this.setUniform('uEmissiveFactor', this.emissiveFactor.data3);
        this.setUniform('uNormalScale', this.normalScale);
        this.setUniform('uOcclusionStrength', this.occlusionStrength);

    }
    updateShader(attributes: { [s: string]: SEMANTIC }) {
        let renderer = this.app.renderer;
        this.shader = renderer.programGenerator.getShader('PBRMaterial', attributes, this.uniforms, this.shaderVars);
        this.shader.uniformScope = this.uniforms;
    }
}