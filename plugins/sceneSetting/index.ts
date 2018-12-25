/*
 * ProjectName: hypergl
 * FilePath: \plugins\sceneSetting\index.ts
 * Created Date: Wednesday, December 26th 2018, 12:40:22 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, December 26th 2018, 12:44:06 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Application, Plugin } from 'hypergl';
export class SceneSettingPlugin implements Plugin {
    static pname = 'sceneSetting';

    constructor(private app: Application) {

    }
}