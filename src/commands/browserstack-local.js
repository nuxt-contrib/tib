import path from 'path'
import kill from 'tree-kill'
import onExit from 'signal-exit'
import { loadDependency } from '../utils'

const consola = console // eslint-disable-line no-console

let PID

export default class BrowserStackLocal {
  static async loadDriver() {
    if (BrowserStackLocal.driver) {
      return
    }

    const browserstack = await loadDependency('browserstack-local')
    BrowserStackLocal.driver = new browserstack.Local()
  }

  static async start(config = {}) {
    // TODO: support webserver
    if (!config.folder && config.folder !== false) {
      config.folder = path.resolve(process.cwd())
    }

    await BrowserStackLocal.loadDriver()

    // util.promisify doesnt work due to this binding and
    // .bind(local) didnt work either
    return new Promise((resolve, reject) => {
      BrowserStackLocal.driver.start(config, (error) => {
        if (error) {
          reject(error)
        }

        onExit(() => BrowserStackLocal.stop())

        PID = BrowserStackLocal.driver.pid
        resolve(PID)
      })
    })
  }

  static stop(pid) {
    pid = pid || (BrowserStackLocal.driver && BrowserStackLocal.driver.pid) || PID

    if (!BrowserStackLocal.driver || !pid) {
      consola.warn('Stop called but browserstack-local was not started')
      return
    }

    return new Promise((resolve, reject) => {
      // local.stop is buggy, it doesnt kill anything and takes forever
      // after looking at the local.stop implementation tree-kill does
      // practically the same
      kill(pid, 'SIGTERM', (error) => {
        if (error) {
          /* istanbul ignore next */
          reject(error)
        }

        resolve()
      })
    })
  }
}
