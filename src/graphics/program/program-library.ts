/**
 * File: c:\Users\35327\Githubs\hypergl\src\graphics\program\program-library.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Thursday, July 26th 2018, 12:28:45 am
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, July 27th 2018, 12:05:58 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

import { Shader } from './shader';
import { ShaderGenerate } from './basic';
import { GraphicsDevice } from '../device';
import { generators } from './shader-help';


export class ProgramLibrary {
    _cache = {};
    _generators: {
        [x: string]: ShaderGenerate
    } = {};
    _isClearingCache = false;
    private _device: GraphicsDevice;
    constructor(device: GraphicsDevice) {
        this._device = device;
    }

    register(name: string, generator: ShaderGenerate) {
        if (!this.isRegistered(name)) {
            this._generators[name] = generator;
        }
    }

    unregister(name: string) {
        if (this.isRegistered(name)) {
            delete this._generators[name];
        }
    }

    isRegistered(name: string) {
        const generator = this._generators[name];
        return (generator !== undefined);
    }

    getProgram(name: string, options): Shader {
        const generator = this._generators[name];
        if (generator === undefined) {
            console.error(`No program library functions registered for: ${name}`);
            return null;
        }
        const gd = this._device;
        const key = generator.generateKey(gd, options); // TODO: gd is never used in generateKey(), remove?
        let shader = this._cache[key];
        if (!shader) {
            const shaderDefinition = generator.createShaderDefinition(gd, options);
            shader = this._cache[key] = new Shader(gd, shaderDefinition);
        }
        return shader;
    }

    clearCache() {
        const cache = this._cache;
        this._isClearingCache = true;
        for (const key in cache) {
            if (cache.hasOwnProperty(key)) {
                cache[key].destroy();
            }
        }
        this._cache = {};
        this._isClearingCache = false;
    }

    removeFromCache(shader: Shader) {
        if (this._isClearingCache) return; // don't delete by one when clearing whole cache
        const cache = this._cache;
        for (const key in cache) {
            if (cache.hasOwnProperty(key)) {
                if (cache[key] === shader) {
                    delete cache[key];
                    break;
                }
            }
        }
    }
}