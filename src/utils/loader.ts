/*
 * ProjectName: hypergl
 * FilePath: \src\utils\loader.ts
 * Created Date: Monday, October 22nd 2018, 8:29:36 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, October 23rd 2018, 1:10:06 am
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
        indices: [],
    };
    let arr = res.split('\n');
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (item.startsWith('v')) {
            // TODO
            let vec = item.split(' ').map(x => parseFloat(x));
            options.positions.push(vec[1], vec[2], vec[3]);
        }
    }
    console.log(options);
    return res;
}
export function loaderObjModel<T>(url: T) {
    return fetch(url).then(res => res.text()).then(resolveObjModel);
}