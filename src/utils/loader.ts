/*
 * ProjectName: hypergl
 * FilePath: \src\utils\loader.ts
 * Created Date: Monday, October 22nd 2018, 8:29:36 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, October 29th 2018, 1:55:53 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { fetch } from 'whatwg-fetch';
import { Mesh } from '../mesh/mesh';
import { CreateMeshOptions } from '../types';

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

        if (item.startsWith('v ')) {
            let arr = vec.map(x => parseFloat(x));
            // vertex.push(arr[1], arr[2], arr[3]);
            positions.push(arr[1], arr[2], arr[3]);
        }
        if (item.startsWith('vn ')) {
            let arr = vec.map(x => parseFloat(x));
            // normals.push(arr[1], arr[2], arr[3]);
            // tslint:disable-next-line:no-non-null-assertion
            normals.push(arr[1], arr[2], arr[3]);
        }
        if (item.startsWith('vt ')) {
            let arr = vec.map(x => parseFloat(x));
            // tslint:disable-next-line:no-non-null-assertion
            uvs.push(arr[1], arr[2]);
        }
        if (item.startsWith('f ')) {
            for (let i = 1; i < vec.length; i++) {
                let face = vec[i];
                let indexs = face.split('/').map(x => parseInt(x, 10));
                options.positions = options.positions.concat(positions[indexs[0] - 1]);

                if (indexs[1]) {
                    // tslint:disable-next-line:no-non-null-assertion
                    options.normals = options.normals!.concat(normals[indexs[1] - 1]);
                }
                if (indexs[2]) {
                    // tslint:disable-next-line:no-non-null-assertion
                    options.uvs = options.uvs!.concat(uvs[indexs[2] - 1]);
                }

                // (options.indices).push(indexs[0] - 1);
            }
            // (options.uvs as number[]).push(vec[1], vec[2]);
        }
    }
    if ((options.normals as number[]).length === 0 || isNaN((options.normals as number[])[0])) {
        delete options.normals;
    }
    if ((options.uvs as number[]).length === 0) {
        delete options.uvs;
    }
    if ((options.indices as number[]).length === 0) {
        delete options.indices;
    }
    console.log(options);
    return options;
}
export async function loaderObjModel<T>(url: T) {
    return fetch(url).then(res => res.text()).then(resolveObjModel);
}