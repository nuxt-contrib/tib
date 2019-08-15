import { BrowserError, abstractGuard, parseFunction, getDefaultHtmlCompiler } from '../utils'

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

  returnProxy() {
    return new Proxy(this, {
      get(target, property) {
        target.browser.callHook('webpage:property', property)

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

  getBabelPresetOptions({ polyfills = false } = {}) {
    const presetOptions = {}

    const browser = this.browser.getBrowser()
    const version = this.browser.getBrowserVersion()

    if (browser && version) {
      presetOptions.targets = {
        [browser]: version
      }
    }

    if (polyfills) {
      presetOptions.useBuiltIns = polyfills === true ? 'usage' : polyfills
    }

    return presetOptions
  }

  getHtml() {}

  runScript(...args) {}

  runAsyncScript(...args) {
    return this.runScript(...args)
  }

  async getElement(selector) {
    const html = await this.getElementHtml(selector)
    return this.getHtmlCompiler()(html)
  }

  async getElements(selector) {
    const htmls = await this.getElementsHtml(selector)
    const htmlCompiler = this.getHtmlCompiler()
    return htmls.map(html => htmlCompiler(html))
  }

  getElementFromPage(pageFunction, selector, ...args) {
    const parsedFn = parseFunction(pageFunction, this.getBabelPresetOptions())

    // It would be bettter to return undefined when no el exists,
    // but selenium always returns null for undefined so better to keep
    // the return value consistent

    /* eslint-disable no-var */
    return this.runScript(
      /* istanbul ignore next */
      function (selector, fn, args) {
        var el = document.querySelector(selector)
        if (!el) {
          return null
        }

        return (new (Function.bind.apply(Function, fn))()).apply(null, [el].concat(args))
      },
      selector,
      [null, ...parsedFn.args, parsedFn.body],
      args
    )
    /* eslint-enable no-var */
  }

  getElementsFromPage(pageFunction, selector, ...args) {
    const parsedFn = parseFunction(pageFunction, this.getBabelPresetOptions())

    /* eslint-disable no-var */
    return this.runScript(
      /* istanbul ignore next */
      function (selector, fn, args) {
        var els = document.querySelectorAll(selector)
        return (new (Function.bind.apply(Function, fn))()).apply(null, [Array.prototype.slice.call(els)].concat(args))
      },
      selector,
      [null, ...parsedFn.args, parsedFn.body],
      args
    )
    /* eslint-enable no-var */
  }

  getElementCount(selector) {
    /* istanbul ignore next */
    const pageFn = els => els.length
    return this.getElementsFromPage(pageFn, selector)
  }

  getElementHtml(selector) {
    /* istanbul ignore next */
    const pageFn = el => el.outerHTML
    return this.getElementFromPage(pageFn, selector)
  }

  getElementsHtml(selector) {
    /* istanbul ignore next */
    const pageFn = els => els.map(el => el.outerHTML)
    return this.getElementsFromPage(pageFn, selector)
  }

  getAttribute(selector, attribute) {
    /* istanbul ignore next */
    const pageFn = (el, attribute) => el.getAttribute(attribute)
    return this.getElementFromPage(pageFn, selector, attribute)
  }

  getAttributes(selector, attribute) {
    /* istanbul ignore next */
    const pageFn = (els, attribute) => els.map(el => el.getAttribute(attribute))
    return this.getElementsFromPage(pageFn, selector, attribute)
  }

  getText(selector, trim) {
    /* istanbul ignore next */
    const pageFn = el => el.textContent
    return this.getElementFromPage(pageFn, selector).then(text => (trim ? text.trim() : text))
  }

  getTexts(selector, trim) {
    /* istanbul ignore next */
    const pageFn = els => els.map(el => el.textContent)
    return this.getElementsFromPage(pageFn, selector).then(texts => (trim ? texts.map(t => t.trim()) : texts))
  }

  clickElement(selector) {
    /* istanbul ignore next */
    const pageFn = el => el.click()
    return this.getElementFromPage(pageFn, selector)
  }
}
