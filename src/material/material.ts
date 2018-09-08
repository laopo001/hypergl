/*
 * ProjectName: hypergl
 * FilePath: \src\material\material.ts
 * Created Date: Saturday, August 25th 2018, 5:01:50 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, September 9th 2018, 12:32:31 am
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
    }
    setPointLightArr(name: string, data: PointLight[]) {
        // let res: string[] = [];
        // data.forEach((item, index) => {
        //     let obj: any = {};
        //     let gl_name1 = name + index + '_position';
        //     this.parameters[gl_name1] = item.getPosition();
        //     res.push(gl_name1);

        //     let gl_name2 = name + index + '_color';
        //     this.parameters[gl_name2] = item.color;
        //     res.push(gl_name2);

        //     // let gl_name3 = name + index + '_direction';
        //     // this.parameters[gl_name3] = item.direction;
        //     // res.push(gl_name3);
        // });
        // this.parameters['_' + name] = res;
    }
}

function setLight(name: string, key: string, index, obj, parameters, value) {
    let t = name + index + '_' + key;
    obj[key] = t;
    parameters[t] = value;
}