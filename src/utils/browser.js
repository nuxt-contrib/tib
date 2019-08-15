import * as constants from './constants'

export function getBrowserConfigFromString(browserString) {
  const browserConfig = {}

  browserString
    .split('/')
    .filter(s => !!s)
    .map(s => s.toLowerCase()
      // replace first occurence with =
      // -> Chrome 39 => chrome=39
      // -> Mac OS X=High Sierra => Mac OS X=High Sierra
      .replace(/([\s:])/, (m, $1, o, s) => (s.includes('=') ? $1 : '='))
    )
    .forEach((s) => {
      let [key, value] = s.split('=', 2) // eslint-disable-line prefer-const
      key = key.replace(/\s+/, '')

      if (constants.browsers.includes(key)) {
        browserConfig.browser = key

        if (value) {
          browserConfig.browserVersion = value.replace(/\s+/g, '')
        }
        return
      }

      if (constants.browserOptions.includes(key)) {
        browserConfig[key] = typeof value === 'undefined' ? true : value
        return
      }

      if (constants.os.includes(key)) {
        browserConfig.os = key

        if (value) {
          browserConfig.osVersion = value
        }
        return
      }

      if (constants.drivers.includes(key)) {
        browserConfig.driver = key
        return
      }

      if (constants.providers.includes(key)) {
        browserConfig.provider = key
        return
      }

      if (constants.browserVariants[key]) {
        browserConfig.browserVariant = key
        return
      }

      if (key === 'device') {
        browserConfig.device = value
        return
      }

      if (!value) {
        const screenResolution = key.split(/(\d+)x(\d+)/i)
        if (screenResolution && screenResolution.length > 1) {
          browserConfig.window = {
            width: parseInt(screenResolution[1]),
            height: parseInt(screenResolution[2])
          }
        }
      }
    })

  return browserConfig
}

export function getBrowserImportFromConfig(browserConfig) {
  const importPath = []

  if (browserConfig.browser) {
    importPath.push(browserConfig.browser)
  }

  if (browserConfig.driver && !browserConfig.provider) {
    importPath.push(browserConfig.driver)
  }

  if (browserConfig.provider) {
    importPath.push(browserConfig.provider)
  }

  if (browserConfig.browserVariant) {
    importPath.push(browserConfig.browserVariant)
  }

  return importPath.join('/')
}
