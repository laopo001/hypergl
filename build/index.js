/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./demo/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demo/index.ts":
/*!***********************!*\
  !*** ./demo/index.ts ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/index */ "./src/index.ts");
/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\demo\index.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Friday, July 13th 2018, 8:44:13 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, July 28th 2018, 12:54:01 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

// tslint:disable-next-line:no-duplicate-imports

var canvas = document.getElementById('canvas');
var app = new _src_index__WEBPACK_IMPORTED_MODULE_0__["Application"](canvas);
var device = app.device;
var format = new _src_index__WEBPACK_IMPORTED_MODULE_0__["VertexFormat"](device, [{
        semantic: _src_index__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"].POSITION,
        length: 3,
        dataType: _src_index__WEBPACK_IMPORTED_MODULE_0__["DataType"].FLOAT32,
        normalize: true
    }, {
        semantic: _src_index__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"].COLOR,
        length: 3,
        dataType: _src_index__WEBPACK_IMPORTED_MODULE_0__["DataType"].FLOAT32,
        normalize: true
    }]);
var vertices = new Float32Array([
    0, 0.5, -0.4, 0.4, 1, 0.4,
    -0.5, -0.5, -0.4, 0.4, 1, 0.4,
    0.5, -0.5, -0.4, 1, 0.4, 0.4,
    0.5, 0.4, -0.2, 1, 0.4, 0.4,
    -0.5, 0.4, -0.2, 1, 1, 0.4,
    0, -0.6, -0.2, 1, 1, 0.4,
    0, 0.5, 0, 0.4, 0.4, 1,
    -0.5, -0.5, 0, 0.4, 0.4, 1,
    0.5, -0.5, 0, 1, 0.4, 0.4
]);
var buffer = new _src_index__WEBPACK_IMPORTED_MODULE_0__["VertexBuffer"](device, format, 9, _src_index__WEBPACK_IMPORTED_MODULE_0__["BUFFER"].STATIC, vertices.buffer);
var m = new _src_index__WEBPACK_IMPORTED_MODULE_0__["BasicMaterial"]();
console.log(m);
var s = device.programLib.getProgram('basic', m);
console.log(s);


/***/ }),

/***/ "./src/application/application.ts":
/*!****************************************!*\
  !*** ./src/application/application.ts ***!
  \****************************************/
/*! exports provided: Application */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return Application; });
/* harmony import */ var _graphics_device__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../graphics/device */ "./src/graphics/device.ts");
/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\application\application.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Thursday, July 12th 2018, 7:51:04 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, July 15th 2018, 3:49:02 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

var Application = /** @class */ (function () {
    function Application(canvas, option) {
        this.activeIndex = 0;
        this.device = new _graphics_device__WEBPACK_IMPORTED_MODULE_0__["GraphicsDevice"](canvas);
    }
    Application.prototype.start = function () {
        var scene = this.sceneInstances[this.activeIndex];
    };
    Application.prototype.add = function (scene) {
        this.sceneInstances.push(scene);
    };
    return Application;
}());



/***/ }),

/***/ "./src/core/color.ts":
/*!***************************!*\
  !*** ./src/core/color.ts ***!
  \***************************/
/*! exports provided: Color */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return Color; });
/* harmony import */ var _math_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/math */ "./src/math/math.ts");
/**
 * File: c:\Users\35327\Githubs\hypergl\src\core\color.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Friday, July 27th 2018, 1:06:46 am
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, July 27th 2018, 1:12:02 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */
/* tslint:disable */

var Color = /** @class */ (function () {
    function Color(r, g, b, a) {
        this.buffer = new ArrayBuffer(4 * 4);
        this.data = new Float32Array(this.buffer, 0, 4);
        this.data3 = new Float32Array(this.buffer, 0, 3);
        var length = r && r.length;
        if (length === 3 || length === 4) {
            this.data[0] = r[0];
            this.data[1] = r[1];
            this.data[2] = r[2];
            this.data[3] = r[3] !== undefined ? r[3] : 1.0;
        }
        else {
            this.data[0] = r || 0;
            this.data[1] = g || 0;
            this.data[2] = b || 0;
            this.data[3] = a !== undefined ? a : 1.0;
        }
    }
    Color.prototype.clone = function () {
        return new Color(this.data[0], this.data[1], this.data[2], this.data[3]);
    };
    Color.prototype.copy = function (_a) {
        var data = _a.data;
        var a = this.data, b = data;
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        a[3] = b[3];
        return this;
    };
    Color.prototype.set = function (r, g, b, a) {
        var c = this.data;
        c[0] = r;
        c[1] = g;
        c[2] = b;
        c[3] = (a === undefined) ? 1 : a;
        return this;
    };
    Color.prototype.fromString = function (hex) {
        var i = parseInt(hex.replace('#', '0x'));
        var bytes;
        if (hex.length > 7) {
            bytes = Object(_math_math__WEBPACK_IMPORTED_MODULE_0__["intToBytes32"])(i);
        }
        else {
            bytes = Object(_math_math__WEBPACK_IMPORTED_MODULE_0__["intToBytes24"])(i);
            bytes[3] = 255;
        }
        this.set(bytes[0] / 255, bytes[1] / 255, bytes[2] / 255, bytes[3] / 255);
        return this;
    };
    Color.prototype.toString = function (alpha) {
        var s = "#" + ((1 << 24) + (parseInt((this.r * 255).toString()) << 16) + (parseInt((this.g * 255).toString()) << 8) + parseInt((this.b * 255).toString())).toString(16).slice(1);
        if (alpha === true) {
            var a = parseInt((this.a * 255).toString()).toString(16);
            if (this.a < 16 / 255) {
                s += "0" + a;
            }
            else {
                s += a;
            }
        }
        return s;
    };
    Object.defineProperty(Color.prototype, "r", {
        get: function () {
            return this.data[0];
        },
        set: function (value) {
            this.data[0] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "g", {
        get: function () {
            return this.data[1];
        },
        set: function (value) {
            this.data[1] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "b", {
        get: function () {
            return this.data[2];
        },
        set: function (value) {
            this.data[2] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "a", {
        get: function () {
            return this.data[3];
        },
        set: function (value) {
            this.data[3] = value;
        },
        enumerable: true,
        configurable: true
    });
    return Color;
}());



/***/ }),

/***/ "./src/core/element.ts":
/*!*****************************!*\
  !*** ./src/core/element.ts ***!
  \*****************************/
/*! exports provided: IElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IElement", function() { return IElement; });
/* harmony import */ var _math_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/math */ "./src/math/math.ts");
/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\core\component.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Wednesday, July 11th 2018, 9:02:00 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, July 13th 2018, 6:55:36 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

var ComponentIdCount = 0;
var IElement = /** @class */ (function () {
    function IElement() {
        this.id = ComponentIdCount++;
        this.uuid = Object(_math_math__WEBPACK_IMPORTED_MODULE_0__["generateUUID"])();
        this.name = '';
        this.tag = '';
        this.enable = true;
    }
    return IElement;
}());



/***/ }),

/***/ "./src/graphics/device.ts":
/*!********************************!*\
  !*** ./src/graphics/device.ts ***!
  \********************************/
/*! exports provided: GraphicsDevice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphicsDevice", function() { return GraphicsDevice; });
/* harmony import */ var _program_scope_space__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./program/scope-space */ "./src/graphics/program/scope-space.ts");
/* harmony import */ var _program_program_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./program/program-library */ "./src/graphics/program/program-library.ts");
/* harmony import */ var _program_shader_help__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./program/shader-help */ "./src/graphics/program/shader-help.ts");
/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\graphics\device.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Thursday, July 12th 2018, 7:49:57 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, July 28th 2018, 6:01:15 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */



var GraphicsDevice = /** @class */ (function () {
    function GraphicsDevice(canvas) {
        this.canvas = canvas;
        this.webgl2 = false;
        this.shaders = [];
        this.buffers = [];
        this.vertexBuffers = [];
        this.vbOffsets = [];
        this.attributesInvalidated = true;
        this.enabledAttributes = {};
        this.precision = 'mediump';
        this._shaderStats = {
            vsCompiled: 0,
            fsCompiled: 0,
            linked: 0,
            materialShaders: 0,
            compileTime: 0
        };
        this._vram = {
            // #ifdef PROFILER
            texShadow: 0,
            texAsset: 0,
            texLightmap: 0,
            // #endif
            tex: 0,
            vb: 0,
            ib: 0
        };
        this.boneLimit = 128;
        this._shaderSwitchesPerFrame = 0;
        this.gl = canvas.getContext('webgl');
        this.scope = new _program_scope_space__WEBPACK_IMPORTED_MODULE_0__["ScopeSpace"]('Device');
        this.programLib = new _program_program_library__WEBPACK_IMPORTED_MODULE_1__["ProgramLibrary"](this);
        // tslint:disable-next-line:forin
        for (var generator in _program_shader_help__WEBPACK_IMPORTED_MODULE_2__["generators"]) {
            this.programLib.register(generator, _program_shader_help__WEBPACK_IMPORTED_MODULE_2__["generators"][generator]);
        }
    }
    GraphicsDevice.prototype.initializeExtensions = function () {
        var gl = this.gl;
        if (this.webgl2) {
            this.extBlendMinmax = true;
            this.extDrawBuffers = true;
            this.extInstancing = true;
            this.extStandardDerivatives = true;
            this.extTextureFloat = true;
            this.extTextureHalfFloat = true;
            this.extTextureHalfFloatLinear = true;
            this.extTextureFloat = true;
            this.extUintElement = true;
        }
        else {
            this.extBlendMinmax = gl.getExtension('EXT_blend_minmax');
            this.extDrawBuffers = gl.getExtension('EXT_draw_buffers');
            this.extInstancing = gl.getExtension('ANGLE_instanced_arrays');
            this.extStandardDerivatives = gl.getExtension('OES_standard_derivatives');
            this.extTextureFloat = gl.getExtension('OES_texture_float');
            this.extTextureHalfFloat = gl.getExtension('OES_texture_half_float');
            this.extTextureHalfFloatLinear = gl.getExtension('OES_texture_half_float_linear');
            this.extTextureLod = gl.getExtension('EXT_shader_texture_lod');
            this.extUintElement = gl.getExtension('OES_element_index_uint');
        }
        this.extRendererInfo = gl.getExtension('WEBGL_debug_renderer_info');
        this.extTextureFloatLinear = gl.getExtension('OES_texture_float_linear');
        this.extColorBufferFloat = gl.getExtension('EXT_color_buffer_float');
        this.extTextureFilterAnisotropic = gl.getExtension('EXT_texture_filter_anisotropic') ||
            gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic');
        this.extCompressedTextureETC1 = gl.getExtension('WEBGL_compressed_texture_etc1');
        this.extCompressedTexturePVRTC = gl.getExtension('WEBGL_compressed_texture_pvrtc') ||
            gl.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc');
        this.extCompressedTextureS3TC = gl.getExtension('WEBGL_compressed_texture_s3tc') ||
            gl.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc');
        // IE 11 can't use mip maps with S3TC
        if (this.extCompressedTextureS3TC && _isIE()) {
            this.extCompressedTextureS3TC = null;
        }
    };
    GraphicsDevice.prototype.getBoneLimit = function () {
        return this.boneLimit;
    };
    GraphicsDevice.prototype.setShader = function (shader) {
        if (shader !== this.shader) {
            this.shader = shader;
            if (!shader.ready) {
                if (!shader.link()) {
                    return false;
                }
            }
            // Set the active shader
            this._shaderSwitchesPerFrame++;
            this.gl.useProgram(shader.program);
            this.attributesInvalidated = true;
        }
        return true;
    };
    GraphicsDevice.prototype.removeShaderFromCache = function (shader) {
        this.programLib.removeFromCache(shader);
    };
    return GraphicsDevice;
}());

function _isIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = navigator.userAgent.match(/Trident.*rv:11\./);
    return (msie > 0 || !!trident);
}


/***/ }),

/***/ "./src/graphics/program/basic.ts":
/*!***************************************!*\
  !*** ./src/graphics/program/basic.ts ***!
  \***************************************/
/*! exports provided: basic */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "basic", function() { return basic; });
/* harmony import */ var _shader_help__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shader-help */ "./src/graphics/program/shader-help.ts");
/* harmony import */ var _chunks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunks */ "./src/graphics/program/chunks.ts");
/* harmony import */ var _hgl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hgl */ "./src/hgl.ts");
/**
 * File: c:\Users\35327\Githubs\hypergl\src\graphics\program\basic.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Wednesday, July 25th 2018, 11:44:50 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, July 28th 2018, 12:30:50 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */
/* tslint:disable */



