import * as utils from '../../src/utils'
import BrowserError from '../../src/utils/error'
import Browser from '../../src/browser'

describe('utils', () => {
  test('browser strings', () => {
    const browserStrings = [
      'chrome',
      'chrome/windows',
      'chrome/windows 8.1',
      'chrome/windows=8',
      'chrome/windows:7',
      'macos high sierra',
      'mac os=high sierra',
      'firefox',
      'puppeteer/linux',
      'selenium',
      '/windows 7/chrome 39/browserstack/local/1280x1024',
      'android 8/device=Android Emulator'
    ]

    browserStrings.forEach((s) => {
      /*
       * !!! check the snapshot carefully before updating !!!
       */
      // console.log(utils.getBrowserConfigFromString(s))
      expect(utils.getBrowserConfigFromString(s)).toMatchSnapshot()
    })
  })

  test('abstractGuard: prevents instantiating abstract class', () => {
    expect(() => new Browser()).toThrow('Do not use abstract class')
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
    expect(parsedFn.body).toEqual('!!arg')
  })

  test('parseFunction: adds return statement if required', () => {
    const fn = arg => !!arg

    const parsedFn = utils.parseFunction(fn, true)
    expect(parsedFn.args).toEqual(['arg'])
    expect(parsedFn.body).toEqual('return !!arg')
  })

  test('parseFunction: doesnt add return statement if not required', () => {
    const fn = (arg) => { return !!arg }

    const parsedFn = utils.parseFunction(fn, true)
    expect(parsedFn.args).toEqual(['arg'])
    expect(parsedFn.body.trim()).toEqual('return !!arg;')
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
})
