/*
 * ProjectName: hypergl
 * FilePath: \src\mesh\model.ts
 * Created Date: Monday, October 29th 2018, 11:36:38 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, March 3rd 2019, 4:15:10 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Drawable } from './drawable';
export class Model {
    name = '';
    constructor(public meshs: Drawable[]) {

    }
}