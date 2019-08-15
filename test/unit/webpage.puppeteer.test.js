import Browser from '../../src/browsers/puppeteer'

describe('puppeteer/webpage', () => {
  let browser
  let webpage
  let spy

  beforeAll(() => {
    browser = new Browser()

    spy = jest.fn()
    browser.driver = {
      newPage() {
        return Promise.resolve({
          goto: (...args) => spy('goto', ...args),
          waitFor: (...args) => spy('waitFor', ...args),
          evaluate: (...args) => spy('evaluate', ...args),
          title: (...args) => spy('title', ...args)
        })
      }
    }
  })

  afterEach(() => jest.clearAllMocks())

  test('should open page', async () => {
    const webPath = '/'
    webpage = await browser.page(webPath)
    expect(spy).toHaveBeenCalledWith('goto', webPath)
    expect(spy).toHaveBeenCalledWith('waitFor', 'body')
  })

  test('should implement getHtml', () => {
    webpage.getHtml()
    expect(spy).toHaveBeenCalledWith('evaluate', expect.any(Function))
  })

  test('should implement getTitle', () => {
    webpage.getTitle()
    expect(spy).toHaveBeenCalledWith('title')
  })

  test('should implement runScript', () => {
    const fn = () => {}
    webpage.runScript(fn, 'something')
    expect(spy).toHaveBeenCalledWith('evaluate', expect.any(Function), expect.any(Array), 'something')
  })
})
