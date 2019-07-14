import { loadDependency } from '..'

export default class StaticServer {
  static async loadDependencies() {
    if (StaticServer.express) {
      return
    }

    StaticServer.express = await loadDependency('express')
    StaticServer.serveStatic = await loadDependency('serve-static')
  }

  static load(browser) {
    if (!browser.config.staticServer) {
      return
    }

    if (browser.config.staticServer === true) {
      const { folder } = browser.config
      browser.config.staticServer = { folder }
    }

    if (!browser.config.staticServer.folder) {
      return
    }

    browser.hook('start:before', () => StaticServer.start(browser.config.staticServer, browser.config.quiet))
    browser.hook('close:after', StaticServer.stop)
  }

  static async start(config, quiet) {
    await StaticServer.loadDependencies()

    const app = StaticServer.express()

    app.use(StaticServer.serveStatic(config.folder))

    const host = process.env.HOST || config.host || 'localhost'
    const port = process.env.PORT || config.port || 3000

    StaticServer.server = app.listen(port, host)

    if (!quiet) {
      // eslint-disable-next-line no-console
      console.info(`tib: Static server started on http://${host}:${port}`)
    }

    config.host = host
    config.port = port
  }

  static stop() {
    if (StaticServer.server) {
      return new Promise((resolve) => {
        StaticServer.server.close(() => {
          StaticServer.server = undefined
          resolve()
        })
      })
    }
  }
}
