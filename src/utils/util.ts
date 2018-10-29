/*
 * ProjectName: hypergl
 * FilePath: \src\util.ts
 * Created Date: Tuesday, August 14th 2018, 5:01:35 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, October 29th 2018, 12:00:26 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */



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