/*
 * ProjectName: hypergl
 * FilePath: \src\scene\forward-renderer.ts
 * Created Date: Saturday, August 18th 2018, 10:15:48 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, March 5th 2019, 1:29:58 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, LightComponent } from '../ecs';
import { Scene } from './scene';
import { Shader } from '../graphics/shader';
import { SEMANTICMAP, SEMANTIC } from '../conf';
import { Log, to_n_decimal } from '../utils/util';
import { Mesh } from '../mesh';
import { Light, DirectionalLight, PointLight, SpotLight } from '../lights';
import { Vec3, DEG_TO_RAD } from '../math';
import { Picker } from './picker';
import { Color } from '../core';
import { ColorMaterial } from '../material';
import { ReadonlyObject } from '../types';


export function renderScence(scene: Scene) {
    let drawables = scene.systems.model!.layers;
    let lights = scene.systems.light!;
    let camera = scene.activeCamera;
    // camera.instance.updateRenderTarget();
    // modelComponents = camera.instance.getList(modelComponents);
    let renderer = scene.app.renderer;
    let gl = renderer.gl;
    let { r, b, g, a } = camera.clearColor;
    renderer.setClearColor(r, b, g, a);
    renderer.clear();
    let directionalLightsUniforms = renderDirectionalLightArr('directionalLightArr', lights.directionalLights, scene);
    let pointLightsUniforms = renderPointLightArr('pointLightArr', lights.pointLights, scene);
    let spotLightsUniforms = renderSpotLightArr('spotLightArr', lights.spotLight, scene);
    let LightsUniforms: any = { ...directionalLightsUniforms, ...pointLightsUniforms, ...spotLightsUniforms };
    let viewProjectionMatrixData = camera.viewProjectionMatrix().data;

    renderer.enableBLEND();
    gl.enable(gl.STENCIL_TEST);
    // gl.stencilFunc(gl.ALWAYS, 1, 0xFF);
    // gl.stencilMask(0xFF);
    // gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
    // gl.stencilMask(0x00);
    // gl.stencilFunc(gl.NOTEQUAL, 1, 0xFF);
    // gl.stencilMask(0x00);
    for (let i = 0; i < drawables.length; i++) {
        // if (modelComponent.entity.name === 'sphere8') debugger;

        const drawable = drawables[i];
        if (!drawable.cache.enabled) {
            continue;
        }
        if (drawable instanceof Mesh && drawable.outline) {
            gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
            gl.stencilFunc(gl.ALWAYS, 1, 0xFF);
            gl.stencilMask(0xFF);
        }
        const material = drawable.material;
        let attributes: { [s: string]: SEMANTIC } = {};
        drawable.vertexBuffer.format.elements.forEach(x => {
            attributes[SEMANTICMAP[x.semantic]] = x.semantic;
        });

        material.setLights(LightsUniforms);
        material.setshaderVars('fog', scene.fog);
        material.updateShader(attributes);
        let shader = material.shader as Shader;
        renderer.setShaderProgram(shader);
        shader.setUniformValue('uViewProjectionMatrix', viewProjectionMatrixData);
        shader.setUniformValue('uModelMatrix', drawable.cache.uModelMatrix!.data);
        shader.setUniformValue('uNormalMatrix', drawable.cache.uNormalMatrix!.data);
        shader.setUniformValue('uCameraPosition', camera.getPosition().data);
        // shader.setUniformValue('fog', scene.fog);
        shader.setUniformValue('uExposure', scene.exposure);
        shader.setUniformValue('uGammaCorrection', scene.gammaCorrection);
        shader.setUniformValue('uFogColor', scene.fogColor.data3);
        shader.setUniformValue('uFogDensity', scene.fogDensity);
        shader.setUniformValue('uFogDist', new Float32Array([scene.fogStart, scene.fogEnd]));
        shader.setUniformValue('uReceiveShadow', drawable.receiveShadow);
        renderer.draw(drawable);
        if (drawable instanceof Mesh && drawable.outline) {
            gl.stencilFunc(gl.NOTEQUAL, 1, 0xFF);
            // gl.stencilMask(0x00);
            // renderer.setDepthTest(false);
            let clone = drawable.cache.uModelMatrix!.clone();
            let data = clone.data;
            data[0] += drawable.outlineWidth;
            data[5] += drawable.outlineWidth;
            data[10] += drawable.outlineWidth;
            let attributes: { [s: string]: SEMANTIC } = { vertex_position: SEMANTIC.POSITION };
            let shader = renderer.programGenerator.getShader('outline', attributes);
            shader.setUniformValue('uViewProjectionMatrix', viewProjectionMatrixData);
            shader.setUniformValue('uModelMatrix', data);
            renderer.setShaderProgram(shader);
            renderer.draw(drawable);
            // gl.stencilFunc(gl.ALWAYS, 1, 0xFF);
            // gl.clear(gl.STENCIL_BUFFER_BIT);
            // gl.stencilMask(0xFF);
            gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
            // renderer.setDepthTest(true);
            // gl.clear(gl.STENCIL_BUFFER_BIT);
            // gl.disable(gl.STENCIL_TEST);
        }
        renderer.clear(false, false, true);
        // gl.clear(gl.STENCIL_BUFFER_BIT);
    }
    renderer.disableBLEND();
}

function rendererDirectionalShadowMap(scene: Scene, light: LightComponent<DirectionalLight>) {
    let drawables = scene.systems.model!.layers;
    let renderer = scene.app.renderer;
    if (!light.shadowFrame) {
        light.shadowFrame = scene.createShadowFrame(light.shadowMapSize, light.shadowMapSize, false);
    }
    let camera = light.instance.camera;
    // camera.updateRenderTarget(); // test
    // modelComponents = camera.getList(modelComponents);

    let attributes: { [s: string]: SEMANTIC } = { vertex_position: SEMANTIC.POSITION };
    let shader = renderer.programGenerator.getShader('depth', attributes);
    shader.setUniformValue('uViewProjectionMatrix', camera.viewProjectionMatrix.data);

    light.shadowFrame.beforeDraw();
    for (let i = 0; i < drawables.length; i++) {
        const drawable = drawables[i];
        if (!drawable.cache.enabled || !drawable.castShadow) {
            continue;
        }
        renderer.setShaderProgram(shader as Shader);
        shader.setUniformValue('uModelMatrix', drawable.cache.uModelMatrix!.data);
        renderer.draw(drawable);
    }
    light.shadowFrame.afterDraw();
    return { texture: light.shadowFrame.getTexture(), viewProjectionMatrix: camera.viewProjectionMatrix };
}
let o: ReadonlyObject<{ 'Normal': number, 'PCF': number, 'PCFSoft': number }> = { 'Normal': 0, 'PCF': 1, 'PCFSoft': 2 };
export function renderDirectionalLightArr(name: string, lights: LightComponent<DirectionalLight>[], scene: Scene) {
    let uniforms = {};
    let res: any[] = [];

    lights.forEach((item, index) => {
        if (!item.enabled) return;
        let obj: any = {};
        if (item.castShadows) {
            let { texture, viewProjectionMatrix } = rendererDirectionalShadowMap(scene, item);
            setLight(name, 'shadowMap', index, obj, uniforms, texture);
            setLight(name, 'lightSpaceMatrix', index, obj, uniforms, viewProjectionMatrix.data);
            setLight(name, 'shadowType', index, obj, uniforms, o[item.shadowType]);
            setLight(name, 'shadowMapSize', index, obj, uniforms, item.shadowMapSize);
            setLight(name, 'shadowBias', index, obj, uniforms, item.shadowBias);
        }
        setLight(name, 'castShadows', index, obj, uniforms, item.castShadows ? 1 : 0);
        setLight(name, 'position', index, obj, uniforms, item.getPosition().data);
        setLight(name, 'color', index, obj, uniforms, item.color.data3);
        setLight(name, 'direction', index, obj, uniforms, item.direction.normalize().data);
        res.push(obj);
    });
    uniforms['_' + name] = res;
    return uniforms;
}
function rendererPointShadowMap(scene: Scene, light: LightComponent<PointLight>) {
    let drawables = scene.systems.model!.layers;
    let renderer = scene.app.renderer;
    if (!light.shadowFrame) {
        light.shadowFrame = scene.createShadowFrame(light.shadowMapSize, light.shadowMapSize, true);
    }
    let cameras = light.instance.cameras;
    for (let i = 0; i < cameras.length; i++) {
        let camera = cameras[i];
        // camera.updateRenderTarget(); // test
        // modelComponents = camera.getList(temp);
        let attributes: { [s: string]: SEMANTIC } = { vertex_position: SEMANTIC.POSITION };
        let shader = renderer.programGenerator.getShader('distance', attributes);
        shader.setUniformValue('uViewProjectionMatrix', camera.viewProjectionMatrix.data);
        shader.setUniformValue('view_position', camera.node.getPosition().data);
        shader.setUniformValue('light_range', light.range);
        light.shadowFrame.createFramebuffer3D(i);
        light.shadowFrame.beforeDraw(i);
        for (let i = 0; i < drawables.length; i++) {
            const drawable = drawables[i];
            if (!drawable.cache.enabled || !drawable.castShadow) {
                continue;
            }
            renderer.setShaderProgram(shader as Shader);
            shader.setUniformValue('uModelMatrix', drawable.cache.uModelMatrix!.data);
            renderer.draw(drawable);
        }
        light.shadowFrame.afterDraw();
    }

    return { texture: light.shadowFrame.getTexture() };
}
export function renderPointLightArr(name: string, lights: LightComponent<PointLight>[], scene: Scene) {
    let res: any[] = [];
    let uniforms = {};
    lights.forEach((item, index) => {
        if (!item.enabled) return;
        let obj: any = {};
        if (item.castShadows) {
            let { texture } = rendererPointShadowMap(scene, item);
            setLight(name, 'shadowMap', index, obj, uniforms, texture);
            setLight(name, 'shadowType', index, obj, uniforms, o[item.shadowType]);
            setLight(name, 'shadowMapSize', index, obj, uniforms, item.shadowMapSize);
            setLight(name, 'shadowBias', index, obj, uniforms, item.shadowBias);
        }
        setLight(name, 'castShadows', index, obj, uniforms, item.castShadows ? 1 : 0);
        setLight(name, 'position', index, obj, uniforms, item.getPosition().data);
        setLight(name, 'color', index, obj, uniforms, item.color.data3);
        setLight(name, 'range', index, obj, uniforms, item.range);
        res.push(obj);
    });
    uniforms['_' + name] = res;
    return uniforms;
}

function rendererSpotShadowMap(scene: Scene, light: LightComponent<SpotLight>) {
    let drawables = scene.systems.model!.layers;
    let renderer = scene.app.renderer;
    if (!light.shadowFrame) {
        light.shadowFrame = scene.createShadowFrame(light.shadowMapSize, light.shadowMapSize, false);
    }
    let camera = light.instance.camera;
    // camera.updateRenderTarget(); // test
    // modelComponents = camera.getList(modelComponents);

    let attributes: { [s: string]: SEMANTIC } = { vertex_position: SEMANTIC.POSITION };
    let shader = renderer.programGenerator.getShader('depth', attributes);
    shader.setUniformValue('uViewProjectionMatrix', camera.viewProjectionMatrix.data);

    light.shadowFrame.beforeDraw();
    for (let i = 0; i < drawables.length; i++) {
        const drawable = drawables[i];
        if (!drawable.cache.enabled || !drawable.castShadow) {
            continue;
        }
        renderer.setShaderProgram(shader as Shader);
        shader.setUniformValue('uModelMatrix', drawable.cache.uModelMatrix!.data);
        renderer.draw(drawable);
    }
    light.shadowFrame.afterDraw();
    return { texture: light.shadowFrame.getTexture(), viewProjectionMatrix: camera.viewProjectionMatrix };
}

export function renderSpotLightArr(name: string, lights: LightComponent<SpotLight>[], scene: Scene) {

    let res: any[] = [];
    let uniforms = {};
    lights.forEach((item, index) => {
        if (!item.enabled) return;
        let obj: any = {};
        if (item.castShadows) {
            let { texture, viewProjectionMatrix } = rendererSpotShadowMap(scene, item);
            setLight(name, 'shadowMap', index, obj, uniforms, texture);
            setLight(name, 'lightSpaceMatrix', index, obj, uniforms, viewProjectionMatrix.data);
            setLight(name, 'shadowType', index, obj, uniforms, o[item.shadowType]);
            setLight(name, 'shadowMapSize', index, obj, uniforms, item.shadowMapSize);
            setLight(name, 'shadowBias', index, obj, uniforms, item.shadowBias);
        }
        setLight(name, 'castShadows', index, obj, uniforms, item.castShadows ? 1 : 0);
        setLight(name, 'position', index, obj, uniforms, item.getPosition().data);
        setLight(name, 'direction', index, obj, uniforms, item.direction.normalize().data);
        setLight(name, 'innerConeAngle', index, obj, uniforms, Math.cos(item.innerConeAngle * DEG_TO_RAD));
        setLight(name, 'outerConeAngle', index, obj, uniforms, Math.cos(item.outerConeAngle * DEG_TO_RAD));
        setLight(name, 'color', index, obj, uniforms, item.color.data3);
        setLight(name, 'range', index, obj, uniforms, item.range);
        res.push(obj);
    });
    uniforms['_' + name] = res;
    return uniforms;
}

function setLight(name: string, key: string, index, obj, parameters, value) {
    let t = name + index + '_' + key;
    obj[key] = t;
    parameters[t] = value;
}

export function rendererPickerFrame(picker: Picker, material: ColorMaterial, cb) {
    let scene = picker.scene;
    let entitys = scene.entitys;
    let pickFrame = picker.pickFrame;
    let drawables = scene.systems.model!.layers;
    let renderer = scene.app.renderer;
    let camera = scene.activeCamera;
    let attributes: { [s: string]: SEMANTIC } = { vertex_position: SEMANTIC.POSITION };
    material.updateShader(attributes);
    let shader = material.shader!;
    renderer.setShaderProgram(shader);
    let color = new Color();
    shader.setUniformValue('uViewProjectionMatrix', camera.viewProjectionMatrix().data);
    pickFrame.beforeDraw();
    for (let i = 0; i < entitys.length; i++) {
        const entity = entitys[i];
        if (entity.model == null) {
            continue;
        }
        for (let j = 0; j < entity.model.model.meshs.length; j++) {
            const drawable = entity.model.model.meshs[j];
            let arr = to_n_decimal(i, 256);
            if (arr.length >= 5) { console.warn('xxx'); }
            for (let i = 0; i < 4; i++) {
                if (arr[i] == null) {
                    arr[i] = 0;
                }
            }
            if (!drawable.cache.enabled) {
                continue;
            }
            renderer.setShaderProgram(shader as Shader);
            shader.setUniformValue('uModelMatrix', drawable.cache.uModelMatrix!.data);
            color.set(arr[0] / 255, arr[1] / 255, arr[2] / 255);
            shader.setUniformValue('uDiffuseColor', color.data);
            shader.setUniformValue('uOpacity', arr[3] / 255);
            renderer.draw(drawable);
        }
    }
    cb();
    pickFrame.afterDraw();
}