/*
 * ProjectName: hypergl
 * FilePath: \plugins\physics\physics.ts
 * Created Date: Monday, December 31st 2018, 9:58:03 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, January 3rd 2019, 12:48:56 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Application, Plugin } from 'hypergl';
import * as Ammo from './ammo';
// tslint:disable-next-line:one-variable-per-declaration
// declare const Ammo;
export class PhysicsPlugin implements Plugin {
    static pname = 'physics';
    constructor(private app: Application) {
        console.log(Ammo);
    }
}