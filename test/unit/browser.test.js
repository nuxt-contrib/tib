import path from 'path'
import { promisify } from 'util'
import Glob from 'glob'
import { browser as get } from '../..'

const glob = promisify(Glob)

function capatilize(name) {
  name = name.replace(/browserstack/i, 'BrowserStack')
  name = name.replace(/^ie/i, 'IE')
  return name.replace(/(^|\/)([a-z])/gi, (m, $1, $2) => $2.toUpperCase())
}

/* eslint-disable no-unused-vars */

const browsers = {
  'browserstack': async (name) => {
    const browser = await standardBrowserTest(name)
  },
  'browserstack/local': async (name) => {
    const browser = await standardBrowserTest(name)
  },
  'ie': async (name) => {
    await expect(get(name)).rejects.toThrow()
  },
  'ie/selenium': async (name) => {
    await expect(get(name)).rejects.toThrow()
  },
  'ie/browserstack': async (name) => {
    const browser = await standardBrowserTest(name)
  },
  'ie/browserstack/local': async (name) => {
    const browser = await standardBrowserTest(name)
  },
  'edge': async (name) => {
    await expect(get(name)).rejects.toThrow()
  },
  'edge/selenium': async (name) => {
    await expect(get(name)).rejects.toThrow()
  },
  'edge/browserstack': async (name) => {
    const browser = await standardBrowserTest(name)
  },
  'edge/browserstack/local': async (name) => {
    const browser = await standardBrowserTest(name)
  },
  'chrome': async (name) => {
    const browser = await standardBrowserTest(name, 'PuppeteerBrowser')
  },
  'chrome/puppeteer': async (name) => {
    const browser = await standardBrowserTest(name, 'PuppeteerBrowser')
  },
  'chrome/selenium': async (name) => {
    const browser = await standardBrowserTest(name)
  },
  'chrome/browserstack': async (name) => {
    const browser = await standardBrowserTest(name)
  },
  'chrome/browserstack/local': async (name) => {
    const browser = await standardBrowserTest(name)
  },
  'firefox': async (name) => {
    const browser = await standardBrowserTest(name, 'FirefoxSeleniumBrowser')
  },
  'firefox/selenium': async (name) => {
    const browser = await standardBrowserTest(name)
  },
  'firefox/browserstack': async (name) => {
    const browser = await standardBrowserTest(name)
  },
  'firefox/browserstack/local': async (name) => {
    const browser = await standardBrowserTest(name)
  },
  'safari': async (name) => {
    await expect(get(name)).rejects.toThrow()
  },
  'safari/selenium': async (name) => {
    await expect(get(name)).rejects.toThrow()
  },
  'safari/browserstack': async (name) => {
    const browser = await standardBrowserTest(name)
  },
  'safari/browserstack/local': async (name) => {
    const browser = await standardBrowserTest(name)
  },
  'selenium': async (name) => {
    const browser = await standardBrowserTest(name)
  },
  'puppeteer': async (name) => {
    const browser = await standardBrowserTest(name)
  },
  'saucelabs': async (name) => {
    await expect(get(name)).rejects.toThrow()
  }
}

async function standardBrowserTest(name, expectedConstructor) {
  if (!expectedConstructor) {
    expectedConstructor = `${capatilize(name)}Browser`
  }
  await expect(get(name, undefined, false)).resolves.not.toThrow()

  const browser = await get(name, undefined, false)
  expect(browser.constructor.name).toBe(expectedConstructor)

  // test setting options in build:before hook for Selenium browsers
  const spy = jest.fn()
  const requestedProperties = []
  const builder = new Proxy({}, {
    get(target, key) {
      requestedProperties.push(key)
      return spy
    }
  })

  await browser.callHook('selenium:build:before', builder)
  if (expectedConstructor.includes('Selenium') && expectedConstructor !== 'SeleniumBrowser') {
    const browserName = name.split('/').shift()

    expect(requestedProperties).toContain(`set${capatilize(browserName)}Options`)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(expect.any(Object))
  }

  return browser
}

describe('browser', () => {
  test('all files covered', async () => {
    const srcPath = path.resolve(__dirname, '../../src/') + '/'
    let files = await glob(`${srcPath}/!(utils)/**/*.js`)
    files = files
      .filter(f => !f.includes('webpage') && !f.includes('logging'))
      .map(f => f
        .replace(srcPath, '')
        .replace('.js', '')
        .replace('index', '')
        .replace(/\/+$/, '')
      )
      .sort()

    expect(Object.keys(browsers).sort()).toEqual(files)
  })

  process.env.PUPPETEER_EXECUTABLE_PATH = '/usr/bin/chromium-browser'
  process.env.CHROME_EXECUTABLE_PATH = '/usr/bin/chromium-browser'
  process.env.BROWSERSTACK_USER = 'user'
  process.env.BROWSERSTACK_KEY = 'key'

  for (const name in browsers) {
    const tests = browsers[name]

    test(name, async () => {
      expect.hasAssertions()

      await tests(name)
    })
  }
})
