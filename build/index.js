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
/******/ 	return __webpack_require__(__webpack_require__.s = "./demo/index2.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demo/index2.ts":
/*!************************!*\
  !*** ./demo/index2.ts ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src */ "./src/index.ts");
/* harmony import */ var _src_math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/math */ "./src/math/index.ts");
/* harmony import */ var _src_scene_camera__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/scene/camera */ "./src/scene/camera.ts");
/* harmony import */ var _src_mesh_mesh__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/mesh/mesh */ "./src/mesh/mesh.ts");
/* harmony import */ var _src_core_color__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../src/core/color */ "./src/core/color.ts");
/*
 * ProjectName: hypergl
 * FilePath: \demo\index2.ts
 * Created Date: Saturday, September 1st 2018, 2:26:10 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, September 3rd 2018, 1:05:34 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */





var app = new _src__WEBPACK_IMPORTED_MODULE_0__["Application"](document.getElementById('canvas'), {
// webgl1:true
});
var mesh = _src_mesh_mesh__WEBPACK_IMPORTED_MODULE_3__["Mesh"].createBox(app.rendererPlatform);
var m = new _src__WEBPACK_IMPORTED_MODULE_0__["BasicMaterial"]();
m.color = new _src_core_color__WEBPACK_IMPORTED_MODULE_4__["Color"](0.5, 1, 0.5);
m.update();
var entity = new _src__WEBPACK_IMPORTED_MODULE_0__["Entity"]();
entity.mesh = mesh;
mesh.material = m;
app.scene.root.addChild(entity);
var mesh2 = _src_mesh_mesh__WEBPACK_IMPORTED_MODULE_3__["Mesh"].createBox(app.rendererPlatform);
var entity2 = new _src__WEBPACK_IMPORTED_MODULE_0__["Entity"]();
entity2.mesh = mesh2;
entity2.setLocalScale(1.5, 0.5, 1.5);
// entity2.rotate(0, 10, 0);
entity2.setPosition(2, 0, 0);
app.scene.root.addChild(entity2);
var camera = new _src_scene_camera__WEBPACK_IMPORTED_MODULE_2__["Camera"](45, app.canvas.width / app.canvas.height, 1, 1000);
camera.worldMatrixInverse = new _src_math__WEBPACK_IMPORTED_MODULE_1__["Mat4"]().setLookAt(new _src_math__WEBPACK_IMPORTED_MODULE_1__["Vec3"](3, 3, 3), new _src_math__WEBPACK_IMPORTED_MODULE_1__["Vec3"](0, 0, 0), new _src_math__WEBPACK_IMPORTED_MODULE_1__["Vec3"](0, 1, 0)).invert();
app.scene.cameras.push(camera);
app.start();
app.on('update', function (_) {
    entity.rotate(0, 1, 0);
});


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars.runtime.js":
/*!****************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars.runtime.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _handlebarsBase = __webpack_require__(/*! ./handlebars/base */ "./node_modules/handlebars/dist/cjs/handlebars/base.js");

var base = _interopRequireWildcard(_handlebarsBase);

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)

var _handlebarsSafeString = __webpack_require__(/*! ./handlebars/safe-string */ "./node_modules/handlebars/dist/cjs/handlebars/safe-string.js");

var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

var _handlebarsException = __webpack_require__(/*! ./handlebars/exception */ "./node_modules/handlebars/dist/cjs/handlebars/exception.js");

var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

var _handlebarsUtils = __webpack_require__(/*! ./handlebars/utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");

var Utils = _interopRequireWildcard(_handlebarsUtils);

var _handlebarsRuntime = __webpack_require__(/*! ./handlebars/runtime */ "./node_modules/handlebars/dist/cjs/handlebars/runtime.js");

var runtime = _interopRequireWildcard(_handlebarsRuntime);

var _handlebarsNoConflict = __webpack_require__(/*! ./handlebars/no-conflict */ "./node_modules/handlebars/dist/cjs/handlebars/no-conflict.js");

var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
function create() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = _handlebarsSafeString2['default'];
  hb.Exception = _handlebarsException2['default'];
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;

  hb.VM = runtime;
  hb.template = function (spec) {
    return runtime.template(spec, hb);
  };

  return hb;
}

var inst = create();
inst.create = create;

_handlebarsNoConflict2['default'](inst);

inst['default'] = inst;

exports['default'] = inst;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9oYW5kbGViYXJzLnJ1bnRpbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OEJBQXNCLG1CQUFtQjs7SUFBN0IsSUFBSTs7Ozs7b0NBSU8sMEJBQTBCOzs7O21DQUMzQix3QkFBd0I7Ozs7K0JBQ3ZCLG9CQUFvQjs7SUFBL0IsS0FBSzs7aUNBQ1Esc0JBQXNCOztJQUFuQyxPQUFPOztvQ0FFSSwwQkFBMEI7Ozs7O0FBR2pELFNBQVMsTUFBTSxHQUFHO0FBQ2hCLE1BQUksRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7O0FBRTFDLE9BQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3ZCLElBQUUsQ0FBQyxVQUFVLG9DQUFhLENBQUM7QUFDM0IsSUFBRSxDQUFDLFNBQVMsbUNBQVksQ0FBQztBQUN6QixJQUFFLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNqQixJQUFFLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDOztBQUU3QyxJQUFFLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQztBQUNoQixJQUFFLENBQUMsUUFBUSxHQUFHLFVBQVMsSUFBSSxFQUFFO0FBQzNCLFdBQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7R0FDbkMsQ0FBQzs7QUFFRixTQUFPLEVBQUUsQ0FBQztDQUNYOztBQUVELElBQUksSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDO0FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztBQUVyQixrQ0FBVyxJQUFJLENBQUMsQ0FBQzs7QUFFakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQzs7cUJBRVIsSUFBSSIsImZpbGUiOiJoYW5kbGViYXJzLnJ1bnRpbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBiYXNlIGZyb20gJy4vaGFuZGxlYmFycy9iYXNlJztcblxuLy8gRWFjaCBvZiB0aGVzZSBhdWdtZW50IHRoZSBIYW5kbGViYXJzIG9iamVjdC4gTm8gbmVlZCB0byBzZXR1cCBoZXJlLlxuLy8gKFRoaXMgaXMgZG9uZSB0byBlYXNpbHkgc2hhcmUgY29kZSBiZXR3ZWVuIGNvbW1vbmpzIGFuZCBicm93c2UgZW52cylcbmltcG9ydCBTYWZlU3RyaW5nIGZyb20gJy4vaGFuZGxlYmFycy9zYWZlLXN0cmluZyc7XG5pbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4vaGFuZGxlYmFycy9leGNlcHRpb24nO1xuaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi9oYW5kbGViYXJzL3V0aWxzJztcbmltcG9ydCAqIGFzIHJ1bnRpbWUgZnJvbSAnLi9oYW5kbGViYXJzL3J1bnRpbWUnO1xuXG5pbXBvcnQgbm9Db25mbGljdCBmcm9tICcuL2hhbmRsZWJhcnMvbm8tY29uZmxpY3QnO1xuXG4vLyBGb3IgY29tcGF0aWJpbGl0eSBhbmQgdXNhZ2Ugb3V0c2lkZSBvZiBtb2R1bGUgc3lzdGVtcywgbWFrZSB0aGUgSGFuZGxlYmFycyBvYmplY3QgYSBuYW1lc3BhY2VcbmZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgbGV0IGhiID0gbmV3IGJhc2UuSGFuZGxlYmFyc0Vudmlyb25tZW50KCk7XG5cbiAgVXRpbHMuZXh0ZW5kKGhiLCBiYXNlKTtcbiAgaGIuU2FmZVN0cmluZyA9IFNhZmVTdHJpbmc7XG4gIGhiLkV4Y2VwdGlvbiA9IEV4Y2VwdGlvbjtcbiAgaGIuVXRpbHMgPSBVdGlscztcbiAgaGIuZXNjYXBlRXhwcmVzc2lvbiA9IFV0aWxzLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgaGIuVk0gPSBydW50aW1lO1xuICBoYi50ZW1wbGF0ZSA9IGZ1bmN0aW9uKHNwZWMpIHtcbiAgICByZXR1cm4gcnVudGltZS50ZW1wbGF0ZShzcGVjLCBoYik7XG4gIH07XG5cbiAgcmV0dXJuIGhiO1xufVxuXG5sZXQgaW5zdCA9IGNyZWF0ZSgpO1xuaW5zdC5jcmVhdGUgPSBjcmVhdGU7XG5cbm5vQ29uZmxpY3QoaW5zdCk7XG5cbmluc3RbJ2RlZmF1bHQnXSA9IGluc3Q7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3Q7XG4iXX0=


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/base.js":
/*!*************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/base.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.HandlebarsEnvironment = HandlebarsEnvironment;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = __webpack_require__(/*! ./utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");

var _exception = __webpack_require__(/*! ./exception */ "./node_modules/handlebars/dist/cjs/handlebars/exception.js");

var _exception2 = _interopRequireDefault(_exception);

var _helpers = __webpack_require__(/*! ./helpers */ "./node_modules/handlebars/dist/cjs/handlebars/helpers.js");

var _decorators = __webpack_require__(/*! ./decorators */ "./node_modules/handlebars/dist/cjs/handlebars/decorators.js");

var _logger = __webpack_require__(/*! ./logger */ "./node_modules/handlebars/dist/cjs/handlebars/logger.js");

var _logger2 = _interopRequireDefault(_logger);

var VERSION = '4.0.11';
exports.VERSION = VERSION;
var COMPILER_REVISION = 7;

exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1',
  7: '>= 4.0.0'
};

exports.REVISION_CHANGES = REVISION_CHANGES;
var objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials, decorators) {
  this.helpers = helpers || {};
  this.partials = partials || {};
  this.decorators = decorators || {};

  _helpers.registerDefaultHelpers(this);
  _decorators.registerDefaultDecorators(this);
}

HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: _logger2['default'],
  log: _logger2['default'].log,

  registerHelper: function registerHelper(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple helpers');
      }
      _utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function unregisterHelper(name) {
    delete this.helpers[name];
  },

  registerPartial: function registerPartial(name, partial) {
    if (_utils.toString.call(name) === objectType) {
      _utils.extend(this.partials, name);
    } else {
      if (typeof partial === 'undefined') {
        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
      }
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function unregisterPartial(name) {
    delete this.partials[name];
  },

  registerDecorator: function registerDecorator(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple decorators');
      }
      _utils.extend(this.decorators, name);
    } else {
      this.decorators[name] = fn;
    }
  },
  unregisterDecorator: function unregisterDecorator(name) {
    delete this.decorators[name];
  }
};

var log = _logger2['default'].log;

exports.log = log;
exports.createFrame = _utils.createFrame;
exports.logger = _logger2['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2Jhc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7cUJBQTRDLFNBQVM7O3lCQUMvQixhQUFhOzs7O3VCQUNFLFdBQVc7OzBCQUNSLGNBQWM7O3NCQUNuQyxVQUFVOzs7O0FBRXRCLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQzs7QUFDekIsSUFBTSxpQkFBaUIsR0FBRyxDQUFDLENBQUM7OztBQUU1QixJQUFNLGdCQUFnQixHQUFHO0FBQzlCLEdBQUMsRUFBRSxhQUFhO0FBQ2hCLEdBQUMsRUFBRSxlQUFlO0FBQ2xCLEdBQUMsRUFBRSxlQUFlO0FBQ2xCLEdBQUMsRUFBRSxVQUFVO0FBQ2IsR0FBQyxFQUFFLGtCQUFrQjtBQUNyQixHQUFDLEVBQUUsaUJBQWlCO0FBQ3BCLEdBQUMsRUFBRSxVQUFVO0NBQ2QsQ0FBQzs7O0FBRUYsSUFBTSxVQUFVLEdBQUcsaUJBQWlCLENBQUM7O0FBRTlCLFNBQVMscUJBQXFCLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUU7QUFDbkUsTUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO0FBQzdCLE1BQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxJQUFJLEVBQUUsQ0FBQztBQUMvQixNQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsSUFBSSxFQUFFLENBQUM7O0FBRW5DLGtDQUF1QixJQUFJLENBQUMsQ0FBQztBQUM3Qix3Q0FBMEIsSUFBSSxDQUFDLENBQUM7Q0FDakM7O0FBRUQscUJBQXFCLENBQUMsU0FBUyxHQUFHO0FBQ2hDLGFBQVcsRUFBRSxxQkFBcUI7O0FBRWxDLFFBQU0scUJBQVE7QUFDZCxLQUFHLEVBQUUsb0JBQU8sR0FBRzs7QUFFZixnQkFBYyxFQUFFLHdCQUFTLElBQUksRUFBRSxFQUFFLEVBQUU7QUFDakMsUUFBSSxnQkFBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssVUFBVSxFQUFFO0FBQ3RDLFVBQUksRUFBRSxFQUFFO0FBQUUsY0FBTSwyQkFBYyx5Q0FBeUMsQ0FBQyxDQUFDO09BQUU7QUFDM0Usb0JBQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztLQUM1QixNQUFNO0FBQ0wsVUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDekI7R0FDRjtBQUNELGtCQUFnQixFQUFFLDBCQUFTLElBQUksRUFBRTtBQUMvQixXQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDM0I7O0FBRUQsaUJBQWUsRUFBRSx5QkFBUyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ3ZDLFFBQUksZ0JBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLFVBQVUsRUFBRTtBQUN0QyxvQkFBTyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzdCLE1BQU07QUFDTCxVQUFJLE9BQU8sT0FBTyxLQUFLLFdBQVcsRUFBRTtBQUNsQyxjQUFNLHlFQUEwRCxJQUFJLG9CQUFpQixDQUFDO09BQ3ZGO0FBQ0QsVUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUM7S0FDL0I7R0FDRjtBQUNELG1CQUFpQixFQUFFLDJCQUFTLElBQUksRUFBRTtBQUNoQyxXQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDNUI7O0FBRUQsbUJBQWlCLEVBQUUsMkJBQVMsSUFBSSxFQUFFLEVBQUUsRUFBRTtBQUNwQyxRQUFJLGdCQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxVQUFVLEVBQUU7QUFDdEMsVUFBSSxFQUFFLEVBQUU7QUFBRSxjQUFNLDJCQUFjLDRDQUE0QyxDQUFDLENBQUM7T0FBRTtBQUM5RSxvQkFBTyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQy9CLE1BQU07QUFDTCxVQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUM1QjtHQUNGO0FBQ0QscUJBQW1CLEVBQUUsNkJBQVMsSUFBSSxFQUFFO0FBQ2xDLFdBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztHQUM5QjtDQUNGLENBQUM7O0FBRUssSUFBSSxHQUFHLEdBQUcsb0JBQU8sR0FBRyxDQUFDOzs7UUFFcEIsV0FBVztRQUFFLE1BQU0iLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y3JlYXRlRnJhbWUsIGV4dGVuZCwgdG9TdHJpbmd9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuL2V4Y2VwdGlvbic7XG5pbXBvcnQge3JlZ2lzdGVyRGVmYXVsdEhlbHBlcnN9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQge3JlZ2lzdGVyRGVmYXVsdERlY29yYXRvcnN9IGZyb20gJy4vZGVjb3JhdG9ycyc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcblxuZXhwb3J0IGNvbnN0IFZFUlNJT04gPSAnNC4wLjExJztcbmV4cG9ydCBjb25zdCBDT01QSUxFUl9SRVZJU0lPTiA9IDc7XG5cbmV4cG9ydCBjb25zdCBSRVZJU0lPTl9DSEFOR0VTID0ge1xuICAxOiAnPD0gMS4wLnJjLjInLCAvLyAxLjAucmMuMiBpcyBhY3R1YWxseSByZXYyIGJ1dCBkb2Vzbid0IHJlcG9ydCBpdFxuICAyOiAnPT0gMS4wLjAtcmMuMycsXG4gIDM6ICc9PSAxLjAuMC1yYy40JyxcbiAgNDogJz09IDEueC54JyxcbiAgNTogJz09IDIuMC4wLWFscGhhLngnLFxuICA2OiAnPj0gMi4wLjAtYmV0YS4xJyxcbiAgNzogJz49IDQuMC4wJ1xufTtcblxuY29uc3Qgb2JqZWN0VHlwZSA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG5leHBvcnQgZnVuY3Rpb24gSGFuZGxlYmFyc0Vudmlyb25tZW50KGhlbHBlcnMsIHBhcnRpYWxzLCBkZWNvcmF0b3JzKSB7XG4gIHRoaXMuaGVscGVycyA9IGhlbHBlcnMgfHwge307XG4gIHRoaXMucGFydGlhbHMgPSBwYXJ0aWFscyB8fCB7fTtcbiAgdGhpcy5kZWNvcmF0b3JzID0gZGVjb3JhdG9ycyB8fCB7fTtcblxuICByZWdpc3RlckRlZmF1bHRIZWxwZXJzKHRoaXMpO1xuICByZWdpc3RlckRlZmF1bHREZWNvcmF0b3JzKHRoaXMpO1xufVxuXG5IYW5kbGViYXJzRW52aXJvbm1lbnQucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogSGFuZGxlYmFyc0Vudmlyb25tZW50LFxuXG4gIGxvZ2dlcjogbG9nZ2VyLFxuICBsb2c6IGxvZ2dlci5sb2csXG5cbiAgcmVnaXN0ZXJIZWxwZXI6IGZ1bmN0aW9uKG5hbWUsIGZuKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGlmIChmbikgeyB0aHJvdyBuZXcgRXhjZXB0aW9uKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGhlbHBlcnMnKTsgfVxuICAgICAgZXh0ZW5kKHRoaXMuaGVscGVycywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGVscGVyc1tuYW1lXSA9IGZuO1xuICAgIH1cbiAgfSxcbiAgdW5yZWdpc3RlckhlbHBlcjogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLmhlbHBlcnNbbmFtZV07XG4gIH0sXG5cbiAgcmVnaXN0ZXJQYXJ0aWFsOiBmdW5jdGlvbihuYW1lLCBwYXJ0aWFsKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGV4dGVuZCh0aGlzLnBhcnRpYWxzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiBwYXJ0aWFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKGBBdHRlbXB0aW5nIHRvIHJlZ2lzdGVyIGEgcGFydGlhbCBjYWxsZWQgXCIke25hbWV9XCIgYXMgdW5kZWZpbmVkYCk7XG4gICAgICB9XG4gICAgICB0aGlzLnBhcnRpYWxzW25hbWVdID0gcGFydGlhbDtcbiAgICB9XG4gIH0sXG4gIHVucmVnaXN0ZXJQYXJ0aWFsOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMucGFydGlhbHNbbmFtZV07XG4gIH0sXG5cbiAgcmVnaXN0ZXJEZWNvcmF0b3I6IGZ1bmN0aW9uKG5hbWUsIGZuKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGlmIChmbikgeyB0aHJvdyBuZXcgRXhjZXB0aW9uKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGRlY29yYXRvcnMnKTsgfVxuICAgICAgZXh0ZW5kKHRoaXMuZGVjb3JhdG9ycywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVjb3JhdG9yc1tuYW1lXSA9IGZuO1xuICAgIH1cbiAgfSxcbiAgdW5yZWdpc3RlckRlY29yYXRvcjogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLmRlY29yYXRvcnNbbmFtZV07XG4gIH1cbn07XG5cbmV4cG9ydCBsZXQgbG9nID0gbG9nZ2VyLmxvZztcblxuZXhwb3J0IHtjcmVhdGVGcmFtZSwgbG9nZ2VyfTtcbiJdfQ==


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/decorators.js":
/*!*******************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/decorators.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.registerDefaultDecorators = registerDefaultDecorators;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _decoratorsInline = __webpack_require__(/*! ./decorators/inline */ "./node_modules/handlebars/dist/cjs/handlebars/decorators/inline.js");

var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

function registerDefaultDecorators(instance) {
  _decoratorsInline2['default'](instance);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Z0NBQTJCLHFCQUFxQjs7OztBQUV6QyxTQUFTLHlCQUF5QixDQUFDLFFBQVEsRUFBRTtBQUNsRCxnQ0FBZSxRQUFRLENBQUMsQ0FBQztDQUMxQiIsImZpbGUiOiJkZWNvcmF0b3JzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlZ2lzdGVySW5saW5lIGZyb20gJy4vZGVjb3JhdG9ycy9pbmxpbmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJEZWZhdWx0RGVjb3JhdG9ycyhpbnN0YW5jZSkge1xuICByZWdpc3RlcklubGluZShpbnN0YW5jZSk7XG59XG5cbiJdfQ==


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/decorators/inline.js":
/*!**************************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/decorators/inline.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(/*! ../utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");

exports['default'] = function (instance) {
  instance.registerDecorator('inline', function (fn, props, container, options) {
    var ret = fn;
    if (!props.partials) {
      props.partials = {};
      ret = function (context, options) {
        // Create a new partials stack frame prior to exec.
        var original = container.partials;
        container.partials = _utils.extend({}, original, props.partials);
        var ret = fn(context, options);
        container.partials = original;
        return ret;
      };
    }

    props.partials[options.args[0]] = options.fn;

    return ret;
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMvaW5saW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7cUJBQXFCLFVBQVU7O3FCQUVoQixVQUFTLFFBQVEsRUFBRTtBQUNoQyxVQUFRLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLFVBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFO0FBQzNFLFFBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNiLFFBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQ25CLFdBQUssQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLFNBQUcsR0FBRyxVQUFTLE9BQU8sRUFBRSxPQUFPLEVBQUU7O0FBRS9CLFlBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7QUFDbEMsaUJBQVMsQ0FBQyxRQUFRLEdBQUcsY0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxRCxZQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLGlCQUFTLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUM5QixlQUFPLEdBQUcsQ0FBQztPQUNaLENBQUM7S0FDSDs7QUFFRCxTQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDOztBQUU3QyxXQUFPLEdBQUcsQ0FBQztHQUNaLENBQUMsQ0FBQztDQUNKIiwiZmlsZSI6ImlubGluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7ZXh0ZW5kfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVyRGVjb3JhdG9yKCdpbmxpbmUnLCBmdW5jdGlvbihmbiwgcHJvcHMsIGNvbnRhaW5lciwgb3B0aW9ucykge1xuICAgIGxldCByZXQgPSBmbjtcbiAgICBpZiAoIXByb3BzLnBhcnRpYWxzKSB7XG4gICAgICBwcm9wcy5wYXJ0aWFscyA9IHt9O1xuICAgICAgcmV0ID0gZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgcGFydGlhbHMgc3RhY2sgZnJhbWUgcHJpb3IgdG8gZXhlYy5cbiAgICAgICAgbGV0IG9yaWdpbmFsID0gY29udGFpbmVyLnBhcnRpYWxzO1xuICAgICAgICBjb250YWluZXIucGFydGlhbHMgPSBleHRlbmQoe30sIG9yaWdpbmFsLCBwcm9wcy5wYXJ0aWFscyk7XG4gICAgICAgIGxldCByZXQgPSBmbihjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gb3JpZ2luYWw7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHByb3BzLnBhcnRpYWxzW29wdGlvbnMuYXJnc1swXV0gPSBvcHRpb25zLmZuO1xuXG4gICAgcmV0dXJuIHJldDtcbiAgfSk7XG59XG4iXX0=


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/exception.js":
/*!******************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/exception.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var loc = node && node.loc,
      line = undefined,
      column = undefined;
  if (loc) {
    line = loc.start.line;
    column = loc.start.column;

    message += ' - ' + line + ':' + column;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  /* istanbul ignore else */
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, Exception);
  }

  try {
    if (loc) {
      this.lineNumber = line;

      // Work around issue under safari where we can't directly set the column value
      /* istanbul ignore next */
      if (Object.defineProperty) {
        Object.defineProperty(this, 'column', {
          value: column,
          enumerable: true
        });
      } else {
        this.column = column;
      }
    }
  } catch (nop) {
    /* Ignore if the browser is very particular */
  }
}

