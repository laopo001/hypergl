/*
 * ProjectName: hypergl
 * FilePath: \src\scene\forward-renderer.ts
 * Created Date: Saturday, August 18th 2018, 10:15:48 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, January 23rd 2019, 1:10:34 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, LightComponent } from '../ecs';
import { Scene } from './scene';
import { Shader } from '../graphics/shader';
import { SEMANTICMAP, SEMANTIC } from '../conf';
import { Log } from '../utils/util';
import { Mesh } from '../mesh';
import { Light, DirectionalLight, PointLight, SpotLight } from '../lights';
import { Vec3, DEG_TO_RAD } from '../math';



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
    gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);

    for (let i = 0; i < drawables.length; i++) {
        // if (modelComponent.entity.name === 'sphere8') debugger;

        const drawable = drawables[i];
        if (!drawable.cache.enabled) {
            continue;
        }
        if ((drawable as Mesh).outline) {
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
        if ((drawable as Mesh).outline) {
            gl.stencilFunc(gl.NOTEQUAL, 1, 0xFF);
            gl.stencilMask(0x00);
            renderer.setDepthTest(false);
            let clone = drawable.cache.uModelMatrix!.clone();
            let data = clone.data;
            data[0] *= 1.1;
            data[5] *= 1.1;
            data[10] *= 1.1;
            let attributes: { [s: string]: SEMANTIC } = { vertex_position: SEMANTIC.POSITION };
            let shader = renderer.programGenerator.getShader('outline', attributes);
            shader.setUniformValue('uViewProjectionMatrix', viewProjectionMatrixData);
            shader.setUniformValue('uModelMatrix', data);
            renderer.setShaderProgram(shader);
            renderer.draw(drawable);
            gl.stencilFunc(gl.ALWAYS, 1, 0xFF);
            gl.stencilMask(0xFF);
            renderer.setDepthTest(true);
        }

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
let o = { 'Normal': 0, 'PCF': 1, 'PCFSoft': 2 };
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
            setLight(name, 'castShadows', index, obj, uniforms, item.castShadows ? 1 : 0);
            setLight(name, 'shadowType', index, obj, uniforms, o[item.shadowType]);
            setLight(name, 'shadowMapSize', index, obj, uniforms, item.shadowMapSize);
            setLight(name, 'shadowBias', index, obj, uniforms, item.shadowBias);
        }
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
            setLight(name, 'castShadows', index, obj, uniforms, item.castShadows ? 1 : 0);
            setLight(name, 'shadowType', index, obj, uniforms, o[item.shadowType]);
            setLight(name, 'shadowMapSize', index, obj, uniforms, item.shadowMapSize);
            setLight(name, 'shadowBias', index, obj, uniforms, item.shadowBias);
        }
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
            setLight(name, 'castShadows', index, obj, uniforms, item.castShadows ? 1 : 0);
            setLight(name, 'shadowType', index, obj, uniforms, o[item.shadowType]);
            setLight(name, 'shadowMapSize', index, obj, uniforms, item.shadowMapSize);
            setLight(name, 'shadowBias', index, obj, uniforms, item.shadowBias);
        }
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
