import browserstack from 'browserstack-local'
import { loadDependency } from '../../src/utils'

jest.mock('browserstack-local')
jest.mock('../../src/utils')

describe('xvfb', () => {
  let BrowserStackLocal

  beforeAll(() => {
    loadDependency.mockImplementation(() => browserstack)
  })

  beforeEach(async () => {
    BrowserStackLocal = await import('../../src/commands/browserstack-local').then(m => m.default || m)
  })

  afterEach(() => {
    jest.restoreAllMocks()
    jest.resetModules()
  })

  test('should load browserstack driver once', async () => {
    expect(BrowserStackLocal.driver).toBeUndefined()
    await BrowserStackLocal.loadDriver()
    expect(BrowserStackLocal.driver).toBeDefined()
    expect(loadDependency).toHaveBeenCalledTimes(1)

    await BrowserStackLocal.loadDriver()
    expect(loadDependency).toHaveBeenCalledTimes(1)
  })

  test('should start browserstack driver', async () => {
    BrowserStackLocal.driver = {
      start(config, fn) {
        fn()
      }
    }

    await expect(BrowserStackLocal.start()).resolves.toBeUndefined()
  })

  test('should reject when browserstack fails to start', async () => {
    BrowserStackLocal.driver = {
      start(config, fn) {
        fn('test error')
      }
    }

    await expect(BrowserStackLocal.start()).rejects.toBe('test error')
  })

  test('should warn when browserstack is stopped but not started', async () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    await BrowserStackLocal.stop()

    expect(spy).toHaveBeenCalledTimes(1)
  })

  // TODO: how to mock tree-kill?
  test('should resolve when browserstack stopping succeeds', async () => {
    BrowserStackLocal.driver = { pid: -999 }
    await expect(BrowserStackLocal.stop()).resolves.toBeUndefined()
  })
})
