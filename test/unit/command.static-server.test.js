import http from 'http'
import finalhandler from 'finalhandler'
import serveStatic from 'serve-static'
import { loadDependency } from '../../src/utils'

jest.mock('finalhandler')
jest.mock('serve-static')
jest.mock('../../src/utils')

describe('StaticServer', () => {
  let StaticServer

  beforeAll(() => {
    loadDependency.mockImplementation(moduleName => moduleName === 'finalhandler' ? finalhandler : serveStatic)
  })

  beforeEach(async () => {
    StaticServer = await import('../../src/commands/static-server').then(m => m.default || m)
  })

  afterEach(() => {
    jest.restoreAllMocks()
    jest.resetModules()
  })

  test('should load dependencies once', async () => {
    expect(StaticServer.express).toBeUndefined()
    await StaticServer.loadDependencies()
    expect(StaticServer.serveStatic).toBeDefined()

    expect(loadDependency).toHaveBeenCalledTimes(2)

    await StaticServer.loadDependencies()
    expect(loadDependency).toHaveBeenCalledTimes(2)
  })

  test('should not load without browser config', () => {
    const hook = jest.fn()

    StaticServer.load({ config: {}, hook })
    expect(hook).not.toHaveBeenCalled()
  })

  test('should not load without folder in config', () => {
    const hook = jest.fn()

    StaticServer.load({ config: { staticServer: {} }, hook })
    expect(hook).not.toHaveBeenCalled()
  })

  test('should load with boolean config', () => {
    const hook = jest.fn()
    const browser = {
      config: {
        folder: 'test',
        staticServer: true
      },
      hook
    }
    StaticServer.load(browser)

    expect(hook).toHaveBeenCalledTimes(2)
    expect(browser.config.staticServer).toBeInstanceOf(Object)
    expect(browser.config.staticServer.folder).toBe('test')
  })

  test('should load with browser config', () => {
    const hook = jest.fn()
    StaticServer.load({ config: { staticServer: { folder: 'test' } }, hook })

    expect(hook).toHaveBeenCalled()
  })

  test('should start static server', async () => {
    const on = jest.fn()
    const listen = jest.fn((port, host, cb) => cb())
    jest.spyOn(console, 'info').mockImplementation(_ => _)
    jest.spyOn(http, 'createServer').mockImplementation((fn) => {
      fn()
      return { on, listen }
    })

    StaticServer.serveStatic = jest.fn(() => () => {})
    StaticServer.finalhandler = jest.fn()

    const staticServerConfig = {
      folder: 'test-folder',
      host: 'test-host',
      port: 667
    }

    await expect(StaticServer.start(staticServerConfig)).resolves.toBeUndefined()

    expect(StaticServer.finalhandler).toHaveBeenCalled()
    expect(StaticServer.serveStatic).toHaveBeenCalledWith(staticServerConfig.folder)

    expect(listen).toHaveBeenCalledWith(staticServerConfig.port, staticServerConfig.host, expect.any(Function))
    // eslint-disable-next-line no-console
    expect(console.info).toHaveBeenCalled()
  })

  test('should start static server but not warn when quiet', async () => {
    const on = jest.fn()
    const listen = jest.fn((port, host, cb) => cb())
    jest.spyOn(console, 'info').mockImplementation(_ => _)
    jest.spyOn(http, 'createServer').mockImplementation((fn) => {
      fn()
      return { on, listen }
    })

    StaticServer.serveStatic = jest.fn(() => () => {})
    StaticServer.finalhandler = jest.fn()

    const staticServerConfig = {
      folder: 'test-folder',
      host: 'test-host',
      port: 667
    }

    await expect(StaticServer.start(staticServerConfig, true)).resolves.toBeUndefined()

    expect(StaticServer.finalhandler).toHaveBeenCalled()
    expect(StaticServer.serveStatic).toHaveBeenCalledWith(staticServerConfig.folder)

    expect(listen).toHaveBeenCalledWith(staticServerConfig.port, staticServerConfig.host, expect.any(Function))
    // eslint-disable-next-line no-console
    expect(console.info).not.toHaveBeenCalled()
  })

  test('should stop static server', async () => {
    const close = jest.fn(cb => cb())
    StaticServer.server = { close }

    await expect(StaticServer.stop()).resolves.toBeUndefined()

    expect(close).toHaveBeenCalled()
  })
})