Exception.prototype = new Error();

exports['default'] = Exception;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2V4Y2VwdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsSUFBTSxVQUFVLEdBQUcsQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFFbkcsU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUNoQyxNQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUc7TUFDdEIsSUFBSSxZQUFBO01BQ0osTUFBTSxZQUFBLENBQUM7QUFDWCxNQUFJLEdBQUcsRUFBRTtBQUNQLFFBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztBQUN0QixVQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7O0FBRTFCLFdBQU8sSUFBSSxLQUFLLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7R0FDeEM7O0FBRUQsTUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQzs7O0FBRzFELE9BQUssSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFO0FBQ2hELFFBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7R0FDOUM7OztBQUdELE1BQUksS0FBSyxDQUFDLGlCQUFpQixFQUFFO0FBQzNCLFNBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7R0FDMUM7O0FBRUQsTUFBSTtBQUNGLFFBQUksR0FBRyxFQUFFO0FBQ1AsVUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Ozs7QUFJdkIsVUFBSSxNQUFNLENBQUMsY0FBYyxFQUFFO0FBQ3pCLGNBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUNwQyxlQUFLLEVBQUUsTUFBTTtBQUNiLG9CQUFVLEVBQUUsSUFBSTtTQUNqQixDQUFDLENBQUM7T0FDSixNQUFNO0FBQ0wsWUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7T0FDdEI7S0FDRjtHQUNGLENBQUMsT0FBTyxHQUFHLEVBQUU7O0dBRWI7Q0FDRjs7QUFFRCxTQUFTLENBQUMsU0FBUyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7O3FCQUVuQixTQUFTIiwiZmlsZSI6ImV4Y2VwdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3QgZXJyb3JQcm9wcyA9IFsnZGVzY3JpcHRpb24nLCAnZmlsZU5hbWUnLCAnbGluZU51bWJlcicsICdtZXNzYWdlJywgJ25hbWUnLCAnbnVtYmVyJywgJ3N0YWNrJ107XG5cbmZ1bmN0aW9uIEV4Y2VwdGlvbihtZXNzYWdlLCBub2RlKSB7XG4gIGxldCBsb2MgPSBub2RlICYmIG5vZGUubG9jLFxuICAgICAgbGluZSxcbiAgICAgIGNvbHVtbjtcbiAgaWYgKGxvYykge1xuICAgIGxpbmUgPSBsb2Muc3RhcnQubGluZTtcbiAgICBjb2x1bW4gPSBsb2Muc3RhcnQuY29sdW1uO1xuXG4gICAgbWVzc2FnZSArPSAnIC0gJyArIGxpbmUgKyAnOicgKyBjb2x1bW47XG4gIH1cblxuICBsZXQgdG1wID0gRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgbWVzc2FnZSk7XG5cbiAgLy8gVW5mb3J0dW5hdGVseSBlcnJvcnMgYXJlIG5vdCBlbnVtZXJhYmxlIGluIENocm9tZSAoYXQgbGVhc3QpLCBzbyBgZm9yIHByb3AgaW4gdG1wYCBkb2Vzbid0IHdvcmsuXG4gIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGVycm9yUHJvcHMubGVuZ3RoOyBpZHgrKykge1xuICAgIHRoaXNbZXJyb3JQcm9wc1tpZHhdXSA9IHRtcFtlcnJvclByb3BzW2lkeF1dO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgRXhjZXB0aW9uKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgaWYgKGxvYykge1xuICAgICAgdGhpcy5saW5lTnVtYmVyID0gbGluZTtcblxuICAgICAgLy8gV29yayBhcm91bmQgaXNzdWUgdW5kZXIgc2FmYXJpIHdoZXJlIHdlIGNhbid0IGRpcmVjdGx5IHNldCB0aGUgY29sdW1uIHZhbHVlXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NvbHVtbicsIHtcbiAgICAgICAgICB2YWx1ZTogY29sdW1uLFxuICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbHVtbiA9IGNvbHVtbjtcbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggKG5vcCkge1xuICAgIC8qIElnbm9yZSBpZiB0aGUgYnJvd3NlciBpcyB2ZXJ5IHBhcnRpY3VsYXIgKi9cbiAgfVxufVxuXG5FeGNlcHRpb24ucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV4Y2VwdGlvbjtcbiJdfQ==


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/helpers.js":
/*!****************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/helpers.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.registerDefaultHelpers = registerDefaultHelpers;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersBlockHelperMissing = __webpack_require__(/*! ./helpers/block-helper-missing */ "./node_modules/handlebars/dist/cjs/handlebars/helpers/block-helper-missing.js");

var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

var _helpersEach = __webpack_require__(/*! ./helpers/each */ "./node_modules/handlebars/dist/cjs/handlebars/helpers/each.js");

var _helpersEach2 = _interopRequireDefault(_helpersEach);

var _helpersHelperMissing = __webpack_require__(/*! ./helpers/helper-missing */ "./node_modules/handlebars/dist/cjs/handlebars/helpers/helper-missing.js");

var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

var _helpersIf = __webpack_require__(/*! ./helpers/if */ "./node_modules/handlebars/dist/cjs/handlebars/helpers/if.js");

var _helpersIf2 = _interopRequireDefault(_helpersIf);

var _helpersLog = __webpack_require__(/*! ./helpers/log */ "./node_modules/handlebars/dist/cjs/handlebars/helpers/log.js");

var _helpersLog2 = _interopRequireDefault(_helpersLog);

var _helpersLookup = __webpack_require__(/*! ./helpers/lookup */ "./node_modules/handlebars/dist/cjs/handlebars/helpers/lookup.js");

var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

var _helpersWith = __webpack_require__(/*! ./helpers/with */ "./node_modules/handlebars/dist/cjs/handlebars/helpers/with.js");

var _helpersWith2 = _interopRequireDefault(_helpersWith);

