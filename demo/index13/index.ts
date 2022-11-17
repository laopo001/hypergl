/*
 * ProjectName: hypergl
 * FilePath: \demo\index13\index.ts
 * Created Date: Friday, December 21st 2018, 3:12:33 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, December 21st 2018, 7:56:20 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import * as Stats from './stats.js';
const offscreen = (document.querySelector('canvas') as any).transferControlToOffscreen();
const worker = new Worker('worker.js');

let stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

worker.postMessage({ type: '', canvas: offscreen }, [offscreen]);
worker.addEventListener('message', (e) => {
    switch (e.data.type) {
        case 'beforeRender':
            stats.begin();
            break;
        case 'afterRender':
            stats.end();
            break;
        default:
            break;
    }
});