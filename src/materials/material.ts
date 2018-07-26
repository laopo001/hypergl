/**
 * File: c:\Users\35327\Githubs\hypergl\src\materials\material.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Friday, July 27th 2018, 12:39:09 am
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, July 27th 2018, 12:58:58 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

let id = 0;
import { BLENDMODE, BLENDEQUATION, CULLFACE, BLEND } from '../hgl';
import { Scene } from '../scene/scene';
class Material {
    id: number;
    name = 'Untitled';
    _shader = null;
    variants = {};
    parameters = {};
    alphaTest = 0;
    alphaToCoverage = false;

    blend: any = false;
    blendSrc = BLENDMODE.ONE;
    blendDst = BLENDMODE.ZERO;
    blendEquation = BLENDEQUATION.ADD;
    separateAlphaBlend = false;
    blendSrcAlpha = BLENDMODE.ONE;
    blendDstAlpha = BLENDMODE.ZERO;
    blendAlphaEquation = BLENDEQUATION.ADD;

    cull = CULLFACE.BACK;

    depthTest = true;
    depthWrite = true;
    stencilFront = null;
    stencilBack = null;

    depthBias = 0;
    slopeDepthBias = 0;

    redWrite = true;
    greenWrite = true;
    blueWrite = true;
    alphaWrite = true;

    meshInstances = []; // The mesh instances referencing this material

    _shaderVersion = 0;
    _scene = null;
    _dirtyBlend = false;
    constructor() {
        this.id = id++;
    }

    get shader() {
        return this._shader;
    }

    set shader(shader) {
        this.setShader(shader);
    }

    // tslint:disable-next-line:cyclomatic-complexity
    get blendType() {
        if ((!this.blend) &&
            (this.blendSrc === BLENDMODE.ONE) &&
            (this.blendDst === BLENDMODE.ZERO) &&
            (this.blendEquation === BLENDEQUATION.ADD)) {
            return BLEND.NONE;
        } else if ((this.blend) &&
            (this.blendSrc === BLENDMODE.SRC_ALPHA) &&
            (this.blendDst === BLENDMODE.ONE_MINUS_SRC_ALPHA) &&
            (this.blendEquation === BLENDEQUATION.ADD)) {
            return BLEND.NORMAL;
        } else if ((this.blend) &&
            (this.blendSrc === BLENDMODE.ONE) &&
            (this.blendDst === BLENDMODE.ONE) &&
            (this.blendEquation === BLENDEQUATION.ADD)) {
            return BLEND.ADDITIVE;
        } else if ((this.blend) &&
            (this.blendSrc === BLENDMODE.SRC_ALPHA) &&
            (this.blendDst === BLENDMODE.ONE) &&
            (this.blendEquation === BLENDEQUATION.ADD)) {
            return BLEND.ADDITIVEALPHA;
        } else if ((this.blend) &&
            (this.blendSrc === BLENDMODE.DST_COLOR) &&
            (this.blendDst === BLENDMODE.SRC_COLOR) &&
            (this.blendEquation === BLENDEQUATION.ADD)) {
            return BLEND.MULTIPLICATIVE2X;
        } else if ((this.blend) &&
            (this.blendSrc === BLENDMODE.ONE_MINUS_DST_COLOR) &&
            (this.blendDst === BLENDMODE.ONE) &&
            (this.blendEquation === BLENDEQUATION.ADD)) {
            return BLEND.SCREEN;
        } else if ((this.blend) &&
            (this.blendSrc === BLENDMODE.ONE) &&
            (this.blendDst === BLENDMODE.ONE) &&
            (this.blendEquation === BLENDEQUATION.MIN)) {
            return BLEND.MIN;
        } else if ((this.blend) &&
            (this.blendSrc === BLENDMODE.ONE) &&
            (this.blendDst === BLENDMODE.ONE) &&
            (this.blendEquation === BLENDEQUATION.MAX)) {
            return BLEND.MAX;
        } else if ((this.blend) &&
            (this.blendSrc === BLENDMODE.DST_COLOR) &&
            (this.blendDst === BLENDMODE.ZERO) &&
            (this.blendEquation === BLENDEQUATION.ADD)) {
            return BLEND.MULTIPLICATIVE;
        } else if ((this.blend) &&
            (this.blendSrc === BLENDMODE.ONE) &&
            (this.blendDst === BLENDMODE.ONE_MINUS_SRC_ALPHA) &&
            (this.blendEquation === BLENDEQUATION.ADD)) {
            return BLEND.PREMULTIPLIED;
        } else {
            return BLEND.NORMAL;
        }
    }

    set blendType(type) {
        const prevBlend = this.blend !== BLEND.NONE;
        switch (type) {
            case BLEND.NONE:
                this.blend = false;
                this.blendSrc = BLENDMODE.ONE;
                this.blendDst = BLENDMODE.ZERO;
                this.blendEquation = BLENDEQUATION.ADD;
                break;
            case BLEND.NORMAL:
                this.blend = true;
                this.blendSrc = BLENDMODE.SRC_ALPHA;
                this.blendDst = BLENDMODE.ONE_MINUS_SRC_ALPHA;
                this.blendEquation = BLENDEQUATION.ADD;
                break;
            case BLEND.PREMULTIPLIED:
                this.blend = true;
                this.blendSrc = BLENDMODE.ONE;
                this.blendDst = BLENDMODE.ONE_MINUS_SRC_ALPHA;
                this.blendEquation = BLENDEQUATION.ADD;
                break;
            case BLEND.ADDITIVE:
                this.blend = true;
                this.blendSrc = BLENDMODE.ONE;
                this.blendDst = BLENDMODE.ONE;
                this.blendEquation = BLENDEQUATION.ADD;
                break;
            case BLEND.ADDITIVEALPHA:
                this.blend = true;
                this.blendSrc = BLENDMODE.SRC_ALPHA;
                this.blendDst = BLENDMODE.ONE;
                this.blendEquation = BLENDEQUATION.ADD;
                break;
            case BLEND.MULTIPLICATIVE2X:
                this.blend = true;
                this.blendSrc = BLENDMODE.DST_COLOR;
                this.blendDst = BLENDMODE.SRC_COLOR;
                this.blendEquation = BLENDEQUATION.ADD;
                break;
            case BLEND.SCREEN:
                this.blend = true;
                this.blendSrc = BLENDMODE.ONE_MINUS_DST_COLOR;
                this.blendDst = BLENDMODE.ONE;
                this.blendEquation = BLENDEQUATION.ADD;
                break;
            case BLEND.MULTIPLICATIVE:
                this.blend = true;
                this.blendSrc = BLENDMODE.DST_COLOR;
                this.blendDst = BLENDMODE.ZERO;
                this.blendEquation = BLENDEQUATION.ADD;
                break;
            case BLEND.MIN:
                this.blend = true;
                this.blendSrc = BLENDMODE.ONE;
                this.blendDst = BLENDMODE.ONE;
                this.blendEquation = BLENDEQUATION.MIN;
                break;
            case BLEND.MAX:
                this.blend = true;
                this.blendSrc = BLENDMODE.ONE;
                this.blendDst = BLENDMODE.ONE;
                this.blendEquation = BLENDEQUATION.MAX;
                break;
        }
        if (prevBlend !== (this.blend !== BLEND.NONE)) {
            if (this._scene) {
                this._scene.layers._dirtyBlend = true;
            } else {
                this._dirtyBlend = true;
            }
        }
        this._updateMeshInstanceKeys();
    }

    _cloneInternal(clone) {
        clone.name = this.name;
        clone.id = id++;
        clone.variants = {}; // ?
        clone.shader = this.shader;
        clone.parameters = {};

        // and need copy parameters of that shader
        for (const parameterName in this.parameters) {
            if (this.parameters.hasOwnProperty(parameterName)) {
                clone.parameters[parameterName] = { scopeId: null, data: this.parameters[parameterName].data, passFlags: this.parameters[parameterName].passFlags };
            }
        }

        // Render states
        clone.alphaTest = this.alphaTest;
        clone.alphaToCoverage = this.alphaToCoverage;

        clone.blend = this.blend;
        clone.blendSrc = this.blendSrc;
        clone.blendDst = this.blendDst;
        clone.blendEquation = this.blendEquation;

        clone.separateAlphaBlend = this.separateAlphaBlend;
        clone.blendSrcAlpha = this.blendSrcAlpha;
        clone.blendDstAlpha = this.blendDstAlpha;
        clone.blendAlphaEquation = this.blendAlphaEquation;

        clone.cull = this.cull;

        clone.depthTest = this.depthTest;
        clone.depthWrite = this.depthWrite;
        clone.depthBias = this.depthBias;
        clone.slopeDepthBias = this.slopeDepthBias;
        if (this.stencilFront) clone.stencilFront = this.stencilFront.clone();
        if (this.stencilBack) {
            if (this.stencilFront === this.stencilBack) {
                clone.stencilBack = clone.stencilFront;
            } else {
                clone.stencilBack = this.stencilBack.clone();
            }
        }

        clone.redWrite = this.redWrite;
        clone.greenWrite = this.greenWrite;
        clone.blueWrite = this.blueWrite;
        clone.alphaWrite = this.alphaWrite;

        clone.meshInstances = [];
    }

    clone() {
        const clone = new Material();
        this._cloneInternal(clone);
        return clone;
    }

    _updateMeshInstanceKeys() {
        let i;
        const meshInstances = this.meshInstances;
        for (i = 0; i < meshInstances.length; i++) {
            meshInstances[i].updateKey();
        }
    }

    updateShader(device, scene, objDefs) {
        // For vanilla materials, the shader can only be set by the user
    }

    // Parameter management
    clearParameters() {
        this.parameters = {};
    }

    getParameters() {
        return this.parameters;
    }

    clearVariants() {
        let meshInstance;
        for (const s in this.variants) {
            if (this.variants.hasOwnProperty(s)) {
                this.variants[s]._refCount--;
            }
        }
        this.variants = {};
        let j;
        for (let i = 0; i < this.meshInstances.length; i++) {
            meshInstance = this.meshInstances[i];
            for (j = 0; j < meshInstance._shader.length; j++) {
                meshInstance._shader[j] = null;
            }
        }
    }


    getParameter(name) {
        return this.parameters[name];
    }


    setParameter(arg, data?, passFlags = -524285) {

        // if (passFlags === undefined) passFlags = -524285; // All bits set except 2 - 18 range

        let name;
        if (data === undefined && typeof (arg) === 'object') {
            const uniformObject = arg;
            if (uniformObject.length) {
                for (let i = 0; i < uniformObject.length; i++) this.setParameter(uniformObject[i]);
                return;
            } else {
                name = uniformObject.name;
                // tslint:disable-next-line:no-parameter-reassignment
                data = uniformObject.value;
            }
        } else {
            name = arg;
        }

        const param = this.parameters[name];
        if (param) {
            param.data = data;
            param.passFlags = passFlags;
        } else {
            this.parameters[name] = {
                scopeId: null,
                data,
                passFlags
            };
        }
    }


    deleteParameter(name) {
        if (this.parameters[name]) {
            delete this.parameters[name];
        }
    }


    setParameters() {
        // Push each shader parameter into scope
        // tslint:disable-next-line:forin
        for (const paramName in this.parameters) {
            const parameter = this.parameters[paramName];
            // TODO: Fix https://github.com/playcanvas/engine/issues/597
            //if (!parameter.scopeId) {
            //    parameter.scopeId = device.scope.resolve(paramName);
            //}
            parameter.scopeId.setValue(parameter.data);
        }
    }

    update() {
        throw Error('Not Implemented in base class');
    }


    init(data) {
        throw Error('Not Implemented in base class');
    }

    getName() {
        return this.name;
    }


    setName(name) {
        this.name = name;
    }


    getShader() {
        return this.shader;
    }


    setShader(shader) {
        if (this._shader) {
            this._shader._refCount--;
        }
        this._shader = shader;
        if (shader) shader._refCount++;
    }


    destroy() {
        if (this.shader) {
            this.shader._refCount--;
            if (this.shader._refCount < 1) {
                this.shader.destroy();
            }
        }

        let variant;
        for (const s in this.variants) {
            if (this.variants.hasOwnProperty(s)) {
                variant = this.variants[s];
                if (variant === this.shader) continue;
                variant._refCount--;
                if (variant._refCount < 1) {
                    variant.destroy();
                }
            }
        }
        this.variants = {};
        this.shader = null;

        // tslint:disable-next-line:one-variable-per-declaration
        let meshInstance, j;
        for (let i = 0; i < this.meshInstances.length; i++) {
            meshInstance = this.meshInstances[i];
            for (j = 0; j < meshInstance._shader.length; j++) {
                meshInstance._shader[j] = null;
            }
            meshInstance._material = null;
            if (this !== Scene.defaultMaterial) {
                meshInstance.material = Scene.defaultMaterial;
            }
        }
    }
}