var basic = {
    generateKey: function (device, options) {
        var key = 'basic';
        if (options.fog)
            key += '_fog';
        if (options.alphaTest)
            key += '_atst';
        if (options.vertexColors)
            key += '_vcol';
        if (options.diffuseMap)
            key += '_diff';
        key += "_" + options.pass;
        return key;
    },
    createShaderDefinition: function (device, options) {
        /////////////////////////
        // GENERATE ATTRIBUTES //
        /////////////////////////
        var attributes = {
            vertex_position: _hgl__WEBPACK_IMPORTED_MODULE_2__["SEMANTIC"].POSITION
        };
        if (options.skin) {
            attributes.vertex_boneWeights = _hgl__WEBPACK_IMPORTED_MODULE_2__["SEMANTIC"].BLENDWEIGHT;
            attributes.vertex_boneIndices = _hgl__WEBPACK_IMPORTED_MODULE_2__["SEMANTIC"].BLENDINDICES;
        }
        if (options.vertexColors) {
            attributes.vertex_color = _hgl__WEBPACK_IMPORTED_MODULE_2__["SEMANTIC"].COLOR;
        }
        if (options.diffuseMap) {
            attributes.vertex_texCoord0 = _hgl__WEBPACK_IMPORTED_MODULE_2__["SEMANTIC"].TEXCOORD0;
        }
        var chunks = _chunks__WEBPACK_IMPORTED_MODULE_1__["shaderChunks"];
        ////////////////////////////
        // GENERATE VERTEX SHADER //
        ////////////////////////////
        var code = '';
        // VERTEX SHADER DECLARATIONS
        code += chunks.transformDeclVS;
        if (options.skin) {
            code += _shader_help__WEBPACK_IMPORTED_MODULE_0__["programlib"].skinCode(device);
            code += chunks.transformSkinnedVS;
        }
        else {
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
        if (options.pass === _hgl__WEBPACK_IMPORTED_MODULE_2__["SHADER"].DEPTH) {
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
        code += _shader_help__WEBPACK_IMPORTED_MODULE_0__["programlib"].begin();
        code += '   gl_Position = getPosition();\n';
        if (options.pass === _hgl__WEBPACK_IMPORTED_MODULE_2__["SHADER"].DEPTH) {
            code += '    vDepth = -(matrix_view * vec4(getWorldPosition(),1.0)).z * camera_params.x;\n';
        }
        if (options.vertexColors) {
            code += '    vColor = vertex_color;\n';
        }
        if (options.diffuseMap) {
            code += '    vUv0 = vertex_texCoord0;\n';
        }
        code += _shader_help__WEBPACK_IMPORTED_MODULE_0__["programlib"].end();
        var vshader = code;
        //////////////////////////////
        // GENERATE FRAGMENT SHADER //
        //////////////////////////////
        code = _shader_help__WEBPACK_IMPORTED_MODULE_0__["programlib"].precisionCode(device);
        // FRAGMENT SHADER DECLARATIONS
        if (options.vertexColors) {
            code += 'varying vec4 vColor;\n';
        }
        else {
            code += 'uniform vec4 uColor;\n';
        }
        if (options.diffuseMap) {
            code += 'varying vec2 vUv0;\n';
            code += 'uniform sampler2D texture_diffuseMap;\n';
        }
        if (options.fog) {
            code += _shader_help__WEBPACK_IMPORTED_MODULE_0__["programlib"].fogCode(options.fog);
        }
        if (options.alphatest) {
            code += chunks.alphaTestPS;
        }
        if (options.pass === _hgl__WEBPACK_IMPORTED_MODULE_2__["SHADER"].DEPTH) {
            // ##### SCREEN DEPTH PASS #####
            code += 'varying float vDepth;\n';
            code += chunks.packDepthPS;
        }
        // FRAGMENT SHADER BODY
        code += _shader_help__WEBPACK_IMPORTED_MODULE_0__["programlib"].begin();
        // Read the map texels that the shader needs
        if (options.vertexColors) {
            code += '    gl_FragColor = vColor;\n';
        }
        else {
            code += '    gl_FragColor = uColor;\n';
        }
        if (options.diffuseMap) {
            code += '    gl_FragColor *= texture2D(texture_diffuseMap, vUv0);\n';
        }
        if (options.alphatest) {
            code += '   alphaTest(gl_FragColor.a);\n';
        }
        if (options.pass === _hgl__WEBPACK_IMPORTED_MODULE_2__["SHADER"].PICK) {
            // ##### PICK PASS #####
        }
        else if (options.pass === _hgl__WEBPACK_IMPORTED_MODULE_2__["SHADER"].DEPTH) {
            // ##### SCREEN DEPTH PASS #####
            code += '    gl_FragColor = packFloat(vDepth);\n';
        }
        else {
            // ##### FORWARD PASS #####
            if (options.fog) {
                code += '   glFragColor.rgb = addFog(gl_FragColor.rgb);\n';
            }
        }
        code += _shader_help__WEBPACK_IMPORTED_MODULE_0__["programlib"].end();
        var fshader = code;
        return {
            attributes: attributes,
            vshader: vshader,
            fshader: fshader
        };
    }
};


/***/ }),

/***/ "./src/graphics/program/chunks.ts":
/*!****************************************!*\
  !*** ./src/graphics/program/chunks.ts ***!
  \****************************************/
/*! exports provided: shaderChunks, collectAttribs, createShader, createShaderFromCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shaderChunks", function() { return shaderChunks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "collectAttribs", function() { return collectAttribs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createShader", function() { return createShader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createShaderFromCode", function() { return createShaderFromCode; });
/* harmony import */ var _hgl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../hgl */ "./src/hgl.ts");
/* harmony import */ var _shader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shader */ "./src/graphics/program/shader.ts");
/* harmony import */ var _shader_help__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shader-help */ "./src/graphics/program/shader-help.ts");
/* harmony import */ var _shaders_base_vert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shaders/base.vert */ "./src/graphics/program/shaders/base.vert");
/* harmony import */ var _shaders_base_vert__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_shaders_base_vert__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _shaders_fogLinear_frag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shaders/fogLinear.frag */ "./src/graphics/program/shaders/fogLinear.frag");
/* harmony import */ var _shaders_fogLinear_frag__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_shaders_fogLinear_frag__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _shaders_fogExp_frag__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shaders/fogExp.frag */ "./src/graphics/program/shaders/fogExp.frag");
/* harmony import */ var _shaders_fogExp_frag__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_shaders_fogExp_frag__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _shaders_fogExp2_frag__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shaders/fogExp2.frag */ "./src/graphics/program/shaders/fogExp2.frag");
/* harmony import */ var _shaders_fogExp2_frag__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_shaders_fogExp2_frag__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _shaders_fogNone_frag__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./shaders/fogNone.frag */ "./src/graphics/program/shaders/fogNone.frag");
/* harmony import */ var _shaders_fogNone_frag__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_shaders_fogNone_frag__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _shaders_transformDecl_vert__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./shaders/transformDecl.vert */ "./src/graphics/program/shaders/transformDecl.vert");
/* harmony import */ var _shaders_transformDecl_vert__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_shaders_transformDecl_vert__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _shaders_transform_vert__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./shaders/transform.vert */ "./src/graphics/program/shaders/transform.vert");
/* harmony import */ var _shaders_transform_vert__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_shaders_transform_vert__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _shaders_alphaTest_frag__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./shaders/alphaTest.frag */ "./src/graphics/program/shaders/alphaTest.frag");
/* harmony import */ var _shaders_alphaTest_frag__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_shaders_alphaTest_frag__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _shaders_packDepth_frag__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./shaders/packDepth.frag */ "./src/graphics/program/shaders/packDepth.frag");
/* harmony import */ var _shaders_packDepth_frag__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_shaders_packDepth_frag__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _shaders_gles3_vert__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./shaders/gles3.vert */ "./src/graphics/program/shaders/gles3.vert");
/* harmony import */ var _shaders_gles3_vert__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_shaders_gles3_vert__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _shaders_gles3_frag__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./shaders/gles3.frag */ "./src/graphics/program/shaders/gles3.frag");
/* harmony import */ var _shaders_gles3_frag__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_shaders_gles3_frag__WEBPACK_IMPORTED_MODULE_13__);
/**
 * File: c:\Users\35327\Githubs\hypergl\src\graphics\program\shaders\chunks.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Sunday, July 15th 2018, 6:20:58 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, July 28th 2018, 1:44:10 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */
// module shaderChunks










// import * as transformVS from './shaders/transform.vert';




var attrib2Semantic = {
    vertex_position: _hgl__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"].POSITION,
    vertex_normal: _hgl__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"].NORMAL,
    vertex_tangent: _hgl__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"].TANGENT,
    vertex_texCoord0: _hgl__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"].TEXCOORD0,
    vertex_texCoord1: _hgl__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"].TEXCOORD1,
    vertex_texCoord2: _hgl__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"].TEXCOORD2,
    vertex_texCoord3: _hgl__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"].TEXCOORD3,
    vertex_texCoord4: _hgl__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"].TEXCOORD4,
    vertex_texCoord5: _hgl__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"].TEXCOORD5,
    vertex_texCoord6: _hgl__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"].TEXCOORD6,
    vertex_texCoord7: _hgl__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"].TEXCOORD7,
    vertex_color: _hgl__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"].COLOR,
    vertex_boneIndices: _hgl__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"].BLENDINDICES,
    vertex_boneWeights: _hgl__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"].BLENDWEIGHT
};
var transformSkinnedVS = "#define SKIN\n" + _shaders_transform_vert__WEBPACK_IMPORTED_MODULE_9__;
var shaderChunks = {
    base: _shaders_base_vert__WEBPACK_IMPORTED_MODULE_3__,
    fogLinearPS: _shaders_fogLinear_frag__WEBPACK_IMPORTED_MODULE_4__,
    fogExpPS: _shaders_fogExp_frag__WEBPACK_IMPORTED_MODULE_5__,
    fogExp2PS: _shaders_fogExp2_frag__WEBPACK_IMPORTED_MODULE_6__,
    fogNonePS: _shaders_fogNone_frag__WEBPACK_IMPORTED_MODULE_7__,
    transformDeclVS: _shaders_transformDecl_vert__WEBPACK_IMPORTED_MODULE_8__,
    transformVS: _shaders_transform_vert__WEBPACK_IMPORTED_MODULE_9__,
    transformSkinnedVS: transformSkinnedVS,
    alphaTestPS: _shaders_alphaTest_frag__WEBPACK_IMPORTED_MODULE_10__,
    packDepthPS: _shaders_packDepth_frag__WEBPACK_IMPORTED_MODULE_11__,
    gles3VS: _shaders_gles3_vert__WEBPACK_IMPORTED_MODULE_12__,
    gles3PS: _shaders_gles3_frag__WEBPACK_IMPORTED_MODULE_13__
};
function collectAttribs(vsCode) {
    var attribs = {};
    var attrs = 0;
    var found = vsCode.indexOf('attribute');
    while (found >= 0) {
        if (found > 0 && vsCode[found - 1] === '/')
            break;
        var endOfLine = vsCode.indexOf(';', found);
        var startOfAttribName = vsCode.lastIndexOf(' ', endOfLine);
        var attribName = vsCode.substr(startOfAttribName + 1, endOfLine - (startOfAttribName + 1));
        var semantic = attrib2Semantic[attribName];
        if (semantic !== undefined) {
            attribs[attribName] = semantic;
        }
        else {
            attribs[attribName] = 'ATTR' + attrs;
            attrs++;
        }
        found = vsCode.indexOf('attribute', found + 1);
    }
    return attribs;
}
function createShader(device, vsName, psName, useTransformFeedback) {
    var vsCode = shaderChunks[vsName];
    var psCode = _shader_help__WEBPACK_IMPORTED_MODULE_2__["programlib"].precisionCode(device) + '\n' + shaderChunks[psName];
    var attribs = collectAttribs(vsCode);
    if (device.webgl2) {
        vsCode = _shader_help__WEBPACK_IMPORTED_MODULE_2__["programlib"].versionCode(device) + shaderChunks.gles3VS + vsCode;
        psCode = _shader_help__WEBPACK_IMPORTED_MODULE_2__["programlib"].versionCode(device) + shaderChunks.gles3PS + psCode;
    }
    return new _shader__WEBPACK_IMPORTED_MODULE_1__["Shader"](device, {
        attributes: attribs,
        vshader: vsCode,
        fshader: psCode,
        useTransformFeedback: useTransformFeedback
    });
}
function createShaderFromCode(device, vsCode, psCode, uName, useTransformFeedback) {
    var shaderCache = device.programLib._cache;
    var cached = shaderCache[uName];
    if (cached !== undefined)
        return cached;
    // tslint:disable-next-line:no-parameter-reassignment
    psCode = _shader_help__WEBPACK_IMPORTED_MODULE_2__["programlib"].precisionCode(device) + '\n' + (psCode || _shader_help__WEBPACK_IMPORTED_MODULE_2__["programlib"].dummyFragmentCode());
    var attribs = collectAttribs(vsCode);
    if (device.webgl2) {
        // tslint:disable-next-line:no-parameter-reassignment
        vsCode = _shader_help__WEBPACK_IMPORTED_MODULE_2__["programlib"].versionCode(device) + shaderChunks.gles3VS + vsCode;
        // tslint:disable-next-line:no-parameter-reassignment
        psCode = _shader_help__WEBPACK_IMPORTED_MODULE_2__["programlib"].versionCode(device) + shaderChunks.gles3PS + psCode;
    }
    shaderCache[uName] = new _shader__WEBPACK_IMPORTED_MODULE_1__["Shader"](device, {
        attributes: attribs,
        vshader: vsCode,
        fshader: psCode,
        useTransformFeedback: useTransformFeedback
    });
    return shaderCache[uName];
}


