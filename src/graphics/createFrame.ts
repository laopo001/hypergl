/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\createFrame.ts
 * Created Date: Saturday, September 15th 2018, 1:31:26 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, December 29th 2018, 3:01:23 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { RendererPlatform } from './renderer';
import { Log } from '../utils/util';
import { Scene } from '../scene/scene';
import { Texture, CubeTexture } from '../texture';
import { WRAP } from '../conf';
export class Frame {
    framebuffer!: WebGLFramebuffer;
    framebuffers: WebGLFramebuffer[] = [];
    renderBuffers: WebGLRenderbuffer[] = [];
    texture!: WebGLTexture;
    textureCube!: WebGLTexture;
    renderer: RendererPlatform;
    renderBuffer!: WebGLRenderbuffer;

    // depthBuffer!: WebGLRenderbuffer;
    constructor(private scene: Scene, private width = scene.app.canvas.width, private height = scene.app.canvas.height, public is3d = false) {
        this.renderer = scene.app.renderer;
    }
    getTexture() {
        if (this.is3d) {
            return new CubeTexture(this.textureCube);
        } else {
            return new Texture(this.texture);
        }

    }
    createFramebuffer() {
        let { width, height } = this;
        if (this.is3d) {
            const gl = this.renderer.gl;
            // this.createFramebuffer3D();
            this.textureCube = gl.createTexture() as WebGLTexture;
            if (!this.textureCube) {
                Log.error('Failed to create texture object');
            }
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.textureCube); // Bind the object to target
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            for (let face = 0; face < 6; face++) {
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + face, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            }
        } else {
            this.createFramebuffer2D();
        }


    }
    createFramebuffer2D() {
        const gl = this.renderer.gl;
        let { width, height } = this;
        // gl.TEXTURE_CUBE_MAP;/////
        this.framebuffer = gl.createFramebuffer() as WebGLFramebuffer;
        if (!this.framebuffer) {
            Log.error('Failed to create frame buffer object');
        }
        this.texture = gl.createTexture() as WebGLTexture;
        if (!this.texture) {
            Log.error('Failed to create texture object');
        }
        gl.bindTexture(gl.TEXTURE_2D, this.texture); // Bind the object to target
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        const depthBuffer = gl.createRenderbuffer() as WebGLRenderbuffer;
        if (!depthBuffer) {
            Log.error('Failed to create renderbuffer object');
        }
        gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer); // Bind the object to target
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);

        // Attach the texture and the renderbuffer object to the FBO
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);

        // Check if FBO is configured correctly
        let e = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        if (gl.FRAMEBUFFER_COMPLETE !== e) {
            Log.error('Frame buffer object is incomplete: ' + e.toString());
        }

        // Unbind the buffer object
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    }
    createFramebuffer3D(face = 0) {
        const gl = this.renderer.gl;
        let { width, height } = this;
        let framebuffer = this.framebuffers[face];
        if (!framebuffer) {
            this.framebuffers[face] = gl.createFramebuffer() as WebGLFramebuffer;
            framebuffer = this.framebuffers[face];
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_CUBE_MAP_POSITIVE_X + face, this.textureCube, 0);
            let renderBuffer = gl.createRenderbuffer() as WebGLRenderbuffer;
            gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderBuffer);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        }
    }
    // tslint:disable-next-line:member-ordering
    private _backViewport?: number[];
    // tslint:disable-next-line:member-ordering
    private _backScissor?: number[];
    beforeDraw(index = 0) {
        let { width, height } = this;
        const gl = this.renderer.gl;
        if (this.is3d) {
            let framebuffer = this.framebuffers[index];
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        } else {
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        }
        this._backViewport = this.renderer.gerViewport();
        this._backScissor = this.renderer.getScissor();
        gl.viewport(0, 0, width, height);
        gl.scissor(0, 0, width, height);
        // this.renderer.setScissor(0, 0, width, height);
        gl.clearColor(1, 1, 1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    afterDraw() {
        const gl = this.renderer.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);        // Change the drawing destination to color buffer
        let [x, y, w, h] = this._backViewport;
        gl.viewport(x, y, w, h);
        [x, y, w, h] = this._backScissor;
        gl.scissor(x, y, w, h);
    }
    render() {
        this.beforeDraw();
        this.scene.render();
        this.afterDraw();
    }
}