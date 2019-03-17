import Browser from '../../src/selenium'

describe('selenium/webpage', () => {
  let browser
  let webpage
  let spy

  beforeAll(() => {
    browser = new Browser()

    spy = jest.fn()
    browser.constructor.webdriver = {
      By: {
        css: (...args) => spy('By.css', ...args)
      },
      until: {
        elementIsVisible: (...args) => spy('until.elementIsVisible', ...args),
        elementLocated: (...args) => spy('until.elementLocated', ...args)
      }
    }

    const getAttribute = jest.fn()
    const findElement = jest.fn().mockReturnValue({ getAttribute })
    const findElements = jest.fn().mockReturnValue([{ getAttribute }, { getAttribute }])
    browser.driver = {
      get: (...args) => spy('get', ...args),
      wait: (...args) => spy('wait', ...args),
      getPageSource: (...args) => spy('getPageSource', ...args),
      getAttribute,
      findElement,
      findElements,
      executeScript: (...args) => spy('executeScript', ...args),
      executeAsyncScript: (...args) => spy('executeAsyncScript', ...args)
    }
  })

  afterEach(() => jest.clearAllMocks())

  test('should open page', async () => {
    const webPath = '/'
    webpage = await browser.page(webPath)
    expect(spy).toHaveBeenCalledTimes(4)
    expect(spy).toHaveBeenCalledWith('get', webPath)
    expect(spy).toHaveBeenCalledWith('until.elementLocated', undefined)
    expect(spy).toHaveBeenCalledWith('By.css', 'body')
    expect(spy).toHaveBeenCalledWith('until.elementIsVisible', undefined)
  })

  test('should implement getHtml', () => {
    webpage.getHtml()
    expect(spy).toHaveBeenCalledWith('getPageSource')
  })

  test('should implement runScript', () => {
    webpage.runScript(true)
    expect(spy).toHaveBeenCalledWith('executeScript', true)
  })

  test('should run sync script in runAsyncScript and fix blockless bodies', () => {
    // runAsync fixes blockless bodies & sync scripts in async
    const callback = jest.fn()
    const fn = () => true

    webpage.runAsyncScript(fn, true)

    expect(spy).toHaveBeenCalledWith('executeAsyncScript', expect.any(String), true)
    expect(spy.mock.calls[0][1]).toContain('then(callback)')
    expect(spy.mock.calls[0][1]).toMatchSnapshot();

    (function runEval() {
      expect(() => eval(spy.mock.calls[0][1])).not.toThrow() // eslint-disable-line no-eval
    })(callback)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('should run async script in runAsyncScript', async () => {
    const callback = jest.fn()
    const fn = () => { return Promise.resolve(true) }

    webpage.runAsyncScript(fn, true)

    expect(spy).toHaveBeenCalledWith('executeAsyncScript', expect.any(String), true)
    expect(spy.mock.calls[0][1]).toContain('then(callback)')
    expect(spy.mock.calls[0][1]).toMatchSnapshot()

    await new Promise((resolve) => {
      (function runEval() {
        expect(() => eval(spy.mock.calls[0][1])).not.toThrow() // eslint-disable-line no-eval
      })(() => { callback(); resolve() })
    })
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('should implement getWebElement', async () => {
    await webpage.getWebElement()
    expect(browser.driver.findElement).toHaveBeenCalledTimes(1)
  })

  test('should implement getWebElements', async () => {
    await webpage.getWebElements()
    expect(browser.driver.findElements).toHaveBeenCalledTimes(1)
  })

  test('should implement getWebAttribute', async () => {
    await webpage.getWebAttribute()
    expect(browser.driver.findElement).toHaveBeenCalledTimes(1)
    expect(browser.driver.getAttribute).toHaveBeenCalledTimes(1)
  })

  test('should implement getWebAttributes', async () => {
    await webpage.getWebAttributes()
    expect(browser.driver.findElements).toHaveBeenCalledTimes(1)
    expect(browser.driver.getAttribute).toHaveBeenCalledTimes(2)
  })
})