/***/ }),

/***/ "./src/graphics/program/program-library.ts":
/*!*************************************************!*\
  !*** ./src/graphics/program/program-library.ts ***!
  \*************************************************/
/*! exports provided: ProgramLibrary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgramLibrary", function() { return ProgramLibrary; });
/* harmony import */ var _shader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shader */ "./src/graphics/program/shader.ts");
/**
 * File: c:\Users\35327\Githubs\hypergl\src\graphics\program\program-library.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Thursday, July 26th 2018, 12:28:45 am
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, July 28th 2018, 2:22:42 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

var ProgramLibrary = /** @class */ (function () {
    function ProgramLibrary(device) {
        this._cache = {};
        this._generators = {};
        this._isClearingCache = false;
        this._device = device;
    }
    ProgramLibrary.prototype.register = function (name, generator) {
        if (!this.isRegistered(name)) {
            this._generators[name] = generator;
        }
    };
    ProgramLibrary.prototype.unregister = function (name) {
        if (this.isRegistered(name)) {
            delete this._generators[name];
        }
    };
    ProgramLibrary.prototype.isRegistered = function (name) {
        var generator = this._generators[name];
        return (generator !== undefined);
    };
    ProgramLibrary.prototype.getProgram = function (name, options) {
        var generator = this._generators[name];
        if (generator === undefined) {
            console.error("No program library functions registered for: " + name);
            return null;
        }
        var gd = this._device;
        var key = generator.generateKey(gd, options); // TODO: gd is never used in generateKey(), remove?
        var shader = this._cache[key];
        if (!shader) {
            var shaderDefinition = generator.createShaderDefinition(gd, options);
            shader = this._cache[key] = new _shader__WEBPACK_IMPORTED_MODULE_0__["Shader"](gd, shaderDefinition);
        }
        return shader;
    };
    ProgramLibrary.prototype.clearCache = function () {
        var cache = this._cache;
        this._isClearingCache = true;
        for (var key in cache) {
            if (cache.hasOwnProperty(key)) {
                cache[key].destroy();
            }
        }
        this._cache = {};
        this._isClearingCache = false;
    };
    ProgramLibrary.prototype.removeFromCache = function (shader) {
        if (this._isClearingCache)
            return; // don't delete by one when clearing whole cache
        var cache = this._cache;
        for (var key in cache) {
            if (cache.hasOwnProperty(key)) {
                if (cache[key] === shader) {
                    delete cache[key];
                    break;
                }
            }
        }
    };
    return ProgramLibrary;
}());



/***/ }),

/***/ "./src/graphics/program/scope-id.ts":
/*!******************************************!*\
  !*** ./src/graphics/program/scope-id.ts ***!
  \******************************************/
/*! exports provided: ScopeId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScopeId", function() { return ScopeId; });
/* harmony import */ var _versioned_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./versioned-object */ "./src/graphics/program/versioned-object.ts");
/**
 * File: c:\Users\35327\Githubs\hypergl\src\graphics\program\scope-id.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Wednesday, July 25th 2018, 12:50:16 am
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, July 25th 2018, 12:51:34 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

var ScopeId = /** @class */ (function () {
    function ScopeId(name) {
        // Set the name
        this.name = name;
        // Set the default value
        this.value = null;
        // Create the version object
        this.versionObject = new _versioned_object__WEBPACK_IMPORTED_MODULE_0__["VersionedObject"]();
    }
    ScopeId.prototype.setValue = function (value) {
        // Set the new value
        this.value = value;
        // Increment the revision
        this.versionObject.increment();
    };
    ScopeId.prototype.getValue = function (value) {
        return this.value;
    };
    return ScopeId;
}());



/***/ }),

/***/ "./src/graphics/program/scope-space.ts":
/*!*********************************************!*\
  !*** ./src/graphics/program/scope-space.ts ***!
  \*********************************************/
/*! exports provided: ScopeSpace */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScopeSpace", function() { return ScopeSpace; });
/* harmony import */ var _scope_id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scope-id */ "./src/graphics/program/scope-id.ts");
/**
 * File: c:\Users\35327\Githubs\hypergl\src\graphics\program\scope-space.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Wednesday, July 25th 2018, 12:48:54 am
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, July 25th 2018, 12:50:42 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

var ScopeSpace = /** @class */ (function () {
    function ScopeSpace(name) {
        // Store the name
        this.name = name;
        // Create the empty tables
        this.variables = {};
        this.namespaces = {};
    }
    ScopeSpace.prototype.resolve = function (name) {
        // Check if the ScopeId already exists
        if (this.variables.hasOwnProperty(name) === false) {
            // Create and add to the table
            this.variables[name] = new _scope_id__WEBPACK_IMPORTED_MODULE_0__["ScopeId"](name);
        }
        // Now return the ScopeId instance
        return this.variables[name];
    };
    ScopeSpace.prototype.getSubSpace = function (name) {
        // Check if the nested namespace already exists
        if (this.namespaces.hasOwnProperty(name) === false) {
            // Create and add to the table
            this.namespaces[name] = new ScopeSpace(name);
            console.log("Added ScopeSpace: " + name);
        }
        // Now return the ScopeNamespace instance
        return this.namespaces[name];
    };
    return ScopeSpace;
}());



/***/ }),

/***/ "./src/graphics/program/shader-help.ts":
/*!*********************************************!*\
  !*** ./src/graphics/program/shader-help.ts ***!
  \*********************************************/
/*! exports provided: programlib, generators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "programlib", function() { return programlib; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generators", function() { return generators; });
/* harmony import */ var _chunks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunks */ "./src/graphics/program/chunks.ts");
/* harmony import */ var _basic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./basic */ "./src/graphics/program/basic.ts");
/**
 * File: c:\Users\35327\Githubs\hypergl\src\graphics\program\shader-help.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Sunday, July 15th 2018, 4:05:06 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, July 27th 2018, 12:05:47 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */


var programlib = {
    fogCode: function (value) {
        if (value === 'linear') {
            return _chunks__WEBPACK_IMPORTED_MODULE_0__["shaderChunks"].fogLinearPS;
        }
        else if (value === 'exp') {
            return _chunks__WEBPACK_IMPORTED_MODULE_0__["shaderChunks"].fogExpPS;
        }
        else if (value === 'exp2') {
            return _chunks__WEBPACK_IMPORTED_MODULE_0__["shaderChunks"].fogExp2PS;
        }
        else {
            return _chunks__WEBPACK_IMPORTED_MODULE_0__["shaderChunks"].fogNonePS;
        }
    },
    skinCode: function (device, chunks) {
        // tslint:disable-next-line:no-parameter-reassignment
        if (!chunks)
            chunks = _chunks__WEBPACK_IMPORTED_MODULE_0__["shaderChunks"];
        if (device.supportsBoneTextures) {
            return chunks.skinTexVS;
        }
        else {
            return "#define BONE_LIMIT " + device.getBoneLimit() + "\n" + chunks.skinConstVS;
        }
    },
    precisionCode: function (device) {
        var pcode = 'precision ' + device.precision + ' float;\n';
        if (device.webgl2) {
            pcode += '#ifdef GL2\nprecision ' + device.precision + ' sampler2DShadow;\n#endif\n';
        }
        return pcode;
    },
    versionCode: function (device) {
        return device.webgl2 ? '#version 300 es\n' : '';
    },
    dummyFragmentCode: function () {
        return 'void main(void) {gl_FragColor = vec4(0.0);}';
    },
    begin: function () {
        return 'void main(void)\n{\n';
    },
    end: function () {
        return '}\n';
    }
};
var generators = {
    basic: _basic__WEBPACK_IMPORTED_MODULE_1__["basic"]
};


/***/ }),

/***/ "./src/graphics/program/shader-input.ts":
/*!**********************************************!*\
  !*** ./src/graphics/program/shader-input.ts ***!
  \**********************************************/
/*! exports provided: ShaderInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShaderInput", function() { return ShaderInput; });
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./version */ "./src/graphics/program/version.ts");
/**
 * File: c:\Users\35327\Githubs\hypergl\src\graphics\program\shader-input.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Sunday, July 22nd 2018, 8:17:19 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, July 25th 2018, 12:46:23 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

var ShaderInput = /** @class */ (function () {
    function ShaderInput(graphicsDevice, name, type, locationId) {
        this.locationId = locationId;
        this.value = [null, null, null, null];
        // Array to hold texture unit ids
        this.array = [];
        this.dataType = type;
        this.version = new _version__WEBPACK_IMPORTED_MODULE_0__["Version"]();
        this.scopeId = graphicsDevice.scope.resolve(name);
        // if (type === UNIFORMTYPE.FLOAT) {
        //     // tslint:disable-next-line:no-parameter-reassignment
        //     if (name.substr(name.length - 3) === '[0]') { type = UNIFORMTYPE.FLOATARRAY; }
        // }
    }
    return ShaderInput;
}());



/***/ }),

/***/ "./src/graphics/program/shader.ts":
/*!****************************************!*\
  !*** ./src/graphics/program/shader.ts ***!
  \****************************************/
/*! exports provided: Shader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Shader", function() { return Shader; });
/* harmony import */ var _hgl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../hgl */ "./src/hgl.ts");
/* harmony import */ var _shader_input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shader-input */ "./src/graphics/program/shader-input.ts");
/**
 * File: c:\Users\35327\Githubs\hypergl\src\graphics\program\shader.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Sunday, July 15th 2018, 6:08:20 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
<<<<<<< HEAD
 * Last Modified: Saturday, July 28th 2018, 2:30:12 am
=======
 * Last Modified: Saturday, July 28th 2018, 2:30:12 am
>>>>>>> a59a1a480c976e9f2165e74cf2fca136d87fc14f
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */


