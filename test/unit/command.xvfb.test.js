import os from 'os'
import cp from 'child_process'
import kill from 'tree-kill'

jest.mock('tree-kill')
jest.mock('../../src/utils/timers')

describe('xvfb', () => {
  let Xvfb
  beforeEach(async () => {
    Xvfb = await import('../../src/commands/xvfb').then(m => m.default || m)
  })

  afterEach(() => {
    jest.restoreAllMocks()
    jest.resetModules()
  })

  test('should not throw error on unsupported platforms', () => {
    jest.spyOn(os, 'platform').mockReturnValue('not supported')

    expect(() => Xvfb.isSupported()).not.toThrow()
  })

  test('should throw error on unsupported platforms when set', () => {
    jest.spyOn(os, 'platform').mockReturnValue('not supported')

    expect(() => Xvfb.isSupported(true)).toThrow('not supported')
  })

  test('should set browser config when load called', () => {
    jest.spyOn(os, 'platform').mockReturnValue('linux')

    const browser = {
      hook: () => {},
      config: {}
    }

    expect(browser.config.xvfb).toBeUndefined()
    Xvfb.load(browser)
    expect(browser.config.xvfb).toBeUndefined()

    browser.config.xvfb = true

    Xvfb.load(browser)
    expect(browser.config.xvfb).toBe(true)
  })

  test('should add window args from browser config', () => {
    jest.spyOn(os, 'platform').mockReturnValue('linux')

    const width = 111
    const height = 222

    const browser = {
      hook: () => {},
      config: {
        xvfb: true,
        browserConfig: {
          window: { width, height }
        }
      }
    }

    Xvfb.load(browser)
    expect(browser.config.xvfb).toEqual(expect.any(Object))
    expect(browser.config.xvfb.args).toEqual(expect.any(Array))
    expect(browser.config.xvfb.args.length).toBe(1)
    expect(browser.config.xvfb.args[0]).toEqual(`-screen 0 ${width}x${height}x24`)
  })

  test('should not start twice', () => {
    jest.spyOn(os, 'platform').mockReturnValue('linux')
    const spawn = jest.spyOn(cp, 'spawn').mockImplementation(() => {
      return {
        connected: true,
        on() {},
        stderr: {
          on() {}
        }
      }
    })

    expect(Xvfb.isRunning()).toBe(false)

    Xvfb.start()
    expect(spawn).toHaveBeenCalledTimes(1)
    expect(Xvfb.isRunning()).toBe(true)

    Xvfb.start()
    expect(spawn).toHaveBeenCalledTimes(1)
  })

  test('should throw error when Xvfb not found', () => {
    jest.spyOn(os, 'platform').mockReturnValue('linux')
    jest.spyOn(cp, 'spawn').mockImplementation(() => {
      return {
        connected: true,
        on(type, fn) {
          if (type === 'error') {
            fn({ code: 'ENOENT' })
          }
        },
        stderr: {
          on() {}
        }
      }
    })

    expect(() => Xvfb.start()).toThrow('Xvfb not found')
    expect(Xvfb.isRunning()).toBe(false)
  })

  test('should warn when Xvfb already running and quiet false', () => {
    jest.spyOn(os, 'platform').mockReturnValue('linux')
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    jest.spyOn(cp, 'spawn').mockImplementation(() => {
      return {
        connected: true,
        on(type, fn) {
          if (type === 'close') {
            fn(1, 0)
          }
        },
        stderr: {
          on(type, fn) {
            if (type === 'data') {
              fn(`(EE)
Fatal server error:
(EE) Server is already active for display 99
  If this server is no longer running, remove /tmp/.X99-lock
  and start again.
(EE)`)
            }
          }
        }
      }
    })

    Xvfb.start()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(Xvfb.isRunning()).toBe(false)
  })

  test('should warn when Xvfb already running unless quiet', () => {
    jest.spyOn(os, 'platform').mockReturnValue('linux')
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    jest.spyOn(cp, 'spawn').mockImplementation(() => {
      return {
        connected: true,
        on(type, fn) {
          if (type === 'close') {
            fn(1, 0)
          }
        },
        stderr: {
          on(type, fn) {
            if (type === 'data') {
              fn(`(EE)
Fatal server error:
(EE) Server is already active for display 99
  If this server is no longer running, remove /tmp/.X99-lock
  and start again.
(EE)`)
            }
          }
        }
      }
    })

    Xvfb.start({ quiet: true })
    expect(spy).not.toHaveBeenCalled()
    expect(Xvfb.isRunning()).toBe(false)
  })

  test('should warn when Xvfb failed to start', () => {
    jest.spyOn(os, 'platform').mockReturnValue('linux')
    jest.spyOn(cp, 'spawn').mockImplementation(() => {
      return {
        connected: true,
        on(type, fn) {
          if (type === 'close') {
            fn(1, 0)
          }
        },
        stderr: {
          on(type, fn) {
            if (type === 'data') {
              fn(`(EE)
Fatal server error:
(EE) Unrecognized option: 0
(EE)
`)
            }
          }
        }
      }
    })

    expect(() => Xvfb.start()).toThrow('BrowserError: Failed to start Xvfb, Unrecognized option: 0')
    expect(Xvfb.isRunning()).toBe(false)
  })

  test('should do nothing on stop when not started', () => {
    Xvfb.stop()
    expect(kill).not.toHaveBeenCalled()
  })

  test('should wait on stop for closed to be true', async () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    jest.useFakeTimers()

    Xvfb.process = true
    Xvfb.closed = false

    const stopPromise = Xvfb.stop()
    Xvfb.closed = true
    jest.advanceTimersByTime(100)

    await expect(stopPromise).resolves.toBeUndefined()

    jest.advanceTimersByTime(3100)
    expect(spy).not.toHaveBeenCalled()
  })

  test('should timeout on stop', async () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    jest.useFakeTimers()

    Xvfb.process = true
    Xvfb.closed = false

    const stopPromise = Xvfb.stop()

    jest.advanceTimersByTime(3100)
    await expect(stopPromise).resolves.toBeUndefined()
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
