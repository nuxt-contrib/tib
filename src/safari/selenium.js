import SeleniumBrowser from '../selenium'

export default class SafariSeleniumBrowser extends SeleniumBrowser {
  constructor(config) {
    super(config)

    this.setBrowser('safari')

    /* istanbul ignore next */
    this.hook('selenium:build:before', (builder) => {
      // TODO
      const configArguments = []

      const options = new SafariSeleniumBrowser.Options()
      options.addArguments(...configArguments)

      builder.setSafariOptions(options)
    })
  }

  /* istanbul ignore next */
  async _loadDependencies() {
    super._loadDependencies()

    if (!SafariSeleniumBrowser.driverLoaded) {
      if (await this.loadDependency('safaridriver')) {
        SafariSeleniumBrowser.driverLoaded = true
      }
    }

    if (!SafariSeleniumBrowser.Options) {
      const { Options } = await this.loadDependency('selenium-webdriver/safari')
      SafariSeleniumBrowser.Options = Options
    }
  }
}
