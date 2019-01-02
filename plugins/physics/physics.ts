/*
 * ProjectName: hypergl
 * FilePath: \plugins\physics\physics.ts
 * Created Date: Monday, December 31st 2018, 9:58:03 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, January 2nd 2019, 10:04:14 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Application, Plugin } from 'hypergl';
// import * as ammo from './ammo';
export class PhysicsPlugin implements Plugin {
    static pname = 'physics';
    constructor(private app: Application) {
        // console.log(ammo);
    }
}