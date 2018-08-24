/*
 * ProjectName: hypergl
 * FilePath: \src\scene.ts
 * Created Date: Saturday, August 18th 2018, 4:22:49 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 25th 2018, 1:22:48 am
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
    root: INode = new INode();
    constructor(private app: Application) {
        super();
    }
    renderer() {
        this.root.syncHierarchy();
    }
    add() {
        // TODO
    }
    get [Symbol.toStringTag]() {
        return 'Scene';
    }
}