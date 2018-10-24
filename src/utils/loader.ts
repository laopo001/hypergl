/*
 * ProjectName: hypergl
 * FilePath: \src\utils\loader.ts
 * Created Date: Monday, October 22nd 2018, 8:29:36 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, October 25th 2018, 1:33:11 am
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
    let vertex: number[] = [];
    let normals: number[] = [];
    let uvs: number[] = [];
    let arr = res.split('\n');
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        let vec = item.split(' ');
        if (item.startsWith('v ')) {
            let arr = vec.map(x => parseFloat(x));
            // vertex.push(arr[1], arr[2], arr[3]);
            options.positions.push(arr[1], arr[2], arr[3]);
        }
        if (item.startsWith('vn ')) {
            let arr = vec.map(x => parseFloat(x));
            // normals.push(arr[1], arr[2], arr[3]);
            // tslint:disable-next-line:no-non-null-assertion
            // options.normals!.push(arr[1], arr[2], arr[3]);
        }
        if (item.startsWith('vt ')) {
            let arr = vec.map(x => parseFloat(x));
            // tslint:disable-next-line:no-non-null-assertion
            options.uvs!.push(arr[1], arr[2]);
        }
        if (item.startsWith('f ')) {
            for (let i = 1; i < vec.length; i++) {
                let face = vec[i];
                let indexs = face.split('/').map(x => parseFloat(x));

                (options.indices).push(indexs[0] - 1);
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
    console.log(options);
    return options;
}
export async function loaderObjModel<T>(url: T) {
    return fetch(url).then(res => res.text()).then(resolveObjModel);
}