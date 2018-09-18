/*
 * ProjectName: hypergl
 * FilePath: \src\scene\forward-renderer.ts
 * Created Date: Saturday, August 18th 2018, 10:15:48 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, September 19th 2018, 1:24:47 am
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
import { Log } from '../util';
import { Light, DirectionalLight, PointLight } from '../lights';
import { Camera } from './camera';
import { Vec3 } from '../math';



export function renderScence(scene: Scene) {
    let entitys = scene.layer;
    let lights = scene.lights;
    let camera = scene.activeCamera;
    let cameraViewProjectionMatrix = camera.viewProjectionMatrix;
    let directionalLightsUniforms = renderDirectionalLightArr('directionalLightArr', lights.directionalLights, scene);
    let pointLightsUniforms = renderPointLightArr('pointLightArr', lights.pointLights, scene);
    let LightsUniforms = { ...directionalLightsUniforms, ...pointLightsUniforms };
    let renderer = scene.app.rendererPlatform;
    renderer.initDraw();
    // TODO
    for (let i = 0; i < entitys.length; i++) {
        let entity = entitys[i];
        const mesh = entity.mesh;
        if (mesh == null) { return; }
        const material = mesh.material;
        let attributes: { [s: string]: SEMANTIC } = {};
        mesh.vertexBuffer.format.elements.forEach(x => {
            attributes[SEMANTICMAP[x.semantic]] = x.semantic;
        });
        material.setLights(LightsUniforms);
        // material.setDirectionalLightArr('directionalLightArr', lights.directionalLights, scene);
        // material.setPointLightArr('pointLightArr', lights.pointLights);
        material.updateShader(renderer, attributes);
        let shader = mesh.material.shader as Shader;
        renderer.setShaderProgram(shader as Shader);

        shader.setUniformValue('matrix_viewProjection', cameraViewProjectionMatrix.data);
        shader.setUniformValue('matrix_model', entity.getWorldTransform().data);
        shader.setUniformValue('matrix_normal', entity.getWorldTransform().clone().invert().transpose().data);
        shader.setUniformValue('camera_position', camera.getPosition().data);
        // tslint:disable-next-line:forin
        renderer.draw(entity);
    }
}

export function rendererShadowMap(scene: Scene, light: Light) {
    let entitys = scene.layer;
    let renderer = scene.app.rendererPlatform;
    let f = scene.createFrame();
    let camera = new Camera();

    if (light instanceof DirectionalLight) {
        let height = 20;
        let width = 1 * height;
        let length = 1 * height;
        camera.setOrtho(-width, width, -height, height, -length, length);
        let v = light.getPosition().sub(new Vec3(0, 0, 0));
        let up = new Vec3();
        if (v.z === 0) {
            up.set(0, 0, -1);
        } else {
            up.set(0, 1, -v.y / v.z);
        }
        // camera.setPosition(0, 0, 0);
        // console.log(light.direction);
        camera.setPosition(scene.activeCamera.getPosition());
        camera.lookAt(light.direction.clone().add(scene.activeCamera.getPosition()), up);
    }
    let attributes: { [s: string]: SEMANTIC } = { vertex_position: SEMANTIC.POSITION };
    let shader = renderer.programGenerator.getShader('shadow', attributes);
    shader.setUniformValue('matrix_viewProjection', camera.viewProjectionMatrix.data);

    // let gl = scene.app.rendererPlatform.gl;
    // gl.cullFace(gl.FRONT);
    f.beforeDraw();
    for (let i = 0; i < entitys.length; i++) {
        let entity = entitys[i];
        renderer.setShaderProgram(shader as Shader);
        shader.setUniformValue('matrix_model', entity.getWorldTransform().data);
        renderer.draw(entity);
    }
    f.afterDraw();
    // gl.cullFace(gl.BACK);
    return { texture: f.getTexture(), viewProjectionMatrix: camera.viewProjectionMatrix };
}

export function renderDirectionalLightArr(name: string, data: DirectionalLight[], scene: Scene) {
    let uniforms = {};
    let res: string[][] = [];

    data.forEach((item, index) => {
        let obj: any = {};
        if (item.castShadows) {
            let { texture, viewProjectionMatrix } = rendererShadowMap(scene, item);
            setLight(name, 'shadowMap', index, obj, uniforms, texture);
            setLight(name, 'lightSpaceMatrix', index, obj, uniforms, viewProjectionMatrix.data);
        }
        setLight(name, 'position', index, obj, uniforms, item.getPosition().data);
        setLight(name, 'color', index, obj, uniforms, item.color.data);
        setLight(name, 'direction', index, obj, uniforms, item.direction.normalize().data);
        res.push(obj);
    });
    uniforms['_' + name] = res;
    return uniforms;
}

export function renderPointLightArr(name: string, data: PointLight[], scene: Scene) {
    let res: string[][] = [];
    let uniforms = {};
    data.forEach((item, index) => {
        let obj: any = {};

        setLight(name, 'position', index, obj, uniforms, item.getPosition().data);

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