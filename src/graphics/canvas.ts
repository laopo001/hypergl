/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\canvas.ts
 * Created Date: Saturday, August 18th 2018, 4:46:24 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 5:17:15 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { CanvasOption } from '../types';
export function createCanvas(option: CanvasOption) {
    const canvas = document.createElement('canvas');
    canvas.width = option.width;
    canvas.height = option.height;
    return canvas;
}
export function appendCanvas(canvas: HTMLCanvasElement) {
    document.body.appendChild(canvas);
}