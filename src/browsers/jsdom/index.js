import Browser from '../browser'
import Webpage from './webpage'

export default class JsdomBrowser extends Browser {
  constructor(config = {}) {
    config.xvfb = false

    super(config)

    this.config.jsdom = this.config.jsdom || {}

    this.logLevels = []
  }

  async _loadDependencies() {
    if (!JsdomBrowser.jsdom) {
      JsdomBrowser.jsdom = await this.loadDependency('jsdom')
    }

    // call super after setting core
    super._loadDependencies()
  }

  setHeadless() {
    this.config.jsdom.pretendToBeVisual = false
  }

  setLogLevel(types) {
    this.config.jsdom.virtualConsole = true

    if (types && typeof types === 'string') {
      types = [types]
    }

    this.logLevels = types
  }

  _start() {
    this.driver = JsdomBrowser.jsdom
  }

  _page(url, readyCondition) {
    const page = new Webpage(this)
    return page.open(url, readyCondition)
  }
}
