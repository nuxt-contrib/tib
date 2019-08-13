import path from 'path'
import * as fs from '../../src/utils/fs'
import * as pagefns from '../../src/utils/page-functions'

describe('page functions', () => {
  beforeAll(async () => {
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('create page functions (no page fn files)', async () => {
    expect(await pagefns.createPageFunctions()).toEqual({})
  })

  test('create page functions (for ie 9)', async () => {
    jest.spyOn(fs, 'stats').mockReturnValue({ mtime: 1 })

    const page = {
      runAsyncScript: jest.fn()
    }

    const babelPresets = {
      targets: { ie: 9 }
    }

    const pageFunctions = [
      [path.resolve(__dirname, '../fixtures/page-function.js'), 'TestPageFunction']
    ]
    const transpiledFunctions = await pagefns.createPageFunctions(page, pageFunctions, babelPresets)
    expect(transpiledFunctions).toEqual(expect.any(Object))
    expect(transpiledFunctions.TestPageFunction).toEqual(expect.any(Function))

    await transpiledFunctions.TestPageFunction()

    expect(page.runAsyncScript).toHaveBeenCalledWith(expect.any(Object))

    const transpiledFn = page.runAsyncScript.mock.calls[0][0]
    expect(transpiledFn.body).toEqual(expect.stringContaining('function(){return!0}'))
  })

  test('create page functions (for node)', async () => {
    jest.spyOn(fs, 'stats').mockReturnValue({ mtime: 1 })

    const page = {
      runAsyncScript: jest.fn()
    }

    const babelPresets = {
      targets: { node: 'current' }
    }

    const pageFunctions = [
      path.resolve(__dirname, '../fixtures/page-function.js')
    ]
    const transpiledFunctions = await pagefns.createPageFunctions(page, pageFunctions, babelPresets)
    expect(transpiledFunctions).toEqual(expect.any(Object))
    expect(transpiledFunctions.pageFunction).toEqual(expect.any(Function))

    await transpiledFunctions.pageFunction()

    expect(page.runAsyncScript).toHaveBeenCalledWith(expect.any(Object))

    const transpiledFn = page.runAsyncScript.mock.calls[0][0]
    expect(transpiledFn.body).toEqual(expect.stringContaining('()=>!0'))
  })

  test('create page functions (with error)', async () => {
    jest.spyOn(fs, 'stats').mockReturnValue({ mtime: 1 })

    const page = {
      getBabelPresetOptions: () => ({
        targets: { node: 'current' }
      }),
      runAsyncScript: jest.fn()
    }

    const pageFunctions = [
      [path.resolve(__dirname, '../fixtures/error-function.js'), 'TestPageFunction']
    ]
    const transpiledFunctions = await pagefns.createPageFunctions(page, pageFunctions)
    expect(transpiledFunctions).toEqual(expect.any(Object))
    expect(transpiledFunctions.TestPageFunction).toEqual(expect.any(Function))

    await expect(transpiledFunctions.TestPageFunction()).rejects.toThrow('Module build failed')
  })
})
