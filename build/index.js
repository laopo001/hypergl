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
/*
 * ProjectName: hypergl
 * FilePath: \demo\index.ts
 * Created Date: Saturday, August 18th 2018, 5:59:50 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 10:31:15 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */

var app = new _src_index__WEBPACK_IMPORTED_MODULE_0__["Application"]({
    width: 1000,
    height: 600
});
var format = new _src_index__WEBPACK_IMPORTED_MODULE_0__["VertexFormat"]([{
        semantic: _src_index__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"].POSITION,
        size: 3,
        dataType: Float32Array,
        normalize: true
    }, {
        semantic: _src_index__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"].COLOR,
        size: 3,
        dataType: Float32Array,
        normalize: true
    }]);
var vertices = [
    0, 0.5, -0.4, 0.4, 1, 0.4,
    -0.5, -0.5, -0.4, 0.4, 1, 0.4,
    0.5, -0.5, -0.4, 1, 0.4, 0.4,
    0.5, 0.4, -0.2, 1, 0.4, 0.4,
    -0.5, 0.4, -0.2, 1, 1, 0.4,
    0, -0.6, -0.2, 1, 1, 0.4,
    0, 0.5, 0, 0.4, 0.4, 1,
    -0.5, -0.5, 0, 0.4, 0.4, 1,
    0.5, -0.5, 0, 1, 0.4, 0.4
];
var buffer = new _src_index__WEBPACK_IMPORTED_MODULE_0__["VertexBuffer"](app.rendererPlatform, format, _src_index__WEBPACK_IMPORTED_MODULE_0__["BUFFER"].STATIC, vertices);
console.log(format, buffer);


/***/ }),

/***/ "./src/application.ts":
/*!****************************!*\
  !*** ./src/application.ts ***!
  \****************************/
/*! exports provided: Application */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return Application; });
/* harmony import */ var _scene_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scene/scene */ "./src/scene/scene.ts");
/* harmony import */ var _graphics_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphics/renderer */ "./src/graphics/renderer.ts");
/* harmony import */ var _graphics_canvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./graphics/canvas */ "./src/graphics/canvas.ts");
/*
 * ProjectName: hypergl
 * FilePath: \src\application.ts
 * Created Date: Saturday, August 18th 2018, 4:20:30 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 10:29:46 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */



var Application = /** @class */ (function () {
    function Application(option) {
        this.sceneInstances = [new _scene_scene__WEBPACK_IMPORTED_MODULE_0__["Scene"]()];
        this.activeIndex = 0;
        this.canvas = Object(_graphics_canvas__WEBPACK_IMPORTED_MODULE_2__["createCanvas"])(option);
        this.rendererPlatform = new _graphics_renderer__WEBPACK_IMPORTED_MODULE_1__["RendererPlatform"](this.canvas);
        this.complete();
    }
    Object.defineProperty(Application.prototype, "scene", {
        get: function () {
            return this.sceneInstances[this.activeIndex];
        },
        enumerable: true,
        configurable: true
    });
    Application.prototype.start = function () {
        window.requestAnimationFrame(this.tick);
    };
    Application.prototype.add = function (scene) {
        this.sceneInstances.push(scene);
    };
    Application.prototype.tick = function () {
        this.render();
    };
    Application.prototype.render = function () {
        // TODO
    };
    Application.prototype.complete = function () {
        Object(_graphics_canvas__WEBPACK_IMPORTED_MODULE_2__["appendCanvas"])(this.canvas);
    };
    return Application;
}());



/***/ }),

/***/ "./src/conf.ts":
/*!*********************!*\
  !*** ./src/conf.ts ***!
  \*********************/
/*! exports provided: DataType, SEMANTIC, BUFFER */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataType", function() { return DataType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEMANTIC", function() { return SEMANTIC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BUFFER", function() { return BUFFER; });
/*
 * ProjectName: hypergl
 * FilePath: \src\conf.ts
 * Created Date: Tuesday, August 14th 2018, 5:02:06 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 5:22:47 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */
/**
 * 数据类型
 *
 * @export
 * @enum {number}
 */
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
/**
 * 顶点数据输入定义
 *
 * @export
 * @enum {number}
 */
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
var BUFFER;
(function (BUFFER) {
    BUFFER[BUFFER["STATIC"] = 1] = "STATIC";
    BUFFER[BUFFER["DYNAMIC"] = 2] = "DYNAMIC";
    BUFFER[BUFFER["STREAM"] = 3] = "STREAM";
    BUFFER[BUFFER["GPUDYNAMIC"] = 4] = "GPUDYNAMIC";
})(BUFFER || (BUFFER = {}));


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
/*
 * ProjectName: hypergl
 * FilePath: \src\core\element.ts
 * Created Date: Saturday, August 18th 2018, 4:23:54 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 4:24:14 pm
 * Modified By: dadigua
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

/***/ "./src/graphics/canvas.ts":
/*!********************************!*\
  !*** ./src/graphics/canvas.ts ***!
  \********************************/
/*! exports provided: createCanvas, appendCanvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCanvas", function() { return createCanvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendCanvas", function() { return appendCanvas; });
/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\canvas.ts
 * Created Date: Saturday, August 18th 2018, 4:46:24 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 5:17:15 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */
function createCanvas(option) {
    var canvas = document.createElement('canvas');
    canvas.width = option.width;
    canvas.height = option.height;
    return canvas;
}
function appendCanvas(canvas) {
    document.body.appendChild(canvas);
}


/***/ }),

