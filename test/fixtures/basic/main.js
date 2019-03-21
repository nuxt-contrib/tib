/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	__webpack_require__.p = "/.vue-meta/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["../fixtures/basic/client.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../node_modules/babel-loader/lib/index.js?!../../node_modules/vue-loader/lib/index.js?!../fixtures/basic/App.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** /var/www/projects.github/vue-meta/node_modules/babel-loader/lib??ref--0!/var/www/projects.github/vue-meta/node_modules/vue-loader/lib??vue-loader-options!../fixtures/basic/App.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  metaInfo: function metaInfo() {
    var _this = this;

    return {
      meta: [{
        vmid: 'charset',
        charset: 'utf-8'
      }],
      afterNavigation: function afterNavigation() {
        _this.$emit('routeChanged');
      }
    };
  },
  mounted: function mounted() {
    window.$vueMeta = this;
  }
});

/***/ }),

/***/ "../../node_modules/babel-loader/lib/index.js?!../../node_modules/vue-loader/lib/index.js?!../fixtures/basic/views/about.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** /var/www/projects.github/vue-meta/node_modules/babel-loader/lib??ref--0!/var/www/projects.github/vue-meta/node_modules/vue-loader/lib??vue-loader-options!../fixtures/basic/views/about.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  metaInfo: function metaInfo() {
    return {
      title: 'About'
    };
  }
});

/***/ }),

/***/ "../../node_modules/babel-loader/lib/index.js?!../../node_modules/vue-loader/lib/index.js?!../fixtures/basic/views/home.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** /var/www/projects.github/vue-meta/node_modules/babel-loader/lib??ref--0!/var/www/projects.github/vue-meta/node_modules/vue-loader/lib??vue-loader-options!../fixtures/basic/views/home.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  metaInfo: function metaInfo() {
    return {
      title: 'Home',
      titleTemplate: '%s | Vue Meta Test',
      htmlAttrs: {
        lang: 'en',
        allowfullscreen: undefined,
        amp: true
      },
      headAttrs: {
        test: true
      },
      meta: [{
        name: 'description',
        content: 'Hello',
        vmid: 'test'
      }],
      script: [{
        vmid: 'ldjson',
        innerHTML: '{ "@context": "http://www.schema.org", "@type": "Organization" }',
        type: 'application/ld+json'
      }, {
        innerHTML: '{ "more": "data" }',
        type: 'application/ld+json'
      }],
      noscript: [{
        innerHTML: '{ "body": "yes" }',
        body: true,
        type: 'application/ld+json'
      }],
      __dangerouslyDisableSanitizers: ['noscript'],
      __dangerouslyDisableSanitizersByTagID: {
        ldjson: ['innerHTML']
      }
    };
  }
});

/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!../fixtures/basic/App.vue?vue&type=template&id=1e38b0e9&":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /var/www/projects.github/vue-meta/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/var/www/projects.github/vue-meta/node_modules/vue-loader/lib??vue-loader-options!../fixtures/basic/App.vue?vue&type=template&id=1e38b0e9& ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "app" } },
    [
      _c("h1", [_vm._v("Basic")]),
      _vm._v(" "),
      _c("router-view"),
      _vm._v(" "),
      _c("p", [_vm._v("Inspect Element to see the meta info")])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!../fixtures/basic/views/about.vue?vue&type=template&id=6a878a14&":
/*!**********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /var/www/projects.github/vue-meta/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/var/www/projects.github/vue-meta/node_modules/vue-loader/lib??vue-loader-options!../fixtures/basic/views/about.vue?vue&type=template&id=6a878a14& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("h2", [_vm._v("About")]),
      _vm._v(" "),
      _c("router-link", { attrs: { to: "/" } }, [_vm._v("Go to Home")])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!../fixtures/basic/views/home.vue?vue&type=template&id=2b0853a8&":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /var/www/projects.github/vue-meta/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/var/www/projects.github/vue-meta/node_modules/vue-loader/lib??vue-loader-options!../fixtures/basic/views/home.vue?vue&type=template&id=2b0853a8& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("h2", [_vm._v("Home")]),
      _vm._v(" "),
      _c("router-link", { attrs: { to: "/about" } }, [_vm._v("Go to About")])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../package.json":
/*!******************************************************!*\
  !*** /var/www/projects.github/vue-meta/package.json ***!
  \******************************************************/
/*! exports provided: name, version, description, keywords, homepage, bugs, repository, license, author, files, main, web, module, typings, scripts, dependencies, devDependencies, default */
/***/ (function(module) {

module.exports = {"name":"vue-meta","version":"1.5.8","description":"Manage page meta info in Vue 2.0 server-rendered apps","keywords":["attribute","google","head","helmet","info","meta","seo","server","ssr","title","universal","vue"],"homepage":"https://github.com/nuxt/vue-meta","bugs":"https://github.com/nuxt/vue-meta/issues","repository":{"type":"git","url":"git@github.com/nuxt/vue-meta.git"},"license":"MIT","author":"Declan de Wet <declandewet@me.com>","files":["lib","es","types/index.d.ts","types/vue.d.ts"],"main":"lib/vue-meta.common.js","web":"lib/vue-meta.js","module":"es/index.js","typings":"types/index.d.ts","scripts":{"build":"yarn build:other && yarn build:es","build:es":"rimraf es && babel src --env-name es --out-dir es","build:other":"rimraf lib && rollup -c scripts/rollup.config.js","coverage":"codecov","predeploy":"git checkout master && git pull -r","deploy":"npm version","postdeploy":"git push origin master --follow-tags && npm run release","dev":"cd examples && npm run dev && cd ..","lint":"eslint src test","prerelease":"npm run build","release":"npm publish","test":"yarn test:unit && yarn test:e2e-ssr && yarn test:e2e-browser","test:e2e-ssr":"jest test/e2e/ssr","test:e2e-browser":"jest test/e2e/browser","test:unit":"jest test/unit"},"dependencies":{"deepmerge":"^3.2.0"},"devDependencies":{"@babel/cli":"^7.2.3","@babel/core":"^7.4.0","@babel/node":"^7.2.2","@babel/plugin-syntax-dynamic-import":"^7.2.0","@babel/preset-env":"^7.4.1","@nuxt/babel-preset-app":"^2.4.5","@nuxtjs/eslint-config":"^0.0.1","@vue/server-test-utils":"^1.0.0-beta.29","@vue/test-utils":"^1.0.0-beta.29","babel-core":"^7.0.0-bridge","babel-eslint":"^10.0.1","babel-jest":"^24.5.0","babel-loader":"^8.0.5","babel-plugin-dynamic-import-node":"^2.2.0","browserstack-local":"^1.3.7","chromedriver":"^2.46.0","codecov":"^3.2.0","eslint":"^5.15.3","eslint-config-standard":"^12.0.0","eslint-plugin-import":"^2.16.0","eslint-plugin-jest":"^22.4.1","eslint-plugin-node":"^8.0.1","eslint-plugin-promise":"^4.0.1","eslint-plugin-standard":"^4.0.0","eslint-plugin-vue":"^5.2.2","esm":"^3.2.18","fs-extra":"^7.0.1","geckodriver":"^1.16.0","is-wsl":"^1.1.0","jest":"^24.5.0","jest-environment-jsdom":"^24.5.0","jest-environment-jsdom-global":"^1.2.0","jsdom":"^14.0.0","lodash":"^4.17.11","node-env-file":"^0.1.8","puppeteer-core":"^1.13.0","rimraf":"^2.6.3","rollup":"^1.7.0","rollup-plugin-buble":"^0.19.6","rollup-plugin-commonjs":"^9.2.1","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^4.0.1","rollup-plugin-replace":"^2.1.1","rollup-plugin-terser":"^4.0.4","selenium-webdriver":"^4.0.0-alpha.1","standard-version":"^5.0.2","tib":"^0.2.2","tree-kill":"^1.2.1","vue":"^2.6.10","vue-jest":"^3.0.4","vue-loader":"^15.7.0","vue-router":"^3.0.2","vue-server-renderer":"^2.6.10","vue-template-compiler":"^2.6.10","vuepress":"^0.14.10","vuepress-theme-vue":"^1.1.0","webpack":"^4.29.6"}};

/***/ }),

/***/ "../../src/browser.js":
/*!********************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/browser.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../package.json");
var _package_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../package.json */ "../../package.json", 1);
/* harmony import */ var _shared_mixin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/mixin */ "../../src/shared/mixin.js");
/* harmony import */ var _shared_options__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/options */ "../../src/shared/options.js");
/* harmony import */ var _utils_is_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/is-type */ "../../src/utils/is-type.js");
/* harmony import */ var _client_$meta__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./client/$meta */ "../../src/client/$meta.js");
/* harmony import */ var _shared_meta_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shared/meta-helpers */ "../../src/shared/meta-helpers.js");






