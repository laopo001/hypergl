/*
 * ProjectName: hypergl
 * FilePath: \src\scene\node.ts
 * Created Date: Saturday, August 18th 2018, 10:49:00 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, October 10th 2018, 10:07:38 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { IElement } from '../core/element';
import { Vec3, Quat, Mat4, Vec2 } from '../math';
import { Log } from '../util';
import { Scene } from './scene';

let scaleCompensatePosTransform = new Mat4();
let scaleCompensatePos = new Vec3();
let scaleCompensateRot = new Quat();
let scaleCompensateRot2 = new Quat();
let scaleCompensateScale = new Vec3();
let scaleCompensateScaleForParent = new Vec3();

export class SceneNode extends IElement {
    // local
    localPosition = new Vec3(0, 0, 0);
    localRotation = new Quat(0, 0, 0, 1);
    localScale = new Vec3(1, 1, 1);
    localEulerAngles = new Vec3(0, 0, 0);
    localTransform = new Mat4();
    parent?: SceneNode;
    readonly children: SceneNode[] = [];
    scene!: Scene;
    // World-space
    position = new Vec3(0, 0, 0);
    rotation = new Quat(0, 0, 0, 1);
    eulerAngles = new Vec3(0, 0, 0);
    worldTransform = new Mat4();
    dirtyNormal = true;
    scaleCompensation = false;
    private _dirtyLocal = false;
    private _dirtyWorld = false;
    private _up = new Vec3();

    constructor() {
        super();
    }
    lookAt(target: Vec3, up: Vec3);
    lookAt(target: SceneNode);
    lookAt(target?, up?) {
        if (target instanceof SceneNode) {
            let targetLocation = target.getPosition();
            let up = target.up;
            let mat4 = new Mat4().setLookAt(this.getPosition(), targetLocation, up);
            let quat = new Quat().setFromMat4(mat4);
            this.setRotation(quat);
        } else {
            let mat4 = new Mat4().setLookAt(this.getPosition(), target, up);
            let quat = new Quat().setFromMat4(mat4);
            this.setRotation(quat);
        }
    }
    addChild(child: SceneNode) {
        this.children.push(child);
        child.parent = this;
        child.scene = this.scene;
        this.scene.add(child);
    }
    setPosition(x: Vec3);
    setPosition(x: number, y: number, z: number);
    setPosition(x?, y?, z?) {
        let position = new Vec3();
        if (x instanceof Vec3) {
            position.copy(x);
        } else {
            position.set(x, y, z);
        }
        if (this.parent == null) {
            this.localPosition = position;
        } else {
            let invParentWtm = new Mat4().copy(this.parent.getWorldTransform()).invert();
            invParentWtm.transformPoint(position, this.localPosition);
        }
        if (!this._dirtyLocal) {
            this._dirtify(true);
        }
    }
    /**
     * 获取世界坐标
     * @returns
     * @memberof INode
     */
    getPosition() {
        this.getWorldTransform().getTranslation(this.position);
        return this.position;
    }
    setLocalEulerAngles(x: Vec3);
    setLocalEulerAngles(x: number, y: number, z: number);
    setLocalEulerAngles(x?, y?, z?) {
        if (x instanceof Vec3) {
            this.localRotation.setFromEulerAngles(x.data[0], x.data[1], x.data[2]);
        } else {
            this.localRotation.setFromEulerAngles(x, y, z);
        }
        if (!this._dirtyLocal) {
            this._dirtify(true);
        }
    }
    getLocalEulerAngles() {
        this.localRotation.getEulerAngles(this.localEulerAngles);
        return this.localEulerAngles;
    }
    setEulerAngles(x: Vec3);
    setEulerAngles(x: number, y: number, z: number);
    setEulerAngles(x?, y?, z?) {
        if (x instanceof Vec3) {
            this.localRotation.setFromEulerAngles(x.data[0], x.data[1], x.data[2]);
        } else {
            this.localRotation.setFromEulerAngles(x, y, z);
        }
        if (this.parent != null) {
            let parentRot = this.parent.getRotation();
            let invParentRot = new Quat().copy(parentRot).invert();
            this.localRotation.mul2(invParentRot, this.localRotation);
        }

        if (!this._dirtyLocal) {
            this._dirtify(true);
        }

    }
    getEulerAngles() {
        this.getWorldTransform().getEulerAngles(this.eulerAngles);
        return this.eulerAngles;
    }
    setLocalPosition(x: Vec3);
    setLocalPosition(x: number, y: number, z: number);
    setLocalPosition(x?, y?, z?) {
        if (x instanceof Vec3) {
            this.localPosition.copy(x);
        } else {
            this.localPosition.set(x, y, z);
        }
        // this.localPosition.copy(vec3);
        if (!this._dirtyLocal) {
            this._dirtify(true);
        }
    }
    getLocalPosition() {
        return this.localPosition;
    }


    setRotation(x: Quat);
    setRotation(x: number, y: number, z: number, w: number);
    setRotation(x?, y?, z?, w?) {
        let rotation: Quat;
        if (x instanceof Quat) {
            rotation = x;
        } else {
            rotation = new Quat(x, y, z, w);
        }
        if (this.parent == null) {
            this.localRotation.copy(rotation);
        } else {
            let parentRot = this.parent.getRotation();
            let invParentRot = new Quat().copy(parentRot).invert();
            this.localRotation.copy(invParentRot).mul(rotation);
        }

        if (!this._dirtyLocal) {
            this._dirtify(true);
        }
    }
    getRotation() {
        this.rotation.setFromMat4(this.getWorldTransform());
        return this.rotation;
    }
    getWorldTransform() {
        if (!this._dirtyLocal && !this._dirtyWorld) {
            return this.worldTransform;
        }
        if (this.parent) {
            this.parent.getWorldTransform();
        }
        this._sync();
        return this.worldTransform;
    }
    setLocalScale(x: Vec3);
    setLocalScale(x: number, y: number, z: number);
    setLocalScale(x?, y?, z?) {
        if (x instanceof Vec3) {
            this.localScale.copy(x);
        } else {
            this.localScale.set(x, y, z);
        }
        if (!this._dirtyLocal) {
            this._dirtify(true);
        }
    }
    getLocalScale() {
        return this.localScale;
    }
    rotate(x: Vec3);
    rotate(x: number, y: number, z: number);
    rotate(x?, y?, z?) {
        let quaternion = new Quat();
        let invParentRot = new Quat();
        if (x instanceof Vec3) {
            quaternion.setFromEulerAngles(x.data[0], x.data[1], x.data[2]);
        } else {
            quaternion.setFromEulerAngles(x, y, z);
        }

        if (this.parent == null) {
            this.localRotation.mul2(quaternion, this.localRotation);
        } else {
            let rot = this.getRotation();
            let parentRot = this.parent.getRotation();

            invParentRot.copy(parentRot).invert();
            quaternion.mul2(invParentRot, quaternion);
            this.localRotation.mul2(quaternion, rot);
        }

        if (!this._dirtyLocal) {
            this._dirtify(true);
        }
    }
    rotateLocal(x: Vec3);
    rotateLocal(x: number, y: number, z: number);
    rotateLocal(x?, y?, z?) {
        let quaternion = new Quat();
        if (x instanceof Vec3) {
            quaternion.setFromEulerAngles(x.data[0], x.data[1], x.data[2]);
        } else {
            quaternion.setFromEulerAngles(x, y, z);
        }

        this.localRotation.mul(quaternion);

        if (!this._dirtyLocal) {
            this._dirtify(true);
        }
    }
    translateLocal(x: Vec3);
    translateLocal(x: number, y: number, z: number);
    translateLocal(x?, y?, z?) {
        let translation: Vec3;
        if (x instanceof Vec3) {
            translation = x.clone();
        } else {
            translation = new Vec3(x, y, z);
        }
        this.localRotation.transformVector(translation, translation);
        this.localPosition.add(translation);

        if (!this._dirtyLocal) {
            this._dirtify(true);
        }
    }
    // 更新此节点及其所有后代的世界转换矩阵。
    syncHierarchy() {
        if (!this.enable) {
            return;
        }
        if (this._dirtyLocal || this._dirtyWorld) {
            this._sync();
        }
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].syncHierarchy();
        }
    }
    private _sync() {
        if (this._dirtyLocal) {
            this.localTransform.setTRS(this.localPosition, this.localRotation, this.localScale);
            this._dirtyLocal = false;
        }
        if (this._dirtyWorld) {
            if (this.parent == null) {

                this.worldTransform.copy(this.localTransform);
            } else {
                if (this.scaleCompensation) {
                    let parentWorldScale!: Vec3;
                    let parent = this.parent;

                    // Find a parent of the first uncompensated node up in the hierarchy and use its scale * localScale
                    let scale = this.localScale;
                    let parentToUseScaleFrom: SceneNode | undefined = parent; // current parent
                    if (parentToUseScaleFrom) {
                        while (parentToUseScaleFrom && parentToUseScaleFrom.scaleCompensation) {
                            parentToUseScaleFrom = parentToUseScaleFrom.parent;
                        }
                        // topmost node with scale compensation
                        if (parentToUseScaleFrom) {
                            parentToUseScaleFrom = parentToUseScaleFrom.parent;
                        } // node without scale compensation
                        if (parentToUseScaleFrom) {
                            parentWorldScale = parentToUseScaleFrom.worldTransform.getScale();
                            scaleCompensateScale.mul2(parentWorldScale, this.localScale);
                            scale = scaleCompensateScale;
                        }
                    }


                    // Rotation is as usual
                    scaleCompensateRot2.setFromMat4(parent.worldTransform);
                    scaleCompensateRot.mul2(scaleCompensateRot2, this.localRotation);

                    // Find matrix to transform position
                    let tmatrix = parent.worldTransform;
                    if (parent.scaleCompensation) {
                        Log.assert(parentWorldScale, 'parentWorldScale 不能是null');
                        scaleCompensateScaleForParent.mul2(parentWorldScale, parent.getLocalScale());
                        scaleCompensatePosTransform.setTRS(parent.worldTransform.getTranslation(scaleCompensatePos),
                            scaleCompensateRot2,
                            scaleCompensateScaleForParent);
                        tmatrix = scaleCompensatePosTransform;
                    }
                    tmatrix.transformPoint(this.localPosition, scaleCompensatePos);

                    this.worldTransform.setTRS(scaleCompensatePos, scaleCompensateRot, scale);

                } else {
                    this.worldTransform.mul2(this.parent.worldTransform, this.localTransform);
                }
            }

            this._dirtyWorld = false;
        }
    }

    get root() {
        let parent = this.parent;
        if (!parent) {
            return this;
        }
        while (parent.parent) {
            parent = parent.parent;
        }
        return parent;
    }
    /**
     * 标记自己和儿子“脏” 需要重新获取位置
     *
     * @private
     * @param {boolean} [local]
     * @returns
     * @memberof INode
     */
    private _dirtify(local?: boolean) {
        if ((!local || (local && this._dirtyLocal)) && this._dirtyWorld) {
            return;
        }
        if (local) {
            this._dirtyLocal = true;
        }
        if (!this._dirtyWorld) {
            this._dirtyWorld = true;

            let i = this.children.length;
            while (i--) {
                if (this.children[i]._dirtyWorld) {
                    continue;
                }
                this.children[i]._dirtify();
            }
        }
        this.dirtyNormal = true;
        // this._aabbVer++;
        // TODO
    }
    get up() {
        return this.getWorldTransform().getY(this._up).normalize();
    }

}
