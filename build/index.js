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
/* harmony import */ var _src_graphics_shaders_vertex_vert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/graphics/shaders/vertex.vert */ "./src/graphics/shaders/vertex.vert");
/* harmony import */ var _src_graphics_shaders_vertex_vert__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_src_graphics_shaders_vertex_vert__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_graphics_shaders_fragment_frag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/graphics/shaders/fragment.frag */ "./src/graphics/shaders/fragment.frag");
/* harmony import */ var _src_graphics_shaders_fragment_frag__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_src_graphics_shaders_fragment_frag__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/util */ "./demo/utils/util.ts");
/* harmony import */ var _src_math__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../src/math */ "./src/math/index.ts");
/* harmony import */ var _src_scene_camera__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../src/scene/camera */ "./src/scene/camera.ts");
/*
 * ProjectName: hypergl
 * FilePath: \demo\index.ts
 * Created Date: Saturday, August 18th 2018, 5:59:50 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, August 22nd 2018, 9:56:40 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */
// tslint:disable






var app = new _src_index__WEBPACK_IMPORTED_MODULE_0__["Application"](document.getElementById('canvas'));
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
    1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0, 1.0, 0.0, 1.0,
    -1.0, -1.0, 1.0, 1.0, 0.0, 0.0,
    1.0, -1.0, 1.0, 1.0, 1.0, 0.0,
    1.0, -1.0, -1.0, 0.0, 1.0, 0.0,
    1.0, 1.0, -1.0, 0.0, 1.0, 1.0,
    -1.0, 1.0, -1.0, 0.0, 0.0, 1.0,
    -1.0, -1.0, -1.0, 0.0, 0.0, 0.0 // v7 Black
];
var indices = [
    0, 1, 2, 0, 2, 3,
    0, 3, 4, 0, 4, 5,
    0, 5, 6, 0, 6, 1,
    1, 6, 7, 1, 7, 2,
    7, 4, 3, 7, 3, 2,
    4, 7, 6, 4, 6, 5 // back
];
var vbuffer = new _src_index__WEBPACK_IMPORTED_MODULE_0__["VertexBuffer"](app.rendererPlatform, format, _src_index__WEBPACK_IMPORTED_MODULE_0__["BUFFER"].STATIC, vertices);
console.log(new Float32Array(vbuffer.buffer));
vbuffer.bind();
var ibuffer = new _src_index__WEBPACK_IMPORTED_MODULE_0__["IndexBuffer"](app.rendererPlatform, Uint8Array, _src_index__WEBPACK_IMPORTED_MODULE_0__["BUFFER"].STATIC, indices);
ibuffer.bind();
var camera = new _src_scene_camera__WEBPACK_IMPORTED_MODULE_5__["Camera"](45, app.canvas.width / app.canvas.height, 1, 1000);
// let viewMatrix = new Mat4().setLookAt(new Vec3(3, 3, 3), new Vec3(0, 0, 0), new Vec3(0, 1, 0)).invert();
// let projMatrix = new Mat4();
// projMatrix.setPerspective(45, app.canvas.width / app.canvas.height, 1, 1000);
var modelMatrix = new _src_math__WEBPACK_IMPORTED_MODULE_4__["Mat4"]();
// modelMatrix.setTranslate(0, 0, 1);
// modelMatrix.setFromEulerAngles(45, 45, 45);
// let mvpMatrix = new Mat4().mul(projMatrix).mul(viewMatrix).mul(modelMatrix);
var mvpMatrix = camera.PVMatrix.mul(modelMatrix);
var gl = app.rendererPlatform.gl;
var program = Object(_utils_util__WEBPACK_IMPORTED_MODULE_3__["initShaders"])(gl, _src_graphics_shaders_vertex_vert__WEBPACK_IMPORTED_MODULE_1___default.a, _src_graphics_shaders_fragment_frag__WEBPACK_IMPORTED_MODULE_2___default.a);
var FSIZE = Float32Array.BYTES_PER_ELEMENT;
var a_Position = gl.getAttribLocation(program, 'a_Position');
gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 6 * FSIZE, 0);
gl.enableVertexAttribArray(a_Position);
var a_Color = gl.getAttribLocation(program, 'a_Color');
gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 6 * FSIZE, 3 * FSIZE);
gl.enableVertexAttribArray(a_Color);
var u_MvpjMatrix = gl.getUniformLocation(program, 'u_MvpjMatrix');
gl.uniformMatrix4fv(u_MvpjMatrix, false, mvpMatrix.data);
// 深度测试
gl.enable(gl.DEPTH_TEST);
gl.clear(gl.DEPTH_BUFFER_BIT);
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawElements(gl.TRIANGLES, ibuffer.length, gl.UNSIGNED_BYTE, 0);
console.log(format, vbuffer, ibuffer);
app.on('update', function () {
});


/***/ }),

/***/ "./demo/utils/util.ts":
/*!****************************!*\
  !*** ./demo/utils/util.ts ***!
  \****************************/
/*! exports provided: initShaders, createProgram, loadShader, createVbo, createIbo, loadImage, loadTexture */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initShaders", function() { return initShaders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createProgram", function() { return createProgram; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadShader", function() { return loadShader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createVbo", function() { return createVbo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createIbo", function() { return createIbo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadImage", function() { return loadImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadTexture", function() { return loadTexture; });
function initShaders(gl, vshader, fshader) {
    var program = createProgram(gl, vshader, fshader);
    return program;
}
function createProgram(gl, vshader, fshader) {
    var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
    var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        console.log(gl.getProgramInfoLog(program));
        return false;
    }
    gl.useProgram(program);
    return program;
}
function loadShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        console.log(gl.getShaderInfoLog(shader));
        return false;
    }
    return shader;
}
function createVbo(gl, data) {
    // 创建缓存区对象
    var vbo = gl.createBuffer();
    // 将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    // 想向缓冲区对象中写入数据
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    return vbo;
}
function createIbo(gl, data) {
    // 创建缓存区对象
    var vbo = gl.createBuffer();
    // 将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo);
    // 想向缓冲区对象中写入数据
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
    return vbo;
}
function loadImage(url) {
    return new Promise(function (resolve, reject) {
        var image = new Image();
        image.onload = function () {
            resolve(image);
        };
        image.src = url;
    });
}
function loadTexture(gl, u_Sampler, image, t) {
    if (t === void 0) { t = 0; }
    console.log(image);
    var texture = gl.createTexture();
    // 对纹理图像进行Y轴反转
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    // 开启0号纹理单元
    gl.activeTexture(gl['TEXTURE' + t]);
    // 向target绑定纹理对象
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // 配置纹理参数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    // 配置纹理图像
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    // 将0号纹理传递给着色器
    gl.uniform1i(u_Sampler, t);
}


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
/* harmony import */ var _core_event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/event */ "./src/core/event.ts");
/*
 * ProjectName: hypergl
 * FilePath: \src\application.ts
 * Created Date: Saturday, August 18th 2018, 4:20:30 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, August 22nd 2018, 10:03:00 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */



var Application = /** @class */ (function () {
    function Application(canvas, option) {
        this.sceneInstances = [];
        this.activeIndex = 0;
        this.canvas = canvas;
        this.rendererPlatform = new _graphics_renderer__WEBPACK_IMPORTED_MODULE_1__["RendererPlatform"](this.canvas);
        this.sceneInstances.push(new _scene_scene__WEBPACK_IMPORTED_MODULE_0__["Scene"](this));
        this.start();
    }
    Object.defineProperty(Application.prototype, "scene", {
        get: function () {
            return this.sceneInstances[this.activeIndex];
        },
        enumerable: true,
        configurable: true
    });
    Application.prototype.start = function () {
        this.tick();
    };
    Application.prototype.add = function (scene) {
        this.sceneInstances.push(scene);
    };
    Application.prototype.on = function (name, cb) {
        _core_event__WEBPACK_IMPORTED_MODULE_2__["event"].on(name, cb);
    };
    Application.prototype.tick = function () {
        // this.scene.renderer();
        _core_event__WEBPACK_IMPORTED_MODULE_2__["event"].fire('update');
        window.requestAnimationFrame(this.tick.bind(this));
    };
    Application.prototype.complete = function () {
        // appendCanvas(this.canvas);
    };
    Object.defineProperty(Application.prototype, Symbol.toStringTag, {
        get: function () {
            return 'Application';
        },
        enumerable: true,
        configurable: true
    });
    return Application;
}());



/***/ }),

/***/ "./src/conf.ts":
/*!*********************!*\
  !*** ./src/conf.ts ***!
  \*********************/
/*! exports provided: DataType, SEMANTIC, BUFFER, CURVE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataType", function() { return DataType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEMANTIC", function() { return SEMANTIC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BUFFER", function() { return BUFFER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CURVE", function() { return CURVE; });
/*
 * ProjectName: hypergl
 * FilePath: \src\conf.ts
 * Created Date: Tuesday, August 14th 2018, 5:02:06 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, August 19th 2018, 12:48:35 am
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
    BUFFER["STATIC"] = "STATIC";
    BUFFER["DYNAMIC"] = "DYNAMIC";
    BUFFER["STREAM"] = "STREAM";
    BUFFER["GPUDYNAMIC"] = "GPUDYNAMIC";
})(BUFFER || (BUFFER = {}));
var CURVE;
(function (CURVE) {
    CURVE[CURVE["LINEAR"] = 0] = "LINEAR";
    CURVE[CURVE["SMOOTHSTEP"] = 1] = "SMOOTHSTEP";
    CURVE[CURVE["CATMULL"] = 2] = "CATMULL";
    CURVE[CURVE["CARDINAL"] = 3] = "CARDINAL";
})(CURVE || (CURVE = {}));


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

/***/ "./src/core/event.ts":
/*!***************************!*\
  !*** ./src/core/event.ts ***!
  \***************************/
/*! exports provided: event */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "event", function() { return event; });
/*
 * ProjectName: hypergl
 * FilePath: \src\core\event.ts
 * Created Date: Wednesday, August 22nd 2018, 1:40:58 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, August 22nd 2018, 1:48:02 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */
