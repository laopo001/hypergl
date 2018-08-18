/*
 * ProjectName: hypergl
 * FilePath: \src\scene.ts
 * Created Date: Saturday, August 18th 2018, 4:22:49 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 10:52:51 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { IElement } from '../core/element';
import { Application } from '../application';
import { INode } from './node';

export class Scene extends IElement {
    fog;
    baseMaterial;
    lights = [];
    cameras = [];
    root?: INode;
    constructor(private app: Application) {
        super();
    }
    renderer() {

    }
    add() {
        // TODO
    }
    get [Symbol.toStringTag]() {
        return 'Scene';
    }
}