/*
 * ProjectName: hypergl
 * FilePath: \src\core\timer.ts
 * Created Date: Saturday, September 22nd 2018, 6:25:55 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, December 28th 2018, 9:38:52 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


export class Timer {
    startTime!: number;
    isRuning = false;
    endTime!: number;
    start() {
        this.startTime = now();
        this.isRuning = true;
    }
    end() {
        this.endTime = now();
        this.isRuning = false;
    }
    getDuration() {
        return this.endTime - this.startTime;
    }
}

export const timer = new Timer();

export function now() {
    if (typeof performance !== 'undefined' && performance.now) {
        return performance.now();
    } else {
        return Date.now();
    }
}