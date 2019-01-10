/*
 * ProjectName: hypergl
 * FilePath: \demo\types.ts
 * Created Date: Friday, December 21st 2018, 9:49:00 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, January 11th 2019, 12:33:59 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { GltfPlugin } from 'hypergl/plugins/load';
import { PointerPlugin } from 'hypergl/plugins/pointer';
import { CannonPhysicsPlugin } from 'hypergl/plugins/physics';
import { KeyPlugin } from 'hypergl/plugins/key';
export interface AppPlugin {
    pointer: PointerPlugin,
    gltf: GltfPlugin,
    physics: CannonPhysicsPlugin,
    key: KeyPlugin
}