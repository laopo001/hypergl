/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\script\system.ts
 * Created Date: Monday, November 19th 2018, 12:35:08 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, December 19th 2018, 12:24:17 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { ComponentSystem } from '../../system';
import { ScriptComponent } from './component';
import { Entity } from '../../entity';

export class ScriptComponentSystem extends ComponentSystem {
    name = 'script';
    componentConstructor = ScriptComponent;
    // addComponent(entity: Entity, componentData: any) {
    //     let component = super.addComponent(entity, componentData) as ScriptComponent;

    //     return component;
    // }
    // removeComponent(component: ScriptComponent) {
    //     super.removeComponent(component);
    // }
}