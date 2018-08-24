/*
 * ProjectName: hypergl
 * FilePath: \src\core\event.ts
 * Created Date: Wednesday, August 22nd 2018, 1:40:58 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, August 22nd 2018, 1:48:02 am
 * Modified By: dadigua
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
            const index = _callbacks[name].findIndex(x => x === callback);
            _callbacks[name].splice(index, 1);
        }
        return event;
    },
    fireOnce(name: string, ...args) {
        if (event.hasEvent(name)) {
            const waitMoves: any[] = [];
            _callbacks[name].forEach((x, index) => {
                x.apply(window, args);
                // tslint:disable-next-line:no-unused-expression
                (x as any).once && waitMoves.push(index);
            });
            let t;
            // tslint:disable-next-line:no-conditional-assignment
            while (t = waitMoves.pop()) {
                _callbacks[name].splice(t, 1);
            }
        }
        return event;
    },
    fire(name: string, ...args) {
        if (event.hasEvent(name)) {
            _callbacks[name].forEach((x, index) => {
                x.apply(window, args);
            });
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