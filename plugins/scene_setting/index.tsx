/*
 * ProjectName: hypergl
 * FilePath: \plugins\sceneSetting\index.ts
 * Created Date: Wednesday, December 26th 2018, 12:40:22 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, March 8th 2019, 10:15:49 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Application, Plugin } from 'hypergl';
import React, { Component } from 'react';
import 'antd/dist/antd.less';
import { render } from 'react-dom';
import { App } from './app';

export class SceneSettingPlugin implements Plugin {
    static pname = 'sceneSetting';

    constructor(private app: Application) {

        // tslint:disable-next-line:only-arrow-functions
        document.oncontextmenu = function (e) { return false; };
        // tslint:disable-next-line:only-arrow-functions
        document.oncontextmenu = function (e) { return false; };

        let div = document.createElement('div');
        div.style.width = '200px';
        div.style.height = '100%';
        div.style.background = 'rgba(202, 199, 166, 0.4)';
        div.style.position = 'fixed';
        div.style.right = '0px';
        div.style.top = '0px';
        div.style.overflow = 'auto';
        document.body.appendChild(div);
        render(<App app={app} />, div);
    }
}