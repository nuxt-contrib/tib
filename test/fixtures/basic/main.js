/******/ (function (modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
    /******/ 		const chunkIds = data[0]
    /******/ 		const moreModules = data[1]
    /******/ 		const executeModules = data[2]
    /******/
    /******/ 		// add "moreModules" to the modules object,
    /******/ 		// then flag all "chunkIds" as loaded and fire callback
    /******/ 		let moduleId; let chunkId; let i = 0; const resolves = []
    /******/ 		for (;i < chunkIds.length; i++) {
      /******/ 			chunkId = chunkIds[i]
      /******/ 			if (installedChunks[chunkId]) {
        /******/ 				resolves.push(installedChunks[chunkId][0])
        /******/ 			}
      /******/ 			installedChunks[chunkId] = 0
      /******/ 		}
    /******/ 		for (moduleId in moreModules) {
      /******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        /******/ 				modules[moduleId] = moreModules[moduleId]
        /******/ 			}
      /******/ 		}
    /******/ 		if (parentJsonpFunction) { parentJsonpFunction(data) }
    /******/
    /******/ 		while (resolves.length) {
      /******/ 			resolves.shift()()
      /******/ 		}
    /******/
    /******/ 		// add entry modules from loaded chunk to deferred list
    /******/ 		deferredModules.push.apply(deferredModules, executeModules || [])
    /******/
    /******/ 		// run deferred modules when all chunks ready
    /******/ 		return checkDeferredModules()
    /******/ 	};
  /******/ 	function checkDeferredModules() {
    /******/ 		let result
    /******/ 		for (let i = 0; i < deferredModules.length; i++) {
      /******/ 			const deferredModule = deferredModules[i]
      /******/ 			let fulfilled = true
      /******/ 			for (let j = 1; j < deferredModule.length; j++) {
        /******/ 				const depId = deferredModule[j]
        /******/ 				if (installedChunks[depId] !== 0) { fulfilled = false }
        /******/ 			}
      /******/ 			if (fulfilled) {
        /******/ 				deferredModules.splice(i--, 1)
        /******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0])
        /******/ 			}
      /******/ 		}
    /******/ 		return result
    /******/ 	}
  /******/
  /******/ 	// The module cache
  /******/ 	const installedModules = {}
  /******/
  /******/ 	// object to store loaded and loading chunks
  /******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
  /******/ 	// Promise = chunk loading, 0 = chunk loaded
  /******/ 	var installedChunks = {
    /******/ 		'main': 0
    /******/ 	}
  /******/
  /******/ 	var deferredModules = []
  /******/
  /******/ 	// The require function
  /******/ 	function __webpack_require__(moduleId) {
    /******/
    /******/ 		// Check if module is in cache
    /******/ 		if (installedModules[moduleId]) {
      /******/ 			return installedModules[moduleId].exports
      /******/ 		}
    /******/ 		// Create a new module (and put it into the cache)
    /******/ 		const module = installedModules[moduleId] = {
      /******/ 			i: moduleId,
      /******/ 			l: false,
      /******/ 			exports: {}
      /******/ 		}
    /******/
    /******/ 		// Execute the module function
    /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)
    /******/
    /******/ 		// Flag the module as loaded
    /******/ 		module.l = true
    /******/
    /******/ 		// Return the exports of the module
    /******/ 		return module.exports
    /******/ 	}
  /******/
  /******/
  /******/ 	// expose the modules object (__webpack_modules__)
  /******/ 	__webpack_require__.m = modules
  /******/
  /******/ 	// expose the module cache
  /******/ 	__webpack_require__.c = installedModules
  /******/
  /******/ 	// define getter function for harmony exports
  /******/ 	__webpack_require__.d = function (exports, name, getter) {
    /******/ 		if (!__webpack_require__.o(exports, name)) {
      /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter })
      /******/ 		}
    /******/ 	}
  /******/
  /******/ 	// define __esModule on exports
  /******/ 	__webpack_require__.r = function (exports) {
    /******/ 		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
      /******/ 		}
    /******/ 		Object.defineProperty(exports, '__esModule', { value: true })
    /******/ 	}
  /******/
  /******/ 	// create a fake namespace object
  /******/ 	// mode & 1: value is a module id, require it
  /******/ 	// mode & 2: merge all properties of value into the ns
  /******/ 	// mode & 4: return value when already ns object
  /******/ 	// mode & 8|1: behave like require
  /******/ 	__webpack_require__.t = function (value, mode) {
    /******/ 		if (mode & 1) { value = __webpack_require__(value) }
    /******/ 		if (mode & 8) { return value }
    /******/ 		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) { return value }
    /******/ 		const ns = Object.create(null)
    /******/ 		__webpack_require__.r(ns)
    /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value })
    /******/ 		if (mode & 2 && typeof value !== 'string') { for (const key in value) { __webpack_require__.d(ns, key, function (key) { return value[key] }.bind(null, key)) } }
    /******/ 		return ns
    /******/ 	}
  /******/
  /******/ 	// getDefaultExport function for compatibility with non-harmony modules
  /******/ 	__webpack_require__.n = function (module) {
    /******/ 		const getter = module && module.__esModule
    /******/ 			? function getDefault() { return module.default }
    /******/ 			: function getModuleExports() { return module }
    /******/ 		__webpack_require__.d(getter, 'a', getter)
    /******/ 		return getter
    /******/ 	}
  /******/
  /******/ 	// Object.prototype.hasOwnProperty.call
  /******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property) }
  /******/
  /******/ 	// __webpack_public_path__
  /******/ 	__webpack_require__.p = '/.vue-meta/'
  /******/
  /******/ 	let jsonpArray = window.webpackJsonp = window.webpackJsonp || []
  /******/ 	const oldJsonpFunction = jsonpArray.push.bind(jsonpArray)
  /******/ 	jsonpArray.push = webpackJsonpCallback
  /******/ 	jsonpArray = jsonpArray.slice()
  /******/ 	for (let i = 0; i < jsonpArray.length; i++) { webpackJsonpCallback(jsonpArray[i]) }
  /******/ 	var parentJsonpFunction = oldJsonpFunction
  /******/
  /******/
  /******/ 	// add entry module to deferred list
  /******/ 	deferredModules.push(['../fixtures/basic/client.js', 'vendor'])
  /******/ 	// run deferred modules when ready
  /******/ 	return checkDeferredModules()