function registerDefaultHelpers(instance) {
  _helpersBlockHelperMissing2['default'](instance);
  _helpersEach2['default'](instance);
  _helpersHelperMissing2['default'](instance);
  _helpersIf2['default'](instance);
  _helpersLog2['default'](instance);
  _helpersLookup2['default'](instance);
  _helpersWith2['default'](instance);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7eUNBQXVDLGdDQUFnQzs7OzsyQkFDOUMsZ0JBQWdCOzs7O29DQUNQLDBCQUEwQjs7Ozt5QkFDckMsY0FBYzs7OzswQkFDYixlQUFlOzs7OzZCQUNaLGtCQUFrQjs7OzsyQkFDcEIsZ0JBQWdCOzs7O0FBRWxDLFNBQVMsc0JBQXNCLENBQUMsUUFBUSxFQUFFO0FBQy9DLHlDQUEyQixRQUFRLENBQUMsQ0FBQztBQUNyQywyQkFBYSxRQUFRLENBQUMsQ0FBQztBQUN2QixvQ0FBc0IsUUFBUSxDQUFDLENBQUM7QUFDaEMseUJBQVcsUUFBUSxDQUFDLENBQUM7QUFDckIsMEJBQVksUUFBUSxDQUFDLENBQUM7QUFDdEIsNkJBQWUsUUFBUSxDQUFDLENBQUM7QUFDekIsMkJBQWEsUUFBUSxDQUFDLENBQUM7Q0FDeEIiLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZWdpc3RlckJsb2NrSGVscGVyTWlzc2luZyBmcm9tICcuL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcnO1xuaW1wb3J0IHJlZ2lzdGVyRWFjaCBmcm9tICcuL2hlbHBlcnMvZWFjaCc7XG5pbXBvcnQgcmVnaXN0ZXJIZWxwZXJNaXNzaW5nIGZyb20gJy4vaGVscGVycy9oZWxwZXItbWlzc2luZyc7XG5pbXBvcnQgcmVnaXN0ZXJJZiBmcm9tICcuL2hlbHBlcnMvaWYnO1xuaW1wb3J0IHJlZ2lzdGVyTG9nIGZyb20gJy4vaGVscGVycy9sb2cnO1xuaW1wb3J0IHJlZ2lzdGVyTG9va3VwIGZyb20gJy4vaGVscGVycy9sb29rdXAnO1xuaW1wb3J0IHJlZ2lzdGVyV2l0aCBmcm9tICcuL2hlbHBlcnMvd2l0aCc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckRlZmF1bHRIZWxwZXJzKGluc3RhbmNlKSB7XG4gIHJlZ2lzdGVyQmxvY2tIZWxwZXJNaXNzaW5nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJFYWNoKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJIZWxwZXJNaXNzaW5nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJJZihpbnN0YW5jZSk7XG4gIHJlZ2lzdGVyTG9nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJMb29rdXAoaW5zdGFuY2UpO1xuICByZWdpc3RlcldpdGgoaW5zdGFuY2UpO1xufVxuIl19


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/helpers/block-helper-missing.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/helpers/block-helper-missing.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(/*! ../utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");

exports['default'] = function (instance) {
  instance.registerHelper('blockHelperMissing', function (context, options) {
    var inverse = options.inverse,
        fn = options.fn;

    if (context === true) {
      return fn(this);
    } else if (context === false || context == null) {
      return inverse(this);
    } else if (_utils.isArray(context)) {
      if (context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
        options = { data: data };
      }

      return fn(context, options);
    }
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztxQkFBc0QsVUFBVTs7cUJBRWpELFVBQVMsUUFBUSxFQUFFO0FBQ2hDLFVBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLEVBQUUsVUFBUyxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ3ZFLFFBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPO1FBQ3pCLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDOztBQUVwQixRQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7QUFDcEIsYUFBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDakIsTUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtBQUMvQyxhQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0QixNQUFNLElBQUksZUFBUSxPQUFPLENBQUMsRUFBRTtBQUMzQixVQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ3RCLFlBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUNmLGlCQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlCOztBQUVELGVBQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO09BQ2hELE1BQU07QUFDTCxlQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUN0QjtLQUNGLE1BQU07QUFDTCxVQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUMvQixZQUFJLElBQUksR0FBRyxtQkFBWSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckMsWUFBSSxDQUFDLFdBQVcsR0FBRyx5QkFBa0IsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdFLGVBQU8sR0FBRyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQztPQUN4Qjs7QUFFRCxhQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDN0I7R0FDRixDQUFDLENBQUM7Q0FDSiIsImZpbGUiOiJibG9jay1oZWxwZXItbWlzc2luZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGNyZWF0ZUZyYW1lLCBpc0FycmF5fSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdibG9ja0hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgbGV0IGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmIChjb250ZXh0ID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZm4odGhpcyk7XG4gICAgfSBlbHNlIGlmIChjb250ZXh0ID09PSBmYWxzZSB8fCBjb250ZXh0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgaWYgKGNvbnRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICAgICAgICBvcHRpb25zLmlkcyA9IFtvcHRpb25zLm5hbWVdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnMuZWFjaChjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGxldCBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5uYW1lKTtcbiAgICAgICAgb3B0aW9ucyA9IHtkYXRhOiBkYXRhfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfSk7XG59XG4iXX0=


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/helpers/each.js":
/*!*********************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/helpers/each.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = __webpack_require__(/*! ../utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");

var _exception = __webpack_require__(/*! ../exception */ "./node_modules/handlebars/dist/cjs/handlebars/exception.js");

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('each', function (context, options) {
    if (!options) {
      throw new _exception2['default']('Must pass iterator to #each');
    }

    var fn = options.fn,
        inverse = options.inverse,
        i = 0,
        ret = '',
        data = undefined,
        contextPath = undefined;

    if (options.data && options.ids) {
      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    if (options.data) {
      data = _utils.createFrame(options.data);
    }

    function execIteration(field, index, last) {
      if (data) {
        data.key = field;
        data.index = index;
        data.first = index === 0;
        data.last = !!last;

        if (contextPath) {
          data.contextPath = contextPath + field;
        }
      }

      ret = ret + fn(context[field], {
        data: data,
        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
      });
    }

    if (context && typeof context === 'object') {
      if (_utils.isArray(context)) {
        for (var j = context.length; i < j; i++) {
          if (i in context) {
            execIteration(i, i, i === context.length - 1);
          }
        }
      } else {
        var priorKey = undefined;

        for (var key in context) {
          if (context.hasOwnProperty(key)) {
            // We're running the iterations one step out of sync so we can detect
            // the last iteration without have to scan the object twice and create
            // an itermediate keys array.
            if (priorKey !== undefined) {
              execIteration(priorKey, i - 1);
            }
            priorKey = key;
            i++;
          }
        }
        if (priorKey !== undefined) {
          execIteration(priorKey, i - 1, true);
        }
      }
    }

    if (i === 0) {
      ret = inverse(this);
    }

    return ret;
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvZWFjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O3FCQUErRSxVQUFVOzt5QkFDbkUsY0FBYzs7OztxQkFFckIsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBUyxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ3pELFFBQUksQ0FBQyxPQUFPLEVBQUU7QUFDWixZQUFNLDJCQUFjLDZCQUE2QixDQUFDLENBQUM7S0FDcEQ7O0FBRUQsUUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUU7UUFDZixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU87UUFDekIsQ0FBQyxHQUFHLENBQUM7UUFDTCxHQUFHLEdBQUcsRUFBRTtRQUNSLElBQUksWUFBQTtRQUNKLFdBQVcsWUFBQSxDQUFDOztBQUVoQixRQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUMvQixpQkFBVyxHQUFHLHlCQUFrQixPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0tBQ2pGOztBQUVELFFBQUksa0JBQVcsT0FBTyxDQUFDLEVBQUU7QUFBRSxhQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUFFOztBQUUxRCxRQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7QUFDaEIsVUFBSSxHQUFHLG1CQUFZLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNsQzs7QUFFRCxhQUFTLGFBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtBQUN6QyxVQUFJLElBQUksRUFBRTtBQUNSLFlBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFlBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQztBQUN6QixZQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7O0FBRW5CLFlBQUksV0FBVyxFQUFFO0FBQ2YsY0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLEdBQUcsS0FBSyxDQUFDO1NBQ3hDO09BQ0Y7O0FBRUQsU0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQzdCLFlBQUksRUFBRSxJQUFJO0FBQ1YsbUJBQVcsRUFBRSxtQkFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLFdBQVcsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7T0FDL0UsQ0FBQyxDQUFDO0tBQ0o7O0FBRUQsUUFBSSxPQUFPLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO0FBQzFDLFVBQUksZUFBUSxPQUFPLENBQUMsRUFBRTtBQUNwQixhQUFLLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN2QyxjQUFJLENBQUMsSUFBSSxPQUFPLEVBQUU7QUFDaEIseUJBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1dBQy9DO1NBQ0Y7T0FDRixNQUFNO0FBQ0wsWUFBSSxRQUFRLFlBQUEsQ0FBQzs7QUFFYixhQUFLLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRTtBQUN2QixjQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Ozs7QUFJL0IsZ0JBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtBQUMxQiwyQkFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDaEM7QUFDRCxvQkFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLGFBQUMsRUFBRSxDQUFDO1dBQ0w7U0FDRjtBQUNELFlBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtBQUMxQix1QkFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3RDO09BQ0Y7S0FDRjs7QUFFRCxRQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDWCxTQUFHLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3JCOztBQUVELFdBQU8sR0FBRyxDQUFDO0dBQ1osQ0FBQyxDQUFDO0NBQ0oiLCJmaWxlIjoiZWFjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGJsb2NrUGFyYW1zLCBjcmVhdGVGcmFtZSwgaXNBcnJheSwgaXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuLi9leGNlcHRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignZWFjaCcsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ011c3QgcGFzcyBpdGVyYXRvciB0byAjZWFjaCcpO1xuICAgIH1cblxuICAgIGxldCBmbiA9IG9wdGlvbnMuZm4sXG4gICAgICAgIGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGkgPSAwLFxuICAgICAgICByZXQgPSAnJyxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgY29udGV4dFBhdGg7XG5cbiAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICBjb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5pZHNbMF0pICsgJy4nO1xuICAgIH1cblxuICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQpKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICAgIGlmIChvcHRpb25zLmRhdGEpIHtcbiAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4ZWNJdGVyYXRpb24oZmllbGQsIGluZGV4LCBsYXN0KSB7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBkYXRhLmtleSA9IGZpZWxkO1xuICAgICAgICBkYXRhLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIGRhdGEuZmlyc3QgPSBpbmRleCA9PT0gMDtcbiAgICAgICAgZGF0YS5sYXN0ID0gISFsYXN0O1xuXG4gICAgICAgIGlmIChjb250ZXh0UGF0aCkge1xuICAgICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBjb250ZXh0UGF0aCArIGZpZWxkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldCA9IHJldCArIGZuKGNvbnRleHRbZmllbGRdLCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBibG9ja1BhcmFtcyhbY29udGV4dFtmaWVsZF0sIGZpZWxkXSwgW2NvbnRleHRQYXRoICsgZmllbGQsIG51bGxdKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRleHQgJiYgdHlwZW9mIGNvbnRleHQgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgICBmb3IgKGxldCBqID0gY29udGV4dC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgICBpZiAoaSBpbiBjb250ZXh0KSB7XG4gICAgICAgICAgICBleGVjSXRlcmF0aW9uKGksIGksIGkgPT09IGNvbnRleHQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcHJpb3JLZXk7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGNvbnRleHQpIHtcbiAgICAgICAgICBpZiAoY29udGV4dC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAvLyBXZSdyZSBydW5uaW5nIHRoZSBpdGVyYXRpb25zIG9uZSBzdGVwIG91dCBvZiBzeW5jIHNvIHdlIGNhbiBkZXRlY3RcbiAgICAgICAgICAgIC8vIHRoZSBsYXN0IGl0ZXJhdGlvbiB3aXRob3V0IGhhdmUgdG8gc2NhbiB0aGUgb2JqZWN0IHR3aWNlIGFuZCBjcmVhdGVcbiAgICAgICAgICAgIC8vIGFuIGl0ZXJtZWRpYXRlIGtleXMgYXJyYXkuXG4gICAgICAgICAgICBpZiAocHJpb3JLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBleGVjSXRlcmF0aW9uKHByaW9yS2V5LCBpIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmlvcktleSA9IGtleTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByaW9yS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBleGVjSXRlcmF0aW9uKHByaW9yS2V5LCBpIC0gMSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgcmV0ID0gaW52ZXJzZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cbiJdfQ==


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/helpers/helper-missing.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/helpers/helper-missing.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _exception = __webpack_require__(/*! ../exception */ "./node_modules/handlebars/dist/cjs/handlebars/exception.js");

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('helperMissing', function () /* [args, ]options */{
    if (arguments.length === 1) {
      // A missing field in a {{foo}} construct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
    }
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaGVscGVyLW1pc3NpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozt5QkFBc0IsY0FBYzs7OztxQkFFckIsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsaUNBQWdDO0FBQ3ZFLFFBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7O0FBRTFCLGFBQU8sU0FBUyxDQUFDO0tBQ2xCLE1BQU07O0FBRUwsWUFBTSwyQkFBYyxtQkFBbUIsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7S0FDdkY7R0FDRixDQUFDLENBQUM7Q0FDSiIsImZpbGUiOiJoZWxwZXItbWlzc2luZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi4vZXhjZXB0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbigvKiBbYXJncywgXW9wdGlvbnMgKi8pIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgLy8gQSBtaXNzaW5nIGZpZWxkIGluIGEge3tmb299fSBjb25zdHJ1Y3QuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTb21lb25lIGlzIGFjdHVhbGx5IHRyeWluZyB0byBjYWxsIHNvbWV0aGluZywgYmxvdyB1cC5cbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ01pc3NpbmcgaGVscGVyOiBcIicgKyBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdLm5hbWUgKyAnXCInKTtcbiAgICB9XG4gIH0pO1xufVxuIl19


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/helpers/if.js":
/*!*******************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/helpers/if.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(/*! ../utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");

exports['default'] = function (instance) {
  instance.registerHelper('if', function (conditional, options) {
    if (_utils.isFunction(conditional)) {
      conditional = conditional.call(this);
    }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function (conditional, options) {
    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaWYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztxQkFBa0MsVUFBVTs7cUJBRTdCLFVBQVMsUUFBUSxFQUFFO0FBQ2hDLFVBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFVBQVMsV0FBVyxFQUFFLE9BQU8sRUFBRTtBQUMzRCxRQUFJLGtCQUFXLFdBQVcsQ0FBQyxFQUFFO0FBQUUsaUJBQVcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQUU7Ozs7O0FBS3RFLFFBQUksQUFBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsV0FBVyxJQUFLLGVBQVEsV0FBVyxDQUFDLEVBQUU7QUFDdkUsYUFBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzlCLE1BQU07QUFDTCxhQUFPLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekI7R0FDRixDQUFDLENBQUM7O0FBRUgsVUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsVUFBUyxXQUFXLEVBQUUsT0FBTyxFQUFFO0FBQy9ELFdBQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztHQUN2SCxDQUFDLENBQUM7Q0FDSiIsImZpbGUiOiJpZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNFbXB0eSwgaXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignaWYnLCBmdW5jdGlvbihjb25kaXRpb25hbCwgb3B0aW9ucykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNvbmRpdGlvbmFsKSkgeyBjb25kaXRpb25hbCA9IGNvbmRpdGlvbmFsLmNhbGwodGhpcyk7IH1cblxuICAgIC8vIERlZmF1bHQgYmVoYXZpb3IgaXMgdG8gcmVuZGVyIHRoZSBwb3NpdGl2ZSBwYXRoIGlmIHRoZSB2YWx1ZSBpcyB0cnV0aHkgYW5kIG5vdCBlbXB0eS5cbiAgICAvLyBUaGUgYGluY2x1ZGVaZXJvYCBvcHRpb24gbWF5IGJlIHNldCB0byB0cmVhdCB0aGUgY29uZHRpb25hbCBhcyBwdXJlbHkgbm90IGVtcHR5IGJhc2VkIG9uIHRoZVxuICAgIC8vIGJlaGF2aW9yIG9mIGlzRW1wdHkuIEVmZmVjdGl2ZWx5IHRoaXMgZGV0ZXJtaW5lcyBpZiAwIGlzIGhhbmRsZWQgYnkgdGhlIHBvc2l0aXZlIHBhdGggb3IgbmVnYXRpdmUuXG4gICAgaWYgKCghb3B0aW9ucy5oYXNoLmluY2x1ZGVaZXJvICYmICFjb25kaXRpb25hbCkgfHwgaXNFbXB0eShjb25kaXRpb25hbCkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZuKHRoaXMpO1xuICAgIH1cbiAgfSk7XG5cbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3VubGVzcycsIGZ1bmN0aW9uKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnNbJ2lmJ10uY2FsbCh0aGlzLCBjb25kaXRpb25hbCwge2ZuOiBvcHRpb25zLmludmVyc2UsIGludmVyc2U6IG9wdGlvbnMuZm4sIGhhc2g6IG9wdGlvbnMuaGFzaH0pO1xuICB9KTtcbn1cbiJdfQ==


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/helpers/log.js":
/*!********************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/helpers/log.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('log', function () /* message, options */{
    var args = [undefined],
        options = arguments[arguments.length - 1];
    for (var i = 0; i < arguments.length - 1; i++) {
      args.push(arguments[i]);
    }

    var level = 1;
    if (options.hash.level != null) {
      level = options.hash.level;
    } else if (options.data && options.data.level != null) {
      level = options.data.level;
    }
    args[0] = level;

    instance.log.apply(instance, args);
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7cUJBQWUsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsa0NBQWlDO0FBQzlELFFBQUksSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQ2xCLE9BQU8sR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM5QyxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDN0MsVUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN6Qjs7QUFFRCxRQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDZCxRQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtBQUM5QixXQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDNUIsTUFBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFO0FBQ3JELFdBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztLQUM1QjtBQUNELFFBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7O0FBRWhCLFlBQVEsQ0FBQyxHQUFHLE1BQUEsQ0FBWixRQUFRLEVBQVMsSUFBSSxDQUFDLENBQUM7R0FDeEIsQ0FBQyxDQUFDO0NBQ0oiLCJmaWxlIjoibG9nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2xvZycsIGZ1bmN0aW9uKC8qIG1lc3NhZ2UsIG9wdGlvbnMgKi8pIHtcbiAgICBsZXQgYXJncyA9IFt1bmRlZmluZWRdLFxuICAgICAgICBvcHRpb25zID0gYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICAgIH1cblxuICAgIGxldCBsZXZlbCA9IDE7XG4gICAgaWYgKG9wdGlvbnMuaGFzaC5sZXZlbCAhPSBudWxsKSB7XG4gICAgICBsZXZlbCA9IG9wdGlvbnMuaGFzaC5sZXZlbDtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmRhdGEubGV2ZWwgIT0gbnVsbCkge1xuICAgICAgbGV2ZWwgPSBvcHRpb25zLmRhdGEubGV2ZWw7XG4gICAgfVxuICAgIGFyZ3NbMF0gPSBsZXZlbDtcblxuICAgIGluc3RhbmNlLmxvZyguLi4gYXJncyk7XG4gIH0pO1xufVxuIl19


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/helpers/lookup.js":
/*!***********************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/helpers/lookup.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('lookup', function (obj, field) {
    return obj && obj[field];
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9va3VwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7cUJBQWUsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsVUFBUyxHQUFHLEVBQUUsS0FBSyxFQUFFO0FBQ3JELFdBQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUMxQixDQUFDLENBQUM7Q0FDSiIsImZpbGUiOiJsb29rdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignbG9va3VwJywgZnVuY3Rpb24ob2JqLCBmaWVsZCkge1xuICAgIHJldHVybiBvYmogJiYgb2JqW2ZpZWxkXTtcbiAgfSk7XG59XG4iXX0=


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/helpers/with.js":
/*!*********************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/helpers/with.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(/*! ../utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");

exports['default'] = function (instance) {
  instance.registerHelper('with', function (context, options) {
    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    var fn = options.fn;

    if (!_utils.isEmpty(context)) {
      var data = options.data;
      if (options.data && options.ids) {
        data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
      }

      return fn(context, {
        data: data,
        blockParams: _utils.blockParams([context], [data && data.contextPath])
      });
    } else {
      return options.inverse(this);
    }
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvd2l0aC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O3FCQUErRSxVQUFVOztxQkFFMUUsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBUyxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ3pELFFBQUksa0JBQVcsT0FBTyxDQUFDLEVBQUU7QUFBRSxhQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUFFOztBQUUxRCxRQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDOztBQUVwQixRQUFJLENBQUMsZUFBUSxPQUFPLENBQUMsRUFBRTtBQUNyQixVQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQ3hCLFVBQUksT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQy9CLFlBQUksR0FBRyxtQkFBWSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakMsWUFBSSxDQUFDLFdBQVcsR0FBRyx5QkFBa0IsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQ2hGOztBQUVELGFBQU8sRUFBRSxDQUFDLE9BQU8sRUFBRTtBQUNqQixZQUFJLEVBQUUsSUFBSTtBQUNWLG1CQUFXLEVBQUUsbUJBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7T0FDaEUsQ0FBQyxDQUFDO0tBQ0osTUFBTTtBQUNMLGFBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM5QjtHQUNGLENBQUMsQ0FBQztDQUNKIiwiZmlsZSI6IndpdGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcGVuZENvbnRleHRQYXRoLCBibG9ja1BhcmFtcywgY3JlYXRlRnJhbWUsIGlzRW1wdHksIGlzRnVuY3Rpb259IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3dpdGgnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29udGV4dCkpIHsgY29udGV4dCA9IGNvbnRleHQuY2FsbCh0aGlzKTsgfVxuXG4gICAgbGV0IGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmICghaXNFbXB0eShjb250ZXh0KSkge1xuICAgICAgbGV0IGRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLmlkc1swXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmbihjb250ZXh0LCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBibG9ja1BhcmFtcyhbY29udGV4dF0sIFtkYXRhICYmIGRhdGEuY29udGV4dFBhdGhdKVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/logger.js":
/*!***************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/logger.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(/*! ./utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");

var logger = {
  methodMap: ['debug', 'info', 'warn', 'error'],
  level: 'info',

  // Maps a given level value to the `methodMap` indexes above.
  lookupLevel: function lookupLevel(level) {
    if (typeof level === 'string') {
      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
      if (levelMap >= 0) {
        level = levelMap;
      } else {
        level = parseInt(level, 10);
      }
    }

    return level;
  },

  // Can be overridden in the host environment
  log: function log(level) {
    level = logger.lookupLevel(level);

    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
      var method = logger.methodMap[level];
      if (!console[method]) {
        // eslint-disable-line no-console
        method = 'log';
      }

      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        message[_key - 1] = arguments[_key];
      }

      console[method].apply(console, message); // eslint-disable-line no-console
    }
  }
};

exports['default'] = logger;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2xvZ2dlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O3FCQUFzQixTQUFTOztBQUUvQixJQUFJLE1BQU0sR0FBRztBQUNYLFdBQVMsRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQztBQUM3QyxPQUFLLEVBQUUsTUFBTTs7O0FBR2IsYUFBVyxFQUFFLHFCQUFTLEtBQUssRUFBRTtBQUMzQixRQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtBQUM3QixVQUFJLFFBQVEsR0FBRyxlQUFRLE1BQU0sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFDOUQsVUFBSSxRQUFRLElBQUksQ0FBQyxFQUFFO0FBQ2pCLGFBQUssR0FBRyxRQUFRLENBQUM7T0FDbEIsTUFBTTtBQUNMLGFBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO09BQzdCO0tBQ0Y7O0FBRUQsV0FBTyxLQUFLLENBQUM7R0FDZDs7O0FBR0QsS0FBRyxFQUFFLGFBQVMsS0FBSyxFQUFjO0FBQy9CLFNBQUssR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUVsQyxRQUFJLE9BQU8sT0FBTyxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLEVBQUU7QUFDL0UsVUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyQyxVQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFOztBQUNwQixjQUFNLEdBQUcsS0FBSyxDQUFDO09BQ2hCOzt3Q0FQbUIsT0FBTztBQUFQLGVBQU87OztBQVEzQixhQUFPLENBQUMsTUFBTSxPQUFDLENBQWYsT0FBTyxFQUFZLE9BQU8sQ0FBQyxDQUFDO0tBQzdCO0dBQ0Y7Q0FDRixDQUFDOztxQkFFYSxNQUFNIiwiZmlsZSI6ImxvZ2dlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5kZXhPZn0gZnJvbSAnLi91dGlscyc7XG5cbmxldCBsb2dnZXIgPSB7XG4gIG1ldGhvZE1hcDogWydkZWJ1ZycsICdpbmZvJywgJ3dhcm4nLCAnZXJyb3InXSxcbiAgbGV2ZWw6ICdpbmZvJyxcblxuICAvLyBNYXBzIGEgZ2l2ZW4gbGV2ZWwgdmFsdWUgdG8gdGhlIGBtZXRob2RNYXBgIGluZGV4ZXMgYWJvdmUuXG4gIGxvb2t1cExldmVsOiBmdW5jdGlvbihsZXZlbCkge1xuICAgIGlmICh0eXBlb2YgbGV2ZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgbGV2ZWxNYXAgPSBpbmRleE9mKGxvZ2dlci5tZXRob2RNYXAsIGxldmVsLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgaWYgKGxldmVsTWFwID49IDApIHtcbiAgICAgICAgbGV2ZWwgPSBsZXZlbE1hcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldmVsID0gcGFyc2VJbnQobGV2ZWwsIDEwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbGV2ZWw7XG4gIH0sXG5cbiAgLy8gQ2FuIGJlIG92ZXJyaWRkZW4gaW4gdGhlIGhvc3QgZW52aXJvbm1lbnRcbiAgbG9nOiBmdW5jdGlvbihsZXZlbCwgLi4ubWVzc2FnZSkge1xuICAgIGxldmVsID0gbG9nZ2VyLmxvb2t1cExldmVsKGxldmVsKTtcblxuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbG9nZ2VyLmxvb2t1cExldmVsKGxvZ2dlci5sZXZlbCkgPD0gbGV2ZWwpIHtcbiAgICAgIGxldCBtZXRob2QgPSBsb2dnZXIubWV0aG9kTWFwW2xldmVsXTtcbiAgICAgIGlmICghY29uc29sZVttZXRob2RdKSB7ICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICAgIG1ldGhvZCA9ICdsb2cnO1xuICAgICAgfVxuICAgICAgY29uc29sZVttZXRob2RdKC4uLm1lc3NhZ2UpOyAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxvZ2dlcjtcbiJdfQ==


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/no-conflict.js":
/*!********************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/no-conflict.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* global window */


exports.__esModule = true;

exports['default'] = function (Handlebars) {
  /* istanbul ignore next */
  var root = typeof global !== 'undefined' ? global : window,
      $Handlebars = root.Handlebars;
  /* istanbul ignore next */
  Handlebars.noConflict = function () {
    if (root.Handlebars === Handlebars) {
      root.Handlebars = $Handlebars;
    }
    return Handlebars;
  };
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL25vLWNvbmZsaWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O3FCQUNlLFVBQVMsVUFBVSxFQUFFOztBQUVsQyxNQUFJLElBQUksR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLEdBQUcsTUFBTSxHQUFHLE1BQU07TUFDdEQsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7O0FBRWxDLFlBQVUsQ0FBQyxVQUFVLEdBQUcsWUFBVztBQUNqQyxRQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO0FBQ2xDLFVBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDO0tBQy9CO0FBQ0QsV0FBTyxVQUFVLENBQUM7R0FDbkIsQ0FBQztDQUNIIiwiZmlsZSI6Im5vLWNvbmZsaWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIHdpbmRvdyAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oSGFuZGxlYmFycykge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBsZXQgcm9vdCA9IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93LFxuICAgICAgJEhhbmRsZWJhcnMgPSByb290LkhhbmRsZWJhcnM7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIEhhbmRsZWJhcnMubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChyb290LkhhbmRsZWJhcnMgPT09IEhhbmRsZWJhcnMpIHtcbiAgICAgIHJvb3QuSGFuZGxlYmFycyA9ICRIYW5kbGViYXJzO1xuICAgIH1cbiAgICByZXR1cm4gSGFuZGxlYmFycztcbiAgfTtcbn1cbiJdfQ==

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/runtime.js":
/*!****************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/runtime.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.checkRevision = checkRevision;
exports.template = template;
exports.wrapProgram = wrapProgram;
exports.resolvePartial = resolvePartial;
exports.invokePartial = invokePartial;
exports.noop = noop;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _utils = __webpack_require__(/*! ./utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");

var Utils = _interopRequireWildcard(_utils);

var _exception = __webpack_require__(/*! ./exception */ "./node_modules/handlebars/dist/cjs/handlebars/exception.js");

var _exception2 = _interopRequireDefault(_exception);

var _base = __webpack_require__(/*! ./base */ "./node_modules/handlebars/dist/cjs/handlebars/base.js");

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = _base.COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
          compilerVersions = _base.REVISION_CHANGES[compilerRevision];
      throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
    }
  }
}

function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new _exception2['default']('No environment passed to template');
  }
  if (!templateSpec || !templateSpec.main) {
    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
  }

  templateSpec.main.decorator = templateSpec.main_d;

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  function invokePartialWrapper(partial, context, options) {
    if (options.hash) {
      context = Utils.extend({}, context, options.hash);
      if (options.ids) {
        options.ids[0] = true;
      }
    }

    partial = env.VM.resolvePartial.call(this, partial, context, options);
    var result = env.VM.invokePartial.call(this, partial, context, options);

    if (result == null && env.compile) {
      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
      result = options.partials[options.name](context, options);
    }
    if (result != null) {
      if (options.indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = options.indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
    }
  }

  // Just add water
  var container = {
    strict: function strict(obj, name) {
      if (!(name in obj)) {
        throw new _exception2['default']('"' + name + '" not defined in ' + obj);
      }
      return obj[name];
    },
    lookup: function lookup(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        if (depths[i] && depths[i][name] != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function lambda(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function fn(i) {
      var ret = templateSpec[i];
      ret.decorator = templateSpec[i + '_d'];
      return ret;
    },

    programs: [],
    program: function program(i, data, declaredBlockParams, blockParams, depths) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths || blockParams || declaredBlockParams) {
        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
      }
      return programWrapper;
    },

    data: function data(value, depth) {
      while (value && depth--) {
        value = value._parent;
      }
      return value;
    },
    merge: function merge(param, common) {
      var obj = param || common;

      if (param && common && param !== common) {
        obj = Utils.extend({}, common, param);
      }

      return obj;
    },
    // An empty object to use as replacement for null-contexts
    nullContext: Object.seal({}),

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  function ret(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths = undefined,
        blockParams = templateSpec.useBlockParams ? [] : undefined;
    if (templateSpec.useDepths) {
      if (options.depths) {
        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
      } else {
        depths = [context];
      }
    }

    function main(context /*, options*/) {
      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
    }
    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
    return main(context, options);
  }
  ret.isTop = true;

  ret._setup = function (options) {
    if (!options.partial) {
      container.helpers = container.merge(options.helpers, env.helpers);

      if (templateSpec.usePartial) {
        container.partials = container.merge(options.partials, env.partials);
      }
      if (templateSpec.usePartial || templateSpec.useDecorators) {
        container.decorators = container.merge(options.decorators, env.decorators);
      }
    } else {
      container.helpers = options.helpers;
      container.partials = options.partials;
      container.decorators = options.decorators;
    }
  };

  ret._child = function (i, data, blockParams, depths) {
    if (templateSpec.useBlockParams && !blockParams) {
      throw new _exception2['default']('must pass block params');
    }
    if (templateSpec.useDepths && !depths) {
      throw new _exception2['default']('must pass parent depths');
    }

    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
  };
  return ret;
}

function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
  function prog(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var currentDepths = depths;
    if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
      currentDepths = [context].concat(depths);
    }

    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
  }

  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  prog.blockParams = declaredBlockParams || 0;
  return prog;
}

function resolvePartial(partial, context, options) {
  if (!partial) {
    if (options.name === '@partial-block') {
      partial = options.data['partial-block'];
    } else {
      partial = options.partials[options.name];
    }
  } else if (!partial.call && !options.name) {
    // This is a dynamic partial that returned a string
    options.name = partial;
    partial = options.partials[partial];
  }
  return partial;
}

function invokePartial(partial, context, options) {
  // Use the current closure context to save the partial-block if this partial
  var currentPartialBlock = options.data && options.data['partial-block'];
  options.partial = true;
  if (options.ids) {
    options.data.contextPath = options.ids[0] || options.data.contextPath;
  }

  var partialBlock = undefined;
  if (options.fn && options.fn !== noop) {
    (function () {
      options.data = _base.createFrame(options.data);
      // Wrapper function to get access to currentPartialBlock from the closure
      var fn = options.fn;
      partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        // Restore the partial-block from the closure for the execution of the block
        // i.e. the part inside the block of the partial call.
        options.data = _base.createFrame(options.data);
        options.data['partial-block'] = currentPartialBlock;
        return fn(context, options);
      };
      if (fn.partials) {
        options.partials = Utils.extend({}, options.partials, fn.partials);
      }
    })();
  }

  if (partial === undefined && partialBlock) {
    partial = partialBlock;
  }

  if (partial === undefined) {
    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
  } else if (partial instanceof Function) {
    return partial(context, options);
  }
}

function noop() {
  return '';
}

function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? _base.createFrame(data) : {};
    data.root = context;
  }
  return data;
}

