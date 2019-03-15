import BrowserstackLocalBrowser from '../../browserstack/local'

export default class SafariBrowserStackLocalBrowser extends BrowserstackLocalBrowser {
  constructor(config) {
    super(config)

    this.setBrowser('safari')
  }
}
