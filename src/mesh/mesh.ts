/**
 * File: c:\Users\35327\Githubs\hypergl\src\mesh\mesh.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Saturday, July 28th 2018, 6:55:41 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, July 29th 2018, 8:55:50 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

/* tslint:disable */
import { BLEND, MASK, SHADERDEF, LAYER, RENDERSTYLE, SORTKEY, SHADER, BUFFER, SEMANTIC } from '../hgl';
import { BoundingBox } from '../shape/bounding-box';
import { Material } from '../materials/material';
import { Vec3 } from '../math/vec3';
import { GraphNode } from '../scene/graph-node';
import { IndexBuffer } from '../graphics/indexBuffer';
import { VertexBuffer } from '../graphics/vertexBuffer';
let id = 0;
const _tmpAabb = new BoundingBox();


export class Mesh {
    _refCount = 0;
    id;
    vertexBuffer: VertexBuffer = null;
    indexBuffer: IndexBuffer[] = [null];
    primitive = [{
        type: 0,
        base: 0,
        count: 0,
        indexed: undefined
    }];
    boneUsed: boolean[];
    skin = null;
    morph = null;
    _aabb = new BoundingBox();
    boneAabb = null;
    constructor() {

        this.id = id++;
        // AABB for object space mesh vertices
        this._aabb = new BoundingBox();

        // Array of object space AABBs of vertices affected by each bone
        this.boneAabb = null;
    }

    get aabb(): BoundingBox {
        return this.morph ? this.morph.aabb : this._aabb;
    }

    set aabb(aabb: BoundingBox) {
        if (this.morph) {
            this._aabb = this.morph._baseAabb = aabb;
            this.morph._calculateAabb();
        } else {
            this._aabb = aabb;
        }
    }
}


export class MeshInstance extends Material {
    _key = [0, 0];
    _shader = [null, null, null];

    isStatic = false;
    _staticLightList = null;
    _staticSource = null;

    node: GraphNode;           // The node that defines the transform of the mesh instance
    _mesh: Mesh;
    _shaderDefs;
    _material;
    _lightHash = 0;
    visible = true;
    _layer: any;
    renderStyle = RENDERSTYLE.SOLID;
    castShadow = false;
    _receiveShadow = true;
    _screenSpace = false;
    _noDepthDrawGl1 = false;
    cull: any = true;
    pick = true;
    _updateAabb = true;
    _updateAabbFunc = null;
    _skinInstance = null;
    morphInstance = null;
    instancingData = null;
    // World space AABB

    _boneAabb = null;
    _aabbVer = -1;
    drawOrder = 0;
    visibleThisFrame = 0;
    parameters = {};
    stencilFront = null;
    stencilBack = null;
    _aabb: BoundingBox;
    constructor(node: GraphNode, mesh: Mesh, material: Material) {
        super();
        mesh._refCount++;
        this.material = material;   // The material with which to render this instance
        this.node = node;
        this._mesh = mesh;
        this._shaderDefs = MASK.DYNAMIC << 16; // 2 byte toggles, 2 bytes light mask; Default value is no toggles and mask = pc.MASK_DYNAMIC
        this._shaderDefs |= mesh.vertexBuffer.format.hasUv0 ? SHADERDEF.UV0 : 0;
        this._shaderDefs |= mesh.vertexBuffer.format.hasUv1 ? SHADERDEF.UV1 : 0;
        this._shaderDefs |= mesh.vertexBuffer.format.hasColor ? SHADERDEF.VCOLOR : 0;
        this.layer = LAYER.WORLD; // legacy

        // 64-bit integer key that defines render order of this mesh instance
        this.updateKey();

        this.aabb = new BoundingBox();
    }

    get mesh() {
        return this._mesh;
    }

    set mesh(mesh) {
        if (this._mesh) this._mesh._refCount--;
        this._mesh = mesh;
        if (mesh) mesh._refCount++;
    }

