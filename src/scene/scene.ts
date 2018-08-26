/*
 * ProjectName: hypergl
 * FilePath: \src\scene.ts
 * Created Date: Saturday, August 18th 2018, 4:22:49 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, August 26th 2018, 10:45:00 pm
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
    render() {
        this.root.syncHierarchy();
    }
    get [Symbol.toStringTag]() {
        return 'Scene';
    }
}