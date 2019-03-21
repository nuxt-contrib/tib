import SeleniumBrowser from '../selenium'
import SeleniumLogging from '../selenium/logging'

export default class BrowserStackBrowser extends SeleniumLogging(SeleniumBrowser) {
  constructor(config) {
    // always disable xvfb
    config.xvfb = false

    super(config)

    this.hook('selenium:build:before', (builder) => {
      builder.usingServer('https://hub-cloud.browserstack.com/wd/hub')
    })

    // set default os if user hasnt set anything
    if (!config.browserConfig || !config.browserConfig.os) {
      this.setOS('windows', 10)
    }
  }

  getConfigProperty(property, capabilities = {}, defaulValue) {
    const envKey = `BROWSERSTACK_${property.toUpperCase()}`

    if (process.env[envKey]) {
      return process.env[envKey]
    }

    const confKey = `browserstack.${property}`

    if (capabilities[confKey]) {
      return capabilities[confKey]
    }

    if (this.config.BrowserStackLocal && this.config.BrowserStackLocal[property]) {
      return this.config.BrowserStackLocal[property]
    }

    if (this.config.BrowserStack && this.config.BrowserStack[property]) {
      return this.config.BrowserStack[property]
    }

    if (typeof defaulValue !== 'undefined') {
      return defaulValue
    }

    throw new Error(`${this.constructor.name} could not resolve required config property '${property}'`)
  }

  async _start(capabilities = {}) {
    this.addCapabilities({
      'browserstack.user': this.getConfigProperty('user', capabilities),
      'browserstack.key': this.getConfigProperty('key', capabilities),
      'browserstack.debug': this.getConfigProperty('debug', capabilities, false)
    })

    await super._start(capabilities)
  }

  setHeadless() { return this }

  setWindow(width, height) {
    super.setWindow(width, height)
    this.addCapability('resolution', `${this.config.window.width}x${this.config.window.height}`)
    return this
  }

  getBrowserVersion() {
    return this.getCapability('browser_version')
  }

  setBrowserVersion(version) {
    return this.addCapability('browser_version', version)
  }

  setOS(name, version) {
    this.addCapability('os', name)

    if (version) {
      this.setOSVersion(version)
    }

    return this
  }

  setOSVersion(version) {
    return this.addCapability('os_version', version)
  }

  setDevice(device) {
    return this.addCapability('device', device)
  }
}