/**
 * Plugin install function.
 * @param {Function} Vue - the Vue constructor.
 */

function install(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  options = Object(_shared_options__WEBPACK_IMPORTED_MODULE_2__["setOptions"])(options);
  Vue.prototype.$meta = Object(_client_$meta__WEBPACK_IMPORTED_MODULE_4__["default"])(options);
  Vue.mixin(Object(_shared_mixin__WEBPACK_IMPORTED_MODULE_1__["default"])(Vue, options));
} // automatic install


if (!Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_3__["isUndefined"])(window) && !Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_3__["isUndefined"])(window.Vue)) {
  /* istanbul ignore next */
  install(window.Vue);
}

/* harmony default export */ __webpack_exports__["default"] = ({
  version: _package_json__WEBPACK_IMPORTED_MODULE_0__["version"],
  install: install,
  hasMetaInfo: _shared_meta_helpers__WEBPACK_IMPORTED_MODULE_5__["hasMetaInfo"]
});

/***/ }),

/***/ "../../src/client/$meta.js":
/*!*************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/client/$meta.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _$meta; });
/* harmony import */ var _shared_options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/options */ "../../src/shared/options.js");
/* harmony import */ var _shared_pausing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/pausing */ "../../src/shared/pausing.js");
/* harmony import */ var _refresh__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./refresh */ "../../src/client/refresh.js");



function _$meta() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _refresh = Object(_refresh__WEBPACK_IMPORTED_MODULE_2__["default"])(options);

  var inject = function inject() {};
  /**
   * Returns an injector for server-side rendering.
   * @this {Object} - the Vue instance (a root component)
   * @return {Object} - injector
   */


  return function $meta() {
    return {
      getOptions: function getOptions() {
        return Object(_shared_options__WEBPACK_IMPORTED_MODULE_0__["getOptions"])(options);
      },
      refresh: _refresh.bind(this),
      inject: inject,
      pause: _shared_pausing__WEBPACK_IMPORTED_MODULE_1__["pause"].bind(this),
      resume: _shared_pausing__WEBPACK_IMPORTED_MODULE_1__["resume"].bind(this)
    };
  };
}

/***/ }),

/***/ "../../src/client/batchUpdate.js":
/*!*******************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/client/batchUpdate.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return batchUpdate; });
/* harmony import */ var _utils_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/window */ "../../src/utils/window.js");
 // fallback to timers if rAF not present

var stopUpdate = (_utils_window__WEBPACK_IMPORTED_MODULE_0__["hasGlobalWindow"] ? window.cancelAnimationFrame : null) || clearTimeout;

var startUpdate = (_utils_window__WEBPACK_IMPORTED_MODULE_0__["hasGlobalWindow"] ? window.requestAnimationFrame : null) || function (cb) {
  return setTimeout(cb, 0);
};
/**
 * Performs a batched update. Uses requestAnimationFrame to prevent
 * calling a function too many times in quick succession.
 * You need to pass it an ID (which can initially be `null`),
 * but be sure to overwrite that ID with the return value of batchUpdate.
 *
 * @param  {(null|Number)} id - the ID of this update
 * @param  {Function} callback - the update to perform
 * @return {Number} id - a new ID
 */


function batchUpdate(id, callback) {
  stopUpdate(id);
  return startUpdate(function () {
    id = null;
    callback();
  });
}

/***/ }),

/***/ "../../src/client/refresh.js":
/*!***************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/client/refresh.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _refresh; });
/* harmony import */ var _shared_getMetaInfo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/getMetaInfo */ "../../src/shared/getMetaInfo.js");
/* harmony import */ var _utils_is_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/is-type */ "../../src/utils/is-type.js");
/* harmony import */ var _shared_escaping__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/escaping */ "../../src/shared/escaping.js");
/* harmony import */ var _updateClientMetaInfo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./updateClientMetaInfo */ "../../src/client/updateClientMetaInfo.js");




function _refresh() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  /**
   * When called, will update the current meta info with new meta info.
   * Useful when updating meta info as the result of an asynchronous
   * action that resolves after the initial render takes place.
   *
   * Credit to [Sébastien Chopin](https://github.com/Atinux) for the suggestion
   * to implement this method.
   *
   * @return {Object} - new meta info
   */
  return function refresh() {
    var metaInfo = Object(_shared_getMetaInfo__WEBPACK_IMPORTED_MODULE_0__["default"])(options, this.$root, _shared_escaping__WEBPACK_IMPORTED_MODULE_2__["clientSequences"]);
    var tags = Object(_updateClientMetaInfo__WEBPACK_IMPORTED_MODULE_3__["default"])(options, metaInfo); // emit "event" with new info

    if (tags && Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(metaInfo.changed)) {
      metaInfo.changed(metaInfo, tags.addedTags, tags.removedTags);
    }

    return {
      vm: this,
      metaInfo: metaInfo,
      tags: tags
    };
  };
}

/***/ }),

/***/ "../../src/client/triggerUpdate.js":
/*!*********************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/client/triggerUpdate.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return triggerUpdate; });
/* harmony import */ var _batchUpdate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./batchUpdate */ "../../src/client/batchUpdate.js");
 // store an id to keep track of DOM updates

var batchId = null;
function triggerUpdate(vm, hookName) {
  if (vm.$root._vueMeta.initialized && !vm.$root._vueMeta.paused) {
    // batch potential DOM updates to prevent extraneous re-rendering
    batchId = Object(_batchUpdate__WEBPACK_IMPORTED_MODULE_0__["default"])(batchId, function () {
      vm.$meta().refresh();
      batchId = null;
    });
  }
}

/***/ }),

/***/ "../../src/client/updateClientMetaInfo.js":
/*!****************************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/client/updateClientMetaInfo.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return updateClientMetaInfo; });
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/constants */ "../../src/shared/constants.js");
/* harmony import */ var _utils_is_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/is-type */ "../../src/utils/is-type.js");
/* harmony import */ var _utils_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/array */ "../../src/utils/array.js");
/* harmony import */ var _updaters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./updaters */ "../../src/client/updaters/index.js");





function getTag(tags, tag) {
  if (!tags[tag]) {
    tags[tag] = document.getElementsByTagName(tag)[0];
  }

  return tags[tag];
}
/**
 * Performs client-side updates when new meta info is received
 *
 * @param  {Object} newInfo - the meta info to update to
 */


