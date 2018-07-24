/**
 * File: c:\Users\35327\Githubs\hypergl\src\graphics\program\scope-space.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Wednesday, July 25th 2018, 12:48:54 am
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, July 25th 2018, 12:50:42 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */


import { ScopeId } from './scope-id';
export class ScopeSpace {
    name: any;
    variables: {};
    namespaces: {};
    constructor(name) {
        // Store the name
        this.name = name;

        // Create the empty tables
        this.variables = {};
        this.namespaces = {};
    }

    resolve(name) {
        // Check if the ScopeId already exists
        if (this.variables.hasOwnProperty(name) === false) {

            // Create and add to the table
            this.variables[name] = new ScopeId(name);
        }

        // Now return the ScopeId instance
        return this.variables[name];
    }

    getSubSpace(name) {
        // Check if the nested namespace already exists
        if (this.namespaces.hasOwnProperty(name) === false) {

            // Create and add to the table
            this.namespaces[name] = new ScopeSpace(name);

            console.log(`Added ScopeSpace: ${name}`);
        }

        // Now return the ScopeNamespace instance
        return this.namespaces[name];
    }
}