function addLineNumbers(src) {
    var chunks = src.split('\n');
    // Chrome reports shader errors on lines indexed from 1
    for (var i = 0, len = chunks.length; i < len; i++) {
        chunks[i] = (i + 1) + ':\t' + chunks[i];
    }
    return chunks.join('\n');
}
function createShader(gl, type, src) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    return shader;
}
function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    return program;
}
var Shader = /** @class */ (function () {
    function Shader(device, definition) {
        this.device = device;
        this.definition = definition;
        this._refCount = 0;
        this.device = device;
        this.definition = definition;
        // Used for shader variants (see pc.Material)
        // this._refCount = 0;
        this.compile();
        this.device.shaders.push(this);
    }
    Shader.prototype.compile = function () {
        this.ready = false;
        var gl = this.device.gl;
        var startTime = new Date().getTime();
        this.vshader = createShader(gl, gl.VERTEX_SHADER, this.definition.vshader);
        this.fshader = createShader(gl, gl.FRAGMENT_SHADER, this.definition.fshader);
        this.program = createProgram(gl, this.vshader, this.fshader);
        this.device._shaderStats.vsCompiled++;
        this.device._shaderStats.fsCompiled++;
        this.device._shaderStats.linked++;
        if (this.definition.tag === _hgl__WEBPACK_IMPORTED_MODULE_0__["SHADERTAG_MATERIAL"]) {
            this.device._shaderStats.materialShaders++;
        }
        this.device._shaderStats.compileTime += new Date().getTime() - startTime;
    };
    Shader.prototype.link = function () {
        var gl = this.device.gl;
        var retValue = true;
        var startTime = new Date().getTime();
        if (this.device.webgl2 && this.definition.useTransformFeedback) {
            // Collect all "out_" attributes and use them for output
            var attrs = this.definition.attributes;
            var outNames = [];
            for (var attr in attrs) {
                if (attrs.hasOwnProperty(attr)) {
                    outNames.push('out_' + attr);
                }
            }
            // gl.transformFeedbackVaryings(this.program, outNames, gl.INTERLEAVED_ATTRIBS);
        }
        gl.linkProgram(this.program);
        // check for errors
        // vshader
        if (!gl.getShaderParameter(this.vshader, gl.COMPILE_STATUS)) {
            console.error('Failed to compile vertex shader:\n\n' + addLineNumbers(this.definition.vshader) + '\n\n' + gl.getShaderInfoLog(this.vshader));
            retValue = false;
        }
        // fshader
        if (!gl.getShaderParameter(this.fshader, gl.COMPILE_STATUS)) {
            console.error('Failed to compile fragment shader:\n\n' + addLineNumbers(this.definition.fshader) + '\n\n' + gl.getShaderInfoLog(this.fshader));
            retValue = false;
        }
        // program
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            console.error('Failed to link shader program. Error: ' + gl.getProgramInfoLog(this.program));
            retValue = false;
        }
        gl.deleteShader(this.vshader);
        gl.deleteShader(this.fshader);
        this.attributes = [];
        this.uniforms = [];
        this.samplers = [];
        var i = 0;
        // tslint:disable-next-line:one-variable-per-declaration
        var info, location;
        var _typeToPc = {};
        _typeToPc[gl.BOOL] = _hgl__WEBPACK_IMPORTED_MODULE_0__["UNIFORMTYPE"].BOOL;
        _typeToPc[gl.INT] = _hgl__WEBPACK_IMPORTED_MODULE_0__["UNIFORMTYPE"].INT;
        _typeToPc[gl.FLOAT] = _hgl__WEBPACK_IMPORTED_MODULE_0__["UNIFORMTYPE"].FLOAT;
        _typeToPc[gl.FLOAT_VEC2] = _hgl__WEBPACK_IMPORTED_MODULE_0__["UNIFORMTYPE"].FLOAT_VEC2;
        _typeToPc[gl.FLOAT_VEC3] = _hgl__WEBPACK_IMPORTED_MODULE_0__["UNIFORMTYPE"].FLOAT_VEC3;
        _typeToPc[gl.FLOAT_VEC4] = _hgl__WEBPACK_IMPORTED_MODULE_0__["UNIFORMTYPE"].FLOAT_VEC4;
        _typeToPc[gl.INT_VEC2] = _hgl__WEBPACK_IMPORTED_MODULE_0__["UNIFORMTYPE"].INT_VEC2;
        _typeToPc[gl.INT_VEC3] = _hgl__WEBPACK_IMPORTED_MODULE_0__["UNIFORMTYPE"].INT_VEC3;
        _typeToPc[gl.INT_VEC4] = _hgl__WEBPACK_IMPORTED_MODULE_0__["UNIFORMTYPE"].INT_VEC4;
        _typeToPc[gl.BOOL_VEC2] = _hgl__WEBPACK_IMPORTED_MODULE_0__["UNIFORMTYPE"].BOOL_VEC2;
        _typeToPc[gl.BOOL_VEC3] = _hgl__WEBPACK_IMPORTED_MODULE_0__["UNIFORMTYPE"].BOOL_VEC3;
        _typeToPc[gl.BOOL_VEC4] = _hgl__WEBPACK_IMPORTED_MODULE_0__["UNIFORMTYPE"].BOOL_VEC4;
        _typeToPc[gl.FLOAT_MAT2] = _hgl__WEBPACK_IMPORTED_MODULE_0__["UNIFORMTYPE"].FLOAT_MAT2;
        _typeToPc[gl.FLOAT_MAT3] = _hgl__WEBPACK_IMPORTED_MODULE_0__["UNIFORMTYPE"].FLOAT_MAT3;
        _typeToPc[gl.FLOAT_MAT4] = _hgl__WEBPACK_IMPORTED_MODULE_0__["UNIFORMTYPE"].FLOAT_MAT4;
        _typeToPc[gl.SAMPLER_2D] = _hgl__WEBPACK_IMPORTED_MODULE_0__["UNIFORMTYPE"].SAMPLER_2D;
        _typeToPc[gl.SAMPLER_CUBE] = _hgl__WEBPACK_IMPORTED_MODULE_0__["UNIFORMTYPE"].SAMPLER_CUBE;
        // if (this.device.webgl2) {
        //     _typeToPc[gl.SAMPLER_2D_SHADOW]   = UNIFORMTYPE.TEXTURE2D_SHADOW;
        //     _typeToPc[gl.SAMPLER_CUBE_SHADOW] = UNIFORMTYPE.TEXTURECUBE_SHADOW;
        //     _typeToPc[gl.SAMPLER_3D]          = UNIFORMTYPE.TEXTURE3D;
        // }
        var numAttributes = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
        while (i < numAttributes) {
            info = gl.getActiveAttrib(this.program, i++);
            location = gl.getAttribLocation(this.program, info.name);
            // Check attributes are correctly linked up
            if (this.definition.attributes[info.name] === undefined) {
                console.error('Vertex shader attribute "' + info.name + '" is not mapped to a semantic in shader definition.');
            }
            this.attributes.push(new _shader_input__WEBPACK_IMPORTED_MODULE_1__["ShaderInput"](this.device, this.definition.attributes[info.name], _typeToPc[info.type], location));
        }
        // Query the program for each shader state (GLSL 'uniform')
        i = 0;
        var numUniforms = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
        while (i < numUniforms) {
            info = gl.getActiveUniform(this.program, i++);
            location = gl.getUniformLocation(this.program, info.name);
            //     if (info.type === gl.SAMPLER_2D || info.type === gl.SAMPLER_CUBE ||
            //         (this.device.webgl2 && (info.type === gl.SAMPLER_2D_SHADOW || info.type === gl.SAMPLER_CUBE_SHADOW || info.type === gl.SAMPLER_3D))
            //     ) {
            //         this.samplers.push(new pc.ShaderInput(this.device, info.name, _typeToPc[info.type], location));
            //     } else {
            //         this.uniforms.push(new pc.ShaderInput(this.device, info.name, _typeToPc[info.type], location));
            //     }
            // }
            this.ready = true;
            // #ifdef PROFILER
            var endTime = new Date().getTime();
            this.device._shaderStats.compileTime += endTime - startTime;
            // #endif
            return retValue;
        }
    };
    Shader.prototype.destroy = function () {
        var device = this.device;
        var idx = device.shaders.indexOf(this);
        if (idx !== -1) {
            device.shaders.splice(idx, 1);
        }
        if (this.program) {
            var gl = device.gl;
            gl.deleteProgram(this.program);
            this.program = null;
            this.device.removeShaderFromCache(this);
        }
    };
    return Shader;
}());



/***/ }),

/***/ "./src/graphics/program/shaders/alphaTest.frag":
/*!*****************************************************!*\
  !*** ./src/graphics/program/shaders/alphaTest.frag ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "uniform float alpha_ref;\r\nvoid alphaTest(float a) {\r\n    if (a < alpha_ref) discard;\r\n}\r\n\r\n"

/***/ }),

/***/ "./src/graphics/program/shaders/base.vert":
/*!************************************************!*\
  !*** ./src/graphics/program/shaders/base.vert ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\nattribute vec3 vertex_position;\r\nattribute vec3 vertex_normal;\r\nattribute vec4 vertex_tangent;\r\nattribute vec2 vertex_texCoord0;\r\nattribute vec2 vertex_texCoord1;\r\nattribute vec4 vertex_color;\r\n\r\nuniform mat4 matrix_viewProjection;\r\nuniform mat4 matrix_model;\r\nuniform mat3 matrix_normal;\r\n\r\nvec3 dPositionW;\r\nmat4 dModelMatrix;\r\nmat3 dNormalMatrix;\r\nvec3 dLightPosW;\r\nvec3 dLightDirNormW;\r\nvec3 dNormalW;\r\n\r\n"

/***/ }),

/***/ "./src/graphics/program/shaders/fogExp.frag":
/*!**************************************************!*\
  !*** ./src/graphics/program/shaders/fogExp.frag ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "uniform vec3 fog_color;\r\nuniform float fog_density;\r\nvec3 addFog(vec3 color) {\r\n    float depth = gl_FragCoord.z / gl_FragCoord.w;\r\n    float fogFactor = exp(-depth * fog_density);\r\n    fogFactor = clamp(fogFactor, 0.0, 1.0);\r\n    return mix(fog_color, color, fogFactor);\r\n}\r\n"

/***/ }),

/***/ "./src/graphics/program/shaders/fogExp2.frag":
/*!***************************************************!*\
  !*** ./src/graphics/program/shaders/fogExp2.frag ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "uniform vec3 fog_color;\r\nuniform float fog_density;\r\nvec3 addFog(vec3 color) {\r\n    float depth = gl_FragCoord.z / gl_FragCoord.w;\r\n    float fogFactor = exp(-depth * depth * fog_density * fog_density);\r\n    fogFactor = clamp(fogFactor, 0.0, 1.0);\r\n    return mix(fog_color, color, fogFactor);\r\n}\r\n"

/***/ }),

/***/ "./src/graphics/program/shaders/fogLinear.frag":
/*!*****************************************************!*\
  !*** ./src/graphics/program/shaders/fogLinear.frag ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "uniform vec3 fog_color;\r\nuniform float fog_start;\r\nuniform float fog_end;\r\nvec3 addFog(vec3 color) {\r\n    float depth = gl_FragCoord.z / gl_FragCoord.w;\r\n    float fogFactor = (fog_end - depth) / (fog_end - fog_start);\r\n    fogFactor = clamp(fogFactor, 0.0, 1.0);\r\n    fogFactor = gammaCorrectInput(fogFactor);\r\n    return mix(fog_color, color, fogFactor);\r\n}\r\n"

/***/ }),

/***/ "./src/graphics/program/shaders/fogNone.frag":
/*!***************************************************!*\
  !*** ./src/graphics/program/shaders/fogNone.frag ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "vec3 addFog(vec3 color) {\r\n    return color;\r\n}\r\n\r\n\r\n"

/***/ }),

/***/ "./src/graphics/program/shaders/gles3.frag":
/*!*************************************************!*\
  !*** ./src/graphics/program/shaders/gles3.frag ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#define varying in\r\nout highp vec4 pc_fragColor;\r\n#define gl_FragColor pc_fragColor\r\n#define texture2D texture\r\n#define textureCube texture\r\n#define texture2DProj textureProj\r\n#define texture2DLodEXT textureLod\r\n#define texture2DProjLodEXT textureProjLod\r\n#define textureCubeLodEXT textureLod\r\n#define texture2DGradEXT textureGrad\r\n#define texture2DProjGradEXT textureProjGrad\r\n#define textureCubeGradEXT textureGrad\r\n#define GL2\r\n"

/***/ }),

/***/ "./src/graphics/program/shaders/gles3.vert":
/*!*************************************************!*\
  !*** ./src/graphics/program/shaders/gles3.vert ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#define attribute in\r\n#define varying out\r\n#define texture2D texture\r\n#define GL2\r\n#define VERTEXSHADER\r\n"

/***/ }),

/***/ "./src/graphics/program/shaders/packDepth.frag":
/*!*****************************************************!*\
  !*** ./src/graphics/program/shaders/packDepth.frag ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "// Packing a float in GLSL with multiplication and mod\r\n// http://blog.gradientstudios.com/2012/08/23/shadow-map-improvement\r\nvec4 packFloat(float depth) {\r\n    const vec4 bit_shift = vec4(256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0);\r\n    const vec4 bit_mask  = vec4(0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0);\r\n\r\n    // combination of mod and multiplication and division works better\r\n    vec4 res = mod(depth * bit_shift * vec4(255), vec4(256) ) / vec4(255);\r\n    res -= res.xxyz * bit_mask;\r\n    return res;\r\n}\r\n\r\n\r\n"

/***/ }),

