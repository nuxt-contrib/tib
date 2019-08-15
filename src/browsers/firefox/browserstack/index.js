import BrowserStackBrowser from '../../browserstack'

export default class FirefoxBrowserStackBrowser extends BrowserStackBrowser {
  constructor(config) {
    super(config)

    this.setBrowser('firefox')
  }
}
