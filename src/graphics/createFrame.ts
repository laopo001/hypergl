/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\createFrame.ts
 * Created Date: Saturday, September 15th 2018, 1:31:26 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, September 15th 2018, 2:59:07 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

let OFFSCREEN_WIDTH = 256;
let OFFSCREEN_HEIGHT = 256;

import { RendererPlatform } from './renderer';
import { Log } from '../util';
export class Frame {
    framebuffer!: WebGLFramebuffer;
    texture!: WebGLTexture;
    // depthBuffer!: WebGLRenderbuffer;
    constructor(private renderer: RendererPlatform) { }
    createFramebuffer() {
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
    beforeDraw() {
        const gl = this.renderer.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);              // Change the drawing destination to FBO
        gl.viewport(0, 0, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT); // Set a viewport for FBO

        // tslint:disable-next-line:number-literal-format
        gl.clearColor(0.2, 0.2, 0.4, 1.0); // Set clear color (the color is slightly changed)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  // Clear FBO

        // drawTexturedCube(gl, gl.program, cube, angle, texture, viewProjMatrixFBO);   // Draw the cube
        // this.renderer.draw()


    }
    afterDraw() {
        const gl = this.renderer.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);        // Change the drawing destination to color buffer
        gl.viewport(0, 0, this.renderer.canvas.width, this.renderer.canvas.height);  // Set the size of viewport back to that of <canvas>

        // tslint:disable-next-line:number-literal-format
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear the color buffer
    }
}