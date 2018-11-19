/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\script\system.ts
 * Created Date: Monday, November 19th 2018, 12:35:08 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, November 19th 2018, 1:25:15 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { ComponentSystem } from '../../system';
import { ScriptComponent } from './component';

export class ScriptComponentSystem extends ComponentSystem {
    name = 'script';
    componentConstructor = ScriptComponent;

}