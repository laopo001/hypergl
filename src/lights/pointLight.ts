/*
 * ProjectName: hypergl
 * FilePath: \src\lights\pointLight.ts
 * Created Date: Saturday, September 8th 2018, 3:44:39 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, September 11th 2018, 12:29:14 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Light } from './light';
export class PointLight extends Light {
    range = 10;
}