/***/ "./src/graphics/index.ts":
/*!*******************************!*\
  !*** ./src/graphics/index.ts ***!
  \*******************************/
/*! exports provided: VertexBuffer, VertexFormat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vertexBuffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vertexBuffer */ "./src/graphics/vertexBuffer.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VertexBuffer", function() { return _vertexBuffer__WEBPACK_IMPORTED_MODULE_0__["VertexBuffer"]; });

/* harmony import */ var _vertexFormat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vertexFormat */ "./src/graphics/vertexFormat.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VertexFormat", function() { return _vertexFormat__WEBPACK_IMPORTED_MODULE_1__["VertexFormat"]; });

/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\index.ts
 * Created Date: Saturday, August 18th 2018, 5:29:48 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 5:30:05 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */




/***/ }),

/***/ "./src/graphics/renderer.ts":
/*!**********************************!*\
  !*** ./src/graphics/renderer.ts ***!
  \**********************************/
/*! exports provided: RendererPlatform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RendererPlatform", function() { return RendererPlatform; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/util.ts");
/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\device.ts
 * Created Date: Wednesday, August 15th 2018, 12:24:29 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 9:28:29 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */

var RendererPlatform = /** @class */ (function () {
    function RendererPlatform(canvas) {
        this.platform = 'webgl2';
        this.webgl2 = canvas.getContext('webgl2');
        if (this.gl) {
            this.platform = 'webgl2';
            _util__WEBPACK_IMPORTED_MODULE_0__["Log"].debug("platform:" + this.platform);
        }
        else {
            this.webgl = canvas.getContext('webgl');
            if (this.gl) {
                this.platform = 'webgl';
                _util__WEBPACK_IMPORTED_MODULE_0__["Log"].debug("platform:" + this.platform);
            }
            else {
                _util__WEBPACK_IMPORTED_MODULE_0__["Log"].error('你的浏览器不支持webgl');
            }
        }
    }
    Object.defineProperty(RendererPlatform.prototype, "gl", {
        get: function () {
            return this.webgl2 || this.webgl;
        },
        enumerable: true,
        configurable: true
    });
    return RendererPlatform;
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
/* harmony import */ var _conf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../conf */ "./src/conf.ts");
/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\vertexBuffer.ts
 * Created Date: Tuesday, August 14th 2018, 5:02:32 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 9:18:09 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */

var VertexBuffer = /** @class */ (function () {
    function VertexBuffer(renderer, format, usage, data, numVertices) {
        if (usage === void 0) { usage = _conf__WEBPACK_IMPORTED_MODULE_0__["BUFFER"].STATIC; }
        this.renderer = renderer;
        this.format = format;
        this.usage = usage;
        var size = this.format.sum_size;
        if (Array.isArray(data)) {
            // tslint:disable-next-line:no-parameter-reassignment
            numVertices = data.length / size;
            this.buffer = new ArrayBuffer(this.format.stride * numVertices);
            for (var i = 0; i < numVertices; i++) {
                var slice = data.slice(i * size, (i + 1) * size);
                var sum = 0;
                for (var j = 0; j < this.format.elements.length; j++) {
                    var item = this.format.elements[j];
                    var view = new item.dataType(this.buffer, i * format.stride + item.offset, item.size);
                    var end = sum + item.size;
                    var slice2 = slice.slice(sum, end);
                    sum = end;
                    for (var k = 0; k < item.size; k++) {
                        view[k] = slice2[k];
                    }
                }
            }
        }
        else {
            this.buffer = data;
        }
        this.numVertices = numVertices;
    }
    VertexBuffer.prototype.bind = function () {
        var gl = this.renderer.gl;
        this.bufferId = !gl.createBuffer();
        var glUsage;
        switch (this.usage) {
            case _conf__WEBPACK_IMPORTED_MODULE_0__["BUFFER"].STATIC:
                glUsage = gl.STATIC_DRAW;
                break;
            case _conf__WEBPACK_IMPORTED_MODULE_0__["BUFFER"].DYNAMIC:
                glUsage = gl.DYNAMIC_DRAW;
                break;
            case _conf__WEBPACK_IMPORTED_MODULE_0__["BUFFER"].STREAM:
                glUsage = gl.STREAM_DRAW;
                break;
            case _conf__WEBPACK_IMPORTED_MODULE_0__["BUFFER"].GPUDYNAMIC:
                if (this.renderer.platform === 'webgl2') {
                    glUsage = gl.DYNAMIC_COPY;
                }
                else {
                    glUsage = gl.STATIC_DRAW;
                }
                break;
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferId);
        gl.bufferData(gl.ARRAY_BUFFER, this.buffer, glUsage);
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
/* harmony import */ var _conf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../conf */ "./src/conf.ts");
/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\vertexFormat.ts
 * Created Date: Tuesday, August 14th 2018, 5:02:37 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 7:09:01 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */

var VertexFormat = /** @class */ (function () {
    function VertexFormat(vartexTypes) {
        var _this = this;
        this.elements = [];
        this.sum_size = 0;
        this.stride = 0;
        this.hasUv0 = false;
        this.hasUv1 = false;
        this.hasColor = false;
        var offset = 0;
        for (var i = 0; i < vartexTypes.length; i++) {
            var item = vartexTypes[i];
            var element = {
                semantic: item.semantic,
                offset: offset,
                dataType: item.dataType,
                size: item.size,
                length: item.size * item.dataType.BYTES_PER_ELEMENT,
                normalize: (item.normalize === undefined) ? false : item.normalize,
                stride: 0
            };
            this.elements.push(element);
            offset += item.size * item.dataType.BYTES_PER_ELEMENT;
            this.sum_size += item.size;
            if (item.semantic === _conf__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"].TEXCOORD0) {
                this.hasUv0 = true;
            }
            else if (item.semantic === _conf__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"].TEXCOORD1) {
                this.hasUv1 = true;
            }
            else if (item.semantic === _conf__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"].COLOR) {
                this.hasColor = true;
            }
        }
        this.stride = offset;
        this.elements.forEach(function (item) {
            item.stride = _this.stride;
        });
    }
    return VertexFormat;
}());



/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: DataType, SEMANTIC, BUFFER, Application, VertexBuffer, VertexFormat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _conf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conf */ "./src/conf.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataType", function() { return _conf__WEBPACK_IMPORTED_MODULE_0__["DataType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SEMANTIC", function() { return _conf__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BUFFER", function() { return _conf__WEBPACK_IMPORTED_MODULE_0__["BUFFER"]; });

/* harmony import */ var _application__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./application */ "./src/application.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return _application__WEBPACK_IMPORTED_MODULE_1__["Application"]; });

/* harmony import */ var _graphics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./graphics */ "./src/graphics/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VertexBuffer", function() { return _graphics__WEBPACK_IMPORTED_MODULE_2__["VertexBuffer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VertexFormat", function() { return _graphics__WEBPACK_IMPORTED_MODULE_2__["VertexFormat"]; });

/*
 * ProjectName: hypergl
 * FilePath: \src\index.ts
 * Created Date: Saturday, August 18th 2018, 4:11:24 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 5:30:15 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */





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
/*
 * ProjectName: hypergl
 * FilePath: \src\scene.ts
 * Created Date: Saturday, August 18th 2018, 4:22:49 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 10:15:10 pm
 * Modified By: dadigua
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
        // TODO
    };
    return Scene;
}(_core_element__WEBPACK_IMPORTED_MODULE_0__["IElement"]));



/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! exports provided: Log */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Log", function() { return Log; });
/*
 * ProjectName: hypergl
 * FilePath: \src\util.ts
 * Created Date: Tuesday, August 14th 2018, 5:01:35 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 5:10:59 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */
/**
 * 日志
 */
// tslint:disable-next-line:no-namespace
var Log;
(function (Log) {
    function assert(condition, message) {
        if (condition) {
            throw new Error(message);
        }
    }
    Log.assert = assert;
    function warn(condition, message) {
        if (condition) {
            console.warn(message);
        }
    }
    Log.warn = warn;
    function error(message) {
        throw new Error(message);
    }
    Log.error = error;
    function log(message) {
        console.log(message);
    }
    Log.log = log;
    function debug(message) {
        console.debug(message);
    }
    Log.debug = debug;
})(Log || (Log = {}));


/***/ })

/******/ });
//# sourceMappingURL=index.js.map