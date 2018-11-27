/*
 * ProjectName: hypergl
 * FilePath: \src\lights\pointLight.ts
 * Created Date: Saturday, September 8th 2018, 3:44:39 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, November 28th 2018, 12:47:32 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Light } from './light';
import { Color } from '../core';
export class PointLight extends Light {
    range = 10;
    shadowMapWidth = 512;
    shadowMapHeight = 512;
}