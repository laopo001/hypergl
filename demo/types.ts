/*
 * ProjectName: hypergl
 * FilePath: \demo\types.ts
 * Created Date: Friday, December 21st 2018, 9:49:00 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, January 9th 2019, 3:22:44 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { GltfPlugin } from 'hypergl/plugins/load';
import { PointerPlugin } from 'hypergl/plugins/pointer';
import { CannonPhysicsPlugin } from 'hypergl/plugins/physics';
export interface AppPlugin {
    pointer: PointerPlugin,
    gltf: GltfPlugin,
    physics: CannonPhysicsPlugin
}