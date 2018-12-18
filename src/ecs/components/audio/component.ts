
import { Entity, Camera } from '../../..';
import { Component } from '../../component';
import { Log, copy } from '../../../utils/util';
import { Mat4, Vec3 } from '../../../math';
import { ComponentSystem } from '../../system';
import { event } from '../../../core';
import { Howl, Howler  } from 'howler';

interface IHowlSoundSpriteDefinition {
    [name: string]: [number, number] | [number, number, boolean]
}
export interface AudioInputs {
    src: string | string[];
    volume?: number;
    html5?: boolean;
    loop?: boolean;
    preload?: boolean;
    autoplay?: boolean;
    mute?: boolean;
    sprite?: IHowlSoundSpriteDefinition;
    rate?: number;
    pool?: number;
    format?: string[] | string;
    xhrWithCredentials?: boolean;
    onload?: () => void;
    onloaderror?: (soundId: number, error: any) => void;
    onplay?: (soundId: number) => void;
    onplayerror?: (soundId: number, error: any) => void;
    onend?: (soundId: number) => void;
    onpause?: (soundId: number) => void;
    onstop?: (soundId: number) => void;
    onmute?: (soundId: number) => void;
    onvolume?: (soundId: number) => void;
    onrate?: (soundId: number) => void;
    onseek?: (soundId: number) => void;
    onfade?: (soundId: number) => void;
}

export const AudioData: Partial<AudioInputs> = {
    autoplay: false
};

export class AudioComponent extends Component<AudioInputs> {
    name = 'camera';
    instance: Howl;
    constructor(inputs: AudioInputs, entity: Entity, system: ComponentSystem) {
        super(inputs, entity, system);
        copy(inputs, AudioData);
        const sound = new Howl(this.inputs);
        this.instance = sound;
    }

    initialize() {
        //
    }
    destroy() {
        //
    }
    play(spriteOrId?: string | number): number {
        return this.instance.play();
    }
    pause(id?: number) {
        return this.instance.pause();
    }
    stop(id?: number) {
        return this.instance.stop();
    }
}