function updateClientMetaInfo() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var newInfo = arguments.length > 1 ? arguments[1] : undefined;
  var ssrAttribute = options.ssrAttribute; // only cache tags for current update

  var tags = {};
  var htmlTag = getTag(tags, 'html'); // if this is a server render, then dont update

  if (htmlTag.hasAttribute(ssrAttribute)) {
    // remove the server render attribute so we can update on (next) changes
    htmlTag.removeAttribute(ssrAttribute);
    return false;
  } // initialize tracked changes


  var addedTags = {};
  var removedTags = {};

  for (var type in newInfo) {
    // ignore these
    if (Object(_utils_array__WEBPACK_IMPORTED_MODULE_2__["includes"])(_shared_constants__WEBPACK_IMPORTED_MODULE_0__["metaInfoOptionKeys"], type)) {
      continue;
    }

    if (type === 'title') {
      // update the title
      Object(_updaters__WEBPACK_IMPORTED_MODULE_3__["updateTitle"])(newInfo.title);
      continue;
    }

    if (Object(_utils_array__WEBPACK_IMPORTED_MODULE_2__["includes"])(_shared_constants__WEBPACK_IMPORTED_MODULE_0__["metaInfoAttributeKeys"], type)) {
      var tagName = type.substr(0, 4);
      Object(_updaters__WEBPACK_IMPORTED_MODULE_3__["updateAttribute"])(options, newInfo[type], getTag(tags, tagName));
      continue;
    } // tags should always be an array, ignore if it isnt


    if (!Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_1__["isArray"])(newInfo[type])) {
      continue;
    }

    var _updateTag = Object(_updaters__WEBPACK_IMPORTED_MODULE_3__["updateTag"])(options, type, newInfo[type], getTag(tags, 'head'), getTag(tags, 'body')),
        oldTags = _updateTag.oldTags,
        newTags = _updateTag.newTags;

    if (newTags.length) {
      addedTags[type] = newTags;
      removedTags[type] = oldTags;
    }
  }

  return {
    addedTags: addedTags,
    removedTags: removedTags
  };
}

/***/ }),

/***/ "../../src/client/updaters/attribute.js":
/*!**************************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/client/updaters/attribute.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return updateAttribute; });
/* harmony import */ var core_js_modules_es6_array_sort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.array.sort */ "../../node_modules/core-js/modules/es6.array.sort.js");
/* harmony import */ var core_js_modules_es6_array_sort__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_sort__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.regexp.split */ "../../node_modules/core-js/modules/es6.regexp.split.js");
/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/constants */ "../../src/shared/constants.js");
/* harmony import */ var _utils_array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/array */ "../../src/utils/array.js");
/* harmony import */ var _utils_is_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/is-type */ "../../src/utils/is-type.js");





/**
 * Updates the document's html tag attributes
 *
 * @param  {Object} attrs - the new document html attributes
 * @param  {HTMLElement} tag - the HTMLElement tag to update with new attrs
 */

function updateAttribute() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      attribute = _ref.attribute;

  var attrs = arguments.length > 1 ? arguments[1] : undefined;
  var tag = arguments.length > 2 ? arguments[2] : undefined;
  var vueMetaAttrString = tag.getAttribute(attribute);
  var vueMetaAttrs = vueMetaAttrString ? vueMetaAttrString.split(',') : [];
  var toRemove = Object(_utils_array__WEBPACK_IMPORTED_MODULE_3__["toArray"])(vueMetaAttrs);
  var keepIndexes = [];

  for (var attr in attrs) {
    if (attrs.hasOwnProperty(attr)) {
      var value = Object(_utils_array__WEBPACK_IMPORTED_MODULE_3__["includes"])(_shared_constants__WEBPACK_IMPORTED_MODULE_2__["booleanHtmlAttributes"], attr) ? '' : Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_4__["isArray"])(attrs[attr]) ? attrs[attr].join(' ') : attrs[attr];
      tag.setAttribute(attr, value || '');

      if (!Object(_utils_array__WEBPACK_IMPORTED_MODULE_3__["includes"])(vueMetaAttrs, attr)) {
        vueMetaAttrs.push(attr);
      } // filter below wont ever check -1


      keepIndexes.push(toRemove.indexOf(attr));
    }
  }

  var removedAttributesCount = toRemove.filter(function (el, index) {
    return !Object(_utils_array__WEBPACK_IMPORTED_MODULE_3__["includes"])(keepIndexes, index);
  }).reduce(function (acc, attr) {
    tag.removeAttribute(attr);
    return acc + 1;
  }, 0);

  if (vueMetaAttrs.length === removedAttributesCount) {
    tag.removeAttribute(attribute);
  } else {
    tag.setAttribute(attribute, vueMetaAttrs.sort().join(','));
  }
}

/***/ }),

/***/ "../../src/client/updaters/index.js":
/*!**********************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/client/updaters/index.js ***!
  \**********************************************************************/
/*! exports provided: updateAttribute, updateTitle, updateTag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _attribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attribute */ "../../src/client/updaters/attribute.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "updateAttribute", function() { return _attribute__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _title__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./title */ "../../src/client/updaters/title.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "updateTitle", function() { return _title__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tag */ "../../src/client/updaters/tag.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "updateTag", function() { return _tag__WEBPACK_IMPORTED_MODULE_2__["default"]; });





/***/ }),

/***/ "../../src/client/updaters/tag.js":
/*!********************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/client/updaters/tag.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return updateTag; });
/* harmony import */ var _utils_is_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/is-type */ "../../src/utils/is-type.js");
/* harmony import */ var _utils_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/array */ "../../src/utils/array.js");


/**
 * Updates meta tags inside <head> and <body> on the client. Borrowed from `react-helmet`:
 * https://github.com/nfl/react-helmet/blob/004d448f8de5f823d10f838b02317521180f34da/src/Helmet.js#L195-L245
 *
 * @param  {('meta'|'base'|'link'|'style'|'script'|'noscript')} type - the name of the tag
 * @param  {(Array<Object>|Object)} tags - an array of tag objects or a single object in case of base
 * @return {Object} - a representation of what tags changed
 */

function updateTag() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      attribute = _ref.attribute,
      tagIDKeyName = _ref.tagIDKeyName;

  var type = arguments.length > 1 ? arguments[1] : undefined;
  var tags = arguments.length > 2 ? arguments[2] : undefined;
  var headTag = arguments.length > 3 ? arguments[3] : undefined;
  var bodyTag = arguments.length > 4 ? arguments[4] : undefined;
  var oldHeadTags = Object(_utils_array__WEBPACK_IMPORTED_MODULE_1__["toArray"])(headTag.querySelectorAll("".concat(type, "[").concat(attribute, "]")));
  var oldBodyTags = Object(_utils_array__WEBPACK_IMPORTED_MODULE_1__["toArray"])(bodyTag.querySelectorAll("".concat(type, "[").concat(attribute, "][data-body=\"true\"]")));
  var dataAttributes = [tagIDKeyName, 'body'];
  var newTags = [];

  if (tags.length > 1) {
    // remove duplicates that could have been found by merging tags
    // which include a mixin with metaInfo and that mixin is used
    // by multiple components on the same page
    var found = [];
    tags = tags.filter(function (x) {
      var k = JSON.stringify(x);
      var res = !Object(_utils_array__WEBPACK_IMPORTED_MODULE_1__["includes"])(found, k);
      found.push(k);
      return res;
    });
  }

  if (tags.length) {
    tags.forEach(function (tag) {
      var newElement = document.createElement(type);
      newElement.setAttribute(attribute, 'true');
      var oldTags = tag.body !== true ? oldHeadTags : oldBodyTags;

      for (var attr in tag) {
        if (tag.hasOwnProperty(attr)) {
          if (attr === 'innerHTML') {
            newElement.innerHTML = tag.innerHTML;
          } else if (attr === 'cssText') {
            if (newElement.styleSheet) {
              /* istanbul ignore next */
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            var _attr = Object(_utils_array__WEBPACK_IMPORTED_MODULE_1__["includes"])(dataAttributes, attr) ? "data-".concat(attr) : attr;

            var value = Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(tag[attr]) ? '' : tag[attr];
            newElement.setAttribute(_attr, value);
          }
        }
      } // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.


      var indexToDelete;
      var hasEqualElement = oldTags.some(function (existingTag, index) {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      });

      if (hasEqualElement && (indexToDelete || indexToDelete === 0)) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }

  var oldTags = oldHeadTags.concat(oldBodyTags);
  oldTags.forEach(function (tag) {
    return tag.parentNode.removeChild(tag);
  });
  newTags.forEach(function (tag) {
    if (tag.getAttribute('data-body') === 'true') {
      bodyTag.appendChild(tag);
    } else {
      headTag.appendChild(tag);
    }
  });
  return {
    oldTags: oldTags,
    newTags: newTags
  };
}

/***/ }),

