import PuppeteerCoreBrowser from './core'

export default class PuppeteerBrowser extends PuppeteerCoreBrowser {
  async _loadDependencies() {
    if (!PuppeteerCoreBrowser.core) {
      PuppeteerCoreBrowser.core = await this.loadDependency('puppeteer')
    }

    // call super after setting core
    super._loadDependencies()
  }
}
