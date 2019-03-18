/*
 * ProjectName: hypergl
 * FilePath: \src\utils\decorators.ts
 * Created Date: Sunday, December 16th 2018, 12:04:15 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, March 19th 2019, 12:37:16 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { timer } from '../core';
import { Constructor } from '../types';
export function cache(target: any, key: string, description: PropertyDescriptor) {
    let old = description.value;
    let t;
    // tslint:disable-next-line:only-arrow-functions
    description.value = function (arg1) {
        if (arg1 !== t || arg1 == null) {
            let res = old(arg1);
            t = arg1;
            return res;
        }
    };
}

export function once(target: any, key: string, description: PropertyDescriptor) {
    let old = description.value;
    let t;
    // tslint:disable-next-line:only-arrow-functions
    description.value = function (...args) {
        if (t) {
            return t;
        }
        let res = old.apply(this, args);
        t = res;
        return res;
    };
}

export function time(target: any, key: string, description: PropertyDescriptor) {
    let old = description.value;
    // tslint:disable-next-line:only-arrow-functions
    description.value = function (...arg1) {
        timer.start();
        old.apply(this, arg1);
        timer.end();
        console.log(timer.getDuration());
    };
}

export function enumerable(value: boolean) {
    // tslint:disable-next-line:only-arrow-functions
    return function (target: any, propertyKey: string) {
        let descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {};
        if (descriptor.enumerable !== value) {
            descriptor.enumerable = value;
            Object.defineProperty(target, propertyKey, descriptor);
        }
    };
}


export function unenumerable(arr: Array<string>) {
    // tslint:disable-next-line:only-arrow-functions
    return function fn(c: Constructor<any>) {

        if (c.prototype['*unenumerableKeys'] == null) {
            c.prototype['*unenumerableKeys'] = [];
        }

        // tslint:disable-next-line:only-arrow-functions
        Array.prototype.push.apply(c.prototype['*unenumerableKeys'], arr);
    };
}