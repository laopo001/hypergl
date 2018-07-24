/**
 * File: c:\Users\35327\Githubs\hypergl\src\graphics\program\versioned-object.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Wednesday, July 25th 2018, 12:51:01 am
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, July 25th 2018, 12:51:18 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */


import { Version } from './version';
let idCounter = 0;

export class VersionedObject {
    version: Version;
    constructor() {
        // Increment the global object ID counter
        idCounter++;

        // Create a version for this object
        this.version = new Version();

        // Set the unique object ID
        this.version.globalId = idCounter;
    }

    increment() {
        // Increment the revision number
        this.version.revision++;
    }
}