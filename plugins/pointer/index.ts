/*
 * ProjectName: hypergl
 * FilePath: \plugins\pointer\index.ts
 * Created Date: Friday, December 21st 2018, 8:11:50 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, December 21st 2018, 10:08:53 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Application, Plugin } from 'hypergl';
export class PointerPlugin implements Plugin {
    get isPointerLocked() {
        return this._isPointerLock;
    }
    static pname = 'pointer';
    // name = 'pointer';
    private _isPointerLock = false;
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