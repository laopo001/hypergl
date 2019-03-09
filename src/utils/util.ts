/*
 * ProjectName: hypergl
 * FilePath: \src\util.ts
 * Created Date: Tuesday, August 14th 2018, 5:01:35 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, March 10th 2019, 1:49:02 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import 'reflect-metadata';
import { Constructor } from '../types';
import { Vec3 } from '../math';
import * as iclone from 'clone';
/**
 * 日志
 */
// tslint:disable-next-line:no-namespace
export namespace Log {
    export function assert(condition: any, message: string, log?: any) {
        if (!condition) {
            // tslint:disable-next-line:no-unused-expression
            log && console.error(log);
            throw new Error(message);
        }
    }
    export function warning(condition: any, message: string) {
        if (condition) {
            console.warn(message);
        }
    }
    export function warn(message: string) {
        console.warn(message);
    }
    export function error(message: string) {
        throw new Error(message);
    }
    export function log(message: any) {
        console.log(message);
    }
    export function debug(message: any) {
        console.debug(message);
    }
}

export function input_copy(ref = {}, source) {
    for (let k in source) {
        if (ref[k] === undefined) {
            ref[k] = source[k];
        }
    }
}

export function clone<T>(src: T): T {
    return iclone(src);
}
export function copy<T>(ref: T, src: T) {
    let that = iclone(src);
    Object.assign(ref, that);
}

export function loadImage(url: string): Promise<ImageBitmap | HTMLImageElement> {
    if (createImageBitmap) {
        return fetch(url).then(b => b.blob()).then(blob => {
            return createImageBitmap(blob);
        });
    } else {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                resolve(image);
            };
            image.onerror = (e) => {
                reject(e);
            };
            image.src = url;
            image.crossOrigin = 'anonymous';
        });
    }
}

export function to_n_decimal(n: number, d: number) {
    let res: Array<number> = [];
    while (n !== 0) {
        let t = n % d;
        res.push(t);
        // tslint:disable-next-line:no-parameter-reassignment
        n = (n - t) / d;
    }
    if (res.length === 0) {
        return [0];
    }
    return res;
}

export function n_decimal_to_10(v: Array<number>, d: number) {
    let c = v;
    let res = 0;
    c.forEach((x, index) => {
        res += x * d ** index;
    });
    return res;
}

export function arrayRemove<T>(arr: Array<T>, elm: T) {
    let i = arr.findIndex(x => x === elm);
    if (i > -1) {
        arr.splice(i, 1);
    }
}

export function saveClosure(obj: any) {
    // tslint:disable-next-line:only-arrow-functions
    return function () {
        return obj;
    };
}

export function createClosure() {
    let save;
    // tslint:disable-next-line:only-arrow-functions
    return function saveClosure(obj: any) {
        if (save === undefined) {
            save = obj;
        }
        // tslint:disable-next-line:only-arrow-functions
        return function getClosure() {
            return save;
        };
    };
}

export function validate<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
    const set = descriptor.set!;
    // tslint:disable-next-line:only-arrow-functions
    descriptor.set = function (value: T) {
        let type = Reflect.getMetadata('design:type', target, propertyKey);
        if (!(value instanceof type)) {
            throw new TypeError('Invalid type. ' + propertyKey + ' not ' + type.name);
        }
        set(value);
    };
}


function classDecorator(arr: string[]) {
    return function fn(c: Constructor<Greeter>) {
        return class extends c {
            abc = 123;
            constructor() {
                super();
                arr.forEach(key => {
                    Object.defineProperty(this, key, {
                        get: () => { return 'get'; },
                        set: () => { return 'set'; },
                    });
                });
            }
        };
    };

}
interface I {
    range: string;
}

@classDecorator(['range'])
class Greeter implements I {
    name = 123;
    range!: string;
}

// let g = new Greeter();
// console.log(g.abc);
