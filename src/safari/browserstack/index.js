import BrowserStackBrowser from '../../browserstack'

export default class SafariBrowserStackBrowser extends BrowserStackBrowser {
  constructor(config) {
    super(config)

    this.setBrowser('safari')
  }
}
