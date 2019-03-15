import Browser from '../browser'
import Webpage from './webpage'

export default class SeleniumBrowser extends Browser {
  async _loadDependencies() {
    super._loadDependencies()

    if (SeleniumBrowser.webdriver) {
      return
    }

    SeleniumBrowser.webdriver = await this.loadDependency('selenium-webdriver')
  }

  flushLogs() {}

  async _start(capabilities = {}) {
    const builder = new SeleniumBrowser.webdriver.Builder()

    capabilities = this.getCapabilities(capabilities)
    builder.withCapabilities(capabilities)

    await this.callHook('selenium:build:before', builder)

    this.driver = await builder.build()
  }

  async _close() {
    if (!this.driver) {
      return
    }

    await this.driver.quit()
  }

  _page(url, readyCondition) {
    const page = new Webpage(this)
    return page.open(url, readyCondition)
  }
}
