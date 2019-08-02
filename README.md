# test in browser (tib)
<a href="https://circleci.com/gh/nuxt/tib/"><img src="https://badgen.net/circleci/github/nuxt/tib" alt="Build Status"></a>
<a href="https://codecov.io/gh/nuxt/tib"><img src="https://badgen.net/codecov/c/github/nuxt/tib/master" alt="Coverage Status"></a>
[![npm](https://img.shields.io/npm/dt/tib.svg)](https://www.npmjs.com/package/tib)
[![npm (scoped with tag)](https://img.shields.io/npm/v/tib/latest.svg)](https://www.npmjs.com/package/tib)

Helper classes for e2e browser testing in Node with a uniform interface.

## Introduction

`tib` aims to provide a uniform interface for testing in both Puppeteer and Selenium while using either local browsers or any available 3rd party provider. This way you can write a single e2e test and simply switch the browser environment by changing the [`BrowserString`](#browser-strings)

The term `helper classes` stems from that this package wont enforce test functionality on you (which would require another learning curve). `tib` allows you to use the test suite you are already familair with. Use `tib` to retrieve and assert whether the html you expect to be loaded is really loaded, both on page load as after interacting with it through javascript.

This probably means that `tib` is deliberately less integrated then other packages.

## Supported browsers/drivers/providers:

- Puppeteer
  - \-core
- Selenium
  - Firefox
  - Chrome
  - Safari
  - IE (_untested_)
  - Edge (_untested_)
- jsdom
- BrowserStack

All browser/provider specific dependencies are peer dependencies and are dynamically loaded. You only need to install the peer-dependencies you plan to use

## Features

- Retrieve html as ASTElements (using [`vue-template-compiler`](https://www.npmjs.com/package/vue-template-compiler))
- Very easy to write page function to run in the browser
  - just remember to only use language features the loaded page already has polyfills for
  - syntax is automatically transpiled when browser version is specified
    - e.g. arrow functions will be transpiled to normal functions when you specify 'safari 5.1'
- Supports BrowserStack-Local to easily tests local html files
- Serve your local html files with a simple webserver
- Automatically starts Xvfb for non-headless support (on supported platforms)
  - set `xvfb: false` if you want to specify DISPLAY manually

## Documentation

### Install

```bash
$ yarn add -D tib
```
#### Extra steps on Mac OS with Safari

Make sure to Enable WebDriver Support, see [here](https://developer.apple.com/documentation/webkit/testing_with_webdriver_in_safari) for more information

### Usage

```js
import { createBrowser } from 'tib'

const browserString = 'firefox/headless'
const autoStart = false // default true
const config = {
  extendPage(page) {
    return {
      myPageFn() {
        // do something
      }
    }
  }
}

const browser = await createBrowser(browserString, config, autoStart)
if (!autoStart) {
  await browser.start()
}
```

### Browser Strings

Browser strings are broken up into capability pairs (e.g. `chrome 71` is a capability pair consisting of `browser name` and `browser version`). Those pairs are then matched against a list of known properties (see [constants.js](./src/utils/constants.js) for the full list). Browser and provider properties are used to determine the required import (see [browsers.js](./src/browsers.js)). The remaining properties should be capabilities and are depending on whether the value was recognised applied to the browser instance by calling the corresponding `set<CapabilityName>` methods.

### API

Read the [API reference](./docs/API.md)

## Example

also check [our e2e tests](./test/e2e/basic.test.js) for more information

```js
import { createBrowser, commands: { Xvfb, BrowserStackLocal } } from 'tib'

const browserString = 'windows 10/chrome 71/browserstack/local/1920x1080'
// const browserString = 'puppeteer/core/staticserver'

describe('my e2e test', () => {
  let myBrowser

  beforeAll(async () => {
    myBrowser = await createBrowser(browserString, {
      // if true or undefined then Xvfb is automatically started before
      // the browser and the displayNum=99 added to the process.env
      xvfb: false,
      quiet: false,
      folder: process.cwd(),
      staticServer: {
        host: 'localhost', // or set process.env.HOST
        port: 3000 // or set process.env.PORT
      },
      // only used for BrowserStackLocal browsers
      BrowserStackLocal: {
        start: true, // default, if false then call 'const pid = await BrowserStackLocal.start()'
        stop: true,  // default, if false then call 'await BrowserStackLocal.stop(pid)'
        user: process.env.BROWSERSTACK_USER,
        key: process.env.BROWSERSTACK_KEY
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
            await page.runAsyncScript((path) => {
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
    if (myBrowser) {
      await myBrowser.close()
    }
  })

  test('router', async () => {
    const url = myBrowser.getUrl('/')

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

## FAQ

#### I receive a `WebDriverError: invalid argument: can't kill an exited process` error

Its a Selenium error and means the browser couldnt be started or exited immeditately after start. Try to run with `xvfb: true`

## Known issues / caveats

- If Node force exits then local running commands might keep running (eg geckodriver, chromedriver, Xvfb, browserstack-local)
  - _workaround_: none unfortunately
- On CircleCI puppeteer sometimes triggers `Protocol error (Runtime.callFunctionOn): Target closed` error on page.evaluate. This could be related to a version mismatch between the browser and puppeteer.
  - _workaround_: use `chrome/selenium`
- with Firefox you cannot run two page functions at the same time, also not when they are async
  - _workaround_: combine the functionality you need in a single page function
- with Safari you can get ScriptTimeoutError on asynchronous page function execution. Often the timeout seems false as it is in ms and the scripts are still executed
  - _workaround_: wrap runAsyncScript calls in `try/catch` to just ignore the timeout :)

## Todo's
- local ie/edge
- more platforms
  - SauceLabs (key required)
  - others?
- increase coverage
