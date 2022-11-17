/*
 * ProjectName: hypergl
 * FilePath: \demo\types.ts
 * Created Date: Friday, December 21st 2018, 9:49:00 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, January 12th 2019, 11:16:02 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { GltfPlugin } from 'hypergl/plugins/load';
import { PointerPlugin } from 'hypergl/plugins/pointer';
import { AmmoPlugin } from 'hypergl/plugins/physics';
import { KeyPlugin } from 'hypergl/plugins/key';
export interface AppPlugin {
    pointer: PointerPlugin,
    gltf: GltfPlugin,
    physics: AmmoPlugin,
    key: KeyPlugin
}