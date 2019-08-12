import BrowserStackBrowser from '../../browserstack'

export default class EdgeBrowserStackBrowser extends BrowserStackBrowser {
  constructor(config) {
    super(config)

    this.setBrowser('edge')
  }
}
