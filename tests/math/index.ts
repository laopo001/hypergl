/*
 * ProjectName: hypergl
 * FilePath: \tests\math\index.ts
 * Created Date: Monday, December 17th 2018, 5:10:52 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, December 17th 2018, 7:22:27 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Mat4, Vec3, Vec4 } from '../../src/math';

describe('math', () => {
    it('Mat3', () => {
        let m1 = new Mat4();
        let m2 = new Mat4();
        m2.setScale(0.5, 0.5, 0.5);
        let p1 = new Vec4(1, 1, 0, 1);
        let p2 = new Vec4(2, 2, 0, 1);
        expect(m1.mulVec4(p1)).toEqual(m2.mulVec4(p2));
        expect(m1.mulVec4(p2)).toEqual(m2.invert().mulVec4(p1)); // p1在乘以m2坐标系逆矩阵,得出在m2坐标系下的坐标
    });
});