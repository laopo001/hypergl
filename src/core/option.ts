/*
 * ProjectName: hypergl
 * FilePath: \src\core\option.ts
 * Created Date: Monday, February 25th 2019, 10:22:43 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, March 3rd 2019, 2:15:14 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */


declare const process;
export class Option<T> {
    private promise: Promise<T>;
    private cb!: (value: T) => void;
    constructor(private value?: T, private msg?: string) {
        this.promise = new Promise((resolve, reject) => {
            this.cb = (value) => {
                resolve(value);
            };
        });
    }

    unwrap() {
        if (this.value === undefined) {
            throw new Error(this.msg || 'unwrap失败');
        }
        return this.value;
    }
    toPromise() {
        if (process.env.NODE_ENV === 'development' && this.value === undefined) {
            console.warn('value is undefined');
        }
        return this.promise;
    }
    setValue(value: T) {
        this.value = value;
        this.cb(this.value);
    }
}
