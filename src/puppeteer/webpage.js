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

  runScript(fn, ...args) {
    return this.page.evaluate(fn, ...args)
  }

  getHtml() {
    /* istanbul ignore next */
    const pageFn = () => window.document.documentElement.outerHTML
    return this.page.evaluate(pageFn)
  }

  getTitle() {
    return this.page.title()
  }
}
