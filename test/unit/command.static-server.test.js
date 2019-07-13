import express from 'express'
import serveStatic from 'serve-static'
import { loadDependency } from '../../src/utils'

jest.mock('express')
jest.mock('serve-static')
jest.mock('../../src/utils')

describe('StaticServer', () => {
  let StaticServer

  beforeAll(() => {
    loadDependency.mockImplementation(moduleName => moduleName === 'express' ? express : serveStatic)
  })

  beforeEach(async () => {
    StaticServer = await import('../../src/utils/commands/static-server').then(m => m.default || m)
  })

  afterEach(() => {
    jest.restoreAllMocks()
    jest.resetModules()
  })

  test('should load dependencies once', async () => {
    expect(StaticServer.express).toBeUndefined()
    await StaticServer.loadDependencies()
    expect(StaticServer.express).toBeDefined()
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
    StaticServer.load({
      config: {
        folder: 'test',
        staticServer: true
      },
      hook })

    expect(hook).toHaveBeenCalled()
  })

  test('should load with browser config', () => {
    const hook = jest.fn()
    StaticServer.load({ config: { staticServer: { folder: 'test' } }, hook })

    expect(hook).toHaveBeenCalled()
  })

  test('should start static server', async () => {
    jest.spyOn(console, 'info').mockImplementation(_ => _)

    const use = jest.fn()
    const listen = jest.fn()
    StaticServer.express = jest.fn(() => ({ use, listen }))
    StaticServer.serveStatic = jest.fn()

    const staticServerConfig = {
      folder: 'test-folder',
      host: 'test-host',
      port: 667
    }

    await expect(StaticServer.start(staticServerConfig)).resolves.toBeUndefined()

    expect(StaticServer.express).toHaveBeenCalled()
    expect(use).toHaveBeenCalled()
    expect(StaticServer.serveStatic).toHaveBeenCalledWith(staticServerConfig.folder)

    expect(listen).toHaveBeenCalledWith(staticServerConfig.port, staticServerConfig.host)
    // eslint-disable-next-line no-console
    expect(console.info).toHaveBeenCalled()
  })

  test('should stop static server', async () => {
    const close = jest.fn(cb => cb())
    StaticServer.server = { close }

    await expect(StaticServer.stop()).resolves.toBeUndefined()

    expect(close).toHaveBeenCalled()
  })
})
