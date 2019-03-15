# test in browser (tib)
<a href="https://circleci.com/gh/pimlie/tib/"><img src="https://badgen.net/circleci/github/pimlie/tib" alt="Build Status"></a>
[![Coverage Status](https://coveralls.io/repos/github/pimlie/tib/badge.svg?branch=master)](https://coveralls.io/github/pimlie/tib?branch=master)
[![npm](https://img.shields.io/npm/dt/tib.svg)](https://www.npmjs.com/package/tib)
[![npm (scoped with tag)](https://img.shields.io/npm/v/tib/latest.svg)](https://www.npmjs.com/package/tib)

Helper classes for e2e browser testing in Node with a uniform interface.

Supported browsers (locally):
- Puppeteer (core)
- Selenium (generic)
- Firefox
- Chrome

Supported providers:
- BrowserStack

All browser/provider specific dependencies are peer dependencies and are dynamically loaded

## Features

- `getElement(s)` return AST (using [`vue-template-compiler`](https://www.npmjs.com/package/vue-template-compiler))
- Very easy to write scripts which run in the browser
  - just remember to only use language features the loaded page already has polyfills for
- Supports BrowserStack-Local to easily tests local code
- Automatically starts Xvfb for non-headless support (on supported platforms)

## Example

(and options list for now)

also check [our e2e tests](./test/e2e) for more information

```js
import { browser, commands: { Xvfb, BrowserStackLocal } } from 'tib'

describe('e2e', () => {
  let myBrowser
  beforeAll(async () => {
    myBrowser = browser('windows 10/chrome 71/browserstack/local/1920x1080', {
      xvfb: false, // if true then Xvfb is automatically started before the browser
                   // and the displayNum=99 added to the process.env
      BrowserStackLocal: {
        start: true, // default, if false then call 'const pid = await BrowserStackLocal.start()'
        stop: true,  // default, if false then call 'await BrowserStackLocal.stop(pid)'
        user: process.env.BROWSERSTACK_USER,
        key: process.env.BROWSERSTACK_KEY,
        folder: process.cwd()
      },
      extendPage(page) {
        return {
          getRouteData() {
            return page.runScript(() => {
              // this function is executed within the page context
              // if you use features like Promises and are testing on
              // older browsers make sure you have a polyfill already
              // loaded
              return myRouter.currentRoute
            })
          },
          async navigate(path) {
            // IMPORTANT: if you use an (arrow) function then use
            // a block'ed body due to an upstream issue
            await page.runAsyncScript((path) => {
              // this function is executed within the page context
              // if you use features like Promises and are testing on
              // older browsers make sure you have a polyfill already
              // loaded
              return new Promise(resolve => {
                myRouter.on('navigationFinished', resolve)
                window.myRouter.navigate(path)
              })
            }, path)
          }
        }
      }
    })
  })

  afterAll(() => {
    await myBrowser.close()
  })

  test('router', async () => {
    // note: this method is only available for browserstack/local browsers
    const url = myBrowser.getLocalFolderUrl()

    const page = await myBrowser.page(url)

    // you should probably expect and not log this
    console.log(await page.getHtml())
    console.log(await page.getElement('div'))
    console.log(await page.getElements('div'))
    console.log(await page.getElementCount('div'))
    console.log(await page.getAttribute('div', 'id'))
    console.log(await page.getAttributes('div', 'id'))
    console.log(await page.getText('h1'))
    console.log(await page.getTexts('h1, h2'))
    console.log(await page.getTitle())

    await page.navigate('/about')
    console.log(await page.getRouteData())

    console.log(await page.getTitle())
  })
})
```

## Babel config

This package exports ES6 code, so you will probably need to tell Babel to also transpile this package

> use `babel.config.js` if Babel fails to transpile with `.babelrc.js`

Install the [dynamic-import-node](https://github.com/airbnb/babel-plugin-dynamic-import-node) plugin:
```sh
yarn add babel-plugin-dynamic-import-node
```

```js
module.exports = {
  env: {
    test: {
      exclude: /node_modules\/(?!(tib))/,
      plugins: ['dynamic-import-node'],
      presets: [
        [ '@babel/preset-env', {
          targets: {
            node: 'current'
          }
        }]
      ]
    }
  },
}
```

## Known issues / caveats

- On CircleCI puppeteer sometimes triggers `Protocol error (Runtime.callFunctionOn): Target closed` error on page.evaluate
  - _workaround_: use `chrome/selenium`
- `runScript` / `runAsyncScript` wont work with functions without a body block ([upstream issue](https://github.com/tunnckoCoreLabs/parse-function/issues/179))
  - _workaround_: use `() => { ... }`

## Thanks
- [Team Nuxt.js](https://github.com/nuxt/nuxt.js/) for lending a browserstack key

## TODO
- local ie/edge/safari
- more platforms, which ones?
  - SauceLabs (unable to test as I have no key)
- screenshotting
- window sizes
- testing
- ?
