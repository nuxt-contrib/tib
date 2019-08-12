import BrowserStackBrowser from '../../browserstack'

export default class IEBrowserStackBrowser extends BrowserStackBrowser {
  constructor(config) {
    super(config)

    this.setBrowser('ie')
  }
}
