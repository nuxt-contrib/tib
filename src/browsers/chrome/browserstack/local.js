import BrowserstackLocalBrowser from '../../browserstack/local'

export default class ChromeBrowserStackLocalBrowser extends BrowserstackLocalBrowser {
  constructor(config) {
    super(config)

    this.setBrowser('chrome')
  }
}
