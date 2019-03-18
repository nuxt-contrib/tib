import SeleniumBrowser from '../selenium'

export default class FirefoxSeleniumBrowser extends SeleniumBrowser {
  constructor(config) {
    super(config)

    this.setBrowser('firefox')

    this.hook('selenium:build:before', (builder) => {
      const configArguments = this.config.browserArguments || []

      if (!config.xvfb && !configArguments.some(a => a.includes('headless'))) {
        configArguments.push('headless')
      }

      const options = new FirefoxSeleniumBrowser.Options()
      options.addArguments(...configArguments)

      builder.setFirefoxOptions(options)
    })
  }

  async _loadDependencies() {
    super._loadDependencies()

    if (!FirefoxSeleniumBrowser.driverLoaded) {
      if (await this.loadDependency('geckodriver')) {
        FirefoxSeleniumBrowser.driverLoaded = true
      }
    }

    if (!FirefoxSeleniumBrowser.Options) {
      const { Options } = await this.loadDependency('selenium-webdriver/firefox')
      FirefoxSeleniumBrowser.Options = Options
    }
  }

  setLogLevel() {
    console.warn(`Logging is not supported in firefox`) // eslint-disable-line no-console
  }

  flushLogs() {}
}
