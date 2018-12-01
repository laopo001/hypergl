/*
 * ProjectName: hypergl
 * FilePath: \src\mesh\line.ts
 * Created Date: Saturday, December 1st 2018, 8:58:52 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, December 2nd 2018, 2:09:12 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Vec3 } from '../math';
import { Drawable } from './drawable';
import { DrawMode } from '../conf';
export class Line extends Drawable {
    static createLines = createLines;
    mode = DrawMode.LINES;
    lines = Array<[Vec3, Vec3]>();
    width = 1;
}

interface CreateLinesOptions {
    type?: 'LINES' | 'LINE_LOOP' | 'LINE_STRIP',
    width?: number
}

export function createLines(vertex: Array<[Vec3, Vec3]>, opts: CreateLinesOptions = {}) {
    let line = new Line();
    let positions: number[] = [];
    let type = opts.type || 'LINES';
    let width = opts.width || 1;
    vertex.forEach(pairs => {
        let vec1 = pairs[0];
        positions.push(vec1.x, vec1.y, vec1.z);
        let vec2 = pairs[1];
        positions.push(vec2.x, vec2.y, vec2.z);
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