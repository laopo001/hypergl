/*
 * ProjectName: hypergl
 * FilePath: \src\utils\decorators.ts
 * Created Date: Sunday, December 16th 2018, 12:04:15 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, December 16th 2018, 12:10:17 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


export function cache(target: any, key: string, description: PropertyDescriptor) {
    let old = description.value;
    let t;
    // tslint:disable-next-line:only-arrow-functions
    description.value = function (arg1) {
        if (arg1 !== t) {
            old(arg1);
            t = arg1;
        }
    };
}