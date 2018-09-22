/*
 * ProjectName: hypergl
 * FilePath: \src\core\timer.ts
 * Created Date: Saturday, September 22nd 2018, 6:25:55 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, September 22nd 2018, 7:27:30 pm
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

export function now() {
    if (window.performance && window.performance.now) {
        return window.performance.now();
    } else {
        return Date.now();
    }
}