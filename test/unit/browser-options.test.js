import Browser from '../../src/browser'
import PuppeteerBrowser from '../../src/puppeteer'
import PuppeteerCoreBrowser from '../../src/puppeteer/core'
import ChromeSeleniumBrowser from '../../src/chrome/selenium'
import FirefoxSeleniumBrowser from '../../src/firefox'

process.env.PUPPETEER_EXECUTABLE_PATH = '/usr/bin/chromium-browser'
process.env.CHROME_EXECUTABLE_PATH = '/usr/bin/chromium-browser'

describe('browser options', () => {
  test('chrome/puppeteer', async () => {
    let browser
    await expect(Browser.get('chrome/puppeteer').then(b => (browser = b))).resolves.not.toThrow()

    expect(browser).toBeInstanceOf(PuppeteerBrowser)
    expect(browser.config.browserConfig.browser).toBe('chrome')
    expect(browser.config.xvfb).toBe(true)
  })

  test('chrome/puppeteer/headless/xvfb', async () => {
    let browser
    await expect(Browser.get('chrome/puppeteer/headless/xvfb').then(b => (browser = b))).resolves.not.toThrow()

    expect(browser).toBeInstanceOf(PuppeteerBrowser)
    expect(browser.config.browserConfig.browser).toBe('chrome')
    expect(browser.config.xvfb).toBe(false)
  })

  test('chrome/selenium', async () => {
    let browser
    await expect(Browser.get('chrome/selenium').then(b => (browser = b))).resolves.not.toThrow()

    expect(browser).toBeInstanceOf(ChromeSeleniumBrowser)
    expect(browser.config.browserConfig.browser).toBe('chrome')
    expect(browser.config.xvfb).toBe(true)
  })

  test('chrome/selenium/headless', async () => {
    let browser
    await expect(Browser.get('chrome/selenium/headless').then(b => (browser = b))).resolves.not.toThrow()

    expect(browser).toBeInstanceOf(ChromeSeleniumBrowser)
    expect(browser.config.browserConfig.browser).toBe('chrome')
    expect(browser.config.xvfb).toBe(false)
  })

  test('firefox', async () => {
    let browser
    await expect(Browser.get('firefox').then(b => (browser = b))).resolves.not.toThrow()

    expect(browser).toBeInstanceOf(FirefoxSeleniumBrowser)
    expect(browser.config.browserConfig.browser).toBe('firefox')
    expect(browser.config.xvfb).toBe(true)
  })

  test('firefox/headless', async () => {
    let browser
    await expect(Browser.get('firefox/headless').then(b => (browser = b))).resolves.not.toThrow()

    expect(browser).toBeInstanceOf(FirefoxSeleniumBrowser)
    expect(browser.config.browserConfig.browser).toBe('firefox')
    expect(browser.config.xvfb).toBe(false)
  })

  test('chrome', async () => {
    let browser
    await expect(Browser.get('chrome').then(b => (browser = b))).resolves.not.toThrow()

    expect(browser).toBeInstanceOf(PuppeteerCoreBrowser)
    expect(browser.config.browserConfig.browser).toBe('chrome')
    expect(browser.config.xvfb).toBe(true)
  })

  test('chrome/headless/xvfb', async () => {
    let browser
    await expect(Browser.get('chrome/headless/xvfb').then(b => (browser = b))).resolves.not.toThrow()

    expect(browser).toBeInstanceOf(PuppeteerCoreBrowser)
    expect(browser.config.browserConfig.browser).toBe('chrome')
    expect(browser.config.xvfb).toBe(false)
  })
})
