import path from 'path'
import * as fs from '../../src/utils/fs'
import * as pkgHelpers from '../../src/utils/package'

describe('page functions', () => {
  beforeAll(async () => {
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('modulesPath using relative path from dist', async () => {
    const modulePath = '/path/to/package/node_modules'
    jest.spyOn(path, 'resolve').mockReturnValue(modulePath)
    jest.spyOn(fs, 'exists').mockReturnValue(true)

    expect(await pkgHelpers.findNodeModulesPath(true)).toBe(modulePath)
  })

  test('modulesPath using path:resolve', async () => {
    const modulePath = '/path/resolve/node_modules'
    jest.spyOn(fs, 'requireResolve').mockReturnValue('')
    jest.spyOn(path, 'resolve').mockReturnValue(modulePath)
    const spy = jest.spyOn(fs, 'exists').mockImplementation(() => {
      return spy.mock.calls.length === 2
    })

    expect(await pkgHelpers.findNodeModulesPath(true)).toBe(modulePath)
  })

  test('modulesPath using require:resolve', async () => {
    const modulePath = '/require/resolve/node_modules'
    jest.spyOn(fs, 'requireResolve').mockReturnValue(`${modulePath}/hable/package.json`)
    const spy = jest.spyOn(fs, 'exists').mockImplementation(() => {
      return spy.mock.calls.length === 3
    })

    expect(await pkgHelpers.findNodeModulesPath(true)).toBe(modulePath)
  })

  test('modulesPath using parent tree', async () => {
    const modulePath = path.join(__dirname, '../../src/utils/node_modules')
    jest.spyOn(fs, 'requireResolve').mockReturnValue('')
    jest.spyOn(path, 'resolve').mockReturnValue('')
    const spy = jest.spyOn(fs, 'exists').mockImplementation(() => {
      return spy.mock.calls.length === 4
    })

    expect(await pkgHelpers.findNodeModulesPath(true)).toBe(modulePath)
  })

  test('modulesPath empty', async () => {
    const modulePath = ''
    jest.spyOn(fs, 'requireResolve').mockReturnValue('')
    jest.spyOn(path, 'resolve').mockReturnValue('')
    jest.spyOn(fs, 'exists').mockReturnValue(false)

    expect(await pkgHelpers.findNodeModulesPath(true)).toBe(modulePath)
  })
})
