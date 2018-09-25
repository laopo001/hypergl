/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\createFrame.ts
 * Created Date: Saturday, September 15th 2018, 1:31:26 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, September 19th 2018, 9:49:45 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

let OFFSCREEN_WIDTH = 1024;
let OFFSCREEN_HEIGHT = 1024;

import { RendererPlatform } from './renderer';
import { Log } from '../util';
import { Scene } from '../scene/scene';
import { Texture } from '../texture';
export class Frame {
    framebuffer!: WebGLFramebuffer;
    texture!: WebGLTexture;
    textureCube!: any;
    renderer: RendererPlatform;
    // depthBuffer!: WebGLRenderbuffer;
    constructor(private scene: Scene, public is3d = false) {
        this.renderer = scene.app.rendererPlatform;
    }
    getTexture() {
        return new Texture(this.texture);
    }
    createFramebuffer() {
        if (this.is3d) {
            this.createFramebuffer3D();
        } else {
            this.createFramebuffer2D();
        }


    }
    createFramebuffer2D() {
        const gl = this.renderer.gl;
        this.framebuffer = gl.createFramebuffer() as WebGLFramebuffer;
        if (!this.framebuffer) {
            Log.error('Failed to create frame buffer object');
        }
        this.texture = gl.createTexture() as WebGLTexture;
        if (!this.texture) {
            Log.error('Failed to create texture object');
        }
        gl.bindTexture(gl.TEXTURE_2D, this.texture); // Bind the object to target
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        const depthBuffer = gl.createRenderbuffer() as WebGLRenderbuffer;
        if (!depthBuffer) {
            Log.error('Failed to create renderbuffer object');
        }
        gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer); // Bind the object to target
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);

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
    createFramebuffer3D() {
        const gl = this.renderer.gl;
        this.framebuffer = gl.createFramebuffer() as WebGLFramebuffer;
        if (!this.framebuffer) {
            Log.error('Failed to create frame buffer object');
        }

        this.textureCube = gl.createTexture() as WebGLTexture;
        if (!this.texture) {
            Log.error('Failed to create texture object');
        }
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.textureCube); // Bind the object to target
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        const depthBuffer = gl.createRenderbuffer() as WebGLRenderbuffer;
        if (!depthBuffer) {
            Log.error('Failed to create renderbuffer object');
        }
        gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer); // Bind the object to target
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);

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
    beforeDraw() {
        const gl = this.renderer.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        gl.viewport(0, 0, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT); // Set a viewport for FBO
        // this.renderer.setViewport(0, 0, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);
        gl.clearColor(1, 1, 1, 1); // Set clear color (the color is slightly changed)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  // Clear FBO
    }
    afterDraw() {
        const gl = this.renderer.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);        // Change the drawing destination to color buffer
        this.renderer.setViewport.apply(this.renderer, this.renderer.viewport);
    }
    render() {
        this.beforeDraw();
        this.scene.render();
        this.afterDraw();
    }
}