/***/ "./src/graphics/program/shaders/transform.vert":
/*!*****************************************************!*\
  !*** ./src/graphics/program/shaders/transform.vert ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#ifdef PIXELSNAP\r\n    uniform vec4 uScreenSize;\r\n#endif\r\n\r\n#ifdef NINESLICED\r\n    #ifndef NINESLICE\r\n    #define NINESLICE\r\n    uniform vec4 innerOffset;\r\n    uniform vec2 outerScale;\r\n    uniform vec4 atlasRect;\r\n    varying vec2 vTiledUv;\r\n    #endif\r\n#endif\r\n\r\nmat4 getModelMatrix() {\r\n    #ifdef DYNAMICBATCH\r\n        return getBoneMatrix(vertex_boneIndices);\r\n    #elif defined(SKIN)\r\n        return matrix_model * (getBoneMatrix(vertex_boneIndices.x) * vertex_boneWeights.x +\r\n               getBoneMatrix(vertex_boneIndices.y) * vertex_boneWeights.y +\r\n               getBoneMatrix(vertex_boneIndices.z) * vertex_boneWeights.z +\r\n               getBoneMatrix(vertex_boneIndices.w) * vertex_boneWeights.w);\r\n    #elif defined(INSTANCING)\r\n        return mat4(instance_line1, instance_line2, instance_line3, instance_line4);\r\n    #else\r\n        return matrix_model;\r\n    #endif\r\n}\r\n\r\nvec4 getPosition() {\r\n    dModelMatrix = getModelMatrix();\r\n    vec3 localPos = vertex_position;\r\n\r\n    #ifdef NINESLICED\r\n        // outer and inner vertices are at the same position, scale both\r\n        localPos.xz *= outerScale;\r\n\r\n        // offset inner vertices inside\r\n        // (original vertices must be in [-1;1] range)\r\n        vec2 positiveUnitOffset = clamp(vertex_position.xz, vec2(0.0), vec2(1.0));\r\n        vec2 negativeUnitOffset = clamp(-vertex_position.xz, vec2(0.0), vec2(1.0));\r\n        localPos.xz += (-positiveUnitOffset * innerOffset.xy + negativeUnitOffset * innerOffset.zw) * vertex_texCoord0.xy;\r\n\r\n        vTiledUv = (localPos.xz - outerScale + innerOffset.xy) * -0.5 + 1.0; // uv = local pos - inner corner\r\n\r\n        localPos.xz *= -0.5; // move from -1;1 to -0.5;0.5\r\n        localPos = localPos.xzy;\r\n    #endif\r\n\r\n    vec4 posW = dModelMatrix * vec4(localPos, 1.0);\r\n    #ifdef SCREENSPACE\r\n        posW.zw = vec2(0.0, 1.0);\r\n    #endif\r\n    dPositionW = posW.xyz;\r\n\r\n    vec4 screenPos;\r\n    #ifdef UV1LAYOUT\r\n        screenPos = vec4(vertex_texCoord1.xy * 2.0 - 1.0, 0.5, 1);\r\n    #else\r\n        #ifdef SCREENSPACE\r\n            screenPos = posW;\r\n        #else\r\n            screenPos = matrix_viewProjection * posW;\r\n        #endif\r\n\r\n        #ifdef PIXELSNAP\r\n            // snap vertex to a pixel boundary\r\n            screenPos.xy = (screenPos.xy * 0.5) + 0.5;\r\n            screenPos.xy *= uScreenSize.xy;\r\n            screenPos.xy = floor(screenPos.xy);\r\n            screenPos.xy *= uScreenSize.zw;\r\n            screenPos.xy = (screenPos.xy * 2.0) - 1.0;\r\n        #endif\r\n    #endif\r\n\r\n    return screenPos;\r\n}\r\n\r\nvec3 getWorldPosition() {\r\n    return dPositionW;\r\n}\r\n"

/***/ }),

/***/ "./src/graphics/program/shaders/transformDecl.vert":
/*!*********************************************************!*\
  !*** ./src/graphics/program/shaders/transformDecl.vert ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "attribute vec3 vertex_position;\r\nuniform mat4 matrix_model;\r\nuniform mat4 matrix_viewProjection;\r\n\r\nvec3 dPositionW;\r\nmat4 dModelMatrix;\r\n\r\n"

/***/ }),

/***/ "./src/graphics/program/version.ts":
/*!*****************************************!*\
  !*** ./src/graphics/program/version.ts ***!
  \*****************************************/
/*! exports provided: Version */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Version", function() { return Version; });
/**
 * File: c:\Users\35327\Githubs\hypergl\src\graphics\program\version.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Wednesday, July 25th 2018, 12:39:30 am
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, July 25th 2018, 12:41:02 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */
var Version = /** @class */ (function () {
    function Version() {
        this.globalId = 0;
        this.revision = 0;
    }
    Version.prototype.equals = function (other) {
        return this.globalId === other.globalId &&
            this.revision === other.revision;
    };
    Version.prototype.notequals = function (other) {
        return this.globalId !== other.globalId ||
            this.revision !== other.revision;
    };
    Version.prototype.copy = function (other) {
        this.globalId = other.globalId;
        this.revision = other.revision;
    };
    Version.prototype.reset = function () {
        this.globalId = 0;
        this.revision = 0;
    };
    return Version;
}());



/***/ }),

/***/ "./src/graphics/program/versioned-object.ts":
/*!**************************************************!*\
  !*** ./src/graphics/program/versioned-object.ts ***!
  \**************************************************/
/*! exports provided: VersionedObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VersionedObject", function() { return VersionedObject; });
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./version */ "./src/graphics/program/version.ts");
/**
 * File: c:\Users\35327\Githubs\hypergl\src\graphics\program\versioned-object.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Wednesday, July 25th 2018, 12:51:01 am
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, July 25th 2018, 12:51:18 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

var idCounter = 0;
var VersionedObject = /** @class */ (function () {
    function VersionedObject() {
        // Increment the global object ID counter
        idCounter++;
        // Create a version for this object
        this.version = new _version__WEBPACK_IMPORTED_MODULE_0__["Version"]();
        // Set the unique object ID
        this.version.globalId = idCounter;
    }
    VersionedObject.prototype.increment = function () {
        // Increment the revision number
        this.version.revision++;
    };
    return VersionedObject;
}());



/***/ }),

/***/ "./src/graphics/vertexBuffer.ts":
/*!**************************************!*\
  !*** ./src/graphics/vertexBuffer.ts ***!
  \**************************************/
/*! exports provided: VertexBuffer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VertexBuffer", function() { return VertexBuffer; });
/* harmony import */ var _hgl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../hgl */ "./src/hgl.ts");
/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\graphics\vertexBuffer.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Thursday, July 12th 2018, 8:02:55 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, July 28th 2018, 12:54:14 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

var VertexBuffer = /** @class */ (function () {
    function VertexBuffer(device, format, numVertices, usage, initialData) {
        if (usage === void 0) { usage = _hgl__WEBPACK_IMPORTED_MODULE_0__["BUFFER"].STATIC; }
        this.device = device;
        this.format = format;
        this.numVertices = numVertices;
        this.usage = usage;
        this.initialData = initialData;
        this.numBytes = format.size * numVertices;
        var gl = device.gl;
        if (initialData) {
            this.setData(initialData);
        }
        else {
            this.storage = new ArrayBuffer(this.numBytes);
        }
        this.device.buffers.push(this);
    }
    VertexBuffer.prototype.destroy = function () {
        var device = this.device;
        var idx = device.buffers.indexOf(this);
        if (idx !== -1) {
            device.buffers.splice(idx, 1);
        }
        if (this.bufferId) {
            var gl = device.gl;
            gl.deleteBuffer(this.bufferId);
            device._vram.vb -= this.storage.byteLength;
            this.bufferId = null;
            // If this buffer was bound, must clean up attribute-buffer bindings to prevent GL errors
            device.boundBuffer = null;
            device.vertexBuffers.length = 0;
            device.vbOffsets.length = 0;
            device.attributesInvalidated = true;
            // tslint:disable-next-line:forin
            for (var loc in device.enabledAttributes) {
                gl.disableVertexAttribArray(parseInt(loc, 10));
            }
            device.enabledAttributes = {};
        }
    };
    VertexBuffer.prototype.getFormat = function () {
        return this.format;
    };
    VertexBuffer.prototype.getUsage = function () {
        return this.usage;
    };
    VertexBuffer.prototype.getNumVertices = function () {
        return this.numVertices;
    };
    VertexBuffer.prototype.lock = function () {
        return this.storage;
    };
    VertexBuffer.prototype.unlock = function () {
        // Upload the new vertex data
        var gl = this.device.gl;
        if (!this.bufferId) {
            this.bufferId = gl.createBuffer();
        }
        var glUsage;
        switch (this.usage) {
            case _hgl__WEBPACK_IMPORTED_MODULE_0__["BUFFER"].STATIC:
                glUsage = gl.STATIC_DRAW;
                break;
            case _hgl__WEBPACK_IMPORTED_MODULE_0__["BUFFER"].DYNAMIC:
                glUsage = gl.DYNAMIC_DRAW;
                break;
            case _hgl__WEBPACK_IMPORTED_MODULE_0__["BUFFER"].STREAM:
                glUsage = gl.STREAM_DRAW;
                break;
            case _hgl__WEBPACK_IMPORTED_MODULE_0__["BUFFER"].GPUDYNAMIC:
                if (this.device.webgl2) {
                    // glUsage = gl.DYNAMIC_COPY;
                }
                else {
                    glUsage = gl.STATIC_DRAW;
                }
                break;
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferId);
        gl.bufferData(gl.ARRAY_BUFFER, this.storage, glUsage);
    };
    VertexBuffer.prototype.setData = function (data) {
        if (data.byteLength !== this.numBytes) {
            console.error("VertexBuffer: wrong initial data size: expected " + this.numBytes + ", got " + data.byteLength);
            return false;
        }
        this.storage = data;
        this.unlock();
        return true;
    };
    return VertexBuffer;
}());



/***/ }),

/***/ "./src/graphics/vertexFormat.ts":
/*!**************************************!*\
  !*** ./src/graphics/vertexFormat.ts ***!
  \**************************************/
/*! exports provided: VertexFormat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VertexFormat", function() { return VertexFormat; });
/* harmony import */ var _hgl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../hgl */ "./src/hgl.ts");
/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\graphics\vertexFormat.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Thursday, July 12th 2018, 8:51:24 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, July 28th 2018, 12:01:25 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

var _typeSize = [];
_typeSize[_hgl__WEBPACK_IMPORTED_MODULE_0__["DataType"].INT8] = 1;
_typeSize[_hgl__WEBPACK_IMPORTED_MODULE_0__["DataType"].UINT8] = 1;
_typeSize[_hgl__WEBPACK_IMPORTED_MODULE_0__["DataType"].INT16] = 2;
_typeSize[_hgl__WEBPACK_IMPORTED_MODULE_0__["DataType"].UINT16] = 2;
_typeSize[_hgl__WEBPACK_IMPORTED_MODULE_0__["DataType"].INT32] = 4;
_typeSize[_hgl__WEBPACK_IMPORTED_MODULE_0__["DataType"].UINT32] = 4;
_typeSize[_hgl__WEBPACK_IMPORTED_MODULE_0__["DataType"].FLOAT32] = 4;
/**
* @example
* // Specify 3-component positions (x, y, z)
* var vertexFormat = new pc.VertexFormat(graphicsDevice, [
* { semantic: pc.SEMANTIC_POSITION, components: 3, type: pc.TYPE_FLOAT32 },
* ]);
* @example
* // Specify 2-component positions (x, y), a texture coordinate (u, v) and a vertex color (r, g, b, a)
* var vertexFormat = new pc.VertexFormat(graphicsDevice, [
* { semantic: pc.SEMANTIC_POSITION, components: 2, type: pc.TYPE_FLOAT32 },
* { semantic: pc.SEMANTIC_TEXCOORD0, components: 2, type: pc.TYPE_FLOAT32 },
* { semantic: pc.SEMANTIC_COLOR, components: 4, type: pc.TYPE_UINT8, normalize: true }
* ]);
*/
var VertexFormat = /** @class */ (function () {
    function VertexFormat(device, vartexTypes) {
        this.device = device;
        this.size = 0;
        this.hasUv0 = false;
        this.hasUv1 = false;
        this.hasColor = false;
        this.elements = [];
        for (var i = 0; i < vartexTypes.length; i++) {
            var desc = vartexTypes[i];
            var element = {
                semantic: desc.semantic,
                offset: 0,
                stride: 0,
                stream: -1,
                dataType: desc.dataType,
                length: desc.length,
                normalize: (desc.normalize === undefined) ? false : desc.normalize,
                size: desc.length * _typeSize[desc.dataType]
            };
            this.elements.push(element);
            // This buffer will be accessed by a Float32Array and so must be 4 byte aligned
            this.size += Math.ceil(element.size / 4) * 4;
            if (desc.semantic === _hgl__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"].TEXCOORD0) {
                this.hasUv0 = true;
            }
            else if (desc.semantic === _hgl__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"].TEXCOORD1) {
                this.hasUv1 = true;
            }
            else if (desc.semantic === _hgl__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"].COLOR) {
                this.hasColor = true;
            }
        }
        var offset = 0;
        for (var i = 0; i < this.elements.length; i++) {
            var element = this.elements[i];
            element.offset = offset;
            element.stride = this.size;
            offset += element.size;
        }
    }
    return VertexFormat;
}());



/***/ }),

/***/ "./src/hgl.ts":
/*!********************!*\
  !*** ./src/hgl.ts ***!
  \********************/
