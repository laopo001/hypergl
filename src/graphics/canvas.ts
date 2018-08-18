/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\canvas.ts
 * Created Date: Saturday, August 18th 2018, 4:46:24 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 11:46:32 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { AppOption } from '../types';
export function createCanvas(option: AppOption) {
    const canvas = document.createElement('canvas');
    return canvas;
}
export function appendCanvas(canvas: HTMLCanvasElement) {
    document.body.appendChild(canvas);
}