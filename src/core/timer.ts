/*
 * ProjectName: hypergl
 * FilePath: \src\core\timer.ts
 * Created Date: Saturday, September 22nd 2018, 6:25:55 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, September 22nd 2018, 6:32:31 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


export class Timer {
    startTime!: number;
    endTime!: number;
}

export function now() {
    if (window.performance && window.performance.now) {
        return window.performance.now();
    } else {
        return Date.now();
    }
}