/*
 * ProjectName: hypergl
 * FilePath: \src\material\phoneMaterial.ts
 * Created Date: Thursday, September 6th 2018, 5:56:00 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, November 2nd 2018, 5:41:08 pm
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
import { Undefined } from '../types';

export class StandardMaterial extends Material {
    public get opacityMap(): Undefined<Texture> {
        return this._opacityMap;
    }
    public set opacityMap(value: Undefined<Texture>) {
        if (value != null) {
            event.fire('opacityChange', this);
        }
        this._opacityMap = value;
    }
    get opacity() {
        return this._opacity;
    }
    set opacity(value) {
        if (value < 1) {
            event.fire('opacityChange', this);
        }
        this._opacity = value;
    }
    name?: string;
    ambientColor = Scene.ambientColor;
    diffuseColor = new Color(1, 1, 1);
    diffuseMap?: Texture;
    specularColor = new Color(0.3, 0.3, 0.3);
    specularMap?: Texture;
    shininess = 64;
    private _opacity = 1;
    private _opacityMap?: Texture;
    constructor() {
        super();
        this.update();
    }
    update() {
        // this.setParameter('lightPosition', new Vec3(1, 1, 1).data);
        this.setUniform('ambientColor', this.ambientColor.data);
        this.setUniform('diffuseColor', this.diffuseColor.data);
        // tslint:disable-next-line:no-unused-expression
        this.diffuseMap && this.setUniform('diffuseTexture', this.diffuseMap);
        this.setUniform('specularColor', this.specularColor.data);
        // tslint:disable-next-line:no-unused-expression
        this.specularMap && this.setUniform('specularTexture', this.specularMap);
        this.setUniform('shininess', this.shininess);
        this.setUniform('opacity', this.opacity);
        // tslint:disable-next-line:no-unused-expression
        this.opacityMap && this.setUniform('opacityTexture', this.opacityMap);
        this._dirtyUpdate = true;
    }
    updateShader(renderer: RendererPlatform, attributes: { [s: string]: SEMANTIC }) {
        if (this.shader == null) {
            this.shader = renderer.programGenerator.getShader('PhoneMaterial', attributes, this.uniforms);
        }

        if (this._dirtyUpdate) {
            // tslint:disable-next-line:forin
            for (let key in this.uniforms) {
                this.shader.setUniformValue(key, this.uniforms[key]);
            }
            this._dirtyUpdate = false;
        }
    }
}