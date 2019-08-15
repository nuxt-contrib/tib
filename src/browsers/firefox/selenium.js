import SeleniumBrowser from '../selenium'
import SeleniumLogging from '../selenium/logging'

export default class FirefoxSeleniumBrowser extends SeleniumLogging(SeleniumBrowser) {
  constructor(config) {
    super(config)

    this.setBrowser('firefox')

    this.hook('selenium:build:before', async (builder) => {
      const configArguments = this.config.browserArguments

      if (!config.xvfb && !configArguments.some(a => a.includes('headless'))) {
        configArguments.push('headless')
      }

      const options = new FirefoxSeleniumBrowser.client.Options()
      options.addArguments(...configArguments)

      if (this.config.browserConfig.window) {
        options.windowSize(this.config.browserConfig.window.width, this.config.browserConfig.window.height)
      }

      await this.callHook('selenium:build:options', options, builder)

      builder.setFirefoxOptions(options)
    })
  }

  async _loadDependencies() {
    super._loadDependencies()

    if (!FirefoxSeleniumBrowser.geckodriver) {
      FirefoxSeleniumBrowser.geckodriver = await this.loadDependency('geckodriver')
    }

    if (!FirefoxSeleniumBrowser.client) {
      FirefoxSeleniumBrowser.client = await this.loadDependency('selenium-webdriver/firefox')
    }
  }
}