/******/ })
/************************************************************************/
/******/ ({

  /***/ '../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/index.js?!../fixtures/basic/App.vue?vue&type=script&lang=js&':
  /*! ************************************************************************************************************************************************************************************************************!*\
  !*** /var/www/projects.github/vue-meta/node_modules/babel-loader/lib!/var/www/projects.github/vue-meta/node_modules/vue-loader/lib??vue-loader-options!../fixtures/basic/App.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************/
  /*! exports provided: default */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  metaInfo() {\n    return {\n      meta: [{\n        vmid: 'charset',\n        charset: 'utf-8'\n      }],\n      afterNavigation: () => {\n        this.$emit('routeChanged');\n      }\n    };\n  },\n\n  mounted() {\n    window.$vueMeta = this;\n  }\n\n});\n\n//# sourceURL=webpack:///../fixtures/basic/App.vue?/var/www/projects.github/vue-meta/node_modules/babel-loader/lib!/var/www/projects.github/vue-meta/node_modules/vue-loader/lib??vue-loader-options")
    /***/ },

  /***/ '../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/index.js?!../fixtures/basic/views/about.vue?vue&type=script&lang=js&':
  /*! ********************************************************************************************************************************************************************************************************************!*\
  !*** /var/www/projects.github/vue-meta/node_modules/babel-loader/lib!/var/www/projects.github/vue-meta/node_modules/vue-loader/lib??vue-loader-options!../fixtures/basic/views/about.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************/
  /*! exports provided: default */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  metaInfo() {\n    return {\n      title: 'About'\n    };\n  }\n\n});\n\n//# sourceURL=webpack:///../fixtures/basic/views/about.vue?/var/www/projects.github/vue-meta/node_modules/babel-loader/lib!/var/www/projects.github/vue-meta/node_modules/vue-loader/lib??vue-loader-options")
    /***/ },

  /***/ '../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/index.js?!../fixtures/basic/views/home.vue?vue&type=script&lang=js&':
  /*! *******************************************************************************************************************************************************************************************************************!*\
  !*** /var/www/projects.github/vue-meta/node_modules/babel-loader/lib!/var/www/projects.github/vue-meta/node_modules/vue-loader/lib??vue-loader-options!../fixtures/basic/views/home.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************/
  /*! exports provided: default */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  metaInfo() {\n    return {\n      title: 'Home',\n      titleTemplate: '%s | Vue Meta Test',\n      htmlAttrs: {\n        lang: 'en',\n        allowfullscreen: undefined,\n        amp: true\n      },\n      headAttrs: {\n        test: true\n      },\n      meta: [{\n        name: 'description',\n        content: 'Hello',\n        vmid: 'test'\n      }],\n      script: [{\n        vmid: 'ldjson',\n        innerHTML: '{ \"@context\": \"http://www.schema.org\", \"@type\": \"Organization\" }',\n        type: 'application/ld+json'\n      }, {\n        innerHTML: '{ \"more\": \"data\" }',\n        type: 'application/ld+json'\n      }],\n      noscript: [{\n        innerHTML: '{ \"body\": \"yes\" }',\n        body: true,\n        type: 'application/ld+json'\n      }],\n      __dangerouslyDisableSanitizers: ['noscript'],\n      __dangerouslyDisableSanitizersByTagID: {\n        ldjson: ['innerHTML']\n      }\n    };\n  }\n\n});\n\n//# sourceURL=webpack:///../fixtures/basic/views/home.vue?/var/www/projects.github/vue-meta/node_modules/babel-loader/lib!/var/www/projects.github/vue-meta/node_modules/vue-loader/lib??vue-loader-options")
    /***/ },

  /***/ '../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!../fixtures/basic/App.vue?vue&type=template&id=1e38b0e9&':
  /*! **************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /var/www/projects.github/vue-meta/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/var/www/projects.github/vue-meta/node_modules/vue-loader/lib??vue-loader-options!../fixtures/basic/App.vue?vue&type=template&id=1e38b0e9& ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
  /*! exports provided: render, staticRenderFns */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    "div",\n    { attrs: { id: "app" } },\n    [\n      _c("h1", [_vm._v("Basic")]),\n      _vm._v(" "),\n      _c("router-view"),\n      _vm._v(" "),\n      _c("p", [_vm._v("Inspect Element to see the meta info")])\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///../fixtures/basic/App.vue?/var/www/projects.github/vue-meta/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/var/www/projects.github/vue-meta/node_modules/vue-loader/lib??vue-loader-options')
    /***/ },

  /***/ '../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!../fixtures/basic/views/about.vue?vue&type=template&id=6a878a14&':
  /*! **********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /var/www/projects.github/vue-meta/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/var/www/projects.github/vue-meta/node_modules/vue-loader/lib??vue-loader-options!../fixtures/basic/views/about.vue?vue&type=template&id=6a878a14& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************/
  /*! exports provided: render, staticRenderFns */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    "div",\n    [\n      _c("h2", [_vm._v("About")]),\n      _vm._v(" "),\n      _c("router-link", { attrs: { to: "/" } }, [_vm._v("Go to Home")])\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///../fixtures/basic/views/about.vue?/var/www/projects.github/vue-meta/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/var/www/projects.github/vue-meta/node_modules/vue-loader/lib??vue-loader-options')
    /***/ },

  /***/ '../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!../fixtures/basic/views/home.vue?vue&type=template&id=2b0853a8&':
  /*! *********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /var/www/projects.github/vue-meta/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/var/www/projects.github/vue-meta/node_modules/vue-loader/lib??vue-loader-options!../fixtures/basic/views/home.vue?vue&type=template&id=2b0853a8& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
  /*! exports provided: render, staticRenderFns */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    "div",\n    [\n      _c("h2", [_vm._v("Home")]),\n      _vm._v(" "),\n      _c("router-link", { attrs: { to: "/about" } }, [_vm._v("Go to About")])\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///../fixtures/basic/views/home.vue?/var/www/projects.github/vue-meta/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/var/www/projects.github/vue-meta/node_modules/vue-loader/lib??vue-loader-options')
    /***/ },

  /***/ '../../package.json':
  /*! ******************************************************!*\
  !*** /var/www/projects.github/vue-meta/package.json ***!
  \******************************************************/
  /*! exports provided: name, version, description, keywords, homepage, bugs, repository, license, contributors, files, main, web, module, typings, scripts, dependencies, resolutions, devDependencies, default */
  /***/ function (module) {
    eval('module.exports = {"name":"vue-meta","version":"1.5.8","description":"Manage page metadata in Vue.js components with ssr support","keywords":["attribute","google","head","helmet","info","metadata","meta","seo","server","ssr","title","universal","vue"],"homepage":"https://github.com/nuxt/vue-meta","bugs":"https://github.com/nuxt/vue-meta/issues","repository":{"type":"git","url":"git@github.com/nuxt/vue-meta.git"},"license":"MIT","contributors":[{"name":"Declan de Wet (@declandewet)"},{"name":"Sebastien Chopin (@Atinux)"}],"files":["lib","es","types/index.d.ts","types/vue.d.ts"],"main":"lib/vue-meta.common.js","web":"lib/vue-meta.js","module":"es/index.js","typings":"types/index.d.ts","scripts":{"build":"yarn build:other && yarn build:es","build:es":"rimraf es && babel src --env-name es --out-dir es","build:other":"rimraf lib && rollup -c scripts/rollup.config.js","coverage":"codecov","dev":"cd examples && yarn dev && cd ..","docs":"vuepress dev --host 0.0.0.0 --port 3000 docs","docs:build":"vuepress build docs","lint":"eslint src test","prerelease":"git checkout master && git pull -r","release":"yarn lint && yarn test && yarn build && standard-version","postrelease":"git push origin master --follow-tags && yarn publish","test":"yarn test:unit && yarn test:e2e","test:e2e":"jest test/e2e","test:unit":"jest test/unit"},"dependencies":{"deepmerge":"^3.2.0","parse-function":"^5.2.11"},"resolutions":{"webpack-dev-middleware":"3.6.0"},"devDependencies":{"@babel/cli":"^7.2.3","@babel/core":"^7.3.4","@babel/node":"^7.2.2","@babel/plugin-syntax-dynamic-import":"^7.2.0","@babel/preset-env":"^7.3.4","@nuxt/babel-preset-app":"^2.4.5","@nuxtjs/eslint-config":"^0.0.1","@vue/server-test-utils":"^1.0.0-beta.29","@vue/test-utils":"^1.0.0-beta.29","babel-core":"^7.0.0-bridge","babel-eslint":"^10.0.1","babel-jest":"^24.4.0","babel-loader":"^8.0.5","babel-plugin-dynamic-import-node":"^2.2.0","browserstack-local":"^1.3.7","chromedriver":"^2.46.0","codecov":"^3.2.0","eslint":"^5.15.1","eslint-config-standard":"^12.0.0","eslint-plugin-import":"^2.16.0","eslint-plugin-jest":"^22.3.0","eslint-plugin-node":"^8.0.1","eslint-plugin-promise":"^4.0.1","eslint-plugin-standard":"^4.0.0","eslint-plugin-vue":"^5.2.2","fs-extra":"^7.0.1","geckodriver":"^1.16.0","is-wsl":"^1.1.0","jest":"^24.4.0","jest-environment-jsdom":"^24.4.0","jest-environment-jsdom-global":"^1.1.1","jsdom":"^14.0.0","lodash":"^4.17.11","puppeteer-core":"^1.13.0","rimraf":"^2.6.3","rollup":"^1.6.0","rollup-plugin-buble":"^0.19.6","rollup-plugin-commonjs":"^9.2.1","rollup-plugin-json":"^3.1.0","rollup-plugin-node-resolve":"^4.0.1","rollup-plugin-replace":"^2.1.0","rollup-plugin-terser":"^4.0.4","selenium-webdriver":"^4.0.0-alpha.1","standard-version":"^5.0.1","tree-kill":"^1.2.1","vue":"^2.6.8","vue-jest":"^3.0.4","vue-loader":"^15.7.0","vue-router":"^3.0.2","vue-server-renderer":"^2.6.8","vue-template-compiler":"^2.6.8","vuepress":"^0.14.10","vuepress-theme-vue":"^1.1.0","webpack":"^4.29.6"}};\n\n//# sourceURL=webpack:////var/www/projects.github/vue-meta/package.json?')
    /***/ },

  /***/ '../../src/browser.js':
  /*! ********************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/browser.js ***!
  \********************************************************/
  /*! exports provided: default */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../package.json");\nvar _package_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../package.json */ "../../package.json", 1);\n/* harmony import */ var _shared_mixin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/mixin */ "../../src/shared/mixin.js");\n/* harmony import */ var _shared_options__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/options */ "../../src/shared/options.js");\n/* harmony import */ var _utils_is_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/is-type */ "../../src/utils/is-type.js");\n/* harmony import */ var _client_$meta__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./client/$meta */ "../../src/client/$meta.js");\n/* harmony import */ var _shared_meta_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shared/meta-helpers */ "../../src/shared/meta-helpers.js");\n\n\n\n\n\n\n/**\n * Plugin install function.\n * @param {Function} Vue - the Vue constructor.\n */\n\nfunction install(Vue, options = {}) {\n  options = Object(_shared_options__WEBPACK_IMPORTED_MODULE_2__["setOptions"])(options);\n  Vue.prototype.$meta = Object(_client_$meta__WEBPACK_IMPORTED_MODULE_4__["default"])(options);\n  Vue.mixin(Object(_shared_mixin__WEBPACK_IMPORTED_MODULE_1__["default"])(Vue, options));\n} // automatic install\n\n\nif (!Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_3__["isUndefined"])(window) && !Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_3__["isUndefined"])(window.Vue)) {\n  /* istanbul ignore next */\n  install(window.Vue);\n}\n\n/* harmony default export */ __webpack_exports__["default"] = ({\n  version: _package_json__WEBPACK_IMPORTED_MODULE_0__["version"],\n  install,\n  hasMetaInfo: _shared_meta_helpers__WEBPACK_IMPORTED_MODULE_5__["hasMetaInfo"]\n});\n\n//# sourceURL=webpack:////var/www/projects.github/vue-meta/src/browser.js?')
    /***/ },

  /***/ '../../src/client/$meta.js':
  /*! *************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/client/$meta.js ***!
  \*************************************************************/
  /*! exports provided: default */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _$meta; });\n/* harmony import */ var _shared_options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/options */ "../../src/shared/options.js");\n/* harmony import */ var _shared_pausing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/pausing */ "../../src/shared/pausing.js");\n/* harmony import */ var _refresh__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./refresh */ "../../src/client/refresh.js");\n\n\n\nfunction _$meta(options = {}) {\n  const _refresh = Object(_refresh__WEBPACK_IMPORTED_MODULE_2__["default"])(options);\n\n  const inject = () => {};\n  /**\n   * Returns an injector for server-side rendering.\n   * @this {Object} - the Vue instance (a root component)\n   * @return {Object} - injector\n   */\n\n\n  return function $meta() {\n    return {\n      getOptions: () => Object(_shared_options__WEBPACK_IMPORTED_MODULE_0__["getOptions"])(options),\n      refresh: _refresh.bind(this),\n      inject,\n      pause: _shared_pausing__WEBPACK_IMPORTED_MODULE_1__["pause"].bind(this),\n      resume: _shared_pausing__WEBPACK_IMPORTED_MODULE_1__["resume"].bind(this)\n    };\n  };\n}\n\n//# sourceURL=webpack:////var/www/projects.github/vue-meta/src/client/$meta.js?')
    /***/ },

  /***/ '../../src/client/batchUpdate.js':
  /*! *******************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/client/batchUpdate.js ***!
  \*******************************************************************/
  /*! exports provided: default */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return batchUpdate; });\n/* harmony import */ var _utils_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/window */ "../../src/utils/window.js");\n // fallback to timers if rAF not present\n\nconst stopUpdate = (_utils_window__WEBPACK_IMPORTED_MODULE_0__["hasGlobalWindow"] ? window.cancelAnimationFrame : null) || clearTimeout;\n\nconst startUpdate = (_utils_window__WEBPACK_IMPORTED_MODULE_0__["hasGlobalWindow"] ? window.requestAnimationFrame : null) || (cb => setTimeout(cb, 0));\n/**\n * Performs a batched update. Uses requestAnimationFrame to prevent\n * calling a function too many times in quick succession.\n * You need to pass it an ID (which can initially be `null`),\n * but be sure to overwrite that ID with the return value of batchUpdate.\n *\n * @param  {(null|Number)} id - the ID of this update\n * @param  {Function} callback - the update to perform\n * @return {Number} id - a new ID\n */\n\n\nfunction batchUpdate(id, callback) {\n  stopUpdate(id);\n  return startUpdate(() => {\n    id = null;\n    callback();\n  });\n}\n\n//# sourceURL=webpack:////var/www/projects.github/vue-meta/src/client/batchUpdate.js?')
    /***/ },

  /***/ '../../src/client/refresh.js':
  /*! ***************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/client/refresh.js ***!
  \***************************************************************/
  /*! exports provided: default */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _refresh; });\n/* harmony import */ var _shared_getMetaInfo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/getMetaInfo */ "../../src/shared/getMetaInfo.js");\n/* harmony import */ var _utils_is_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/is-type */ "../../src/utils/is-type.js");\n/* harmony import */ var _shared_escaping__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/escaping */ "../../src/shared/escaping.js");\n/* harmony import */ var _updateClientMetaInfo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./updateClientMetaInfo */ "../../src/client/updateClientMetaInfo.js");\n\n\n\n\nfunction _refresh(options = {}) {\n  /**\n   * When called, will update the current meta info with new meta info.\n   * Useful when updating meta info as the result of an asynchronous\n   * action that resolves after the initial render takes place.\n   *\n   * Credit to [Sébastien Chopin](https://github.com/Atinux) for the suggestion\n   * to implement this method.\n   *\n   * @return {Object} - new meta info\n   */\n  return function refresh() {\n    const metaInfo = Object(_shared_getMetaInfo__WEBPACK_IMPORTED_MODULE_0__["default"])(options, this.$root, _shared_escaping__WEBPACK_IMPORTED_MODULE_2__["clientSequences"]);\n    const tags = Object(_updateClientMetaInfo__WEBPACK_IMPORTED_MODULE_3__["default"])(options, metaInfo); // emit "event" with new info\n\n    if (tags && Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(metaInfo.changed)) {\n      metaInfo.changed(metaInfo, tags.addedTags, tags.removedTags);\n    }\n\n    return {\n      vm: this,\n      metaInfo,\n      tags\n    };\n  };\n}\n\n//# sourceURL=webpack:////var/www/projects.github/vue-meta/src/client/refresh.js?')
    /***/ },

  /***/ '../../src/client/triggerUpdate.js':
  /*! *********************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/client/triggerUpdate.js ***!
  \*********************************************************************/
  /*! exports provided: default */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return triggerUpdate; });\n/* harmony import */ var _batchUpdate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./batchUpdate */ "../../src/client/batchUpdate.js");\n // store an id to keep track of DOM updates\n\nlet batchId = null;\nfunction triggerUpdate(vm, hookName) {\n  if (vm.$root._vueMeta.initialized && !vm.$root._vueMeta.paused) {\n    // batch potential DOM updates to prevent extraneous re-rendering\n    batchId = Object(_batchUpdate__WEBPACK_IMPORTED_MODULE_0__["default"])(batchId, () => {\n      vm.$meta().refresh();\n      batchId = null;\n    });\n  }\n}\n\n//# sourceURL=webpack:////var/www/projects.github/vue-meta/src/client/triggerUpdate.js?')
    /***/ },

  /***/ '../../src/client/updateClientMetaInfo.js':
  /*! ****************************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/client/updateClientMetaInfo.js ***!
  \****************************************************************************/
  /*! exports provided: default */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return updateClientMetaInfo; });\n/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/constants */ \"../../src/shared/constants.js\");\n/* harmony import */ var _utils_is_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/is-type */ \"../../src/utils/is-type.js\");\n/* harmony import */ var _utils_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/array */ \"../../src/utils/array.js\");\n/* harmony import */ var _updaters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./updaters */ \"../../src/client/updaters/index.js\");\n\n\n\n\n\nfunction getTag(tags, tag) {\n  if (!tags[tag]) {\n    tags[tag] = document.getElementsByTagName(tag)[0];\n  }\n\n  return tags[tag];\n}\n/**\n * Performs client-side updates when new meta info is received\n *\n * @param  {Object} newInfo - the meta info to update to\n */\n\n\nfunction updateClientMetaInfo(options = {}, newInfo) {\n  const {\n    ssrAttribute\n  } = options; // only cache tags for current update\n\n  const tags = {};\n  const htmlTag = getTag(tags, 'html'); // if this is a server render, then dont update\n\n  if (htmlTag.hasAttribute(ssrAttribute)) {\n    // remove the server render attribute so we can update on (next) changes\n    htmlTag.removeAttribute(ssrAttribute);\n    return false;\n  } // initialize tracked changes\n\n\n  const addedTags = {};\n  const removedTags = {};\n\n  for (const type in newInfo) {\n    // ignore these\n    if (Object(_utils_array__WEBPACK_IMPORTED_MODULE_2__[\"includes\"])(_shared_constants__WEBPACK_IMPORTED_MODULE_0__[\"metaInfoOptionKeys\"], type)) {\n      continue;\n    }\n\n    if (type === 'title') {\n      // update the title\n      Object(_updaters__WEBPACK_IMPORTED_MODULE_3__[\"updateTitle\"])(newInfo.title);\n      continue;\n    }\n\n    if (Object(_utils_array__WEBPACK_IMPORTED_MODULE_2__[\"includes\"])(_shared_constants__WEBPACK_IMPORTED_MODULE_0__[\"metaInfoAttributeKeys\"], type)) {\n      const tagName = type.substr(0, 4);\n      Object(_updaters__WEBPACK_IMPORTED_MODULE_3__[\"updateAttribute\"])(options, newInfo[type], getTag(tags, tagName));\n      continue;\n    } // tags should always be an array, ignore if it isnt\n\n\n    if (!Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_1__[\"isArray\"])(newInfo[type])) {\n      continue;\n    }\n\n    const {\n      oldTags,\n      newTags\n    } = Object(_updaters__WEBPACK_IMPORTED_MODULE_3__[\"updateTag\"])(options, type, newInfo[type], getTag(tags, 'head'), getTag(tags, 'body'));\n\n    if (newTags.length) {\n      addedTags[type] = newTags;\n      removedTags[type] = oldTags;\n    }\n  }\n\n  return {\n    addedTags,\n    removedTags\n  };\n}\n\n//# sourceURL=webpack:////var/www/projects.github/vue-meta/src/client/updateClientMetaInfo.js?")
    /***/ },

  /***/ '../../src/client/updaters/attribute.js':
  /*! **************************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/client/updaters/attribute.js ***!
  \**************************************************************************/
  /*! exports provided: default */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return updateAttribute; });\n/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/constants */ \"../../src/shared/constants.js\");\n/* harmony import */ var _utils_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/array */ \"../../src/utils/array.js\");\n/* harmony import */ var _utils_is_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/is-type */ \"../../src/utils/is-type.js\");\n\n\n\n/**\n * Updates the document's html tag attributes\n *\n * @param  {Object} attrs - the new document html attributes\n * @param  {HTMLElement} tag - the HTMLElement tag to update with new attrs\n */\n\nfunction updateAttribute({\n  attribute\n} = {}, attrs, tag) {\n  const vueMetaAttrString = tag.getAttribute(attribute);\n  const vueMetaAttrs = vueMetaAttrString ? vueMetaAttrString.split(',') : [];\n  const toRemove = Object(_utils_array__WEBPACK_IMPORTED_MODULE_1__[\"toArray\"])(vueMetaAttrs);\n  const keepIndexes = [];\n\n  for (const attr in attrs) {\n    if (attrs.hasOwnProperty(attr)) {\n      const value = Object(_utils_array__WEBPACK_IMPORTED_MODULE_1__[\"includes\"])(_shared_constants__WEBPACK_IMPORTED_MODULE_0__[\"booleanHtmlAttributes\"], attr) ? '' : Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_2__[\"isArray\"])(attrs[attr]) ? attrs[attr].join(' ') : attrs[attr];\n      tag.setAttribute(attr, value || '');\n\n      if (!Object(_utils_array__WEBPACK_IMPORTED_MODULE_1__[\"includes\"])(vueMetaAttrs, attr)) {\n        vueMetaAttrs.push(attr);\n      } // filter below wont ever check -1\n\n\n      keepIndexes.push(toRemove.indexOf(attr));\n    }\n  }\n\n  const removedAttributesCount = toRemove.filter((el, index) => !Object(_utils_array__WEBPACK_IMPORTED_MODULE_1__[\"includes\"])(keepIndexes, index)).reduce((acc, attr) => {\n    tag.removeAttribute(attr);\n    return acc + 1;\n  }, 0);\n\n  if (vueMetaAttrs.length === removedAttributesCount) {\n    tag.removeAttribute(attribute);\n  } else {\n    tag.setAttribute(attribute, vueMetaAttrs.sort().join(','));\n  }\n}\n\n//# sourceURL=webpack:////var/www/projects.github/vue-meta/src/client/updaters/attribute.js?")
    /***/ },

  /***/ '../../src/client/updaters/index.js':
  /*! **********************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/client/updaters/index.js ***!
  \**********************************************************************/
  /*! exports provided: updateAttribute, updateTitle, updateTag */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _attribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attribute */ "../../src/client/updaters/attribute.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "updateAttribute", function() { return _attribute__WEBPACK_IMPORTED_MODULE_0__["default"]; });\n\n/* harmony import */ var _title__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./title */ "../../src/client/updaters/title.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "updateTitle", function() { return _title__WEBPACK_IMPORTED_MODULE_1__["default"]; });\n\n/* harmony import */ var _tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tag */ "../../src/client/updaters/tag.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "updateTag", function() { return _tag__WEBPACK_IMPORTED_MODULE_2__["default"]; });\n\n\n\n\n\n//# sourceURL=webpack:////var/www/projects.github/vue-meta/src/client/updaters/index.js?')
    /***/ },

  /***/ '../../src/client/updaters/tag.js':
  /*! ********************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/client/updaters/tag.js ***!
  \********************************************************************/
  /*! exports provided: default */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return updateTag; });\n/* harmony import */ var _utils_is_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/is-type */ \"../../src/utils/is-type.js\");\n/* harmony import */ var _utils_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/array */ \"../../src/utils/array.js\");\n\n\n/**\n * Updates meta tags inside <head> and <body> on the client. Borrowed from `react-helmet`:\n * https://github.com/nfl/react-helmet/blob/004d448f8de5f823d10f838b02317521180f34da/src/Helmet.js#L195-L245\n *\n * @param  {('meta'|'base'|'link'|'style'|'script'|'noscript')} type - the name of the tag\n * @param  {(Array<Object>|Object)} tags - an array of tag objects or a single object in case of base\n * @return {Object} - a representation of what tags changed\n */\n\nfunction updateTag({\n  attribute,\n  tagIDKeyName\n} = {}, type, tags, headTag, bodyTag) {\n  const oldHeadTags = Object(_utils_array__WEBPACK_IMPORTED_MODULE_1__[\"toArray\"])(headTag.querySelectorAll(`${type}[${attribute}]`));\n  const oldBodyTags = Object(_utils_array__WEBPACK_IMPORTED_MODULE_1__[\"toArray\"])(bodyTag.querySelectorAll(`${type}[${attribute}][data-body=\"true\"]`));\n  const dataAttributes = [tagIDKeyName, 'body'];\n  const newTags = [];\n\n  if (tags.length > 1) {\n    // remove duplicates that could have been found by merging tags\n    // which include a mixin with metaInfo and that mixin is used\n    // by multiple components on the same page\n    const found = [];\n    tags = tags.filter(x => {\n      const k = JSON.stringify(x);\n      const res = !Object(_utils_array__WEBPACK_IMPORTED_MODULE_1__[\"includes\"])(found, k);\n      found.push(k);\n      return res;\n    });\n  }\n\n  if (tags.length) {\n    tags.forEach(tag => {\n      const newElement = document.createElement(type);\n      newElement.setAttribute(attribute, 'true');\n      const oldTags = tag.body !== true ? oldHeadTags : oldBodyTags;\n\n      for (const attr in tag) {\n        if (tag.hasOwnProperty(attr)) {\n          if (attr === 'innerHTML') {\n            newElement.innerHTML = tag.innerHTML;\n          } else if (attr === 'cssText') {\n            if (newElement.styleSheet) {\n              /* istanbul ignore next */\n              newElement.styleSheet.cssText = tag.cssText;\n            } else {\n              newElement.appendChild(document.createTextNode(tag.cssText));\n            }\n          } else {\n            const _attr = Object(_utils_array__WEBPACK_IMPORTED_MODULE_1__[\"includes\"])(dataAttributes, attr) ? `data-${attr}` : attr;\n\n            const value = Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_0__[\"isUndefined\"])(tag[attr]) ? '' : tag[attr];\n            newElement.setAttribute(_attr, value);\n          }\n        }\n      } // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.\n\n\n      let indexToDelete;\n      const hasEqualElement = oldTags.some((existingTag, index) => {\n        indexToDelete = index;\n        return newElement.isEqualNode(existingTag);\n      });\n\n      if (hasEqualElement && (indexToDelete || indexToDelete === 0)) {\n        oldTags.splice(indexToDelete, 1);\n      } else {\n        newTags.push(newElement);\n      }\n    });\n  }\n\n  const oldTags = oldHeadTags.concat(oldBodyTags);\n  oldTags.forEach(tag => tag.parentNode.removeChild(tag));\n  newTags.forEach(tag => {\n    if (tag.getAttribute('data-body') === 'true') {\n      bodyTag.appendChild(tag);\n    } else {\n      headTag.appendChild(tag);\n    }\n  });\n  return {\n    oldTags,\n    newTags\n  };\n}\n\n//# sourceURL=webpack:////var/www/projects.github/vue-meta/src/client/updaters/tag.js?")
    /***/ },

  /***/ '../../src/client/updaters/title.js':
  /*! **********************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/client/updaters/title.js ***!
  \**********************************************************************/
  /*! exports provided: default */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return updateTitle; });\n/**\n * Updates the document title\n *\n * @param  {String} title - the new title of the document\n */\nfunction updateTitle(title = document.title) {\n  document.title = title;\n}\n\n//# sourceURL=webpack:////var/www/projects.github/vue-meta/src/client/updaters/title.js?')
    /***/ },

  /***/ '../../src/shared/constants.js':
  /*! *****************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/shared/constants.js ***!
  \*****************************************************************/
  /*! exports provided: defaultInfo, keyName, attribute, ssrAttribute, tagIDKeyName, metaTemplateKeyName, contentKeyName, defaultOptions, metaInfoOptionKeys, disableOptionKeys, metaInfoAttributeKeys, tagsWithoutEndTag, tagsWithInnerContent, tagAttributeAsInnerContent, booleanHtmlAttributes */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"defaultInfo\", function() { return defaultInfo; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"keyName\", function() { return keyName; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"attribute\", function() { return attribute; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ssrAttribute\", function() { return ssrAttribute; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tagIDKeyName\", function() { return tagIDKeyName; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"metaTemplateKeyName\", function() { return metaTemplateKeyName; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"contentKeyName\", function() { return contentKeyName; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"defaultOptions\", function() { return defaultOptions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"metaInfoOptionKeys\", function() { return metaInfoOptionKeys; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"disableOptionKeys\", function() { return disableOptionKeys; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"metaInfoAttributeKeys\", function() { return metaInfoAttributeKeys; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tagsWithoutEndTag\", function() { return tagsWithoutEndTag; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tagsWithInnerContent\", function() { return tagsWithInnerContent; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tagAttributeAsInnerContent\", function() { return tagAttributeAsInnerContent; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"booleanHtmlAttributes\", function() { return booleanHtmlAttributes; });\n/**\n * These are constant variables used throughout the application.\n */\n// set some sane defaults\nconst defaultInfo = {\n  title: '',\n  titleChunk: '',\n  titleTemplate: '%s',\n  htmlAttrs: {},\n  bodyAttrs: {},\n  headAttrs: {},\n  base: [],\n  link: [],\n  meta: [],\n  style: [],\n  script: [],\n  noscript: [],\n  __dangerouslyDisableSanitizers: [],\n  __dangerouslyDisableSanitizersByTagID: {} // This is the name of the component option that contains all the information that\n  // gets converted to the various meta tags & attributes for the page.\n\n};\nconst keyName = 'metaInfo'; // This is the attribute vue-meta arguments on elements to know which it should\n// manage and which it should ignore.\n\nconst attribute = 'data-vue-meta'; // This is the attribute that goes on the `html` tag to inform `vue-meta`\n// that the server has already generated the meta tags for the initial render.\n\nconst ssrAttribute = 'data-vue-meta-server-rendered'; // This is the property that tells vue-meta to overwrite (instead of append)\n// an item in a tag list. For example, if you have two `meta` tag list items\n// that both have `vmid` of \"description\", then vue-meta will overwrite the\n// shallowest one with the deepest one.\n\nconst tagIDKeyName = 'vmid'; // This is the key name for possible meta templates\n\nconst metaTemplateKeyName = 'template'; // This is the key name for the content-holding property\n\nconst contentKeyName = 'content';\nconst defaultOptions = {\n  keyName,\n  attribute,\n  ssrAttribute,\n  tagIDKeyName,\n  contentKeyName,\n  metaTemplateKeyName // List of metaInfo property keys which are configuration options (and dont generate html)\n\n};\nconst metaInfoOptionKeys = ['titleChunk', 'titleTemplate', 'changed', '__dangerouslyDisableSanitizers', '__dangerouslyDisableSanitizersByTagID']; // The metaInfo property keys which are used to disable escaping\n\nconst disableOptionKeys = ['__dangerouslyDisableSanitizers', '__dangerouslyDisableSanitizersByTagID']; // List of metaInfo property keys which only generates attributes and no tags\n\nconst metaInfoAttributeKeys = ['htmlAttrs', 'headAttrs', 'bodyAttrs']; // HTML elements which dont have a head tag (shortened to our needs)\n// see: https://www.w3.org/TR/html52/document-metadata.html\n\nconst tagsWithoutEndTag = ['base', 'meta', 'link']; // HTML elements which can have inner content (shortened to our needs)\n\nconst tagsWithInnerContent = ['noscript', 'script', 'style']; // Attributes which are inserted as childNodes instead of HTMLAttribute\n\nconst tagAttributeAsInnerContent = ['innerHTML', 'cssText']; // from: https://github.com/kangax/html-minifier/blob/gh-pages/src/htmlminifier.js#L202\n\nconst booleanHtmlAttributes = ['allowfullscreen', 'amp', 'async', 'autofocus', 'autoplay', 'checked', 'compact', 'controls', 'declare', 'default', 'defaultchecked', 'defaultmuted', 'defaultselected', 'defer', 'disabled', 'enabled', 'formnovalidate', 'hidden', 'indeterminate', 'inert', 'ismap', 'itemscope', 'loop', 'multiple', 'muted', 'nohref', 'noresize', 'noshade', 'novalidate', 'nowrap', 'open', 'pauseonexit', 'readonly', 'required', 'reversed', 'scoped', 'seamless', 'selected', 'sortable', 'truespeed', 'typemustmatch', 'visible'];\n\n//# sourceURL=webpack:////var/www/projects.github/vue-meta/src/shared/constants.js?")
    /***/ },

  /***/ '../../src/shared/escaping.js':
  /*! ****************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/shared/escaping.js ***!
  \****************************************************************/
  /*! exports provided: serverSequences, clientSequences, escape */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"serverSequences\", function() { return serverSequences; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clientSequences\", function() { return clientSequences; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"escape\", function() { return escape; });\n/* harmony import */ var _utils_is_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/is-type */ \"../../src/utils/is-type.js\");\n/* harmony import */ var _utils_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/array */ \"../../src/utils/array.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ \"../../src/shared/constants.js\");\n\n\n\nconst serverSequences = [[/&/g, '&amp;'], [/</g, '&lt;'], [/>/g, '&gt;'], [/\"/g, '&quot;'], [/'/g, '&#x27;']];\nconst clientSequences = [[/&/g, '\\u0026'], [/</g, '\\u003c'], [/>/g, '\\u003e'], [/\"/g, '\\u0022'], [/'/g, '\\u0027']]; // sanitizes potentially dangerous characters\n\nfunction escape(info, options, escapeOptions) {\n  const {\n    tagIDKeyName\n  } = options;\n  const {\n    doEscape = v => v\n  } = escapeOptions;\n  const escaped = {};\n\n  for (const key in info) {\n    const value = info[key]; // no need to escape configuration options\n\n    if (Object(_utils_array__WEBPACK_IMPORTED_MODULE_1__[\"includes\"])(_constants__WEBPACK_IMPORTED_MODULE_2__[\"metaInfoOptionKeys\"], key)) {\n      escaped[key] = value;\n      continue;\n    }\n\n    let [disableKey] = _constants__WEBPACK_IMPORTED_MODULE_2__[\"disableOptionKeys\"];\n\n    if (escapeOptions[disableKey] && Object(_utils_array__WEBPACK_IMPORTED_MODULE_1__[\"includes\"])(escapeOptions[disableKey], key)) {\n      // this info[key] doesnt need to escaped if the option is listed in __dangerouslyDisableSanitizers\n      escaped[key] = value;\n      continue;\n    }\n\n    const tagId = info[tagIDKeyName];\n\n    if (tagId) {\n      disableKey = _constants__WEBPACK_IMPORTED_MODULE_2__[\"disableOptionKeys\"][1]; // keys which are listed in __dangerouslyDisableSanitizersByTagID for the current vmid do not need to be escaped\n\n      if (escapeOptions[disableKey] && escapeOptions[disableKey][tagId] && Object(_utils_array__WEBPACK_IMPORTED_MODULE_1__[\"includes\"])(escapeOptions[disableKey][tagId], key)) {\n        escaped[key] = value;\n        continue;\n      }\n    }\n\n    if (Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_0__[\"isString\"])(value)) {\n      escaped[key] = doEscape(value);\n    } else if (Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_0__[\"isArray\"])(value)) {\n      escaped[key] = value.map(v => {\n        return Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_0__[\"isObject\"])(v) ? escape(v, options, escapeOptions) : doEscape(v);\n      });\n    } else if (Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_0__[\"isObject\"])(value)) {\n      escaped[key] = escape(value, options, escapeOptions);\n    } else {\n      escaped[key] = value;\n    }\n  }\n\n  return escaped;\n}\n\n//# sourceURL=webpack:////var/www/projects.github/vue-meta/src/shared/escaping.js?")
    /***/ },

  /***/ '../../src/shared/getComponentOption.js':
  /*! **************************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/shared/getComponentOption.js ***!
  \**************************************************************************/
  /*! exports provided: default */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return getComponentOption; });\n/* harmony import */ var _utils_is_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/is-type */ \"../../src/utils/is-type.js\");\n/* harmony import */ var _utils_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/array */ \"../../src/utils/array.js\");\n/* harmony import */ var _merge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./merge */ \"../../src/shared/merge.js\");\n/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template */ \"../../src/shared/template.js\");\n/* harmony import */ var _meta_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./meta-helpers */ \"../../src/shared/meta-helpers.js\");\n\n\n\n\n\n/**\n * Returns the `opts.option` $option value of the given `opts.component`.\n * If methods are encountered, they will be bound to the component context.\n * If `opts.deep` is true, will recursively merge all child component\n * `opts.option` $option values into the returned result.\n *\n * @param  {Object} opts - options\n * @param  {Object} opts.component - Vue component to fetch option data from\n * @param  {Boolean} opts.deep - look for data in child components as well?\n * @param  {Function} opts.arrayMerge - how should arrays be merged?\n * @param  {String} opts.keyName - the name of the option to look for\n * @param  {Object} [result={}] - result so far\n * @return {Object} result - final aggregated result\n */\n\nfunction getComponentOption(options = {}, component, result = {}) {\n  const {\n    keyName,\n    metaTemplateKeyName,\n    tagIDKeyName\n  } = options;\n  const {\n    $options,\n    $children\n  } = component;\n\n  if (component._inactive) {\n    return result;\n  } // only collect option data if it exists\n\n\n  if ($options[keyName]) {\n    let data = $options[keyName]; // if option is a function, replace it with it's result\n\n    if (Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_0__[\"isFunction\"])(data)) {\n      data = data.call(component);\n    } // ignore data if its not an object, then we keep our previous result\n\n\n    if (!Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_0__[\"isObject\"])(data)) {\n      return result;\n    } // merge with existing options\n\n\n    result = Object(_merge__WEBPACK_IMPORTED_MODULE_2__[\"merge\"])(result, data, options);\n  } // collect & aggregate child options if deep = true\n\n\n  if ($children.length) {\n    $children.forEach(childComponent => {\n      // check if the childComponent is in a branch\n      // return otherwise so we dont walk all component branches unnecessarily\n      if (!Object(_meta_helpers__WEBPACK_IMPORTED_MODULE_4__[\"inMetaInfoBranch\"])(childComponent)) {\n        return;\n      }\n\n      result = getComponentOption(options, childComponent, result);\n    });\n  }\n\n  if (metaTemplateKeyName && result.meta) {\n    // apply templates if needed\n    result.meta.forEach(metaObject => Object(_template__WEBPACK_IMPORTED_MODULE_3__[\"applyTemplate\"])(options, metaObject)); // remove meta items with duplicate vmid's\n\n    result.meta = result.meta.filter((metaItem, index, arr) => {\n      return (// keep meta item if it doesnt has a vmid\n        !metaItem.hasOwnProperty(tagIDKeyName) || // or if it's the first item in the array with this vmid\n        index === Object(_utils_array__WEBPACK_IMPORTED_MODULE_1__[\"findIndex\"])(arr, item => item[tagIDKeyName] === metaItem[tagIDKeyName])\n      );\n    });\n  }\n\n  return result;\n}\n\n//# sourceURL=webpack:////var/www/projects.github/vue-meta/src/shared/getComponentOption.js?")
    /***/ },

  /***/ '../../src/shared/getMetaInfo.js':
  /*! *******************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/shared/getMetaInfo.js ***!
  \*******************************************************************/
  /*! exports provided: default */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return getMetaInfo; });\n/* harmony import */ var _utils_ensure__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ensure */ \"../../src/utils/ensure.js\");\n/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template */ \"../../src/shared/template.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ \"../../src/shared/constants.js\");\n/* harmony import */ var _escaping__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./escaping */ \"../../src/shared/escaping.js\");\n/* harmony import */ var _getComponentOption__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getComponentOption */ \"../../src/shared/getComponentOption.js\");\n\n\n\n\n\n/**\n * Returns the correct meta info for the given component\n * (child components will overwrite parent meta info)\n *\n * @param  {Object} component - the Vue instance to get meta info from\n * @return {Object} - returned meta info\n */\n\nfunction getMetaInfo(options = {}, component, escapeSequences = []) {\n  // collect & aggregate all metaInfo $options\n  let info = Object(_getComponentOption__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(options, component, _constants__WEBPACK_IMPORTED_MODULE_2__[\"defaultInfo\"]); // Remove all \"template\" tags from meta\n  // backup the title chunk in case user wants access to it\n\n  if (info.title) {\n    info.titleChunk = info.title;\n  } // replace title with populated template\n\n\n  if (info.titleTemplate && info.titleTemplate !== '%s') {\n    Object(_template__WEBPACK_IMPORTED_MODULE_1__[\"applyTemplate\"])({\n      component,\n      contentKeyName: 'title'\n    }, info, info.titleTemplate, info.titleChunk || '');\n  } // convert base tag to an array so it can be handled the same way\n  // as the other tags\n\n\n  if (info.base) {\n    info.base = Object.keys(info.base).length ? [info.base] : [];\n  }\n\n  const escapeOptions = {\n    doEscape: value => escapeSequences.reduce((val, [v, r]) => val.replace(v, r), value)\n  };\n  _constants__WEBPACK_IMPORTED_MODULE_2__[\"disableOptionKeys\"].forEach((disableKey, index) => {\n    if (index === 0) {\n      Object(_utils_ensure__WEBPACK_IMPORTED_MODULE_0__[\"ensureIsArray\"])(info, disableKey);\n    } else if (index === 1) {\n      for (const key in info[disableKey]) {\n        Object(_utils_ensure__WEBPACK_IMPORTED_MODULE_0__[\"ensureIsArray\"])(info[disableKey], key);\n      }\n    }\n\n    escapeOptions[disableKey] = info[disableKey];\n  }); // begin sanitization\n\n  info = Object(_escaping__WEBPACK_IMPORTED_MODULE_3__[\"escape\"])(info, options, escapeOptions);\n  return info;\n}\n\n//# sourceURL=webpack:////var/www/projects.github/vue-meta/src/shared/getMetaInfo.js?")
    /***/ },

  /***/ '../../src/shared/merge.js':
  /*! *************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/shared/merge.js ***!
  \*************************************************************/
  /*! exports provided: arrayMerge, merge */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"arrayMerge\", function() { return arrayMerge; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"merge\", function() { return merge; });\n/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! deepmerge */ \"../../node_modules/deepmerge/dist/umd.js\");\n/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(deepmerge__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/array */ \"../../src/utils/array.js\");\n/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template */ \"../../src/shared/template.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ \"../../src/shared/constants.js\");\n\n\n\n\nfunction arrayMerge({\n  component,\n  tagIDKeyName,\n  metaTemplateKeyName,\n  contentKeyName\n}, target, source) {\n  // we concat the arrays without merging objects contained in,\n  // but we check for a `vmid` property on each object in the array\n  // using an O(1) lookup associative array exploit\n  const destination = [];\n  target.forEach((targetItem, targetIndex) => {\n    // no tagID so no need to check for duplicity\n    if (!targetItem[tagIDKeyName]) {\n      destination.push(targetItem);\n      return;\n    }\n\n    const sourceIndex = Object(_utils_array__WEBPACK_IMPORTED_MODULE_1__[\"findIndex\"])(source, item => item[tagIDKeyName] === targetItem[tagIDKeyName]);\n    const sourceItem = source[sourceIndex]; // source doesnt contain any duplicate vmid's, we can keep targetItem\n\n    if (sourceIndex === -1) {\n      destination.push(targetItem);\n      return;\n    } // when sourceItem explictly defines contentKeyName or innerHTML as undefined, its\n    // an indication that we need to skip the default behaviour or child has preference over parent\n    // which means we keep the targetItem and ignore/remove the sourceItem\n\n\n    if (sourceItem.hasOwnProperty(contentKeyName) && sourceItem[contentKeyName] === undefined || sourceItem.hasOwnProperty('innerHTML') && sourceItem.innerHTML === undefined) {\n      destination.push(targetItem); // remove current index from source array so its not concatenated to destination below\n\n      source.splice(sourceIndex, 1);\n      return;\n    } // we now know that targetItem is a duplicate and we should ignore it in favor of sourceItem\n    // if source specifies null as content then ignore both the target as the source\n\n\n    if (sourceItem[contentKeyName] === null || sourceItem.innerHTML === null) {\n      // remove current index from source array so its not concatenated to destination below\n      source.splice(sourceIndex, 1);\n      return;\n    } // now we only need to check if the target has a template to combine it with the source\n\n\n    const targetTemplate = targetItem[metaTemplateKeyName];\n\n    if (!targetTemplate) {\n      return;\n    }\n\n    const sourceTemplate = sourceItem[metaTemplateKeyName];\n\n    if (!sourceTemplate) {\n      // use parent template and child content\n      Object(_template__WEBPACK_IMPORTED_MODULE_2__[\"applyTemplate\"])({\n        component,\n        metaTemplateKeyName,\n        contentKeyName\n      }, sourceItem, targetTemplate);\n    } else if (!sourceItem[contentKeyName]) {\n      // use child template and parent content\n      Object(_template__WEBPACK_IMPORTED_MODULE_2__[\"applyTemplate\"])({\n        component,\n        metaTemplateKeyName,\n        contentKeyName\n      }, sourceItem, undefined, targetItem[contentKeyName]);\n    }\n  });\n  return destination.concat(source);\n}\nfunction merge(target, source, options = {}) {\n  // remove properties explicitly set to false so child components can\n  // optionally _not_ overwrite the parents content\n  // (for array properties this is checked in arrayMerge)\n  if (source.hasOwnProperty('title') && source.title === undefined) {\n    delete source.title;\n  }\n\n  _constants__WEBPACK_IMPORTED_MODULE_3__[\"metaInfoAttributeKeys\"].forEach(attrKey => {\n    if (!source[attrKey]) {\n      return;\n    }\n\n    for (const key in source[attrKey]) {\n      if (source[attrKey].hasOwnProperty(key) && source[attrKey][key] === undefined) {\n        delete source[attrKey][key];\n      }\n    }\n  });\n  return deepmerge__WEBPACK_IMPORTED_MODULE_0___default()(target, source, {\n    arrayMerge: (t, s) => arrayMerge(options, t, s)\n  });\n}\n\n//# sourceURL=webpack:////var/www/projects.github/vue-meta/src/shared/merge.js?")
    /***/ },

  /***/ '../../src/shared/meta-helpers.js':
  /*! ********************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/shared/meta-helpers.js ***!
  \********************************************************************/
  /*! exports provided: hasMetaInfo, inMetaInfoBranch */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasMetaInfo", function() { return hasMetaInfo; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inMetaInfoBranch", function() { return inMetaInfoBranch; });\n/* harmony import */ var _utils_is_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/is-type */ "../../src/utils/is-type.js");\n // Vue $root instance has a _vueMeta object property, otherwise its a boolean true\n\nfunction hasMetaInfo(vm = this) {\n  return vm && (vm._vueMeta === true || Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_0__["isObject"])(vm._vueMeta));\n} // a component is in a metaInfo branch when itself has meta info or one of its (grand-)children has\n\nfunction inMetaInfoBranch(vm = this) {\n  return vm && !Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(vm._vueMeta);\n}\n\n//# sourceURL=webpack:////var/www/projects.github/vue-meta/src/shared/meta-helpers.js?')
    /***/ },

  /***/ '../../src/shared/mixin.js':
  /*! *************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/shared/mixin.js ***!
  \*************************************************************/
  /*! exports provided: default */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return createMixin; });\n/* harmony import */ var _client_triggerUpdate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../client/triggerUpdate */ \"../../src/client/triggerUpdate.js\");\n/* harmony import */ var _utils_is_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/is-type */ \"../../src/utils/is-type.js\");\n/* harmony import */ var _utils_ensure__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/ensure */ \"../../src/utils/ensure.js\");\n/* harmony import */ var _meta_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./meta-helpers */ \"../../src/shared/meta-helpers.js\");\n/* harmony import */ var _nav_guards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./nav-guards */ \"../../src/shared/nav-guards.js\");\n\n\n\n\n\nfunction createMixin(Vue, options) {\n  // for which Vue lifecycle hooks should the metaInfo be refreshed\n  const updateOnLifecycleHook = ['activated', 'deactivated', 'beforeMount']; // watch for client side component updates\n\n  return {\n    beforeCreate() {\n      Object.defineProperty(this, '_hasMetaInfo', {\n        get() {\n          // Show deprecation warning once when devtools enabled\n          if (Vue.config.devtools && !this.$root._vueMeta.hasMetaInfoDeprecationWarningShown) {\n            console.warn('VueMeta DeprecationWarning: _hasMetaInfo has been deprecated and will be removed in a future version. Please use hasMetaInfo(vm) instead'); // eslint-disable-line no-console\n\n            this.$root._vueMeta.hasMetaInfoDeprecationWarningShown = true;\n          }\n\n          return Object(_meta_helpers__WEBPACK_IMPORTED_MODULE_3__[\"hasMetaInfo\"])(this);\n        }\n\n      }); // Add a marker to know if it uses metaInfo\n      // _vnode is used to know that it's attached to a real component\n      // useful if we use some mixin to add some meta tags (like nuxt-i18n)\n\n      if (!Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_1__[\"isUndefined\"])(this.$options[options.keyName]) && this.$options[options.keyName] !== null) {\n        if (!this.$root._vueMeta) {\n          this.$root._vueMeta = {};\n        } // to speed up updates we keep track of branches which have a component with vue-meta info defined\n        // if _vueMeta = true it has info, if _vueMeta = false a child has info\n\n\n        if (!this._vueMeta) {\n          this._vueMeta = true;\n          let p = this.$parent;\n\n          while (p && p !== this.$root) {\n            if (Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_1__[\"isUndefined\"])(p._vueMeta)) {\n              p._vueMeta = false;\n            }\n\n            p = p.$parent;\n          }\n        } // coerce function-style metaInfo to a computed prop so we can observe\n        // it on creation\n\n\n        if (Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_1__[\"isFunction\"])(this.$options[options.keyName])) {\n          if (!this.$options.computed) {\n            this.$options.computed = {};\n          }\n\n          this.$options.computed.$metaInfo = this.$options[options.keyName];\n\n          if (!this.$isServer) {\n            // if computed $metaInfo exists, watch it for updates & trigger a refresh\n            // when it changes (i.e. automatically handle async actions that affect metaInfo)\n            // credit for this suggestion goes to [Sébastien Chopin](https://github.com/Atinux)\n            Object(_utils_ensure__WEBPACK_IMPORTED_MODULE_2__[\"ensuredPush\"])(this.$options, 'created', () => {\n              this.$watch('$metaInfo', function () {\n                Object(_client_triggerUpdate__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, 'watcher');\n              });\n            });\n          }\n        } // force an initial refresh on page load and prevent other lifecycleHooks\n        // to triggerUpdate until this initial refresh is finished\n        // this is to make sure that when a page is opened in an inactive tab which\n        // has throttled rAF/timers we still immediately set the page title\n\n\n        if (Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_1__[\"isUndefined\"])(this.$root._vueMeta.initialized)) {\n          this.$root._vueMeta.initialized = this.$isServer;\n\n          if (!this.$root._vueMeta.initialized) {\n            Object(_utils_ensure__WEBPACK_IMPORTED_MODULE_2__[\"ensuredPush\"])(this.$options, 'mounted', () => {\n              if (!this.$root._vueMeta.initialized) {\n                // refresh meta in nextTick so all child components have loaded\n                this.$nextTick(function () {\n                  this.$root.$meta().refresh();\n                  this.$root._vueMeta.initialized = true;\n                });\n              }\n            }); // add the navigation guards if requested\n\n            if (options.refreshOnceOnNavigation) {\n              Object(_nav_guards__WEBPACK_IMPORTED_MODULE_4__[\"addNavGuards\"])(this);\n            }\n          }\n        } // do not trigger refresh on the server side\n\n\n        if (!this.$isServer) {\n          // add the navigation guards if they havent been added yet\n          // if metaInfo is defined as a function, this does call the computed fn redundantly\n          // but as Vue internally caches the results of computed props it shouldnt hurt performance\n          if (!options.refreshOnceOnNavigation && (this.$options[options.keyName].afterNavigation || this.$options.computed.$metaInfo && this.$options.computed.$metaInfo().afterNavigation)) {\n            Object(_nav_guards__WEBPACK_IMPORTED_MODULE_4__[\"addNavGuards\"])(this);\n          } // no need to add this hooks on server side\n\n\n          updateOnLifecycleHook.forEach(lifecycleHook => {\n            Object(_utils_ensure__WEBPACK_IMPORTED_MODULE_2__[\"ensuredPush\"])(this.$options, lifecycleHook, () => Object(_client_triggerUpdate__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, lifecycleHook));\n          }); // re-render meta data when returning from a child component to parent\n\n          Object(_utils_ensure__WEBPACK_IMPORTED_MODULE_2__[\"ensuredPush\"])(this.$options, 'destroyed', () => {\n            // Wait that element is hidden before refreshing meta tags (to support animations)\n            const interval = setInterval(() => {\n              if (this.$el && this.$el.offsetParent !== null) {\n                /* istanbul ignore next line */\n                return;\n              }\n\n              clearInterval(interval);\n\n              if (!this.$parent) {\n                /* istanbul ignore next line */\n                return;\n              }\n\n              Object(_client_triggerUpdate__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, 'destroyed');\n            }, 50);\n          });\n        }\n      }\n    }\n\n  };\n}\n\n//# sourceURL=webpack:////var/www/projects.github/vue-meta/src/shared/mixin.js?")
    /***/ },

  /***/ '../../src/shared/nav-guards.js':
  /*! ******************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/shared/nav-guards.js ***!
  \******************************************************************/
  /*! exports provided: addNavGuards */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addNavGuards", function() { return addNavGuards; });\n/* harmony import */ var _utils_is_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/is-type */ "../../src/utils/is-type.js");\n\nfunction addNavGuards(vm) {\n  // return when nav guards already added or no router exists\n  if (vm.$root._vueMeta.navGuards || !vm.$root.$router) {\n    /* istanbul ignore next */\n    return;\n  }\n\n  vm.$root._vueMeta.navGuards = true;\n  const $router = vm.$root.$router;\n  const $meta = vm.$root.$meta();\n  $router.beforeEach((to, from, next) => {\n    $meta.pause();\n    next();\n  });\n  $router.afterEach(() => {\n    const {\n      metaInfo\n    } = $meta.resume();\n\n    if (metaInfo && metaInfo.afterNavigation && Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(metaInfo.afterNavigation)) {\n      metaInfo.afterNavigation(metaInfo);\n    }\n  });\n}\n\n//# sourceURL=webpack:////var/www/projects.github/vue-meta/src/shared/nav-guards.js?')
    /***/ },

  /***/ '../../src/shared/options.js':
  /*! ***************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/shared/options.js ***!
  \***************************************************************/
  /*! exports provided: setOptions, getOptions */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setOptions", function() { return setOptions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOptions", function() { return getOptions; });\n/* harmony import */ var _utils_is_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/is-type */ "../../src/utils/is-type.js");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "../../src/shared/constants.js");\n\n\nfunction setOptions(options) {\n  // combine options\n  options = Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_0__["isObject"])(options) ? options : {};\n\n  for (const key in _constants__WEBPACK_IMPORTED_MODULE_1__["defaultOptions"]) {\n    if (!options[key]) {\n      options[key] = _constants__WEBPACK_IMPORTED_MODULE_1__["defaultOptions"][key];\n    }\n  }\n\n  return options;\n}\nfunction getOptions(options) {\n  const optionsCopy = {};\n\n  for (const key in options) {\n    optionsCopy[key] = options[key];\n  }\n\n  return optionsCopy;\n}\n\n//# sourceURL=webpack:////var/www/projects.github/vue-meta/src/shared/options.js?')
    /***/ },

  /***/ '../../src/shared/pausing.js':
  /*! ***************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/shared/pausing.js ***!
  \***************************************************************/
  /*! exports provided: pause, resume */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pause", function() { return pause; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resume", function() { return resume; });\nfunction pause(refresh = true) {\n  this.$root._vueMeta.paused = true;\n  return () => resume(refresh);\n}\nfunction resume(refresh = true) {\n  this.$root._vueMeta.paused = false;\n\n  if (refresh) {\n    return this.$root.$meta().refresh();\n  }\n}\n\n//# sourceURL=webpack:////var/www/projects.github/vue-meta/src/shared/pausing.js?')
    /***/ },

  /***/ '../../src/shared/template.js':
  /*! ****************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/shared/template.js ***!
  \****************************************************************/
  /*! exports provided: applyTemplate */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyTemplate", function() { return applyTemplate; });\n/* harmony import */ var _utils_is_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/is-type */ "../../src/utils/is-type.js");\n\nfunction applyTemplate({\n  component,\n  metaTemplateKeyName,\n  contentKeyName\n}, headObject, template, chunk) {\n  if (Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(template)) {\n    template = headObject[metaTemplateKeyName];\n    delete headObject[metaTemplateKeyName];\n  } // return early if no template defined\n\n\n  if (!template) {\n    return false;\n  }\n\n  if (Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(chunk)) {\n    chunk = headObject[contentKeyName];\n  }\n\n  headObject[contentKeyName] = Object(_utils_is_type__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(template) ? template.call(component, chunk) : template.replace(/%s/g, chunk);\n  return true;\n}\n\n//# sourceURL=webpack:////var/www/projects.github/vue-meta/src/shared/template.js?')
    /***/ },

  /***/ '../../src/utils/array.js':
  /*! ************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/utils/array.js ***!
  \************************************************************/
  /*! exports provided: findIndex, toArray, includes */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"findIndex\", function() { return findIndex; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toArray\", function() { return toArray; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"includes\", function() { return includes; });\n/*\n * To reduce build size, this file provides simple polyfills without\n * overly excessive type checking and without modifying\n * the global Array.prototype\n * The polyfills are automatically removed in the commonjs build\n * Also, only files in client/ & shared/ should use these functions\n * files in server/ still use normal js function\n */\n// this const is replaced by rollup to true for umd builds\n// which means the polyfills are removed for other build formats\nconst polyfill = \"development\" === 'test';\nfunction findIndex(array, predicate) {\n  if (polyfill && !Array.prototype.findIndex) {\n    // idx needs to be a Number, for..in returns string\n    for (let idx = 0; idx < array.length; idx++) {\n      if (predicate.call(arguments[2], array[idx], idx, array)) {\n        return idx;\n      }\n    }\n\n    return -1;\n  }\n\n  return array.findIndex(predicate, arguments[2]);\n}\nfunction toArray(arg) {\n  if (polyfill && !Array.from) {\n    return Array.prototype.slice.call(arg);\n  }\n\n  return Array.from(arg);\n}\nfunction includes(array, value) {\n  if (polyfill && !Array.prototype.includes) {\n    for (const idx in array) {\n      if (array[idx] === value) {\n        return true;\n      }\n    }\n\n    return false;\n  }\n\n  return array.includes(value);\n}\n\n//# sourceURL=webpack:////var/www/projects.github/vue-meta/src/utils/array.js?")
    /***/ },

  /***/ '../../src/utils/ensure.js':
  /*! *************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/utils/ensure.js ***!
  \*************************************************************/
  /*! exports provided: ensureIsArray, ensuredPush */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ensureIsArray", function() { return ensureIsArray; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ensuredPush", function() { return ensuredPush; });\n/* harmony import */ var _is_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-type */ "../../src/utils/is-type.js");\n\nfunction ensureIsArray(arg, key) {\n  if (!key || !Object(_is_type__WEBPACK_IMPORTED_MODULE_0__["isObject"])(arg)) {\n    return Object(_is_type__WEBPACK_IMPORTED_MODULE_0__["isArray"])(arg) ? arg : [];\n  }\n\n  if (!Object(_is_type__WEBPACK_IMPORTED_MODULE_0__["isArray"])(arg[key])) {\n    arg[key] = [];\n  }\n\n  return arg;\n}\nfunction ensuredPush(object, key, el) {\n  ensureIsArray(object, key);\n  object[key].push(el);\n}\n\n//# sourceURL=webpack:////var/www/projects.github/vue-meta/src/utils/ensure.js?')
    /***/ },

  /***/ '../../src/utils/is-type.js':
  /*! **************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/utils/is-type.js ***!
  \**************************************************************/
  /*! exports provided: isArray, isUndefined, isObject, isFunction, isString */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isArray\", function() { return isArray; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isUndefined\", function() { return isUndefined; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isObject\", function() { return isObject; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isFunction\", function() { return isFunction; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isString\", function() { return isString; });\n/**\n * checks if passed argument is an array\n * @param  {any}  arg - the object to check\n * @return {Boolean} - true if `arg` is an array\n */\nfunction isArray(arg) {\n  return Array.isArray(arg);\n}\nfunction isUndefined(arg) {\n  return typeof arg === 'undefined';\n}\nfunction isObject(arg) {\n  return typeof arg === 'object';\n}\nfunction isFunction(arg) {\n  return typeof arg === 'function';\n}\nfunction isString(arg) {\n  return typeof arg === 'string';\n}\n\n//# sourceURL=webpack:////var/www/projects.github/vue-meta/src/utils/is-type.js?")
    /***/ },

  /***/ '../../src/utils/window.js':
  /*! *************************************************************!*\
  !*** /var/www/projects.github/vue-meta/src/utils/window.js ***!
  \*************************************************************/
  /*! exports provided: hasGlobalWindowFn, hasGlobalWindow */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasGlobalWindowFn", function() { return hasGlobalWindowFn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasGlobalWindow", function() { return hasGlobalWindow; });\n/* harmony import */ var _is_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-type */ "../../src/utils/is-type.js");\n\nfunction hasGlobalWindowFn() {\n  try {\n    return !Object(_is_type__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(window);\n  } catch (e) {\n    return false;\n  }\n}\nconst hasGlobalWindow = hasGlobalWindowFn();\n\n//# sourceURL=webpack:////var/www/projects.github/vue-meta/src/utils/window.js?')
    /***/ },

  /***/ '../fixtures/basic/App.vue':
  /*! *********************************!*\
  !*** ../fixtures/basic/App.vue ***!
  \*********************************/
  /*! exports provided: default */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_vue_vue_type_template_id_1e38b0e9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=1e38b0e9& */ "../fixtures/basic/App.vue?vue&type=template&id=1e38b0e9&");\n/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ "../fixtures/basic/App.vue?vue&type=script&lang=js&");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(\n  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],\n  _App_vue_vue_type_template_id_1e38b0e9___WEBPACK_IMPORTED_MODULE_0__["render"],\n  _App_vue_vue_type_template_id_1e38b0e9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = "fixtures/basic/App.vue"\n/* harmony default export */ __webpack_exports__["default"] = (component.exports);\n\n//# sourceURL=webpack:///../fixtures/basic/App.vue?')
    /***/ },

  /***/ '../fixtures/basic/App.vue?vue&type=script&lang=js&':
  /*! **********************************************************!*\
  !*** ../fixtures/basic/App.vue?vue&type=script&lang=js& ***!
  \**********************************************************/
  /*! exports provided: default */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib!../../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=js& */ "../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/index.js?!../fixtures/basic/App.vue?vue&type=script&lang=js&");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); \n\n//# sourceURL=webpack:///../fixtures/basic/App.vue?')
    /***/ },

  /***/ '../fixtures/basic/App.vue?vue&type=template&id=1e38b0e9&':
  /*! ****************************************************************!*\
  !*** ../fixtures/basic/App.vue?vue&type=template&id=1e38b0e9& ***!
  \****************************************************************/
  /*! exports provided: render, staticRenderFns */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_1e38b0e9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=1e38b0e9& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!../fixtures/basic/App.vue?vue&type=template&id=1e38b0e9&");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_1e38b0e9___WEBPACK_IMPORTED_MODULE_0__["render"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_1e38b0e9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });\n\n\n\n//# sourceURL=webpack:///../fixtures/basic/App.vue?')
    /***/ },

  /***/ '../fixtures/basic/client.js':
  /*! ***********************************!*\
  !*** ../fixtures/basic/client.js ***!
  \***********************************/
  /*! no exports provided */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"../../node_modules/vue/dist/vue.esm.js\");\n/* harmony import */ var _src_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../src/browser */ \"../../src/browser.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue */ \"../fixtures/basic/App.vue\");\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./router */ \"../fixtures/basic/router.js\");\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(_src_browser__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n_App_vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"].router = Object(_router__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\nnew vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"](_App_vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"]).$mount('#app');\n\n//# sourceURL=webpack:///../fixtures/basic/client.js?")
    /***/ },

  /***/ '../fixtures/basic/router.js':
  /*! ***********************************!*\
  !*** ../fixtures/basic/router.js ***!
  \***********************************/
  /*! exports provided: default */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return createRouter; });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"../../node_modules/vue/dist/vue.esm.js\");\n/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-router */ \"../../node_modules/vue-router/dist/vue-router.esm.js\");\n/* harmony import */ var _views_home_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./views/home.vue */ \"../fixtures/basic/views/home.vue\");\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(vue_router__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\nconst Post = () => Promise.resolve().then(() => _interopRequireWildcard(__webpack_require__(/*! ./views/about.vue */ \"../fixtures/basic/views/about.vue\")));\n\nfunction createRouter() {\n  return new vue_router__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n    mode: 'hash',\n    base: '/',\n    routes: [{\n      path: '/',\n      component: _views_home_vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n    }, {\n      path: '/about',\n      component: Post\n    }]\n  });\n}\n\n//# sourceURL=webpack:///../fixtures/basic/router.js?")
    /***/ },

  /***/ '../fixtures/basic/views/about.vue':
  /*! *****************************************!*\
  !*** ../fixtures/basic/views/about.vue ***!
  \*****************************************/
  /*! exports provided: default */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _about_vue_vue_type_template_id_6a878a14___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./about.vue?vue&type=template&id=6a878a14& */ "../fixtures/basic/views/about.vue?vue&type=template&id=6a878a14&");\n/* harmony import */ var _about_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./about.vue?vue&type=script&lang=js& */ "../fixtures/basic/views/about.vue?vue&type=script&lang=js&");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(\n  _about_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],\n  _about_vue_vue_type_template_id_6a878a14___WEBPACK_IMPORTED_MODULE_0__["render"],\n  _about_vue_vue_type_template_id_6a878a14___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = "fixtures/basic/views/about.vue"\n/* harmony default export */ __webpack_exports__["default"] = (component.exports);\n\n//# sourceURL=webpack:///../fixtures/basic/views/about.vue?')
    /***/ },

  /***/ '../fixtures/basic/views/about.vue?vue&type=script&lang=js&':
  /*! ******************************************************************!*\
  !*** ../fixtures/basic/views/about.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
  /*! exports provided: default */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_about_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib!../../../../node_modules/vue-loader/lib??vue-loader-options!./about.vue?vue&type=script&lang=js& */ "../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/index.js?!../fixtures/basic/views/about.vue?vue&type=script&lang=js&");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_about_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); \n\n//# sourceURL=webpack:///../fixtures/basic/views/about.vue?')
    /***/ },

  /***/ '../fixtures/basic/views/about.vue?vue&type=template&id=6a878a14&':
  /*! ************************************************************************!*\
  !*** ../fixtures/basic/views/about.vue?vue&type=template&id=6a878a14& ***!
  \************************************************************************/
  /*! exports provided: render, staticRenderFns */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_about_vue_vue_type_template_id_6a878a14___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./about.vue?vue&type=template&id=6a878a14& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!../fixtures/basic/views/about.vue?vue&type=template&id=6a878a14&");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_about_vue_vue_type_template_id_6a878a14___WEBPACK_IMPORTED_MODULE_0__["render"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_about_vue_vue_type_template_id_6a878a14___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });\n\n\n\n//# sourceURL=webpack:///../fixtures/basic/views/about.vue?')
    /***/ },

  /***/ '../fixtures/basic/views/home.vue':
  /*! ****************************************!*\
  !*** ../fixtures/basic/views/home.vue ***!
  \****************************************/
  /*! exports provided: default */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_vue_vue_type_template_id_2b0853a8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.vue?vue&type=template&id=2b0853a8& */ "../fixtures/basic/views/home.vue?vue&type=template&id=2b0853a8&");\n/* harmony import */ var _home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.vue?vue&type=script&lang=js& */ "../fixtures/basic/views/home.vue?vue&type=script&lang=js&");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(\n  _home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],\n  _home_vue_vue_type_template_id_2b0853a8___WEBPACK_IMPORTED_MODULE_0__["render"],\n  _home_vue_vue_type_template_id_2b0853a8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = "fixtures/basic/views/home.vue"\n/* harmony default export */ __webpack_exports__["default"] = (component.exports);\n\n//# sourceURL=webpack:///../fixtures/basic/views/home.vue?')
    /***/ },

  /***/ '../fixtures/basic/views/home.vue?vue&type=script&lang=js&':
  /*! *****************************************************************!*\
  !*** ../fixtures/basic/views/home.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
  /*! exports provided: default */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib!../../../../node_modules/vue-loader/lib??vue-loader-options!./home.vue?vue&type=script&lang=js& */ "../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/index.js?!../fixtures/basic/views/home.vue?vue&type=script&lang=js&");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); \n\n//# sourceURL=webpack:///../fixtures/basic/views/home.vue?')
    /***/ },

  /***/ '../fixtures/basic/views/home.vue?vue&type=template&id=2b0853a8&':
  /*! ***********************************************************************!*\
  !*** ../fixtures/basic/views/home.vue?vue&type=template&id=2b0853a8& ***!
  \***********************************************************************/
  /*! exports provided: render, staticRenderFns */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_template_id_2b0853a8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./home.vue?vue&type=template&id=2b0853a8& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!../fixtures/basic/views/home.vue?vue&type=template&id=2b0853a8&");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_template_id_2b0853a8___WEBPACK_IMPORTED_MODULE_0__["render"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_template_id_2b0853a8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });\n\n\n\n//# sourceURL=webpack:///../fixtures/basic/views/home.vue?')
    /***/ }

/******/ })
