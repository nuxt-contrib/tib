# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

# [0.5.0](https://github.com/pimlie/tib/compare/v0.4.0...v0.5.0) (2019-03-26)


### Bug Fixes

* detect chrome correctly on darwin (use egrep) ([c6068a2](https://github.com/pimlie/tib/commit/c6068a2))
* implement safari correctly ([15c4d8b](https://github.com/pimlie/tib/commit/15c4d8b))
* only enable xfvb by default on supported platforms ([d6df88c](https://github.com/pimlie/tib/commit/d6df88c))
* only load xfvb by default on supported platforms ([52fac06](https://github.com/pimlie/tib/commit/52fac06))


### Features

* rename browser export to createBrowser ([d62e935](https://github.com/pimlie/tib/commit/d62e935))



# [0.4.0](https://github.com/pimlie/tib/compare/v0.3.0...v0.4.0) (2019-03-21)


### Features

* add mocked timer detection and try to workaround them ([ea9409c](https://github.com/pimlie/tib/commit/ea9409c))



# [0.3.0](https://github.com/pimlie/tib/compare/v0.2.2...v0.3.0) (2019-03-21)


### Bug Fixes

* add exit listeners to exit child procs on interruption ([744dcff](https://github.com/pimlie/tib/commit/744dcff))


### Features

* auto transpile when browser version is specified ([f610f25](https://github.com/pimlie/tib/commit/f610f25))



## [0.2.2](https://github.com/pimlie/tib/compare/v0.2.1...v0.2.2) (2019-03-20)


### Bug Fixes

* **browserstack:** only set default os when not set ([3fa0322](https://github.com/pimlie/tib/commit/3fa0322))



## [0.2.1](https://github.com/pimlie/tib/compare/v0.2.0...v0.2.1) (2019-03-20)



# [0.2.0](https://github.com/pimlie/tib/compare/v0.1.0...v0.2.0) (2019-03-20)


### Bug Fixes

* **selenium:** make sync scripts work in run async ([596f2ad](https://github.com/pimlie/tib/commit/596f2ad))


### Features

* add cjs build ([aa6cdd4](https://github.com/pimlie/tib/commit/aa6cdd4))
* improvments ([d3db982](https://github.com/pimlie/tib/commit/d3db982))
* split puppeteer/puppeteer-core ([341356b](https://github.com/pimlie/tib/commit/341356b))



# 0.1.0 (2019-03-15)


### Bug Fixes

* dont throw error when Xvfb is already running (which is fine) ([35eaccb](https://github.com/pimlie/tib/commit/35eaccb))
