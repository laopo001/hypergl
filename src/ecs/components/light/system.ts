/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\light\system.ts
 * Created Date: Wednesday, November 14th 2018, 11:56:27 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, November 14th 2018, 11:58:24 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { ComponentSystem } from '../../system';
import { LightComponent } from './component';

export class LightComponentSystem extends ComponentSystem {
    componentConstructor = LightComponent;
    name = 'light';
    components: LightComponent[] = [];
    addLight(camera) {
        this.components.push(camera);
    }

    removeLight(camera) {
        let index = this.components.indexOf(camera);
        if (index >= 0) {
            this.components.splice(index, 1);
        }
    }
}
