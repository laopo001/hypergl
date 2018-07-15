/**
 * File: c:\Users\35327\Githubs\hypergl\src\core\event.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Sunday, July 15th 2018, 1:43:58 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, July 15th 2018, 3:30:13 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */


const _callbacks: {
    [key: string]: Array<Function>
} = {};
export const event = {
    on(name: string, callback: any) {
        if (event.hasEvent(name)) {
            _callbacks[name].push(callback);
        } else {
            _callbacks[name] = [callback];
        }
        return event;
    },
    off(name: string, callback: any) {
        if (event.hasEvent(name)) {
            let index = _callbacks[name].findIndex(x => x === callback);
            _callbacks[name].splice(index, 1)
        }
        return event;
    },
    fire(name: string, ...args) {
        if (event.hasEvent(name)) {
            let waitMoves = [];
            _callbacks[name].forEach((x, index) => {
                x.apply(window, args);
                (x as any).once && waitMoves.push(index);
            });
            let t;
            while (t = waitMoves.pop()) {
                _callbacks[name].splice(t, 1);
            }
        }
        return event;
    },
    once(name: string, callback: any) {
        callback.once = true;
        this.on(name, callback);
        return event;
    },
    hasEvent(name: string) {
        return name in _callbacks;
    }
};