/*
 * ProjectName: hypergl
 * FilePath: \demo\types.ts
 * Created Date: Friday, December 21st 2018, 9:49:00 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, December 21st 2018, 9:49:11 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { LoadImagePlugin } from 'hypergl/plugins/load';
import { PointerPlugin } from 'hypergl/plugins/pointer';

export interface AppPlugin {
    loadImage: LoadImagePlugin,
    pointer: PointerPlugin
}