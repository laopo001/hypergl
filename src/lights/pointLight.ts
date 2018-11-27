/*
 * ProjectName: hypergl
 * FilePath: \src\lights\pointLight.ts
 * Created Date: Saturday, September 8th 2018, 3:44:39 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, November 27th 2018, 4:14:56 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Light } from './light';
import { Color } from '../core';
export class PointLight extends Light {
    range = 10;
}