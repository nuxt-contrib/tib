import Browser from '../../src/browsers/browser'
import PuppeteerBrowser from '../../src/browsers/puppeteer'
import PuppeteerCoreBrowser from '../../src/browsers/puppeteer/core'
import ChromeSeleniumBrowser from '../../src/browsers/chrome/selenium'
import FirefoxSeleniumBrowser from '../../src/browsers/firefox'
import Xvfb from '../../src/commands/xvfb'

process.env.PUPPETEER_EXECUTABLE_PATH = '/usr/bin/chromium-browser'
process.env.CHROME_EXECUTABLE_PATH = '/usr/bin/chromium-browser'

describe('browser options', () => {
  const xvfbSupportedPlatform = Xvfb.isSupported()

  test('chrome/puppeteer', async () => {
    let browser
    await expect(Browser.get('chrome/puppeteer').then(b => (browser = b))).resolves.not.toThrow()

    expect(browser).toBeInstanceOf(PuppeteerBrowser)
    expect(browser.config.browserConfig.browser).toBe('chrome')
    expect(browser.config.xvfb).toBe(xvfbSupportedPlatform)
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
    expect(browser.config.xvfb).toBe(xvfbSupportedPlatform)
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
    expect(browser.config.xvfb).toBe(xvfbSupportedPlatform)
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
    expect(browser.config.xvfb).toBe(xvfbSupportedPlatform)
  })

  test('chrome/headless/xvfb', async () => {
    let browser
    await expect(Browser.get('chrome/headless/xvfb').then(b => (browser = b))).resolves.not.toThrow()

    expect(browser).toBeInstanceOf(PuppeteerCoreBrowser)
    expect(browser.config.browserConfig.browser).toBe('chrome')
    expect(browser.config.xvfb).toBe(false)
  })

  test('chrome/staticServer', async () => {
    let browser
    await expect(Browser.get('chrome/staticserver').then(b => (browser = b))).resolves.not.toThrow()

    expect(browser).toBeInstanceOf(PuppeteerCoreBrowser)
    expect(browser.config.staticServer).toEqual({ folder: undefined })
  })
})
