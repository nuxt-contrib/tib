import BrowserstackLocalBrowser from '../../browserstack/local'

export default class FirefoxBrowserStackLocalBrowser extends BrowserstackLocalBrowser {
  constructor(config) {
    super(config)

    this.setBrowser('firefox')
  }
}