/***/ "../../src/client/updaters/title.js":
/*!**********************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/client/updaters/title.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return updateTitle; });
/**
 * Updates the document title
 *
 * @param  {String} title - the new title of the document
 */
function updateTitle() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.title;
  document.title = title;
}

/***/ }),

/***/ "../../src/shared/constants.js":
/*!*****************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/shared/constants.js ***!
  \*****************************************************************/
/*! exports provided: defaultInfo, keyName, attribute, ssrAttribute, tagIDKeyName, metaTemplateKeyName, contentKeyName, defaultOptions, metaInfoOptionKeys, disableOptionKeys, metaInfoAttributeKeys, tagsWithoutEndTag, tagsWithInnerContent, tagAttributeAsInnerContent, booleanHtmlAttributes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultInfo", function() { return defaultInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyName", function() { return keyName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attribute", function() { return attribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ssrAttribute", function() { return ssrAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tagIDKeyName", function() { return tagIDKeyName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "metaTemplateKeyName", function() { return metaTemplateKeyName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contentKeyName", function() { return contentKeyName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultOptions", function() { return defaultOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "metaInfoOptionKeys", function() { return metaInfoOptionKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disableOptionKeys", function() { return disableOptionKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "metaInfoAttributeKeys", function() { return metaInfoAttributeKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tagsWithoutEndTag", function() { return tagsWithoutEndTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tagsWithInnerContent", function() { return tagsWithInnerContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tagAttributeAsInnerContent", function() { return tagAttributeAsInnerContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "booleanHtmlAttributes", function() { return booleanHtmlAttributes; });
/**
 * These are constant variables used throughout the application.
 */
// set some sane defaults
var defaultInfo = {
  title: '',
  titleChunk: '',
  titleTemplate: '%s',
  htmlAttrs: {},
  bodyAttrs: {},
  headAttrs: {},
  base: [],
  link: [],
  meta: [],
  style: [],
  script: [],
  noscript: [],
  __dangerouslyDisableSanitizers: [],
  __dangerouslyDisableSanitizersByTagID: {} // This is the name of the component option that contains all the information that
  // gets converted to the various meta tags & attributes for the page.

};
var keyName = 'metaInfo'; // This is the attribute vue-meta arguments on elements to know which it should
// manage and which it should ignore.

var attribute = 'data-vue-meta'; // This is the attribute that goes on the `html` tag to inform `vue-meta`
// that the server has already generated the meta tags for the initial render.

var ssrAttribute = 'data-vue-meta-server-rendered'; // This is the property that tells vue-meta to overwrite (instead of append)
// an item in a tag list. For example, if you have two `meta` tag list items
// that both have `vmid` of "description", then vue-meta will overwrite the
// shallowest one with the deepest one.

var tagIDKeyName = 'vmid'; // This is the key name for possible meta templates

var metaTemplateKeyName = 'template'; // This is the key name for the content-holding property

var contentKeyName = 'content';
var defaultOptions = {
  keyName: keyName,
  attribute: attribute,
  ssrAttribute: ssrAttribute,
  tagIDKeyName: tagIDKeyName,
  contentKeyName: contentKeyName,
  metaTemplateKeyName: metaTemplateKeyName // List of metaInfo property keys which are configuration options (and dont generate html)

};
var metaInfoOptionKeys = ['titleChunk', 'titleTemplate', 'changed', '__dangerouslyDisableSanitizers', '__dangerouslyDisableSanitizersByTagID']; // The metaInfo property keys which are used to disable escaping

var disableOptionKeys = ['__dangerouslyDisableSanitizers', '__dangerouslyDisableSanitizersByTagID']; // List of metaInfo property keys which only generates attributes and no tags

var metaInfoAttributeKeys = ['htmlAttrs', 'headAttrs', 'bodyAttrs']; // HTML elements which dont have a head tag (shortened to our needs)
// see: https://www.w3.org/TR/html52/document-metadata.html

var tagsWithoutEndTag = ['base', 'meta', 'link']; // HTML elements which can have inner content (shortened to our needs)

var tagsWithInnerContent = ['noscript', 'script', 'style']; // Attributes which are inserted as childNodes instead of HTMLAttribute

var tagAttributeAsInnerContent = ['innerHTML', 'cssText']; // from: https://github.com/kangax/html-minifier/blob/gh-pages/src/htmlminifier.js#L202

var booleanHtmlAttributes = ['allowfullscreen', 'amp', 'async', 'autofocus', 'autoplay', 'checked', 'compact', 'controls', 'declare', 'default', 'defaultchecked', 'defaultmuted', 'defaultselected', 'defer', 'disabled', 'enabled', 'formnovalidate', 'hidden', 'indeterminate', 'inert', 'ismap', 'itemscope', 'loop', 'multiple', 'muted', 'nohref', 'noresize', 'noshade', 'novalidate', 'nowrap', 'open', 'pauseonexit', 'readonly', 'required', 'reversed', 'scoped', 'seamless', 'selected', 'sortable', 'truespeed', 'typemustmatch', 'visible'];

/***/ }),

/***/ "../../src/shared/escaping.js":
/*!****************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/shared/escaping.js ***!
  \****************************************************************/
/*! exports provided: serverSequences, clientSequences, escape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serverSequences", function() { return serverSequences; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clientSequences", function() { return clientSequences; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escape", function() { return escape; });
/* harmony import */ var core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es7.symbol.async-iterator */ "../../node_modules/core-js/modules/es7.symbol.async-iterator.js");
/* harmony import */ var core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.symbol */ "../../node_modules/core-js/modules/es6.symbol.js");
/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ "../../node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_is_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/is-type */ "../../src/utils/is-type.js");
/* harmony import */ var _utils_array__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/array */ "../../src/utils/array.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants */ "../../src/shared/constants.js");




function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var serverSequences = [[/&/g, '&amp;'], [/</g, '&lt;'], [/>/g, '&gt;'], [/"/g, '&quot;'], [/'/g, '&#x27;']];
var clientSequences = [[/&/g, "&"], [/</g, "<"], [/>/g, ">"], [/"/g, "\""], [/'/g, "'"]]; // sanitizes potentially dangerous characters

function escape(info, options, escapeOptions) {
  var tagIDKeyName = options.tagIDKeyName;
  var _escapeOptions$doEsca = escapeOptions.doEscape,
      doEscape = _escapeOptions$doEsca === void 0 ? function (v) {
    return v;
  } : _escapeOptions$doEsca;
  var escaped = {};

  for (var key in info) {
    var value = info[key]; // no need to escape configuration options

    if (Object(_utils_array__WEBPACK_IMPORTED_MODULE_4__["includes"])(_constants__WEBPACK_IMPORTED_MODULE_5__["metaInfoOptionKeys"], key)) {
      escaped[key] = value;
      continue;
    }

    var _disableOptionKeys = _slicedToArray(_constants__WEBPACK_IMPORTED_MODULE_5__["disableOptionKeys"], 1),
        disableKey = _disableOptionKeys[0];

    if (escapeOptions[disableKey] && Object(_utils_array__WEBPACK_IMPORTED_MODULE_4__["includes"])(escapeOptions[disableKey], key)) {
      // this info[key] doesnt need to escaped if the option is listed in __dangerouslyDisableSanitizers
      escaped[key] = value;
      continue;
    }

    var tagId = info[tagIDKeyName];

    if (tagId) {
      disableKey = _constants__WEBPACK_IMPORTED_MODULE_5__["disableOptionKeys"][1]; // keys which are listed in __dangerouslyDisableSanitizersByTagID for the current vmid do not need to be escaped

      if (escapeOptions[disableKey] && escapeOptions[disableKey][tagId] && Object(_utils_array__WEBPACK_IMPORTED_MODULE_4__["includes"])(escapeOptions[disableKey][tagId], key)) {
        escaped[key] = value;
        continue;
      }
    }

    if (Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_3__["isString"])(value)) {
      escaped[key] = doEscape(value);
    } else if (Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_3__["isArray"])(value)) {
      escaped[key] = value.map(function (v) {
        return Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_3__["isObject"])(v) ? escape(v, options, escapeOptions) : doEscape(v);
      });
    } else if (Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_3__["isObject"])(value)) {
      escaped[key] = escape(value, options, escapeOptions);
    } else {
      escaped[key] = value;
    }
  }

  return escaped;
}

