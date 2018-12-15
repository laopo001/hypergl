/*
 * ProjectName: hypergl
 * FilePath: \src\material\phoneMaterial.ts
 * Created Date: Thursday, September 6th 2018, 5:56:00 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, December 15th 2018, 6:49:05 pm
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
import { Vec3 } from '../math';
import { Undefinedable } from '../types';
import { ColorMaterial } from './colorMaterial';

export class StandardMaterial extends ColorMaterial {
    public get opacityMap(): Undefinedable<Texture> {
        return this._opacityMap;
    }
    public set opacityMap(value: Undefinedable<Texture>) {
        this._opacityMap = value;
        this.setUniform('opacityTexture', this.opacityMap);
    }
    public get ambientColor() {
        return this._ambientColor;
    }
    public set ambientColor(v) {
        this._ambientColor = v;
        this.setUniform('ambientColor', this.ambientColor.data);
    }
    public get diffuseMap() {
        return this._diffuseMap;
    }
    public set diffuseMap(value) {
        this._diffuseMap = value;
        this.setUniform('diffuseTexture', this.diffuseMap);
    }
    public get specularColor() {
        return this._specularColor;
    }
    public set specularColor(value) {
        this._specularColor = value;
        this.setUniform('specularColor', this.specularColor.data);
    }
    public get specularMap() {
        return this._specularMap;
    }
    public set specularMap(value) {
        this._specularMap = value;
        this.setUniform('specularTexture', this.specularMap);
    }
    public get shininess() {
        return this._shininess;
    }
    public set shininess(value) {
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
        this.shader = renderer.programGenerator.getShader('PhoneMaterial', attributes, this.uniforms);
        // }
        this.shader.uniformScope = this.uniforms;
    }
}