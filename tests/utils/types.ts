/*
 * ProjectName: hypergl
 * FilePath: \tests\utils\types.ts
 * Created Date: Tuesday, March 5th 2019, 6:37:43 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, March 5th 2019, 10:34:29 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */


import { Serialize, SerializeDecorator } from '../../src/types/types';

@SerializeDecorator({ name: [(x) => x, (x) => x] })
class Greeter extends Serialize {
    name = 123;
    range!: string;
}

test('Serialize', () => {
    let g = new Greeter();

    expect(g.stringify()).toEqual('{"name":123}');
});


test('Deserialize', () => {
    let a: Greeter = Greeter.parse('{"name":123}', new Greeter());
    expect(a.name).toEqual(123);
});