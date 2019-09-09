export default (SeleniumBrowser) => {
  return class extends SeleniumBrowser {
    setLogLevel(levels, types) {
      /* Seems only Chrome really supports browser logging
       * - https://github.com/mozilla/geckodriver/issues/284
       */
      if (!this.constructor.name.includes('Chrome')) {
        console.warn(`Logging is not supported for ${this.constructor.name}`) // eslint-disable-line no-console
        return
      }

      if (this.driver) {
        console.warn('SeleniumBrowser: setLogLevel should be called before calling start()') // eslint-disable-line no-console
      }

      // flush the remote logs on every call to webpage
      this.hook('webpage:property', () => this.flushLogs())

      this.hook('selenium:build:before', (builder) => {
        const logging = SeleniumBrowser.webdriver.logging

        const levelMap = {
          error: logging.Level.SEVERE,
          warning: logging.Level.WARNING,
          log: logging.Level.INFO,
          info: logging.Level.FINEST,
          debug: logging.Level.DEBUG
        }

        if (!Array.isArray(levels)) {
          levels = [levels]
        }

        let level
        for (const key in levelMap) {
          if (levels.includes(key)) {
            level = levelMap[key]
            break
          }
        }

        if (!types) {
          types = [logging.Type.BROWSER]
        }

        const prefs = new logging.Preferences()

        for (const key in logging.Type) {
          const type = logging.Type[key]
          if (types.includes(type)) {
            prefs.setLevel(type, level || 0)
          }
        }

        builder.setLoggingPrefs(prefs)
        this.logLevel = level || 0
      })
    }

    flushLogs() {
      if (typeof this.logLevel === 'undefined') {
        return
      }

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
