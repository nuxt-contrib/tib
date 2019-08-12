import Webpage from '../webpage'
import { parseFunction } from '../../utils'

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

  runScript(pageFunction, ...args) {
    let parsedFn
    if (typeof pageFunction === 'function') {
      parsedFn = parseFunction(pageFunction, args, this.getBabelPresetOptions())
    } else {
      parsedFn = pageFunction
    }

    // It would be bettter to return undefined when no el exists,
    // but selenium always returns null for undefined so better to keep
    // the return value consistent
    return this.page.evaluate(
      /* istanbul ignore next */
      function (fn, ...args) {
        return (new (Function.bind.apply(Function, fn))()).apply(null, [].concat(args))
      },
      [null, ...parsedFn.args, parsedFn.body],
      ...args
    )
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
