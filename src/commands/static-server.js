import http from 'http'
import { loadDependency } from '../utils'

export default class StaticServer {
  static async loadDependencies() {
    if (StaticServer.serveStatic) {
      return
    }

    StaticServer.serveStatic = await loadDependency('serve-static')
    StaticServer.finalhandler = await loadDependency('finalhandler')
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

    const host = process.env.HOST || config.host || 'localhost'
    const port = process.env.PORT || config.port || 3000

    const serve = StaticServer.serveStatic(config.folder)

    const server = http.createServer((req, res) => {
      serve(req, res, StaticServer.finalhandler(req, res))
    })

    await new Promise((resolve, reject) => {
      server.on('error', reject)
      server.listen(port, host, () => {
        if (!quiet) {
          // eslint-disable-next-line no-console
          console.info(`tib: Static server started on http://${host}:${port}`)
        }

        config.host = host
        config.port = port

        StaticServer.server = server

        resolve(server)
      })
    })
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
