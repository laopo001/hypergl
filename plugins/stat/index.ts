/*
 * ProjectName: hypergl
 * FilePath: \demo\plugins\stat\index.ts
 * Created Date: Wednesday, December 19th 2018, 5:46:11 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, December 21st 2018, 10:06:04 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Application, Plugin } from 'hypergl';
import * as Stats from './stats.js';
export class StatsPlugin implements Plugin {
    static pname = 'stats';
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