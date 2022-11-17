/*
 * ProjectName: hypergl
 * FilePath: \src\core\error.ts
 * Created Date: Thursday, April 4th 2019, 10:54:11 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, April 6th 2019, 10:10:44 pm
 * Modified By:
 * -----
 * Copyright (c) 2019 dadigua
 */


export class FailError extends Error {
    constructor(msg: string) {
        super(msg);
    }
}

export class ExpectedError extends Error {
    constructor(msg: string) {
        super(msg);
    }
}

export class UnExpectedError extends Error {
    constructor(msg: string) {
        super(msg);
    }
}