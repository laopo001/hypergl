/*
 * ProjectName: hypergl
 * FilePath: \demo\plugins\stat\index.ts
 * Created Date: Wednesday, December 19th 2018, 5:46:11 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, December 19th 2018, 5:56:46 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Application } from '../../../src';
import * as Stats from './stats.js';
export class StatsPlugin {
    name = 'stats';
    constructor(private app: Application) {
        let stats = new Stats();
        stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(stats.dom);
        app.on('beforeRender', () => {
            stats.begin();
        });
        app.on('afterRender', () => {
            stats.end();
        });
    }
}