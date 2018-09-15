/*
 * ProjectName: hypergl
 * FilePath: \src\material\material.ts
 * Created Date: Saturday, August 25th 2018, 5:01:50 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, September 15th 2018, 7:17:27 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { RendererPlatform } from '../graphics/renderer';
import { SEMANTIC } from '../conf';
import { Shader } from '../graphics/shader';
import { Light, PointLight, DirectionalLight } from '../lights';

export abstract class Material {
    parameters: { [s: string]: any } = {};
    shader?: Shader;
    protected _dirtyUpdate = false;
    setParameter(name: string, data: any) {
        this.parameters[name] = data;
    }
    getParameter(name: string) {
        return this.parameters[name];
    }
    deleteParameter() {
        // x
        delete this.parameters[name];
    }
    abstract update();
    abstract updateShader(renderer: RendererPlatform, attributes: { [s: string]: SEMANTIC });
    setDirectionalLightArr(name: string, data: DirectionalLight[]) {
        let res: string[][] = [];

        data.forEach((item, index) => {
            let obj: any = {};

            setLight(name, 'position', index, obj, this.parameters, item.getPosition().data);

            setLight(name, 'color', index, obj, this.parameters, item.color.data);

            setLight(name, 'direction', index, obj, this.parameters, item.direction.normalize().data);


            res.push(obj);
        });
        this.parameters['_' + name] = res;
        this._dirtyUpdate = true;
    }
    setPointLightArr(name: string, data: PointLight[]) {
        let res: string[][] = [];

        data.forEach((item, index) => {
            let obj: any = {};

            setLight(name, 'position', index, obj, this.parameters, item.getPosition().data);

            setLight(name, 'color', index, obj, this.parameters, item.color.data);

            setLight(name, 'range', index, obj, this.parameters, item.range);

            res.push(obj);
        });
        this.parameters['_' + name] = res;
        this._dirtyUpdate = true;
    }
}

function setLight(name: string, key: string, index, obj, parameters, value) {
    let t = name + index + '_' + key;
    obj[key] = t;
    parameters[t] = value;
}