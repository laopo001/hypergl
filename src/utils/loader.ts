/*
 * ProjectName: hypergl
 * FilePath: \src\utils\loader.ts
 * Created Date: Monday, October 22nd 2018, 8:29:36 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, October 31st 2018, 12:55:41 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { fetch } from 'whatwg-fetch';
import { Mesh } from '../mesh/mesh';
import { CreateMeshOptions } from '../types';
import { StandardMaterial, Material } from '../material';
import { Color } from '../core';
import { loadImage } from '../../demo/utils';
import { Texture } from '../texture';

function resolveObjModel(res: string) {
    let options: CreateMeshOptions = {
        positions: [],
        normals: [],
        indices: [],
        uvs: []
    };
    let positions: number[] = [];
    let normals: number[] = [];
    let uvs: number[] = [];
    let arr = res.split('\n');
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        let vec = item.split(' ');

        if (vec[0] === 'v') {
            let arr = vec.map(x => parseFloat(x));
            // vertex.push(arr[1], arr[2], arr[3]);
            positions.push(arr[1], arr[2], arr[3]);
        }
        if (vec[0] === 'vn') {
            let arr = vec.map(x => parseFloat(x));
            // normals.push(arr[1], arr[2], arr[3]);
            // tslint:disable-next-line:no-non-null-assertion
            normals.push(arr[1], arr[2], arr[3]);
        }
        if (vec[0] === 'vt') {
            let arr = vec.map(x => parseFloat(x));
            // tslint:disable-next-line:no-non-null-assertion
            uvs.push(arr[1], arr[2]);
        }
        if (vec[0] === 'f') {
            if (vec.length === 4) {
                for (let i = 1; i < vec.length; i++) {
                    let vertex = vec[i];
                    let indexs = vertex.split('/').map(x => parseInt(x, 10) - 1);

                    options.positions.push(
                        positions[(indexs[0]) * 3 + 0],
                        positions[(indexs[0]) * 3 + 1],
                        positions[(indexs[0]) * 3 + 2]
                    );

                    if (indexs[1] && indexs[1] * 3 < uvs.length) {
                        // tslint:disable-next-line:no-non-null-assertion
                        options.uvs!.push(
                            uvs[(indexs[1]) * 3 + 0],
                            uvs[(indexs[1]) * 3 + 1],
                        );
                    }
                    if (indexs[2] && indexs[2] * 3 < normals.length) {
                        // tslint:disable-next-line:no-non-null-assertion
                        options.normals!.push(
                            normals[(indexs[2]) * 3 + 0],
                            normals[(indexs[2]) * 3 + 1],
                            normals[(indexs[2]) * 3 + 2]
                        );
                    }
                }
            }
            if (vec.length === 5) {
                let order = [1, 2, 3, 3, 4, 1];
                for (let o = 0; o < order.length; o++) {
                    let index = order[o];
                    let vertex = vec[index];
                    let indexs = vertex.split('/').map(x => parseInt(x, 10) - 1);
                    options.positions.push(positions[indexs[0] * 3], positions[indexs[0] * 3 + 1], positions[indexs[0] * 3 + 2]); // expand uvs from indices
                    if (indexs[1] * 2 < uvs.length) {
                        // tslint:disable-next-line:no-non-null-assertion
                        options.uvs!.push(uvs[indexs[1] * 2], uvs[indexs[1] * 2 + 1]);
                    } // expand uvs from indices
                    if (indexs[2] * 3 < normals.length) {
                        // tslint:disable-next-line:no-non-null-assertion
                        options.normals!.push(normals[indexs[2] * 3], normals[indexs[2] * 3 + 1], normals[indexs[2] * 3 + 2]);
                    } // expand normals from indices
                }
            }
        }
    }
    if ((options.normals as number[]).length === 0 || isNaN((options.normals as number[])[0])) {
        delete options.normals;
    }
    // if ((options.uvs as number[]).length === 0) {
    //     delete options.uvs;
    // }
    if ((options.indices as number[]).length === 0) {
        delete options.indices;
    }
    console.log(options);
    return options;
}
export async function loaderObjModel<T>(url: T) {
    return fetch(url).then(res => res.text()).then(resolveObjModel);
}
async function getMap(url: string, fileName: string) {
    let arr = url.split('/');
    arr[arr.length - 1] = fileName;
    let newUrl = arr.join('/');
    // let img = await fetch(newUrl).then(res => res.blob()).then(blob => new File([blob], fileName));
    // console.log(img);
    let img = await loadImage(newUrl);
    let t = new Texture();
    t.setSource(img);
    return t;
}


async function resolveMtlModel(url: string, res: string) {
    let rows = res.split('\n');
    let m = new StandardMaterial();
    for (let i = 0; i < rows.length; i++) {
        let item = rows[i];
        let cols = item.split(' ');

        switch (cols[0].toLowerCase()) {
            case 'kd':
                // Diffuse color
                m.diffuseColor = new Color(parseFloat(cols[1]), parseFloat(cols[2]), parseFloat(cols[3]));
                break;
            case 'ks':
                // Specular color (color when light is reflected from shiny surface) using RGB values
                m.specularColor = new Color(parseFloat(cols[1]), parseFloat(cols[2]), parseFloat(cols[3]));
                break;
            case 'map_kd':
                // Diffuse texture map
                let texture = await getMap(url, cols[1]);
                m.diffuseMap = texture;
                break;
            case 'map_ks':
                // Specular map
                // setMapForType("specularMap", value);
                break;
            case 'norm':
                // setMapForType("normalMap", value);
                break;
            case 'map_bump':
            case 'bump':
                // Bump texture map
                // setMapForType("bumpMap", value);
                break;
            case 'map_d':
                // Alpha map
                // setMapForType("alphaMap", value);
                // params.transparent = true;
                break;
            case 'ns':
                // The specular exponent (defines the focus of the specular highlight)
                // A high exponent results in a tight, concentrated highlight. Ns values normally range from 0 to 1000.
                m.shininess = parseFloat(cols[1]);

                break;

            case 'd':
                let n = parseFloat(cols[1]);
                if (n < 1) {
                    m.opacity = n;
                }
                break;

            default:
                break;
        }

    }
    m.update();
    return m;
}

export async function loaderMtlModel<T= Material>(url: string): Promise<T> {
    return fetch(url).then(res => res.text()).then(resolveMtlModel.bind(window, url));
}