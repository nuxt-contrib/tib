import SeleniumBrowser from '../selenium'

export default class SafariSeleniumBrowser extends SeleniumBrowser {
  constructor(config) {
    super(config)

    this.setBrowser('safari')

    /* istanbul ignore next */
    this.hook('selenium:build:before', async (builder) => {
      const options = new SafariSeleniumBrowser.Options()

      await this.callHook('selenium:build:options', options, builder)

      builder.setSafariOptions(options)
    })
  }

  /* istanbul ignore next */
  async _loadDependencies() {
    super._loadDependencies()

    // there is no separate safaridriver, it should already be installed

    if (!SafariSeleniumBrowser.Options) {
      const { Options } = await this.loadDependency('selenium-webdriver/safari')
      SafariSeleniumBrowser.Options = Options
    }
  }
}
