/*
 * ProjectName: hypergl
 * FilePath: \src\material\phoneMaterial.ts
 * Created Date: Thursday, September 6th 2018, 5:56:00 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, December 29th 2018, 5:46:49 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Scene } from '../scene/scene';
import { Color } from '../core/color';
import { Texture } from '../texture';
import { Material } from './material';
import { RendererPlatform } from '../graphics/renderer';
import { SEMANTIC } from '../conf';
import { event } from '../core';
import { Vec3, Vec2 } from '../math';
import { Undefinedable, Nullable } from '../types';
import { ColorMaterial } from './colorMaterial';
import { cache } from '../utils/decorators';

export class StandardMaterial extends ColorMaterial {
    get opacityMap() {
        return this._opacityMap;
    }
    set opacityMap(value) {
        this._opacityMap = value;
        this.setUniform('uOpacityTexture', this.opacityMap);
    }
    public get opacityMapOffset(): Vec2 {
        return this._opacityMapOffset;
    }
    public set opacityMapOffset(v: Vec2) {
        this._opacityMapOffset = v;
        this.setUniform('uOpacityMapOffset', this.opacityMapOffset.data);
    }

    get ambientColor() {
        return this._ambientColor;
    }
    set ambientColor(v) {
        this._ambientColor = v;
        this.setUniform('uAmbientColor', this.ambientColor.data);
    }
    get diffuseMap() {
        return this._diffuseMap;
    }
    set diffuseMap(value) {
        this._diffuseMap = value;
        this.setUniform('uDiffuseTexture', this.diffuseMap);
    }
    get diffuseMapOffset(): Vec2 {
        return this._diffuseMapOffset;
    }
    set diffuseMapOffset(v: Vec2) {
        this._diffuseMapOffset = v;
        this.setUniform('uDiffuseMapOffset', this.diffuseMapOffset.data);
    }

    get specularColor() {
        return this._specularColor;
    }
    set specularColor(value) {
        this._specularColor = value;
        this.setUniform('uSpecularColor', this.specularColor.data);
    }
    get specularMap() {
        return this._specularMap;
    }
    set specularMap(value) {
        this._specularMap = value;
        this.setUniform('uSpecularTexture', this.specularMap);
    }
    get normalTexture(): Nullable<Texture> {
        return this._normalTexture;
    }
    set normalTexture(v: Nullable<Texture>) {
        this._normalTexture = v;
        this.setUniform('uNormalTexture', this.normalTexture);
    }
    get specularMapOffset(): Vec2 {
        return this._specularMapOffset;
    }
    set specularMapOffset(v: Vec2) {
        this._specularMapOffset = v;
        this.setUniform('uSpecularMapOffset', this.specularMapOffset.data);
    }
    get shininess() {
        return this._shininess;
    }
    set shininess(value) {
        this._shininess = value;
        this.setUniform('uShininess', this.shininess);
    }
    get alphaTest() {
        return this._alphaTest;
    }
    set alphaTest(value) {
        this._alphaTest = value;
        this.setUniform('uAlphaTest', this.alphaTest);
    }
    private _opacityMap: Nullable<Texture>;
    private _opacityMapOffset = new Vec2(0, 0);

    private _normalTexture: Nullable<Texture>;

    private _specularMapOffset = new Vec2(0, 0);
    // alphaWrite = true;
    private _alphaTest = 0;
    private _diffuseMapOffset = new Vec2(0, 0);
    private _shininess = 64;
    private _specularMap: Nullable<Texture>;
    private _specularColor = new Color(1, 1, 1);
    private _diffuseMap: Nullable<Texture>;
    private _ambientColor = Scene.ambientColor;
    constructor(name?: string) {
        super(name);
        this.setUniform('uAmbientColor', this.ambientColor.data);
        this.setUniform('uSpecularColor', this.specularColor.data);
        this.setUniform('uShininess', this.shininess);
        this.setUniform('uDiffuseMapOffset', this.diffuseMapOffset.data);
        this.setUniform('uOpacityMapOffset', this.opacityMapOffset.data);
        this.setUniform('uSpecularMapOffset', this.specularMapOffset.data);
        this.setUniform('uAlphaTest', this.alphaTest);
    }
    @cache
    static defaultMaterial() {
        return new StandardMaterial('defaultMaterial');
    }
    updateShader(attributes: { [s: string]: SEMANTIC }) {
        let renderer = this.app.renderer;
        // if (this.shader == null) {
        this.shader = renderer.programGenerator.getShader('PhoneMaterial', attributes, this.uniforms, this.shaderVars);
        // }
        this.shader.uniformScope = this.uniforms;
    }
}