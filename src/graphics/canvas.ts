/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\canvas.ts
 * Created Date: Saturday, August 18th 2018, 4:46:24 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, September 6th 2018, 6:03:01 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { AppOption } from '../types';
export function createCanvas(option: AppOption) {
    const canvas = document.createElement('canvas');
    return canvas;
}
export function appendCanvas(canvas: HTMLCanvasElement) {
    document.body.appendChild(canvas);
}