    get aabb(): BoundingBox {
        let aabb;
        if (!this._updateAabb) return this._aabb;
        if (this._updateAabbFunc) {
            return this._updateAabbFunc(this._aabb);
        }

        if (this.skinInstance) {
            const numBones = this.mesh.skin.boneNames.length;
            let boneUsed, i;
            // Initialize local bone AABBs if needed
            if (!this.mesh.boneAabb) {

                this.mesh.boneAabb = [];
                this.mesh.boneUsed = [];
                const elems = this.mesh.vertexBuffer.format.elements;
                const numVerts = this.mesh.vertexBuffer.numVertices;
                const vertSize = this.mesh.vertexBuffer.format.size;
                let index;
                let offsetP, offsetI, offsetW;
                let j, k, l;
                for (i = 0; i < elems.length; i++) {
                    if (elems[i].semantic === SEMANTIC.POSITION) {
                        offsetP = elems[i].offset;
                    } else if (elems[i].semantic === SEMANTIC.BLENDINDICES) {
                        offsetI = elems[i].offset;
                    } else if (elems[i].semantic === SEMANTIC.BLENDWEIGHT) {
                        offsetW = elems[i].offset;
                    }
                }

                const data8 = new Uint8Array(this.mesh.vertexBuffer.storage);
                const dataF = new Float32Array(this.mesh.vertexBuffer.storage);
                const offsetPF = offsetP / 4;
                const offsetWF = offsetW / 4;
                const vertSizeF = vertSize / 4;

                let bMax, bMin;
                let x, y, z;
                const boneMin = [];
                const boneMax = [];
                boneUsed = this.mesh.boneUsed;

                for (i = 0; i < numBones; i++) {
                    boneMin[i] = new Vec3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
                    boneMax[i] = new Vec3(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
                }

                // Find bone AABBs by attached vertices
                for (j = 0; j < numVerts; j++) {
                    for (k = 0; k < 4; k++) {
                        if (dataF[j * vertSizeF + offsetWF + k] > 0) {
                            index = data8[j * vertSize + offsetI + k];
                            // Vertex j is affected by bone index
                            x = dataF[j * vertSizeF + offsetPF];
                            y = dataF[j * vertSizeF + offsetPF + 1];
                            z = dataF[j * vertSizeF + offsetPF + 2];

                            bMax = boneMax[index];
                            bMin = boneMin[index];

                            if (bMin.x > x) bMin.x = x;
                            if (bMin.y > y) bMin.y = y;
                            if (bMin.z > z) bMin.z = z;

                            if (bMax.x < x) bMax.x = x;
                            if (bMax.y < y) bMax.y = y;
                            if (bMax.z < z) bMax.z = z;

                            boneUsed[index] = true;
                        }
                    }
                }

                // Apply morphing to bone AABBs
                if (this.morphInstance) {
                    let vertIndex;
                    const targets = this.morphInstance.morph._targets;

                    // Find min/max morphed vertex positions
                    const minMorphedPos = new Float32Array(numVerts * 3);
                    const maxMorphedPos = new Float32Array(numVerts * 3);
                    let m, dx, dy, dz;
                    let target, mtIndices, mtIndicesLength, deltaPos;

                    for (j = 0; j < numVerts; j++) {
                        minMorphedPos[j * 3] = maxMorphedPos[j * 3] = dataF[j * vertSizeF + offsetPF];
                        minMorphedPos[j * 3 + 1] = maxMorphedPos[j * 3 + 1] = dataF[j * vertSizeF + offsetPF + 1];
                        minMorphedPos[j * 3 + 2] = maxMorphedPos[j * 3 + 2] = dataF[j * vertSizeF + offsetPF + 2];
                    }

                    for (l = 0; l < targets.length; l++) {
                        target = targets[l];
                        mtIndices = target.indices;
                        mtIndicesLength = mtIndices.length;
                        deltaPos = target.deltaPositions;
                        for (k = 0; k < mtIndicesLength; k++) {
                            vertIndex = mtIndices[k];

                            dx = deltaPos[k * 3];
                            dy = deltaPos[k * 3 + 1];
                            dz = deltaPos[k * 3 + 2];

                            if (dx < 0) {
                                minMorphedPos[vertIndex * 3] += dx;
                            } else {
                                maxMorphedPos[vertIndex * 3] += dx;
                            }

                            if (dy < 0) {
                                minMorphedPos[vertIndex * 3 + 1] += dy;
                            } else {
                                maxMorphedPos[vertIndex * 3 + 1] += dy;
                            }

                            if (dz < 0) {
                                minMorphedPos[vertIndex * 3 + 2] += dz;
                            } else {
                                maxMorphedPos[vertIndex * 3 + 2] += dz;
                            }
                        }
                    }

                    // Re-evaluate bone AABBs against min/max morphed positions
                    for (l = 0; l < targets.length; l++) {
                        target = targets[l];
                        mtIndices = target.indices;
                        mtIndicesLength = mtIndices.length;
                        deltaPos = target.deltaPositions;
                        for (k = 0; k < mtIndicesLength; k++) {
                            vertIndex = mtIndices[k];
                            for (m = 0; m < 4; m++) {
                                if (dataF[vertIndex * vertSizeF + offsetWF + m] > 0) {
                                    index = data8[vertIndex * vertSize + offsetI + m];
                                    // Vertex vertIndex is affected by bone index
                                    bMax = boneMax[index];
                                    bMin = boneMin[index];

                                    x = minMorphedPos[vertIndex * 3];
                                    y = minMorphedPos[vertIndex * 3 + 1];
                                    z = minMorphedPos[vertIndex * 3 + 2];
                                    if (bMin.x > x) bMin.x = x;
                                    if (bMin.y > y) bMin.y = y;
                                    if (bMin.z > z) bMin.z = z;

                                    x = maxMorphedPos[vertIndex * 3];
                                    y = maxMorphedPos[vertIndex * 3 + 1];
                                    z = maxMorphedPos[vertIndex * 3 + 2];
                                    if (bMax.x < x) bMax.x = x;
                                    if (bMax.y < y) bMax.y = y;
                                    if (bMax.z < z) bMax.z = z;
                                }
                            }
                        }
                    }
                }

                for (i = 0; i < numBones; i++) {
                    aabb = new BoundingBox();
                    aabb.setMinMax(boneMin[i], boneMax[i]);
                    this.mesh.boneAabb.push(aabb);
                }
            }

            // Initialize per-instance AABBs if needed
            if (!this._boneAabb) {
                this._boneAabb = [];
                for (i = 0; i < this.mesh.boneAabb.length; i++) {
                    this._boneAabb[i] = new BoundingBox();
                }
            }

            boneUsed = this.mesh.boneUsed;

            // Update per-instance bone AABBs
            for (i = 0; i < this.mesh.boneAabb.length; i++) {
                if (!boneUsed[i]) continue;
                this._boneAabb[i].setFromTransformedAabb(this.mesh.boneAabb[i], this.skinInstance.matrices[i]);
            }

            // Update full instance AABB
            const rootNodeTransform = this.node.getWorldTransform();
            let first = true;
            for (i = 0; i < this.mesh.boneAabb.length; i++) {
                if (!boneUsed[i]) continue;
                if (first) {
                    _tmpAabb.center.copy(this._boneAabb[i].center);
                    _tmpAabb.halfExtents.copy(this._boneAabb[i].halfExtents);
                    first = false;
                } else {
                    _tmpAabb.add(this._boneAabb[i]);
                }
            }
            this._aabb.setFromTransformedAabb(_tmpAabb, rootNodeTransform);

        } else if (this.node._aabbVer !== this._aabbVer) {
            // if there is no mesh then reset aabb
            aabb = this.mesh ? this.mesh.aabb : this._aabb;
            if (!this.mesh) {
                aabb.center.set(0, 0, 0);
                aabb.halfExtents.set(0, 0, 0);
            }

            this._aabb.setFromTransformedAabb(aabb, this.node.getWorldTransform());
            this._aabbVer = this.node._aabbVer;
        }
        return this._aabb;
    }

    set aabb(aabb) {
        this._aabb = aabb;
    }

    get material(): Material {
        return this._material;
    }

    set material(material) {
        let i;
        for (i = 0; i < this._shader.length; i++) {
            this._shader[i] = null;
        }
        // Remove the material's reference to this mesh instance
        if (this._material) {
            const meshInstances = this._material.meshInstances;
            i = meshInstances.indexOf(this);
            if (i !== -1) {
                meshInstances.splice(i, 1);
            }
        }

        const prevBlend = this._material ? (this._material.blendType !== BLEND.NONE) : false;
        const prevMat = this._material;
        this._material = material;

        if (this._material) {
            // Record that the material is referenced by this mesh instance
            this._material.meshInstances.push(this);

            this.updateKey();
        }

        if (material) {
            if ((material.blendType !== BLEND.NONE) !== prevBlend) {

                let scene = material._scene;
                if (!scene && prevMat && prevMat._scene) scene = prevMat._scene;

                if (scene) {
                    scene.layers._dirtyBlend = true;
                } else {
                    material._dirtyBlend = true;
                }
            }
        }
    }

    get layer() {
        return this._layer;
    }

    set layer(layer) {
        this._layer = layer;
        this.updateKey();
    }

    get receiveShadow(): boolean {
        return this._receiveShadow;
    }

    set receiveShadow(val) {
        this._receiveShadow = val;
        this._shaderDefs = val ? (this._shaderDefs & ~SHADERDEF.NOSHADOW) : (this._shaderDefs | SHADERDEF.NOSHADOW);
        this._shader[SHADER.FORWARD] = null;
        this._shader[SHADER.FORWARDHDR] = null;
    }

    get skinInstance() {
        return this._skinInstance;
    }

    set skinInstance(val) {
        this._skinInstance = val;
        this._shaderDefs = val ? (this._shaderDefs | SHADERDEF.SKIN) : (this._shaderDefs & ~SHADERDEF.SKIN);
        for (let i = 0; i < this._shader.length; i++) {
            this._shader[i] = null;
        }
    }

    get screenSpace() {
        return this._screenSpace;
    }

    set screenSpace(val) {
        this._screenSpace = val;
        this._shaderDefs = val ? (this._shaderDefs | SHADERDEF.SCREENSPACE) : (this._shaderDefs & ~SHADERDEF.SCREENSPACE);
        this._shader[SHADER.FORWARD] = null;
    }

    get key() {
        return this._key[SORTKEY.FORWARD];
    }

    set key(val) {
        this._key[SORTKEY.FORWARD] = val;
    }


    get mask() {
        return this._shaderDefs >> 16;
    }

    set mask(val) {
        const toggles = this._shaderDefs & 0x0000FFFF;
        this._shaderDefs = toggles | (val << 16);
        this._shader[SHADER.FORWARD] = null;
        this._shader[SHADER.FORWARDHDR] = null;
    }
    updateKey() {
        const material = this.material;
        this._key[SORTKEY.FORWARD] = getKey(this.layer,
            (material.alphaToCoverage || material.alphaTest) ? BLEND.NORMAL : material.blendType, // render alphatest/atoc after opaque
            false, material.id);
    }
    syncAabb() {
        // Deprecated
    }
}

// pc.extend(MeshInstance.prototype, {
//     syncAabb() {
//         // Deprecated
//     },

//     // updateKey() {
//     //     const material = this.material;
//     //     this._key[pc.SORTKEY_FORWARD] = getKey(this.layer,
//     //         (material.alphaToCoverage || material.alphaTest) ? pc.BLEND_NORMAL : material.blendType, // render alphatest/atoc after opaque
//     //         false, material.id);
//     // },

//     setParameter: pc.Material.prototype.setParameter,
//     setParameters: pc.Material.prototype.setParameters,
//     deleteParameter: pc.Material.prototype.deleteParameter,
//     getParameter: pc.Material.prototype.getParameter,
//     getParameters: pc.Material.prototype.getParameters,
//     clearParameters: pc.Material.prototype.clearParameters
// });

class Command {
    _key = [];
    constructor(layer, blendType, private command) {
        this._key[SORTKEY.FORWARD] = getKey(layer, blendType, true, 0);
    }

