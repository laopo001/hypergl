/*
 * ProjectName: hypergl
 * FilePath: \testsOnbrowser\entity.ts
 * Created Date: Monday, January 21st 2019, 12:13:48 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, January 21st 2019, 12:38:54 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2019 dadigua
 */

// tslint:disable-next-line:no-reference
/// <reference path="../typings/test.d.ts" />

import { assert } from 'chai';
import { Entity } from '../src/index';


describe('Application', () => {
    it('Application findByName', () => {
        let root = new Entity();
        let parent = new Entity('parent');
        root.addChild(parent);
        let find = root.findByName('parent');
        console.log(find.name);
        assert.notEqual(find, null);
    });
});

describe('Application', () => {
    it('Application findByNameAll', () => {
        let root = new Entity();
        let parent = new Entity('parent');
        root.addChild(parent);
        let child = new Entity('child');
        let child2 = new Entity('child');
        parent.addChild(child, child2);
        let find = root.findByNameAll('child');
        assert.equal(find.length, 2);
    });
});
