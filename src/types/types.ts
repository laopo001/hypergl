/*
 * ProjectName: hypergl
 * FilePath: /src/types/types.ts
 * Created Date: Tuesday, March 5th 2019, 1:31:34 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, March 7th 2019, 10:50:44 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */

import * as iclone from 'clone';
import * as tslib_1 from 'tslib';
export type TypeArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;

export type TypeArrayConstructor = Int8ArrayConstructor | Uint8ArrayConstructor | Int16ArrayConstructor | Uint16ArrayConstructor |
    Int32ArrayConstructor | Uint32ArrayConstructor | Float32ArrayConstructor | Float64Array;
export type Fn<T> = (...args) => T;
export type FnVoid = Fn<void>;
export type Nullable<T> = T | null | undefined;
export type Undefinedable<T> = T | undefined;
export interface Obj<T> { [s: string]: Undefinedable<T> }

export type Constructor<T> = new (...args) => T;

export interface Constructor2<T> {
    new(...args): T;
    // prototype: any;
}

export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Alias type for primitive types
 * @ignorenaming
 */
type Primitive = undefined | null | boolean | string | number | Function;

/**
 * Type modifier to make all the properties of an object Readonly
 */
export type Immutable<T> = T extends Primitive
    ? T
    : T extends Array<infer U>
    ? ReadonlyArray<U>
    : /* T extends Map<infer K, infer V> ? ReadonlyMap<K, V> : // es2015+ only */
    DeepImmutable<T>;

/**
 * Type modifier to make all the properties of an object Readonly recursively
 */
export type DeepImmutable<T> = T extends Primitive
    ? T
    : T extends Array<infer U>
    ? DeepImmutableArray<U>
    : /* T extends Map<infer K, infer V> ? DeepImmutableMap<K, V> : // es2015+ only */
    DeepImmutableObject<T>;

/** @hidden */
interface DeepImmutableArray<T> extends ReadonlyArray<DeepImmutable<T>> { }
/** @hidden */
/* interface DeepImmutableMap<K, V> extends ReadonlyMap<DeepImmutable<K>, DeepImmutable<V>> {} // es2015+ only */
/** @hidden */
type DeepImmutableObject<T> = { readonly [K in keyof T]: DeepImmutable<T[K]> };

export type ReadonlyObject<T> = { readonly [K in keyof T]: T[K] };

export function convertReadonlyObject<T>(a: T) {
    return a as ReadonlyObject<T>;
}

export function convertDeepImmutable<T>(a: T) {
    return a as DeepImmutable<T>;
}

export function convertImmutable<T>(a: T) {
    return a as Immutable<T>;
}

export interface Clone {
    clone<T>(src: T): T
}

export interface Copy {
    copy<T>(ref: T, src: T)
}

// export function clone<T>(src: T): T {
//     return iclone(src);
// }
// export function copy<T>(ref: T, src: T) {
//     let that = iclone(src);
//     Object.assign(ref, that);
// }

export interface GLTFSerialize {
    export(): string;
}

export abstract class Serialize {
    static parse<T>(str: string, src: T): T { throw new Error(); return src; }
    stringify(): string { throw new Error(); return ''; }
}

type BaseType = undefined | null | boolean | string | number;
export function SerializeDecorator(format: { [s: string]: [(any) => BaseType, (any: any) => any] }) {
    return function fn<T extends Serialize>(c: Constructor<T>) {
        c.prototype.stringify = function () {
            let that = {};
            const keys = Object.keys(this);
            keys.forEach(key => {
                if (key in format) {
                    that[key] = format[key][0](this[key]);
                } else {
                    that[key] = this[key];
                }
            });
            return JSON.stringify(that);
        };
        // tslint:disable-next-line:only-arrow-functions
        (c as any).parse = function (str: string, src: any) {
            let that = JSON.parse(str);
            const keys = Object.keys(that);
            keys.forEach(key => {
                if (key in format) {
                    that[key] = format[key][1](that[key]);
                } else {
                    that[key] = that[key];
                }
            });
            that.__proto__ = src['__proto__'];
            return that;
        };
    };
}


// @SerializeDecorator({ name: [(x) => 12, (x) => 123] })
// class Greeter extends Serialize {
//     name = 123;
//     range!: string;
// }
// let g = new Greeter();
// console.log(clone(g));

