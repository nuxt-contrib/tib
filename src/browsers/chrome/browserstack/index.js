import BrowserStackBrowser from '../../browserstack'

export default class ChromeBrowserStackBrowser extends BrowserStackBrowser {
  constructor(config) {
    super(config)

    this.setBrowser('chrome')
  }
}