var _callbacks = {};
var event = {
    on: function (name, callback) {
        if (event.hasEvent(name)) {
            _callbacks[name].push(callback);
        }
        else {
            _callbacks[name] = [callback];
        }
        return event;
    },
    off: function (name, callback) {
        if (event.hasEvent(name)) {
            var index = _callbacks[name].findIndex(function (x) { return x === callback; });
            _callbacks[name].splice(index, 1);
        }
        return event;
    },
    fireOnce: function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (event.hasEvent(name)) {
            var waitMoves_1 = [];
            _callbacks[name].forEach(function (x, index) {
                x.apply(window, args);
                // tslint:disable-next-line:no-unused-expression
                x.once && waitMoves_1.push(index);
            });
            var t = void 0;
            // tslint:disable-next-line:no-conditional-assignment
            while (t = waitMoves_1.pop()) {
                _callbacks[name].splice(t, 1);
            }
        }
        return event;
    },
    fire: function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (event.hasEvent(name)) {
            _callbacks[name].forEach(function (x, index) {
                x.apply(window, args);
            });
        }
        return event;
    },
    once: function (name, callback) {
        callback.once = true;
        this.on(name, callback);
        return event;
    },
    hasEvent: function (name) {
        return name in _callbacks;
    }
};


/***/ }),

/***/ "./src/graphics/index.ts":
/*!*******************************!*\
  !*** ./src/graphics/index.ts ***!
  \*******************************/
/*! exports provided: VertexBuffer, VertexFormat, IndexBuffer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vertexBuffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vertexBuffer */ "./src/graphics/vertexBuffer.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VertexBuffer", function() { return _vertexBuffer__WEBPACK_IMPORTED_MODULE_0__["VertexBuffer"]; });

/* harmony import */ var _vertexFormat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vertexFormat */ "./src/graphics/vertexFormat.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VertexFormat", function() { return _vertexFormat__WEBPACK_IMPORTED_MODULE_1__["VertexFormat"]; });

/* harmony import */ var _indexBuffer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./indexBuffer */ "./src/graphics/indexBuffer.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IndexBuffer", function() { return _indexBuffer__WEBPACK_IMPORTED_MODULE_2__["IndexBuffer"]; });

/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\index.ts
 * Created Date: Saturday, August 18th 2018, 5:29:48 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 11:04:53 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */





/***/ }),

/***/ "./src/graphics/indexBuffer.ts":
/*!*************************************!*\
  !*** ./src/graphics/indexBuffer.ts ***!
  \*************************************/
/*! exports provided: IndexBuffer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexBuffer", function() { return IndexBuffer; });
/* harmony import */ var _conf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../conf */ "./src/conf.ts");
/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\indexBuffer.ts
 * Created Date: Tuesday, August 14th 2018, 5:02:44 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, August 19th 2018, 1:36:08 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */

var IndexBuffer = /** @class */ (function () {
    function IndexBuffer(renderer, dataType, usage, data, length) {
        if (usage === void 0) { usage = _conf__WEBPACK_IMPORTED_MODULE_0__["BUFFER"].STATIC; }
        this.renderer = renderer;
        this.dataType = dataType;
        this.usage = usage;
        this.length = 0;
        if (Array.isArray(data)) {
            this.buffer = new dataType(data).buffer;
            this.length = data.length;
        }
        else {
            this.buffer = data;
            this.length = length || new dataType(data).length;
        }
    }
    IndexBuffer.prototype.bind = function () {
        var gl = this.renderer.gl;
        if (!this.bufferId) {
            this.bufferId = gl.createBuffer();
        }
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
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferId);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.buffer, glUsage);
    };
    return IndexBuffer;
}());



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
 * Last Modified: Sunday, August 19th 2018, 1:06:59 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */

