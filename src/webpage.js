import BrowserError from './utils/error'
import { abstractGuard, parseFunction, getDefaultHtmlCompiler } from './utils'

export default class Webpage {
  constructor(browser) {
    abstractGuard('Webpage', new.target)

    if (!browser || !browser.driver) {
      throw new BrowserError(this, 'Browser driver is required, has the browser been started succesfully?')
    }

    this.browser = browser
    this.driver = this.browser.driver
    this.userExtended = {}
  }

  returnProxy(fn) {
    if (fn && typeof fn !== 'function') {
      fn = undefined
    }

    return new Proxy(this, {
      get(target, property) {
        if (fn) {
          fn()
        }

        if (target.userExtended && target.userExtended[property]) {
          return target.userExtended[property]
        }

        if (target[property]) {
          return target[property]
        }

        if (target.page && target.page[property]) {
          return target.page[property]
        }

        return target.driver[property]
      }
    })
  }

  extend(extendWith = {}) {
    this.userExtended = extendWith
  }

  getHtmlCompiler() {
    if (this._htmlCompiler) {
      return this._htmlCompiler
    }

    let htmlCompiler
    if (typeof this.driver.htmlCompiler === 'function') {
      htmlCompiler = this.driver.htmlCompiler
    }

    if (!htmlCompiler || typeof htmlCompiler !== 'function') {
      htmlCompiler = getDefaultHtmlCompiler()
    }

    this._htmlCompiler = htmlCompiler
    return this._htmlCompiler
  }

  getHtml() {}

  runScript(...args) {}

  runAsyncScript(...args) {
    return this.runScript(...args)
  }

  async getElement(selector) {
    const html = await this.getElementFromPage(el => el.outerHTML, selector)
    return this.getHtmlCompiler()(html)
  }

  async getElements(selector) {
    const htmls = await this.getElementsFromPage(els => els.map(el => el.outerHTML), selector)
    const htmlCompiler = this.getHtmlCompiler()
    return htmls.map(html => htmlCompiler(html))
  }

  getElementFromPage(pageFunction, selector, ...args) {
    const parsedFn = parseFunction(pageFunction, true)

    return this.runScript(
      (selector, fn, args) => new (Function.bind.apply(Function, fn))().apply(null, (args.unshift(document.querySelector(selector)) && args)),
      selector,
      [null, ...parsedFn.args, parsedFn.body],
      args
    )
  }

  getElementsFromPage(pageFunction, selector, ...args) {
    const parsedFn = parseFunction(pageFunction, true)

    return this.runScript(
      (selector, fn, args) => new (Function.bind.apply(Function, fn))().apply(null, (args.unshift(Array.prototype.slice.call(document.querySelectorAll(selector))) && args)),
      selector,
      [null, ...parsedFn.args, parsedFn.body],
      args
    )
  }

  getElementCount(selector) {
    return this.getElementsFromPage(els => els.length, selector)
  }

  getAttribute(selector, attribute) {
    return this.getElementFromPage((el, attribute) => el.getAttribute(attribute), selector, attribute)
  }

  getAttributes(selector, attribute) {
    return this.getElementsFromPage((els, attribute) => els.map(el => el.getAttribute(attribute)), selector, attribute)
  }

  getText(selector) {
    return this.getElementFromPage(el => el.textContent, selector)
  }

  getTexts(selector) {
    return this.getElementsFromPage(els => els.map(el => el.textContent), selector)
  }
}
