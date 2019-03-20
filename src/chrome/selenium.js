import ChromeDetector from '../utils/detectors/chrome'
import SeleniumBrowser from '../selenium'
import SeleniumLogging from '../selenium/logging'
import BrowserError from '../utils/error'

export default class ChromeSeleniumBrowser extends SeleniumLogging(SeleniumBrowser) {
  constructor(config) {
    super(config)

    this.setBrowser('chrome')

    this.hook('selenium:build:before', async (builder) => {
      let path = process.env.CHROME_EXECUTABLE_PATH

      if (!path) {
        path = new ChromeDetector().detect()
      }

      if (!path) {
        throw new BrowserError(this, 'Could not find Chrome executable path')
      }

      const configArguments = [
        'no-sandbox',
        'disable-setuid-sandbox',
        ...this.config.browserArguments
      ]

      const options = new ChromeSeleniumBrowser.Options()
      options.setChromeBinaryPath(path)
      options.addArguments(...configArguments)

      await this.callHook('selenium:build:options', options, builder)

      builder.setChromeOptions(options)
    })
  }

  setHeadless() {
    super.setHeadless()
    this.config.browserArguments.push('disable-gpu')
  }

  async _loadDependencies() {
    super._loadDependencies()

    if (!ChromeSeleniumBrowser.chromedriver) {
      ChromeSeleniumBrowser.chromedriver = await this.loadDependency('chromedriver')
    }

    if (!ChromeSeleniumBrowser.Options) {
      const { Options } = await this.loadDependency('selenium-webdriver/chrome')
      ChromeSeleniumBrowser.Options = Options
    }
  }
}