function executeDecorators(fn, prog, container, depths, data, blockParams) {
  if (fn.decorator) {
    var props = {};
    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
    Utils.extend(prog, props);
  }
  return prog;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3J1bnRpbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBQXVCLFNBQVM7O0lBQXBCLEtBQUs7O3lCQUNLLGFBQWE7Ozs7b0JBQzhCLFFBQVE7O0FBRWxFLFNBQVMsYUFBYSxDQUFDLFlBQVksRUFBRTtBQUMxQyxNQUFNLGdCQUFnQixHQUFHLFlBQVksSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztNQUN2RCxlQUFlLDBCQUFvQixDQUFDOztBQUUxQyxNQUFJLGdCQUFnQixLQUFLLGVBQWUsRUFBRTtBQUN4QyxRQUFJLGdCQUFnQixHQUFHLGVBQWUsRUFBRTtBQUN0QyxVQUFNLGVBQWUsR0FBRyx1QkFBaUIsZUFBZSxDQUFDO1VBQ25ELGdCQUFnQixHQUFHLHVCQUFpQixnQkFBZ0IsQ0FBQyxDQUFDO0FBQzVELFlBQU0sMkJBQWMseUZBQXlGLEdBQ3ZHLHFEQUFxRCxHQUFHLGVBQWUsR0FBRyxtREFBbUQsR0FBRyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUNoSyxNQUFNOztBQUVMLFlBQU0sMkJBQWMsd0ZBQXdGLEdBQ3RHLGlEQUFpRCxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUNuRjtHQUNGO0NBQ0Y7O0FBRU0sU0FBUyxRQUFRLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTs7QUFFMUMsTUFBSSxDQUFDLEdBQUcsRUFBRTtBQUNSLFVBQU0sMkJBQWMsbUNBQW1DLENBQUMsQ0FBQztHQUMxRDtBQUNELE1BQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFO0FBQ3ZDLFVBQU0sMkJBQWMsMkJBQTJCLEdBQUcsT0FBTyxZQUFZLENBQUMsQ0FBQztHQUN4RTs7QUFFRCxjQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDOzs7O0FBSWxELEtBQUcsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFNUMsV0FBUyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRTtBQUN2RCxRQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7QUFDaEIsYUFBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEQsVUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQ2YsZUFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7T0FDdkI7S0FDRjs7QUFFRCxXQUFPLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3RFLFFBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFFeEUsUUFBSSxNQUFNLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7QUFDakMsYUFBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN6RixZQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzNEO0FBQ0QsUUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO0FBQ2xCLFVBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtBQUNsQixZQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQy9CLGFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDNUMsY0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUM1QixrQkFBTTtXQUNQOztBQUVELGVBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QztBQUNELGNBQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO09BQzNCO0FBQ0QsYUFBTyxNQUFNLENBQUM7S0FDZixNQUFNO0FBQ0wsWUFBTSwyQkFBYyxjQUFjLEdBQUcsT0FBTyxDQUFDLElBQUksR0FBRywwREFBMEQsQ0FBQyxDQUFDO0tBQ2pIO0dBQ0Y7OztBQUdELE1BQUksU0FBUyxHQUFHO0FBQ2QsVUFBTSxFQUFFLGdCQUFTLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDMUIsVUFBSSxFQUFFLElBQUksSUFBSSxHQUFHLENBQUEsQUFBQyxFQUFFO0FBQ2xCLGNBQU0sMkJBQWMsR0FBRyxHQUFHLElBQUksR0FBRyxtQkFBbUIsR0FBRyxHQUFHLENBQUMsQ0FBQztPQUM3RDtBQUNELGFBQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2xCO0FBQ0QsVUFBTSxFQUFFLGdCQUFTLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDN0IsVUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUMxQixXQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzVCLFlBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7QUFDeEMsaUJBQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hCO09BQ0Y7S0FDRjtBQUNELFVBQU0sRUFBRSxnQkFBUyxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ2pDLGFBQU8sT0FBTyxPQUFPLEtBQUssVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDO0tBQ3hFOztBQUVELG9CQUFnQixFQUFFLEtBQUssQ0FBQyxnQkFBZ0I7QUFDeEMsaUJBQWEsRUFBRSxvQkFBb0I7O0FBRW5DLE1BQUUsRUFBRSxZQUFTLENBQUMsRUFBRTtBQUNkLFVBQUksR0FBRyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQixTQUFHLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDdkMsYUFBTyxHQUFHLENBQUM7S0FDWjs7QUFFRCxZQUFRLEVBQUUsRUFBRTtBQUNaLFdBQU8sRUFBRSxpQkFBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUU7QUFDbkUsVUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7VUFDakMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEIsVUFBSSxJQUFJLElBQUksTUFBTSxJQUFJLFdBQVcsSUFBSSxtQkFBbUIsRUFBRTtBQUN4RCxzQkFBYyxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO09BQzNGLE1BQU0sSUFBSSxDQUFDLGNBQWMsRUFBRTtBQUMxQixzQkFBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7T0FDOUQ7QUFDRCxhQUFPLGNBQWMsQ0FBQztLQUN2Qjs7QUFFRCxRQUFJLEVBQUUsY0FBUyxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQzNCLGFBQU8sS0FBSyxJQUFJLEtBQUssRUFBRSxFQUFFO0FBQ3ZCLGFBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO09BQ3ZCO0FBQ0QsYUFBTyxLQUFLLENBQUM7S0FDZDtBQUNELFNBQUssRUFBRSxlQUFTLEtBQUssRUFBRSxNQUFNLEVBQUU7QUFDN0IsVUFBSSxHQUFHLEdBQUcsS0FBSyxJQUFJLE1BQU0sQ0FBQzs7QUFFMUIsVUFBSSxLQUFLLElBQUksTUFBTSxJQUFLLEtBQUssS0FBSyxNQUFNLEFBQUMsRUFBRTtBQUN6QyxXQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO09BQ3ZDOztBQUVELGFBQU8sR0FBRyxDQUFDO0tBQ1o7O0FBRUQsZUFBVyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDOztBQUU1QixRQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJO0FBQ2pCLGdCQUFZLEVBQUUsWUFBWSxDQUFDLFFBQVE7R0FDcEMsQ0FBQzs7QUFFRixXQUFTLEdBQUcsQ0FBQyxPQUFPLEVBQWdCO1FBQWQsT0FBTyx5REFBRyxFQUFFOztBQUNoQyxRQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDOztBQUV4QixPQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3BCLFFBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLFlBQVksQ0FBQyxPQUFPLEVBQUU7QUFDNUMsVUFBSSxHQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDaEM7QUFDRCxRQUFJLE1BQU0sWUFBQTtRQUNOLFdBQVcsR0FBRyxZQUFZLENBQUMsY0FBYyxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUM7QUFDL0QsUUFBSSxZQUFZLENBQUMsU0FBUyxFQUFFO0FBQzFCLFVBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtBQUNsQixjQUFNLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7T0FDM0YsTUFBTTtBQUNMLGNBQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO09BQ3BCO0tBQ0Y7O0FBRUQsYUFBUyxJQUFJLENBQUMsT0FBTyxnQkFBZTtBQUNsQyxhQUFPLEVBQUUsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDckg7QUFDRCxRQUFJLEdBQUcsaUJBQWlCLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztBQUN0RyxXQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7R0FDL0I7QUFDRCxLQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzs7QUFFakIsS0FBRyxDQUFDLE1BQU0sR0FBRyxVQUFTLE9BQU8sRUFBRTtBQUM3QixRQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtBQUNwQixlQUFTLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRWxFLFVBQUksWUFBWSxDQUFDLFVBQVUsRUFBRTtBQUMzQixpQkFBUyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO09BQ3RFO0FBQ0QsVUFBSSxZQUFZLENBQUMsVUFBVSxJQUFJLFlBQVksQ0FBQyxhQUFhLEVBQUU7QUFDekQsaUJBQVMsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztPQUM1RTtLQUNGLE1BQU07QUFDTCxlQUFTLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7QUFDcEMsZUFBUyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO0FBQ3RDLGVBQVMsQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztLQUMzQztHQUNGLENBQUM7O0FBRUYsS0FBRyxDQUFDLE1BQU0sR0FBRyxVQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRTtBQUNsRCxRQUFJLFlBQVksQ0FBQyxjQUFjLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDL0MsWUFBTSwyQkFBYyx3QkFBd0IsQ0FBQyxDQUFDO0tBQy9DO0FBQ0QsUUFBSSxZQUFZLENBQUMsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ3JDLFlBQU0sMkJBQWMseUJBQXlCLENBQUMsQ0FBQztLQUNoRDs7QUFFRCxXQUFPLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztHQUNqRixDQUFDO0FBQ0YsU0FBTyxHQUFHLENBQUM7Q0FDWjs7QUFFTSxTQUFTLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRTtBQUM1RixXQUFTLElBQUksQ0FBQyxPQUFPLEVBQWdCO1FBQWQsT0FBTyx5REFBRyxFQUFFOztBQUNqQyxRQUFJLGFBQWEsR0FBRyxNQUFNLENBQUM7QUFDM0IsUUFBSSxNQUFNLElBQUksT0FBTyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sS0FBSyxTQUFTLENBQUMsV0FBVyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUEsQUFBQyxFQUFFO0FBQ2hHLG1CQUFhLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDMUM7O0FBRUQsV0FBTyxFQUFFLENBQUMsU0FBUyxFQUNmLE9BQU8sRUFDUCxTQUFTLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQ3JDLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxFQUNwQixXQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUN4RCxhQUFhLENBQUMsQ0FBQztHQUNwQjs7QUFFRCxNQUFJLEdBQUcsaUJBQWlCLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQzs7QUFFekUsTUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDakIsTUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDeEMsTUFBSSxDQUFDLFdBQVcsR0FBRyxtQkFBbUIsSUFBSSxDQUFDLENBQUM7QUFDNUMsU0FBTyxJQUFJLENBQUM7Q0FDYjs7QUFFTSxTQUFTLGNBQWMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRTtBQUN4RCxNQUFJLENBQUMsT0FBTyxFQUFFO0FBQ1osUUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLGdCQUFnQixFQUFFO0FBQ3JDLGFBQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ3pDLE1BQU07QUFDTCxhQUFPLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDMUM7R0FDRixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTs7QUFFekMsV0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7QUFDdkIsV0FBTyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7R0FDckM7QUFDRCxTQUFPLE9BQU8sQ0FBQztDQUNoQjs7QUFFTSxTQUFTLGFBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRTs7QUFFdkQsTUFBTSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDMUUsU0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDdkIsTUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQ2YsV0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztHQUN2RTs7QUFFRCxNQUFJLFlBQVksWUFBQSxDQUFDO0FBQ2pCLE1BQUksT0FBTyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsRUFBRSxLQUFLLElBQUksRUFBRTs7QUFDckMsYUFBTyxDQUFDLElBQUksR0FBRyxrQkFBWSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRXpDLFVBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUM7QUFDcEIsa0JBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLFNBQVMsbUJBQW1CLENBQUMsT0FBTyxFQUFnQjtZQUFkLE9BQU8seURBQUcsRUFBRTs7OztBQUkvRixlQUFPLENBQUMsSUFBSSxHQUFHLGtCQUFZLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QyxlQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLG1CQUFtQixDQUFDO0FBQ3BELGVBQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztPQUM3QixDQUFDO0FBQ0YsVUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0FBQ2YsZUFBTyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztPQUNwRTs7R0FDRjs7QUFFRCxNQUFJLE9BQU8sS0FBSyxTQUFTLElBQUksWUFBWSxFQUFFO0FBQ3pDLFdBQU8sR0FBRyxZQUFZLENBQUM7R0FDeEI7O0FBRUQsTUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO0FBQ3pCLFVBQU0sMkJBQWMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcscUJBQXFCLENBQUMsQ0FBQztHQUM1RSxNQUFNLElBQUksT0FBTyxZQUFZLFFBQVEsRUFBRTtBQUN0QyxXQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7R0FDbEM7Q0FDRjs7QUFFTSxTQUFTLElBQUksR0FBRztBQUFFLFNBQU8sRUFBRSxDQUFDO0NBQUU7O0FBRXJDLFNBQVMsUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7QUFDL0IsTUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLE1BQU0sSUFBSSxJQUFJLENBQUEsQUFBQyxFQUFFO0FBQzlCLFFBQUksR0FBRyxJQUFJLEdBQUcsa0JBQVksSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3JDLFFBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO0dBQ3JCO0FBQ0QsU0FBTyxJQUFJLENBQUM7Q0FDYjs7QUFFRCxTQUFTLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO0FBQ3pFLE1BQUksRUFBRSxDQUFDLFNBQVMsRUFBRTtBQUNoQixRQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDZixRQUFJLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDNUYsU0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7R0FDM0I7QUFDRCxTQUFPLElBQUksQ0FBQztDQUNiIiwiZmlsZSI6InJ1bnRpbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi9leGNlcHRpb24nO1xuaW1wb3J0IHsgQ09NUElMRVJfUkVWSVNJT04sIFJFVklTSU9OX0NIQU5HRVMsIGNyZWF0ZUZyYW1lIH0gZnJvbSAnLi9iYXNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrUmV2aXNpb24oY29tcGlsZXJJbmZvKSB7XG4gIGNvbnN0IGNvbXBpbGVyUmV2aXNpb24gPSBjb21waWxlckluZm8gJiYgY29tcGlsZXJJbmZvWzBdIHx8IDEsXG4gICAgICAgIGN1cnJlbnRSZXZpc2lvbiA9IENPTVBJTEVSX1JFVklTSU9OO1xuXG4gIGlmIChjb21waWxlclJldmlzaW9uICE9PSBjdXJyZW50UmV2aXNpb24pIHtcbiAgICBpZiAoY29tcGlsZXJSZXZpc2lvbiA8IGN1cnJlbnRSZXZpc2lvbikge1xuICAgICAgY29uc3QgcnVudGltZVZlcnNpb25zID0gUkVWSVNJT05fQ0hBTkdFU1tjdXJyZW50UmV2aXNpb25dLFxuICAgICAgICAgICAgY29tcGlsZXJWZXJzaW9ucyA9IFJFVklTSU9OX0NIQU5HRVNbY29tcGlsZXJSZXZpc2lvbl07XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUZW1wbGF0ZSB3YXMgcHJlY29tcGlsZWQgd2l0aCBhbiBvbGRlciB2ZXJzaW9uIG9mIEhhbmRsZWJhcnMgdGhhbiB0aGUgY3VycmVudCBydW50aW1lLiAnICtcbiAgICAgICAgICAgICdQbGVhc2UgdXBkYXRlIHlvdXIgcHJlY29tcGlsZXIgdG8gYSBuZXdlciB2ZXJzaW9uICgnICsgcnVudGltZVZlcnNpb25zICsgJykgb3IgZG93bmdyYWRlIHlvdXIgcnVudGltZSB0byBhbiBvbGRlciB2ZXJzaW9uICgnICsgY29tcGlsZXJWZXJzaW9ucyArICcpLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBVc2UgdGhlIGVtYmVkZGVkIHZlcnNpb24gaW5mbyBzaW5jZSB0aGUgcnVudGltZSBkb2Vzbid0IGtub3cgYWJvdXQgdGhpcyByZXZpc2lvbiB5ZXRcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1RlbXBsYXRlIHdhcyBwcmVjb21waWxlZCB3aXRoIGEgbmV3ZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gJyArXG4gICAgICAgICAgICAnUGxlYXNlIHVwZGF0ZSB5b3VyIHJ1bnRpbWUgdG8gYSBuZXdlciB2ZXJzaW9uICgnICsgY29tcGlsZXJJbmZvWzFdICsgJykuJyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZW1wbGF0ZSh0ZW1wbGF0ZVNwZWMsIGVudikge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAoIWVudikge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ05vIGVudmlyb25tZW50IHBhc3NlZCB0byB0ZW1wbGF0ZScpO1xuICB9XG4gIGlmICghdGVtcGxhdGVTcGVjIHx8ICF0ZW1wbGF0ZVNwZWMubWFpbikge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1Vua25vd24gdGVtcGxhdGUgb2JqZWN0OiAnICsgdHlwZW9mIHRlbXBsYXRlU3BlYyk7XG4gIH1cblxuICB0ZW1wbGF0ZVNwZWMubWFpbi5kZWNvcmF0b3IgPSB0ZW1wbGF0ZVNwZWMubWFpbl9kO1xuXG4gIC8vIE5vdGU6IFVzaW5nIGVudi5WTSByZWZlcmVuY2VzIHJhdGhlciB0aGFuIGxvY2FsIHZhciByZWZlcmVuY2VzIHRocm91Z2hvdXQgdGhpcyBzZWN0aW9uIHRvIGFsbG93XG4gIC8vIGZvciBleHRlcm5hbCB1c2VycyB0byBvdmVycmlkZSB0aGVzZSBhcyBwc3VlZG8tc3VwcG9ydGVkIEFQSXMuXG4gIGVudi5WTS5jaGVja1JldmlzaW9uKHRlbXBsYXRlU3BlYy5jb21waWxlcik7XG5cbiAgZnVuY3Rpb24gaW52b2tlUGFydGlhbFdyYXBwZXIocGFydGlhbCwgY29udGV4dCwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICAgIGNvbnRleHQgPSBVdGlscy5leHRlbmQoe30sIGNvbnRleHQsIG9wdGlvbnMuaGFzaCk7XG4gICAgICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICAgICAgb3B0aW9ucy5pZHNbMF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHBhcnRpYWwgPSBlbnYuVk0ucmVzb2x2ZVBhcnRpYWwuY2FsbCh0aGlzLCBwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKTtcbiAgICBsZXQgcmVzdWx0ID0gZW52LlZNLmludm9rZVBhcnRpYWwuY2FsbCh0aGlzLCBwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKTtcblxuICAgIGlmIChyZXN1bHQgPT0gbnVsbCAmJiBlbnYuY29tcGlsZSkge1xuICAgICAgb3B0aW9ucy5wYXJ0aWFsc1tvcHRpb25zLm5hbWVdID0gZW52LmNvbXBpbGUocGFydGlhbCwgdGVtcGxhdGVTcGVjLmNvbXBpbGVyT3B0aW9ucywgZW52KTtcbiAgICAgIHJlc3VsdCA9IG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXShjb250ZXh0LCBvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICBpZiAob3B0aW9ucy5pbmRlbnQpIHtcbiAgICAgICAgbGV0IGxpbmVzID0gcmVzdWx0LnNwbGl0KCdcXG4nKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBsaW5lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICBpZiAoIWxpbmVzW2ldICYmIGkgKyAxID09PSBsKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaW5lc1tpXSA9IG9wdGlvbnMuaW5kZW50ICsgbGluZXNbaV07XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ID0gbGluZXMuam9pbignXFxuJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUaGUgcGFydGlhbCAnICsgb3B0aW9ucy5uYW1lICsgJyBjb3VsZCBub3QgYmUgY29tcGlsZWQgd2hlbiBydW5uaW5nIGluIHJ1bnRpbWUtb25seSBtb2RlJyk7XG4gICAgfVxuICB9XG5cbiAgLy8gSnVzdCBhZGQgd2F0ZXJcbiAgbGV0IGNvbnRhaW5lciA9IHtcbiAgICBzdHJpY3Q6IGZ1bmN0aW9uKG9iaiwgbmFtZSkge1xuICAgICAgaWYgKCEobmFtZSBpbiBvYmopKSB7XG4gICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1wiJyArIG5hbWUgKyAnXCIgbm90IGRlZmluZWQgaW4gJyArIG9iaik7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqW25hbWVdO1xuICAgIH0sXG4gICAgbG9va3VwOiBmdW5jdGlvbihkZXB0aHMsIG5hbWUpIHtcbiAgICAgIGNvbnN0IGxlbiA9IGRlcHRocy5sZW5ndGg7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChkZXB0aHNbaV0gJiYgZGVwdGhzW2ldW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gZGVwdGhzW2ldW25hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBsYW1iZGE6IGZ1bmN0aW9uKGN1cnJlbnQsIGNvbnRleHQpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgY3VycmVudCA9PT0gJ2Z1bmN0aW9uJyA/IGN1cnJlbnQuY2FsbChjb250ZXh0KSA6IGN1cnJlbnQ7XG4gICAgfSxcblxuICAgIGVzY2FwZUV4cHJlc3Npb246IFV0aWxzLmVzY2FwZUV4cHJlc3Npb24sXG4gICAgaW52b2tlUGFydGlhbDogaW52b2tlUGFydGlhbFdyYXBwZXIsXG5cbiAgICBmbjogZnVuY3Rpb24oaSkge1xuICAgICAgbGV0IHJldCA9IHRlbXBsYXRlU3BlY1tpXTtcbiAgICAgIHJldC5kZWNvcmF0b3IgPSB0ZW1wbGF0ZVNwZWNbaSArICdfZCddO1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9LFxuXG4gICAgcHJvZ3JhbXM6IFtdLFxuICAgIHByb2dyYW06IGZ1bmN0aW9uKGksIGRhdGEsIGRlY2xhcmVkQmxvY2tQYXJhbXMsIGJsb2NrUGFyYW1zLCBkZXB0aHMpIHtcbiAgICAgIGxldCBwcm9ncmFtV3JhcHBlciA9IHRoaXMucHJvZ3JhbXNbaV0sXG4gICAgICAgICAgZm4gPSB0aGlzLmZuKGkpO1xuICAgICAgaWYgKGRhdGEgfHwgZGVwdGhzIHx8IGJsb2NrUGFyYW1zIHx8IGRlY2xhcmVkQmxvY2tQYXJhbXMpIHtcbiAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSB3cmFwUHJvZ3JhbSh0aGlzLCBpLCBmbiwgZGF0YSwgZGVjbGFyZWRCbG9ja1BhcmFtcywgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gICAgICB9IGVsc2UgaWYgKCFwcm9ncmFtV3JhcHBlcikge1xuICAgICAgICBwcm9ncmFtV3JhcHBlciA9IHRoaXMucHJvZ3JhbXNbaV0gPSB3cmFwUHJvZ3JhbSh0aGlzLCBpLCBmbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJvZ3JhbVdyYXBwZXI7XG4gICAgfSxcblxuICAgIGRhdGE6IGZ1bmN0aW9uKHZhbHVlLCBkZXB0aCkge1xuICAgICAgd2hpbGUgKHZhbHVlICYmIGRlcHRoLS0pIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5fcGFyZW50O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgbWVyZ2U6IGZ1bmN0aW9uKHBhcmFtLCBjb21tb24pIHtcbiAgICAgIGxldCBvYmogPSBwYXJhbSB8fCBjb21tb247XG5cbiAgICAgIGlmIChwYXJhbSAmJiBjb21tb24gJiYgKHBhcmFtICE9PSBjb21tb24pKSB7XG4gICAgICAgIG9iaiA9IFV0aWxzLmV4dGVuZCh7fSwgY29tbW9uLCBwYXJhbSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvYmo7XG4gICAgfSxcbiAgICAvLyBBbiBlbXB0eSBvYmplY3QgdG8gdXNlIGFzIHJlcGxhY2VtZW50IGZvciBudWxsLWNvbnRleHRzXG4gICAgbnVsbENvbnRleHQ6IE9iamVjdC5zZWFsKHt9KSxcblxuICAgIG5vb3A6IGVudi5WTS5ub29wLFxuICAgIGNvbXBpbGVySW5mbzogdGVtcGxhdGVTcGVjLmNvbXBpbGVyXG4gIH07XG5cbiAgZnVuY3Rpb24gcmV0KGNvbnRleHQsIG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCBkYXRhID0gb3B0aW9ucy5kYXRhO1xuXG4gICAgcmV0Ll9zZXR1cChvcHRpb25zKTtcbiAgICBpZiAoIW9wdGlvbnMucGFydGlhbCAmJiB0ZW1wbGF0ZVNwZWMudXNlRGF0YSkge1xuICAgICAgZGF0YSA9IGluaXREYXRhKGNvbnRleHQsIGRhdGEpO1xuICAgIH1cbiAgICBsZXQgZGVwdGhzLFxuICAgICAgICBibG9ja1BhcmFtcyA9IHRlbXBsYXRlU3BlYy51c2VCbG9ja1BhcmFtcyA/IFtdIDogdW5kZWZpbmVkO1xuICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlRGVwdGhzKSB7XG4gICAgICBpZiAob3B0aW9ucy5kZXB0aHMpIHtcbiAgICAgICAgZGVwdGhzID0gY29udGV4dCAhPSBvcHRpb25zLmRlcHRoc1swXSA/IFtjb250ZXh0XS5jb25jYXQob3B0aW9ucy5kZXB0aHMpIDogb3B0aW9ucy5kZXB0aHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZXB0aHMgPSBbY29udGV4dF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFpbihjb250ZXh0LyosIG9wdGlvbnMqLykge1xuICAgICAgcmV0dXJuICcnICsgdGVtcGxhdGVTcGVjLm1haW4oY29udGFpbmVyLCBjb250ZXh0LCBjb250YWluZXIuaGVscGVycywgY29udGFpbmVyLnBhcnRpYWxzLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgICB9XG4gICAgbWFpbiA9IGV4ZWN1dGVEZWNvcmF0b3JzKHRlbXBsYXRlU3BlYy5tYWluLCBtYWluLCBjb250YWluZXIsIG9wdGlvbnMuZGVwdGhzIHx8IFtdLCBkYXRhLCBibG9ja1BhcmFtcyk7XG4gICAgcmV0dXJuIG1haW4oY29udGV4dCwgb3B0aW9ucyk7XG4gIH1cbiAgcmV0LmlzVG9wID0gdHJ1ZTtcblxuICByZXQuX3NldHVwID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucy5wYXJ0aWFsKSB7XG4gICAgICBjb250YWluZXIuaGVscGVycyA9IGNvbnRhaW5lci5tZXJnZShvcHRpb25zLmhlbHBlcnMsIGVudi5oZWxwZXJzKTtcblxuICAgICAgaWYgKHRlbXBsYXRlU3BlYy51c2VQYXJ0aWFsKSB7XG4gICAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IGNvbnRhaW5lci5tZXJnZShvcHRpb25zLnBhcnRpYWxzLCBlbnYucGFydGlhbHMpO1xuICAgICAgfVxuICAgICAgaWYgKHRlbXBsYXRlU3BlYy51c2VQYXJ0aWFsIHx8IHRlbXBsYXRlU3BlYy51c2VEZWNvcmF0b3JzKSB7XG4gICAgICAgIGNvbnRhaW5lci5kZWNvcmF0b3JzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMuZGVjb3JhdG9ycywgZW52LmRlY29yYXRvcnMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb250YWluZXIuaGVscGVycyA9IG9wdGlvbnMuaGVscGVycztcbiAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IG9wdGlvbnMucGFydGlhbHM7XG4gICAgICBjb250YWluZXIuZGVjb3JhdG9ycyA9IG9wdGlvbnMuZGVjb3JhdG9ycztcbiAgICB9XG4gIH07XG5cbiAgcmV0Ll9jaGlsZCA9IGZ1bmN0aW9uKGksIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpIHtcbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZUJsb2NrUGFyYW1zICYmICFibG9ja1BhcmFtcykge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignbXVzdCBwYXNzIGJsb2NrIHBhcmFtcycpO1xuICAgIH1cbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZURlcHRocyAmJiAhZGVwdGhzKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdtdXN0IHBhc3MgcGFyZW50IGRlcHRocycpO1xuICAgIH1cblxuICAgIHJldHVybiB3cmFwUHJvZ3JhbShjb250YWluZXIsIGksIHRlbXBsYXRlU3BlY1tpXSwgZGF0YSwgMCwgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gIH07XG4gIHJldHVybiByZXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3cmFwUHJvZ3JhbShjb250YWluZXIsIGksIGZuLCBkYXRhLCBkZWNsYXJlZEJsb2NrUGFyYW1zLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG4gIGZ1bmN0aW9uIHByb2coY29udGV4dCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IGN1cnJlbnREZXB0aHMgPSBkZXB0aHM7XG4gICAgaWYgKGRlcHRocyAmJiBjb250ZXh0ICE9IGRlcHRoc1swXSAmJiAhKGNvbnRleHQgPT09IGNvbnRhaW5lci5udWxsQ29udGV4dCAmJiBkZXB0aHNbMF0gPT09IG51bGwpKSB7XG4gICAgICBjdXJyZW50RGVwdGhzID0gW2NvbnRleHRdLmNvbmNhdChkZXB0aHMpO1xuICAgIH1cblxuICAgIHJldHVybiBmbihjb250YWluZXIsXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGNvbnRhaW5lci5oZWxwZXJzLCBjb250YWluZXIucGFydGlhbHMsXG4gICAgICAgIG9wdGlvbnMuZGF0YSB8fCBkYXRhLFxuICAgICAgICBibG9ja1BhcmFtcyAmJiBbb3B0aW9ucy5ibG9ja1BhcmFtc10uY29uY2F0KGJsb2NrUGFyYW1zKSxcbiAgICAgICAgY3VycmVudERlcHRocyk7XG4gIH1cblxuICBwcm9nID0gZXhlY3V0ZURlY29yYXRvcnMoZm4sIHByb2csIGNvbnRhaW5lciwgZGVwdGhzLCBkYXRhLCBibG9ja1BhcmFtcyk7XG5cbiAgcHJvZy5wcm9ncmFtID0gaTtcbiAgcHJvZy5kZXB0aCA9IGRlcHRocyA/IGRlcHRocy5sZW5ndGggOiAwO1xuICBwcm9nLmJsb2NrUGFyYW1zID0gZGVjbGFyZWRCbG9ja1BhcmFtcyB8fCAwO1xuICByZXR1cm4gcHJvZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVQYXJ0aWFsKHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgaWYgKCFwYXJ0aWFsKSB7XG4gICAgaWYgKG9wdGlvbnMubmFtZSA9PT0gJ0BwYXJ0aWFsLWJsb2NrJykge1xuICAgICAgcGFydGlhbCA9IG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWFsID0gb3B0aW9ucy5wYXJ0aWFsc1tvcHRpb25zLm5hbWVdO1xuICAgIH1cbiAgfSBlbHNlIGlmICghcGFydGlhbC5jYWxsICYmICFvcHRpb25zLm5hbWUpIHtcbiAgICAvLyBUaGlzIGlzIGEgZHluYW1pYyBwYXJ0aWFsIHRoYXQgcmV0dXJuZWQgYSBzdHJpbmdcbiAgICBvcHRpb25zLm5hbWUgPSBwYXJ0aWFsO1xuICAgIHBhcnRpYWwgPSBvcHRpb25zLnBhcnRpYWxzW3BhcnRpYWxdO1xuICB9XG4gIHJldHVybiBwYXJ0aWFsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW52b2tlUGFydGlhbChwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKSB7XG4gIC8vIFVzZSB0aGUgY3VycmVudCBjbG9zdXJlIGNvbnRleHQgdG8gc2F2ZSB0aGUgcGFydGlhbC1ibG9jayBpZiB0aGlzIHBhcnRpYWxcbiAgY29uc3QgY3VycmVudFBhcnRpYWxCbG9jayA9IG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXTtcbiAgb3B0aW9ucy5wYXJ0aWFsID0gdHJ1ZTtcbiAgaWYgKG9wdGlvbnMuaWRzKSB7XG4gICAgb3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoID0gb3B0aW9ucy5pZHNbMF0gfHwgb3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoO1xuICB9XG5cbiAgbGV0IHBhcnRpYWxCbG9jaztcbiAgaWYgKG9wdGlvbnMuZm4gJiYgb3B0aW9ucy5mbiAhPT0gbm9vcCkge1xuICAgIG9wdGlvbnMuZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgLy8gV3JhcHBlciBmdW5jdGlvbiB0byBnZXQgYWNjZXNzIHRvIGN1cnJlbnRQYXJ0aWFsQmxvY2sgZnJvbSB0aGUgY2xvc3VyZVxuICAgIGxldCBmbiA9IG9wdGlvbnMuZm47XG4gICAgcGFydGlhbEJsb2NrID0gb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ10gPSBmdW5jdGlvbiBwYXJ0aWFsQmxvY2tXcmFwcGVyKGNvbnRleHQsIG9wdGlvbnMgPSB7fSkge1xuXG4gICAgICAvLyBSZXN0b3JlIHRoZSBwYXJ0aWFsLWJsb2NrIGZyb20gdGhlIGNsb3N1cmUgZm9yIHRoZSBleGVjdXRpb24gb2YgdGhlIGJsb2NrXG4gICAgICAvLyBpLmUuIHRoZSBwYXJ0IGluc2lkZSB0aGUgYmxvY2sgb2YgdGhlIHBhcnRpYWwgY2FsbC5cbiAgICAgIG9wdGlvbnMuZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgICBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXSA9IGN1cnJlbnRQYXJ0aWFsQmxvY2s7XG4gICAgICByZXR1cm4gZm4oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfTtcbiAgICBpZiAoZm4ucGFydGlhbHMpIHtcbiAgICAgIG9wdGlvbnMucGFydGlhbHMgPSBVdGlscy5leHRlbmQoe30sIG9wdGlvbnMucGFydGlhbHMsIGZuLnBhcnRpYWxzKTtcbiAgICB9XG4gIH1cblxuICBpZiAocGFydGlhbCA9PT0gdW5kZWZpbmVkICYmIHBhcnRpYWxCbG9jaykge1xuICAgIHBhcnRpYWwgPSBwYXJ0aWFsQmxvY2s7XG4gIH1cblxuICBpZiAocGFydGlhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGhlIHBhcnRpYWwgJyArIG9wdGlvbnMubmFtZSArICcgY291bGQgbm90IGJlIGZvdW5kJyk7XG4gIH0gZWxzZSBpZiAocGFydGlhbCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgcmV0dXJuIHBhcnRpYWwoY29udGV4dCwgb3B0aW9ucyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vb3AoKSB7IHJldHVybiAnJzsgfVxuXG5mdW5jdGlvbiBpbml0RGF0YShjb250ZXh0LCBkYXRhKSB7XG4gIGlmICghZGF0YSB8fCAhKCdyb290JyBpbiBkYXRhKSkge1xuICAgIGRhdGEgPSBkYXRhID8gY3JlYXRlRnJhbWUoZGF0YSkgOiB7fTtcbiAgICBkYXRhLnJvb3QgPSBjb250ZXh0O1xuICB9XG4gIHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiBleGVjdXRlRGVjb3JhdG9ycyhmbiwgcHJvZywgY29udGFpbmVyLCBkZXB0aHMsIGRhdGEsIGJsb2NrUGFyYW1zKSB7XG4gIGlmIChmbi5kZWNvcmF0b3IpIHtcbiAgICBsZXQgcHJvcHMgPSB7fTtcbiAgICBwcm9nID0gZm4uZGVjb3JhdG9yKHByb2csIHByb3BzLCBjb250YWluZXIsIGRlcHRocyAmJiBkZXB0aHNbMF0sIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICAgIFV0aWxzLmV4dGVuZChwcm9nLCBwcm9wcyk7XG4gIH1cbiAgcmV0dXJuIHByb2c7XG59XG4iXX0=


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/safe-string.js":
/*!********************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/safe-string.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Build out our basic SafeString type


exports.__esModule = true;
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
  return '' + this.string;
};

exports['default'] = SafeString;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxTQUFTLFVBQVUsQ0FBQyxNQUFNLEVBQUU7QUFDMUIsTUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Q0FDdEI7O0FBRUQsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsWUFBVztBQUN2RSxTQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0NBQ3pCLENBQUM7O3FCQUVhLFVBQVUiLCJmaWxlIjoic2FmZS1zdHJpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBCdWlsZCBvdXQgb3VyIGJhc2ljIFNhZmVTdHJpbmcgdHlwZVxuZnVuY3Rpb24gU2FmZVN0cmluZyhzdHJpbmcpIHtcbiAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG59XG5cblNhZmVTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nID0gU2FmZVN0cmluZy5wcm90b3R5cGUudG9IVE1MID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnJyArIHRoaXMuc3RyaW5nO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2FmZVN0cmluZztcbiJdfQ==


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/utils.js":
/*!**************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/utils.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.extend = extend;
exports.indexOf = indexOf;
exports.escapeExpression = escapeExpression;
exports.isEmpty = isEmpty;
exports.createFrame = createFrame;
exports.blockParams = blockParams;
exports.appendContextPath = appendContextPath;
var escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

var badChars = /[&<>"'`=]/g,
    possible = /[&<>"'`=]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

var toString = Object.prototype.toString;

exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/* eslint-disable func-style */
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  exports.isFunction = isFunction = function (value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
exports.isFunction = isFunction;

/* eslint-enable func-style */

/* istanbul ignore next */
var isArray = Array.isArray || function (value) {
  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
};

exports.isArray = isArray;
// Older IE versions do not directly support indexOf so we must implement our own, sadly.

function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

function escapeExpression(string) {
  if (typeof string !== 'string') {
    // don't escape SafeStrings, since they're already safe
    if (string && string.toHTML) {
      return string.toHTML();
    } else if (string == null) {
      return '';
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = '' + string;
  }

  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}

function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

function createFrame(object) {
  var frame = extend({}, object);
  frame._parent = object;
  return frame;
}

function blockParams(params, ids) {
  params.path = ids;
  return params;
}

function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFNLE1BQU0sR0FBRztBQUNiLEtBQUcsRUFBRSxPQUFPO0FBQ1osS0FBRyxFQUFFLE1BQU07QUFDWCxLQUFHLEVBQUUsTUFBTTtBQUNYLEtBQUcsRUFBRSxRQUFRO0FBQ2IsS0FBRyxFQUFFLFFBQVE7QUFDYixLQUFHLEVBQUUsUUFBUTtBQUNiLEtBQUcsRUFBRSxRQUFRO0NBQ2QsQ0FBQzs7QUFFRixJQUFNLFFBQVEsR0FBRyxZQUFZO0lBQ3ZCLFFBQVEsR0FBRyxXQUFXLENBQUM7O0FBRTdCLFNBQVMsVUFBVSxDQUFDLEdBQUcsRUFBRTtBQUN2QixTQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNwQjs7QUFFTSxTQUFTLE1BQU0sQ0FBQyxHQUFHLG9CQUFtQjtBQUMzQyxPQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN6QyxTQUFLLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUM1QixVQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUU7QUFDM0QsV0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztPQUM5QjtLQUNGO0dBQ0Y7O0FBRUQsU0FBTyxHQUFHLENBQUM7Q0FDWjs7QUFFTSxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQzs7Ozs7O0FBS2hELElBQUksVUFBVSxHQUFHLG9CQUFTLEtBQUssRUFBRTtBQUMvQixTQUFPLE9BQU8sS0FBSyxLQUFLLFVBQVUsQ0FBQztDQUNwQyxDQUFDOzs7QUFHRixJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNuQixVQUlNLFVBQVUsR0FKaEIsVUFBVSxHQUFHLFVBQVMsS0FBSyxFQUFFO0FBQzNCLFdBQU8sT0FBTyxLQUFLLEtBQUssVUFBVSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssbUJBQW1CLENBQUM7R0FDcEYsQ0FBQztDQUNIO1FBQ08sVUFBVSxHQUFWLFVBQVU7Ozs7O0FBSVgsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sSUFBSSxVQUFTLEtBQUssRUFBRTtBQUN0RCxTQUFPLEFBQUMsS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsR0FBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLGdCQUFnQixHQUFHLEtBQUssQ0FBQztDQUNqRyxDQUFDOzs7OztBQUdLLFNBQVMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDcEMsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNoRCxRQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUU7QUFDdEIsYUFBTyxDQUFDLENBQUM7S0FDVjtHQUNGO0FBQ0QsU0FBTyxDQUFDLENBQUMsQ0FBQztDQUNYOztBQUdNLFNBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO0FBQ3ZDLE1BQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFOztBQUU5QixRQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO0FBQzNCLGFBQU8sTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3hCLE1BQU0sSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO0FBQ3pCLGFBQU8sRUFBRSxDQUFDO0tBQ1gsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ2xCLGFBQU8sTUFBTSxHQUFHLEVBQUUsQ0FBQztLQUNwQjs7Ozs7QUFLRCxVQUFNLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQztHQUN0Qjs7QUFFRCxNQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUFFLFdBQU8sTUFBTSxDQUFDO0dBQUU7QUFDOUMsU0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztDQUM3Qzs7QUFFTSxTQUFTLE9BQU8sQ0FBQyxLQUFLLEVBQUU7QUFDN0IsTUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO0FBQ3pCLFdBQU8sSUFBSSxDQUFDO0dBQ2IsTUFBTSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUMvQyxXQUFPLElBQUksQ0FBQztHQUNiLE1BQU07QUFDTCxXQUFPLEtBQUssQ0FBQztHQUNkO0NBQ0Y7O0FBRU0sU0FBUyxXQUFXLENBQUMsTUFBTSxFQUFFO0FBQ2xDLE1BQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDL0IsT0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7QUFDdkIsU0FBTyxLQUFLLENBQUM7Q0FDZDs7QUFFTSxTQUFTLFdBQVcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO0FBQ3ZDLFFBQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBQ2xCLFNBQU8sTUFBTSxDQUFDO0NBQ2Y7O0FBRU0sU0FBUyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsRUFBRSxFQUFFO0FBQ2pELFNBQU8sQ0FBQyxXQUFXLEdBQUcsV0FBVyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUEsR0FBSSxFQUFFLENBQUM7Q0FDcEQiLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBlc2NhcGUgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgXCInXCI6ICcmI3gyNzsnLFxuICAnYCc6ICcmI3g2MDsnLFxuICAnPSc6ICcmI3gzRDsnXG59O1xuXG5jb25zdCBiYWRDaGFycyA9IC9bJjw+XCInYD1dL2csXG4gICAgICBwb3NzaWJsZSA9IC9bJjw+XCInYD1dLztcblxuZnVuY3Rpb24gZXNjYXBlQ2hhcihjaHIpIHtcbiAgcmV0dXJuIGVzY2FwZVtjaHJdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKG9iai8qICwgLi4uc291cmNlICovKSB7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQga2V5IGluIGFyZ3VtZW50c1tpXSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcmd1bWVudHNbaV0sIGtleSkpIHtcbiAgICAgICAgb2JqW2tleV0gPSBhcmd1bWVudHNbaV1ba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5leHBvcnQgbGV0IHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLy8gU291cmNlZCBmcm9tIGxvZGFzaFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jlc3RpZWpzL2xvZGFzaC9ibG9iL21hc3Rlci9MSUNFTlNFLnR4dFxuLyogZXNsaW50LWRpc2FibGUgZnVuYy1zdHlsZSAqL1xubGV0IGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufTtcbi8vIGZhbGxiYWNrIGZvciBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmlmIChpc0Z1bmN0aW9uKC94LykpIHtcbiAgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgfTtcbn1cbmV4cG9ydCB7aXNGdW5jdGlvbn07XG4vKiBlc2xpbnQtZW5hYmxlIGZ1bmMtc3R5bGUgKi9cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmV4cG9ydCBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpID8gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XScgOiBmYWxzZTtcbn07XG5cbi8vIE9sZGVyIElFIHZlcnNpb25zIGRvIG5vdCBkaXJlY3RseSBzdXBwb3J0IGluZGV4T2Ygc28gd2UgbXVzdCBpbXBsZW1lbnQgb3VyIG93biwgc2FkbHkuXG5leHBvcnQgZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgdmFsdWUpIHtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGFycmF5W2ldID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlRXhwcmVzc2lvbihzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gZG9uJ3QgZXNjYXBlIFNhZmVTdHJpbmdzLCBzaW5jZSB0aGV5J3JlIGFscmVhZHkgc2FmZVxuICAgIGlmIChzdHJpbmcgJiYgc3RyaW5nLnRvSFRNTCkge1xuICAgICAgcmV0dXJuIHN0cmluZy50b0hUTUwoKTtcbiAgICB9IGVsc2UgaWYgKHN0cmluZyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmICghc3RyaW5nKSB7XG4gICAgICByZXR1cm4gc3RyaW5nICsgJyc7XG4gICAgfVxuXG4gICAgLy8gRm9yY2UgYSBzdHJpbmcgY29udmVyc2lvbiBhcyB0aGlzIHdpbGwgYmUgZG9uZSBieSB0aGUgYXBwZW5kIHJlZ2FyZGxlc3MgYW5kXG4gICAgLy8gdGhlIHJlZ2V4IHRlc3Qgd2lsbCBkbyB0aGlzIHRyYW5zcGFyZW50bHkgYmVoaW5kIHRoZSBzY2VuZXMsIGNhdXNpbmcgaXNzdWVzIGlmXG4gICAgLy8gYW4gb2JqZWN0J3MgdG8gc3RyaW5nIGhhcyBlc2NhcGVkIGNoYXJhY3RlcnMgaW4gaXQuXG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmc7XG4gIH1cblxuICBpZiAoIXBvc3NpYmxlLnRlc3Qoc3RyaW5nKSkgeyByZXR1cm4gc3RyaW5nOyB9XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZShiYWRDaGFycywgZXNjYXBlQ2hhcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZyYW1lKG9iamVjdCkge1xuICBsZXQgZnJhbWUgPSBleHRlbmQoe30sIG9iamVjdCk7XG4gIGZyYW1lLl9wYXJlbnQgPSBvYmplY3Q7XG4gIHJldHVybiBmcmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJsb2NrUGFyYW1zKHBhcmFtcywgaWRzKSB7XG4gIHBhcmFtcy5wYXRoID0gaWRzO1xuICByZXR1cm4gcGFyYW1zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ29udGV4dFBhdGgoY29udGV4dFBhdGgsIGlkKSB7XG4gIHJldHVybiAoY29udGV4dFBhdGggPyBjb250ZXh0UGF0aCArICcuJyA6ICcnKSArIGlkO1xufVxuIl19


/***/ }),

/***/ "./node_modules/handlebars/runtime.js":
/*!********************************************!*\
  !*** ./node_modules/handlebars/runtime.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = __webpack_require__(/*! ./dist/cjs/handlebars.runtime */ "./node_modules/handlebars/dist/cjs/handlebars.runtime.js")['default'];


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


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
 * Last Modified: Sunday, September 2nd 2018, 1:21:14 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */



