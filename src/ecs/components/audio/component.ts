
import { Entity } from '../../entity';
import { Component } from '../../component';
import { Log, copy } from '../../../utils/util';
import { Mat4, Vec3 } from '../../../math';
import { ComponentSystem } from '../../system';
import { event } from '../../../core';
import { Howl, Howler } from 'howler';

export interface IHowlSoundSpriteDefinition {
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
    name = 'audio';
    instance!: Howl;
    constructor(inputs: AudioInputs, entity: Entity, system: ComponentSystem) {
        super(inputs, entity, system);
        copy(inputs, AudioData);
    }

    initialize() {
        super.initialize();
        let autoplay = this.inputs.autoplay;
        this.inputs.autoplay = false;
        const sound = new Howl(this.inputs);
        this.instance = sound;
        if (autoplay) {
            this.entity.scene.sceneEvent.on('active', () => {
                this.reStart();
            });
            this.entity.scene.sceneEvent.on('inactive', () => {
                this.pause();
            });
        }
    }
    destroy() {
        super.destroy();
        this.instance = undefined as any;
    }
    play(spriteOrId?: string | number): number {
        return this.instance.play(spriteOrId);
    }
    reStart() {
        this.instance.seek(this._seek);
        this.play();
    }
    // tslint:disable-next-line:member-ordering
    private _seek = 0;
    pause(id?: number) {
        this._seek = this.instance.seek() as number;
        this.instance.pause();
    }
    stop(id?: number) {
        return this.instance.stop();
    }
}


