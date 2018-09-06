/*
 * ProjectName: hypergl
 * FilePath: \src\material\material.ts
 * Created Date: Saturday, August 25th 2018, 5:01:50 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, September 6th 2018, 6:03:02 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


export class Material {
    parameters: { [s: string]: any } = {};
    setParameter(name: string, data: any) {
        this.parameters[name] = data;
    }
    getParameter(name: string) {
        return this.parameters[name];
    }
    deleteParameter() {
        // x
        delete this.parameters[name];
    }
}