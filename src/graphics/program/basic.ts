/**
 * File: c:\Users\35327\Githubs\hypergl\src\graphics\program\basic.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Wednesday, July 25th 2018, 11:44:50 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, July 26th 2018, 12:37:14 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

/* tslint:disable */
import { programlib } from './shader-help';
import { shaderChunks } from './chunks';
import { SEMANTIC, SHADER } from '../../hgl';
import { GraphicsDevice } from '../device';

export interface ShaderGenerate{
    generateKey?(device: GraphicsDevice, options);
    createShaderDefinition?(device: GraphicsDevice, options) 
}

export const basic = {
    generateKey(device: GraphicsDevice, options) {
        let key = 'basic';
        if (options.fog) key += '_fog';
        if (options.alphaTest) key += '_atst';
        if (options.vertexColors) key += '_vcol';
        if (options.diffuseMap) key += '_diff';
        key += `_${options.pass}`;
        return key;
    },

    createShaderDefinition(device: GraphicsDevice, options) {
        /////////////////////////
        // GENERATE ATTRIBUTES //
        /////////////////////////
        const attributes: any = {
            vertex_position: SEMANTIC.POSITION
        };
        if (options.skin) {
            attributes.vertex_boneWeights = SEMANTIC.BLENDWEIGHT;
            attributes.vertex_boneIndices = SEMANTIC.BLENDINDICES;
        }
        if (options.vertexColors) {
            attributes.vertex_color = SEMANTIC.COLOR;
        }
        if (options.diffuseMap) {
            attributes.vertex_texCoord0 = SEMANTIC.TEXCOORD0;
        }

        const chunks = shaderChunks;

        ////////////////////////////
        // GENERATE VERTEX SHADER //
        ////////////////////////////
        let code = '';

        // VERTEX SHADER DECLARATIONS
        code += chunks.transformDeclVS;

        if (options.skin) {
            code += programlib.skinCode(device);
            code += chunks.transformSkinnedVS;
        } else {
            code += chunks.transformVS;
        }

        if (options.vertexColors) {
            code += 'attribute vec4 vertex_color;\n';
            code += 'varying vec4 vColor;\n';
        }
        if (options.diffuseMap) {
            code += 'attribute vec2 vertex_texCoord0;\n';
            code += 'varying vec2 vUv0;\n';
        }

        if (options.pass === SHADER.DEPTH) {
            code += 'varying float vDepth;\n';
            code += '#ifndef VIEWMATRIX\n';
            code += '#define VIEWMATRIX\n';
            code += 'uniform mat4 matrix_view;\n';
            code += '#endif\n';
            code += '#ifndef CAMERAPLANES\n';
            code += '#define CAMERAPLANES\n';
            code += 'uniform vec4 camera_params;\n\n';
            code += '#endif\n';
        }

        // VERTEX SHADER BODY
        code += programlib.begin();

        code += '   gl_Position = getPosition();\n';

        if (options.pass === SHADER.DEPTH) {
            code += '    vDepth = -(matrix_view * vec4(getWorldPosition(),1.0)).z * camera_params.x;\n';
        }

        if (options.vertexColors) {
            code += '    vColor = vertex_color;\n';
        }
        if (options.diffuseMap) {
            code += '    vUv0 = vertex_texCoord0;\n';
        }

        code += programlib.end();

        const vshader = code;

        //////////////////////////////
        // GENERATE FRAGMENT SHADER //
        //////////////////////////////
        code = programlib.precisionCode(device);

        // FRAGMENT SHADER DECLARATIONS
        if (options.vertexColors) {
            code += 'varying vec4 vColor;\n';
        } else {
            code += 'uniform vec4 uColor;\n';
        }
        if (options.diffuseMap) {
            code += 'varying vec2 vUv0;\n';
            code += 'uniform sampler2D texture_diffuseMap;\n';
        }
        if (options.fog) {
            code += programlib.fogCode(options.fog);
        }
        if (options.alphatest) {
            code += chunks.alphaTestPS;
        }

        if (options.pass === SHADER.DEPTH) {
            // ##### SCREEN DEPTH PASS #####
            code += 'varying float vDepth;\n';
            code += chunks.packDepthPS;
        }

        // FRAGMENT SHADER BODY
        code += programlib.begin();

        // Read the map texels that the shader needs
        if (options.vertexColors) {
            code += '    gl_FragColor = vColor;\n';
        } else {
            code += '    gl_FragColor = uColor;\n';
        }
        if (options.diffuseMap) {
            code += '    gl_FragColor *= texture2D(texture_diffuseMap, vUv0);\n';
        }

        if (options.alphatest) {
            code += '   alphaTest(gl_FragColor.a);\n';
        }

        if (options.pass === SHADER.PICK) {
            // ##### PICK PASS #####
        } else if (options.pass === SHADER.DEPTH) {
            // ##### SCREEN DEPTH PASS #####
            code += '    gl_FragColor = packFloat(vDepth);\n';
        } else {
            // ##### FORWARD PASS #####
            if (options.fog) {
                code += '   glFragColor.rgb = addFog(gl_FragColor.rgb);\n';
            }
        }

        code += programlib.end();

        const fshader = code;

        return {
            attributes,
            vshader,
            fshader
        };
    }
};