/***/ }),

/***/ "../../src/shared/getComponentOption.js":
/*!**************************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/shared/getComponentOption.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getComponentOption; });
/* harmony import */ var _utils_is_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/is-type */ "../../src/utils/is-type.js");
/* harmony import */ var _utils_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/array */ "../../src/utils/array.js");
/* harmony import */ var _merge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./merge */ "../../src/shared/merge.js");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template */ "../../src/shared/template.js");
/* harmony import */ var _meta_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./meta-helpers */ "../../src/shared/meta-helpers.js");





/**
 * Returns the `opts.option` $option value of the given `opts.component`.
 * If methods are encountered, they will be bound to the component context.
 * If `opts.deep` is true, will recursively merge all child component
 * `opts.option` $option values into the returned result.
 *
 * @param  {Object} opts - options
 * @param  {Object} opts.component - Vue component to fetch option data from
 * @param  {Boolean} opts.deep - look for data in child components as well?
 * @param  {Function} opts.arrayMerge - how should arrays be merged?
 * @param  {String} opts.keyName - the name of the option to look for
 * @param  {Object} [result={}] - result so far
 * @return {Object} result - final aggregated result
 */

function getComponentOption() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var component = arguments.length > 1 ? arguments[1] : undefined;
  var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var keyName = options.keyName,
      metaTemplateKeyName = options.metaTemplateKeyName,
      tagIDKeyName = options.tagIDKeyName;
  var $options = component.$options,
      $children = component.$children;

  if (component._inactive) {
    return result;
  } // only collect option data if it exists


  if ($options[keyName]) {
    var data = $options[keyName]; // if option is a function, replace it with it's result

    if (Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(data)) {
      data = data.call(component);
    } // ignore data if its not an object, then we keep our previous result


    if (!Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_0__["isObject"])(data)) {
      return result;
    } // merge with existing options


    result = Object(_merge__WEBPACK_IMPORTED_MODULE_2__["merge"])(result, data, options);
  } // collect & aggregate child options if deep = true


  if ($children.length) {
    $children.forEach(function (childComponent) {
      // check if the childComponent is in a branch
      // return otherwise so we dont walk all component branches unnecessarily
      if (!Object(_meta_helpers__WEBPACK_IMPORTED_MODULE_4__["inMetaInfoBranch"])(childComponent)) {
        return;
      }

      result = getComponentOption(options, childComponent, result);
    });
  }

  if (metaTemplateKeyName && result.meta) {
    // apply templates if needed
    result.meta.forEach(function (metaObject) {
      return Object(_template__WEBPACK_IMPORTED_MODULE_3__["applyTemplate"])(options, metaObject);
    }); // remove meta items with duplicate vmid's

    result.meta = result.meta.filter(function (metaItem, index, arr) {
      return (// keep meta item if it doesnt has a vmid
        !metaItem.hasOwnProperty(tagIDKeyName) || // or if it's the first item in the array with this vmid
        index === Object(_utils_array__WEBPACK_IMPORTED_MODULE_1__["findIndex"])(arr, function (item) {
          return item[tagIDKeyName] === metaItem[tagIDKeyName];
        })
      );
    });
  }

  return result;
}

/***/ }),

/***/ "../../src/shared/getMetaInfo.js":
/*!*******************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/shared/getMetaInfo.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getMetaInfo; });
/* harmony import */ var core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es7.symbol.async-iterator */ "../../node_modules/core-js/modules/es7.symbol.async-iterator.js");
/* harmony import */ var core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.symbol */ "../../node_modules/core-js/modules/es6.symbol.js");
/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es6.regexp.replace */ "../../node_modules/core-js/modules/es6.regexp.replace.js");
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ "../../node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es6.array.iterator */ "../../node_modules/core-js/modules/es6.array.iterator.js");
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es6.object.to-string */ "../../node_modules/core-js/modules/es6.object.to-string.js");
/* harmony import */ var core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es6.object.keys */ "../../node_modules/core-js/modules/es6.object.keys.js");
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _utils_ensure__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/ensure */ "../../src/utils/ensure.js");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./template */ "../../src/shared/template.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./constants */ "../../src/shared/constants.js");
/* harmony import */ var _escaping__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./escaping */ "../../src/shared/escaping.js");
/* harmony import */ var _getComponentOption__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./getComponentOption */ "../../src/shared/getComponentOption.js");








function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






/**
 * Returns the correct meta info for the given component
 * (child components will overwrite parent meta info)
 *
 * @param  {Object} component - the Vue instance to get meta info from
 * @return {Object} - returned meta info
 */

function getMetaInfo() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var component = arguments.length > 1 ? arguments[1] : undefined;
  var escapeSequences = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  // collect & aggregate all metaInfo $options
  var info = Object(_getComponentOption__WEBPACK_IMPORTED_MODULE_11__["default"])(options, component, _constants__WEBPACK_IMPORTED_MODULE_9__["defaultInfo"]); // Remove all "template" tags from meta
  // backup the title chunk in case user wants access to it

  if (info.title) {
    info.titleChunk = info.title;
  } // replace title with populated template


  if (info.titleTemplate && info.titleTemplate !== '%s') {
    Object(_template__WEBPACK_IMPORTED_MODULE_8__["applyTemplate"])({
      component: component,
      contentKeyName: 'title'
    }, info, info.titleTemplate, info.titleChunk || '');
  } // convert base tag to an array so it can be handled the same way
  // as the other tags


  if (info.base) {
    info.base = Object.keys(info.base).length ? [info.base] : [];
  }

  var escapeOptions = {
    doEscape: function doEscape(value) {
      return escapeSequences.reduce(function (val, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            v = _ref2[0],
            r = _ref2[1];

        return val.replace(v, r);
      }, value);
    }
  };
  _constants__WEBPACK_IMPORTED_MODULE_9__["disableOptionKeys"].forEach(function (disableKey, index) {
    if (index === 0) {
      Object(_utils_ensure__WEBPACK_IMPORTED_MODULE_7__["ensureIsArray"])(info, disableKey);
    } else if (index === 1) {
      for (var key in info[disableKey]) {
        Object(_utils_ensure__WEBPACK_IMPORTED_MODULE_7__["ensureIsArray"])(info[disableKey], key);
      }
    }

    escapeOptions[disableKey] = info[disableKey];
  }); // begin sanitization

  info = Object(_escaping__WEBPACK_IMPORTED_MODULE_10__["escape"])(info, options, escapeOptions);
  return info;
}

/***/ }),

/***/ "../../src/shared/merge.js":
/*!*************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/shared/merge.js ***!
  \*************************************************************/
/*! exports provided: arrayMerge, merge */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayMerge", function() { return _arrayMerge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return merge; });
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! deepmerge */ "../../node_modules/deepmerge/dist/umd.js");
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(deepmerge__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/array */ "../../src/utils/array.js");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template */ "../../src/shared/template.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "../../src/shared/constants.js");





