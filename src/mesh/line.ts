/*
 * ProjectName: hypergl
 * FilePath: \src\mesh\line.ts
 * Created Date: Saturday, December 1st 2018, 8:58:52 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, December 7th 2018, 2:41:57 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Vec3 } from '../math';
import { Drawable } from './drawable';
import { DrawMode } from '../conf';
import { ColorMaterial } from '../material';
export class Line extends Drawable {
    static createLines = createLines;
    mode = DrawMode.LINES;
    // castShadow = true;
    lines = Array<Vec3>();
    width = 1;
    material = new ColorMaterial();
}

interface CreateLinesOptions {
    type?: 'LINES' | 'LINE_LOOP' | 'LINE_STRIP',
    width?: number
}

export function createLines(vertex: Array<Vec3>, opts: CreateLinesOptions = {}) {
    let line = new Line();
    let positions: number[] = [];
    let type = opts.type || 'LINES';
    let width = opts.width || 1;
    vertex.forEach(vec => {
        positions.push(vec.x, vec.y, vec.z);
    });
    let options = {
        positions,
        // normals,
        // uvs,
        // // uvs1,
        // indices
    };
    line.create(options);
    line.width = width;
    line.mode = DrawMode[type];
    line.lines = vertex;
    return line;
}