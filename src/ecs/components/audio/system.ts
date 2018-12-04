/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\components\audio\system.ts
 * Created Date: Tuesday, December 4th 2018, 3:13:46 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, December 4th 2018, 5:27:05 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */



import { ComponentSystem } from '../../system';
import { AudioComponent } from './component';

export class AudioComponentSystem extends ComponentSystem {
    componentConstructor = AudioComponent;
    name = 'audio';
}