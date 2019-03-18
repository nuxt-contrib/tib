import Webpage from '../webpage'
import { parseFunction } from '../utils'

export default class SeleniumWebpage extends Webpage {
  async open(url, readyCondition = 'body') {
    await this.driver.get(url)

    await this.browser.callHook('page:created', this.driver)

    SeleniumWebpage.By = this.browser.constructor.webdriver.By
    SeleniumWebpage.until = this.browser.constructor.webdriver.until

    if (readyCondition) {
      if (typeof readyCondition === 'function') {
        await this.driver.wait(readyCondition)
      } else {
        const el = await SeleniumWebpage.until.elementLocated(SeleniumWebpage.By.css(readyCondition))
        await SeleniumWebpage.until.elementIsVisible(el)
      }
    }

    return this.returnProxy(() => this.browser.flushLogs())
  }

  runScript(fn, ...args) {
    return this.driver.executeScript(fn, ...args)
  }

  runAsyncScript(fn, ...args) {
    const parsedFn = parseFunction(fn, true)

    const argStr = parsedFn.args.reduce((acc, v, i) => `${acc}var ${v} = arguments[${i}]; `, '')
    const script = `${argStr}
    var callback = arguments[arguments.length - 1];
    var retVal = (function() { ${parsedFn.body}; })()
    if (retVal && retVal.then) {
      retVal.then(callback)
    } else {
      callback(retVal)
    }
`
    return this.driver.executeAsyncScript(script, ...args)
  }

  getHtml() {
    return this.driver.getPageSource()
  }

  async getWebElement(selector, fn = el => el) {
    return fn(await this.driver.findElement(SeleniumWebpage.By.css(selector)))
  }

  async getWebElements(selector, fn = els => els) {
    return Promise.all((await this.driver.findElements(SeleniumWebpage.By.css(selector))).map(fn))
  }

  /*
   * WARNING: WebElements seem to return <empty string> instead
   * of null when attribute doesnt exist
   */
  getWebAttribute(selector, attribute) {
    return this.getWebElement(selector, el => el.getAttribute(attribute))
  }

  getWebAttributes(selector, attribute) {
    return this.getWebElements(selector, el => el.getAttribute(attribute))
  }
}
