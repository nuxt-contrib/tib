import BrowserstackLocalBrowser from '../../browserstack/local'

export default class IEBrowserStackLocalBrowser extends BrowserstackLocalBrowser {
  constructor(config) {
    super(config)

    this.setBrowser('ie')
  }
}