var Application = /** @class */ (function () {
    function Application(canvas, option) {
        this.sceneInstances = [];
        this.activeIndex = 0;
        this.canvas = canvas;
        this.rendererPlatform = new _graphics_renderer__WEBPACK_IMPORTED_MODULE_1__["RendererPlatform"](this.canvas, option);
        this.sceneInstances.push(new _scene_scene__WEBPACK_IMPORTED_MODULE_0__["Scene"](this));
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
        this.scene.render();
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
/*! exports provided: DataType, SEMANTIC, BUFFER, CURVE, UNIFORM_TYPE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataType", function() { return DataType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEMANTIC", function() { return SEMANTIC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BUFFER", function() { return BUFFER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CURVE", function() { return CURVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNIFORM_TYPE", function() { return UNIFORM_TYPE; });
/*
 * ProjectName: hypergl
 * FilePath: \src\conf.ts
 * Created Date: Tuesday, August 14th 2018, 5:02:06 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, September 1st 2018, 1:45:13 pm
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
    CURVE["LINEAR"] = "LINEAR";
    CURVE["SMOOTHSTEP"] = "SMOOTHSTEP";
    CURVE["CATMULL"] = "CATMULL";
    CURVE["CARDINAL"] = "CARDINAL";
})(CURVE || (CURVE = {}));
var UNIFORM_TYPE;
(function (UNIFORM_TYPE) {
    UNIFORM_TYPE[UNIFORM_TYPE["BOOL"] = 0] = "BOOL";
    UNIFORM_TYPE[UNIFORM_TYPE["INT"] = 1] = "INT";
    UNIFORM_TYPE[UNIFORM_TYPE["FLOAT"] = 2] = "FLOAT";
    UNIFORM_TYPE[UNIFORM_TYPE["FLOAT_VEC2"] = 3] = "FLOAT_VEC2";
    UNIFORM_TYPE[UNIFORM_TYPE["FLOAT_VEC3"] = 4] = "FLOAT_VEC3";
    UNIFORM_TYPE[UNIFORM_TYPE["FLOAT_VEC4"] = 5] = "FLOAT_VEC4";
    UNIFORM_TYPE[UNIFORM_TYPE["INT_VEC2"] = 6] = "INT_VEC2";
    UNIFORM_TYPE[UNIFORM_TYPE["INT_VEC3"] = 7] = "INT_VEC3";
    UNIFORM_TYPE[UNIFORM_TYPE["INT_VEC4"] = 8] = "INT_VEC4";
    UNIFORM_TYPE[UNIFORM_TYPE["BOOL_VEC2"] = 9] = "BOOL_VEC2";
    UNIFORM_TYPE[UNIFORM_TYPE["BOOL_VEC3"] = 10] = "BOOL_VEC3";
    UNIFORM_TYPE[UNIFORM_TYPE["BOOL_VEC4"] = 11] = "BOOL_VEC4";
    UNIFORM_TYPE[UNIFORM_TYPE["FLOAT_MAT2"] = 12] = "FLOAT_MAT2";
    UNIFORM_TYPE[UNIFORM_TYPE["FLOAT_MAT3"] = 13] = "FLOAT_MAT3";
    UNIFORM_TYPE[UNIFORM_TYPE["FLOAT_MAT4"] = 14] = "FLOAT_MAT4";
    UNIFORM_TYPE[UNIFORM_TYPE["SAMPLER_2D"] = 15] = "SAMPLER_2D";
    UNIFORM_TYPE[UNIFORM_TYPE["SAMPLER_CUBE"] = 16] = "SAMPLER_CUBE";
    UNIFORM_TYPE[UNIFORM_TYPE["SAMPLER_2D_SHADOW"] = 17] = "SAMPLER_2D_SHADOW";
    UNIFORM_TYPE[UNIFORM_TYPE["SAMPLER_CUBE_SHADOW"] = 18] = "SAMPLER_CUBE_SHADOW";
    UNIFORM_TYPE[UNIFORM_TYPE["SAMPLER_3D"] = 19] = "SAMPLER_3D";
    UNIFORM_TYPE[UNIFORM_TYPE["FLOATARRAY"] = 20] = "FLOATARRAY";
})(UNIFORM_TYPE || (UNIFORM_TYPE = {}));


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
/*
 * ProjectName: hypergl
 * FilePath: \src\core\color.ts
 * Created Date: Saturday, August 25th 2018, 4:51:43 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 25th 2018, 8:27:36 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */

var Color = /** @class */ (function () {
    function Color(r, g, b, a) {
        this.buffer = new ArrayBuffer(4 * 4);
        this.data = new Float32Array(this.buffer, 0, 4);
        this.data3 = new Float32Array(this.buffer, 0, 3);
        this.data[0] = r || 0;
        this.data[1] = g || 0;
        this.data[2] = b || 0;
        this.data[3] = a !== undefined ? a : 1;
    }
    Color.prototype.clone = function () {
        return new Color(this.data[0], this.data[1], this.data[2], this.data[3]);
    };
    Color.prototype.copy = function (_a) {
        var data = _a.data;
        // tslint:disable-next-line:one-variable-per-declaration
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
        var i = parseInt(hex.replace('#', '0x'), 10);
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
        var s = "#" + ((1 << 24) + (parseInt((this.r * 255).toString(), 10) << 16) + (parseInt((this.g * 255).toString(), 10) << 8) + parseInt((this.b * 255).toString(), 10)).toString(16).slice(1);
        if (alpha === true) {
            var a = parseInt((this.a * 255).toString(), 10).toString(16);
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
/*
 * ProjectName: hypergl
 * FilePath: \src\core\element.ts
 * Created Date: Saturday, August 18th 2018, 4:23:54 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 25th 2018, 1:22:54 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */

var ComponentIdCount = 0;
var IElement = /** @class */ (function () {
    function IElement() {
        this.id = ComponentIdCount++;
        this.uuid = Object(_math_math__WEBPACK_IMPORTED_MODULE_0__["generateUUID"])();
        this.name = null;
        this.tag = null;
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

/***/ "./src/ecs/entity.ts":
/*!***************************!*\
  !*** ./src/ecs/entity.ts ***!
  \***************************/
/*! exports provided: Entity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Entity", function() { return Entity; });
/* harmony import */ var _scene_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scene/node */ "./src/scene/node.ts");
/*
 * ProjectName: hypergl
 * FilePath: \src\component\entity.ts
 * Created Date: Tuesday, August 28th 2018, 1:21:15 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, September 3rd 2018, 9:29:05 pm
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

var Entity = /** @class */ (function (_super) {
    __extends(Entity, _super);
    function Entity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Entity;
}(_scene_node__WEBPACK_IMPORTED_MODULE_0__["SceneNode"]));



/***/ }),

/***/ "./src/ecs/index.ts":
/*!**************************!*\
  !*** ./src/ecs/index.ts ***!
  \**************************/
/*! exports provided: Entity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity */ "./src/ecs/entity.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Entity", function() { return _entity__WEBPACK_IMPORTED_MODULE_0__["Entity"]; });

/*
 * ProjectName: hypergl
 * FilePath: \src\ecs\index.ts
 * Created Date: Wednesday, August 29th 2018, 7:59:40 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, August 29th 2018, 7:59:46 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */



/***/ }),

/***/ "./src/graphics/index.ts":
/*!*******************************!*\
  !*** ./src/graphics/index.ts ***!
  \*******************************/
/*! exports provided: VertexBuffer, Iterator, Setter, VertexFormat, IndexBuffer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vertexBuffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vertexBuffer */ "./src/graphics/vertexBuffer.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VertexBuffer", function() { return _vertexBuffer__WEBPACK_IMPORTED_MODULE_0__["VertexBuffer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Iterator", function() { return _vertexBuffer__WEBPACK_IMPORTED_MODULE_0__["Iterator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Setter", function() { return _vertexBuffer__WEBPACK_IMPORTED_MODULE_0__["Setter"]; });

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
 * Last Modified: Sunday, September 2nd 2018, 12:45:34 am
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
        var gl = renderer.gl;
        if (dataType === Uint8Array) {
            this.drawFormat = gl.UNSIGNED_BYTE;
        }
        else if (dataType === Uint16Array) {
            this.drawFormat = gl.UNSIGNED_SHORT;
        }
        else if (dataType === Uint32Array) {
            this.drawFormat = gl.UNSIGNED_INT;
        }
        if (Array.isArray(data)) {
            this.buffer = new dataType(data).buffer;
            this.length = data.length;
        }
        else {
            this.buffer = data;
            this.length = length || new dataType(data).length;
        }
        this.bind();
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
/* harmony import */ var _conf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../conf */ "./src/conf.ts");
/* harmony import */ var _shaderProgramGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shaderProgramGenerator */ "./src/graphics/shaderProgramGenerator.ts");
/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\device.ts
 * Created Date: Wednesday, August 15th 2018, 12:24:29 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, September 2nd 2018, 1:24:11 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */



var RendererPlatform = /** @class */ (function () {
    function RendererPlatform(canvas, option) {
        this.AttrbuteType = {};
        this.glTypeToJs = {};
        this.uniformFunction = {};
        this.programGenerator = new _shaderProgramGenerator__WEBPACK_IMPORTED_MODULE_2__["ShaderProgramGenerator"](this);
        var webgl2;
        if (option && !option.webgl1) {
            webgl2 = canvas.getContext('webgl2');
        }
        this.webgl2 = webgl2;
        // this.webgl2 = canvas.getContext('webgl2') as any;
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
        this.init();
    }
    Object.defineProperty(RendererPlatform.prototype, "gl", {
        get: function () {
            return this.webgl2 || this.webgl;
        },
        enumerable: true,
        configurable: true
    });
    RendererPlatform.prototype.init = function () {
        var _a;
        var gl = this.gl;
        var glTypeToJs = this.glTypeToJs;
        glTypeToJs[gl.BOOL] = _conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].BOOL;
        glTypeToJs[gl.INT] = _conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].INT;
        glTypeToJs[gl.FLOAT] = _conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].FLOAT;
        glTypeToJs[gl.FLOAT_VEC2] = _conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].FLOAT_VEC2;
        glTypeToJs[gl.FLOAT_VEC3] = _conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].FLOAT_VEC3;
        glTypeToJs[gl.FLOAT_VEC4] = _conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].FLOAT_VEC4;
        glTypeToJs[gl.INT_VEC2] = _conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].INT_VEC2;
        glTypeToJs[gl.INT_VEC3] = _conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].INT_VEC3;
        glTypeToJs[gl.INT_VEC4] = _conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].INT_VEC4;
        glTypeToJs[gl.BOOL_VEC2] = _conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].BOOL_VEC2;
        glTypeToJs[gl.BOOL_VEC3] = _conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].BOOL_VEC3;
        glTypeToJs[gl.BOOL_VEC4] = _conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].BOOL_VEC4;
        glTypeToJs[gl.FLOAT_MAT2] = _conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].FLOAT_MAT2;
        glTypeToJs[gl.FLOAT_MAT3] = _conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].FLOAT_MAT3;
        glTypeToJs[gl.FLOAT_MAT4] = _conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].FLOAT_MAT4;
        glTypeToJs[gl.SAMPLER_2D] = _conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].SAMPLER_2D;
        glTypeToJs[gl.SAMPLER_CUBE] = _conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].SAMPLER_CUBE;
        if (this.platform === 'webgl2') {
            glTypeToJs[gl.SAMPLER_2D_SHADOW] = _conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].SAMPLER_2D_SHADOW;
            glTypeToJs[gl.SAMPLER_CUBE_SHADOW] = _conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].SAMPLER_CUBE_SHADOW;
            glTypeToJs[gl.SAMPLER_3D] = _conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].SAMPLER_3D;
        }
        this.AttrbuteType = (_a = {},
            _a[Int8Array.name] = gl.BYTE,
            _a[Uint8Array.name] = gl.UNSIGNED_BYTE,
            _a[Int16Array.name] = gl.SHORT,
            _a[Uint16Array.name] = gl.UNSIGNED_SHORT,
            _a[Int32Array.name] = gl.INT,
            _a[Uint32Array.name] = gl.UNSIGNED_INT,
            _a[Float32Array.name] = gl.FLOAT,
            _a[Float64Array.name] = gl.HIGH_FLOAT,
            _a);
        // tslint:disable-next-line:one-variable-per-declaration
        var uniformValue, scopeX, scopeY, scopeZ, scopeW;
        this.uniformFunction[_conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].BOOL] = function (uniform, value) {
            if (uniform.value !== value) {
                gl.uniform1i(uniform.locationId, value);
                uniform.value = value;
            }
        };
        this.uniformFunction[_conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].INT] = this.uniformFunction[_conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].BOOL];
        this.uniformFunction[_conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].FLOAT] = function (uniform, value) {
            if (uniform.value !== value) {
                gl.uniform1f(uniform.locationId, value);
                uniform.value = value;
            }
        };
        this.uniformFunction[_conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].FLOAT_VEC2] = function (uniform, value) {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY) {
                gl.uniform2fv(uniform.locationId, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
            }
        };
        this.uniformFunction[_conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].FLOAT_VEC3] = function (uniform, value) {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            scopeZ = value[2];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY || uniformValue[2] !== scopeZ) {
                gl.uniform3fv(uniform.locationId, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
                uniformValue[2] = scopeZ;
            }
        };
        this.uniformFunction[_conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].FLOAT_VEC4] = function (uniform, value) {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            scopeZ = value[2];
            scopeW = value[3];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY || uniformValue[2] !== scopeZ || uniformValue[3] !== scopeW) {
                gl.uniform4fv(uniform.locationId, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
                uniformValue[2] = scopeZ;
                uniformValue[3] = scopeW;
            }
        };
        this.uniformFunction[_conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].INT_VEC2] = function (uniform, value) {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY) {
                gl.uniform2iv(uniform.locationId, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
            }
        };
        this.uniformFunction[_conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].BOOL_VEC2] = this.uniformFunction[_conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].INT_VEC2];
        this.uniformFunction[_conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].INT_VEC3] = function (uniform, value) {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            scopeZ = value[2];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY || uniformValue[2] !== scopeZ) {
                gl.uniform3iv(uniform.locationId, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
                uniformValue[2] = scopeZ;
            }
        };
        this.uniformFunction[_conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].BOOL_VEC3] = this.uniformFunction[_conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].INT_VEC3];
        this.uniformFunction[_conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].INT_VEC4] = function (uniform, value) {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            scopeZ = value[2];
            scopeW = value[3];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY || uniformValue[2] !== scopeZ || uniformValue[3] !== scopeW) {
                gl.uniform4iv(uniform.locationId, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
                uniformValue[2] = scopeZ;
                uniformValue[3] = scopeW;
            }
        };
        this.uniformFunction[_conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].BOOL_VEC4] = this.uniformFunction[_conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].INT_VEC4];
        this.uniformFunction[_conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].FLOAT_MAT2] = function (uniform, value) {
            gl.uniformMatrix2fv(uniform.locationId, false, value);
        };
        this.uniformFunction[_conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].FLOAT_MAT3] = function (uniform, value) {
            gl.uniformMatrix3fv(uniform.locationId, false, value);
        };
        this.uniformFunction[_conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].FLOAT_MAT4] = function (uniform, value) {
            gl.uniformMatrix4fv(uniform.locationId, false, value);
        };
        this.uniformFunction[_conf__WEBPACK_IMPORTED_MODULE_1__["UNIFORM_TYPE"].FLOATARRAY] = function (uniform, value) {
            gl.uniform1fv(uniform.locationId, value);
        };
    };
    RendererPlatform.prototype.setShader = function (shader) {
        if (shader.ready === false) {
            shader.link();
        }
        this.gl.useProgram(shader.program);
    };
    RendererPlatform.prototype.setVertexBuffer = function (vertexBuffer) {
        var gl = this.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.bufferId);
        // vertexBuffer.bind();
    };
    RendererPlatform.prototype.setIndexBuffer = function (indexBuffer) {
        var gl = this.gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.bufferId);
        // indexBuffer.bind();
    };
    RendererPlatform.prototype.initDraw = function () {
        var gl = this.gl;
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.DEPTH_BUFFER_BIT);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
    };
    RendererPlatform.prototype.draw = function (entity) {
        var gl = this.gl;
        var mesh = entity.mesh;
        if (mesh == null) {
            return;
        }
        var material = mesh.material;
        this.setVertexBuffer(mesh.vertexBuffer);
        this.setIndexBuffer(mesh.indexBuffer);
        var shader = material.shader;
        var samplers = shader.samplers;
        var uniforms = shader.uniforms;
        var attributes = shader.attributes;
        var format = mesh.vertexBuffer.format;
        shader.setUniformValue('matrix_model', entity.getWorldTransform().data);
        var _loop_1 = function (i) {
            var attrbute = attributes[i];
            var element = void 0;
            if (attrbute.element) {
                element = attrbute.element;
            }
            else {
                element = format.elements.find(function (x) { return x.semantic === attrbute.name; });
                attrbute.element = element;
            }
            if (element) {
                gl.vertexAttribPointer(attrbute.locationId, element.size, this_1.AttrbuteType[element.dataType.name], element.normalize, element.stride, element.offset);
                if (attrbute.enable === false) {
                    gl.enableVertexAttribArray(attrbute.locationId);
                    attrbute.enable = true;
                }
            }
            else {
                throw new Error('element 为 null');
            }
        };
        var this_1 = this;
        for (var i = 0; i < attributes.length; i++) {
            _loop_1(i);
        }
        _util__WEBPACK_IMPORTED_MODULE_0__["Log"].assert(shader.checkUniformScope() === true, 'UniformScopValue not set', shader.uniformScope);
        for (var i = 0; i < uniforms.length; i++) {
            var uniform = uniforms[i];
            this.uniformFunction[uniform.type](uniform, shader.uniformScope[uniform.name]);
        }
        gl.drawElements(gl.TRIANGLES, mesh.indexBuffer.length, mesh.indexBuffer.drawFormat, 0);
    };
    return RendererPlatform;
}());



