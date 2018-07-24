/**
 * File: c:\Users\35327\Githubs\hypergl\src\graphics\program\version.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Wednesday, July 25th 2018, 12:39:30 am
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, July 25th 2018, 12:41:02 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */


export class Version {
    globalId = 0;
    revision = 0;
    equals(other: Version) {
        return this.globalId === other.globalId &&
            this.revision === other.revision;
    }

    notequals(other: Version) {
        return this.globalId !== other.globalId ||
            this.revision !== other.revision;
    }

    copy(other: Version) {
        this.globalId = other.globalId;
        this.revision = other.revision;
    }

    reset() {
        this.globalId = 0;
        this.revision = 0;
    }
}