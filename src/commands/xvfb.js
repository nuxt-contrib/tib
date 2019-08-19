import os from 'os'
import { spawn } from 'child_process'
import kill from 'tree-kill'
import onExit from 'signal-exit'
import { enableTimers, BrowserError } from '../utils'

const consola = console // eslint-disable-line no-console

const supportedPlatforms = [
  'linux',
  'freebsd',
  'openbsd'
]

export default class Xvfb {
  static load(browser) {
    if (!browser.config.xvfb) {
      return
    }

    Xvfb.isSupported(true)

    const browserConfig = browser.config.browserConfig
    if (browserConfig && browserConfig.window) {
      if (typeof browser.config.xvfb !== 'object') {
        browser.config.xvfb = { args: [] }
      }

      browser.config.xvfb.args.push(`-screen 0 ${browserConfig.window.width}x${browserConfig.window.height}x24`)
    }

    const config = {
      quiet: browser.config.quiet,
      ...browser.config.xvfb
    }

    browser.hook('start:before', () => Xvfb.start(config))
    browser.hook('close:after', Xvfb.stop)
  }

  static isSupported(failWhenNot) {
    const platform = os.platform()
    const supported = supportedPlatforms.includes(platform)

    if (!supported && failWhenNot) {
      throw new BrowserError(`Xvfb is not supported on ${platform} platforms`)
    }

    return supported
  }

  static isRunning() {
    return !!Xvfb.process && Xvfb.process.connected && !Xvfb.closed
  }

  static start({ displayNum = 99, args = [], quiet } = {}) {
    Xvfb.isSupported(true)
    Xvfb.closed = false

    if (Xvfb.isRunning()) {
      return
    }

    args = (Array.isArray(args) && args) || []

    const display = `:${displayNum}`
    args.unshift(display)
    args.unshift('Xvfb')

    Xvfb.process = spawn('command', args, {
      shell: true,
      stdio: [
        'ignore',
        'ignore',
        'pipe'
      ]
    })

    // set DISPLAY env
    process.env.DISPLAY = display

    let stderr = ''
    Xvfb.process.stderr.on('data', data => (stderr += `${data}`))

    Xvfb.process.on('error', (err) => {
      Xvfb.closed = true

      if (err && err.code === 'ENOENT') {
        throw new BrowserError(`Xvfb not found, please make sure Xvfb is installed`)
      }
    })

    Xvfb.process.on('close', (code, signal) => {
      Xvfb.closed = true

      if (code === 1) {
        const error = stderr.match(/\(EE\) (?!\(EE\))(.+?)$/m)[1] || stderr
        if (stderr.includes('already active for display')) {
          if (!quiet) {
            console.warn(`Xvfb: ${error}`, Xvfb.process.pid) // eslint-disable-line no-console
          }
          return
        }

        throw new BrowserError(`Failed to start Xvfb${error ? ', ' : ''}${error}`)
      }
    })

    onExit(() => Xvfb.stop())
  }

  static stop() {
    if (!Xvfb.process || Xvfb.closed) {
      return
    }

    kill(Xvfb.process.pid)

    // enable timers if they where faked by a test framework
    enableTimers()

    let closeTimeout
    const waitTimeout = new Promise((resolve) => {
      closeTimeout = setTimeout(() => {
        consola.warn(`Timeout: Xvfb did not exit after 3s`)
        resolve()
      }, 3000)
      closeTimeout.unref()
    })

    const waitClosed = new Promise((resolve) => {
      const closeInterval = setInterval(() => {
        if (Xvfb.closed) {
          clearTimeout(closeTimeout)
          clearInterval(closeInterval)
          resolve()
        }
      }, 50)
    })

    return Promise.race([waitClosed, waitTimeout])
  }
}