/***/ }),

/***/ "./src/graphics/shader.ts":
/*!********************************!*\
  !*** ./src/graphics/shader.ts ***!
  \********************************/
/*! exports provided: Shader, createProgram, loadShader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Shader", function() { return Shader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createProgram", function() { return createProgram; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadShader", function() { return loadShader; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/util.ts");
/* harmony import */ var _shaderVariable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shaderVariable */ "./src/graphics/shaderVariable.ts");
/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\shader.ts
 * Created Date: Saturday, August 25th 2018, 1:38:57 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, September 2nd 2018, 12:20:01 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


var Shader = /** @class */ (function () {
    function Shader(renderer, definition) {
        this.renderer = renderer;
        this.definition = definition;
        this.samplers = [];
        this.uniforms = [];
        this.attributes = [];
        this.uniformScope = {};
        this.ready = false;
        this.compile();
    }
    Shader.prototype.setUniformValue = function (name, value) {
        this.uniformScope[name] = value;
    };
    Shader.prototype.checkUniformScope = function () {
        // tslint:disable-next-line:forin
        for (var x in this.uniformScope) {
            if (this.uniformScope[x] == null) {
                return false;
            }
        }
        return true;
    };
    Shader.prototype.compile = function () {
        var gl = this.renderer.gl;
        this.vshader = loadShader(gl, gl.VERTEX_SHADER, this.definition.vshader);
        this.fshader = loadShader(gl, gl.FRAGMENT_SHADER, this.definition.fshader);
        this.program = createProgram(gl, this.vshader, this.fshader);
    };
    Shader.prototype.link = function () {
        if (this.program == null) {
            _util__WEBPACK_IMPORTED_MODULE_0__["Log"].error('link前,必须compile');
            return;
        }
        var gl = this.renderer.gl;
        if (this.renderer.platform === 'webgl2' && this.definition.useTransformFeedback) {
            // Collect all "out_" attributes and use them for output
            var attrs = this.definition.attributes;
            var outNames_1 = [];
            // for (let attr in attrs) {
            //     if (attrs.hasOwnProperty(attr)) {
            //         outNames.push('out_' + attr);
            //     }
            // }
            attrs.keys().forEach(function (attr) {
                outNames_1.push('out_' + attr);
            });
            // webgl2缓存
            gl.transformFeedbackVaryings(this.program, outNames_1, gl.INTERLEAVED_ATTRIBS);
        }
        gl.linkProgram(this.program);
        var linked = gl.getProgramParameter(this.program, gl.LINK_STATUS);
        if (!linked) {
            _util__WEBPACK_IMPORTED_MODULE_0__["Log"].error(gl.getProgramInfoLog(this.program));
        }
        gl.deleteShader(this.vshader);
        gl.deleteShader(this.fshader);
        var i = 0;
        // tslint:disable-next-line:one-variable-per-declaration
        var numAttributes = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
        while (i < numAttributes) {
            var info = gl.getActiveAttrib(this.program, i++);
            var location = gl.getAttribLocation(this.program, info.name);
            // Check attributes are correctly linked up
            if (this.definition.attributes[info.name] === undefined) {
                _util__WEBPACK_IMPORTED_MODULE_0__["Log"].error('Vertex shader attribute "' + info.name + '" is not mapped to a semantic in shader definition.');
            }
            // this.attributes.push(new ShaderInput(this.renderer, this.definition.attributes[info.name], this.renderer.glTypeToJs[info.type] as GLType, location));
            this.attributes.push(new _shaderVariable__WEBPACK_IMPORTED_MODULE_1__["ShaderVariable"](this.definition.attributes[info.name], this.renderer.glTypeToJs[info.type], location));
        }
        i = 0;
        var numUniforms = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
        while (i < numUniforms) {
            var info = gl.getActiveUniform(this.program, i++);
            var location = gl.getUniformLocation(this.program, info.name);
            if (info.type === gl.SAMPLER_2D || info.type === gl.SAMPLER_CUBE ||
                (this.renderer.platform === 'webgl2' && (info.type === gl.SAMPLER_2D_SHADOW || info.type === gl.SAMPLER_CUBE_SHADOW || info.type === gl.SAMPLER_3D))) {
                this.samplers.push(new _shaderVariable__WEBPACK_IMPORTED_MODULE_1__["ShaderVariable"](info.name, this.renderer.glTypeToJs[info.type], location));
            }
            else {
                this.uniforms.push(new _shaderVariable__WEBPACK_IMPORTED_MODULE_1__["ShaderVariable"](info.name, this.renderer.glTypeToJs[info.type], location));
            }
            this.uniformScope[info.name] = null;
        }
        this.ready = true;
    };
    return Shader;
}());

function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    return program;
}
function loadShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        _util__WEBPACK_IMPORTED_MODULE_0__["Log"].error((gl.VERTEX_SHADER === type ? 'VERTEX_SHADER' : 'FRAGMENT_SHADER') + "\n" + gl.getShaderInfoLog(shader));
        return false;
    }
    return shader;
}


/***/ }),

/***/ "./src/graphics/shaderProgramGenerator.ts":
/*!************************************************!*\
  !*** ./src/graphics/shaderProgramGenerator.ts ***!
  \************************************************/
