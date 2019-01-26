/*
 * ProjectName: hypergl
 * FilePath: \tests\math\quat.ts
 * Created Date: Saturday, January 26th 2019, 11:32:41 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, January 27th 2019, 1:43:45 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */


import { Mat4, Vec3, Quat } from '../../src/math';

describe('Quat', () => {
    it('transformVector', () => {
        let q = new Quat().setFromEulerAngles(0.0, 90.0, 90.0);
        // console.log(q);
        let v = new Vec3(1, 0, 0);
        let res = new Vec3();
        q.transformVector(v, res);
        // console.log(res);
        expect(res.data[0] === 0);
    });
});