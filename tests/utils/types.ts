/*
 * ProjectName: hypergl
 * FilePath: \tests\utils\types.ts
 * Created Date: Tuesday, March 5th 2019, 6:37:43 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, March 5th 2019, 7:07:05 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */


import { Serialize, SerializeDecorator, Deserialize, DeserializeDecorator } from '../../src/types/types';

@SerializeDecorator({ name: (x) => 123 })
class Greeter extends Serialize {
    name = 123;
    range!: string;
}

test('SerializeDecorator', () => {
    let g = new Greeter();

    expect(g.stringify()).toEqual('{"name":123}');
});

@DeserializeDecorator({ name: (x) => 123 })
class Greeter2 extends Deserialize {
    name = 123;
    range!: string;
}

test('DeserializeDecorator', () => {
    let g = new Greeter();
    let a: Greeter2 = Greeter2.parse(g.stringify());
    expect(g.stringify()).toEqual('{"name":123}');
});