    get key() {
        return this._key[SORTKEY.FORWARD];
    }

    set key(val) {
        this._key[SORTKEY.FORWARD] = val;
    }
}

class InstancingData {
    buffer: Float32Array;
    count;
    offset = 0;
    _buffer = null;
    usage: BUFFER.DYNAMIC | BUFFER.STATIC;
    constructor(numObjects, dynamic, instanceSize) {
        // tslint:disable-next-line:no-parameter-reassignment
        instanceSize = instanceSize || 16;
        this.buffer = new Float32Array(numObjects * instanceSize);
        this.count = numObjects;
        this.usage = dynamic ? BUFFER.DYNAMIC : BUFFER.STATIC;
    }

    update() {
        if (this._buffer) {
            this._buffer.setData(this.buffer);
        }
    }
}

function getKey(layer, blendType, isCommand, materialId) {
    // Key definition:
    // Bit
    // 31      : sign bit (leave)
    // 27 - 30 : layer
    // 26      : translucency type (opaque/transparent)
    // 25      : Command bit (1: this key is for a command, 0: it's a mesh instance)
    // 0 - 24  : Material ID (if oqaque) or 0 (if transparent - will be depth)
    // tslint:disable-next-line:number-literal-format
    return ((layer & 0x0f) << 27) |
        ((blendType === BLEND.NONE ? 1 : 0) << 26) |
        ((isCommand ? 1 : 0) << 25) |
        // tslint:disable-next-line:number-literal-format
        ((materialId & 0x1ffffff) << 0);
}