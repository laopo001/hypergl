/*
 * ProjectName: hypergl
 * FilePath: /src/types/types.ts
 * Created Date: Tuesday, March 5th 2019, 1:31:34 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, March 5th 2019, 7:04:11 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */


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


export interface Copy {
    copy(): this;
}

export interface Clone {
    clone(): this;
}

export abstract class Serialize {
    stringify(): string { return ''; }
}

export abstract class Deserialize {
    static parse(str: string): any { /**/ }
}


export function SerializeDecorator(format: { [s: string]: (any) => undefined | null | boolean | string | number }) {
    return function fn<T extends Serialize>(c: Constructor<T>) {
        c.prototype.stringify = function () {
            let that = {};
            const keys = Object.keys(this);
            keys.forEach(key => {
                if (key in format) {
                    that[key] = format[key](this[key]);
                } else {
                    that[key] = this[key];
                }
            });
            return JSON.stringify(that);
        };
    };
}

export function DeserializeDecorator(format: { [s: string]: (any) => undefined | null | boolean | string | number }) {
    return function fn<T extends Deserialize>(c: Constructor<T>) {
        (c as any).parse = function (str: string) {
            let that = JSON.parse(str);
            const keys = Object.keys(that);
            keys.forEach(key => {
                if (key in format) {
                    that[key] = format[key](that[key]);
                } else {
                    that[key] = that[key];
                }
            });
            return that;
        };
    };
}