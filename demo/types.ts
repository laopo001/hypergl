/*
 * ProjectName: hypergl
 * FilePath: \demo\types.ts
 * Created Date: Friday, December 21st 2018, 9:49:00 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, January 3rd 2019, 7:46:33 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { LoadImagePlugin, GltfPlugin } from 'hypergl/plugins/load';
import { PointerPlugin } from 'hypergl/plugins/pointer';
import { CannonPhysicsPlugin } from 'hypergl/plugins/physics';
export interface AppPlugin {
    loadImage: LoadImagePlugin,
    pointer: PointerPlugin,
    gltf: GltfPlugin,
    physics: CannonPhysicsPlugin
}