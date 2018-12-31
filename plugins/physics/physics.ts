/*
 * ProjectName: hypergl
 * FilePath: \plugins\physics\physics.ts
 * Created Date: Monday, December 31st 2018, 9:58:03 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, December 31st 2018, 9:59:03 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Application, Plugin } from 'hypergl';
export class PhysicsPlugin implements Plugin {
    static pname = 'physics';
    constructor(private app: Application) {

    }
}