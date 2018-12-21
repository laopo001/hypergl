/*
 * ProjectName: hypergl
 * FilePath: \plugins\pointer\index.ts
 * Created Date: Friday, December 21st 2018, 8:11:50 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, December 21st 2018, 8:17:15 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Application } from 'hypergl';
export class PointerPlugin {
    name = 'pointer';
    _isPointerLock = false;
    constructor(private app: Application) {
        document.addEventListener('pointerlockchange', e => {
            this._isPointerLock = !this._isPointerLock;
        }, false);
    }
    lock() {
        // this._isPointerLock = true;
        (this.app.renderer.canvas as any).requestPointerLock();
    }
}