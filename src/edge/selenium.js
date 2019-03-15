import SeleniumBrowser from '../selenium'

export default class EdgeSeleniumBrowser extends SeleniumBrowser {
  constructor(config) {
    super(config)

    this.setBrowser('edge')

    /* istanbul ignore next */
    this.hook('selenium:build:before', (builder) => {
      // TODO
      const configArguments = []

      const options = new EdgeSeleniumBrowser.Options()
      options.addArguments(...configArguments)

      builder.setEdgeOptions(options)
    })
  }

  /* istanbul ignore next */
  async _loadDependencies() {
    super._loadDependencies()

    if (!EdgeSeleniumBrowser.driverLoaded) {
      if (await this.loadDependency('edgedriver')) {
        EdgeSeleniumBrowser.driverLoaded = true
      }
    }

    if (!EdgeSeleniumBrowser.Options) {
      const { Options } = await this.loadDependency('selenium-webdriver/edge')
      EdgeSeleniumBrowser.Options = Options
    }
  }
}
