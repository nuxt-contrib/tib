import * as utils from '../../src/utils'
import BrowserError from '../../src/utils/error'
import Browser from '../../src/browsers/browser'

describe('utils', () => {
  test('browser strings', async () => {
    const browserStrings = [
      'chrome',
      'chrome/windows',
      'chrome/windows 8.1',
      'chrome/windows=8',
      'chrome/windows:7',
      'macos high sierra/chrome',
      'mac os=high sierra/firefox',
      'firefox/headless',
      'puppeteer/linux',
      'selenium',
      'puppeteer',
      'windows 7/chrome 39/browserstack/local/1280x1024',
      'browserstack/android 8/device=Android Emulator'
    ]

    await Promise.all(browserStrings.map(async (s) => {
      /*
       * !!! check the snapshot carefully before updating !!!
       */
      // console.log(utils.getBrowserConfigFromString(s))
      expect(utils.getBrowserConfigFromString(s)).toMatchSnapshot()

      // quick test just to make sure no combo throws error
      await expect(Browser.get(s, { BrowserStackLocal: { key: 'key' } })).resolves.not.toThrow()
    }))
  })

  test('abstractGuard: prevents instantiating abstract class', () => {
    expect(() => new Browser()).toThrow('Do not use abstract class')
  })

  test('loadDependency: throws error on non-existing dependency', async () => {
    await expect(utils.loadDependency('does-not-exists')).rejects.toThrow(`BrowserError: Could not import the required dependency 'does-not-exists'`)
  })

  test('enableTimers: reinstates timers in Jest environment', () => {
    const spy = jest.spyOn(jest, 'useRealTimers').mockImplementation(() => {})
    utils.enableTimers()

    // TODO: spying on jest fns doesnt work
    expect(spy).toHaveBeenCalledTimes(0)
    jest.restoreAllMocks()
  })

  test('parseFunction: should throw error when argumentis not a fn', () => {
    expect(() => utils.parseFunction('test')).toThrow('BrowserError')
  })

  test('parseFunction: returns parsed function', () => {
    const fn = arg => !!arg

    const parsedFn = utils.parseFunction(fn)
    expect(parsedFn.args).toEqual(['arg'])
    expect(parsedFn.body).toEqual('return !!arg;')
  })

  test('parseFunction: doesnt add return statement if not required', () => {
    const fn = (arg) => { return !!arg }

    const parsedFn = utils.parseFunction(fn)
    expect(parsedFn.args).toEqual(['arg'])
    expect(parsedFn.body.trim()).toEqual('return !!arg;')
  })

  test('parseFunction: transpiles bodyblock-less arrow function to target', () => {
    const fn = arg => !!arg

    const parsedFn = utils.parseFunction(fn, { targets: { safari: '5.1' } })
    expect(parsedFn.args).toEqual(['arg'])
    expect(parsedFn.body.trim()).toEqual('return !!arg;')
  })
  test('parseFunction: transpiles bodyblock-less arrow function to target', () => {
    const fn = arg => !!arg

    const parsedFn = utils.parseFunction(fn, { targets: { safari: '5.1' } })
    expect(parsedFn.args).toEqual(['arg'])
    expect(parsedFn.body.trim()).toEqual('return !!arg;')
  })

  test('parseFunction: transpiles arrow function to target', () => {
    const fn = (arg, ret) => {
      if (ret) {
        return !!arg
      }

      return !arg
    }

    const parsedFn = utils.parseFunction(fn, { targets: { safari: '5.1' } })
    expect(parsedFn.args).toEqual(['arg', 'ret'])
    expect(parsedFn.body.trim()).toEqual(`if (ret) {
    return !!arg;
  }

  return !arg;`)
  })

  test('parseFunction: transpiles function with inner arrow fn to target', () => {
    const fn = function (arg) {
      return () => !!arg
    }

    const parsedFn = utils.parseFunction(fn, { targets: { safari: '5.1' } })
    expect(parsedFn.args).toEqual(['arg'])
    expect(parsedFn.body.trim()).toEqual(`return function () {
    return !!arg;
  };`)
  })

  test('parseFunction: caches transpiled functions per preset option', () => {
    const fn = function (arg) {
      return () => !!arg
    }

    const parsedFn = utils.parseFunction(fn, { targets: { chrome: 71 } })
    expect(parsedFn.args).toEqual(['arg'])
    expect(parsedFn.body.trim()).toEqual(`return () => !!arg;`)
  })

  test('default html compiler should work', () => {
    const compiler = utils.getDefaultHtmlCompiler()
    const ast = compiler('<div id="test">')

    expect(ast).toEqual(expect.any(Object))
    expect(ast).toMatchSnapshot()
  })

  test('should accept error with only message', () => {
    const error = new BrowserError('my test error')
    expect(error.message).toBe('BrowserError: my test error')
  })

  test('should accept error with class instance', () => {
    class MyTestClass {}
    const instance = new MyTestClass()

    const error = new BrowserError(instance, 'my test error')
    expect(error.message).toBe('MyTestClass: my test error')
  })

  test('should accept error with identifier string', () => {
    const error = new BrowserError('TestIdentifier', 'my test error')
    expect(error.message).toBe('TestIdentifier: my test error')
  })

  test('timers', async () => {
    utils.disableTimers()

    const start = process.hrtime.bigint()
    const waitPromise = utils.waitFor(250)
    jest.runAllTimers()
    await waitPromise

    const duration = parseInt(process.hrtime.bigint() - start) / 1e6

    expect(duration).toBeLessThan(250)

    utils.enableTimers()
  })

  test('fs: exists', async () => {
    expect(await utils.exists(__dirname)).toBe(true)
    expect(await utils.exists(`${__dirname}/doesnt-exists`)).toBe(false)
  })

  test('fs: stats', async () => {
    expect(await utils.stats(__dirname)).toBeTruthy()
    expect(await utils.stats(`${__dirname}/doesnt-exists`)).toBe(false)
  })
})
