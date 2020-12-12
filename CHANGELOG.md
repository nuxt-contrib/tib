# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.7.5](https://github.com/nuxt-contrib/tib/compare/v0.7.4...v0.7.5) (2020-12-12)


### Bug Fixes

* replace deprecated waitFor (resolves: [#63](https://github.com/nuxt-contrib/tib/issues/63)) ([542024f](https://github.com/nuxt-contrib/tib/commit/542024f5b37def13e6c7a0846fec481c6486cfa8))

### [0.7.4](https://github.com/nuxt-contrib/tib/compare/v0.7.3...v0.7.4) (2019-11-27)


### Bug Fixes

* **detection:** Invalid Chrome detection command ([#37](https://github.com/nuxt-contrib/tib/issues/37)) ([ded2478](https://github.com/nuxt-contrib/tib/commit/ded2478b0394a34231f17540755c1408cd74901f))

### [0.7.3](https://github.com/nuxt-contrib/tib/compare/v0.7.2...v0.7.3) (2019-11-05)


### Bug Fixes

* **detection:** Chrome detection fails on MacOs Catalina  ([#30](https://github.com/nuxt-contrib/tib/issues/30)) ([c2527c6](https://github.com/nuxt-contrib/tib/commit/c2527c6)), closes [#29](https://github.com/nuxt-contrib/tib/issues/29)

### [0.7.2](https://github.com/nuxt-contrib/tib/compare/v0.7.1...v0.7.2) (2019-09-09)


### Bug Fixes

* **selenium:** add mapping for browser log levels to selenium ([d78fd28](https://github.com/nuxt-contrib/tib/commit/d78fd28))
* **static-server:** always set folder when unset ([e4b5cf4](https://github.com/nuxt-contrib/tib/commit/e4b5cf4))
* correct regexp for detecting chrome ([#27](https://github.com/nuxt-contrib/tib/issues/27)) ([28ca90b](https://github.com/nuxt-contrib/tib/commit/28ca90b)), closes [#23](https://github.com/nuxt-contrib/tib/issues/23)

### [0.7.1](https://github.com/nuxt-contrib/tib/compare/v0.7.0...v0.7.1) (2019-08-15)


### Bug Fixes

* remove circular dependencies in utils ([062b66e](https://github.com/nuxt-contrib/tib/commit/062b66e))

## [0.7.0](https://github.com/nuxt-contrib/tib/compare/v0.6.5...v0.7.0) (2019-08-15)


### Bug Fixes

* only slice transpiled code if wrapped in block ([086b395](https://github.com/nuxt-contrib/tib/commit/086b395))


### Features

* add jsdom browser ([c2288ba](https://github.com/nuxt-contrib/tib/commit/c2288ba))
* support loading page functions from files using webpack ([#19](https://github.com/nuxt-contrib/tib/issues/19)) ([5f3322b](https://github.com/nuxt-contrib/tib/commit/5f3322b))

### [0.6.5](https://github.com/nuxt-contrib/tib/compare/v0.6.4...v0.6.5) (2019-07-28)


### Bug Fixes

* change repository url ([7609958](https://github.com/nuxt-contrib/tib/commit/7609958))



### [0.6.4](https://github.com/nuxt-contrib/tib/compare/v0.6.3...v0.6.4) (2019-07-28)


### Bug Fixes

* use 'folder: false' to use bs-local with an internal server ([8bd4abc](https://github.com/nuxt-contrib/tib/commit/8bd4abc))



### [0.6.3](https://github.com/nuxt-contrib/tib/compare/v0.6.2...v0.6.3) (2019-07-14)


### Bug Fixes

* **staticserver:** keep ref to config ([e6fde22](https://github.com/nuxt-contrib/tib/commit/e6fde22))



### [0.6.2](https://github.com/nuxt-contrib/tib/compare/v0.6.1...v0.6.2) (2019-07-14)


### Bug Fixes

* dont return early in getElementsFromPage ([4324211](https://github.com/nuxt-contrib/tib/commit/4324211))


### Features

* add quiet option to disable logs ([0025dbb](https://github.com/nuxt-contrib/tib/commit/0025dbb))



### [0.6.1](https://github.com/nuxt-contrib/tib/compare/v0.6.0...v0.6.1) (2019-07-13)


### Bug Fixes

* dont overwrite staticServer config ([be5675c](https://github.com/nuxt-contrib/tib/commit/be5675c))



## [0.6.0](https://github.com/nuxt-contrib/tib/compare/v0.5.2...v0.6.0) (2019-07-13)


### Bug Fixes

* ignore grep errors for chrome detector ([262ae34](https://github.com/nuxt-contrib/tib/commit/262ae34))


### Features

* add static webserver command ([9b075d4](https://github.com/nuxt-contrib/tib/commit/9b075d4))
* add trim option to getText(s) ([1caadd0](https://github.com/nuxt-contrib/tib/commit/1caadd0))


### Tests

* fix for selenium ([7533ed4](https://github.com/nuxt-contrib/tib/commit/7533ed4))



## [0.5.2](https://github.com/nuxt-contrib/tib/compare/v0.5.1...v0.5.2) (2019-05-05)



## [0.5.1](https://github.com/nuxt-contrib/tib/compare/v0.5.0...v0.5.1) (2019-04-03)


### Bug Fixes

* use correct es5 entry point ([cc68e67](https://github.com/nuxt-contrib/tib/commit/cc68e67))



# [0.5.0](https://github.com/nuxt-contrib/tib/compare/v0.4.0...v0.5.0) (2019-03-26)


### Bug Fixes

* detect chrome correctly on darwin (use egrep) ([c6068a2](https://github.com/nuxt-contrib/tib/commit/c6068a2))
* implement safari correctly ([15c4d8b](https://github.com/nuxt-contrib/tib/commit/15c4d8b))
* only enable xfvb by default on supported platforms ([d6df88c](https://github.com/nuxt-contrib/tib/commit/d6df88c))
* only load xfvb by default on supported platforms ([52fac06](https://github.com/nuxt-contrib/tib/commit/52fac06))


### Features

* rename browser export to createBrowser ([d62e935](https://github.com/nuxt-contrib/tib/commit/d62e935))



# [0.4.0](https://github.com/nuxt-contrib/tib/compare/v0.3.0...v0.4.0) (2019-03-21)


### Features

* add mocked timer detection and try to workaround them ([ea9409c](https://github.com/nuxt-contrib/tib/commit/ea9409c))



# [0.3.0](https://github.com/nuxt-contrib/tib/compare/v0.2.2...v0.3.0) (2019-03-21)


### Bug Fixes

* add exit listeners to exit child procs on interruption ([744dcff](https://github.com/nuxt-contrib/tib/commit/744dcff))


### Features

* auto transpile when browser version is specified ([f610f25](https://github.com/nuxt-contrib/tib/commit/f610f25))



## [0.2.2](https://github.com/nuxt-contrib/tib/compare/v0.2.1...v0.2.2) (2019-03-20)


### Bug Fixes

* **browserstack:** only set default os when not set ([3fa0322](https://github.com/nuxt-contrib/tib/commit/3fa0322))



## [0.2.1](https://github.com/nuxt-contrib/tib/compare/v0.2.0...v0.2.1) (2019-03-20)



# [0.2.0](https://github.com/nuxt-contrib/tib/compare/v0.1.0...v0.2.0) (2019-03-20)


### Bug Fixes

* **selenium:** make sync scripts work in run async ([596f2ad](https://github.com/nuxt-contrib/tib/commit/596f2ad))


### Features

* add cjs build ([aa6cdd4](https://github.com/nuxt-contrib/tib/commit/aa6cdd4))
* improvments ([d3db982](https://github.com/nuxt-contrib/tib/commit/d3db982))
* split puppeteer/puppeteer-core ([341356b](https://github.com/nuxt-contrib/tib/commit/341356b))



# 0.1.0 (2019-03-15)


### Bug Fixes

* dont throw error when Xvfb is already running (which is fine) ([35eaccb](https://github.com/nuxt-contrib/tib/commit/35eaccb))
