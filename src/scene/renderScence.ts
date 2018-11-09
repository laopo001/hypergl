/*
 * ProjectName: hypergl
 * FilePath: \src\scene\forward-renderer.ts
 * Created Date: Saturday, August 18th 2018, 10:15:48 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, November 9th 2018, 11:25:49 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { SceneNode } from './node';
import { Entity } from '../ecs/entity';
import { BasicMaterial } from '../material/basicMaterial';
import { Scene } from './scene';
import { Mesh } from '../mesh/mesh';
import { Shader } from '../graphics/shader';
import { SEMANTICMAP, SEMANTIC } from '../conf';
import { Log } from '../utils/util';
import { Light, DirectionalLight, PointLight, SpotLight } from '../lights';
import { Camera } from './camera';
import { Vec3, DEG_TO_RAD } from '../math';



export function renderScence(scene: Scene) {
    let entitys = scene.renderLayers;
    let lights = scene.lights;
    let camera = scene.activeCamera;

    let renderer = scene.app.renderer;
    renderer.initDraw(true);

    let directionalLightsUniforms = renderDirectionalLightArr('directionalLightArr', lights.directionalLights, scene);
    let pointLightsUniforms = renderPointLightArr('pointLightArr', lights.pointLights, scene);
    let spotLightsUniforms = renderSpotLightArr('spotLightArr', lights.spotLight, scene);
    let LightsUniforms: any = { ...directionalLightsUniforms, ...pointLightsUniforms, ...spotLightsUniforms };

    let temp: Light[] = [];
    renderer.enableBLEND();
    for (let i = 0; i < entitys.length; i++) {
        let entity = entitys[i];
        if (!entity.enabled || !entity.mesh) {
            continue;
        }
        const mesh = entity.mesh;
        const material = mesh.material;
        let attributes: { [s: string]: SEMANTIC } = {};
        mesh.vertexBuffer.format.elements.forEach(x => {
            attributes[SEMANTICMAP[x.semantic]] = x.semantic;
        });
        if (!entity.mesh.receiveShadow) {
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
        // material.setDirectionalLightArr('directionalLightArr', lights.directionalLights, scene);
        // material.setPointLightArr('pointLightArr', lights.pointLights);
        material.updateShader(renderer, attributes);
        let shader = mesh.material.shader as Shader;
        renderer.setShaderProgram(shader);
        shader.setUniformValue('matrix_viewProjection', camera.viewProjectionMatrix.data);
        shader.setUniformValue('matrix_model', entity.getWorldTransform().data);
        shader.setUniformValue('matrix_normal', entity.getWorldTransform().clone().invert().transpose().data);
        shader.setUniformValue('camera_position', camera.getPosition().data);
        // tslint:disable-next-line:forin
        renderer.draw(entity);
        if (!entity.mesh.receiveShadow) {
            temp.forEach(item => {
                item.castShadows = true;
            });
            temp = [];
        }
    }
    renderer.disableBLEND();
}



export function renderDirectionalLightArr(name: string, data: DirectionalLight[], scene: Scene) {
    function rendererShadowMap(scene: Scene, light: DirectionalLight) {
        let entitys = scene.renderLayers;
        let renderer = scene.app.renderer;
        if (!light.shadowFrame) {
            light.shadowFrame = scene.createShadowFrame(false);
        }

        let camera = new Camera();
        let height = 20;
        let width = 1 * height;
        let length = 1 * height;
        camera.setOrtho(-width, width, -height, height, -length, length);
        // let v = light.getPosition().sub(new Vec3(0, 0, 0));
        // let up = new Vec3();
        // if (v.z === 0) {
        //     up.set(0, 0, -1);
        // } else {
        //     up.set(0, 1, -v.y / v.z);
        // }
        // camera.setPosition(0, 0, 0);
        // console.log(light.direction);
        // camera.setPosition(scene.activeCamera.getPosition());
        camera.lookAt(light.direction, camera.up);

        let attributes: { [s: string]: SEMANTIC } = { vertex_position: SEMANTIC.POSITION };
        let shader = renderer.programGenerator.getShader('depth', attributes);
        shader.setUniformValue('matrix_viewProjection', camera.viewProjectionMatrix.data);

        // let gl = scene.app.rendererPlatform.gl;
        // gl.cullFace(gl.FRONT);
        light.shadowFrame.beforeDraw();
        for (let i = 0; i < entitys.length; i++) {
            let entity = entitys[i];
            if (!entity.enabled || !entity.mesh || !entity.mesh.castShadow) {
                continue;
            }
            renderer.setShaderProgram(shader as Shader);
            shader.setUniformValue('matrix_model', entity.getWorldTransform().data);
            renderer.draw(entity);
        }
        light.shadowFrame.afterDraw();
        // gl.cullFace(gl.BACK);
        return { texture: light.shadowFrame.getTexture(), viewProjectionMatrix: camera.viewProjectionMatrix };
    }

    let uniforms = {};
    let res: string[][] = [];

    data.forEach((item, index) => {
        let obj: any = {};
        if (item.castShadows) {
            let { texture, viewProjectionMatrix } = rendererShadowMap(scene, item);
            setLight(name, 'shadowMap', index, obj, uniforms, texture);
            setLight(name, 'lightSpaceMatrix', index, obj, uniforms, viewProjectionMatrix.data);
            setLight(name, 'castShadows', index, obj, uniforms, item.castShadows);
        }
        setLight(name, 'position', index, obj, uniforms, item.getPosition().data);
        setLight(name, 'color', index, obj, uniforms, item.color.data);
        setLight(name, 'direction', index, obj, uniforms, item.direction.normalize().data);
        res.push(obj);
    });
    uniforms['_' + name] = res;
    return uniforms;
}
function createCubeCamera(cameras: Camera[], light: PointLight) {
    let camera = new Camera();
    const near = 0.1;
    let position = new Vec3(1, 0, 0);
    let up = new Vec3(0, - 1, 0);
    camera.setPerspective(90, 1, near, light.range);
    camera.lookAt(position.add(light.getPosition()), up);
    cameras.push(camera);

    position = new Vec3(-1, 0, 0);
    up = new Vec3(0, - 1, 0);
    camera.setPerspective(90, 1, near, light.range);
    camera.lookAt(position.add(light.getPosition()), up);
    cameras.push(camera);

    position = new Vec3(0, 1, 0);
    up = new Vec3(0, 0, 1);
    camera.setPerspective(90, 1, near, light.range);
    camera.lookAt(position.add(light.getPosition()), up);
    cameras.push(camera);

    position = new Vec3(0, - 1, 0);
    up = new Vec3(0, 0, 1);
    camera.setPerspective(90, 1, near, light.range);
    camera.lookAt(position.add(light.getPosition()), up);
    cameras.push(camera);

    position = new Vec3(0, 0, 1);
    up = new Vec3(0, - 1, 0);
    camera.setPerspective(90, 1, near, light.range);
    camera.lookAt(position.add(light.getPosition()), up);
    cameras.push(camera);

    position = new Vec3(0, 0, -1);
    up = new Vec3(0, - 1, 0);
    camera.setPerspective(90, 1, near, light.range);
    camera.lookAt(position.add(light.getPosition()), up);
    cameras.push(camera);
    return cameras;
}



export function renderPointLightArr(name: string, data: PointLight[], scene: Scene) {
    function rendererShadowMap(scene: Scene, light: PointLight) {
        // TODO
        let entitys = scene.renderLayers;
        let renderer = scene.app.renderer;
        if (!light.shadowFrame) {
            light.shadowFrame = scene.createShadowFrame(true);
        }
        let cameras: Camera[] = [];

        for (let i = 0; i < 6; i++) {
            let v = new Vec3();
            let a = i % 2;
            let up;
            switch (i) {
                case 0: up = new Vec3(0, -1, 0); break;
                case 1: up = new Vec3(0, -1, 0); break;
                case 2: up = new Vec3(0, 0, 1); break;
                case 3: up = new Vec3(0, 0, -1); break;
                case 4: up = new Vec3(0, -1, 0); break;
                case 5: up = new Vec3(0, -1, 0); break;
            }
            let b = Math.floor(i / 2);
            v.data[b] = a === 0 ? 1 : -1;
            let camera = new Camera();
            const near = 0.1;
            camera.lookAt(v, up);
            camera.setPosition(light.getPosition());
            camera.setPerspective(90, 1, near, light.range);
            cameras.push(camera);
        }


        for (let i = 0; i < cameras.length; i++) {
            let camera = cameras[i];
            let attributes: { [s: string]: SEMANTIC } = { vertex_position: SEMANTIC.POSITION };
            let shader = renderer.programGenerator.getShader('distance', attributes);
            shader.setUniformValue('matrix_viewProjection', camera.viewProjectionMatrix.data);
            shader.setUniformValue('view_position', camera.getPosition().data);
            shader.setUniformValue('light_range', light.range);
            light.shadowFrame.createFramebuffer3D(i);
            light.shadowFrame.beforeDraw(i);
            for (let i = 0; i < entitys.length; i++) {
                let entity = entitys[i];
                if (!entity.enabled || !entity.mesh || !entity.mesh.castShadow) {
                    continue;
                }
                renderer.setShaderProgram(shader as Shader);
                shader.setUniformValue('matrix_model', entity.getWorldTransform().data);
                renderer.draw(entity);
            }
            light.shadowFrame.afterDraw();
        }

        return { texture: light.shadowFrame.getTexture() };
    }
    let res: string[][] = [];
    let uniforms = {};
    data.forEach((item, index) => {
        let obj: any = {};
        if (item.castShadows) {
            let { texture } = rendererShadowMap(scene, item);
            setLight(name, 'shadowMap', index, obj, uniforms, texture);
            setLight(name, 'castShadows', index, obj, uniforms, item.castShadows);
        }
        setLight(name, 'position', index, obj, uniforms, item.getPosition().data);
        setLight(name, 'color', index, obj, uniforms, item.color.data);
        setLight(name, 'range', index, obj, uniforms, item.range);
        res.push(obj);
    });
    uniforms['_' + name] = res;
    return uniforms;
}

export function renderSpotLightArr(name: string, data: SpotLight[], scene: Scene) {
    function rendererShadowMap(scene: Scene, light: SpotLight) {
        let entitys = scene.renderLayers;
        let renderer = scene.app.renderer;
        if (!light.shadowFrame) {
            light.shadowFrame = scene.createShadowFrame(false);
        }
        let camera = new Camera();
        camera.setPerspective(light.outerConeAngle * 2, 1, 0.5, light.range);
        camera.lookAt(light.direction, getUp(light.direction));
        camera.setPosition(light.getPosition());

        let attributes: { [s: string]: SEMANTIC } = { vertex_position: SEMANTIC.POSITION };
        let shader = renderer.programGenerator.getShader('depth', attributes);
        shader.setUniformValue('matrix_viewProjection', camera.viewProjectionMatrix.data);

        light.shadowFrame.beforeDraw();
        for (let i = 0; i < entitys.length; i++) {
            let entity = entitys[i];
            if (!entity.enabled || !entity.mesh || !entity.mesh.castShadow) {
                continue;
            }
            renderer.setShaderProgram(shader as Shader);
            shader.setUniformValue('matrix_model', entity.getWorldTransform().data);
            renderer.draw(entity);
        }
        light.shadowFrame.afterDraw();
        return { texture: light.shadowFrame.getTexture(), viewProjectionMatrix: camera.viewProjectionMatrix };
    }
    let res: string[][] = [];
    let uniforms = {};
    data.forEach((item, index) => {
        let obj: any = {};
        if (item.castShadows) {
            let { texture, viewProjectionMatrix } = rendererShadowMap(scene, item);
            setLight(name, 'shadowMap', index, obj, uniforms, texture);
            setLight(name, 'lightSpaceMatrix', index, obj, uniforms, viewProjectionMatrix.data);
            setLight(name, 'castShadows', index, obj, uniforms, item.castShadows);
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

function getUp(v: Vec3) {
    let up = new Vec3();
    if (v.z === 0) {
        up.set(0, 0, 1);
    } else {
        up.set(0, -v.z / v.y, 1);
    }
    return up;
}