/*
 * ProjectName: hypergl
 * FilePath: \src\material\phoneMaterial.ts
 * Created Date: Thursday, September 6th 2018, 5:56:00 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, December 25th 2018, 12:16:22 am
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
import { Undefinedable } from '../types';
import { ColorMaterial } from './colorMaterial';

export class StandardMaterial extends ColorMaterial {
    private _opacityMap?: Texture;
    get opacityMap(): Undefinedable<Texture> {
        return this._opacityMap;
    }
    set opacityMap(value: Undefinedable<Texture>) {
        this._opacityMap = value;
        this.setUniform('uOpacityTexture', this.opacityMap);
    }
    private _opacityMapOffset = new Vec2(0, 0);
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
    private _specularMapOffset = new Vec2(0, 0);
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
    // alphaWrite = true;
    private _alphaTest = 0;
    get alphaTest() {
        return this._alphaTest;
    }
    set alphaTest(value) {
        this._alphaTest = value;
        this.setUniform('uAlphaTest', this.alphaTest);
    }
    private _diffuseMapOffset = new Vec2(0, 0);
    private _shininess = 64;
    private _specularMap?: Texture;
    private _specularColor = new Color(1, 1, 1);
    private _diffuseMap?: Texture;
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
    updateShader(attributes: { [s: string]: SEMANTIC }) {
        let renderer = this.app.renderer;
        // if (this.shader == null) {
        this.shader = renderer.programGenerator.getShader('PhoneMaterial', attributes, this.uniforms, this.shaderVars);
        // }
        this.shader.uniformScope = this.uniforms;
    }
}