/*! exports provided: ShaderProgramGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShaderProgramGenerator", function() { return ShaderProgramGenerator; });
/* harmony import */ var _shaders_basic_vert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shaders/basic.vert */ "./src/graphics/shaders/basic.vert");
/* harmony import */ var _shaders_basic_vert__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_shaders_basic_vert__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shaders_basic_frag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shaders/basic.frag */ "./src/graphics/shaders/basic.frag");
/* harmony import */ var _shaders_basic_frag__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_shaders_basic_frag__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shader */ "./src/graphics/shader.ts");
/* harmony import */ var _conf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../conf */ "./src/conf.ts");
/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\generateShader.ts
 * Created Date: Saturday, August 25th 2018, 3:45:20 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, September 2nd 2018, 11:47:16 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */




var ShaderProgramGenerator = /** @class */ (function () {
    function ShaderProgramGenerator(renderer) {
        this.renderer = renderer;
        this.generator = {};
        this._cache = {};
    }
    ShaderProgramGenerator.prototype.getProgram = function (name, options) {
        if (options === void 0) { options = {}; }
        var platform = this.renderer.platform;
        options['GL2'] = platform === 'webgl2';
        var key = generateKey(options);
        var shader = this._cache[key];
        if (!shader) {
            var shaderDefinition = createShaderDefinition(this.renderer, options);
            shader = this._cache[key] = new _shader__WEBPACK_IMPORTED_MODULE_2__["Shader"](this.renderer, shaderDefinition);
        }
        return shader;
    };
    return ShaderProgramGenerator;
}());

function generateKey(options) {
    return JSON.stringify(options);
}
function createShaderDefinition(renderer, options) {
    var basicVertStr = _shaders_basic_vert__WEBPACK_IMPORTED_MODULE_0___default()(options);
    var basicFragStr = _shaders_basic_frag__WEBPACK_IMPORTED_MODULE_1___default()(options);
    var attributes = { vertex_position: _conf__WEBPACK_IMPORTED_MODULE_3__["SEMANTIC"].POSITION };
    var variables = [];
    if (options.vertex_color) {
        attributes.vertex_color = _conf__WEBPACK_IMPORTED_MODULE_3__["SEMANTIC"].COLOR;
    }
    if (options.diffuseMap) {
        attributes.vertex_texCoord0 = _conf__WEBPACK_IMPORTED_MODULE_3__["SEMANTIC"].TEXCOORD0;
    }
    return {
        attributes: attributes,
        vshader: basicVertStr,
        fshader: basicFragStr
    };
}


/***/ }),

/***/ "./src/graphics/shaderVariable.ts":
/*!****************************************!*\
  !*** ./src/graphics/shaderVariable.ts ***!
  \****************************************/
/*! exports provided: ShaderVariable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShaderVariable", function() { return ShaderVariable; });
/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\shaderInput.ts
 * Created Date: Wednesday, August 29th 2018, 12:20:47 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, September 2nd 2018, 11:43:51 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */
var ShaderVariable = /** @class */ (function () {
    function ShaderVariable(name, type, locationId) {
        this.name = name;
        this.type = type;
        this.locationId = locationId;
        this.enable = false;
        this.value = [null, null, null, null];
    }
    return ShaderVariable;
}());



/***/ }),

/***/ "./src/graphics/shaders/basic.frag":
/*!*****************************************!*\
  !*** ./src/graphics/shaders/basic.frag ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(__webpack_require__(/*! ./src/graphics/shaders/gles3.frag */ "./src/graphics/shaders/gles3.frag"),depth0,{"name":"gles3.frag","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "varying vec4 vColor;\nvec4 getOutColor() {\n    return vColor;\n}\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "uniform vec4 uColor;\nvec4 getOutColor() {\n    return uColor;\n}\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.GL2 : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\nprecision highp float;\n#ifdef GL2\nprecision highp sampler2DShadow;\n#endif\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.vertex_color : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "\n\nvoid main(void)\n{\n    gl_FragColor = getOutColor();\n}";
},"usePartial":true,"useData":true});

/***/ }),

/***/ "./src/graphics/shaders/basic.vert":
/*!*****************************************!*\
  !*** ./src/graphics/shaders/basic.vert ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(__webpack_require__(/*! ./src/graphics/shaders/gles3.vert */ "./src/graphics/shaders/gles3.vert"),depth0,{"name":"gles3.vert","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "attribute vec4 vertex_color;\nvarying vec4 vColor;\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "attribute vec2 vertex_texCoord0;\nvarying vec2 v_vertex_texCoord0;\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "    vColor = vertex_color;\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "    v_vertex_texCoord0 = vertex_texCoord0;\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.GL2 : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\nuniform mat4 matrix_model;\nuniform mat4 matrix_viewProjection;\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.vertex_color : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.texture_diffuseMap : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n\nattribute vec3 vertex_position;\n\nvec4 getPosition() {\n    vec4 posW = matrix_model * vec4(vertex_position, 1.0);\n    return matrix_viewProjection * posW;\n}\n\n\nvoid main(void) {\n    gl_Position = getPosition();\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.vertex_color : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.texture_diffuseMap : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "}";
},"usePartial":true,"useData":true});

/***/ }),

/***/ "./src/graphics/shaders/gles3.frag":
/*!*****************************************!*\
  !*** ./src/graphics/shaders/gles3.frag ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "#version 300 es\n#define GL2\n#define varying in\nout highp vec4 hyper_ragColor;\n#define gl_FragColor hyper_ragColor\n#define texture2D texture\n#define textureCube texture\n#define texture2DProj textureProj\n#define texture2DLodEXT textureLod\n#define texture2DProjLodEXT textureProjLod\n#define textureCubeLodEXT textureLod\n#define texture2DGradEXT textureGrad\n#define texture2DProjGradEXT textureProjGrad\n#define textureCubeGradEXT textureGrad\n";
},"useData":true});

/***/ }),

/***/ "./src/graphics/shaders/gles3.vert":
/*!*****************************************!*\
  !*** ./src/graphics/shaders/gles3.vert ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "#version 300 es\n#define GL2\n#define attribute in\n#define varying out\n#define texture2D texture\n#define VERTEXSHADER";
},"useData":true});

/***/ }),

/***/ "./src/graphics/vertexBuffer.ts":
/*!**************************************!*\
  !*** ./src/graphics/vertexBuffer.ts ***!
  \**************************************/
/*! exports provided: VertexBuffer, Iterator, Setter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VertexBuffer", function() { return VertexBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Iterator", function() { return Iterator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Setter", function() { return Setter; });
/* harmony import */ var _conf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../conf */ "./src/conf.ts");
/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\vertexBuffer.ts
 * Created Date: Tuesday, August 14th 2018, 5:02:32 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, September 2nd 2018, 12:48:01 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */

var VertexBuffer = /** @class */ (function () {
    // constructor(renderer: RendererPlatform, format: VertexFormat, usage: BUFFER, data: ArrayBuffer, numVertices: number)
    function VertexBuffer(renderer, format, numVertices, usage, data) {
        if (usage === void 0) { usage = _conf__WEBPACK_IMPORTED_MODULE_0__["BUFFER"].STATIC; }
        this.renderer = renderer;
        this.format = format;
        this.numVertices = numVertices;
        this.usage = usage;
        var stride = this.format.stride;
        this.numBytes = stride * numVertices;
        if (data) {
            this.buffer = data;
            this.bind();
        }
        else {
            this.buffer = new ArrayBuffer(this.numBytes);
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
    VertexBuffer.prototype.toIterator = function () {
        return new Iterator(this);
    };
    return VertexBuffer;
}());

var Iterator = /** @class */ (function () {
    function Iterator(vertexBuffer) {
        this.vertexBuffer = vertexBuffer;
        this.index = 0;
        this.done = false;
    }
    Object.defineProperty(Iterator.prototype, "value", {
        get: function () {
            var setter = {};
            var _a = this.vertexBuffer, format = _a.format, buffer = _a.buffer;
            for (var j = 0; j < format.elements.length; j++) {
                var element = format.elements[j];
                var view = new element.dataType(buffer, this.index + element.offset, element.size);
                setter[element.semantic] = new Setter(view);
            }
            return setter;
        },
        enumerable: true,
        configurable: true
    });
    Iterator.prototype.next = function () {
        if (this.done === false) {
            this.index += this.vertexBuffer.format.stride;
            if (this.index >= this.vertexBuffer.numBytes) {
                this.done = true;
            }
        }
    };
    return Iterator;
}());

var Setter = /** @class */ (function () {
    function Setter(view) {
        this.view = view;
    }
    Setter.prototype.set = function (a, b, c, d) {
        switch (this.view.length) {
            case 1:
                this.set1(a);
                break;
            case 2:
                this.set2(a, b);
                break;
            case 3:
                this.set3(a, b, c);
                break;
            case 4:
                this.set4(a, b, c, d);
                break;
        }
    };
    Setter.prototype.set1 = function (a) {
        this.view[0] = a;
    };
    Setter.prototype.set2 = function (a, b) {
        this.view[0] = a;
        this.view[1] = b;
    };
    Setter.prototype.set3 = function (a, b, c) {
        this.view[0] = a;
        this.view[1] = b;
        this.view[2] = c;
    };
    Setter.prototype.set4 = function (a, b, c, d) {
        this.view[0] = a;
        this.view[1] = b;
        this.view[2] = c;
        this.view[3] = d;
    };
    return Setter;
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
 * Last Modified: Saturday, September 1st 2018, 1:21:22 am
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
/*! exports provided: DataType, SEMANTIC, BUFFER, CURVE, UNIFORM_TYPE, Application, VertexBuffer, Iterator, Setter, VertexFormat, IndexBuffer, BasicMaterial, Entity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _conf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conf */ "./src/conf.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataType", function() { return _conf__WEBPACK_IMPORTED_MODULE_0__["DataType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SEMANTIC", function() { return _conf__WEBPACK_IMPORTED_MODULE_0__["SEMANTIC"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BUFFER", function() { return _conf__WEBPACK_IMPORTED_MODULE_0__["BUFFER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CURVE", function() { return _conf__WEBPACK_IMPORTED_MODULE_0__["CURVE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UNIFORM_TYPE", function() { return _conf__WEBPACK_IMPORTED_MODULE_0__["UNIFORM_TYPE"]; });

/* harmony import */ var _application__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./application */ "./src/application.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return _application__WEBPACK_IMPORTED_MODULE_1__["Application"]; });

/* harmony import */ var _graphics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./graphics */ "./src/graphics/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VertexBuffer", function() { return _graphics__WEBPACK_IMPORTED_MODULE_2__["VertexBuffer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Iterator", function() { return _graphics__WEBPACK_IMPORTED_MODULE_2__["Iterator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Setter", function() { return _graphics__WEBPACK_IMPORTED_MODULE_2__["Setter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VertexFormat", function() { return _graphics__WEBPACK_IMPORTED_MODULE_2__["VertexFormat"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IndexBuffer", function() { return _graphics__WEBPACK_IMPORTED_MODULE_2__["IndexBuffer"]; });

/* harmony import */ var _material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./material */ "./src/material/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BasicMaterial", function() { return _material__WEBPACK_IMPORTED_MODULE_3__["BasicMaterial"]; });

/* harmony import */ var _ecs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ecs */ "./src/ecs/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Entity", function() { return _ecs__WEBPACK_IMPORTED_MODULE_4__["Entity"]; });

/*
 * ProjectName: hypergl
 * FilePath: \src\index.ts
 * Created Date: Saturday, August 18th 2018, 4:11:24 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, August 29th 2018, 8:00:10 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */







/***/ }),

/***/ "./src/material/basicMaterial.ts":
/*!***************************************!*\
  !*** ./src/material/basicMaterial.ts ***!
  \***************************************/
/*! exports provided: BasicMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasicMaterial", function() { return BasicMaterial; });
/* harmony import */ var _core_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/color */ "./src/core/color.ts");
/* harmony import */ var _material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./material */ "./src/material/material.ts");
/*
 * ProjectName: hypergl
 * FilePath: \src\material\basicMaterial.ts
 * Created Date: Saturday, August 25th 2018, 4:46:29 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, September 2nd 2018, 11:14:03 pm
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
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};


var BasicMaterial = /** @class */ (function (_super) {
    __extends(BasicMaterial, _super);
    function BasicMaterial() {
        var _this = _super.call(this) || this;
        _this.color = new _core_color__WEBPACK_IMPORTED_MODULE_0__["Color"](1, 1, 1, 1);
        _this.update();
        return _this;
    }
    BasicMaterial.prototype.update = function () {
        this.setParameter('vertex_color', false);
        this.setParameter('uColor', this.color.data);
        if (this.colorMap) {
            // TODO
            this.setParameter('texture_diffuseMap', this.colorMap);
        }
    };
    BasicMaterial.prototype.updateShader = function (renderer) {
        this.shader = renderer.programGenerator.getProgram('basice', __assign({}, this.parameters));
    };
    return BasicMaterial;
}(_material__WEBPACK_IMPORTED_MODULE_1__["Material"]));



/***/ }),

/***/ "./src/material/index.ts":
/*!*******************************!*\
  !*** ./src/material/index.ts ***!
  \*******************************/
/*! exports provided: BasicMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _basicMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basicMaterial */ "./src/material/basicMaterial.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BasicMaterial", function() { return _basicMaterial__WEBPACK_IMPORTED_MODULE_0__["BasicMaterial"]; });

/*
 * ProjectName: hypergl
 * FilePath: \src\material\index.ts
 * Created Date: Saturday, August 25th 2018, 7:13:48 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, August 25th 2018, 7:13:55 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */



/***/ }),

/***/ "./src/material/material.ts":
/*!**********************************!*\
  !*** ./src/material/material.ts ***!
  \**********************************/
/*! exports provided: Material */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Material", function() { return Material; });
/*
 * ProjectName: hypergl
 * FilePath: \src\material\material.ts
 * Created Date: Saturday, August 25th 2018, 5:01:50 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, September 2nd 2018, 9:52:23 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */
var Material = /** @class */ (function () {
    function Material() {
        this.parameters = {};
    }
    Material.prototype.setParameter = function (name, data) {
        this.parameters[name] = data;
    };
    Material.prototype.getParameter = function (name) {
        return this.parameters[name];
    };
    Material.prototype.deleteParameter = function () {
        // x
        delete this.parameters[name];
    };
    return Material;
}());



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
                _this.getX(x);
                _this.getY(y);
                _this.getZ(z);
                scale.set(x.length(), y.length(), z.length());
                return scale;
            };
        })();
        this.getEulerAngles = (function () {
            var scale = new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
            return function (eulers) {
                var x, y, z, sx, sy, sz, m, halfPi;
                eulers = (eulers === undefined) ? new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]() : eulers;
                _this.getScale(scale);
                sx = scale.x;
                sy = scale.y;
                sz = scale.z;
                m = _this.data;
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
    /**
     * 移动到某个点
     *
     * @param {Vec3} vec
     * @param {Vec3} [res] ref
     * @returns {Vec3} res
     * @memberof Mat4
     */
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
    /**
     * 修改自身，逆矩阵
     *
     * @returns {this} this
     * @memberof Mat4
     */
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
    Quat.prototype.getEulerAngles = function (eulers /*ref*/) {
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
    Quat.TEMP = new Quat();
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

/***/ "./src/mesh/mesh.ts":
/*!**************************!*\
  !*** ./src/mesh/mesh.ts ***!
  \**************************/
/*! exports provided: Mesh, createBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mesh", function() { return Mesh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createBox", function() { return createBox; });
/* harmony import */ var _graphics_vertexBuffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../graphics/vertexBuffer */ "./src/graphics/vertexBuffer.ts");
/* harmony import */ var _graphics_indexBuffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/indexBuffer */ "./src/graphics/indexBuffer.ts");
/* harmony import */ var _material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../material */ "./src/material/index.ts");
/* harmony import */ var _conf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../conf */ "./src/conf.ts");
/* harmony import */ var _graphics_vertexFormat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../graphics/vertexFormat */ "./src/graphics/vertexFormat.ts");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../math */ "./src/math/index.ts");
/*
 * ProjectName: hypergl
 * FilePath: \src\mesh\mesh.ts
 * Created Date: Tuesday, August 14th 2018, 5:02:26 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, September 3rd 2018, 1:05:12 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */






var Mesh = /** @class */ (function () {
    function Mesh() {
        this._material = Mesh.defaultMaterial;
        // TODO
    }
    Object.defineProperty(Mesh.prototype, "material", {
        get: function () {
            return this._material;
        },
        set: function (x) {
            this._material = x;
        },
        enumerable: true,
        configurable: true
    });
    // tslint:disable-next-line:cyclomatic-complexity
    Mesh.createMesh = function (renderer, opts) {
        // Check the supplied options and provide defaults for unspecified ones
        var positions = opts.positions;
        var normals = opts && opts.normals !== undefined ? opts.normals : null;
        var indices = opts.indices;
        var tangents = opts && opts.tangents !== undefined ? opts.tangents : null;
        var colors = opts && opts.colors !== undefined ? opts.colors : null;
        var uvs = opts && opts.uvs !== undefined ? opts.uvs : null;
        var uvs1 = opts && opts.uvs1 !== undefined ? opts.uvs1 : null;
        var blendIndices = opts && opts.blendIndices !== undefined ? opts.blendIndices : null;
        var blendWeights = opts && opts.blendWeights !== undefined ? opts.blendWeights : null;
        var vertexDesc = [
            { semantic: _conf__WEBPACK_IMPORTED_MODULE_3__["SEMANTIC"].POSITION, size: 3, dataType: Float32Array }
        ];
        if (normals !== null) {
            vertexDesc.push({ semantic: _conf__WEBPACK_IMPORTED_MODULE_3__["SEMANTIC"].NORMAL, size: 3, dataType: Float32Array });
        }
        if (tangents !== null) {
            vertexDesc.push({ semantic: _conf__WEBPACK_IMPORTED_MODULE_3__["SEMANTIC"].TANGENT, size: 4, dataType: Float32Array });
        }
        if (colors !== null) {
            vertexDesc.push({ semantic: _conf__WEBPACK_IMPORTED_MODULE_3__["SEMANTIC"].COLOR, size: 4, dataType: Uint8Array, normalize: false });
        }
        if (uvs !== null) {
            vertexDesc.push({ semantic: _conf__WEBPACK_IMPORTED_MODULE_3__["SEMANTIC"].TEXCOORD0, size: 2, dataType: Float32Array });
        }
        if (uvs1 !== null) {
            vertexDesc.push({ semantic: _conf__WEBPACK_IMPORTED_MODULE_3__["SEMANTIC"].TEXCOORD1, size: 2, dataType: Float32Array });
        }
        if (blendIndices !== null) {
            vertexDesc.push({ semantic: _conf__WEBPACK_IMPORTED_MODULE_3__["SEMANTIC"].BLENDINDICES, size: 2, dataType: Uint8Array });
        }
        if (blendWeights !== null) {
            vertexDesc.push({ semantic: _conf__WEBPACK_IMPORTED_MODULE_3__["SEMANTIC"].BLENDWEIGHT, size: 2, dataType: Float32Array });
        }
        var vertexFormat = new _graphics_vertexFormat__WEBPACK_IMPORTED_MODULE_4__["VertexFormat"](vertexDesc);
        // Create the vertex buffer
        var numVertices = positions.length / 3;
        var vertexBuffer = new _graphics_vertexBuffer__WEBPACK_IMPORTED_MODULE_0__["VertexBuffer"](renderer, vertexFormat, numVertices);
        var iterator = vertexBuffer.toIterator();
        for (var i = 0; i < numVertices; i++) {
            var setter = iterator.value;
            setter[_conf__WEBPACK_IMPORTED_MODULE_3__["SEMANTIC"].POSITION].set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
            if (normals !== null) {
                setter[_conf__WEBPACK_IMPORTED_MODULE_3__["SEMANTIC"].NORMAL].set(normals[i * 3], normals[i * 3 + 1], normals[i * 3 + 2]);
            }
            if (tangents !== null) {
                setter[_conf__WEBPACK_IMPORTED_MODULE_3__["SEMANTIC"].TANGENT].set(tangents[i * 4], tangents[i * 4 + 1], tangents[i * 4 + 2], tangents[i * 4 + 3]);
            }
            if (colors !== null) {
                setter[_conf__WEBPACK_IMPORTED_MODULE_3__["SEMANTIC"].COLOR].set(colors[i * 4], colors[i * 4 + 1], colors[i * 4 + 2], colors[i * 4 + 3]);
            }
            if (uvs !== null) {
                setter[_conf__WEBPACK_IMPORTED_MODULE_3__["SEMANTIC"].TEXCOORD0].set(uvs[i * 2], uvs[i * 2 + 1]);
            }
            if (uvs1 !== null) {
                setter[_conf__WEBPACK_IMPORTED_MODULE_3__["SEMANTIC"].TEXCOORD1].set(uvs1[i * 2], uvs1[i * 2 + 1]);
            }
            if (blendIndices !== null) {
                setter[_conf__WEBPACK_IMPORTED_MODULE_3__["SEMANTIC"].BLENDINDICES].set(blendIndices[i * 2], blendIndices[i * 2 + 1]);
            }
            if (blendWeights !== null) {
                setter[_conf__WEBPACK_IMPORTED_MODULE_3__["SEMANTIC"].BLENDWEIGHT].set(blendWeights[i * 2], blendWeights[i * 2 + 1]);
            }
            iterator.next();
        }
        vertexBuffer.bind();
        // Create the index buffer
        var indexBuffer = new _graphics_indexBuffer__WEBPACK_IMPORTED_MODULE_1__["IndexBuffer"](renderer, Uint16Array, _conf__WEBPACK_IMPORTED_MODULE_3__["BUFFER"].STATIC, indices);
        // let aabb = new BoundingBox();
        // aabb.compute(positions);
        var mesh = new Mesh();
        mesh.vertexBuffer = vertexBuffer;
        mesh.indexBuffer = indexBuffer;
        return mesh;
    };
    Mesh.defaultMaterial = new _material__WEBPACK_IMPORTED_MODULE_2__["BasicMaterial"]();
    // tslint:disable-next-line:member-ordering
    Mesh.createBox = createBox;
    return Mesh;
}());