var RendererPlatform = /** @class */ (function () {
    function RendererPlatform(canvas) {
        this.webgl2 = canvas.getContext('webgl2');
        if (this.webgl2) {
            this.platform = 'webgl2';
            _util__WEBPACK_IMPORTED_MODULE_0__["Log"].debug("platform:" + this.platform);
        }
        else {
            this.webgl = canvas.getContext('webgl');
            if (this.webgl) {
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

/***/ "./src/graphics/shaders/fragment.frag":
/*!********************************************!*\
  !*** ./src/graphics/shaders/fragment.frag ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#version 300 es\nprecision mediump float;\nin vec4 v_Color;           \nout vec4 outputColor; \n\nvoid main(void) {                          \n    outputColor = v_Color;                \n}"

/***/ }),

/***/ "./src/graphics/shaders/vertex.vert":
/*!******************************************!*\
  !*** ./src/graphics/shaders/vertex.vert ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#version 300 es\nin vec4 a_Position;\nin vec4 a_Color;\nuniform mat4 u_MvpjMatrix;\nout vec4 v_Color;\n\nvoid main(){  \n    gl_Position = u_MvpjMatrix * a_Position;\n    v_Color = a_Color;\n}"

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
 * Last Modified: Sunday, August 19th 2018, 12:49:20 am
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
        if (!this.bufferId) {
            this.bufferId = gl.createBuffer();
        }
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
 * Last Modified: Sunday, August 19th 2018, 12:48:57 am
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
/*! exports provided: DataType, SEMANTIC, BUFFER, CURVE, Application, VertexBuffer, VertexFormat, IndexBuffer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _conf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conf */ "./src/conf.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataType", function() { return _conf__WEBPACK_IMPORTED_MODULE_0__["DataType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SEMANTIC", function() { return _conf__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BUFFER", function() { return _conf__WEBPACK_IMPORTED_MODULE_0__["BUFFER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CURVE", function() { return _conf__WEBPACK_IMPORTED_MODULE_0__["CURVE"]; });

/* harmony import */ var _application__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./application */ "./src/application.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return _application__WEBPACK_IMPORTED_MODULE_1__["Application"]; });

/* harmony import */ var _graphics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./graphics */ "./src/graphics/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VertexBuffer", function() { return _graphics__WEBPACK_IMPORTED_MODULE_2__["VertexBuffer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VertexFormat", function() { return _graphics__WEBPACK_IMPORTED_MODULE_2__["VertexFormat"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IndexBuffer", function() { return _graphics__WEBPACK_IMPORTED_MODULE_2__["IndexBuffer"]; });

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

/***/ "./src/math/curve-set.ts":
/*!*******************************!*\
  !*** ./src/math/curve-set.ts ***!
  \*******************************/
/*! exports provided: CurveSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurveSet", function() { return CurveSet; });
/* harmony import */ var _curve__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./curve */ "./src/math/curve.ts");
/* harmony import */ var _conf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../conf */ "./src/conf.ts");


/* tslint:disable */
var CurveSet = /** @class */ (function () {
    function CurveSet() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var i;
        this.curves = [];
        this._type = _conf__WEBPACK_IMPORTED_MODULE_1__["CURVE"].SMOOTHSTEP;
        if (args.length > 1) {
            for (i = 0; i < args.length; i++) {
                this.curves.push(new _curve__WEBPACK_IMPORTED_MODULE_0__["Curve"](args[i]));
            }
        }
        else {
            if (args.length === 0) {
                this.curves.push(new _curve__WEBPACK_IMPORTED_MODULE_0__["Curve"]());
            }
            else {
                var arg = args[0];
                if (typeof (arg) === 'number') {
                    for (i = 0; i < arg; i++) {
                        this.curves.push(new _curve__WEBPACK_IMPORTED_MODULE_0__["Curve"]());
                    }
                }
                else {
                    for (i = 0; i < arg.length; i++) {
                        this.curves.push(new _curve__WEBPACK_IMPORTED_MODULE_0__["Curve"](arg[i]));
                    }
                }
            }
        }
    }
    CurveSet.prototype.get = function (index) {
        return this.curves[index];
    };
    CurveSet.prototype.value = function (time, result) {
        var length = this.curves.length;
        result = result || [];
        result.length = length;
        for (var i = 0; i < length; i++) {
            result[i] = this.curves[i].value(time);
        }
        return result;
    };
    CurveSet.prototype.clone = function () {
        var result = new CurveSet();
        result.curves = [];
        for (var i = 0; i < this.curves.length; i++) {
            result.curves.push(this.curves[i].clone());
        }
        result._type = this._type;
        return result;
    };
    CurveSet.prototype.quantize = function (precision) {
        precision = Math.max(precision, 2);
        var numCurves = this.curves.length;
        var values = new Float32Array(precision * numCurves);
        var step = 1.0 / (precision - 1);
        var temp = [];
        for (var i = 0; i < precision; i++) { // quantize graph to table of interpolated values
            var value = this.value(step * i, temp);
            if (numCurves === 1) {
                values[i] = value[0];
            }
            else {
                for (var j = 0; j < numCurves; j++) {
                    values[i * numCurves + j] = value[j];
                }
            }
        }
        return values;
    };
    Object.defineProperty(CurveSet.prototype, "length", {
        get: function () {
            return this.curves.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurveSet.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
            for (var i = 0; i < this.curves.length; i++) {
                this.curves[i].type = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    return CurveSet;
}());



/***/ }),

/***/ "./src/math/curve.ts":
/*!***************************!*\
  !*** ./src/math/curve.ts ***!
  \***************************/
/*! exports provided: Curve */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Curve", function() { return Curve; });
/* harmony import */ var _conf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../conf */ "./src/conf.ts");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math */ "./src/math/math.ts");
/* tslint:disable */


var Curve = /** @class */ (function () {
    function Curve(data) {
        this.keys = [];
        this.type = _conf__WEBPACK_IMPORTED_MODULE_0__["CURVE"].SMOOTHSTEP;
        this.tension = 0.5; // used for CURVE_CARDINAL
        if (data) {
            for (var i = 0; i < data.length - 1; i += 2) {
                this.keys.push([data[i], data[i + 1]]);
            }
        }
        this.sort();
    }
    Curve.prototype.add = function (time, value) {
        var keys = this.keys;
        var len = keys.length;
        var i = 0;
        for (; i < len; i++) {
            if (keys[i][0] > time) {
                break;
            }
        }
        var key = [time, value];
        this.keys.splice(i, 0, key);
        return key;
    };
    Curve.prototype.get = function (index) {
        return this.keys[index];
    };
    Curve.prototype.sort = function () {
        this.keys.sort(function (a, b) { return a[0] - b[0]; });
    };
    Curve.prototype.value = function (time) {
        var keys = this.keys;
        // no keys
        if (!keys.length) {
            return 0;
        }
        // Clamp values before first and after last key
        if (time < keys[0][0]) {
            return keys[0][1];
        }
        else if (time > keys[keys.length - 1][0]) {
            return keys[keys.length - 1][1];
        }
        var leftTime = 0;
        var leftValue = keys.length ? keys[0][1] : 0;
        var rightTime = 1;
        var rightValue = 0;
        var i = 0;
        for (var i_1 = 0, len = keys.length; i_1 < len; i_1++) {
            // early exit check
            if (keys[i_1][0] === time) {
                return keys[i_1][1];
            }
            rightValue = keys[i_1][1];
            if (time < keys[i_1][0]) {
                rightTime = keys[i_1][0];
                break;
            }
            leftTime = keys[i_1][0];
            leftValue = keys[i_1][1];
        }
        var div = rightTime - leftTime;
        var interpolation = (div === 0 ? 0 : (time - leftTime) / div);
        if (this.type === _conf__WEBPACK_IMPORTED_MODULE_0__["CURVE"].SMOOTHSTEP) {
            interpolation *= interpolation * (3 - 2 * interpolation);
        }
        else if (this.type === _conf__WEBPACK_IMPORTED_MODULE_0__["CURVE"].CATMULL || this.type === _conf__WEBPACK_IMPORTED_MODULE_0__["CURVE"].CARDINAL) {
            var p1 = leftValue;
            var p2 = rightValue;
            var p0 = p1 + (p1 - p2); // default control points are extended back/forward from existing points
            var p3 = p2 + (p2 - p1);
            var dt1 = rightTime - leftTime;
            var dt0 = dt1;
            var dt2 = dt1;
            // back up index to left key
            if (i > 0) {
                i = i - 1;
            }
            if (i > 0) {
                p0 = keys[i - 1][1];
                dt0 = keys[i][0] - keys[i - 1][0];
            }
            if (keys.length > i + 1) {
                dt1 = keys[i + 1][0] - keys[i][0];
            }
            if (keys.length > i + 2) {
                dt2 = keys[i + 2][0] - keys[i + 1][0];
                p3 = keys[i + 2][1];
            }
            // normalize p0 and p3 to be equal time with p1->p2
            p0 = p1 + (p0 - p1) * dt1 / dt0;
            p3 = p2 + (p3 - p2) * dt1 / dt2;
            if (this.type === _conf__WEBPACK_IMPORTED_MODULE_0__["CURVE"].CATMULL) {
                return this._interpolateCatmullRom(p0, p1, p2, p3, interpolation);
            }
            else {
                return this._interpolateCardinal(p0, p1, p2, p3, interpolation, this.tension);
            }
        }
        return _math__WEBPACK_IMPORTED_MODULE_1__["lerp"](leftValue, rightValue, interpolation);
    };
    Curve.prototype._interpolateHermite = function (p0, p1, t0, t1, s) {
        var s2 = s * s;
        var s3 = s * s * s;
        var h0 = 2 * s3 - 3 * s2 + 1;
        var h1 = -2 * s3 + 3 * s2;
        var h2 = s3 - 2 * s2 + s;
        var h3 = s3 - s2;
        return p0 * h0 + p1 * h1 + t0 * h2 + t1 * h3;
    };
    Curve.prototype._interpolateCardinal = function (p0, p1, p2, p3, s, t) {
        var t0 = t * (p2 - p0);
        var t1 = t * (p3 - p1);
        return this._interpolateHermite(p1, p2, t0, t1, s);
    };
    Curve.prototype._interpolateCatmullRom = function (p0, p1, p2, p3, s) {
        return this._interpolateCardinal(p0, p1, p2, p3, s, 0.5);
    };
    Curve.prototype.closest = function (time) {
        var keys = this.keys;
        var length = keys.length;
        var min = 2;
        var result = null;
        for (var i = 0; i < length; i++) {
            var diff = Math.abs(time - keys[i][0]);
            if (min >= diff) {
                min = diff;
                result = keys[i];
            }
            else {
                break;
            }
        }
        return result;
    };
    Curve.prototype.clone = function () {
        console.log('error');
        var result = new Curve();
        // result.keys = pc.extend(result.keys, this.keys);
        result.type = this.type;
        return result;
    };
    Curve.prototype.quantize = function (precision) {
        precision = Math.max(precision, 2);
        var values = new Float32Array(precision);
        var step = 1.0 / (precision - 1);
        // quantize graph to table of interpolated values
        for (var i = 0; i < precision; i++) {
            var value = this.value(step * i);
            values[i] = value;
        }
        return values;
    };
    Object.defineProperty(Curve.prototype, "length", {
        get: function () {
            return this.keys.length;
        },
        enumerable: true,
        configurable: true
    });
    return Curve;
}());



/***/ }),

/***/ "./src/math/index.ts":
/*!***************************!*\
  !*** ./src/math/index.ts ***!
  \***************************/
/*! exports provided: Curve, CurveSet, Mat3, Mat4, generateUUID, intToBytes24, intToBytes32, bytesToInt24, bytesToInt32, DEG_TO_RAD, RAD_TO_DEG, INV_LOG2, clamp, lerp, lerpAngle, powerOfTwo, nextPowerOfTwo, random, smoothstep, smootherstep, intToBytes, bytesToInt, Quat, Vec2, Vec3, Vec4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _curve__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./curve */ "./src/math/curve.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Curve", function() { return _curve__WEBPACK_IMPORTED_MODULE_0__["Curve"]; });

/* harmony import */ var _curve_set__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curve-set */ "./src/math/curve-set.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CurveSet", function() { return _curve_set__WEBPACK_IMPORTED_MODULE_1__["CurveSet"]; });

/* harmony import */ var _mat3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mat3 */ "./src/math/mat3.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Mat3", function() { return _mat3__WEBPACK_IMPORTED_MODULE_2__["Mat3"]; });

/* harmony import */ var _mat4__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mat4 */ "./src/math/mat4.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Mat4", function() { return _mat4__WEBPACK_IMPORTED_MODULE_3__["Mat4"]; });

/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./math */ "./src/math/math.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generateUUID", function() { return _math__WEBPACK_IMPORTED_MODULE_4__["generateUUID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "intToBytes24", function() { return _math__WEBPACK_IMPORTED_MODULE_4__["intToBytes24"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "intToBytes32", function() { return _math__WEBPACK_IMPORTED_MODULE_4__["intToBytes32"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bytesToInt24", function() { return _math__WEBPACK_IMPORTED_MODULE_4__["bytesToInt24"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bytesToInt32", function() { return _math__WEBPACK_IMPORTED_MODULE_4__["bytesToInt32"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEG_TO_RAD", function() { return _math__WEBPACK_IMPORTED_MODULE_4__["DEG_TO_RAD"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RAD_TO_DEG", function() { return _math__WEBPACK_IMPORTED_MODULE_4__["RAD_TO_DEG"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "INV_LOG2", function() { return _math__WEBPACK_IMPORTED_MODULE_4__["INV_LOG2"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return _math__WEBPACK_IMPORTED_MODULE_4__["clamp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return _math__WEBPACK_IMPORTED_MODULE_4__["lerp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lerpAngle", function() { return _math__WEBPACK_IMPORTED_MODULE_4__["lerpAngle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "powerOfTwo", function() { return _math__WEBPACK_IMPORTED_MODULE_4__["powerOfTwo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nextPowerOfTwo", function() { return _math__WEBPACK_IMPORTED_MODULE_4__["nextPowerOfTwo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "random", function() { return _math__WEBPACK_IMPORTED_MODULE_4__["random"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "smoothstep", function() { return _math__WEBPACK_IMPORTED_MODULE_4__["smoothstep"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "smootherstep", function() { return _math__WEBPACK_IMPORTED_MODULE_4__["smootherstep"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "intToBytes", function() { return _math__WEBPACK_IMPORTED_MODULE_4__["intToBytes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bytesToInt", function() { return _math__WEBPACK_IMPORTED_MODULE_4__["bytesToInt"]; });

/* harmony import */ var _quat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./quat */ "./src/math/quat.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Quat", function() { return _quat__WEBPACK_IMPORTED_MODULE_5__["Quat"]; });

/* harmony import */ var _vec2__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./vec2 */ "./src/math/vec2.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vec2", function() { return _vec2__WEBPACK_IMPORTED_MODULE_6__["Vec2"]; });

/* harmony import */ var _vec3__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./vec3 */ "./src/math/vec3.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vec3", function() { return _vec3__WEBPACK_IMPORTED_MODULE_7__["Vec3"]; });

/* harmony import */ var _vec4__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./vec4 */ "./src/math/vec4.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vec4", function() { return _vec4__WEBPACK_IMPORTED_MODULE_8__["Vec4"]; });

/*
 * ProjectName: hypergl
 * FilePath: \src\math\index.ts
 * Created Date: Saturday, August 18th 2018, 10:54:23 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 18th 2018, 10:55:30 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */











/***/ }),

/***/ "./src/math/mat3.ts":
/*!**************************!*\
  !*** ./src/math/mat3.ts ***!
  \**************************/
/*! exports provided: Mat3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mat3", function() { return Mat3; });
/* tslint:disable */
var typeNumber = 'number';
var Mat3 = /** @class */ (function () {
    function Mat3(v0, v1, v2, v3, v4, v5, v6, v7, v8) {
        if (v0 && v0.length === 9) {
            this.data = new Float32Array(v0);
            return;
        }
        this.data = new Float32Array(9);
        if (typeof (v0) === 'number') {
            this.data[0] = v0;
            this.data[1] = v1;
            this.data[2] = v2;
            this.data[3] = v3;
            this.data[4] = v4;
            this.data[5] = v5;
            this.data[6] = v6;
            this.data[7] = v7;
            this.data[8] = v8;
        }
        else {
            this.setIdentity();
        }
    }
    Mat3.prototype.clone = function () {
        return new Mat3().copy(this);
    };
    Mat3.prototype.copy = function (_a) {
        var data = _a.data;
        var src = data;
        var dst = this.data;
        dst[0] = src[0];
        dst[1] = src[1];
        dst[2] = src[2];
        dst[3] = src[3];
        dst[4] = src[4];
        dst[5] = src[5];
        dst[6] = src[6];
        dst[7] = src[7];
        dst[8] = src[8];
        return this;
    };
    Mat3.prototype.equals = function (_a) {
        var data = _a.data;
        var l = this.data;
        var r = data;
        return ((l[0] === r[0]) &&
            (l[1] === r[1]) &&
            (l[2] === r[2]) &&
            (l[3] === r[3]) &&
            (l[4] === r[4]) &&
            (l[5] === r[5]) &&
            (l[6] === r[6]) &&
            (l[7] === r[7]) &&
            (l[8] === r[8]));
    };
    Mat3.prototype.isIdentity = function () {
        var m = this.data;
        return ((m[0] === 1) &&
            (m[1] === 0) &&
            (m[2] === 0) &&
            (m[3] === 0) &&
            (m[4] === 1) &&
            (m[5] === 0) &&
            (m[6] === 0) &&
            (m[7] === 0) &&
            (m[8] === 1));
    };
    Mat3.prototype.setIdentity = function () {
        var m = this.data;
        m[0] = 1;
        m[1] = 0;
        m[2] = 0;
        m[3] = 0;
        m[4] = 1;
        m[5] = 0;
        m[6] = 0;
        m[7] = 0;
        m[8] = 1;
        return this;
    };
    Mat3.prototype.toString = function () {
        var t = '[';
        for (var i = 0; i < 9; i++) {
            t += this.data[i];
            t += (i !== 9) ? ', ' : '';
        }
        t += ']';
        return t;
    };
    Mat3.prototype.transpose = function () {
        var m = this.data;
        var tmp;
        tmp = m[1];
        m[1] = m[3];
        m[3] = tmp;
        tmp = m[2];
        m[2] = m[6];
        m[6] = tmp;
        tmp = m[5];
        m[5] = m[7];
        m[7] = tmp;
        return this;
    };
    Mat3.ZERO = new Mat3(0, 0, 0, 0, 0, 0, 0, 0, 0);
    return Mat3;
}());



/***/ }),

/***/ "./src/math/mat4.ts":
/*!**************************!*\
  !*** ./src/math/mat4.ts ***!
  \**************************/
/*! exports provided: Mat4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mat4", function() { return Mat4; });
/* harmony import */ var _vec3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vec3 */ "./src/math/vec3.ts");
/* harmony import */ var _vec4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vec4 */ "./src/math/vec4.ts");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math */ "./src/math/math.ts");
/* tslint:disable */



var Mat4 = /** @class */ (function () {
    function Mat4(v0, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15) {
        var _this = this;
        this.setLookAt = (function () {
            var x, y, z;
            x = new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
            y = new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
            z = new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
            return function (position, target, up) {
                z.sub2(position, target).normalize();
                y.copy(up).normalize();
                x.cross(y, z).normalize();
                y.cross(z, x);
                var r = _this.data;
                r[0] = x.x;
                r[1] = x.y;
                r[2] = x.z;
                r[3] = 0;
                r[4] = y.x;
                r[5] = y.y;
                r[6] = y.z;
                r[7] = 0;
                r[8] = z.x;
                r[9] = z.y;
                r[10] = z.z;
                r[11] = 0;
                r[12] = position.x;
                r[13] = position.y;
                r[14] = position.z;
                r[15] = 1;
                return _this;
            };
        })();
        this.getScale = (function () {
            var x, y, z;
            x = new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
            y = new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
            z = new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
            return function (scale) {
                scale = (scale === undefined) ? new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]() : scale;
                this.getX(x);
                this.getY(y);
                this.getZ(z);
                scale.set(x.length(), y.length(), z.length());
                return scale;
            };
        })();
        this.getEulerAngles = (function () {
            var scale = new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
            return function (eulers) {
                var x, y, z, sx, sy, sz, m, halfPi;
                eulers = (eulers === undefined) ? new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]() : eulers;
                this.getScale(scale);
                sx = scale.x;
                sy = scale.y;
                sz = scale.z;
                m = this.data;
                y = Math.asin(-m[2] / sx);
                halfPi = Math.PI * 0.5;
                if (y < halfPi) {
                    if (y > -halfPi) {
                        x = Math.atan2(m[6] / sy, m[10] / sz);
                        z = Math.atan2(m[1] / sx, m[0] / sx);
                    }
                    else {
                        // Not a unique solution
                        z = 0;
                        x = -Math.atan2(m[4] / sy, m[5] / sy);
                    }
                }
                else {
                    // Not a unique solution
                    z = 0;
                    x = Math.atan2(m[4] / sy, m[5] / sy);
                }
                return eulers.set(x, y, z).scale(_math__WEBPACK_IMPORTED_MODULE_2__["RAD_TO_DEG"]);
            };
        })();
        if (v0 && v0.length === 16) {
            this.data = new Float32Array(v0);
            return;
        }
        this.data = new Float32Array(16);
        if (typeof (v0) === 'number') {
            this.data[0] = v0;
            this.data[1] = v1;
            this.data[2] = v2;
            this.data[3] = v3;
            this.data[4] = v4;
            this.data[5] = v5;
            this.data[6] = v6;
            this.data[7] = v7;
            this.data[8] = v8;
            this.data[9] = v9;
            this.data[10] = v10;
            this.data[11] = v11;
            this.data[12] = v12;
            this.data[13] = v13;
            this.data[14] = v14;
            this.data[15] = v15;
        }
        else {
            this.setIdentity();
        }
    }
    Mat4.prototype.add2 = function (lhs, rhs) {
        var a = lhs.data, b = rhs.data, r = this.data;
        r[0] = a[0] + b[0];
        r[1] = a[1] + b[1];
        r[2] = a[2] + b[2];
        r[3] = a[3] + b[3];
        r[4] = a[4] + b[4];
        r[5] = a[5] + b[5];
        r[6] = a[6] + b[6];
        r[7] = a[7] + b[7];
        r[8] = a[8] + b[8];
        r[9] = a[9] + b[9];
        r[10] = a[10] + b[10];
        r[11] = a[11] + b[11];
        r[12] = a[12] + b[12];
        r[13] = a[13] + b[13];
        r[14] = a[14] + b[14];
        r[15] = a[15] + b[15];
        return this;
    };
    Mat4.prototype.add = function (rhs) {
        return this.add2(this, rhs);
    };
    Mat4.prototype.clone = function () {
        return new Mat4().copy(this);
    };
    Mat4.prototype.copy = function (rhs) {
        var src = rhs.data, dst = this.data;
        dst[0] = src[0];
        dst[1] = src[1];
        dst[2] = src[2];
        dst[3] = src[3];
        dst[4] = src[4];
        dst[5] = src[5];
        dst[6] = src[6];
        dst[7] = src[7];
        dst[8] = src[8];
        dst[9] = src[9];
        dst[10] = src[10];
        dst[11] = src[11];
        dst[12] = src[12];
        dst[13] = src[13];
        dst[14] = src[14];
        dst[15] = src[15];
        return this;
    };
    Mat4.prototype.equals = function (rhs) {
        var l = this.data, r = rhs.data;
        return ((l[0] === r[0]) &&
            (l[1] === r[1]) &&
            (l[2] === r[2]) &&
            (l[3] === r[3]) &&
            (l[4] === r[4]) &&
            (l[5] === r[5]) &&
            (l[6] === r[6]) &&
            (l[7] === r[7]) &&
            (l[8] === r[8]) &&
            (l[9] === r[9]) &&
            (l[10] === r[10]) &&
            (l[11] === r[11]) &&
            (l[12] === r[12]) &&
            (l[13] === r[13]) &&
            (l[14] === r[14]) &&
            (l[15] === r[15]));
    };
    Mat4.prototype.isIdentity = function () {
        return this.equals(Mat4.IDENTITY);
        // var m = this.data;
        // return ((m[0] === 1) &&
        //     (m[1] === 0) &&
        //     (m[2] === 0) &&
        //     (m[3] === 0) &&
        //     (m[4] === 0) &&
        //     (m[5] === 1) &&
        //     (m[6] === 0) &&
        //     (m[7] === 0) &&
        //     (m[8] === 0) &&
        //     (m[9] === 0) &&
        //     (m[10] === 1) &&
        //     (m[11] === 0) &&
        //     (m[12] === 0) &&
        //     (m[13] === 0) &&
        //     (m[14] === 0) &&
        //     (m[15] === 1));
    };
    Mat4.prototype.mul2 = function (lhs, rhs) {
        var a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33, b0, b1, b2, b3, a = lhs.data, b = rhs.data, r = this.data;
        a00 = a[0];
        a01 = a[1];
        a02 = a[2];
        a03 = a[3];
        a10 = a[4];
        a11 = a[5];
        a12 = a[6];
        a13 = a[7];
        a20 = a[8];
        a21 = a[9];
        a22 = a[10];
        a23 = a[11];
        a30 = a[12];
        a31 = a[13];
        a32 = a[14];
        a33 = a[15];
        b0 = b[0];
        b1 = b[1];
        b2 = b[2];
        b3 = b[3];
        r[0] = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3;
        r[1] = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3;
        r[2] = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3;
        r[3] = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3;
        b0 = b[4];
        b1 = b[5];
        b2 = b[6];
        b3 = b[7];
        r[4] = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3;
        r[5] = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3;
        r[6] = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3;
        r[7] = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3;
        b0 = b[8];
        b1 = b[9];
        b2 = b[10];
        b3 = b[11];
        r[8] = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3;
        r[9] = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3;
        r[10] = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3;
        r[11] = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3;
        b0 = b[12];
        b1 = b[13];
        b2 = b[14];
        b3 = b[15];
        r[12] = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3;
        r[13] = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3;
        r[14] = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3;
        r[15] = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3;
        return this;
    };
    Mat4.prototype.mul = function (rhs) {
        return this.mul2(this, rhs);
    };
    Mat4.prototype.transformPoint = function (vec, res) {
        var x, y, z, m = this.data, v = vec.data;
        res = (res === undefined) ? new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]() : res;
        x =
            v[0] * m[0] +
                v[1] * m[4] +
                v[2] * m[8] +
                m[12];
        y =
            v[0] * m[1] +
                v[1] * m[5] +
                v[2] * m[9] +
                m[13];
        z =
            v[0] * m[2] +
                v[1] * m[6] +
                v[2] * m[10] +
                m[14];
        return res.set(x, y, z);
    };
    Mat4.prototype.transformVector = function (vec, res) {
        var x, y, z, m = this.data, v = vec.data;
        res = (res === undefined) ? new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]() : res;
        x =
            v[0] * m[0] +
                v[1] * m[4] +
                v[2] * m[8];
        y =
            v[0] * m[1] +
                v[1] * m[5] +
                v[2] * m[9];
        z =
            v[0] * m[2] +
                v[1] * m[6] +
                v[2] * m[10];
        return res.set(x, y, z);
    };
    Mat4.prototype.transformVec4 = function (vec, res) {
        var x, y, z, w, m = this.data, v = vec.data;
        res = (res === undefined) ? new _vec4__WEBPACK_IMPORTED_MODULE_1__["Vec4"]() : res;
        x =
            v[0] * m[0] +
                v[1] * m[4] +
                v[2] * m[8] +
                v[3] * m[12];
        y =
            v[0] * m[1] +
                v[1] * m[5] +
                v[2] * m[9] +
                v[3] * m[13];
        z =
            v[0] * m[2] +
                v[1] * m[6] +
                v[2] * m[10] +
                v[3] * m[14];
        w =
            v[0] * m[3] +
                v[1] * m[7] +
                v[2] * m[11] +
                v[3] * m[15];
        return res.set(x, y, z, w);
    };
    Mat4.prototype.setFrustum = function (left, right, bottom, top, znear, zfar) {
        var temp1, temp2, temp3, temp4, r;
        temp1 = 2 * znear;
        temp2 = right - left;
        temp3 = top - bottom;
        temp4 = zfar - znear;
        r = this.data;
        r[0] = temp1 / temp2;
        r[1] = 0;
        r[2] = 0;
        r[3] = 0;
        r[4] = 0;
        r[5] = temp1 / temp3;
        r[6] = 0;
        r[7] = 0;
        r[8] = (right + left) / temp2;
        r[9] = (top + bottom) / temp3;
        r[10] = (-zfar - znear) / temp4;
        r[11] = -1;
        r[12] = 0;
        r[13] = 0;
        r[14] = (-temp1 * zfar) / temp4;
        r[15] = 0;
        return this;
    };
    Mat4.prototype.setPerspective = function (fovy, aspect, znear, zfar, fovIsHorizontal) {
        var xmax, ymax;
        if (!fovIsHorizontal) {
            ymax = znear * Math.tan(fovy * Math.PI / 360);
            xmax = ymax * aspect;
        }
        else {
            xmax = znear * Math.tan(fovy * Math.PI / 360);
            ymax = xmax / aspect;
        }
        return this.setFrustum(-xmax, xmax, -ymax, ymax, znear, zfar);
    };
    Mat4.prototype.setOrtho = function (left, right, bottom, top, near, far) {
        var r = this.data;
        r[0] = 2 / (right - left);
        r[1] = 0;
        r[2] = 0;
        r[3] = 0;
        r[4] = 0;
        r[5] = 2 / (top - bottom);
        r[6] = 0;
        r[7] = 0;
        r[8] = 0;
        r[9] = 0;
        r[10] = -2 / (far - near);
        r[11] = 0;
        r[12] = -(right + left) / (right - left);
        r[13] = -(top + bottom) / (top - bottom);
        r[14] = -(far + near) / (far - near);
        r[15] = 1;
        return this;
    };
    Mat4.prototype.setFromAxisAngle = function (axis, angle) {
        var x, y, z, c, s, t, tx, ty, m;
        angle *= _math__WEBPACK_IMPORTED_MODULE_2__["DEG_TO_RAD"];
        x = axis.x;
        y = axis.y;
        z = axis.z;
        c = Math.cos(angle);
        s = Math.sin(angle);
        t = 1 - c;
        tx = t * x;
        ty = t * y;
        m = this.data;
        m[0] = tx * x + c;
        m[1] = tx * y + s * z;
        m[2] = tx * z - s * y;
        m[3] = 0;
        m[4] = tx * y - s * z;
        m[5] = ty * y + c;
        m[6] = ty * z + s * x;
        m[7] = 0;
        m[8] = tx * z + s * y;
        m[9] = ty * z - x * s;
        m[10] = t * z * z + c;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;
        return this;
    };
    Mat4.prototype.setTranslate = function (x, y, z) {
        var m = this.data;
        m[0] = 1;
        m[1] = 0;
        m[2] = 0;
        m[3] = 0;
        m[4] = 0;
        m[5] = 1;
        m[6] = 0;
        m[7] = 0;
        m[8] = 0;
        m[9] = 0;
        m[10] = 1;
        m[11] = 0;
        m[12] = x;
        m[13] = y;
        m[14] = z;
        m[15] = 1;
        return this;
    };
    Mat4.prototype.setScale = function (x, y, z) {
        var m = this.data;
        m[0] = x;
        m[1] = 0;
        m[2] = 0;
        m[3] = 0;
        m[4] = 0;
        m[5] = y;
        m[6] = 0;
        m[7] = 0;
        m[8] = 0;
        m[9] = 0;
        m[10] = z;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;
        return this;
    };
    Mat4.prototype.invert = function () {
        var a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33, b00, b01, b02, b03, b04, b05, b06, b07, b08, b09, b10, b11, det, invDet, m;
        m = this.data;
        a00 = m[0];
        a01 = m[1];
        a02 = m[2];
        a03 = m[3];
        a10 = m[4];
        a11 = m[5];
        a12 = m[6];
        a13 = m[7];
        a20 = m[8];
        a21 = m[9];
        a22 = m[10];
        a23 = m[11];
        a30 = m[12];
        a31 = m[13];
        a32 = m[14];
        a33 = m[15];
        b00 = a00 * a11 - a01 * a10;
        b01 = a00 * a12 - a02 * a10;
        b02 = a00 * a13 - a03 * a10;
        b03 = a01 * a12 - a02 * a11;
        b04 = a01 * a13 - a03 * a11;
        b05 = a02 * a13 - a03 * a12;
        b06 = a20 * a31 - a21 * a30;
        b07 = a20 * a32 - a22 * a30;
        b08 = a20 * a33 - a23 * a30;
        b09 = a21 * a32 - a22 * a31;
        b10 = a21 * a33 - a23 * a31;
        b11 = a22 * a33 - a23 * a32;
        det = (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);
        if (det === 0) {
            // #ifdef DEBUG
            console.warn("pc.Mat4#invert: Can't invert matrix, determinant is 0");
            // #endif
            this.setIdentity();
        }
        else {
            invDet = 1 / det;
            m[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
            m[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
            m[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
            m[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
            m[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
            m[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
            m[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
            m[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
            m[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
            m[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
            m[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
            m[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
            m[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
            m[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
            m[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
            m[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;
        }
        return this;
    };
    Mat4.prototype.set = function (src) {
        var dst = this.data;
        dst[0] = src[0];
        dst[1] = src[1];
        dst[2] = src[2];
        dst[3] = src[3];
        dst[4] = src[4];
        dst[5] = src[5];
        dst[6] = src[6];
        dst[7] = src[7];
        dst[8] = src[8];
        dst[9] = src[9];
        dst[10] = src[10];
        dst[11] = src[11];
        dst[12] = src[12];
        dst[13] = src[13];
        dst[14] = src[14];
        dst[15] = src[15];
        return this;
    };
    Mat4.prototype.setIdentity = function () {
        var m = this.data;
        m[0] = 1;
        m[1] = 0;
        m[2] = 0;
        m[3] = 0;
        m[4] = 0;
        m[5] = 1;
        m[6] = 0;
        m[7] = 0;
        m[8] = 0;
        m[9] = 0;
        m[10] = 1;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;
        return this;
    };
    Mat4.prototype.setTRS = function (t, r, s) {
        var tx, ty, tz, qx, qy, qz, qw, sx, sy, sz, x2, y2, z2, xx, xy, xz, yy, yz, zz, wx, wy, wz, m;
        tx = t.x;
        ty = t.y;
        tz = t.z;
        qx = r.x;
        qy = r.y;
        qz = r.z;
        qw = r.w;
        sx = s.x;
        sy = s.y;
        sz = s.z;
        x2 = qx + qx;
        y2 = qy + qy;
        z2 = qz + qz;
        xx = qx * x2;
        xy = qx * y2;
        xz = qx * z2;
        yy = qy * y2;
        yz = qy * z2;
        zz = qz * z2;
        wx = qw * x2;
        wy = qw * y2;
        wz = qw * z2;
        m = this.data;
        m[0] = (1 - (yy + zz)) * sx;
        m[1] = (xy + wz) * sx;
        m[2] = (xz - wy) * sx;
        m[3] = 0;
        m[4] = (xy - wz) * sy;
        m[5] = (1 - (xx + zz)) * sy;
        m[6] = (yz + wx) * sy;
        m[7] = 0;
        m[8] = (xz + wy) * sz;
        m[9] = (yz - wx) * sz;
        m[10] = (1 - (xx + yy)) * sz;
        m[11] = 0;
        m[12] = tx;
        m[13] = ty;
        m[14] = tz;
        m[15] = 1;
        return this;
    };
    Mat4.prototype.transpose = function () {
        var tmp, m = this.data;
        tmp = m[1];
        m[1] = m[4];
        m[4] = tmp;
        tmp = m[2];
        m[2] = m[8];
        m[8] = tmp;
        tmp = m[3];
        m[3] = m[12];
        m[12] = tmp;
        tmp = m[6];
        m[6] = m[9];
        m[9] = tmp;
        tmp = m[7];
        m[7] = m[13];
        m[13] = tmp;
        tmp = m[11];
        m[11] = m[14];
        m[14] = tmp;
        return this;
    };
    Mat4.prototype.invertTo3x3 = function (res) {
        var a11, a21, a31, a12, a22, a32, a13, a23, a33, m, r, det, idet;
        m = this.data;
        r = res.data;
        var m0 = m[0];
        var m1 = m[1];
        var m2 = m[2];
        var m4 = m[4];
        var m5 = m[5];
        var m6 = m[6];
        var m8 = m[8];
        var m9 = m[9];
        var m10 = m[10];
        a11 = m10 * m5 - m6 * m9;
        a21 = -m10 * m1 + m2 * m9;
        a31 = m6 * m1 - m2 * m5;
        a12 = -m10 * m4 + m6 * m8;
        a22 = m10 * m0 - m2 * m8;
        a32 = -m6 * m0 + m2 * m4;
        a13 = m9 * m4 - m5 * m8;
        a23 = -m9 * m0 + m1 * m8;
        a33 = m5 * m0 - m1 * m4;
        det = m0 * a11 + m1 * a12 + m2 * a13;
        if (det === 0) { // no inverse
            // #ifdef DEBUG
            console.warn("pc.Mat4#invertTo3x3: Can't invert matrix, determinant is 0");
            // #endif
            return this;
        }
        idet = 1 / det;
        r[0] = idet * a11;
        r[1] = idet * a21;
        r[2] = idet * a31;
        r[3] = idet * a12;
        r[4] = idet * a22;
        r[5] = idet * a32;
        r[6] = idet * a13;
        r[7] = idet * a23;
        r[8] = idet * a33;
        return this;
    };
    Mat4.prototype.getTranslation = function (t) {
        t = (t === undefined) ? new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]() : t;
        return t.set(this.data[12], this.data[13], this.data[14]);
    };
    Mat4.prototype.getX = function (x) {
        x = (x === undefined) ? new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]() : x;
        return x.set(this.data[0], this.data[1], this.data[2]);
    };
    Mat4.prototype.getY = function (y) {
        y = (y === undefined) ? new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]() : y;
        return y.set(this.data[4], this.data[5], this.data[6]);
    };
    Mat4.prototype.getZ = function (z) {
        z = (z === undefined) ? new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]() : z;
        return z.set(this.data[8], this.data[9], this.data[10]);
    };
    // http://en.wikipedia.org/wiki/Rotation_matrix#Conversion_from_and_to_axis-angle
    // The 3D space is right-handed, so the rotation around each axis will be counterclockwise
    // for an observer placed so that the axis goes in his or her direction (Right-hand rule).
    Mat4.prototype.setFromEulerAngles = function (ex, ey, ez) {
        var s1, c1, s2, c2, s3, c3, m;
        ex *= _math__WEBPACK_IMPORTED_MODULE_2__["DEG_TO_RAD"];
        ey *= _math__WEBPACK_IMPORTED_MODULE_2__["DEG_TO_RAD"];
        ez *= _math__WEBPACK_IMPORTED_MODULE_2__["DEG_TO_RAD"];
        // Solution taken from http://en.wikipedia.org/wiki/Euler_angles#Matrix_orientation
        s1 = Math.sin(-ex);
        c1 = Math.cos(-ex);
        s2 = Math.sin(-ey);
        c2 = Math.cos(-ey);
        s3 = Math.sin(-ez);
        c3 = Math.cos(-ez);
        m = this.data;
        // Set rotation elements
        m[0] = c2 * c3;
        m[1] = -c2 * s3;
        m[2] = s2;
        m[3] = 0;
        m[4] = c1 * s3 + c3 * s1 * s2;
        m[5] = c1 * c3 - s1 * s2 * s3;
        m[6] = -c2 * s1;
        m[7] = 0;
        m[8] = s1 * s3 - c1 * c3 * s2;
        m[9] = c3 * s1 + c1 * s2 * s3;
        m[10] = c1 * c2;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;
        return this;
    };
    Mat4.prototype.toString = function () {
        var i, t;
        t = '[';
        for (i = 0; i < 16; i += 1) {
            t += this.data[i];
            t += (i !== 15) ? ', ' : '';
        }
        t += ']';
        return t;
    };
    Mat4.IDENTITY = new Mat4();
    Mat4.ZERO = new Mat4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    return Mat4;
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

/***/ "./src/math/quat.ts":
/*!**************************!*\
  !*** ./src/math/quat.ts ***!
  \**************************/
/*! exports provided: Quat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Quat", function() { return Quat; });
/* harmony import */ var _vec3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vec3 */ "./src/math/vec3.ts");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math */ "./src/math/math.ts");
/* tslint:disable */


var Quat = /** @class */ (function () {
    function Quat(x, y, z, w) {
        if (x && x.length === 4) {
            this.x = x[0];
            this.y = x[1];
            this.z = x[2];
            this.w = x[3];
        }
        else {
            this.x = (x === undefined) ? 0 : x;
            this.y = (y === undefined) ? 0 : y;
            this.z = (z === undefined) ? 0 : z;
            this.w = (w === undefined) ? 1 : w;
        }
    }
    Quat.prototype.clone = function () {
        return new Quat(this.x, this.y, this.z, this.w);
    };
    Quat.prototype.conjugate = function () {
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;
        return this;
    };
    Quat.prototype.copy = function (_a) {
        var x = _a.x, y = _a.y, z = _a.z, w = _a.w;
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    };
    Quat.prototype.equals = function (_a) {
        var x = _a.x, y = _a.y, z = _a.z, w = _a.w;
        return (this.x === x) && (this.y === y) && (this.z === z) && (this.w === w);
    };
    Quat.prototype.getAxisAngle = function (axis) {
        var rad = Math.acos(this.w) * 2;
        var s = Math.sin(rad / 2);
        if (s !== 0) {
            axis.x = this.x / s;
            axis.y = this.y / s;
            axis.z = this.z / s;
            if (axis.x < 0 || axis.y < 0 || axis.z < 0) {
                // Flip the sign
                axis.x *= -1;
                axis.y *= -1;
                axis.z *= -1;
                rad *= -1;
            }
        }
        else {
            // If s is zero, return any axis (no rotation - axis does not matter)
            axis.x = 1;
            axis.y = 0;
            axis.z = 0;
        }
        return rad * _math__WEBPACK_IMPORTED_MODULE_1__["RAD_TO_DEG"];
    };
    Quat.prototype.getEulerAngles = function (eulers) {
        var x, y, z, qx, qy, qz, qw, a2;
        eulers = (eulers === undefined) ? new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]() : eulers;
        qx = this.x;
        qy = this.y;
        qz = this.z;
        qw = this.w;
        a2 = 2 * (qw * qy - qx * qz);
        if (a2 <= -0.99999) {
            x = 2 * Math.atan2(qx, qw);
            y = -Math.PI / 2;
            z = 0;
        }
        else if (a2 >= 0.99999) {
            x = 2 * Math.atan2(qx, qw);
            y = Math.PI / 2;
            z = 0;
        }
        else {
            x = Math.atan2(2 * (qw * qx + qy * qz), 1 - 2 * (qx * qx + qy * qy));
            y = Math.asin(a2);
            z = Math.atan2(2 * (qw * qz + qx * qy), 1 - 2 * (qy * qy + qz * qz));
        }
        return eulers.set(x, y, z).scale(_math__WEBPACK_IMPORTED_MODULE_1__["RAD_TO_DEG"]);
    };
    Quat.prototype.invert = function () {
        return this.conjugate().normalize();
    };
    Quat.prototype.length = function () {
        var x, y, z, w;
        x = this.x;
        y = this.y;
        z = this.z;
        w = this.w;
        return Math.sqrt(x * x + y * y + z * z + w * w);
    };
    Quat.prototype.lengthSq = function () {
        var x, y, z, w;
        return x * x + y * y + z * z + w * w;
    };
    Quat.prototype.mul = function (_a) {
        var x = _a.x, y = _a.y, z = _a.z, w = _a.w;
        var q1x, q1y, q1z, q1w, q2x, q2y, q2z, q2w;
        q1x = this.x;
        q1y = this.y;
        q1z = this.z;
        q1w = this.w;
        q2x = x;
        q2y = y;
        q2z = z;
        q2w = w;
        this.x = q1w * q2x + q1x * q2w + q1y * q2z - q1z * q2y;
        this.y = q1w * q2y + q1y * q2w + q1z * q2x - q1x * q2z;
        this.z = q1w * q2z + q1z * q2w + q1x * q2y - q1y * q2x;
        this.w = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;
        return this;
    };
    Quat.prototype.mul2 = function (lhs, rhs) {
        var q1x, q1y, q1z, q1w, q2x, q2y, q2z, q2w;
        q1x = lhs.x;
        q1y = lhs.y;
        q1z = lhs.z;
        q1w = lhs.w;
        q2x = rhs.x;
        q2y = rhs.y;
        q2z = rhs.z;
        q2w = rhs.w;
        this.x = q1w * q2x + q1x * q2w + q1y * q2z - q1z * q2y;
        this.y = q1w * q2y + q1y * q2w + q1z * q2x - q1x * q2z;
        this.z = q1w * q2z + q1z * q2w + q1x * q2y - q1y * q2x;
        this.w = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;
        return this;
    };
    Quat.prototype.normalize = function () {
        var len = this.length();
        if (len === 0) {
            this.x = this.y = this.z = 0;
            this.w = 1;
        }
        else {
            len = 1 / len;
            this.x *= len;
            this.y *= len;
            this.z *= len;
            this.w *= len;
        }
        return this;
    };
    Quat.prototype.set = function (x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    };
    Quat.prototype.setFromAxisAngle = function (_a, angle) {
        var x = _a.x, y = _a.y, z = _a.z;
        var sa, ca;
        angle *= 0.5 * _math__WEBPACK_IMPORTED_MODULE_1__["DEG_TO_RAD"];
        sa = Math.sin(angle);
        ca = Math.cos(angle);
        this.x = sa * x;
        this.y = sa * y;
        this.z = sa * z;
        this.w = ca;
        return this;
    };
    Quat.prototype.setFromEulerAngles = function (ex, ey, ez) {
        var sx, cx, sy, cy, sz, cz, halfToRad;
        halfToRad = 0.5 * _math__WEBPACK_IMPORTED_MODULE_1__["DEG_TO_RAD"];
        ex *= halfToRad;
        ey *= halfToRad;
        ez *= halfToRad;
        sx = Math.sin(ex);
        cx = Math.cos(ex);
        sy = Math.sin(ey);
        cy = Math.cos(ey);
        sz = Math.sin(ez);
        cz = Math.cos(ez);
        this.x = sx * cy * cz - cx * sy * sz;
        this.y = cx * sy * cz + sx * cy * sz;
        this.z = cx * cy * sz - sx * sy * cz;
        this.w = cx * cy * cz + sx * sy * sz;
        return this;
    };
    Quat.prototype.setFromMat4 = function (m) {
        var m00, m01, m02, m10, m11, m12, m20, m21, m22, tr, s, rs, lx, ly, lz;
        m = m.data;
        // Cache matrix values for super-speed
        m00 = m[0];
        m01 = m[1];
        m02 = m[2];
        m10 = m[4];
        m11 = m[5];
        m12 = m[6];
        m20 = m[8];
        m21 = m[9];
        m22 = m[10];
        // Remove the scale from the matrix
        lx = 1 / Math.sqrt(m00 * m00 + m01 * m01 + m02 * m02);
        ly = 1 / Math.sqrt(m10 * m10 + m11 * m11 + m12 * m12);
        lz = 1 / Math.sqrt(m20 * m20 + m21 * m21 + m22 * m22);
        m00 *= lx;
        m01 *= lx;
        m02 *= lx;
        m10 *= ly;
        m11 *= ly;
        m12 *= ly;
        m20 *= lz;
        m21 *= lz;
        m22 *= lz;
        // http://www.cs.ucr.edu/~vbz/resources/quatut.pdf
        tr = m00 + m11 + m22;
        if (tr >= 0) {
            s = Math.sqrt(tr + 1);
            this.w = s * 0.5;
            s = 0.5 / s;
            this.x = (m12 - m21) * s;
            this.y = (m20 - m02) * s;
            this.z = (m01 - m10) * s;
        }
        else {
            if (m00 > m11) {
                if (m00 > m22) {
                    // XDiagDomMatrix
                    rs = (m00 - (m11 + m22)) + 1;
                    rs = Math.sqrt(rs);
                    this.x = rs * 0.5;
                    rs = 0.5 / rs;
                    this.w = (m12 - m21) * rs;
                    this.y = (m01 + m10) * rs;
                    this.z = (m02 + m20) * rs;
                }
                else {
                    // ZDiagDomMatrix
                    rs = (m22 - (m00 + m11)) + 1;
                    rs = Math.sqrt(rs);
                    this.z = rs * 0.5;
                    rs = 0.5 / rs;
                    this.w = (m01 - m10) * rs;
                    this.x = (m20 + m02) * rs;
                    this.y = (m21 + m12) * rs;
                }
            }
            else if (m11 > m22) {
                // YDiagDomMatrix
                rs = (m11 - (m22 + m00)) + 1;
                rs = Math.sqrt(rs);
                this.y = rs * 0.5;
                rs = 0.5 / rs;
                this.w = (m20 - m02) * rs;
                this.z = (m12 + m21) * rs;
                this.x = (m10 + m01) * rs;
            }
            else {
                // ZDiagDomMatrix
                rs = (m22 - (m00 + m11)) + 1;
                rs = Math.sqrt(rs);
                this.z = rs * 0.5;
                rs = 0.5 / rs;
                this.w = (m01 - m10) * rs;
                this.x = (m20 + m02) * rs;
                this.y = (m21 + m12) * rs;
            }
        }
        return this;
    };
    Quat.prototype.slerp = function (lhs, rhs, alpha) {
        var lx, ly, lz, lw, rx, ry, rz, rw;
        lx = lhs.x;
        ly = lhs.y;
        lz = lhs.z;
        lw = lhs.w;
        rx = rhs.x;
        ry = rhs.y;
        rz = rhs.z;
        rw = rhs.w;
        // Calculate angle between them.
        var cosHalfTheta = lw * rw + lx * rx + ly * ry + lz * rz;
        if (cosHalfTheta < 0) {
            rw = -rw;
            rx = -rx;
            ry = -ry;
            rz = -rz;
            cosHalfTheta = -cosHalfTheta;
        }
        // If lhs == rhs or lhs == -rhs then theta == 0 and we can return lhs
        if (Math.abs(cosHalfTheta) >= 1) {
            this.w = lw;
            this.x = lx;
            this.y = ly;
            this.z = lz;
            return this;
        }
        // Calculate temporary values.
        var halfTheta = Math.acos(cosHalfTheta);
        var sinHalfTheta = Math.sqrt(1 - cosHalfTheta * cosHalfTheta);
        // If theta = 180 degrees then result is not fully defined
        // we could rotate around any axis normal to qa or qb
        if (Math.abs(sinHalfTheta) < 0.001) {
            this.w = (lw * 0.5 + rw * 0.5);
            this.x = (lx * 0.5 + rx * 0.5);
            this.y = (ly * 0.5 + ry * 0.5);
            this.z = (lz * 0.5 + rz * 0.5);
            return this;
        }
        var ratioA = Math.sin((1 - alpha) * halfTheta) / sinHalfTheta;
        var ratioB = Math.sin(alpha * halfTheta) / sinHalfTheta;
        // Calculate Quaternion.
        this.w = (lw * ratioA + rw * ratioB);
        this.x = (lx * ratioA + rx * ratioB);
        this.y = (ly * ratioA + ry * ratioB);
        this.z = (lz * ratioA + rz * ratioB);
        return this;
    };
    Quat.prototype.transformVector = function (vec, res) {
        if (res === undefined) {
            res = new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
        }
        var x = vec.x, y = vec.y, z = vec.z;
        var qx = this.x, qy = this.y, qz = this.z, qw = this.w;
        // calculate quat * vec
        var ix = qw * x + qy * z - qz * y;
        var iy = qw * y + qz * x - qx * z;
        var iz = qw * z + qx * y - qy * x;
        var iw = -qx * x - qy * y - qz * z;
        // calculate result * inverse quat
        res.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        res.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        res.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        return res;
    };
    Quat.IDENTITY = new Quat();
    Quat.ZERO = new Quat(0, 0, 0, 0);
    return Quat;
}());



/***/ }),

/***/ "./src/math/vec2.ts":
/*!**************************!*\
  !*** ./src/math/vec2.ts ***!
  \**************************/
/*! exports provided: Vec2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vec2", function() { return Vec2; });
/* tslint:disable */
var Vec2 = /** @class */ (function () {
    function Vec2(x, y) {
        if (x && x.length === 2) {
            this.data = new Float32Array(x);
            return;
        }
        this.data = new Float32Array(2);
        this.data[0] = x || 0;
        this.data[1] = y || 0;
    }
    Vec2.prototype.add = function (rhs) {
        var a = this.data, b = rhs.data;
        a[0] += b[0];
        a[1] += b[1];
        return this;
    };
    Vec2.prototype.add2 = function (lhs, rhs) {
        var a = lhs.data, b = rhs.data, r = this.data;
        r[0] = a[0] + b[0];
        r[1] = a[1] + b[1];
        return this;
    };
    Vec2.prototype.clone = function () {
        return new Vec2().copy(this);
    };
    Vec2.prototype.copy = function (rhs) {
        var a = this.data, b = rhs.data;
        a[0] = b[0];
        a[1] = b[1];
        return this;
    };
    Vec2.prototype.dot = function (rhs) {
        var a = this.data, b = rhs.data;
        return a[0] * b[0] + a[1] * b[1];
    };
    Vec2.prototype.equals = function (rhs) {
        var a = this.data, b = rhs.data;
        return a[0] === b[0] && a[1] === b[1];
    };
    Vec2.prototype.length = function () {
        var v = this.data;
        return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
    };
    Vec2.prototype.lengthSq = function () {
        var v = this.data;
        return v[0] * v[0] + v[1] * v[1];
    };
    Vec2.prototype.lerp = function (lhs, rhs, alpha) {
        var a = lhs.data, b = rhs.data, r = this.data;
        r[0] = a[0] + alpha * (b[0] - a[0]);
        r[1] = a[1] + alpha * (b[1] - a[1]);
        return this;
    };
    Vec2.prototype.mul = function (rhs) {
        var a = this.data, b = rhs.data;
        a[0] *= b[0];
        a[1] *= b[1];
        return this;
    };
    Vec2.prototype.mul2 = function (lhs, rhs) {
        var a = lhs.data, b = rhs.data, r = this.data;
        r[0] = a[0] * b[0];
        r[1] = a[1] * b[1];
        return this;
    };
    Vec2.prototype.normalize = function () {
        var v = this.data;
        var lengthSq = v[0] * v[0] + v[1] * v[1];
        if (lengthSq > 0) {
            var invLength = 1 / Math.sqrt(lengthSq);
            v[0] *= invLength;
            v[1] *= invLength;
        }
        return this;
    };
    Vec2.prototype.scale = function (scalar) {
        var v = this.data;
        v[0] *= scalar;
        v[1] *= scalar;
        return this;
    };
    Vec2.prototype.set = function (x, y) {
        var v = this.data;
        v[0] = x;
        v[1] = y;
        return this;
    };
    Vec2.prototype.sub = function (rhs) {
        var a = this.data, b = rhs.data;
        a[0] -= b[0];
        a[1] -= b[1];
        return this;
    };
    Vec2.prototype.sub2 = function (lhs, rhs) {
        var a = lhs.data, b = rhs.data, r = this.data;
        r[0] = a[0] - b[0];
        r[1] = a[1] - b[1];
        return this;
    };
    Vec2.prototype.toString = function () {
        return '[' + this.data[0] + ', ' + this.data[1] + ']';
    };
    Object.defineProperty(Vec2.prototype, "x", {
        get: function () {
            return this.data[0];
        },
        set: function (value) {
            this.data[0] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec2.prototype, "y", {
        get: function () {
            return this.data[1];
        },
        set: function (value) {
            this.data[1] = value;
        },
        enumerable: true,
        configurable: true
    });
    Vec2.ONE = new Vec2(1, 1);
    Vec2.RIGHT = new Vec2(1, 0);
    Vec2.UP = new Vec2(0, 1);
    Vec2.ZERO = new Vec2(0, 0);
    return Vec2;
}());



/***/ }),

/***/ "./src/math/vec3.ts":
/*!**************************!*\
  !*** ./src/math/vec3.ts ***!
  \**************************/
/*! exports provided: Vec3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vec3", function() { return Vec3; });
/* tslint:disable */
var Vec3 = /** @class */ (function () {
    function Vec3(x, y, z) {
        if (x && x.length === 3) {
            this.data = new Float32Array(x);
            return;
        }
        this.data = new Float32Array(3);
        this.data[0] = x || 0;
        this.data[1] = y || 0;
        this.data[2] = z || 0;
    }
    Vec3.prototype.addSelf = function (arg0) {
        throw new Error('Method not implemented.');
    };
    Vec3.prototype.add = function (rhs) {
        var a = this.data, b = rhs.data;
        a[0] += b[0];
        a[1] += b[1];
        a[2] += b[2];
        return this;
    };
    Vec3.prototype.add2 = function (lhs, rhs) {
        var a = lhs.data, b = rhs.data, r = this.data;
        r[0] = a[0] + b[0];
        r[1] = a[1] + b[1];
        r[2] = a[2] + b[2];
        return this;
    };
    Vec3.prototype.clone = function () {
        return new Vec3().copy(this);
    };
    Vec3.prototype.copy = function (rhs) {
        var a = this.data, b = rhs.data;
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        return this;
    };
    Vec3.prototype.cross = function (lhs, rhs) {
        var a, b, r, ax, ay, az, bx, by, bz;
        a = lhs.data;
        b = rhs.data;
        r = this.data;
        ax = a[0];
        ay = a[1];
        az = a[2];
        bx = b[0];
        by = b[1];
        bz = b[2];
        r[0] = ay * bz - by * az;
        r[1] = az * bx - bz * ax;
        r[2] = ax * by - bx * ay;
        return this;
    };
    Vec3.prototype.dot = function (rhs) {
        var a = this.data, b = rhs.data;
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    };
    Vec3.prototype.equals = function (rhs) {
        var a = this.data, b = rhs.data;
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
    };
    Vec3.prototype.length = function () {
        var v = this.data;
        return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    };
    Vec3.prototype.lengthSq = function () {
        var v = this.data;
        return v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
    };
    Vec3.prototype.lerp = function (lhs, rhs, alpha) {
        var a = lhs.data, b = rhs.data, r = this.data;
        r[0] = a[0] + alpha * (b[0] - a[0]);
        r[1] = a[1] + alpha * (b[1] - a[1]);
        r[2] = a[2] + alpha * (b[2] - a[2]);
        return this;
    };
    Vec3.prototype.mul = function (rhs) {
        var a = this.data, b = rhs.data;
        a[0] *= b[0];
        a[1] *= b[1];
        a[2] *= b[2];
        return this;
    };
    Vec3.prototype.mul2 = function (lhs, rhs) {
        var a = lhs.data, b = rhs.data, r = this.data;
        r[0] = a[0] * b[0];
        r[1] = a[1] * b[1];
        r[2] = a[2] * b[2];
        return this;
    };
    Vec3.prototype.normalize = function () {
        var v = this.data;
        var lengthSq = v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
        if (lengthSq > 0) {
            var invLength = 1 / Math.sqrt(lengthSq);
            v[0] *= invLength;
            v[1] *= invLength;
            v[2] *= invLength;
        }
        return this;
    };
    Vec3.prototype.project = function (rhs) {
        var a = this.data;
        var b = rhs.data;
        var a_dot_b = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        var b_dot_b = b[0] * b[0] + b[1] * b[1] + b[2] * b[2];
        var s = a_dot_b / b_dot_b;
        a[0] = b[0] * s;
        a[1] = b[1] * s;
        a[2] = b[2] * s;
        return this;
    };
    Vec3.prototype.scale = function (scalar) {
        var v = this.data;
        v[0] *= scalar;
        v[1] *= scalar;
        v[2] *= scalar;
        return this;
    };
    Vec3.prototype.set = function (x, y, z) {
        var v = this.data;
        v[0] = x;
        v[1] = y;
        v[2] = z;
        return this;
    };
    Vec3.prototype.sub = function (rhs) {
        var a = this.data, b = rhs.data;
        a[0] -= b[0];
        a[1] -= b[1];
        a[2] -= b[2];
        return this;
    };
    Vec3.prototype.sub2 = function (lhs, rhs) {
        var a = lhs.data, b = rhs.data, r = this.data;
        r[0] = a[0] - b[0];
        r[1] = a[1] - b[1];
        r[2] = a[2] - b[2];
        return this;
    };
    Vec3.prototype.toString = function () {
        return '[' + this.data[0] + ', ' + this.data[1] + ', ' + this.data[2] + ']';
    };
    Object.defineProperty(Vec3.prototype, "x", {
        get: function () {
            return this.data[0];
        },
        set: function (value) {
            this.data[0] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec3.prototype, "y", {
        get: function () {
            return this.data[1];
        },
        set: function (value) {
            this.data[1] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec3.prototype, "z", {
        get: function () {
            return this.data[2];
        },
        set: function (value) {
            this.data[2] = value;
        },
        enumerable: true,
        configurable: true
    });
    Vec3.BACK = new Vec3(0, 0, 1);
    Vec3.DOWN = new Vec3(0, -1, 0);
    Vec3.FORWARD = new Vec3(0, 0, -1);
    Vec3.LEFT = new Vec3(-1, 0, 0);
    Vec3.ONE = new Vec3(1, 1, 1);
    Vec3.RIGHT = new Vec3(1, 0, 0);
    Vec3.UP = new Vec3(0, 1, 0);
    Vec3.ZERO = new Vec3(0, 0, 0);
    return Vec3;
}());



/***/ }),

/***/ "./src/math/vec4.ts":
/*!**************************!*\
  !*** ./src/math/vec4.ts ***!
  \**************************/
/*! exports provided: Vec4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vec4", function() { return Vec4; });
/* tslint:disable */
var Vec4 = /** @class */ (function () {
    function Vec4(x, y, z, w) {
        if (x && x.length === 4) {
            this.data = new Float32Array(x);
            return;
        }
        this.data = new Float32Array(4);
        this.data[0] = x || 0;
        this.data[1] = y || 0;
        this.data[2] = z || 0;
        this.data[3] = w || 0;
    }
    Vec4.prototype.add = function (rhs) {
        var a = this.data, b = rhs.data;
        a[0] += b[0];
        a[1] += b[1];
        a[2] += b[2];
        a[3] += b[3];
        return this;
    };
    Vec4.prototype.add2 = function (lhs, rhs) {
        var a = lhs.data, b = rhs.data, r = this.data;
        r[0] = a[0] + b[0];
        r[1] = a[1] + b[1];
        r[2] = a[2] + b[2];
        r[3] = a[3] + b[3];
        return this;
    };
    Vec4.prototype.clone = function () {
        return new Vec4().copy(this);
    };
    Vec4.prototype.copy = function (rhs) {
        var a = this.data, b = rhs.data;
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        a[3] = b[3];
        return this;
    };
    Vec4.prototype.dot = function (rhs) {
        var a = this.data, b = rhs.data;
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    };
    Vec4.prototype.equals = function (rhs) {
        var a = this.data, b = rhs.data;
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    };
    Vec4.prototype.length = function () {
        var v = this.data;
        return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3]);
    };
    Vec4.prototype.lengthSq = function () {
        var v = this.data;
        return v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3];
    };
    Vec4.prototype.lerp = function (lhs, rhs, alpha) {
        var a = lhs.data, b = rhs.data, r = this.data;
        r[0] = a[0] + alpha * (b[0] - a[0]);
        r[1] = a[1] + alpha * (b[1] - a[1]);
        r[2] = a[2] + alpha * (b[2] - a[2]);
        r[3] = a[3] + alpha * (b[3] - a[3]);
        return this;
    };
    Vec4.prototype.mul = function (rhs) {
        var a = this.data, b = rhs.data;
        a[0] *= b[0];
        a[1] *= b[1];
        a[2] *= b[2];
        a[3] *= b[3];
        return this;
    };
    Vec4.prototype.mul2 = function (lhs, rhs) {
        var a = lhs.data, b = rhs.data, r = this.data;
        r[0] = a[0] * b[0];
        r[1] = a[1] * b[1];
        r[2] = a[2] * b[2];
        r[3] = a[3] * b[3];
        return this;
    };
    Vec4.prototype.normalize = function () {
        var v = this.data;
        var lengthSq = v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3];
        if (lengthSq > 0) {
            var invLength = 1 / Math.sqrt(lengthSq);
            v[0] *= invLength;
            v[1] *= invLength;
            v[2] *= invLength;
            v[3] *= invLength;
        }
        return this;
    };
    Vec4.prototype.scale = function (scalar) {
        var v = this.data;
        v[0] *= scalar;
        v[1] *= scalar;
        v[2] *= scalar;
        v[3] *= scalar;
        return this;
    };
    Vec4.prototype.set = function (x, y, z, w) {
        var v = this.data;
        v[0] = x;
        v[1] = y;
        v[2] = z;
        v[3] = w;
        return this;
    };
    Vec4.prototype.sub = function (rhs) {
        var a = this.data, b = rhs.data;
        a[0] -= b[0];
        a[1] -= b[1];
        a[2] -= b[2];
        a[3] -= b[3];
        return this;
    };
    Vec4.prototype.sub2 = function (lhs, rhs) {
        var a = lhs.data, b = rhs.data, r = this.data;
        r[0] = a[0] - b[0];
        r[1] = a[1] - b[1];
        r[2] = a[2] - b[2];
        r[3] = a[3] - b[3];
        return this;
    };
    Vec4.prototype.toString = function () {
        return '[' + this.data[0] + ', ' + this.data[1] + ', ' + this.data[2] + ', ' + this.data[3] + ']';
    };
    Object.defineProperty(Vec4.prototype, "x", {
        get: function () {
            return this.data[0];
        },
        set: function (value) {
            this.data[0] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec4.prototype, "y", {
        get: function () {
            return this.data[1];
        },
        set: function (value) {
            this.data[1] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec4.prototype, "z", {
        get: function () {
            return this.data[2];
        },
        set: function (value) {
            this.data[2] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec4.prototype, "w", {
        get: function () {
            return this.data[2];
        },
        set: function (value) {
            this.data[2] = value;
        },
        enumerable: true,
        configurable: true
    });
    return Vec4;
}());



/***/ }),

/***/ "./src/scene/camera.ts":
/*!*****************************!*\
  !*** ./src/scene/camera.ts ***!
  \*****************************/
/*! exports provided: Camera */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Camera", function() { return Camera; });
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math */ "./src/math/index.ts");
/*
 * ProjectName: hypergl
 * FilePath: \src\scene\camera.ts
 * Created Date: Tuesday, August 21st 2018, 6:51:36 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, August 22nd 2018, 10:05:49 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */

var Camera = /** @class */ (function () {
    function Camera(fov, // 相机视野的角度。一般是以Y轴
    aspect, // 相机的纵横比（宽度除以高度）
    near, // 相机渲染最近的距离，小于这距离的不会进行渲染
    far // 相机渲染最远的距离，大于这距离的不会进行渲染
    ) {
        this.matrixWorldInverse = new _math__WEBPACK_IMPORTED_MODULE_0__["Mat4"]().setLookAt(new _math__WEBPACK_IMPORTED_MODULE_0__["Vec3"](0, 0, 0), new _math__WEBPACK_IMPORTED_MODULE_0__["Vec3"](0, 0, 1), new _math__WEBPACK_IMPORTED_MODULE_0__["Vec3"](0, 1, 0)).invert();
        // quaternion: Quat = new Quat();
        // scala: Vec3 = new Vec3();
        this.projectionMatrix = new _math__WEBPACK_IMPORTED_MODULE_0__["Mat4"]();
        // TODO
        this.projectionMatrix.setPerspective(fov, aspect, near, far);
        this.position = this.matrixWorldInverse.getTranslation();
    }
    Camera.prototype.lookAt = function (target) {
        // TODO
        this.matrixWorldInverse.setLookAt(this.position, target, new _math__WEBPACK_IMPORTED_MODULE_0__["Vec3"](0, 1, 0)).invert();
    };
    Object.defineProperty(Camera.prototype, "PVMatrix", {
        get: function () {
            return new _math__WEBPACK_IMPORTED_MODULE_0__["Mat4"]().mul(this.projectionMatrix).mul(this.matrixWorldInverse);
        },
        enumerable: true,
        configurable: true
    });
    return Camera;
}());



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
 * Last Modified: Sunday, August 19th 2018, 1:35:27 pm
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
    function Scene(app) {
        var _this = _super.call(this) || this;
        _this.app = app;
        _this.lights = [];
        _this.cameras = [];
        return _this;
    }
    Scene.prototype.renderer = function () {
        // fix sdfa
    };
    Scene.prototype.add = function () {
        // TODO
    };
    Object.defineProperty(Scene.prototype, Symbol.toStringTag, {
        get: function () {
            return 'Scene';
        },
        enumerable: true,
        configurable: true
    });
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