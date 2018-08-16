

/**
 * File: c:\Users\35327\Githubs\hypergl\src\graphics\program\scope-id.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Wednesday, July 25th 2018, 12:50:16 am
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, July 25th 2018, 12:51:34 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */


import { VersionedObject } from './versioned-object';
export class ScopeId {
    name: any;
    value: any;
    versionObject: any;
    constructor(name) {
        // Set the name
        this.name = name;

        // Set the default value
        this.value = null;

        // Create the version object
        this.versionObject = new VersionedObject();
    }

    setValue(value) {
        // Set the new value
        this.value = value;

        // Increment the revision
        this.versionObject.increment();
    }

    getValue(value) {
        return this.value;
    }
}