/*
 * ProjectName: hypergl
 * FilePath: \plugins\key\key.ts
 * Created Date: Friday, January 11th 2019, 12:24:03 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, January 12th 2019, 1:18:13 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */



import { Application, Plugin } from 'hypergl';

let arr = ['w', 'a', 's', 'd'];
export class KeyPlugin implements Plugin {
    static pname = 'key';
    // [s: string] = false;
    ArrowDown = false;
    ArrowUp = false;
    ArrowRight = false;
    ArrowLeft = false;
    KeyA = false;
    KeyB = false;
    KeyC = false;
    KeyD = false;
    KeyE = false;
    KeyF = false;
    KeyG = false;
    KeyH = false;
    KeyI = false;
    KeyJ = false;
    KeyK = false;
    KeyL = false;
    KeyM = false;
    KeyN = false;
    KeyO = false;
    KeyP = false;
    KeyQ = false;
    KeyR = false;
    KeyS = false;
    KeyT = false;
    KeyU = false;
    KeyV = false;
    KeyW = false;
    KeyX = false;
    KeyY = false;
    KeyZ = false;
    private _isPressedObj = {

    };
    constructor() {
        document.addEventListener('keydown', (event) => {
            this[event.code] = true;
        }, false);
        document.addEventListener('keyup', (event) => {
            this[event.code] = false;
            this._isPressedObj[event.code] = true;
        }, false);
        // document.addEventListener('keypress', (event) => {
        //     console.log(3);
        //     // this[event.code] = false;
        // }, false);
        // onKeypress
    }
    isPressed(key: keyof KeyPlugin) {
        if (this._isPressedObj[key]) {
            this._isPressedObj[key] = false;
            return true;
        } else {
            return false;
        }
    }
}