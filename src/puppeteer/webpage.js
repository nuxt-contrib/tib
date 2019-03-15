import Webpage from '../webpage'

export default class PuppeteerWebpage extends Webpage {
  async open(url, readyCondition = 'body') {
    this.page = await this.driver.newPage()

    await this.browser.callHook('page:created', this.page)

    await this.page.goto(url)

    if (readyCondition) {
      await this.page.waitFor(readyCondition)
    }

    return this.returnProxy()
  }

  runScript(...args) {
    return this.page.evaluate(...args)
  }

  getHtml() {
    return this.page.evaluate(() => window.document.documentElement.outerHTML)
  }

  getTitle() {
    return this.page.title()
  }
}
