/*
 * ProjectName: hypergl
 * FilePath: \src\core\macro_task.ts
 * Created Date: Monday, April 1st 2019, 9:42:44 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, April 1st 2019, 9:55:52 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */


export enum STATE {
    PENDING = 'PENDING',
    FULFILLED = 'FULFILLED',
    REJECTED = 'REJECTED'
}
export class MacroTask<T> implements Promise<T> {
    get [Symbol.toStringTag]() {
        return 'MacroTask Object';
    }
    state: STATE = STATE.PENDING;
    private value?: T;
    private error?: Error;
    private onfulfilledArray: Array<any> = [];
    private onrejectedArray: Array<any> = [];
    constructor(private callback: (...args) => T, time: number = 0) {
        let q = () => {
            if (this.state === STATE.FULFILLED) {
                this.onfulfilledArray.forEach(cb => {
                    cb(this.value);
                });
            } else {
                this.onrejectedArray.forEach(cb => {
                    cb(this.error);
                });
            }
        };
        setTimeout(() => {
            try {
                let v = callback();
                if (this.value instanceof MacroTask || this.value instanceof MacroTask) {
                    this.value.then(v => {
                        this.state = STATE.FULFILLED;
                        this.value = v;
                        q();
                    });
                } else {
                    this.state = STATE.FULFILLED;
                    this.value = v;
                    q();
                }

            } catch (e) {
                this.state = STATE.REJECTED;
                this.error = e;
                q();
            }

        }, time);
    }
    static run<T>(callback: (...args) => T, time: number = 0) {
        return new MacroTask(callback, time);
    }
    static resolve(value, time: number = 0) {
        return MacroTask.run(() => value, time);
    }
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2> {
        if (this.state === STATE.PENDING) {
            this.onfulfilledArray.push(onfulfilled);
            this.onrejectedArray.push(onrejected);
        } else {
            if (this.state === STATE.FULFILLED) {
                // tslint:disable-next-line:no-unused-expression
                onfulfilled && onfulfilled(this.value!);
            } else {
                // tslint:disable-next-line:no-unused-expression
                onrejected && onrejected(this.error);
            }
        }
        return this as any;
    }
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult> {
        if (this.state === STATE.PENDING) {
            this.onrejectedArray.push(onrejected);
        } else {
            // tslint:disable-next-line:no-unused-expression
            onrejected && onrejected(this.error);
        }
        return this;
    }
    finally() {
        console.log('no implement');
        return this;
    }
}