function _arrayMerge(_ref, target, source) {
  var component = _ref.component,
      tagIDKeyName = _ref.tagIDKeyName,
      metaTemplateKeyName = _ref.metaTemplateKeyName,
      contentKeyName = _ref.contentKeyName;
  // we concat the arrays without merging objects contained in,
  // but we check for a `vmid` property on each object in the array
  // using an O(1) lookup associative array exploit
  var destination = [];
  target.forEach(function (targetItem, targetIndex) {
    // no tagID so no need to check for duplicity
    if (!targetItem[tagIDKeyName]) {
      destination.push(targetItem);
      return;
    }

    var sourceIndex = Object(_utils_array__WEBPACK_IMPORTED_MODULE_1__["findIndex"])(source, function (item) {
      return item[tagIDKeyName] === targetItem[tagIDKeyName];
    });
    var sourceItem = source[sourceIndex]; // source doesnt contain any duplicate vmid's, we can keep targetItem

    if (sourceIndex === -1) {
      destination.push(targetItem);
      return;
    } // when sourceItem explictly defines contentKeyName or innerHTML as undefined, its
    // an indication that we need to skip the default behaviour or child has preference over parent
    // which means we keep the targetItem and ignore/remove the sourceItem


    if (sourceItem.hasOwnProperty(contentKeyName) && sourceItem[contentKeyName] === undefined || sourceItem.hasOwnProperty('innerHTML') && sourceItem.innerHTML === undefined) {
      destination.push(targetItem); // remove current index from source array so its not concatenated to destination below

      source.splice(sourceIndex, 1);
      return;
    } // we now know that targetItem is a duplicate and we should ignore it in favor of sourceItem
    // if source specifies null as content then ignore both the target as the source


    if (sourceItem[contentKeyName] === null || sourceItem.innerHTML === null) {
      // remove current index from source array so its not concatenated to destination below
      source.splice(sourceIndex, 1);
      return;
    } // now we only need to check if the target has a template to combine it with the source


    var targetTemplate = targetItem[metaTemplateKeyName];

    if (!targetTemplate) {
      return;
    }

    var sourceTemplate = sourceItem[metaTemplateKeyName];

    if (!sourceTemplate) {
      // use parent template and child content
      Object(_template__WEBPACK_IMPORTED_MODULE_2__["applyTemplate"])({
        component: component,
        metaTemplateKeyName: metaTemplateKeyName,
        contentKeyName: contentKeyName
      }, sourceItem, targetTemplate);
    } else if (!sourceItem[contentKeyName]) {
      // use child template and parent content
      Object(_template__WEBPACK_IMPORTED_MODULE_2__["applyTemplate"])({
        component: component,
        metaTemplateKeyName: metaTemplateKeyName,
        contentKeyName: contentKeyName
      }, sourceItem, undefined, targetItem[contentKeyName]);
    }
  });
  return destination.concat(source);
}


function merge(target, source) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  // remove properties explicitly set to false so child components can
  // optionally _not_ overwrite the parents content
  // (for array properties this is checked in arrayMerge)
  if (source.hasOwnProperty('title') && source.title === undefined) {
    delete source.title;
  }

  _constants__WEBPACK_IMPORTED_MODULE_3__["metaInfoAttributeKeys"].forEach(function (attrKey) {
    if (!source[attrKey]) {
      return;
    }

    for (var key in source[attrKey]) {
      if (source[attrKey].hasOwnProperty(key) && source[attrKey][key] === undefined) {
        delete source[attrKey][key];
      }
    }
  });
  return deepmerge__WEBPACK_IMPORTED_MODULE_0___default()(target, source, {
    arrayMerge: function arrayMerge(t, s) {
      return _arrayMerge(options, t, s);
    }
  });
}

/***/ }),

/***/ "../../src/shared/meta-helpers.js":
/*!********************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/shared/meta-helpers.js ***!
  \********************************************************************/
/*! exports provided: hasMetaInfo, inMetaInfoBranch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasMetaInfo", function() { return hasMetaInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inMetaInfoBranch", function() { return inMetaInfoBranch; });
/* harmony import */ var _utils_is_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/is-type */ "../../src/utils/is-type.js");
 // Vue $root instance has a _vueMeta object property, otherwise its a boolean true

function hasMetaInfo() {
  var vm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
  return vm && (vm._vueMeta === true || Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_0__["isObject"])(vm._vueMeta));
} // a component is in a metaInfo branch when itself has meta info or one of its (grand-)children has

function inMetaInfoBranch() {
  var vm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
  return vm && !Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(vm._vueMeta);
}

/***/ }),

/***/ "../../src/shared/mixin.js":
/*!*************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/shared/mixin.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createMixin; });
/* harmony import */ var _client_triggerUpdate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../client/triggerUpdate */ "../../src/client/triggerUpdate.js");
/* harmony import */ var _utils_is_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/is-type */ "../../src/utils/is-type.js");
/* harmony import */ var _utils_ensure__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/ensure */ "../../src/utils/ensure.js");
/* harmony import */ var _meta_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./meta-helpers */ "../../src/shared/meta-helpers.js");
/* harmony import */ var _nav_guards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./nav-guards */ "../../src/shared/nav-guards.js");





function createMixin(Vue, options) {
  // for which Vue lifecycle hooks should the metaInfo be refreshed
  var updateOnLifecycleHook = ['activated', 'deactivated', 'beforeMount']; // watch for client side component updates

  return {
    beforeCreate: function beforeCreate() {
      var _this = this;

      Object.defineProperty(this, '_hasMetaInfo', {
        get: function get() {
          // Show deprecation warning once when devtools enabled
          if (Vue.config.devtools && !this.$root._vueMeta.hasMetaInfoDeprecationWarningShown) {
            console.warn('VueMeta DeprecationWarning: _hasMetaInfo has been deprecated and will be removed in a future version. Please use hasMetaInfo(vm) instead'); // eslint-disable-line no-console

            this.$root._vueMeta.hasMetaInfoDeprecationWarningShown = true;
          }

          return Object(_meta_helpers__WEBPACK_IMPORTED_MODULE_3__["hasMetaInfo"])(this);
        }
      }); // Add a marker to know if it uses metaInfo
      // _vnode is used to know that it's attached to a real component
      // useful if we use some mixin to add some meta tags (like nuxt-i18n)

      if (!Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_1__["isUndefined"])(this.$options[options.keyName]) && this.$options[options.keyName] !== null) {
        if (!this.$root._vueMeta) {
          this.$root._vueMeta = {};
        } // to speed up updates we keep track of branches which have a component with vue-meta info defined
        // if _vueMeta = true it has info, if _vueMeta = false a child has info


        if (!this._vueMeta) {
          this._vueMeta = true;
          var p = this.$parent;

          while (p && p !== this.$root) {
            if (Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_1__["isUndefined"])(p._vueMeta)) {
              p._vueMeta = false;
            }

            p = p.$parent;
          }
        } // coerce function-style metaInfo to a computed prop so we can observe
        // it on creation


        if (Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(this.$options[options.keyName])) {
          if (!this.$options.computed) {
            this.$options.computed = {};
          }

          this.$options.computed.$metaInfo = this.$options[options.keyName];

          if (!this.$isServer) {
            // if computed $metaInfo exists, watch it for updates & trigger a refresh
            // when it changes (i.e. automatically handle async actions that affect metaInfo)
            // credit for this suggestion goes to [Sébastien Chopin](https://github.com/Atinux)
            Object(_utils_ensure__WEBPACK_IMPORTED_MODULE_2__["ensuredPush"])(this.$options, 'created', function () {
              _this.$watch('$metaInfo', function () {
                Object(_client_triggerUpdate__WEBPACK_IMPORTED_MODULE_0__["default"])(this, 'watcher');
              });
            });
          }
        } // force an initial refresh on page load and prevent other lifecycleHooks
        // to triggerUpdate until this initial refresh is finished
        // this is to make sure that when a page is opened in an inactive tab which
        // has throttled rAF/timers we still immediately set the page title


        if (Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_1__["isUndefined"])(this.$root._vueMeta.initialized)) {
          this.$root._vueMeta.initialized = this.$isServer;

          if (!this.$root._vueMeta.initialized) {
            Object(_utils_ensure__WEBPACK_IMPORTED_MODULE_2__["ensuredPush"])(this.$options, 'mounted', function () {
              if (!_this.$root._vueMeta.initialized) {
                // refresh meta in nextTick so all child components have loaded
                _this.$nextTick(function () {
                  this.$root.$meta().refresh();
                  this.$root._vueMeta.initialized = true;
                });
              }
            }); // add the navigation guards if requested

            if (options.refreshOnceOnNavigation) {
              Object(_nav_guards__WEBPACK_IMPORTED_MODULE_4__["addNavGuards"])(this);
            }
          }
        } // do not trigger refresh on the server side


        if (!this.$isServer) {
          // add the navigation guards if they havent been added yet
          // if metaInfo is defined as a function, this does call the computed fn redundantly
          // but as Vue internally caches the results of computed props it shouldnt hurt performance
          if (!options.refreshOnceOnNavigation && (this.$options[options.keyName] && this.$options[options.keyName].afterNavigation || this.$options.computed && this.$options.computed.$metaInfo && (this.$options.computed.$metaInfo() || {}).afterNavigation)) {
            Object(_nav_guards__WEBPACK_IMPORTED_MODULE_4__["addNavGuards"])(this);
          } // no need to add this hooks on server side


          updateOnLifecycleHook.forEach(function (lifecycleHook) {
            Object(_utils_ensure__WEBPACK_IMPORTED_MODULE_2__["ensuredPush"])(_this.$options, lifecycleHook, function () {
              return Object(_client_triggerUpdate__WEBPACK_IMPORTED_MODULE_0__["default"])(_this, lifecycleHook);
            });
          }); // re-render meta data when returning from a child component to parent

          Object(_utils_ensure__WEBPACK_IMPORTED_MODULE_2__["ensuredPush"])(this.$options, 'destroyed', function () {
            // Wait that element is hidden before refreshing meta tags (to support animations)
            var interval = setInterval(function () {
              if (_this.$el && _this.$el.offsetParent !== null) {
                /* istanbul ignore next line */
                return;
              }

              clearInterval(interval);

              if (!_this.$parent) {
                /* istanbul ignore next line */
                return;
              }

              Object(_client_triggerUpdate__WEBPACK_IMPORTED_MODULE_0__["default"])(_this, 'destroyed');
            }, 50);
          });
        }
      }
    }
  };
}

