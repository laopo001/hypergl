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
        let div = document.createElement('div');
        div.style.width = '100%';
        div.style.height = '400px';
        div.style.position = 'fixed';
        div.style.bottom = 'fixed';
        div.style.overflowY = 'auto';
        document.body.appendChild(div);
        render(<App app={app} />, div);
    }
}