var primitiveUv1Padding = 4 / 64;
var primitiveUv1PaddingScale = 1 - primitiveUv1Padding * 2;
function createBox(renderer, opts) {
    // Check the supplied options and provide defaults for unspecified ones
    var he = opts && opts.halfExtents !== undefined ? opts.halfExtents : new _math__WEBPACK_IMPORTED_MODULE_5__["Vec3"](0.5, 0.5, 0.5);
    var ws = opts && opts.widthSegments !== undefined ? opts.widthSegments : 1;
    var ls = opts && opts.lengthSegments !== undefined ? opts.lengthSegments : 1;
    var hs = opts && opts.heightSegments !== undefined ? opts.heightSegments : 1;
    var corners = [
        new _math__WEBPACK_IMPORTED_MODULE_5__["Vec3"](-he.x, -he.y, he.z),
        new _math__WEBPACK_IMPORTED_MODULE_5__["Vec3"](he.x, -he.y, he.z),
        new _math__WEBPACK_IMPORTED_MODULE_5__["Vec3"](he.x, he.y, he.z),
        new _math__WEBPACK_IMPORTED_MODULE_5__["Vec3"](-he.x, he.y, he.z),
        new _math__WEBPACK_IMPORTED_MODULE_5__["Vec3"](he.x, -he.y, -he.z),
        new _math__WEBPACK_IMPORTED_MODULE_5__["Vec3"](-he.x, -he.y, -he.z),
        new _math__WEBPACK_IMPORTED_MODULE_5__["Vec3"](-he.x, he.y, -he.z),
        new _math__WEBPACK_IMPORTED_MODULE_5__["Vec3"](he.x, he.y, -he.z)
    ];
    var faceAxes = [
        [0, 1, 3],
        [4, 5, 7],
        [3, 2, 6],
        [1, 0, 4],
        [1, 4, 2],
        [5, 0, 6] // LEFT
    ];
    var faceNormals = [
        [0, 0, 1],
        [0, 0, -1],
        [0, 1, 0],
        [0, -1, 0],
        [1, 0, 0],
        [-1, 0, 0] // LEFT
    ];
    var sides = {
        FRONT: 0,
        BACK: 1,
        TOP: 2,
        BOTTOM: 3,
        RIGHT: 4,
        LEFT: 5
    };
    var positions = [];
    var normals = [];
    var uvs = [];
    var uvs1 = [];
    var indices = [];
    var vcounter = 0;
    var generateFace = function (side, uSegments, vSegments) {
        // tslint:disable-next-line:one-variable-per-declaration
        var u, v;
        // tslint:disable-next-line:one-variable-per-declaration
        var i, j;
        var offset = positions.length / 3;
        for (i = 0; i <= uSegments; i++) {
            for (j = 0; j <= vSegments; j++) {
                var temp1 = new _math__WEBPACK_IMPORTED_MODULE_5__["Vec3"]();
                var temp2 = new _math__WEBPACK_IMPORTED_MODULE_5__["Vec3"]();
                var temp3 = new _math__WEBPACK_IMPORTED_MODULE_5__["Vec3"]();
                var r = new _math__WEBPACK_IMPORTED_MODULE_5__["Vec3"]();
                temp1.lerp(corners[faceAxes[side][0]], corners[faceAxes[side][1]], i / uSegments);
                temp2.lerp(corners[faceAxes[side][0]], corners[faceAxes[side][2]], j / vSegments);
                temp3.sub2(temp2, corners[faceAxes[side][0]]);
                r.add2(temp1, temp3);
                u = i / uSegments;
                v = j / vSegments;
                positions.push(r.x, r.y, r.z);
                normals.push(faceNormals[side][0], faceNormals[side][1], faceNormals[side][2]);
                uvs.push(u, v);
                // pack as 3x2
                // 1/3 will be empty, but it's either that or stretched pixels
                // TODO: generate non-rectangular lightMaps, so we could use space without stretching
                u /= 3;
                v /= 3;
                u = u * primitiveUv1PaddingScale + primitiveUv1Padding;
                v = v * primitiveUv1PaddingScale + primitiveUv1Padding;
                u += (side % 3) / 3;
                v += Math.floor(side / 3) / 3;
                uvs1.push(u, v);
                if ((i < uSegments) && (j < vSegments)) {
                    indices.push(vcounter + vSegments + 1, vcounter + 1, vcounter);
                    indices.push(vcounter + vSegments + 1, vcounter + vSegments + 2, vcounter + 1);
                }
                vcounter++;
            }
        }
    };
    generateFace(sides.FRONT, ws, hs);
    generateFace(sides.BACK, ws, hs);
    generateFace(sides.TOP, ws, ls);
    generateFace(sides.BOTTOM, ws, ls);
    generateFace(sides.RIGHT, ls, hs);
    generateFace(sides.LEFT, ls, hs);
    var options = {
        positions: positions,
        normals: normals,
        uvs: uvs,
        uvs1: uvs1,
        indices: indices
    };
    return Mesh.createMesh(renderer, options);
}


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
 * Last Modified: Monday, September 3rd 2018, 9:29:05 pm
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
        this.worldMatrixInverse = new _math__WEBPACK_IMPORTED_MODULE_0__["Mat4"]().setLookAt(new _math__WEBPACK_IMPORTED_MODULE_0__["Vec3"](0, 0, 0), new _math__WEBPACK_IMPORTED_MODULE_0__["Vec3"](0, 0, 1), new _math__WEBPACK_IMPORTED_MODULE_0__["Vec3"](0, 1, 0)).invert();
        // quaternion: Quat = new Quat();
        // scala: Vec3 = new Vec3();
        this.projectionMatrix = new _math__WEBPACK_IMPORTED_MODULE_0__["Mat4"]();
        // TODO
        this.projectionMatrix.setPerspective(fov, aspect, near, far);
        this.position = this.worldMatrixInverse.getTranslation();
    }
    Camera.prototype.lookAt = function (target) {
        // TODO
        this.worldMatrixInverse.setLookAt(this.position, target, new _math__WEBPACK_IMPORTED_MODULE_0__["Vec3"](0, 1, 0)).invert();
    };
    Object.defineProperty(Camera.prototype, "PVMatrix", {
        get: function () {
            return new _math__WEBPACK_IMPORTED_MODULE_0__["Mat4"]().mul(this.projectionMatrix).mul(this.worldMatrixInverse);
        },
        enumerable: true,
        configurable: true
    });
    return Camera;
}());



/***/ }),

/***/ "./src/scene/node.ts":
/*!***************************!*\
  !*** ./src/scene/node.ts ***!
  \***************************/
/*! exports provided: SceneNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SceneNode", function() { return SceneNode; });
/* harmony import */ var _core_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/element */ "./src/core/element.ts");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math */ "./src/math/index.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./src/util.ts");
/*
 * ProjectName: hypergl
 * FilePath: \src\scene\node.ts
 * Created Date: Saturday, August 18th 2018, 10:49:00 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, September 3rd 2018, 9:29:05 pm
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



var scaleCompensatePosTransform = new _math__WEBPACK_IMPORTED_MODULE_1__["Mat4"]();
var scaleCompensatePos = new _math__WEBPACK_IMPORTED_MODULE_1__["Vec3"]();
var scaleCompensateRot = new _math__WEBPACK_IMPORTED_MODULE_1__["Quat"]();
var scaleCompensateRot2 = new _math__WEBPACK_IMPORTED_MODULE_1__["Quat"]();
var scaleCompensateScale = new _math__WEBPACK_IMPORTED_MODULE_1__["Vec3"]();
var scaleCompensateScaleForParent = new _math__WEBPACK_IMPORTED_MODULE_1__["Vec3"]();
var SceneNode = /** @class */ (function (_super) {
    __extends(SceneNode, _super);
    function SceneNode() {
        var _this = _super.call(this) || this;
        // local
        _this.localPosition = new _math__WEBPACK_IMPORTED_MODULE_1__["Vec3"](0, 0, 0);
        _this.localRotation = new _math__WEBPACK_IMPORTED_MODULE_1__["Quat"](0, 0, 0, 1);
        _this.localScale = new _math__WEBPACK_IMPORTED_MODULE_1__["Vec3"](1, 1, 1);
        _this.localEulerAngles = new _math__WEBPACK_IMPORTED_MODULE_1__["Vec3"](0, 0, 0);
        _this.localTransform = new _math__WEBPACK_IMPORTED_MODULE_1__["Mat4"]();
        _this.children = [];
        // World-space
        _this.position = new _math__WEBPACK_IMPORTED_MODULE_1__["Vec3"](0, 0, 0);
        _this.rotation = new _math__WEBPACK_IMPORTED_MODULE_1__["Quat"](0, 0, 0, 1);
        _this.eulerAngles = new _math__WEBPACK_IMPORTED_MODULE_1__["Vec3"](0, 0, 0);
        _this.worldTransform = new _math__WEBPACK_IMPORTED_MODULE_1__["Mat4"]();
        _this.dirtyNormal = true;
        _this.scaleCompensation = false;
        _this._dirtyLocal = false;
        _this._dirtyWorld = false;
        _this._up = new _math__WEBPACK_IMPORTED_MODULE_1__["Vec3"]();
        return _this;
    }
    SceneNode.prototype.lookAt = function (target) {
        // TODO
        var targetLocation = target.getPosition();
        var up = target.up;
        var mat4 = new _math__WEBPACK_IMPORTED_MODULE_1__["Mat4"]().setLookAt(this.getPosition(), targetLocation, up);
        var quat = new _math__WEBPACK_IMPORTED_MODULE_1__["Quat"]().setFromMat4(mat4);
        this.setRotation(quat);
    };
    SceneNode.prototype.addChild = function (child) {
        this.children.push(child);
        child.parent = this;
        child.scene = this.scene;
        this.scene.layer.push(child);
    };
    SceneNode.prototype.setPosition = function (x, y, z) {
        var position = new _math__WEBPACK_IMPORTED_MODULE_1__["Vec3"]();
        if (x instanceof _math__WEBPACK_IMPORTED_MODULE_1__["Vec3"]) {
            position.copy(x);
        }
        else {
            position.set(x, y, z);
        }
        if (this.parent == null) {
            this.localPosition = position;
        }
        else {
            var invParentWtm = new _math__WEBPACK_IMPORTED_MODULE_1__["Mat4"]().copy(this.parent.getWorldTransform()).invert();
            invParentWtm.transformPoint(position, this.localPosition);
        }
        if (!this._dirtyLocal) {
            this._dirtify(true);
        }
    };
    /**
     * 获取世界坐标
     * @returns
     * @memberof INode
     */
    SceneNode.prototype.getPosition = function () {
        this.getWorldTransform().getTranslation(this.position);
        return this.position;
    };
    SceneNode.prototype.setLocalEulerAngles = function (x, y, z) {
        if (x instanceof _math__WEBPACK_IMPORTED_MODULE_1__["Vec3"]) {
            this.localRotation.setFromEulerAngles(x.data[0], x.data[1], x.data[2]);
        }
        else {
            this.localRotation.setFromEulerAngles(x, y, z);
        }
        if (!this._dirtyLocal) {
            this._dirtify(true);
        }
    };
    SceneNode.prototype.getLocalEulerAngles = function () {
        this.localRotation.getEulerAngles(this.localEulerAngles);
        return this.localEulerAngles;
    };
    SceneNode.prototype.setEulerAngles = function (x, y, z) {
        if (x instanceof _math__WEBPACK_IMPORTED_MODULE_1__["Vec3"]) {
            this.localRotation.setFromEulerAngles(x.data[0], x.data[1], x.data[2]);
        }
        else {
            this.localRotation.setFromEulerAngles(x, y, z);
        }
        if (this.parent != null) {
            var parentRot = this.parent.getRotation();
            var invParentRot = new _math__WEBPACK_IMPORTED_MODULE_1__["Quat"]().copy(parentRot).invert();
            this.localRotation.mul2(invParentRot, this.localRotation);
        }
        if (!this._dirtyLocal) {
            this._dirtify(true);
        }
    };
    SceneNode.prototype.getEulerAngles = function () {
        this.getWorldTransform().getEulerAngles(this.eulerAngles);
        return this.eulerAngles;
    };
    SceneNode.prototype.setLocalPosition = function (x, y, z) {
        if (x instanceof _math__WEBPACK_IMPORTED_MODULE_1__["Vec3"]) {
            this.localPosition.copy(x);
        }
        else {
            this.localPosition.set(x, y, z);
        }
        // this.localPosition.copy(vec3);
        if (!this._dirtyLocal) {
            this._dirtify(true);
        }
    };
    SceneNode.prototype.getLocalPosition = function () {
        return this.localPosition;
    };
    SceneNode.prototype.setRotation = function (x, y, z, w) {
        var rotation;
        if (x instanceof _math__WEBPACK_IMPORTED_MODULE_1__["Quat"]) {
            rotation = x;
        }
        else {
            rotation = new _math__WEBPACK_IMPORTED_MODULE_1__["Quat"](x, y, z, w);
        }
        if (this.parent == null) {
            this.localRotation.copy(rotation);
        }
        else {
            var parentRot = this.parent.getRotation();
            var invParentRot = new _math__WEBPACK_IMPORTED_MODULE_1__["Quat"]().copy(parentRot).invert();
            this.localRotation.copy(invParentRot).mul(rotation);
        }
        if (!this._dirtyLocal) {
            this._dirtify(true);
        }
    };
    SceneNode.prototype.getRotation = function () {
        this.rotation.setFromMat4(this.getWorldTransform());
        return this.rotation;
    };
    SceneNode.prototype.getWorldTransform = function () {
        if (!this._dirtyLocal && !this._dirtyWorld) {
            return this.worldTransform;
        }
        if (this.parent) {
            this.parent.getWorldTransform();
        }
        this._sync();
        return this.worldTransform;
    };
    SceneNode.prototype.setLocalScale = function (x, y, z) {
        if (x instanceof _math__WEBPACK_IMPORTED_MODULE_1__["Vec3"]) {
            this.localScale.copy(x);
        }
        else {
            this.localScale.set(x, y, z);
        }
        if (!this._dirtyLocal) {
            this._dirtify(true);
        }
    };
    SceneNode.prototype.getLocalScale = function () {
        return this.localScale;
    };
    SceneNode.prototype.rotate = function (x, y, z) {
        var quaternion = new _math__WEBPACK_IMPORTED_MODULE_1__["Quat"]();
        var invParentRot = new _math__WEBPACK_IMPORTED_MODULE_1__["Quat"]();
        if (x instanceof _math__WEBPACK_IMPORTED_MODULE_1__["Vec3"]) {
            quaternion.setFromEulerAngles(x.data[0], x.data[1], x.data[2]);
        }
        else {
            quaternion.setFromEulerAngles(x, y, z);
        }
        if (this.parent == null) {
            this.localRotation.mul2(quaternion, this.localRotation);
        }
        else {
            var rot = this.getRotation();
            var parentRot = this.parent.getRotation();
            invParentRot.copy(parentRot).invert();
            quaternion.mul2(invParentRot, quaternion);
            this.localRotation.mul2(quaternion, rot);
        }
        if (!this._dirtyLocal) {
            this._dirtify(true);
        }
    };
    SceneNode.prototype.rotateLocal = function (x, y, z) {
        var quaternion = new _math__WEBPACK_IMPORTED_MODULE_1__["Quat"]();
        if (x instanceof _math__WEBPACK_IMPORTED_MODULE_1__["Vec3"]) {
            quaternion.setFromEulerAngles(x.data[0], x.data[1], x.data[2]);
        }
        else {
            quaternion.setFromEulerAngles(x, y, z);
        }
        this.localRotation.mul(quaternion);
        if (!this._dirtyLocal) {
            this._dirtify(true);
        }
    };
    // 更新此节点及其所有后代的世界转换矩阵。
    SceneNode.prototype.syncHierarchy = function () {
        if (!this.enable) {
            return;
        }
        if (this._dirtyLocal || this._dirtyWorld) {
            this._sync();
        }
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].syncHierarchy();
        }
    };
    SceneNode.prototype._sync = function () {
        if (this._dirtyLocal) {
            this.localTransform.setTRS(this.localPosition, this.localRotation, this.localScale);
            this._dirtyLocal = false;
        }
        if (this._dirtyWorld) {
            if (this.parent == null) {
                this.worldTransform.copy(this.localTransform);
            }
            else {
                if (this.scaleCompensation) {
                    var parentWorldScale = void 0;
                    var parent = this.parent;
                    // Find a parent of the first uncompensated node up in the hierarchy and use its scale * localScale
                    var scale = this.localScale;
                    var parentToUseScaleFrom = parent; // current parent
                    if (parentToUseScaleFrom) {
                        while (parentToUseScaleFrom && parentToUseScaleFrom.scaleCompensation) {
                            parentToUseScaleFrom = parentToUseScaleFrom.parent;
                        }
                        // topmost node with scale compensation
                        if (parentToUseScaleFrom) {
                            parentToUseScaleFrom = parentToUseScaleFrom.parent;
                        } // node without scale compensation
                        if (parentToUseScaleFrom) {
                            parentWorldScale = parentToUseScaleFrom.worldTransform.getScale();
                            scaleCompensateScale.mul2(parentWorldScale, this.localScale);
                            scale = scaleCompensateScale;
                        }
                    }
                    // Rotation is as usual
                    scaleCompensateRot2.setFromMat4(parent.worldTransform);
                    scaleCompensateRot.mul2(scaleCompensateRot2, this.localRotation);
                    // Find matrix to transform position
                    var tmatrix = parent.worldTransform;
                    if (parent.scaleCompensation) {
                        _util__WEBPACK_IMPORTED_MODULE_2__["Log"].assert(parentWorldScale, 'parentWorldScale 不能是null');
                        scaleCompensateScaleForParent.mul2(parentWorldScale, parent.getLocalScale());
                        scaleCompensatePosTransform.setTRS(parent.worldTransform.getTranslation(scaleCompensatePos), scaleCompensateRot2, scaleCompensateScaleForParent);
                        tmatrix = scaleCompensatePosTransform;
                    }
                    tmatrix.transformPoint(this.localPosition, scaleCompensatePos);
                    this.worldTransform.setTRS(scaleCompensatePos, scaleCompensateRot, scale);
                }
                else {
                    this.worldTransform.mul2(this.parent.worldTransform, this.localTransform);
                }
            }
            this._dirtyWorld = false;
        }
    };
    Object.defineProperty(SceneNode.prototype, "root", {
        get: function () {
            var parent = this.parent;
            if (!parent) {
                return this;
            }
            while (parent.parent) {
                parent = parent.parent;
            }
            return parent;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 标记自己和儿子“脏” 需要重新获取位置
     *
     * @private
     * @param {boolean} [local]
     * @returns
     * @memberof INode
     */
    SceneNode.prototype._dirtify = function (local) {
        if ((!local || (local && this._dirtyLocal)) && this._dirtyWorld) {
            return;
        }
        if (local) {
            this._dirtyLocal = true;
        }
        if (!this._dirtyWorld) {
            this._dirtyWorld = true;
            var i = this.children.length;
            while (i--) {
                if (this.children[i]._dirtyWorld) {
                    continue;
                }
                this.children[i]._dirtify();
            }
        }
        this.dirtyNormal = true;
        // this._aabbVer++;
        // TODO
    };
    Object.defineProperty(SceneNode.prototype, "up", {
        get: function () {
            return this.getWorldTransform().getY(this._up).normalize();
        },
        enumerable: true,
        configurable: true
    });
    return SceneNode;
}(_core_element__WEBPACK_IMPORTED_MODULE_0__["IElement"]));



/***/ }),

/***/ "./src/scene/renderScence.ts":
/*!***********************************!*\
  !*** ./src/scene/renderScence.ts ***!
  \***********************************/
/*! exports provided: renderScence */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderScence", function() { return renderScence; });
/*
 * ProjectName: hypergl
 * FilePath: \src\scene\forward-renderer.ts
 * Created Date: Saturday, August 18th 2018, 10:15:48 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, September 3rd 2018, 9:29:05 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */
function renderScence(scene) {
    var entitys = scene.layer;
    var camera = scene.activeCamera;
    var renderer = scene.app.rendererPlatform;
    renderer.initDraw();
    // TODO
    for (var i = 0; i < entitys.length; i++) {
        var entity = entitys[i];
        var mesh = entity.mesh;
        if (mesh == null) {
            return;
        }
        var material = mesh.material;
        material.updateShader(renderer);
        var shader = mesh.material.shader;
        renderer.setShader(shader);
        shader.setUniformValue('matrix_viewProjection', camera.PVMatrix.data);
        // tslint:disable-next-line:forin
        for (var key in material.parameters) {
            shader.setUniformValue(key, material.parameters[key]);
        }
        renderer.draw(entity);
    }
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
/* harmony import */ var _renderScence__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderScence */ "./src/scene/renderScence.ts");
/* harmony import */ var _ecs_entity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ecs/entity */ "./src/ecs/entity.ts");
/*
 * ProjectName: hypergl
 * FilePath: \src\scene.ts
 * Created Date: Saturday, August 18th 2018, 4:22:49 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Monday, September 3rd 2018, 9:29:05 pm
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
        _this.layer = [];
        _this.root = new _ecs_entity__WEBPACK_IMPORTED_MODULE_2__["Entity"]();
        _this.cameras = [];
        _this.root.scene = _this;
        return _this;
    }
    Object.defineProperty(Scene.prototype, "activeCamera", {
        get: function () {
            return this._activeCamera || this.cameras[0];
        },
        set: function (x) {
            this._activeCamera = x;
        },
        enumerable: true,
        configurable: true
    });
    Scene.prototype.render = function () {
        this.root.syncHierarchy();
        Object(_renderScence__WEBPACK_IMPORTED_MODULE_1__["renderScence"])(this);
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
 * Last Modified: Saturday, September 1st 2018, 2:05:52 pm
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
    function assert(condition, message, log) {
        if (!condition) {
            // tslint:disable-next-line:no-unused-expression
            log && console.error(log);
            throw new Error(message);
        }
    }
    Log.assert = assert;
    function warning(condition, message) {
        if (condition) {
            console.warn(message);
        }
    }
    Log.warning = warning;
    function warn(condition, message) {
        console.warn(message);
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