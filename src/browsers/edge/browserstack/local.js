import BrowserstackLocalBrowser from '../../browserstack/local'

export default class EdgeBrowserStackLocalBrowser extends BrowserstackLocalBrowser {
  constructor(config) {
    super(config)

    this.setBrowser('edge')
  }
}
