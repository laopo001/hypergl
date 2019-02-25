/*
 * ProjectName: hypergl
 * FilePath: \src\core\option.ts
 * Created Date: Monday, February 25th 2019, 10:22:43 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, February 25th 2019, 10:41:31 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */

export class Option<T> {
    constructor(private value: T, private msg?: string) {

    }
    unwrap() {
        if (this.value === undefined) {
            throw new Error(this.msg || 'unwrap失败');
        }
        return this.value;
    }
}
