export default (SeleniumBrowser) => {
  // Seems only Chrome really supports browser logging
  if (!SeleniumBrowser.constructor.name.includes('Chrome')) {
    return SeleniumBrowser
  }

  return class extends SeleniumBrowser {
    setLogLevel(level, types) {
      if (this.driver) {
        console.warn('SeleniumBrowser: setLogLevel should be called before calling start()') // eslint-disable-line no-console
      }

      this.hook('selenium:build:before', (builder) => {
        const logging = SeleniumBrowser.webdriver.logging

        const prefs = new logging.Preferences()

        for (const key in logging.Type) {
          const type = logging.Type[key]
          if (!types || types.includes(type)) {
            prefs.setLevel(type, level || 0)
          }
        }

        builder.setLoggingPrefs(prefs)
      })
    }

    flushLogs() {
      const consoleLevelMap = {
        severe: 'error',
        warning: 'warn'
      }

      this.driver.manage().logs().get(SeleniumBrowser.webdriver.logging.Type.BROWSER).then((entries) => {
        entries.forEach((entry) => {
          const level = entry.level.name.toLowerCase()
          const consoleLevel = consoleLevelMap[level]
          const log = console[consoleLevel] || console[level] || console.log // eslint-disable-line no-console

          log(`(BROWSER) ${entry.level.name}: ${entry.message}`)
        })
      })
    }
  }
}
