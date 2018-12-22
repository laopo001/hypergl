/*
 * ProjectName: hypergl
 * FilePath: \src\scene\forward-renderer.ts
 * Created Date: Saturday, August 18th 2018, 10:15:48 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, December 23rd 2018, 1:46:02 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Entity, LightComponent } from '../ecs';
import { Scene } from './scene';
import { Shader } from '../graphics/shader';
import { SEMANTICMAP, SEMANTIC } from '../conf';
import { Log } from '../utils/util';
import { Light, DirectionalLight, PointLight, SpotLight } from '../lights';
import { Vec3, DEG_TO_RAD } from '../math';



export function renderScence(scene: Scene) {
    let modelComponents = scene.systems.model!.components;
    let lights = scene.systems.light!;
    let camera = scene.activeCamera;
    camera.instance.updateRenderTarget();
    modelComponents = camera.instance.getList(modelComponents);
    let renderer = scene.app.renderer;
    let { r, b, g, a } = camera.clearColor;
    renderer.setClearColor(r, b, g, a);
    renderer.clear();
    let directionalLightsUniforms = renderDirectionalLightArr('directionalLightArr', lights.directionalLights, scene);
    let pointLightsUniforms = renderPointLightArr('pointLightArr', lights.pointLights, scene);
    let spotLightsUniforms = renderSpotLightArr('spotLightArr', lights.spotLight, scene);
    let LightsUniforms: any = { ...directionalLightsUniforms, ...pointLightsUniforms, ...spotLightsUniforms };
    let temp: Light[] = [];
    renderer.enableBLEND();
    for (let i = 0; i < modelComponents.length; i++) {
        let modelComponent = modelComponents[i];
        if (!modelComponent.enabled) {
            continue;
        }

        const model = modelComponent.instance;
        for (let i = 0; i < model.meshs.length; i++) {
            const drawable = model.meshs[i];
            const material = drawable.material;
            let attributes: { [s: string]: SEMANTIC } = {};
            drawable.vertexBuffer.format.elements.forEach(x => {
                attributes[SEMANTICMAP[x.semantic]] = x.semantic;
            });
            if (!drawable.receiveShadow) {
                LightsUniforms._directionalLightArr.forEach(item => {
                    item.castShadows = false;
                    temp.push(item);
                });
                LightsUniforms._pointLightArr.forEach(item => {
                    item.castShadows = false;
                    temp.push(item);
                });
                LightsUniforms._spotLightArr.forEach(item => {
                    item.castShadows = false;
                    temp.push(item);
                });
            }
            material.setLights(LightsUniforms);
            material.updateShader(attributes);
            let shader = material.shader as Shader;
            renderer.setShaderProgram(shader);
            shader.setUniformValue('matrix_viewProjection', camera.viewProjectionMatrix.data);
            shader.setUniformValue('matrix_model', modelComponent.getWorldTransform().data);
            shader.setUniformValue('matrix_normal', modelComponent.getWorldTransform().clone().invert().transpose().data);
            shader.setUniformValue('uCameraPosition', camera.getPosition().data);
            shader.setUniformValue('fog', scene.fog);
            shader.setUniformValue('fogColor', scene.fogColor.data3);
            shader.setUniformValue('fogDensity', scene.fogDensity);
            shader.setUniformValue('fogDist', new Float32Array([scene.fogStart, scene.fogEnd]));

            renderer.draw(drawable);

            if (!drawable.receiveShadow) {
                temp.forEach(item => {
                    item.castShadows = true;
                });
                temp = [];
            }
        }

    }
    renderer.disableBLEND();
}

function rendererDirectionalShadowMap(scene: Scene, light: LightComponent<DirectionalLight>) {
    let modelComponents = scene.systems.model!.components;
    let renderer = scene.app.renderer;
    if (!light.shadowFrame) {
        light.shadowFrame = scene.createShadowFrame(light.shadowMapWidth, light.shadowMapHeight, false);
    }
    let camera = light.instance.camera;
    camera.updateRenderTarget(); // test
    modelComponents = camera.getList(modelComponents);

    let attributes: { [s: string]: SEMANTIC } = { vertex_position: SEMANTIC.POSITION };
    let shader = renderer.programGenerator.getShader('depth', attributes);
    shader.setUniformValue('matrix_viewProjection', camera.viewProjectionMatrix.data);

    light.shadowFrame.beforeDraw();
    for (let i = 0; i < modelComponents.length; i++) {
        let modelComponent = modelComponents[i];
        for (let i = 0; i < modelComponent.instance.meshs.length; i++) {
            if (!modelComponent.enabled) {
                continue;
            }
            const drawable = modelComponent.instance.meshs[i];
            if (!drawable.castShadow) {
                continue;
            }
            renderer.setShaderProgram(shader as Shader);
            shader.setUniformValue('matrix_model', modelComponent.getWorldTransform().data);
            renderer.draw(drawable);
        }
    }
    light.shadowFrame.afterDraw();
    return { texture: light.shadowFrame.getTexture(), viewProjectionMatrix: camera.viewProjectionMatrix };
}
let o = { 'Normal': 0, 'PCF': 1, 'PCFSoft': 2 };
export function renderDirectionalLightArr(name: string, data: LightComponent<DirectionalLight>[], scene: Scene) {
    let uniforms = {};
    let res: string[][] = [];

    data.forEach((item, index) => {
        let obj: any = {};
        if (item.castShadows) {
            let { texture, viewProjectionMatrix } = rendererDirectionalShadowMap(scene, item);
            setLight(name, 'shadowMap', index, obj, uniforms, texture);
            setLight(name, 'lightSpaceMatrix', index, obj, uniforms, viewProjectionMatrix.data);
            setLight(name, 'castShadows', index, obj, uniforms, item.castShadows);
            setLight(name, 'shadowType', index, obj, uniforms, o[item.shadowType]);
            setLight(name, 'shadowMapSize', index, obj, uniforms, new Float32Array([item.shadowMapWidth, item.shadowMapHeight]));
            setLight(name, 'shadowBias', index, obj, uniforms, item.shadowBias);
        }
        setLight(name, 'position', index, obj, uniforms, item.getPosition().data);
        setLight(name, 'color', index, obj, uniforms, item.color.data);
        setLight(name, 'direction', index, obj, uniforms, item.direction.normalize().data);
        res.push(obj);
    });
    uniforms['_' + name] = res;
    return uniforms;
}
function rendererPointShadowMap(scene: Scene, light: LightComponent<PointLight>) {
    let modelComponents = scene.systems.model!.components;
    let renderer = scene.app.renderer;
    if (!light.shadowFrame) {
        light.shadowFrame = scene.createShadowFrame(light.shadowMapWidth, light.shadowMapHeight, true);
    }
    let cameras = light.instance.cameras;
    let temp = modelComponents;

    for (let i = 0; i < cameras.length; i++) {
        let camera = cameras[i];
        camera.updateRenderTarget(); // test
        modelComponents = camera.getList(temp);
        // console.log(modelComponents);

        let attributes: { [s: string]: SEMANTIC } = { vertex_position: SEMANTIC.POSITION };
        let shader = renderer.programGenerator.getShader('distance', attributes);
        shader.setUniformValue('matrix_viewProjection', camera.viewProjectionMatrix.data);
        shader.setUniformValue('view_position', camera.node.getPosition().data);
        shader.setUniformValue('light_range', light.range);
        light.shadowFrame.createFramebuffer3D(i);
        light.shadowFrame.beforeDraw(i);
        // for (let i = 0; i < modelComponents.length; i++) {
        //     let modelComponent = modelComponents[i];
        //     if (!modelComponent.enabled || !modelComponent.instance || !modelComponent.instance.castShadow) {
        //         continue;
        //     }
        //     renderer.setShaderProgram(shader as Shader);
        //     shader.setUniformValue('matrix_model', modelComponent.getWorldTransform().data);
        //     renderer.draw(modelComponent);
        // }
        for (let i = 0; i < modelComponents.length; i++) {
            let modelComponent = modelComponents[i];
            for (let i = 0; i < modelComponent.instance.meshs.length; i++) {
                if (!modelComponent.enabled) {
                    continue;
                }
                const drawable = modelComponent.instance.meshs[i];
                if (!drawable.castShadow) {
                    continue;
                }
                renderer.setShaderProgram(shader as Shader);
                shader.setUniformValue('matrix_model', modelComponent.getWorldTransform().data);
                renderer.draw(drawable);
            }
        }
        light.shadowFrame.afterDraw();
    }

    return { texture: light.shadowFrame.getTexture() };
}
export function renderPointLightArr(name: string, data: LightComponent<PointLight>[], scene: Scene) {
    let res: string[][] = [];
    let uniforms = {};
    data.forEach((item, index) => {
        let obj: any = {};
        if (item.castShadows) {
            let { texture } = rendererPointShadowMap(scene, item);
            setLight(name, 'shadowMap', index, obj, uniforms, texture);
            setLight(name, 'castShadows', index, obj, uniforms, item.castShadows);
            setLight(name, 'shadowType', index, obj, uniforms, o[item.shadowType]);
            setLight(name, 'shadowMapSize', index, obj, uniforms, new Float32Array([item.shadowMapWidth, item.shadowMapHeight]));
            setLight(name, 'shadowBias', index, obj, uniforms, item.shadowBias);
        }
        setLight(name, 'position', index, obj, uniforms, item.getPosition().data);
        setLight(name, 'color', index, obj, uniforms, item.color.data);
        setLight(name, 'range', index, obj, uniforms, item.range);
        res.push(obj);
    });
    uniforms['_' + name] = res;
    return uniforms;
}

function rendererSpotShadowMap(scene: Scene, light: LightComponent<SpotLight>) {
    let modelComponents = scene.systems.model!.components;
    let renderer = scene.app.renderer;
    if (!light.shadowFrame) {
        light.shadowFrame = scene.createShadowFrame(light.shadowMapWidth, light.shadowMapHeight, false);
    }
    let camera = light.instance.camera;
    camera.updateRenderTarget(); // test
    modelComponents = camera.getList(modelComponents);

    let attributes: { [s: string]: SEMANTIC } = { vertex_position: SEMANTIC.POSITION };
    let shader = renderer.programGenerator.getShader('depth', attributes);
    shader.setUniformValue('matrix_viewProjection', camera.viewProjectionMatrix.data);

    light.shadowFrame.beforeDraw();
    // for (let i = 0; i < modelComponents.length; i++) {
    //     let modelComponent = modelComponents[i];
    //     if (!modelComponent.enabled || !modelComponent.instance || !modelComponent.instance.castShadow) {
    //         continue;
    //     }
    //     renderer.setShaderProgram(shader as Shader);
    //     shader.setUniformValue('matrix_model', modelComponent.getWorldTransform().data);
    //     renderer.draw(modelComponent);
    // }
    for (let i = 0; i < modelComponents.length; i++) {
        let modelComponent = modelComponents[i];
        for (let i = 0; i < modelComponent.instance.meshs.length; i++) {
            if (!modelComponent.enabled) {
                continue;
            }
            const drawable = modelComponent.instance.meshs[i];
            if (!drawable.castShadow) {
                continue;
            }
            renderer.setShaderProgram(shader as Shader);
            shader.setUniformValue('matrix_model', modelComponent.getWorldTransform().data);
            renderer.draw(drawable);
        }
    }
    light.shadowFrame.afterDraw();
    return { texture: light.shadowFrame.getTexture(), viewProjectionMatrix: camera.viewProjectionMatrix };
}

export function renderSpotLightArr(name: string, data: LightComponent<SpotLight>[], scene: Scene) {

    let res: string[][] = [];
    let uniforms = {};
    data.forEach((item, index) => {
        let obj: any = {};
        if (item.castShadows) {
            let { texture, viewProjectionMatrix } = rendererSpotShadowMap(scene, item);
            setLight(name, 'shadowMap', index, obj, uniforms, texture);
            setLight(name, 'lightSpaceMatrix', index, obj, uniforms, viewProjectionMatrix.data);
            setLight(name, 'castShadows', index, obj, uniforms, item.castShadows);
            setLight(name, 'shadowType', index, obj, uniforms, o[item.shadowType]);
            setLight(name, 'shadowMapSize', index, obj, uniforms, new Float32Array([item.shadowMapWidth, item.shadowMapHeight]));
            setLight(name, 'shadowBias', index, obj, uniforms, item.shadowBias);
        }
        setLight(name, 'position', index, obj, uniforms, item.getPosition().data);
        setLight(name, 'direction', index, obj, uniforms, item.direction.normalize().data);
        setLight(name, 'innerConeAngle', index, obj, uniforms, Math.cos(item.innerConeAngle * DEG_TO_RAD));
        setLight(name, 'outerConeAngle', index, obj, uniforms, Math.cos(item.outerConeAngle * DEG_TO_RAD));
        setLight(name, 'color', index, obj, uniforms, item.color.data);
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
