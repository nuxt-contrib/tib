import BrowserStackLocal from '../utils/commands/browserstack-local'
import BrowserStackBrowser from './'

export default class BrowserStackLocalBrowser extends BrowserStackBrowser {
  constructor(config) {
    super(config)

    // https://www.browserstack.com/local-testing#modifiers
    this.localConfig = {
      start: true,
      stop: true,
      key: this.getConfigProperty('key'),
      ...this.config.BrowserStackLocal
    }

    if (this.localConfig.start || typeof this.localConfig.start === 'undefined') {
      this.hook('start:before', () => BrowserStackLocal.start(this.localConfig))
    }

    if (this.localConfig.stop || typeof this.localConfig.stop === 'undefined') {
      this.hook('close:after', () => BrowserStackLocal.stop())
    }
  }

  async _loadDependencies() {
    super._loadDependencies()

    if (this.localConfig.start || typeof this.localConfig.start === 'undefined') {
      await BrowserStackLocal.loadDriver()
    }
  }

  async _start(capabilities = {}) {
    this.addCapability('browserstack.local', true)

    await super._start(capabilities)
  }

  getLocalFolderUrl(path = '/') {
    return `http://${this.getConfigProperty('user')}.browserstack.com${path}`
  }
}
