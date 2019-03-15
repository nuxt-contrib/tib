import ChromeDetector from '../utils/detectors/chrome'
import SeleniumBrowser from '../selenium'
import SeleniumLogging from '../selenium/logging'
import BrowserError from '../utils/error'

export default class ChromeSeleniumBrowser extends SeleniumLogging(SeleniumBrowser) {
  constructor(config) {
    super(config)

    this.setBrowser('chrome')

    this.hook('selenium:build:before', (builder) => {
      let path = process.env.CHROME_EXECUTABLE_PATH

      if (!path) {
        path = new ChromeDetector().detect()
      }

      if (!path) {
        throw new BrowserError(this, 'Could not find Chrome executable path')
      }

      const configArguments = this.config.chromeArguments || [
        'headless',
        'disable-gpu',
        // 'disable-impl-side-painting',
        'no-sandbox',
        'disable-setuid-sandbox'
      ]

      const options = new ChromeSeleniumBrowser.Options()
      options.setChromeBinaryPath(path)
      options.addArguments(...configArguments)
      builder.setChromeOptions(options)
    })
  }

  async _loadDependencies() {
    super._loadDependencies()

    if (!ChromeSeleniumBrowser.driverLoaded) {
      if (await this.loadDependency('chromedriver')) {
        ChromeSeleniumBrowser.driverLoaded = true
      }
    }

    if (!ChromeSeleniumBrowser.Options) {
      const { Options } = await this.loadDependency('selenium-webdriver/chrome')
      ChromeSeleniumBrowser.Options = Options
    }
  }
}
