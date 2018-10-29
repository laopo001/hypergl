/*
 * ProjectName: hypergl
 * FilePath: \src\utils\loader.ts
 * Created Date: Monday, October 22nd 2018, 8:29:36 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, October 30th 2018, 12:45:22 am
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
            if (vec.length === 4) {
                for (let i = 1; i < vec.length; i++) {
                    let face = vec[i];
                    let indexs = face.split('/').map(x => parseInt(x, 10) - 1);

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
                    let p = order[o];
                    let face = vec[p];
                    let indexs = face.split('/').map(x => parseInt(x, 10) - 1);
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