/***/ }),

/***/ "../../src/shared/nav-guards.js":
/*!******************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/shared/nav-guards.js ***!
  \******************************************************************/
/*! exports provided: addNavGuards */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addNavGuards", function() { return addNavGuards; });
/* harmony import */ var _utils_is_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/is-type */ "../../src/utils/is-type.js");

function addNavGuards(vm) {
  // return when nav guards already added or no router exists
  if (vm.$root._vueMeta.navGuards || !vm.$root.$router) {
    /* istanbul ignore next */
    return;
  }

  vm.$root._vueMeta.navGuards = true;
  var $router = vm.$root.$router;
  var $meta = vm.$root.$meta();
  $router.beforeEach(function (to, from, next) {
    $meta.pause();
    next();
  });
  $router.afterEach(function () {
    var _$meta$resume = $meta.resume(),
        metaInfo = _$meta$resume.metaInfo;

    if (metaInfo && metaInfo.afterNavigation && Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(metaInfo.afterNavigation)) {
      metaInfo.afterNavigation(metaInfo);
    }
  });
}

/***/ }),

/***/ "../../src/shared/options.js":
/*!***************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/shared/options.js ***!
  \***************************************************************/
/*! exports provided: setOptions, getOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setOptions", function() { return setOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOptions", function() { return getOptions; });
/* harmony import */ var _utils_is_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/is-type */ "../../src/utils/is-type.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "../../src/shared/constants.js");


function setOptions(options) {
  // combine options
  options = Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_0__["isObject"])(options) ? options : {};

  for (var key in _constants__WEBPACK_IMPORTED_MODULE_1__["defaultOptions"]) {
    if (!options[key]) {
      options[key] = _constants__WEBPACK_IMPORTED_MODULE_1__["defaultOptions"][key];
    }
  }

  return options;
}
function getOptions(options) {
  var optionsCopy = {};

  for (var key in options) {
    optionsCopy[key] = options[key];
  }

  return optionsCopy;
}

/***/ }),

/***/ "../../src/shared/pausing.js":
/*!***************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/shared/pausing.js ***!
  \***************************************************************/
/*! exports provided: pause, resume */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pause", function() { return pause; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resume", function() { return resume; });
function pause() {
  var refresh = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  this.$root._vueMeta.paused = true;
  return function () {
    return resume(refresh);
  };
}
function resume() {
  var refresh = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  this.$root._vueMeta.paused = false;

  if (refresh) {
    return this.$root.$meta().refresh();
  }
}

/***/ }),

/***/ "../../src/shared/template.js":
/*!****************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/shared/template.js ***!
  \****************************************************************/
/*! exports provided: applyTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyTemplate", function() { return applyTemplate; });
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.regexp.replace */ "../../node_modules/core-js/modules/es6.regexp.replace.js");
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_is_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/is-type */ "../../src/utils/is-type.js");


function applyTemplate(_ref, headObject, template, chunk) {
  var component = _ref.component,
      metaTemplateKeyName = _ref.metaTemplateKeyName,
      contentKeyName = _ref.contentKeyName;

  if (Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_1__["isUndefined"])(template)) {
    template = headObject[metaTemplateKeyName];
    delete headObject[metaTemplateKeyName];
  } // return early if no template defined


  if (!template) {
    return false;
  }

  if (Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_1__["isUndefined"])(chunk)) {
    chunk = headObject[contentKeyName];
  }

  headObject[contentKeyName] = Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(template) ? template.call(component, chunk) : template.replace(/%s/g, chunk);
  return true;
}

/***/ }),

/***/ "../../src/utils/array.js":
/*!************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/utils/array.js ***!
  \************************************************************/
/*! exports provided: findIndex, toArray, includes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findIndex", function() { return findIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toArray", function() { return toArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "includes", function() { return includes; });
/* harmony import */ var core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es7.array.includes */ "../../node_modules/core-js/modules/es7.array.includes.js");
/* harmony import */ var core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.string.includes */ "../../node_modules/core-js/modules/es6.string.includes.js");
/* harmony import */ var core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es6_string_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es6.string.iterator */ "../../node_modules/core-js/modules/es6.string.iterator.js");
/* harmony import */ var core_js_modules_es6_string_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es6_array_from__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es6.array.from */ "../../node_modules/core-js/modules/es6.array.from.js");
/* harmony import */ var core_js_modules_es6_array_from__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_from__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es6_array_find_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es6.array.find-index */ "../../node_modules/core-js/modules/es6.array.find-index.js");
/* harmony import */ var core_js_modules_es6_array_find_index__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_find_index__WEBPACK_IMPORTED_MODULE_4__);






/*
 * To reduce build size, this file provides simple polyfills without
 * overly excessive type checking and without modifying
 * the global Array.prototype
 * The polyfills are automatically removed in the commonjs build
 * Also, only files in client/ & shared/ should use these functions
 * files in server/ still use normal js function
 */
// this const is replaced by rollup to true for umd builds
// which means the polyfills are removed for other build formats
var polyfill = "test" === 'test';
function findIndex(array, predicate) {
  if (polyfill && !Array.prototype.findIndex) {
    // idx needs to be a Number, for..in returns string
    for (var idx = 0; idx < array.length; idx++) {
      if (predicate.call(arguments[2], array[idx], idx, array)) {
        return idx;
      }
    }

    return -1;
  }

  return array.findIndex(predicate, arguments[2]);
}
function toArray(arg) {
  if (polyfill && !Array.from) {
    return Array.prototype.slice.call(arg);
  }

  return Array.from(arg);
}
function includes(array, value) {
  if (polyfill && !Array.prototype.includes) {
    for (var idx in array) {
      if (array[idx] === value) {
        return true;
      }
    }

    return false;
  }

  return array.includes(value);
}

/***/ }),

/***/ "../../src/utils/ensure.js":
/*!*************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/utils/ensure.js ***!
  \*************************************************************/
/*! exports provided: ensureIsArray, ensuredPush */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ensureIsArray", function() { return ensureIsArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ensuredPush", function() { return ensuredPush; });
/* harmony import */ var _is_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-type */ "../../src/utils/is-type.js");

