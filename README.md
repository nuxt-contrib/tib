# test in browser (tib)
<a href="https://circleci.com/gh/pimlie/tib/"><img src="https://badgen.net/circleci/github/pimlie/tib" alt="Build Status"></a>
<a href="https://codecov.io/gh/pimlie/tib"><img src="https://badgen.net/codecov/c/github/pimlie/tib/master" alt="Coverage Status"></a>
[![npm](https://img.shields.io/npm/dt/tib.svg)](https://www.npmjs.com/package/tib)
[![npm (scoped with tag)](https://img.shields.io/npm/v/tib/latest.svg)](https://www.npmjs.com/package/tib)

Helper classes for e2e browser testing in Node with a uniform interface.

Supported browsers/drivers:
- Puppeteer
  - \-core
- Selenium
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

describe('my e2e test', () => {
  let myBrowser

  beforeAll(async () => {
    myBrowser = await browser('windows 10/chrome 71/browserstack/local/1920x1080', {
      xvfb: false, // if true or undefined then Xvfb is automatically started before
                   // the browser and the displayNum=99 added to the process.env
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
            await page.runAsyncScript((path) => {
              return new Promise(resolve => {
                myRouter.on('navigationFinished', resolve)
                window.myRouter.navigate(path)
              })
            }, path)
          }
        }
      }
    }, true) // autoStart, default True. If false you have to call browser.start()
  })

  afterAll(() => {
    if (myBrowser) {
      await myBrowser.close()
    }
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

If you use this package from source or just manually import the ES6 source, you will probably need to tell Babel to also transpile this package

> use `babel.config.js` if Babel fails to transpile with `.babelrc.js`

Install the [dynamic-import-node](https://github.com/airbnb/babel-plugin-dynamic-import-node) plugin:
```sh
yarn add -D babel-plugin-dynamic-import-node
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

### Jest config

If you use Jest for testing, you might also need to exclude `tib` from the [`transformIgnorePatterns`](https://jestjs.io/docs/en/configuration#transformignorepatterns-array-string) config option:

> You could remove the `exclude` in the Babel config above if you only use this module with Jest, but you still need the `dynamic-import-node` plugin

```js
// jest.config.js
  transformIgnorePatterns: [
    '/node_modules/(?!(tib))/'
  ],

  transform: {
    '^.+\\.js$': 'babel-jest'
  },
```

## FAQ
- I receive a `WebDriverError: invalid argument: can't kill an exited process` error
Its a Selenium error and means the browser couldnt be started or exited immeditately after start. Try to run with `xvfb: true`

## Known issues / caveats

- If you force exit Node then running commands will keep running (eg geckodriver, chromedriver, Xvfb, browserstack-local)
- On CircleCI puppeteer sometimes triggers `Protocol error (Runtime.callFunctionOn): Target closed` error on page.evaluate
  - _workaround_: use `chrome/selenium`
- On Firefox you cannot run two page functions at the same time, also not when they are async

## Thanks
- [Team Nuxt.js](https://github.com/nuxt/nuxt.js/) for providing a browserstack key to test with

## TODO
- validation
- local ie/edge/safari 
- more platforms, which ones?
  - SauceLabs (unable to test as I have no key)
- screenshotting
- increase coverage
- ?
