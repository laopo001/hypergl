/*
 * ProjectName: hypergl
 * FilePath: \src\scene\node.ts
 * Created Date: Saturday, August 18th 2018, 10:49:00 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, August 23rd 2018, 1:45:34 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


import { IElement } from '../core/element';
import { Vec3, Quat, Mat4 } from '../math';
import { Log } from '../util';

let scaleCompensatePosTransform = new Mat4();
let scaleCompensatePos = new Vec3();
let scaleCompensateRot = new Quat();
let scaleCompensateRot2 = new Quat();
let scaleCompensateScale = new Vec3();
let scaleCompensateScaleForParent = new Vec3();

export class INode extends IElement {
    // local
    localPosition = new Vec3(0, 0, 0);
    localRotation = new Quat(0, 0, 0, 1);
    localScale = new Vec3(1, 1, 1);
    localEulerAngles = new Vec3(0, 0, 0);
    localTransform = new Mat4();
    parent?: INode;
    readonly children: INode[] = [];
    // World-space
    position = new Vec3(0, 0, 0);
    rotation = new Quat(0, 0, 0, 1);
    eulerAngles = new Vec3(0, 0, 0);
    worldTransform = new Mat4();
    dirtyNormal = true;
    scaleCompensation = false;
    private _dirtyLocal = false;
    private _dirtyWorld = false;

    constructor() {
        super();
    }
    lookat(target: INode) {
        // TODO
    }
    addChild(child: INode) {
        this.children.push(child);
        child.parent = this;
    }
    // tslint:disable-next-line:member-ordering
    invParentWtm = new Mat4(); // setPosition _val
    setPosition(position: Vec3);
    setPosition(x: number, y: number, z: number);
    setPosition(x?, y?, z?) {
        let position;
        if (x instanceof Vec3) {
            position = x.clone();
        } else {
            position = new Vec3(x, y, z);
        }
        if (this.parent == null) {
            this.localPosition = position;
        } else {
            // TODO
            this.invParentWtm.copy(this.parent.getWorldTransform()).invert();
            this.invParentWtm.transformPoint(position, this.localPosition);
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
    getLocalScale() {
        return this.localScale;
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
                    let parentToUseScaleFrom: INode | undefined = parent; // current parent
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
}
