import SeleniumBrowser from '../selenium'

export default class IESeleniumBrowser extends SeleniumBrowser {
  constructor(config) {
    super(config)

    this.setBrowser('ie')

    /* istanbul ignore next */
    this.hook('selenium:build:before', async (builder) => {
      // TODO
      const configArguments = []

      const options = new IESeleniumBrowser.Options()
      options.addArguments(...configArguments)

      await this.callHook('selenium:build:options', options, builder)

      builder.setIEOptions(options)
    })
  }

  /* istanbul ignore next */
  async _loadDependencies() {
    super._loadDependencies()

    if (!IESeleniumBrowser.driverLoaded) {
      if (await this.loadDependency('iedriver')) {
        IESeleniumBrowser.driverLoaded = true
      }
    }

    if (!IESeleniumBrowser.Options) {
      const { Options } = await this.loadDependency('selenium-webdriver/ie')
      IESeleniumBrowser.Options = Options
    }
  }
}
