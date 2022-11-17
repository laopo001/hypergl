/**
 * File: /Users/ldh/Projects/tank-game/src/utils/assets.ts
 * Project: /Users/ldh/Projects/tank-game
 * Created Date: Wednesday, March 13th 2019, 8:44:16 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, March 13th 2019, 9:19:08 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2019 liaodh
 */

export class AssetsLoader {
    obj = {};
    static async loadAssets(obj: { [s: string]: Promise<any> }) {
        let arr: Array<Promise<any>> = [];
        let map = {} as any;
        let i = 0;
        // tslint:disable-next-line:forin
        for (let x in obj) {
            arr.push(obj[x]);
            map[i++] = x;
        }
        let x = await Promise.all(arr);
        let loader = new AssetsLoader();
        x.forEach((x, i) => {
            loader.set(map[i], x);
        });
        return loader;
    }
    get<T= any>(name: string): T {
        return this.obj[name];
    }
    private set(name: string, p: any) {
        this.obj[name] = p;
    }
}

export async function loadAssets(obj: { [s: string]: Promise<any> }) {
    let arr: Array<Promise<any>> = [];
    let map = {} as any;
    let i = 0;
    // tslint:disable-next-line:forin
    for (let x in obj) {
        arr.push(obj[x]);
        map[x] = i++;
    }
    let x = await Promise.all(arr);

}