function ensureIsArray(arg, key) {
  if (!key || !Object(_is_type__WEBPACK_IMPORTED_MODULE_0__["isObject"])(arg)) {
    return Object(_is_type__WEBPACK_IMPORTED_MODULE_0__["isArray"])(arg) ? arg : [];
  }

  if (!Object(_is_type__WEBPACK_IMPORTED_MODULE_0__["isArray"])(arg[key])) {
    arg[key] = [];
  }

  return arg;
}
function ensuredPush(object, key, el) {
  ensureIsArray(object, key);
  object[key].push(el);
}

/***/ }),

/***/ "../../src/utils/is-type.js":
/*!**************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/utils/is-type.js ***!
  \**************************************************************/
/*! exports provided: isArray, isUndefined, isObject, isFunction, isString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUndefined", function() { return isUndefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
/* harmony import */ var core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es7.symbol.async-iterator */ "../../node_modules/core-js/modules/es7.symbol.async-iterator.js");
/* harmony import */ var core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.symbol */ "../../node_modules/core-js/modules/es6.symbol.js");
/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_1__);



function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * checks if passed argument is an array
 * @param  {any}  arg - the object to check
 * @return {Boolean} - true if `arg` is an array
 */
function isArray(arg) {
  return Array.isArray(arg);
}
function isUndefined(arg) {
  return typeof arg === 'undefined';
}
function isObject(arg) {
  return _typeof(arg) === 'object';
}
function isFunction(arg) {
  return typeof arg === 'function';
}
function isString(arg) {
  return typeof arg === 'string';
}

/***/ }),

/***/ "../../src/utils/window.js":
/*!*************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/utils/window.js ***!
  \*************************************************************/
/*! exports provided: hasGlobalWindowFn, hasGlobalWindow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasGlobalWindowFn", function() { return hasGlobalWindowFn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasGlobalWindow", function() { return hasGlobalWindow; });
/* harmony import */ var _is_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-type */ "../../src/utils/is-type.js");

function hasGlobalWindowFn() {
  try {
    return !Object(_is_type__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(window);
  } catch (e) {
    return false;
  }
}
var hasGlobalWindow = hasGlobalWindowFn();

/***/ }),

/***/ "../fixtures/basic/App.vue":
/*!*********************************!*\
  !*** ../fixtures/basic/App.vue ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_template_id_1e38b0e9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=1e38b0e9& */ "../fixtures/basic/App.vue?vue&type=template&id=1e38b0e9&");
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ "../fixtures/basic/App.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _App_vue_vue_type_template_id_1e38b0e9___WEBPACK_IMPORTED_MODULE_0__["render"],
  _App_vue_vue_type_template_id_1e38b0e9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "fixtures/basic/App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "../fixtures/basic/App.vue?vue&type=script&lang=js&":
/*!**********************************************************!*\
  !*** ../fixtures/basic/App.vue?vue&type=script&lang=js& ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--0!../../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=js& */ "../../node_modules/babel-loader/lib/index.js?!../../node_modules/vue-loader/lib/index.js?!../fixtures/basic/App.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "../fixtures/basic/App.vue?vue&type=template&id=1e38b0e9&":
/*!****************************************************************!*\
  !*** ../fixtures/basic/App.vue?vue&type=template&id=1e38b0e9& ***!
  \****************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_1e38b0e9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=1e38b0e9& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!../fixtures/basic/App.vue?vue&type=template&id=1e38b0e9&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_1e38b0e9___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_1e38b0e9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "../fixtures/basic/client.js":
/*!***********************************!*\
  !*** ../fixtures/basic/client.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "../../node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _src_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../src/browser */ "../../src/browser.js");
/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue */ "../fixtures/basic/App.vue");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./router */ "../fixtures/basic/router.js");




vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(_src_browser__WEBPACK_IMPORTED_MODULE_1__["default"]);
_App_vue__WEBPACK_IMPORTED_MODULE_2__["default"].router = Object(_router__WEBPACK_IMPORTED_MODULE_3__["default"])();
new vue__WEBPACK_IMPORTED_MODULE_0__["default"](_App_vue__WEBPACK_IMPORTED_MODULE_2__["default"]).$mount('#app');

/***/ }),

/***/ "../fixtures/basic/router.js":
/*!***********************************!*\
  !*** ../fixtures/basic/router.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createRouter; });
/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.promise */ "../../node_modules/core-js/modules/es6.promise.js");
/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.object.to-string */ "../../node_modules/core-js/modules/es6.object.to-string.js");
/* harmony import */ var core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue */ "../../node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-router */ "../../node_modules/vue-router/dist/vue-router.esm.js");
/* harmony import */ var _views_home_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./views/home.vue */ "../fixtures/basic/views/home.vue");



function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }




vue__WEBPACK_IMPORTED_MODULE_2__["default"].use(vue_router__WEBPACK_IMPORTED_MODULE_3__["default"]);

var Post = function Post() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(__webpack_require__(/*! ./views/about.vue */ "../fixtures/basic/views/about.vue"));
  });
};

function createRouter() {
  return new vue_router__WEBPACK_IMPORTED_MODULE_3__["default"]({
    mode: 'hash',
    base: '/',
    routes: [{
      path: '/',
      component: _views_home_vue__WEBPACK_IMPORTED_MODULE_4__["default"]
    }, {
      path: '/about',
      component: Post
    }]
  });
}

/***/ }),

/***/ "../fixtures/basic/views/about.vue":
/*!*****************************************!*\
  !*** ../fixtures/basic/views/about.vue ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _about_vue_vue_type_template_id_6a878a14___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./about.vue?vue&type=template&id=6a878a14& */ "../fixtures/basic/views/about.vue?vue&type=template&id=6a878a14&");
/* harmony import */ var _about_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./about.vue?vue&type=script&lang=js& */ "../fixtures/basic/views/about.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _about_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _about_vue_vue_type_template_id_6a878a14___WEBPACK_IMPORTED_MODULE_0__["render"],
  _about_vue_vue_type_template_id_6a878a14___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "fixtures/basic/views/about.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "../fixtures/basic/views/about.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ../fixtures/basic/views/about.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_about_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--0!../../../../node_modules/vue-loader/lib??vue-loader-options!./about.vue?vue&type=script&lang=js& */ "../../node_modules/babel-loader/lib/index.js?!../../node_modules/vue-loader/lib/index.js?!../fixtures/basic/views/about.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_about_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "../fixtures/basic/views/about.vue?vue&type=template&id=6a878a14&":
/*!************************************************************************!*\
  !*** ../fixtures/basic/views/about.vue?vue&type=template&id=6a878a14& ***!
  \************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_about_vue_vue_type_template_id_6a878a14___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./about.vue?vue&type=template&id=6a878a14& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!../fixtures/basic/views/about.vue?vue&type=template&id=6a878a14&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_about_vue_vue_type_template_id_6a878a14___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_about_vue_vue_type_template_id_6a878a14___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "../fixtures/basic/views/home.vue":
/*!****************************************!*\
  !*** ../fixtures/basic/views/home.vue ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_vue_vue_type_template_id_2b0853a8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.vue?vue&type=template&id=2b0853a8& */ "../fixtures/basic/views/home.vue?vue&type=template&id=2b0853a8&");
/* harmony import */ var _home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.vue?vue&type=script&lang=js& */ "../fixtures/basic/views/home.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _home_vue_vue_type_template_id_2b0853a8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _home_vue_vue_type_template_id_2b0853a8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "fixtures/basic/views/home.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "../fixtures/basic/views/home.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ../fixtures/basic/views/home.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--0!../../../../node_modules/vue-loader/lib??vue-loader-options!./home.vue?vue&type=script&lang=js& */ "../../node_modules/babel-loader/lib/index.js?!../../node_modules/vue-loader/lib/index.js?!../fixtures/basic/views/home.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "../fixtures/basic/views/home.vue?vue&type=template&id=2b0853a8&":
/*!***********************************************************************!*\
  !*** ../fixtures/basic/views/home.vue?vue&type=template&id=2b0853a8& ***!
  \***********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_template_id_2b0853a8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./home.vue?vue&type=template&id=2b0853a8& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!../fixtures/basic/views/home.vue?vue&type=template&id=2b0853a8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_template_id_2b0853a8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_template_id_2b0853a8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

/******/ });