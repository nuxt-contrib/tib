import ChromeDetector from '../../utils/detectors/chrome'
import Browser from '../browser'
import BrowserError from '../../utils/error'
import Webpage from './webpage'

export default class PuppeteerCoreBrowser extends Browser {
  async _loadDependencies() {
    super._loadDependencies()

    if (!PuppeteerCoreBrowser.core) {
      PuppeteerCoreBrowser.core = await this.loadDependency('puppeteer-core')
    }
  }

  setHeadless() {
    super.setHeadless()
    this.config.browserArguments.push('--headless')
  }

  setLogLevel(types) {
    const typeMap = {
      warning: 'warn'
    }

    if (types && typeof types === 'string') {
      types = [types]
    }

    this.hook('page:created', (page) => {
      /* eslint-disable no-console */
      page.on('console', (msg) => {
        const msgType = msg.type()
        let type = typeMap[msgType] || msgType
        if (!types || types.includes(msgType) || types.includes(type)) {
          if (!console[type]) {
            console.warn(`Unknown console type ${type}`)
            type = 'log'
          }
          console[type](msg.text())
        }
      })
      /* eslint-enable no-console */
    })
  }

  async _start(capabilities, ...args) {
    // https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions
    const launchOptions = {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        ...this.config.browserArguments,
        ...args
      ],
      ...capabilities
    }

    if (this.constructor.name === 'PuppeteerCoreBrowser') {
      let executablePath = process.env.PUPPETEER_EXECUTABLE_PATH
      if (!executablePath) {
        const detector = new ChromeDetector()
        executablePath = detector.detect()
      }

      if (!executablePath) {
        throw new BrowserError(this, `Could not find a Chrome executable`)
      }

      launchOptions.executablePath = executablePath
    }

    this.driver = await PuppeteerCoreBrowser.core.launch(launchOptions)
  }

  async _close() {
    if (!this.driver) {
      return
    }

    await this.driver.close()
  }

  _page(url, readyCondition) {
    const page = new Webpage(this)
    return page.open(url, readyCondition)
  }
}
