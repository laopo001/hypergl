/*
 * ProjectName: hypergl
 * FilePath: \src\material\phoneMaterial.ts
 * Created Date: Thursday, September 6th 2018, 5:56:00 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, December 15th 2018, 11:15:23 pm
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
    get opacityMap(): Undefinedable<Texture> {
        return this._opacityMap;
    }
    set opacityMap(value: Undefinedable<Texture>) {
        this._opacityMap = value;
        this.setUniform('opacityTexture', this.opacityMap);
    }
    get ambientColor() {
        return this._ambientColor;
    }
    set ambientColor(v) {
        this._ambientColor = v;
        this.setUniform('ambientColor', this.ambientColor.data);
    }
    get diffuseMap() {
        return this._diffuseMap;
    }
    set diffuseMap(value) {
        this._diffuseMap = value;
        this.setUniform('diffuseTexture', this.diffuseMap);
    }

    private _diffuseMapOffset = new Vec2(0, 0);
    get diffuseMapOffset(): Vec2 {
        return this._diffuseMapOffset;
    }
    set diffuseMapOffset(v: Vec2) {
        this._diffuseMapOffset = v;
        this.setUniform('diffuseMapOffset', this.diffuseMapOffset.data);
    }

    get specularColor() {
        return this._specularColor;
    }
    set specularColor(value) {
        this._specularColor = value;
        this.setUniform('specularColor', this.specularColor.data);
    }
    get specularMap() {
        return this._specularMap;
    }
    set specularMap(value) {
        this._specularMap = value;
        this.setUniform('specularTexture', this.specularMap);
    }
    get shininess() {
        return this._shininess;
    }
    set shininess(value) {
        this._shininess = value;
        this.setUniform('opacity', this.opacity);
    }
    private _shininess = 64;
    private _specularMap?: Texture;
    private _specularColor = new Color(0.3, 0.3, 0.3);
    private _diffuseMap?: Texture;
    private _ambientColor = Scene.ambientColor;
    private _opacityMap?: Texture;
    constructor(name?: string) {
        super(name);
        this.setUniform('ambientColor', this.ambientColor.data);
        this.setUniform('specularColor', this.specularColor.data);
        this.setUniform('shininess', this.shininess);
        this.setUniform('diffuseMapOffset', this.diffuseMapOffset.data);
        // this.update();
    }
    // update() {
    //     if (this.ambientColor == null) return;
    //     this.setUniform('ambientColor', this.ambientColor.data);
    //     this.setUniform('diffuseColor', this.diffuseColor.data);
    //     // tslint:disable-next-line:no-unused-expression
    //     // this.diffuseMap && this.setUniform('diffuseTexture', this.diffuseMap);
    //     this.setUniform('specularColor', this.specularColor.data);
    //     // tslint:disable-next-line:no-unused-expression
    //     // this.specularMap && this.setUniform('specularTexture', this.specularMap);
    //     this.setUniform('shininess', this.shininess);
    //     this.setUniform('opacity', this.opacity);
    //     // tslint:disable-next-line:no-unused-expression
    //     // this.opacityMap && this.setUniform('opacityTexture', this.opacityMap);
    // }
    updateShader(attributes: { [s: string]: SEMANTIC }) {
        let renderer = this.app.renderer;
        // if (this.shader == null) {
        this.shader = renderer.programGenerator.getShader('PhoneMaterial', attributes, this.uniforms, this.shaderTempletes);
        // }
        this.shader.uniformScope = this.uniforms;
    }
}