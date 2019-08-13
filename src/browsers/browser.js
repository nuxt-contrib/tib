import path from 'path'
import Hookable from 'hable'
import onExit from 'signal-exit'
import { Xvfb, StaticServer } from '../commands'
import {
  abstractGuard,
  loadDependency,
  isMockedFunction,
  disableTimers,
  enableTimers,
  getBrowserConfigFromString,
  getBrowserImportFromConfig,
  BrowserError
} from '../utils'
import { browsers } from '.'

export default class Browser extends Hookable {
  constructor(config = {}) {
    super()

    abstractGuard('Browser', new.target)

    this.config = {
      quiet: false,
      ...config
    }

    this.ready = false

    if (config.extendPage && typeof config.extendPage === 'function') {
      this.hook('page:after', async (page) => {
        const extendWith = await config.extendPage(page)
        if (extendWith && typeof extendWith === 'object') {
          page.extend(extendWith)
        }
      })
    }

    this.capabilities = {}

    // before browserConfig
    this.config.browserArguments = this.config.browserArguments || []

    if (this.config.browserConfig) {
      for (const key in this.config.browserConfig) {
        if (key.startsWith('driver') || key.startsWith('provider') || key === 'browserVariant') {
          continue
        }

        if (key === 'staticserver') {
          if (!this.config.staticServer) {
            this.config.staticServer = true
          }
          continue
        }

        if (key === 'xvfb') {
          if (this.config.browserConfig[key] === 'false' || this.config.browserConfig.headless) {
            continue
          }

          if (!this.config.xvfb) {
            this.config.xvfb = Xvfb.isSupported()
          }

          continue
        }

        const fn = `set${key.charAt(0).toUpperCase()}${key.slice(1)}`
        if (this[fn]) {
          this[fn](this.config.browserConfig[key])
        } else {
          console.warn(`browserConfig '${key}' could not be set`) // eslint-disable-line no-console
        }
      }
    }

    if (!this.config.xvfb && this.config.xvfb !== false) {
      this.config.xvfb = Xvfb.isSupported()
    }

    Xvfb.load(this)
    StaticServer.load(this)

    if (isMockedFunction(setTimeout, 'setTimeout')) {
      // eslint-disable-next-line no-console
      console.warn(`Mocked timers detected

The browser probably won't ever start with globally mocked timers. Will try to automatically use real timers on start and set to use fake timers after start. If the browser still hangs and doesn't start, make sure to only mock the global timers after the browser has started `)

      this.hook('start:before', () => enableTimers())
      this.hook('start:after', () => disableTimers())
    }
  }

  static async get(browserString = '', config = {}) {
    const browserConfig = getBrowserConfigFromString(browserString)
    const browserImport = getBrowserImportFromConfig(browserConfig)

    if (!browsers[browserImport]) {
      throw new BrowserError(`Unknown browser, no import exists for '${browserImport}'`)
    }

    try {
      // add browserConfig to config
      config.browserConfig = browserConfig

      const Browser = await browsers[browserImport]()

      const browserInstance = new Browser(config)
      await browserInstance.loadDependencies()
      return browserInstance
    } catch (e) {
      if (e instanceof BrowserError) {
        throw e
      } else {
        throw new BrowserError(`Error occured while loading '${browserConfig.browser || browserString}' browser`, e)
      }
    }
  }

  setLogLevel(level) {}

  async loadDependency(dependency) {
    try {
      return await loadDependency(dependency)
    } catch (e) {
      throw new BrowserError(this, e.message)
    }
  }

  _loadDependencies() {}

  async loadDependencies(...args) {
    await this.callHook('dependencies:load')

    await this._loadDependencies(...args)

    await this.callHook('dependencies:loaded')
  }

  getUrl(urlPath) {
    if (this.config.staticServer) {
      const { host, port } = this.config.staticServer
      return `http://${host}:${port}${urlPath}`
    }

    return `file://${path.join(this.config.folder, urlPath)}`
  }

  getCapabilities(capabilities) {
    if (!capabilities) {
      return this.capabilities
    }

    return {
      ...this.capabilities,
      ...capabilities
    }
  }

  getCapability(capability) {
    return this.capabilities[capability]
  }

  addCapability(key, value) {
    this.capabilities[key] = value
    return this
  }

  addCapabilities(capabilities) {
    this.capabilities = {
      ...this.capabilities,
      ...capabilities
    }
    return this
  }

  setWindow(width, height) {
    if (!height && typeof width === 'object') {
      this.config.window = width
      return this
    }

    this.config.window = { width, height }
    return this
  }

  getBrowser(name) {
    return this.getCapability('browserName')
  }

  setBrowser(name, version = '') {
    this.addCapability('browserName', name)

    if (version) {
      this.setBrowserVersion(version)
    }

    return this
  }

  setHeadless() {
    this.config.xvfb = false
    return this
  }

  getBrowserVersion() { return undefined }

  setBrowserVersion() { return this }

  setOs(...args) { return this.setOS(...args) }

  setOsVersion(...args) { return this.setOSVersion(...args) }

  setOS() { return this }

  setOSVersion() { return this }

  setDevice() { return this }

  isReady() {
    return this.ready
  }

  _start() {}

  _close() {}

  _page() {}

  async start(capabilities, ...args) {
    await this.callHook('start:before')

    try {
      await this._start(capabilities, ...args)

      await this.callHook('start:after', this.driver)

      this.ready = true

      onExit(() => this.close())

      return this
    /* istanbul ignore next */
    } catch (e) {
      await this.close()

      throw new BrowserError(e)
    }
  }

  async close(...args) {
    await this.callHook('close:before')

    await this._close(...args)

    await this.callHook('close:after')
  }

  async page(...args) {
    await this.callHook('page:before')

    const page = await this._page(...args)

    await this.callHook('page:after', page)

    return page
  }
}