/*! exports provided: version, BUFFER, SHADERTAG_MATERIAL, DataType, SEMANTIC, UNIFORMTYPE, SHADER, BLENDMODE, BLENDEQUATION, CULLFACE, BLEND, CURVE, MASK, SHADERDEF, LAYER, RENDERSTYLE, SORTKEY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BUFFER", function() { return BUFFER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHADERTAG_MATERIAL", function() { return SHADERTAG_MATERIAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataType", function() { return DataType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEMANTIC", function() { return SEMANTIC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNIFORMTYPE", function() { return UNIFORMTYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHADER", function() { return SHADER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BLENDMODE", function() { return BLENDMODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BLENDEQUATION", function() { return BLENDEQUATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CULLFACE", function() { return CULLFACE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BLEND", function() { return BLEND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CURVE", function() { return CURVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MASK", function() { return MASK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHADERDEF", function() { return SHADERDEF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LAYER", function() { return LAYER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RENDERSTYLE", function() { return RENDERSTYLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SORTKEY", function() { return SORTKEY; });
/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\scene\hgl.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Friday, July 13th 2018, 6:49:47 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, July 28th 2018, 8:34:00 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */
var version = '0.0.1';
var BUFFER;
(function (BUFFER) {
    BUFFER[BUFFER["STATIC"] = 1] = "STATIC";
    BUFFER[BUFFER["DYNAMIC"] = 2] = "DYNAMIC";
    BUFFER[BUFFER["STREAM"] = 3] = "STREAM";
    BUFFER[BUFFER["GPUDYNAMIC"] = 4] = "GPUDYNAMIC";
})(BUFFER || (BUFFER = {}));
var SHADERTAG_MATERIAL = 1;
var DataType;
(function (DataType) {
    DataType[DataType["INT8"] = 0] = "INT8";
    DataType[DataType["UINT8"] = 1] = "UINT8";
    DataType[DataType["INT16"] = 2] = "INT16";
    DataType[DataType["UINT16"] = 3] = "UINT16";
    DataType[DataType["INT32"] = 4] = "INT32";
    DataType[DataType["UINT32"] = 5] = "UINT32";
    DataType[DataType["FLOAT32"] = 6] = "FLOAT32";
})(DataType || (DataType = {}));
var SEMANTIC;
(function (SEMANTIC) {
    SEMANTIC["POSITION"] = "POSITION";
    SEMANTIC["NORMAL"] = "NORMAL";
    SEMANTIC["TANGENT"] = "TANGENT";
    SEMANTIC["BLENDWEIGHT"] = "BLENDWEIGHT";
    SEMANTIC["BLENDINDICES"] = "BLENDINDICES";
    SEMANTIC["COLOR"] = "COLOR";
    SEMANTIC["TEXCOORD0"] = "TEXCOORD0";
    SEMANTIC["TEXCOORD1"] = "TEXCOORD1";
    SEMANTIC["TEXCOORD2"] = "TEXCOORD2";
    SEMANTIC["TEXCOORD3"] = "TEXCOORD3";
    SEMANTIC["TEXCOORD4"] = "TEXCOORD4";
    SEMANTIC["TEXCOORD5"] = "TEXCOORD5";
    SEMANTIC["TEXCOORD6"] = "TEXCOORD6";
    SEMANTIC["TEXCOORD7"] = "TEXCOORD7";
})(SEMANTIC || (SEMANTIC = {}));
var UNIFORMTYPE;
(function (UNIFORMTYPE) {
    UNIFORMTYPE[UNIFORMTYPE["BOOL"] = 0] = "BOOL";
    UNIFORMTYPE[UNIFORMTYPE["INT"] = 1] = "INT";
    UNIFORMTYPE[UNIFORMTYPE["FLOAT"] = 2] = "FLOAT";
    UNIFORMTYPE[UNIFORMTYPE["FLOAT_VEC2"] = 3] = "FLOAT_VEC2";
    UNIFORMTYPE[UNIFORMTYPE["FLOAT_VEC3"] = 4] = "FLOAT_VEC3";
    UNIFORMTYPE[UNIFORMTYPE["FLOAT_VEC4"] = 5] = "FLOAT_VEC4";
    UNIFORMTYPE[UNIFORMTYPE["INT_VEC2"] = 6] = "INT_VEC2";
    UNIFORMTYPE[UNIFORMTYPE["INT_VEC3"] = 7] = "INT_VEC3";
    UNIFORMTYPE[UNIFORMTYPE["INT_VEC4"] = 8] = "INT_VEC4";
    UNIFORMTYPE[UNIFORMTYPE["BOOL_VEC2"] = 9] = "BOOL_VEC2";
    UNIFORMTYPE[UNIFORMTYPE["BOOL_VEC3"] = 10] = "BOOL_VEC3";
    UNIFORMTYPE[UNIFORMTYPE["BOOL_VEC4"] = 11] = "BOOL_VEC4";
    UNIFORMTYPE[UNIFORMTYPE["FLOAT_MAT2"] = 12] = "FLOAT_MAT2";
    UNIFORMTYPE[UNIFORMTYPE["FLOAT_MAT3"] = 13] = "FLOAT_MAT3";
    UNIFORMTYPE[UNIFORMTYPE["FLOAT_MAT4"] = 14] = "FLOAT_MAT4";
    UNIFORMTYPE[UNIFORMTYPE["SAMPLER_2D"] = 15] = "SAMPLER_2D";
    UNIFORMTYPE[UNIFORMTYPE["SAMPLER_CUBE"] = 16] = "SAMPLER_CUBE";
    UNIFORMTYPE[UNIFORMTYPE["FLOATARRAY"] = 17] = "FLOATARRAY";
    UNIFORMTYPE[UNIFORMTYPE["TEXTURE2D_SHADOW"] = 18] = "TEXTURE2D_SHADOW";
    UNIFORMTYPE[UNIFORMTYPE["TEXTURECUBE_SHADOW"] = 19] = "TEXTURECUBE_SHADOW";
    UNIFORMTYPE[UNIFORMTYPE["TEXTURE3D"] = 20] = "TEXTURE3D";
})(UNIFORMTYPE || (UNIFORMTYPE = {}));
var SHADER;
(function (SHADER) {
    SHADER[SHADER["FORWARD"] = 0] = "FORWARD";
    SHADER[SHADER["FORWARDHDR"] = 1] = "FORWARDHDR";
    SHADER[SHADER["DEPTH"] = 2] = "DEPTH";
    SHADER[SHADER["SHADOW"] = 3] = "SHADOW";
    // 4: VSM8,
    // 5: VSM16,
    // 6: VSM32,
    // 7: PCF5,
    // 8: PCF3 POINT
    // 9: VSM8 POINT,
    // 10: VSM16 POINT,
    // 11: VSM32 POINT,
    // 12: PCF5 POINT
    // 13: PCF3 SPOT
    // 14: VSM8 SPOT,
    // 15: VSM16 SPOT,
    // 16: VSM32 SPOT,
    // 17: PCF5 SPOT
    SHADER[SHADER["PICK"] = 18] = "PICK";
})(SHADER || (SHADER = {}));
var BLENDMODE;
(function (BLENDMODE) {
    BLENDMODE[BLENDMODE["ZERO"] = 0] = "ZERO";
    BLENDMODE[BLENDMODE["ONE"] = 1] = "ONE";
    BLENDMODE[BLENDMODE["SRC_COLOR"] = 2] = "SRC_COLOR";
    BLENDMODE[BLENDMODE["ONE_MINUS_SRC_COLOR"] = 3] = "ONE_MINUS_SRC_COLOR";
    BLENDMODE[BLENDMODE["DST_COLOR"] = 4] = "DST_COLOR";
    BLENDMODE[BLENDMODE["ONE_MINUS_DST_COLOR"] = 5] = "ONE_MINUS_DST_COLOR";
    BLENDMODE[BLENDMODE["SRC_ALPHA"] = 6] = "SRC_ALPHA";
    BLENDMODE[BLENDMODE["SRC_ALPHA_SATURATE"] = 7] = "SRC_ALPHA_SATURATE";
    BLENDMODE[BLENDMODE["ONE_MINUS_SRC_ALPHA"] = 8] = "ONE_MINUS_SRC_ALPHA";
    BLENDMODE[BLENDMODE["DST_ALPHA"] = 9] = "DST_ALPHA";
    BLENDMODE[BLENDMODE["ONE_MINUS_DST_ALPHA"] = 10] = "ONE_MINUS_DST_ALPHA";
})(BLENDMODE || (BLENDMODE = {}));
var BLENDEQUATION;
(function (BLENDEQUATION) {
    BLENDEQUATION[BLENDEQUATION["ADD"] = 0] = "ADD";
    BLENDEQUATION[BLENDEQUATION["SUBTRACT"] = 1] = "SUBTRACT";
    BLENDEQUATION[BLENDEQUATION["REVERSE_SUBTRACT"] = 2] = "REVERSE_SUBTRACT";
    BLENDEQUATION[BLENDEQUATION["MIN"] = 3] = "MIN";
    BLENDEQUATION[BLENDEQUATION["MAX"] = 4] = "MAX";
})(BLENDEQUATION || (BLENDEQUATION = {}));
var CULLFACE;
(function (CULLFACE) {
    CULLFACE[CULLFACE["NONE"] = 0] = "NONE";
    CULLFACE[CULLFACE["BACK"] = 1] = "BACK";
    CULLFACE[CULLFACE["FRONT"] = 2] = "FRONT";
    CULLFACE[CULLFACE["FRONTANDBACK"] = 3] = "FRONTANDBACK";
})(CULLFACE || (CULLFACE = {}));
var BLEND;
(function (BLEND) {
    BLEND[BLEND["SUBTRACTIVE"] = 0] = "SUBTRACTIVE";
    BLEND[BLEND["ADDITIVE"] = 1] = "ADDITIVE";
    BLEND[BLEND["NORMAL"] = 2] = "NORMAL";
    BLEND[BLEND["NONE"] = 3] = "NONE";
    BLEND[BLEND["PREMULTIPLIED"] = 4] = "PREMULTIPLIED";
    BLEND[BLEND["MULTIPLICATIVE"] = 5] = "MULTIPLICATIVE";
    BLEND[BLEND["ADDITIVEALPHA"] = 6] = "ADDITIVEALPHA";
    BLEND[BLEND["MULTIPLICATIVE2X"] = 7] = "MULTIPLICATIVE2X";
    BLEND[BLEND["SCREEN"] = 8] = "SCREEN";
    BLEND[BLEND["MIN"] = 9] = "MIN";
    BLEND[BLEND["MAX"] = 10] = "MAX";
})(BLEND || (BLEND = {}));
var CURVE;
(function (CURVE) {
    CURVE[CURVE["LINEAR"] = 0] = "LINEAR";
    CURVE[CURVE["SMOOTHSTEP"] = 1] = "SMOOTHSTEP";
    CURVE[CURVE["CATMULL"] = 2] = "CATMULL";
    CURVE[CURVE["CARDINAL"] = 3] = "CARDINAL";
})(CURVE || (CURVE = {}));
var MASK;
(function (MASK) {
    MASK[MASK["DYNAMIC"] = 1] = "DYNAMIC";
    MASK[MASK["BAKED"] = 2] = "BAKED";
    MASK[MASK["LIGHTMAP"] = 4] = "LIGHTMAP";
})(MASK || (MASK = {}));
var SHADERDEF;
(function (SHADERDEF) {
    SHADERDEF[SHADERDEF["NOSHADOW"] = 1] = "NOSHADOW";
    SHADERDEF[SHADERDEF["SKIN"] = 2] = "SKIN";
    SHADERDEF[SHADERDEF["UV0"] = 4] = "UV0";
    SHADERDEF[SHADERDEF["UV1"] = 8] = "UV1";
    SHADERDEF[SHADERDEF["VCOLOR"] = 16] = "VCOLOR";
    SHADERDEF[SHADERDEF["INSTANCING"] = 32] = "INSTANCING";
    SHADERDEF[SHADERDEF["LM"] = 64] = "LM";
    SHADERDEF[SHADERDEF["DIRLM"] = 128] = "DIRLM";
    SHADERDEF[SHADERDEF["SCREENSPACE"] = 256] = "SCREENSPACE";
})(SHADERDEF || (SHADERDEF = {}));
var LAYER;
(function (LAYER) {
    LAYER[LAYER["HUD"] = 0] = "HUD";
    LAYER[LAYER["GIZMO"] = 1] = "GIZMO";
    LAYER[LAYER["FX"] = 2] = "FX";
    LAYER[LAYER["WORLD"] = 15] = "WORLD";
})(LAYER || (LAYER = {}));
var RENDERSTYLE;
(function (RENDERSTYLE) {
    RENDERSTYLE[RENDERSTYLE["SOLID"] = 0] = "SOLID";
    RENDERSTYLE[RENDERSTYLE["WIREFRAME"] = 1] = "WIREFRAME";
    RENDERSTYLE[RENDERSTYLE["POINTS"] = 2] = "POINTS";
})(RENDERSTYLE || (RENDERSTYLE = {}));
var SORTKEY;
(function (SORTKEY) {
    SORTKEY[SORTKEY["FORWARD"] = 0] = "FORWARD";
    SORTKEY[SORTKEY["DEPTH"] = 1] = "DEPTH";
})(SORTKEY || (SORTKEY = {}));


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: version, BUFFER, SHADERTAG_MATERIAL, DataType, SEMANTIC, UNIFORMTYPE, SHADER, BLENDMODE, BLENDEQUATION, CULLFACE, BLEND, CURVE, VertexBuffer, VertexFormat, Application, BasicMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hgl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hgl */ "./src/hgl.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "version", function() { return _hgl__WEBPACK_IMPORTED_MODULE_0__["version"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BUFFER", function() { return _hgl__WEBPACK_IMPORTED_MODULE_0__["BUFFER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SHADERTAG_MATERIAL", function() { return _hgl__WEBPACK_IMPORTED_MODULE_0__["SHADERTAG_MATERIAL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataType", function() { return _hgl__WEBPACK_IMPORTED_MODULE_0__["DataType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SEMANTIC", function() { return _hgl__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UNIFORMTYPE", function() { return _hgl__WEBPACK_IMPORTED_MODULE_0__["UNIFORMTYPE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SHADER", function() { return _hgl__WEBPACK_IMPORTED_MODULE_0__["SHADER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BLENDMODE", function() { return _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BLENDEQUATION", function() { return _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDEQUATION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CULLFACE", function() { return _hgl__WEBPACK_IMPORTED_MODULE_0__["CULLFACE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BLEND", function() { return _hgl__WEBPACK_IMPORTED_MODULE_0__["BLEND"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CURVE", function() { return _hgl__WEBPACK_IMPORTED_MODULE_0__["CURVE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MASK", function() { return _hgl__WEBPACK_IMPORTED_MODULE_0__["MASK"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SHADERDEF", function() { return _hgl__WEBPACK_IMPORTED_MODULE_0__["SHADERDEF"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LAYER", function() { return _hgl__WEBPACK_IMPORTED_MODULE_0__["LAYER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RENDERSTYLE", function() { return _hgl__WEBPACK_IMPORTED_MODULE_0__["RENDERSTYLE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SORTKEY", function() { return _hgl__WEBPACK_IMPORTED_MODULE_0__["SORTKEY"]; });

/* harmony import */ var _graphics_vertexBuffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphics/vertexBuffer */ "./src/graphics/vertexBuffer.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VertexBuffer", function() { return _graphics_vertexBuffer__WEBPACK_IMPORTED_MODULE_1__["VertexBuffer"]; });

/* harmony import */ var _graphics_vertexFormat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./graphics/vertexFormat */ "./src/graphics/vertexFormat.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VertexFormat", function() { return _graphics_vertexFormat__WEBPACK_IMPORTED_MODULE_2__["VertexFormat"]; });

/* harmony import */ var _application_application__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./application/application */ "./src/application/application.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return _application_application__WEBPACK_IMPORTED_MODULE_3__["Application"]; });

/* harmony import */ var _materials_basic_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./materials/basic-material */ "./src/materials/basic-material.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BasicMaterial", function() { return _materials_basic_material__WEBPACK_IMPORTED_MODULE_4__["BasicMaterial"]; });

/**
 * File: c:\Users\35327\Githubs\ts-template\src\index.ts
 * Project: c:\Users\35327\Githubs\ts-template
 * Created Date: Friday, June 29th 2018, 12:01:19 am
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, July 28th 2018, 12:03:34 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */







/***/ }),

/***/ "./src/materials/basic-material.ts":
/*!*****************************************!*\
  !*** ./src/materials/basic-material.ts ***!
  \*****************************************/
/*! exports provided: BasicMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasicMaterial", function() { return BasicMaterial; });
/* harmony import */ var _material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./material */ "./src/materials/material.ts");
/* harmony import */ var _core_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/color */ "./src/core/color.ts");
/**
 * File: c:\Users\35327\Githubs\hypergl\src\materials\basic-material.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Friday, July 27th 2018, 1:01:34 am
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, July 28th 2018, 12:03:54 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var BasicMaterial = /** @class */ (function (_super) {
    __extends(BasicMaterial, _super);
    function BasicMaterial() {
        var _this = _super.call(this) || this;
        _this.color = new _core_color__WEBPACK_IMPORTED_MODULE_1__["Color"](1, 1, 1, 1);
        _this.colorMap = null;
        _this.vertexColors = false;
        _this.update();
        return _this;
    }
    BasicMaterial.prototype.clone = function () {
        var clone = new BasicMaterial();
        _material__WEBPACK_IMPORTED_MODULE_0__["Material"].prototype._cloneInternal.call(this, clone);
        clone.color.copy(this.color);
        clone.colorMap = this.colorMap;
        clone.vertexColors = this.vertexColors;
        clone.update();
        return clone;
    };
    BasicMaterial.prototype.update = function () {
        this.clearParameters();
        this.setParameter('uColor', this.color.data);
        if (this.colorMap) {
            this.setParameter('texture_diffuseMap', this.colorMap);
        }
    };
    BasicMaterial.prototype.updateShader = function (device, scene, objDefs, staticLightList, pass, sortedLights) {
        var options = {
            skin: !!this.meshInstances[0].skinInstance,
            vertexColors: this.vertexColors,
            diffuseMap: this.colorMap,
            pass: pass
        };
        var library = device.getProgramLibrary();
        this.shader = library.getProgram('basic', options);
    };
    return BasicMaterial;
}(_material__WEBPACK_IMPORTED_MODULE_0__["Material"]));



/***/ }),

/***/ "./src/materials/material.ts":
/*!***********************************!*\
  !*** ./src/materials/material.ts ***!
  \***********************************/
/*! exports provided: Material */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Material", function() { return Material; });
/* harmony import */ var _hgl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../hgl */ "./src/hgl.ts");
/* harmony import */ var _scene_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scene/scene */ "./src/scene/scene.ts");
/**
 * File: c:\Users\35327\Githubs\hypergl\src\materials\material.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Friday, July 27th 2018, 12:39:09 am
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, July 27th 2018, 1:06:10 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */
var id = 0;


var Material = /** @class */ (function () {
    function Material() {
        this.name = 'Untitled';
        this._shader = null;
        this.variants = {};
        this.parameters = {};
        this.alphaTest = 0;
        this.alphaToCoverage = false;
        this.blend = false;
        this.blendSrc = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE;
        this.blendDst = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ZERO;
        this.blendEquation = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDEQUATION"].ADD;
        this.separateAlphaBlend = false;
        this.blendSrcAlpha = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE;
        this.blendDstAlpha = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ZERO;
        this.blendAlphaEquation = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDEQUATION"].ADD;
        this.cull = _hgl__WEBPACK_IMPORTED_MODULE_0__["CULLFACE"].BACK;
        this.depthTest = true;
        this.depthWrite = true;
        this.stencilFront = null;
        this.stencilBack = null;
        this.depthBias = 0;
        this.slopeDepthBias = 0;
        this.redWrite = true;
        this.greenWrite = true;
        this.blueWrite = true;
        this.alphaWrite = true;
        this.meshInstances = []; // The mesh instances referencing this material
        this._shaderVersion = 0;
        this._scene = null;
        this._dirtyBlend = false;
        this.id = id++;
    }
    Object.defineProperty(Material.prototype, "shader", {
        get: function () {
            return this._shader;
        },
        set: function (shader) {
            this.setShader(shader);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "blendType", {
        // tslint:disable-next-line:cyclomatic-complexity
        get: function () {
            if ((!this.blend) &&
                (this.blendSrc === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE) &&
                (this.blendDst === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ZERO) &&
                (this.blendEquation === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDEQUATION"].ADD)) {
                return _hgl__WEBPACK_IMPORTED_MODULE_0__["BLEND"].NONE;
            }
            else if ((this.blend) &&
                (this.blendSrc === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].SRC_ALPHA) &&
                (this.blendDst === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE_MINUS_SRC_ALPHA) &&
                (this.blendEquation === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDEQUATION"].ADD)) {
                return _hgl__WEBPACK_IMPORTED_MODULE_0__["BLEND"].NORMAL;
            }
            else if ((this.blend) &&
                (this.blendSrc === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE) &&
                (this.blendDst === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE) &&
                (this.blendEquation === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDEQUATION"].ADD)) {
                return _hgl__WEBPACK_IMPORTED_MODULE_0__["BLEND"].ADDITIVE;
            }
            else if ((this.blend) &&
                (this.blendSrc === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].SRC_ALPHA) &&
                (this.blendDst === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE) &&
                (this.blendEquation === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDEQUATION"].ADD)) {
                return _hgl__WEBPACK_IMPORTED_MODULE_0__["BLEND"].ADDITIVEALPHA;
            }
            else if ((this.blend) &&
                (this.blendSrc === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].DST_COLOR) &&
                (this.blendDst === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].SRC_COLOR) &&
                (this.blendEquation === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDEQUATION"].ADD)) {
                return _hgl__WEBPACK_IMPORTED_MODULE_0__["BLEND"].MULTIPLICATIVE2X;
            }
            else if ((this.blend) &&
                (this.blendSrc === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE_MINUS_DST_COLOR) &&
                (this.blendDst === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE) &&
                (this.blendEquation === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDEQUATION"].ADD)) {
                return _hgl__WEBPACK_IMPORTED_MODULE_0__["BLEND"].SCREEN;
            }
            else if ((this.blend) &&
                (this.blendSrc === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE) &&
                (this.blendDst === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE) &&
                (this.blendEquation === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDEQUATION"].MIN)) {
                return _hgl__WEBPACK_IMPORTED_MODULE_0__["BLEND"].MIN;
            }
            else if ((this.blend) &&
                (this.blendSrc === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE) &&
                (this.blendDst === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE) &&
                (this.blendEquation === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDEQUATION"].MAX)) {
                return _hgl__WEBPACK_IMPORTED_MODULE_0__["BLEND"].MAX;
            }
            else if ((this.blend) &&
                (this.blendSrc === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].DST_COLOR) &&
                (this.blendDst === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ZERO) &&
                (this.blendEquation === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDEQUATION"].ADD)) {
                return _hgl__WEBPACK_IMPORTED_MODULE_0__["BLEND"].MULTIPLICATIVE;
            }
            else if ((this.blend) &&
                (this.blendSrc === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE) &&
                (this.blendDst === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE_MINUS_SRC_ALPHA) &&
                (this.blendEquation === _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDEQUATION"].ADD)) {
                return _hgl__WEBPACK_IMPORTED_MODULE_0__["BLEND"].PREMULTIPLIED;
            }
            else {
                return _hgl__WEBPACK_IMPORTED_MODULE_0__["BLEND"].NORMAL;
            }
        },
        set: function (type) {
            var prevBlend = this.blend !== _hgl__WEBPACK_IMPORTED_MODULE_0__["BLEND"].NONE;
            switch (type) {
                case _hgl__WEBPACK_IMPORTED_MODULE_0__["BLEND"].NONE:
                    this.blend = false;
                    this.blendSrc = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE;
                    this.blendDst = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ZERO;
                    this.blendEquation = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDEQUATION"].ADD;
                    break;
                case _hgl__WEBPACK_IMPORTED_MODULE_0__["BLEND"].NORMAL:
                    this.blend = true;
                    this.blendSrc = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].SRC_ALPHA;
                    this.blendDst = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE_MINUS_SRC_ALPHA;
                    this.blendEquation = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDEQUATION"].ADD;
                    break;
                case _hgl__WEBPACK_IMPORTED_MODULE_0__["BLEND"].PREMULTIPLIED:
                    this.blend = true;
                    this.blendSrc = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE;
                    this.blendDst = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE_MINUS_SRC_ALPHA;
                    this.blendEquation = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDEQUATION"].ADD;
                    break;
                case _hgl__WEBPACK_IMPORTED_MODULE_0__["BLEND"].ADDITIVE:
                    this.blend = true;
                    this.blendSrc = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE;
                    this.blendDst = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE;
                    this.blendEquation = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDEQUATION"].ADD;
                    break;
                case _hgl__WEBPACK_IMPORTED_MODULE_0__["BLEND"].ADDITIVEALPHA:
                    this.blend = true;
                    this.blendSrc = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].SRC_ALPHA;
                    this.blendDst = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE;
                    this.blendEquation = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDEQUATION"].ADD;
                    break;
                case _hgl__WEBPACK_IMPORTED_MODULE_0__["BLEND"].MULTIPLICATIVE2X:
                    this.blend = true;
                    this.blendSrc = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].DST_COLOR;
                    this.blendDst = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].SRC_COLOR;
                    this.blendEquation = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDEQUATION"].ADD;
                    break;
                case _hgl__WEBPACK_IMPORTED_MODULE_0__["BLEND"].SCREEN:
                    this.blend = true;
                    this.blendSrc = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE_MINUS_DST_COLOR;
                    this.blendDst = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE;
                    this.blendEquation = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDEQUATION"].ADD;
                    break;
                case _hgl__WEBPACK_IMPORTED_MODULE_0__["BLEND"].MULTIPLICATIVE:
                    this.blend = true;
                    this.blendSrc = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].DST_COLOR;
                    this.blendDst = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ZERO;
                    this.blendEquation = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDEQUATION"].ADD;
                    break;
                case _hgl__WEBPACK_IMPORTED_MODULE_0__["BLEND"].MIN:
                    this.blend = true;
                    this.blendSrc = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE;
                    this.blendDst = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE;
                    this.blendEquation = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDEQUATION"].MIN;
                    break;
                case _hgl__WEBPACK_IMPORTED_MODULE_0__["BLEND"].MAX:
                    this.blend = true;
                    this.blendSrc = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE;
                    this.blendDst = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDMODE"].ONE;
                    this.blendEquation = _hgl__WEBPACK_IMPORTED_MODULE_0__["BLENDEQUATION"].MAX;
                    break;
            }
            if (prevBlend !== (this.blend !== _hgl__WEBPACK_IMPORTED_MODULE_0__["BLEND"].NONE)) {
                if (this._scene) {
                    this._scene.layers._dirtyBlend = true;
                }
                else {
                    this._dirtyBlend = true;
                }
            }
            this._updateMeshInstanceKeys();
        },
        enumerable: true,
        configurable: true
    });
    Material.prototype._cloneInternal = function (clone) {
        clone.name = this.name;
        clone.id = id++;
        clone.variants = {}; // ?
        clone.shader = this.shader;
        clone.parameters = {};
        // and need copy parameters of that shader
        for (var parameterName in this.parameters) {
            if (this.parameters.hasOwnProperty(parameterName)) {
                clone.parameters[parameterName] = { scopeId: null, data: this.parameters[parameterName].data, passFlags: this.parameters[parameterName].passFlags };
            }
        }
        // Render states
        clone.alphaTest = this.alphaTest;
        clone.alphaToCoverage = this.alphaToCoverage;
        clone.blend = this.blend;
        clone.blendSrc = this.blendSrc;
        clone.blendDst = this.blendDst;
        clone.blendEquation = this.blendEquation;
        clone.separateAlphaBlend = this.separateAlphaBlend;
        clone.blendSrcAlpha = this.blendSrcAlpha;
        clone.blendDstAlpha = this.blendDstAlpha;
        clone.blendAlphaEquation = this.blendAlphaEquation;
        clone.cull = this.cull;
        clone.depthTest = this.depthTest;
        clone.depthWrite = this.depthWrite;
        clone.depthBias = this.depthBias;
        clone.slopeDepthBias = this.slopeDepthBias;
        if (this.stencilFront)
            clone.stencilFront = this.stencilFront.clone();
        if (this.stencilBack) {
            if (this.stencilFront === this.stencilBack) {
                clone.stencilBack = clone.stencilFront;
            }
            else {
                clone.stencilBack = this.stencilBack.clone();
            }
        }
        clone.redWrite = this.redWrite;
        clone.greenWrite = this.greenWrite;
        clone.blueWrite = this.blueWrite;
        clone.alphaWrite = this.alphaWrite;
        clone.meshInstances = [];
    };
    Material.prototype.clone = function () {
        var clone = new Material();
        this._cloneInternal(clone);
        return clone;
    };
    Material.prototype._updateMeshInstanceKeys = function () {
        var i;
        var meshInstances = this.meshInstances;
        for (i = 0; i < meshInstances.length; i++) {
            meshInstances[i].updateKey();
        }
    };
    Material.prototype.updateShader = function (device, scene, objDefs) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        // For vanilla materials, the shader can only be set by the user
    };
    // Parameter management
    Material.prototype.clearParameters = function () {
        this.parameters = {};
    };
    Material.prototype.getParameters = function () {
        return this.parameters;
    };
    Material.prototype.clearVariants = function () {
        var meshInstance;
        for (var s in this.variants) {
            if (this.variants.hasOwnProperty(s)) {
                this.variants[s]._refCount--;
            }
        }
        this.variants = {};
        var j;
        for (var i = 0; i < this.meshInstances.length; i++) {
            meshInstance = this.meshInstances[i];
            for (j = 0; j < meshInstance._shader.length; j++) {
                meshInstance._shader[j] = null;
            }
        }
    };
    Material.prototype.getParameter = function (name) {
        return this.parameters[name];
    };
    Material.prototype.setParameter = function (arg, data, passFlags) {
        // if (passFlags === undefined) passFlags = -524285; // All bits set except 2 - 18 range
        if (passFlags === void 0) { passFlags = -524285; }
        var name;
        if (data === undefined && typeof (arg) === 'object') {
            var uniformObject = arg;
            if (uniformObject.length) {
                for (var i = 0; i < uniformObject.length; i++)
                    this.setParameter(uniformObject[i]);
                return;
            }
            else {
                name = uniformObject.name;
                // tslint:disable-next-line:no-parameter-reassignment
                data = uniformObject.value;
            }
        }
        else {
            name = arg;
        }
        var param = this.parameters[name];
        if (param) {
            param.data = data;
            param.passFlags = passFlags;
        }
        else {
            this.parameters[name] = {
                scopeId: null,
                data: data,
                passFlags: passFlags
            };
        }
    };
    Material.prototype.deleteParameter = function (name) {
        if (this.parameters[name]) {
            delete this.parameters[name];
        }
    };
    Material.prototype.setParameters = function () {
        // Push each shader parameter into scope
        // tslint:disable-next-line:forin
        for (var paramName in this.parameters) {
            var parameter = this.parameters[paramName];
            // TODO: Fix https://github.com/playcanvas/engine/issues/597
            //if (!parameter.scopeId) {
            //    parameter.scopeId = device.scope.resolve(paramName);
            //}
            parameter.scopeId.setValue(parameter.data);
        }
    };
    Material.prototype.update = function () {
        throw Error('Not Implemented in base class');
    };
    Material.prototype.init = function (data) {
        throw Error('Not Implemented in base class');
    };
    Material.prototype.getName = function () {
        return this.name;
    };
    Material.prototype.setName = function (name) {
        this.name = name;
    };
    Material.prototype.getShader = function () {
        return this.shader;
    };
    Material.prototype.setShader = function (shader) {
        if (this._shader) {
            this._shader._refCount--;
        }
        this._shader = shader;
        if (shader)
            shader._refCount++;
    };
    Material.prototype.destroy = function () {
        if (this.shader) {
            this.shader._refCount--;
            if (this.shader._refCount < 1) {
                this.shader.destroy();
            }
        }
        var variant;
        for (var s in this.variants) {
            if (this.variants.hasOwnProperty(s)) {
                variant = this.variants[s];
                if (variant === this.shader)
                    continue;
                variant._refCount--;
                if (variant._refCount < 1) {
                    variant.destroy();
                }
            }
        }
        this.variants = {};
        this.shader = null;
        // tslint:disable-next-line:one-variable-per-declaration
        var meshInstance, j;
        for (var i = 0; i < this.meshInstances.length; i++) {
            meshInstance = this.meshInstances[i];
            for (j = 0; j < meshInstance._shader.length; j++) {
                meshInstance._shader[j] = null;
            }
            meshInstance._material = null;
            if (this !== _scene_scene__WEBPACK_IMPORTED_MODULE_1__["Scene"].defaultMaterial) {
                meshInstance.material = _scene_scene__WEBPACK_IMPORTED_MODULE_1__["Scene"].defaultMaterial;
            }
        }
    };
    return Material;
}());



/***/ }),

/***/ "./src/math/math.ts":
/*!**************************!*\
  !*** ./src/math/math.ts ***!
  \**************************/
/*! exports provided: generateUUID, intToBytes24, intToBytes32, bytesToInt24, bytesToInt32, DEG_TO_RAD, RAD_TO_DEG, INV_LOG2, clamp, lerp, lerpAngle, powerOfTwo, nextPowerOfTwo, random, smoothstep, smootherstep, intToBytes, bytesToInt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateUUID", function() { return generateUUID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intToBytes24", function() { return intToBytes24; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intToBytes32", function() { return intToBytes32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bytesToInt24", function() { return bytesToInt24; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bytesToInt32", function() { return bytesToInt32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEG_TO_RAD", function() { return DEG_TO_RAD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RAD_TO_DEG", function() { return RAD_TO_DEG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INV_LOG2", function() { return INV_LOG2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerpAngle", function() { return lerpAngle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "powerOfTwo", function() { return powerOfTwo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nextPowerOfTwo", function() { return nextPowerOfTwo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "smoothstep", function() { return smoothstep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "smootherstep", function() { return smootherstep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intToBytes", function() { return intToBytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bytesToInt", function() { return bytesToInt; });
/* tslint:disable */
var generateUUID = (function _() {
    // http://www.broofa.com/Tools/Math.uuid.htm
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = new Array(36);
    var rnd = 0;
    var r;
    return function generateUUID() {
        for (var i = 0; i < 36; i++) {
            if (i === 8 || i === 13 || i === 18 || i === 23) {
                uuid[i] = '-';
            }
            else if (i === 14) {
                uuid[i] = '4';
            }
            else {
                if (rnd <= 0x02)
                    rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
                // tslint:disable-next-line:number-literal-format
                r = rnd & 0xf;
                rnd = rnd >> 4;
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
            }
        }
        return uuid.join(''); //返回36位的uuid通用唯一识别码 (Universally Unique Identifier).
    };
})();
function intToBytes24(i) {
    var r, g, b;
    r = (i >> 16) & 0xff;
    g = (i >> 8) & 0xff;
    b = (i) & 0xff;
    return [r, g, b];
}
function intToBytes32(i) {
    var r, g, b, a;
    r = (i >> 24) & 0xff;
    g = (i >> 16) & 0xff;
    b = (i >> 8) & 0xff;
    a = (i) & 0xff;
    return [r, g, b, a];
}
function bytesToInt24(r, g, b) {
    if (r.length) {
        b = r[2];
        g = r[1];
        r = r[0];
    }
    return ((r << 16) | (g << 8) | b);
}
function bytesToInt32(r, g, b, a) {
    if (r.length) {
        a = r[3];
        b = r[2];
        g = r[1];
        r = r[0];
    }
    // Why ((r << 24)>>>32)?
    // << operator uses signed 32 bit numbers, so 128<<24 is negative.
    // >>> used unsigned so >>>32 converts back to an unsigned.
    // See http://stackoverflow.com/questions/1908492/unsigned-integer-in-javascript
    return ((r << 24) | (g << 16) | (b << 8) | a) >>> 32;
}
var DEG_TO_RAD = Math.PI / 180;
var RAD_TO_DEG = 180 / Math.PI;
var INV_LOG2 = 1 / Math.log(2);
function clamp(value, min, max) {
    if (value >= max)
        return max;
    if (value <= min)
        return min;
    return value;
}
function lerp(a, b, alpha) {
    return a + (b - a) * clamp(alpha, 0, 1);
}
function lerpAngle(a, b, alpha) {
    if (b - a > 180) {
        b -= 360;
    }
    if (b - a < -180) {
        b += 360;
    }
    return lerp(a, b, clamp(alpha, 0, 1));
}
function powerOfTwo(x) {
    return ((x !== 0) && !(x & (x - 1)));
}
function nextPowerOfTwo(val) {
    val--;
    val = (val >> 1) | val;
    val = (val >> 2) | val;
    val = (val >> 4) | val;
    val = (val >> 8) | val;
    val = (val >> 16) | val;
    val++;
    return val;
}
function random(min, max) {
    var diff = max - min;
    return Math.random() * diff + min;
}
function smoothstep(min, max, x) {
    if (x <= min)
        return 0;
    if (x >= max)
        return 1;
    x = (x - min) / (max - min);
    return x * x * (3 - 2 * x);
}
function smootherstep(min, max, x) {
    if (x <= min)
        return 0;
    if (x >= max)
        return 1;
    x = (x - min) / (max - min);
    return x * x * x * (x * (x * 6 - 15) + 10);
}
var intToBytes = intToBytes32;
var bytesToInt = bytesToInt32;
if (!Math.log2) {
    Math.log2 = function (x) { return Math.log(x) * INV_LOG2; };
}


/***/ }),

/***/ "./src/scene/scene.ts":
/*!****************************!*\
  !*** ./src/scene/scene.ts ***!
  \****************************/
/*! exports provided: Scene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scene", function() { return Scene; });
/* harmony import */ var _core_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/element */ "./src/core/element.ts");
/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\scene\Scene.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Wednesday, July 11th 2018, 8:55:13 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, July 27th 2018, 12:58:28 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Scene = /** @class */ (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Scene.prototype.add = function () {
        console.log();
    };
    Scene.defaultMaterial = 'defaultMaterial';
    return Scene;
}(_core_element__WEBPACK_IMPORTED_MODULE_0__["IElement"]));



/***/ })

/******/ });
//# sourceMappingURL=index.js.map