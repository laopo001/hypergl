/*
 * ProjectName: hypergl
 * FilePath: \src\material\pbrMaterial.ts
 * Created Date: Monday, December 24th 2018, 12:49:02 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, December 24th 2018, 12:54:52 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { ColorMaterial } from './colorMaterial';
import { Vec3 } from '../math';
import { Texture } from '../texture';

export class PBRMaterial extends ColorMaterial {
    baseColor = new Vec3();

    baseColorTexture?: Texture;
    /**
    * 金属度
    * @memberof PBRMaterial
    */
    metallicFactor = 1;
    /**
     * 粗糙度
     * @memberof PBRMaterial
     */
    roughnessFactor = 1;
    metallicRoughnessTexture?: Texture;
}