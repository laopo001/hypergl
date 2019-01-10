/*
 * ProjectName: hypergl
 * FilePath: \plugins\key\key.ts
 * Created Date: Friday, January 11th 2019, 12:24:03 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, January 11th 2019, 12:39:43 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */



import { Application, Plugin } from 'hypergl';

let arr = ['w', 'a', 's', 'd'];
export class KeyPlugin implements Plugin {
    static pname = 'key';
    [s: string]: boolean;
    'ArrowDown': boolean;
    'ArrowUp': boolean;
    'ArrowRight': boolean;
    'ArrowLeft': boolean;
    'KeyA': boolean;
    'KeyS': boolean;
    'KeyD': boolean;
    'KeyW': boolean;
    constructor() {
        document.addEventListener('keydown', (event) => {
            // console.log(event);
            this[event.code] = true;
        }, false);
        document.addEventListener('keyup', (event) => {
            this[event.code] = false;
        }, false);
    }
}