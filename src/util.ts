/*
 * ProjectName: hypergl
 * FilePath: \src\util.ts
 * Created Date: Tuesday, August 14th 2018, 5:01:35 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 5:10:59 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */



/**
 * 日志
 */
// tslint:disable-next-line:no-namespace
export namespace Log {
    export function assert(condition: any, message: string) {
        if (condition) {
            throw new Error(message);
        }
    }
    export function warn(condition: any, message: string) {
        if (condition) {
            console.warn(message);
        }
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
