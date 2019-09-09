import SeleniumBrowser from '../selenium'
import SeleniumLogging from '../selenium/logging'
import { BrowserError } from '../../utils'

export default class SauceLabsBrowser extends SeleniumLogging(SeleniumBrowser) {
  /* istanbul ignore next */
  constructor(config) {
    config.xvfb = false

    super(config)

    this.hook('selenium:build:before', (builder) => {
      const user = this.getConfigProperty('user')
      const key = this.getConfigProperty('key')
      builder.usingServer(`http://${user}:${key}@ondemand.saucelabs.com:80/wd/hub`)
    })

    throw new BrowserError(this, 'SauceLabs not yet implemented')
  }

  /* istanbul ignore next */
  getConfigProperty(property, capabilities = {}, defaulValue) {
    const envKey = `BROWSERSTACK_${property.toUpperCase()}`
    if (process.env[envKey]) {
      return process.env[envKey]
    }

    const confKey = `browserstack.${property}`

    if (capabilities[confKey]) {
      return capabilities[confKey]
    }

    if (this.config.SauceLabsLocal && this.config.SauceLabsLocal[property]) {
      return this.config.SauceLabsLocal[property]
    }

    if (this.config.SauceLabs && this.config.SauceLabs[property]) {
      return this.config.SauceLabs[property]
    }

    if (typeof defaulValue !== 'undefined') {
      return defaulValue
    }

    throw new Error(`${this.constructor.name} could not resolve required config property '${property}'`)
  }

  /* istanbul ignore next */
  async _start(capabilities = {}) {
    this.addCapabilities({
      'browserstack.user': this.getConfigProperty('user', capabilities),
      'browserstack.key': this.getConfigProperty('key', capabilities),
      'browserstack.debug': this.getConfigProperty('debug', capabilities, false)
    })

    await super._start(capabilities)
  }

  /* istanbul ignore next */
  setOS(name, version = '') {
    return this.addCapability('platform', `${name}${version ? ' ' : ''}${version || ''}`)
  }

  /* istanbul ignore next */
  getBrowserVersion() {
    return this.getCapability('version')
  }

  /* istanbul ignore next */
  setBrowserVersion(version) {
    return this.addCapability('version', version)
  }

  /* istanbul ignore next */
  setDevice(deviceName) {
    return this.addCapability('device', deviceName)
  }
}
